import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export default function ContactModal({ open, onClose, title = "Получить консультацию" }: ContactModalProps) {
  const [form, setForm] = useState({ name: "", phone: "", question: "" });
  const [sent, setSent] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // reset on close
  useEffect(() => {
    if (!open) { setTimeout(() => { setForm({ name: "", phone: "", question: "" }); setSent(false); }, 300); }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="bg-white w-full max-w-md shadow-2xl relative animate-fade-in-up"
        style={{ animationDuration: "0.25s" }}
      >
        {/* header */}
        <div className="flex items-center justify-between px-4 md:px-7 pt-5 md:pt-7 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
              <span style={{ fontFamily: "'Oswald',sans-serif" }}
                className="text-[11px] tracking-[0.3em] text-[#FF6A00] uppercase font-semibold">
                Перезвоним через 15 минут
              </span>
            </div>
            <h2 style={{ fontFamily: "'Oswald',sans-serif" }}
              className="text-xl font-bold uppercase text-gray-900 leading-tight">{title}</h2>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0 ml-4">
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* body */}
        <div className="px-4 md:px-7 py-4 md:py-6">
          {sent ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[#FF6A00] flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCheck" size={28} className="text-white" />
              </div>
              <h3 style={{ fontFamily: "'Oswald',sans-serif" }}
                className="text-xl font-bold uppercase text-gray-900 mb-2">Заявка принята!</h3>
              <p className="text-gray-500 text-sm">Перезвоним в течение 15 минут.<br />Консультируем бесплатно.</p>
              <button onClick={onClose}
                style={{ fontFamily: "'Oswald',sans-serif" }}
                className="mt-6 bg-[#FF6A00] text-white font-bold text-sm tracking-widest px-8 py-3 uppercase hover:bg-[#e05a00] transition-colors w-full">
                Закрыть
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-3 mb-4">
                <div>
                  <label style={{ fontFamily: "'Oswald',sans-serif" }}
                    className="text-[10px] tracking-widest text-gray-400 uppercase block mb-1.5">Ваше имя</label>
                  <input type="text" placeholder="Иван Иванов"
                    value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required
                    className="w-full border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#FF6A00] transition-colors" />
                </div>
                <div>
                  <label style={{ fontFamily: "'Oswald',sans-serif" }}
                    className="text-[10px] tracking-widest text-gray-400 uppercase block mb-1.5">Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__"
                    value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required
                    className="w-full border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#FF6A00] transition-colors" />
                </div>
                <div>
                  <label style={{ fontFamily: "'Oswald',sans-serif" }}
                    className="text-[10px] tracking-widest text-gray-400 uppercase block mb-1.5">Вопрос или задача (необязательно)</label>
                  <textarea placeholder="Например: нужна смета на металлочерепицу 120 м²"
                    rows={3} value={form.question} onChange={e => setForm(p => ({ ...p, question: e.target.value }))}
                    className="w-full border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#FF6A00] transition-colors resize-none" />
                </div>
              </div>
              <button type="submit"
                style={{ fontFamily: "'Oswald',sans-serif" }}
                className="w-full bg-[#FF6A00] text-white font-bold text-sm tracking-widest py-4 uppercase hover:bg-[#e05a00] transition-colors">
                Перезвоните мне через 15 минут
              </button>
              <p className="text-gray-400 text-[11px] mt-3 text-center">Консультация бесплатна · Без обязательств</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}