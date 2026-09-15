import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/**
 * CinematicHome
 * -----------------------------------------------------------------------
 * Wes Anderson esintili, film gibi bir landing page girişi.
 * Yapı: dışarıdan eve zoom-in -> kapıdan giriş -> 3 oda arasında scroll ile
 * geçiş (Yang Studio atölyesi, Yang Theory ofisi, Journey'nin büyülü ormanı).
 * Her oda görünür olduğunda yandan bir bilgi paneli açılır (pear.no tarzı)
 * ve ziyaretçi ilgili bölüme (Etsy / Creative Services / Journey) geçebilir.
 *
 * VİDEO/GÖRSEL NOTU: Aşağıdaki `ROOMS` dizisindeki `video` alanlarına,
 * Kling/Runway'de ürettiğin klipleri /public/videos/cinematic/ klasörüne
 * atıp dosya adını yazman yeterli. Şu an placeholder (boş) bırakıldı,
 * yerine koyduğunda otomatik oynayacak.
 * -----------------------------------------------------------------------
 */

const ROOMS = [
  {
    id: "exterior",
    kicker: "YANG THEORY",
    title: "Uzakta bir ev, bir stüdyo.",
    description:
      "Ormanın kenarında, ışıkların yandığı bir ev. Yaklaştıkça, içeride neler olduğunu merak ediyorsunuz.",
    video: "/videos/cinematic/exterior.mp4",
    cta: null,
  },
  {
    id: "studio",
    kicker: "YANG STUDIO",
    title: "Atölye",
    description:
      "Şövalelerde yarım kalmış resimler, etrafa saçılmış boyalar. Bir masada epoxy dökülüyor; başka bir köşede, ince işçilikle bir obje şekilleniyor. Burada eller konuşur.",
    video: "/videos/cinematic/studio.mp4",
    cta: { label: "Yang Studio'yu Keşfet", href: "https://www.etsy.com/shop/WhispersOfYang" },
  },
  {
    id: "office",
    kicker: "YANG THEORY — YAYINCI & YAPIMCI",
    title: "Ofis",
    description:
      "Evraklar, bir kitaplık, bulmaca kutuları. Duvarda bir pano — post-it'ler, film makaraları, üzerinde projeler yazılı. Burası şirketin beyni.",
    video: "/videos/cinematic/office.mp4",
    cta: { label: "Creative Services", href: "/creative-services" },
  },
  {
    id: "forest",
    kicker: "JOURNEY",
    title: "Ay Işığındaki Orman",
    description:
      "Ofisten çıkıp bambaşka bir dünyaya adım atıyorsunuz — büyülü, fantastik, aynı zamanda küçük bir film seti. Journey'nin ormanı burada başlıyor.",
    video: "/videos/cinematic/forest.mp4",
    cta: { label: "Journey'e Gir", href: "/journey" },
  },
];

function RoomPanel({ room, active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-auto absolute right-8 top-1/2 -translate-y-1/2 w-[320px] md:w-[380px] bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-[#F5F1E8]"
        >
          <p className="text-xs tracking-[0.2em] text-white/50 mb-2">{room.kicker}</p>
          <h3 className="text-2xl font-semibold mb-3">{room.title}</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-5">{room.description}</p>
          {room.cta && (
            <a
              href={room.cta.href}
              className="inline-block text-sm tracking-wide border border-white/30 rounded-full px-5 py-2 hover:bg-white hover:text-black transition-colors"
            >
              {room.cta.label} →
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RoomSection({ room, index, activeIndex, registerRef }) {
  const ref = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    registerRef(index, ref.current);
  }, [index, registerRef]);

  const isActive = activeIndex === index;

  // Aktif olduğunda videoyu baştan oynat; pasif olduğunda duraklat.
  // loop YOK — video biter bitmez son karede durur (freeze-frame),
  // GIF gibi sürekli tekrar etmez, "film izliyorum" hissi korunur.
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

  return (
    <section
      ref={ref}
      data-room-index={index}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video / görsel katmanı */}
      <div className="absolute inset-0">
        {room.video ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={room.video}
            muted
            playsInline
            // loop yok: video bir kez oynar, son karede kalır
          />
        ) : (
          // Video henüz eklenmediyse yer tutucu (koyu gradient)
          <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Sahne başlığı (küçük, alt-orta) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 20 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center text-[#F5F1E8]"
      >
        <p className="text-xs tracking-[0.3em] text-white/50">{room.kicker}</p>
        <h2 className="text-3xl md:text-5xl font-semibold mt-2">{room.title}</h2>
      </motion.div>

      {/* Yandan açılan bilgi paneli */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <RoomPanel room={room} active={isActive} />
      </div>
    </section>
  );
}

export default function CinematicHome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef({});

  const registerRef = (index, el) => {
    sectionRefs.current[index] = el;
  };

  const scrollToRoom = (index) => {
    const el = sectionRefs.current[index];
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.roomIndex);
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.6 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full bg-black">
      {/* İlerleme göstergesi — hangi odadayız, tıklanınca o odaya atlar */}
      <div className="fixed top-1/2 left-6 -translate-y-1/2 z-50 flex flex-col gap-3">
        {ROOMS.map((room, i) => (
          <button
            key={room.id}
            onClick={() => scrollToRoom(i)}
            aria-label={room.title}
            className={`w-2 h-2 rounded-full transition-all duration-500 cursor-pointer ${
              activeIndex === i ? "bg-white scale-125" : "bg-white/30 hover:bg-white/60"
            }`}
            title={room.title}
          />
        ))}
      </div>

      {/* İlk sahnede birkaç saniye sonra beliren "aşağı kaydır" ipucu */}
      {activeIndex === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 text-white/60 pointer-events-none"
        >
          <span className="text-[10px] tracking-[0.2em]">KAYDIR</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-4 h-4 border-b-2 border-r-2 border-white/60 rotate-45"
          />
        </motion.div>
      )}

      {ROOMS.map((room, i) => (
        <RoomSection
          key={room.id}
          room={room}
          index={i}
          activeIndex={activeIndex}
          registerRef={registerRef}
        />
      ))}

      {/* Mobilde alt bilgi paneli (yanda değil, altta — küçük ekranda yer kazanmak için) */}
      <div className="md:hidden">
        {ROOMS.map((room, i) =>
          activeIndex === i ? (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-t border-white/10 p-5 text-[#F5F1E8]"
            >
              <p className="text-[10px] tracking-[0.2em] text-white/50 mb-1">{room.kicker}</p>
              <p className="text-sm text-white/70 mb-3">{room.description}</p>
              {room.cta && (
                <a
                  href={room.cta.href}
                  className="inline-block text-xs tracking-wide border border-white/30 rounded-full px-4 py-2"
                >
                  {room.cta.label} →
                </a>
              )}
            </motion.div>
          ) : null
        )}
      </div>
    </div>
  );
}
