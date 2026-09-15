import React, { useRef, useEffect } from "react";

/**
 * ZaruYezShift
 * =========================================================================
 * Bu, yang_theory_transform_proof_v9.html prototipindeki runShaderShift
 * mantığının BİREBİR taşınmış hali — jenerik bir crossfade DEĞİL.
 *
 * Tek fark: orijinalinde geçiş sabit bir süre (SHIFT_MS) boyunca
 * requestAnimationFrame ile kendi kendine oynuyordu. Burada aynı shader,
 * aynı matematik, ama uT uniform'u doğrudan SCROLL POZİSYONUNA bağlı —
 * yani geçiş artık zamana değil, ziyaretçinin scroll'una bağlı olarak
 * "scrub" ediliyor. Bu, sitenin geri kalanındaki scroll-sürüşlü mimariyle
 * tutarlı, ama görsel/matematiksel olarak orijinal shader'dan hiçbir
 * sapma yok.
 *
 * cB (yakınsama noktası): 0.23 / 0.63 — Yez videosunda bitkinin gerçek
 * ekran koordinatı (kare-kare ölçülmüştü), orijinal prototipteki
 * 0.18/0.70 yer tutucusunun yerine geçti.
 * =========================================================================
 */

const VERTEX_SRC = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos,0.0,1.0);
}`;

const FRAGMENT_SRC = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D texA;
uniform sampler2D texB;
uniform float uT;
uniform float uAspect;

float easeFn(float x){
  x = clamp(x,0.0,1.0);
  return x*x*(3.0-2.0*x);
}

void main(){
  float t = easeFn(uT);

  vec2 cA = vec2(0.50,0.50);
  vec2 cB = vec2(0.23,0.63);
  vec2 center = mix(cA,cB,easeFn(smoothstep(0.38,0.86,t)));

  vec2 q = vUv - center;
  q.x *= uAspect;
  float d = length(q);

  vec2 dir = normalize(q + vec2(0.00001));
  dir.x /= uAspect;

  float pulse = sin(3.14159265*t);

  float field = exp(-d*d*32.0);
  float ringR = mix(0.025,0.18,easeFn(smoothstep(0.05,0.72,t)));
  float ring = exp(-pow((d-ringR)*32.0,2.0));

  float wobble = sin(d*72.0 - t*18.0)*0.0025*ring*pulse;
  float warp = (0.032*field + 0.014*ring)*pulse + wobble;

  vec2 uvA = vUv + dir*warp;
  vec2 uvB = vUv - dir*warp*1.12;

  vec3 A = texture2D(texA, uvA).rgb;

  float ca = 0.0035*ring*pulse;
  vec3 B;
  B.r = texture2D(texB, uvB + dir*ca).r;
  B.g = texture2D(texB, uvB).g;
  B.b = texture2D(texB, uvB - dir*ca).b;

  float inside = smoothstep(ringR+0.060, ringR-0.035, d);
  float local = inside * smoothstep(0.18,0.64,t);
  float handoff = smoothstep(0.66,0.94,t);
  float m = max(local*(1.0-handoff), handoff);

  vec3 col = mix(A,B,m);
  col += vec3(0.30,0.95,0.84)*ring*pulse*0.28;

  gl_FragColor = vec4(col,1.0);
}`;

function compileShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(s));
  }
  return s;
}

function coverDraw(ctx, source, W, H) {
  const sw = source.videoWidth || source.naturalWidth || source.width;
  const sh = source.videoHeight || source.naturalHeight || source.height;
  if (!sw || !sh) return;
  const srcAspect = sw / sh;
  const dstAspect = W / H;
  let dw, dh, dx, dy;
  if (srcAspect > dstAspect) {
    dh = H;
    dw = H * srcAspect;
    dx = (W - dw) / 2;
    dy = 0;
  } else {
    dw = W;
    dh = W / srcAspect;
    dx = 0;
    dy = (H - dh) / 2;
  }
  ctx.drawImage(source, dx, dy, dw, dh);
}

export default function ZaruYezShift({ zaruRef, yezRef, localT, active, zIndex }) {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const uniformsRef = useRef({});
  const sceneARef = useRef(null);
  const sceneBRef = useRef(null);
  const rafRef = useRef(null);

  // WebGL kurulumu — bir kez
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: false });
    if (!gl) return;
    glRef.current = gl;

    const prog = gl.createProgram();
    gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC));
    gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uT = gl.getUniformLocation(prog, "uT");
    const uAspect = gl.getUniformLocation(prog, "uAspect");

    function makeTex(unit) {
      const tex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return tex;
    }
    const texA = makeTex(0);
    const texB = makeTex(1);
    gl.uniform1i(gl.getUniformLocation(prog, "texA"), 0);
    gl.uniform1i(gl.getUniformLocation(prog, "texB"), 1);

    uniformsRef.current = { uT, uAspect, texA, texB };
    sceneARef.current = document.createElement("canvas");
    sceneBRef.current = document.createElement("canvas");
  }, []);

  // Her scroll güncellemesinde: iki sahneyi tekrar çiz, dokulara yükle, uT'yi ayarla, çiz.
  useEffect(() => {
    if (!active) return;
    const gl = glRef.current;
    if (!gl) return;
    const canvas = canvasRef.current;
    const zaru = zaruRef.current;
    const yez = yezRef.current;
    if (!zaru || !yez) return;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const W = Math.round(window.innerWidth * dpr);
      const H = Math.round(window.innerHeight * dpr);

      canvas.width = W;
      canvas.height = H;
      gl.viewport(0, 0, W, H);

      const sceneA = sceneARef.current;
      const sceneB = sceneBRef.current;
      sceneA.width = W;
      sceneA.height = H;
      sceneB.width = W;
      sceneB.height = H;

      const aCtx = sceneA.getContext("2d");
      const bCtx = sceneB.getContext("2d");

      // drawZaruScene — orijinal prototipteki "contained" boyutlandırma
      aCtx.fillStyle = "#000";
      aCtx.fillRect(0, 0, W, H);
      const aspect = (zaru.videoWidth || 16) / (zaru.videoHeight || 9);
      let cssW = Math.min(window.innerWidth * 0.58, 980);
      let cssH = cssW / aspect;
      if (cssH > window.innerHeight * 0.64) {
        cssH = window.innerHeight * 0.64;
        cssW = cssH * aspect;
      }
      const w = cssW * dpr;
      const h = cssH * dpr;
      if (zaru.videoWidth) aCtx.drawImage(zaru, (W - w) / 2, (H - h) / 2, w, h);

      // drawYezScene — tam ekran cover
      bCtx.fillStyle = "#000";
      bCtx.fillRect(0, 0, W, H);
      if (yez.videoWidth) coverDraw(bCtx, yez, W, H);

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      const { uT, uAspect, texA, texB } = uniformsRef.current;

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texA);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sceneA);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, texB);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sceneB);

      gl.uniform1f(uAspect, W / H);
      gl.uniform1f(uT, clamp01(localT));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, localT]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex, opacity: active ? 1 : 0 }}
    />
  );
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}
