import React, { useState, useEffect } from "react";

type SupportedLang = "en" | "hi";

export default function LanguageSwitcher({
  defaultLang = "en" as SupportedLang,
}: {
  defaultLang?: SupportedLang;
}) {
  const [lang, setLang] = useState<SupportedLang>(defaultLang);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // restore from localStorage
    const saved =
      typeof window !== "undefined" &&
      (localStorage.getItem("site_lang") as SupportedLang | null);
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    // whenever lang changes, perform page translation
    (async () => {
      try {
        setBusy(true);
        // translate all elements with data-translate="true"
        await translateElements('[data-translate="true"]', lang);
        localStorage.setItem("site_lang", lang);
      } catch (e) {
        console.error("translate error", e);
      } finally {
        setBusy(false);
      }
    })();
  }, [lang]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded-2xl text-sm border ${
          lang === "en" ? "bg-white/90 shadow" : ""
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>

      <button
        onClick={() => setLang("hi")}
        className={`px-3 py-1 rounded-2xl text-sm border ${
          lang === "hi" ? "bg-white/90 shadow" : ""
        }`}
        aria-pressed={lang === "hi"}
      >
        हिंदी
      </button>

      {busy && <span className="text-xs ml-2">Translating...</span>}
    </div>
  );
}
/* ==========================
   Helper: translateElements - collects visible text nodes of elements matching selector,
   sends them to /api/translate in bulk and replaces innerText while preserving original via data-original
   WARNING: This is a pragmatic approach for small sites. For large or production apps use i18n/static cached translations.
   ========================== */

async function translateElements(selector: string, target: SupportedLang) {
  if (typeof document === "undefined") return;

  const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (nodes.length === 0) return;

  // collect texts and keep mapping
  const texts: string[] = [];
  const mapping: { index: number; el: HTMLElement }[] = [];

  nodes.forEach((el) => {
    const original = el.getAttribute("data-original");
    const text = original ?? el.innerText.trim();
    // skip if empty
    if (!text) return;
    mapping.push({ index: texts.length, el });
    texts.push(text);
    // store original if not present
    if (!original) el.setAttribute("data-original", text);
  });

  if (texts.length === 0) return;

  // send to API for batch translation
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: texts, target }),
  });

  if (!res.ok) throw new Error("Translate API failed");

  const data = await res.json();
  const translations: string[] = data.translations;

  // apply translations
  mapping.forEach(({ index, el }) => {
    const translated = translations[index];
    if (translated) {
      el.innerText = translated;
    }
  });
}
