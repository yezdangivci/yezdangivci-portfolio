import React, { useRef, useState, useEffect } from "react";
import ZaruYezShift from "./ZaruYezShift";

/**
 * FullLanding v2
 * =========================================================================
 * Önceki versiyondan farkı: sahneler arası SERT KESME yok. Ziyaretçi
 * scroll ettikçe, her sahnenin son ~%28'i ile bir sonrakinin ilk ~%28'i
 * ÜST ÜSTE binerek crossfade + hafif ölçek hareketiyle birbirine
 * dönüşüyor. Tek bir sürekli scroll pozisyonu okunuyor (IntersectionObserver
 * değil), her sahnenin opaklığı/ölçeği bu pozisyona göre hesaplanıyor.
 *
 * Zaru: gerçek video + ses, kendi doğal süresiyle oynuyor.
 * Burton: finale — kendi iç anlatımını bozmamak için crossfade bölgesine
 * girdiğinde tam görünür olana kadar sabit tutulur, sonra kendi başına oynar.
 * =========================================================================
 */

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&family=Inter:wght@400;500&display=swap";

const SCENES = [
  { id: "zaru", kind: "video", src: "/videos/scenes/zaru.mp4", sound: true, bg: "#050505", contained: true },
  { id: "yez", kind: "video", src: "/videos/scenes/yez.mp4", bg: "#0D0F0C" },
  { id: "seekmagic", kind: "video", src: "/videos/scenes/seekmagic.mp4", bg: "#171310" },
  { id: "ophelia", kind: "image", src: "/images/scenes/ophelia.jpg", bg: "#241C16" },
  { id: "sheila", kind: "image", src: "/images/scenes/sheila.jpg", bg: "#332A20" },
  { id: "burton", kind: "video", src: "/videos/scenes/burton-ending.mp4", bg: "#453A2C", finale: true },
];

const OVERLAP = 0.3;

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function sceneOpacity(localT, isFirst) {
  if (isFirst) {
    // İlk sahneden önce hiçbir şey yok — solmadan, tam görünür başlar.
    if (localT > 1 - OVERLAP) return (1 - localT) / OVERLAP;
    return 1;
  }
  if (localT < OVERLAP) return localT / OVERLAP;
  if (localT > 1 - OVERLAP) return (1 - localT) / OVERLAP;
  return 1;
}

function sceneScale(localT, isLast, noScale) {
  if (isLast || noScale) return 1;
  if (localT > 1 - OVERLAP) {
    const p = (localT - (1 - OVERLAP)) / OVERLAP;
    return 1 + p * 0.06;
  }
  if (localT < OVERLAP) {
    const p = localT / OVERLAP;
    return 1.04 - p * 0.04;
  }
  return 1;
}

