"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { uploadPhoto } from "@/lib/api";
import { BokehBackground } from "@/components/BokehBackground";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setStatus("idle");
  }

  async function handleSubmit() {
    if (!file) return;
    setStatus("uploading");
    try {
      await uploadPhoto(file, guestName);
      setStatus("success");
      setFile(null);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (error) {
      setStatus("error");
      setErrorMsg(error instanceof Error ? error.message : "Erro desconhecido");
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden bg-mist">
      <BokehBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-sm glass rounded-3xl p-8 shadow-xl shadow-sky/10 text-center"
      >
        <p className="flourish uppercase tracking-[0.2em] text-xs text-sky font-semibold mb-3">
          Luana e Michel
        </p>
        <h1 className="font-display text-4xl text-ink mb-1">Compartilhe o momento</h1>
        <p className="shine-btn w-full py-3 rounded-xl bg-deep text-white font-medium disabled:opacity-40 transition-opacity">
          Envie as fotos que você tirou da festa
        </p>

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              <img
                src={preview}
                alt="Prévia da foto"
                className="w-full aspect-square object-cover rounded-2xl border border-ice"
              />
            </motion.div>
          ) : (
            <motion.label
              key="picker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              htmlFor="photo-input"
              className="flex flex-col items-center justify-center w-full aspect-square rounded-2xl border-2 border-dashed border-ice bg-white/40 mb-6 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <span className="text-5xl mb-2">📷</span>
              <span className="text-ink/60 text-sm">Tocar para tirar ou escolher foto</span>
            </motion.label>
          )}
        </AnimatePresence>

        <input
          ref={inputRef}
          id="photo-input"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        <input
          type="text"
          placeholder="Seu nome (opcional)"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl border border-ice bg-white/60 text-ink placeholder:text-ink/40 outline-none focus:border-sky transition-colors"
        />

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={!file || status === "uploading"}
          className="w-full py-3 rounded-xl bg-deep text-white font-medium disabled:opacity-40 transition-opacity"
        >
          {status === "uploading" ? "Enviando..." : "Enviar foto"}
        </motion.button>

        {status === "success" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-deep text-sm mt-4"
          >
            Foto enviada! Obrigado 
          </motion.p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-sm mt-4">{errorMsg}</p>
        )}

        <Link
          href="/galeria"
          className="block mt-8 text-sm text-sky underline underline-offset-4"
        >
          Ver galeria de fotos
        </Link>
      </motion.div>
    </main>
  );
}
