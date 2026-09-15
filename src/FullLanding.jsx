import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * FullLanding
 * =========================================================================
 * Tasarım tokenleri
 * -------------------------------------------------------------------------
 * Renk: ink #0A0A0A (Zaru, en derin an) -> charcoal #201E1B -> taupe
 * #55504A (geçiş bölgesi) -> ivory #EDE7DA (varış bölümü). Vurgu: emerald
 * #2F6E58 (Zaru'nun taşından), çok seyrek kullanılır (nokta göstergesi,
 * ince çizgiler).
 * Tipografi: Fraunces (display, kicker/başlıklar) + Inter (gövde/UI).
 * Layout: tam ekran (100dvh) sahneler, video/görsel arka plan, metin
 * sol-alt hizalı (merkezi "hero" klişesinden kaçınmak için), sol kenarda
 * sade nokta navigasyonu.
 * -------------------------------------------------------------------------
 * Gerçek materyal durumu (dürüst not):
 * - Zaru: henüz asset yok -> yer tutucu (koyu gradient + başlık)
 * - Yez, Seek Magic, Burton/ekran: GERÇEK video
 * - Ophelia, Sheila: GERÇEK fotoğraf, hafif Ken Burns hareketiyle
 * =========================================================================
 */

const FONT_IMPORT_HREF =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&family=Inter:wght@400;500&display=swap";

const SCENES = [
  {
    id: "zaru",
    kind: "placeholder",
    kicker: "Yang Theory",
    title: "Bir taş, uyanıyor.",
    bg: "#0A0A0A",
    cta: null,
  },
  {
    id: "yez",
    kind: "video",
    src: "/videos/scenes/yez.mp4",
    kicker: "Journey",
    title: "Orman, geri bakıyor.",
    bg: "#15140F",
    cta: null,
  },
  {
    id: "seekmagic",
    kind: "video",
    src: "/videos/scenes/seekmagic.mp4",
    kicker: "Yang Studio",
    title: "Seek Magic, everyday.",
    bg: "#241F19",
    cta: { label: "Etsy'de gör", href: "https://www.etsy.com/shop/WhispersOfYang" },
  },
  {
    id: "ophelia",
    kind: "image",
    src: "/images/scenes/ophelia.jpg",
    kicker: "Yang Studio",
    title: "Ophelia.",
    bg: "#332B22",
    cta: { label: "Etsy'de gör", href: "https://www.etsy.com/shop/WhispersOfYang" },
  },
  {
    id: "sheila",
    kind: "image",
    src: "/images/scenes/sheila.jpg",
    kicker: "Yang Studio",
    title: "Sheila, the Timeless Queen.",
    bg: "#463A2C",
    cta: { label: "Etsy'de gör", href: "https://www.etsy.com/shop/WhispersOfYang" },
  },
  {
    id: "burton",
    kind: "video",
    src: "/videos/scenes/burton-ending.mp4",
    kicker: "Yang Theory",
    title: "Burton, aynı dünyadan.",
    bg: "#5C4E3B",
    cta: null,
  },
];

function useActiveSection(count) {
  const [active, setActive] = useState(0);
  const refs = useRef({});
  const register = useCallback((i, el) => {
    refs.current[i] = el;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.idx));
          }
        });
      },
      { threshold: 0.55 }
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  const scrollTo = (i) => {
    refs.current[i]?.scrollIntoView({ behavior: "smooth" });
  };

  return { active, register, scrollTo };
}

