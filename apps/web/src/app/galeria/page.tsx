"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getPhotos, type Photo } from "@/lib/api";
import { BokehBackground } from "@/components/BokehBackground";

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await getPhotos();
        if (active) setPhotos(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    const interval = setInterval(load, 8000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-mist px-4 py-10 overflow-hidden">
      <BokehBackground />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <p className="flourish uppercase tracking-[0.2em] text-xs text-sky font-semibold mb-3">
            Luana e Michel
          </p>
          <h1 className="font-display text-4xl text-ink">Galeria da festa</h1>
          <Link href="/" className="text-sm text-sky underline underline-offset-4 mt-2 inline-block">
            Enviar uma foto
          </Link>
        </div>

        {loading && photos.length === 0 && (
          <p className="text-center text-ink/50">Carregando fotos...</p>
        )}

        {!loading && photos.length === 0 && (
          <p className="text-center text-ink/50">
            Nenhuma foto ainda — seja o primeiro a compartilhar!
          </p>
        )}

        <div className="columns-2 sm:columns-3 gap-3">
          <AnimatePresence>
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.4) }}
                whileHover={{ y: -4 }}
                className="mb-3 break-inside-avoid glass rounded-xl overflow-hiddenshadow-sm hover:shadow-lg transition-shadow"
              >
                <img
                  src={photo.url}
                  alt={photo.guestName ?? "Foto da festa"}
                  className="w-full h-auto photo-develop"
                  loading="lazy"
                />
                {photo.guestName && (
                  <p className="text-xs text-ink/60 px-2 py-1.5 truncate">
                    {photo.guestName}
                  </p>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