export default function FullLanding() {
  const containerRef = useRef(null);
  const videoRefs = useRef({});
  const [progress, setProgress] = useState(0);
  const [zaruSoundOn, setZaruSoundOn] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    if (document.getElementById("ft-font-link")) return;
    const link = document.createElement("link");
    link.id = "ft-font-link";
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const sceneH = window.innerHeight;
        const raw = el.scrollTop / sceneH;
        setProgress(clamp(raw, 0, SCENES.length - 1));
        rafRef.current = null;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    SCENES.forEach((scene, i) => {
      const v = videoRefs.current[i];
      if (!v) return;
      const localT = clamp(progress - i, -1, 1);
      const isVisible = localT > -OVERLAP && localT < 1 + OVERLAP;
      if (isVisible) {
        if (v.paused) v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [progress]);

  const scrollToScene = (i) => {
    containerRef.current?.scrollTo({ top: i * window.innerHeight, behavior: "smooth" });
  };

  const activeIndex = Math.round(progress);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative w-full h-[100dvh] overflow-y-auto overflow-x-hidden"
        style={{ scrollSnapType: "none" }}
      >
        <div className="fixed top-1/2 left-4 md:left-6 -translate-y-1/2 z-50 flex flex-col gap-3">
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollToScene(i)}
              aria-label={s.id}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === i ? "bg-white scale-[2.2]" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {activeIndex === 0 && (
          <button
            onClick={() => {
              const v = videoRefs.current[0];
              if (!v) return;
              v.muted = zaruSoundOn;
              setZaruSoundOn(!zaruSoundOn);
            }}
            className="fixed top-6 right-6 z-50 text-[11px] tracking-[0.2em] text-white/60 border border-white/20 rounded-full px-4 py-2 hover:text-white hover:border-white/50 transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {zaruSoundOn ? "sound on" : "sound off"}
          </button>
        )}

        {activeIndex === 0 && (
          <div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 text-white/40 text-[11px] tracking-[0.25em] opacity-0"
            style={{
              fontFamily: "Inter, sans-serif",
              animation: "ft-fade-in 1s ease forwards 2.2s",
            }}
          >
            scroll
          </div>
        )}

        {SCENES.map((scene, i) => {
          const localT = progress - i;
          const isLast = i === SCENES.length - 1;
          const isFirst = i === 0;

          let finalOpacity;
          let scale = 1;

          if (i === 0) {
            // Zaru: shader bölgesi başlayana kadar tam görünür, sonra
            // görünmez OLUR ama DOM'dan kaldırılmaz (canvas onu
            // yakalamaya devam edebilsin diye video oynamaya devam eder).
            finalOpacity = progress < 1 - OVERLAP ? 1 : 0;
          } else if (i === 1) {
            // Yez: shader bölgesi bitene kadar görünmez (ama oynuyor),
            // bittikten sonra kendi normal crossfade mantığına döner.
            if (progress < 1 + OVERLAP) {
              finalOpacity = 0;
            } else {
              const lt = clamp(localT, 0, 1);
              finalOpacity = clamp(sceneOpacity(lt, false), 0, 1);
              scale = sceneScale(lt, false, false);
            }
          } else {
            const opacity =
              localT < -OVERLAP || localT > 1 + OVERLAP
                ? 0
                : sceneOpacity(clamp(localT, 0, 1), isFirst) *
                  (localT < 0 || localT > 1
                    ? Math.max(0, 1 - Math.abs(localT < 0 ? localT : localT - 1) / OVERLAP)
                    : 1);
            finalOpacity = clamp(opacity, 0, 1);
            scale = sceneScale(clamp(localT, 0, 1), isLast, scene.contained);
          }

          // Zaru ve Yez HER ZAMAN render edilir (opacity 0 olsa bile) —
          // shader canvas'ının onları yakalayabilmesi için oynamaya
          // devam etmeleri gerekiyor. Diğer sahneler görünmezken DOM'dan
          // kaldırılabilir (performans).
          const alwaysRender = i === 0 || i === 1;
          if (!alwaysRender && finalOpacity <= 0.001 && !(isLast && localT >= 1)) return null;

          return (
            <div
              key={scene.id}
              className="fixed inset-0 w-full h-full pointer-events-none"
              style={{
                opacity: isLast ? clamp(localT + 1, 0, 1) : finalOpacity,
                zIndex: 10 + i,
                backgroundColor: scene.bg,
              }}
            >
              <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ transform: `scale(${scale})`, transition: "transform 0.05s linear" }}
              >
                {scene.contained ? (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    {scene.kind === "video" ? (
                      <video
                        ref={(el) => (videoRefs.current[i] = el)}
                        className="max-w-[92vw] md:max-w-[58vw] max-h-[64vh] object-contain"
                        src={scene.src}
                        muted={scene.sound ? !zaruSoundOn : true}
                        playsInline
                        loop={!scene.finale}
                      />
                    ) : (
                      <div
                        className="max-w-[92vw] md:max-w-[58vw] max-h-[64vh] w-full h-full"
                        style={{
                          backgroundImage: `url(${scene.src})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      />
                    )}
                  </div>
                ) : scene.kind === "video" ? (
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    className="absolute inset-0 w-full h-full object-cover"
                    src={scene.src}
                    muted={scene.sound ? !zaruSoundOn : true}
                    playsInline
                    loop={!scene.finale}
                  />
                ) : (
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backgroundImage: `url(${scene.src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              </div>
            </div>
          );
        })}

        <ZaruYezShift
          zaruRef={{ current: videoRefs.current[0] }}
          yezRef={{ current: videoRefs.current[1] }}
          active={progress >= 1 - OVERLAP && progress <= 1 + OVERLAP}
          localT={(progress - (1 - OVERLAP)) / (2 * OVERLAP)}
          zIndex={50}
        />

        {SCENES.map((s) => (
          <div key={s.id + "-spacer"} className="h-[100dvh] w-full" />
        ))}

        <div style={{ position: "relative", zIndex: 100 }}>
          <DestinationSection />
        </div>
      </div>

      <style>{`
        @keyframes ft-fade-in { to { opacity: 1; } }
      `}</style>
    </div>
  );
}

function DestinationCard({ span, bg, image, kicker, title, blurb, href }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={`group relative block overflow-hidden ${span}`}
      style={{ backgroundColor: bg, minHeight: 220 }}
    >
      {image && (
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div className="absolute inset-0 p-7 flex flex-col justify-end">
        <p
          className="text-[11px] tracking-[0.2em] text-white/60 mb-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {kicker}
        </p>
        <h3
          className="text-white text-2xl md:text-3xl mb-2 leading-tight"
          style={{ fontFamily: "Fraunces, serif", fontWeight: 500 }}
        >
          {title}
        </h3>
        <p className="text-white/70 text-sm max-w-xs" style={{ fontFamily: "Inter, sans-serif" }}>
          {blurb}
        </p>
      </div>
    </a>
  );
}

function DestinationSection() {
  return (
    <section className="w-full bg-[#EDE7DA] px-5 py-16 md:px-14 md:py-24">
      <h2
        className="text-[#201E1B] text-[30px] md:text-5xl mb-10 max-w-xl"
        style={{ fontFamily: "Fraunces, serif", fontWeight: 500 }}
      >
        Step into the world.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <DestinationCard
          span="md:col-span-2 md:row-span-2"
          bg="#201E1B"
          image="/images/scenes/journey-card.jpg"
          kicker="Journey"
          title="An illustrated fable, guided by sound."
          blurb="The book, the soundtrack, the audio portal — enter the storyworld."
          href="/journey"
        />
        <DestinationCard
          span=""
          bg="#332B22"
          image="/images/scenes/ophelia.jpg"
          kicker="Yang Studio"
          title="Handmade objects"
          blurb="Jewelry, trays, sculptural work."
          href="https://www.etsy.com/shop/WhispersOfYang"
        />
        <DestinationCard
          span=""
          bg="#463A2C"
          image="/images/scenes/watch-card.jpg"
          kicker="Watch"
          title="Films"
          blurb="Journey and studio films."
          href="/watch"
        />
        <DestinationCard
          span="md:col-span-3"
          bg="#55504A"
          kicker="Creative Services"
          title="Creative direction, production, and design for brands."
          blurb="Let's work together."
          href="/creative-services"
        />
      </div>
    </section>
  );
}