function SceneMedia({ scene, isActive }) {
  const videoRef = useRef(null);

  // Doğal akış: aktifken baştan oynat. Kullanıcı scroll ile geçerse
  // (isActive false olur) video anında duraklar — "bitmesini bekleme"
  // davranışı yok, IntersectionObserver zaten anlık tepki veriyor.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isActive]);

  if (scene.kind === "video") {
    return (
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={scene.src}
        muted
        playsInline
      />
    );
  }

  if (scene.kind === "image") {
    return (
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.06 }}
        animate={{ scale: isActive ? 1 : 1.06 }}
        transition={{ duration: 6, ease: "easeOut" }}
        style={{
          backgroundImage: `url(${scene.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    );
  }

  // placeholder (Zaru) — asset gelene kadar sade, karanlık bir zemin
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A] to-[#15140F] flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-[#2F6E58]/30 blur-2xl" />
    </div>
  );
}

function Scene({ scene, index, active, register }) {
  const ref = useRef(null);
  useEffect(() => register(index, ref.current), [index, register]);
  const isActive = active === index;

  return (
    <section
      ref={ref}
      data-idx={index}
      className="relative h-[100dvh] w-full snap-start overflow-hidden"
      style={{ backgroundColor: scene.bg }}
    >
      <SceneMedia scene={scene} isActive={isActive} />
      {/* Alt gradyan — metin okunurluğu için, her sahnede aynı oran */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute bottom-10 left-6 right-6 md:bottom-14 md:left-14 md:right-auto md:max-w-md">
        <p
          className="text-[11px] tracking-[0.25em] text-white/60 mb-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {scene.kicker}
        </p>
        <h2
          className="text-white text-[28px] leading-[1.15] md:text-4xl"
          style={{ fontFamily: "Fraunces, serif", fontWeight: 500 }}
        >
          {scene.title}
        </h2>
        {scene.cta && (
          <a
            href={scene.cta.href}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-5 text-[13px] tracking-wide text-white/85 border border-white/25 rounded-full px-5 py-2 hover:bg-white hover:text-black transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {scene.cta.label}
          </a>
        )}
      </div>
    </section>
  );
}

function DestinationCard({ size, kicker, title, blurb, href, bg }) {
  const isLarge = size === "large";
  return (
    <a
      href={href}
      className={`group relative block overflow-hidden rounded-2xl ${
        isLarge ? "row-span-2" : ""
      }`}
      style={{ backgroundColor: bg, minHeight: isLarge ? 420 : 200 }}
    >
      <div className="absolute inset-0 p-7 flex flex-col justify-end">
        <p
          className="text-[11px] tracking-[0.2em] text-[#EDE7DA]/60 mb-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {kicker}
        </p>
        <h3
          className={`text-[#EDE7DA] ${isLarge ? "text-3xl md:text-4xl" : "text-xl"} mb-2`}
          style={{ fontFamily: "Fraunces, serif", fontWeight: 500 }}
        >
          {title}
        </h3>
        <p
          className="text-[#EDE7DA]/70 text-sm max-w-xs"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {blurb}
        </p>
      </div>
    </a>
  );
}

function DestinationSection() {
  return (
    <section className="w-full bg-[#EDE7DA] px-6 py-16 md:px-14 md:py-24">
      <p
        className="text-[11px] tracking-[0.25em] text-[#55504A] mb-3"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Şimdi
      </p>
      <h2
        className="text-[#201E1B] text-[32px] md:text-5xl mb-10 max-w-xl"
        style={{ fontFamily: "Fraunces, serif", fontWeight: 500 }}
      >
        Dünyanın içine gir.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
        <DestinationCard
          size="large"
          bg="#201E1B"
          kicker="Journey"
          title="Illustrated fable, guided by sound."
          blurb="Kitap, soundtrack, dijital indirme — Journey dünyasına gir."
          href="/journey"
        />
        <DestinationCard
          size="small"
          bg="#332B22"
          kicker="Yang Studio"
          title="El yapımı objeler"
          blurb="Takı, tepsi, sculptural work."
          href="https://www.etsy.com/shop/WhispersOfYang"
        />
        <DestinationCard
          size="small"
          bg="#463A2C"
          kicker="Watch"
          title="Filmler"
          blurb="Journey ve stüdyo filmleri."
          href="/watch"
        />
        <DestinationCard
          size="small"
          bg="#55504A"
          kicker="Creative Services"
          title="Birlikte çalışalım"
          blurb="Creative direction, branded content, web."
          href="/creative-services"
        />
      </div>
    </section>
  );
}

export default function FullLanding() {
  const { active, register, scrollTo } = useActiveSection(SCENES.length);

  useEffect(() => {
    if (document.getElementById("ft-font-link")) return;
    const link = document.createElement("link");
    link.id = "ft-font-link";
    link.rel = "stylesheet";
    link.href = FONT_IMPORT_HREF;
    document.head.appendChild(link);
  }, []);

  return (
    <div className="w-full">
      <div className="relative w-full snap-y snap-mandatory overflow-y-auto h-[100dvh]">
        {/* Nokta navigasyonu — tıklanabilir, hangi sahnede olduğumuzu gösterir */}
        <div className="fixed top-1/2 left-4 md:left-6 -translate-y-1/2 z-50 flex flex-col gap-3">
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollTo(i)}
              aria-label={s.title}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                active === i ? "bg-white scale-[2.2]" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {active === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 text-white/50 text-[11px] tracking-[0.25em]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            scroll
          </motion.div>
        )}

        {SCENES.map((scene, i) => (
          <Scene key={scene.id} scene={scene} index={i} active={active} register={register} />
        ))}

        <div className="snap-start">
          <DestinationSection />
        </div>
      </div>
    </div>
  );
}
