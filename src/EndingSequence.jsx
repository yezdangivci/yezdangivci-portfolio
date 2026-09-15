import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * EndingSequence
 * -----------------------------------------------------------------------
 * Zincirin son halkası: Burton -> ekran reveal.
 *
 * Mantık (ardışık, EŞ ZAMANLI DEĞİL):
 * 1) Burton uçuş videosu baştan sona, KESİNTİSİZ, kendi doğal akışında
 *    oynar. İçindeki zoom-out (~2:20 civarı, küçük Yez'in belirmesi)
 *    zaten videonun kendi içinde var — biz dokunmuyoruz, olduğu gibi
 *    izletiyoruz.
 * 2) Burton videosu doğal olarak bitince (onEnded), KISA bir kesmeyle
 *    ekran/gerçek-üretici videosuna geçilir.
 * 3) Ekran videosu KISA tutulur (SCREEN_HOLD_MS) — çünkü kendisi zaten
 *    statik bir kompozit (fotoğraf + ekran overlay), uzun tutmanın
 *    getirisi yok. Sadece "dünya ekrandan çıktı" hissini vermeye yeter.
 * 4) Ekran videosu bitince (ya da hold süresi dolunca) sequence biter —
 *    bu, tüm landing page hikayesinin sonu. Buradan sonrası normal
 *    sayfa akışına (Creative Services vb.) bırakılır, ekstra bir
 *    efekt/CTA eklenmez.
 * -----------------------------------------------------------------------
 */

const SCREEN_HOLD_MS = 1800; // ekran videosunun ekranda kalma süresi

export default function EndingSequence({ onComplete }) {
  const [stage, setStage] = useState("burton"); // "burton" | "screen" | "done"
  const burtonRef = useRef(null);
  const screenRef = useRef(null);

  // Burton videosu kendi doğal süresiyle oynar, bittiğinde ekrana geçilir.
  useEffect(() => {
    const v = burtonRef.current;
    if (!v || stage !== "burton") return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [stage]);

  // Ekran videosu kısa tutulur, süre dolunca sequence tamamlanır.
  useEffect(() => {
    if (stage !== "screen") return;
    const v = screenRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
    const t = setTimeout(() => {
      setStage("done");
      if (onComplete) onComplete();
    }, SCREEN_HOLD_MS);
    return () => clearTimeout(t);
  }, [stage, onComplete]);

  const handleBurtonEnded = () => setStage("screen");

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === "burton" && (
          <motion.video
            key="burton"
            ref={burtonRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/ending/burton-flight.mp4"
            muted
            playsInline
            onEnded={handleBurtonEnded}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        )}

        {(stage === "screen" || stage === "done") && (
          <motion.video
            key="screen"
            ref={screenRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/ending/yez-screen.mp4"
            muted
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Hikaye burada bitiyor — ekstra metin/CTA yok, sadece normal
          sayfa akışına devam edildiğine dair sessiz bir ipucu. */}
      {stage === "done" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-[0.2em]"
        >
          KAYDIR
        </motion.div>
      )}
    </div>
  );
}
