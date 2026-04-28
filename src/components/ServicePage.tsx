/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export interface ServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  heroIcon: string;
  benefits: { icon: string; text: string }[];
  steps: { num: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
  cta: string;
}

function QuickForm({ cta }: { cta: string }) {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [sent, setSent] = useState(false);

  if (sent) return (
    <div className="bg-white border border-gray-200 shadow-md p-8 text-center">
      <div className="w-14 h-14 bg-[#FF6A00] flex items-center justify-center mx-auto mb-4">
        <Icon name="Phone" size={24} className="text-white" />
      </div>
      <h3 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-2">Перезвоним через 5 минут!</h3>
      <p className="text-gray-500 text-sm">Мастер свяжется и ответит на все вопросы.</p>
    </div>
  );

  return (
    <form onSubmit={e => { e.preventDefault(); setSent(true); }}
      className="bg-white border border-gray-200 shadow-md p-7">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
        <span style={{ fontFamily: "'Oswald',sans-serif" }} className="text-[11px] tracking-[0.3em] text-[#FF6A00] uppercase font-semibold">
          Перезвоним через 5 минут
        </span>
      </div>
      <h3 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-5 leading-tight">{cta}</h3>
      <div className="space-y-3 mb-4">
        <input type="text" placeholder="Ваше имя" value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required
          className="w-full border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#FF6A00] transition-colors" />
        <input type="tel" placeholder="+7 (___) ___-__-__" value={form.phone}
          onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required
          className="w-full border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#FF6A00] transition-colors" />
      </div>
      <button type="submit"
        style={{ fontFamily: "'Oswald',sans-serif" }}
        className="w-full bg-[#FF6A00] text-white font-bold text-sm tracking-widest py-4 uppercase hover:bg-[#e05a00] transition-colors">
        Перезвоните мне через 5 минут
      </button>
      <p className="text-gray-400 text-[11px] mt-2 text-center">Замер бесплатно · Без обязательств</p>
    </form>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 hover:border-[#FF6A00] transition-colors bg-white">
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left">
        <span style={{ fontFamily: "'Oswald',sans-serif" }} className="text-sm font-semibold tracking-wide uppercase text-gray-900">{q}</span>
        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={16} className="text-[#FF6A00] flex-shrink-0" />
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100">{a}</div>
      )}
    </div>
  );
}

export default function ServicePage({ title, subtitle, description, heroIcon, benefits, steps, faq, cta }: ServicePageProps) {
  return (
    <div className="min-h-screen bg-[#f8f8f8] text-gray-900 overflow-x-hidden" style={{ fontFamily: "'Roboto',sans-serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/97 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link to="/" style={{ fontFamily: "'Oswald',sans-serif" }}
            className="text-lg font-bold tracking-widest uppercase text-gray-900">
            КРОВ<span className="text-[#FF6A00]">ЕЛЬ</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/"
              style={{ fontFamily: "'Oswald',sans-serif" }}
              className="flex items-center gap-1.5 text-xs tracking-widest text-gray-500 hover:text-gray-900 uppercase transition-colors">
              <Icon name="ArrowLeft" size={12} />
              Все услуги
            </Link>
            <a href="tel:+79001234567"
              style={{ fontFamily: "'Oswald',sans-serif" }}
              className="bg-[#FF6A00] text-white font-semibold text-xs tracking-widest px-4 py-2.5 uppercase hover:bg-[#e05a00] transition-colors">
              +7 (900) 123-45-67
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-[60px]">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#FF6A00]" />
                <span style={{ fontFamily: "'Oswald',sans-serif" }} className="text-[11px] tracking-[0.3em] text-[#FF6A00] uppercase font-semibold">
                  Кровельные работы
                </span>
              </div>
              <h1 style={{ fontFamily: "'Oswald',sans-serif" }}
                className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold uppercase leading-tight text-gray-900 mb-4">
                {title}
              </h1>
              <p className="text-[#FF6A00] font-semibold text-base mb-5" style={{ fontFamily: "'Oswald',sans-serif" }}>{subtitle}</p>
              <p className="text-gray-600 leading-relaxed text-base mb-8">{description}</p>
              <div className="flex flex-wrap gap-3">
                <a href="#form"
                  style={{ fontFamily: "'Oswald',sans-serif" }}
                  className="bg-[#FF6A00] text-white font-bold text-sm tracking-widest px-7 py-4 uppercase hover:bg-[#e05a00] transition-colors">
                  Перезвоните мне
                </a>
                <a href="tel:+79001234567"
                  style={{ fontFamily: "'Oswald',sans-serif" }}
                  className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 font-semibold text-sm tracking-widest px-7 py-4 uppercase hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors">
                  <Icon name="Phone" size={14} />
                  Позвонить
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-56 h-56 md:w-64 md:h-64 bg-orange-50 border-2 border-[#FF6A00]/20 flex items-center justify-center">
                  <Icon name={heroIcon as any} size={88} className="text-[#FF6A00]/50" />
                </div>
                <div className="absolute -top-3 -right-3 w-full h-full border-2 border-gray-200 pointer-events-none" />
                <div className="absolute -bottom-5 -left-5 bg-[#FF6A00] text-white font-bold text-xs tracking-widest px-4 py-2"
                  style={{ fontFamily: "'Oswald',sans-serif" }}>
                  ГАРАНТИЯ 5 ЛЕТ
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 bg-[#f4f4f4]">
        <div className="max-w-6xl mx-auto px-5">
          <h2 style={{ fontFamily: "'Oswald',sans-serif" }}
            className="text-2xl md:text-3xl font-bold uppercase text-gray-900 mb-8">Что вы получаете</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map(b => (
              <div key={b.text} className="flex items-start gap-4 bg-white border border-gray-200 p-5 hover:border-[#FF6A00] transition-colors">
                <div className="flex-shrink-0 w-9 h-9 bg-[#FF6A00] flex items-center justify-center mt-0.5">
                  <Icon name={b.icon as any} size={16} className="text-white" />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="form" className="py-16 bg-white">
        <div className="max-w-xl mx-auto px-5">
          <QuickForm cta={cta} />
        </div>
      </section>

      {/* STEPS */}
      <section className="py-16 bg-[#f4f4f4]">
        <div className="max-w-6xl mx-auto px-5">
          <h2 style={{ fontFamily: "'Oswald',sans-serif" }}
            className="text-2xl md:text-3xl font-bold uppercase text-gray-900 mb-8">Как проходит работа</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map(s => (
              <div key={s.num} className="relative bg-white border border-gray-200 p-6 hover:border-[#FF6A00] transition-colors">
                <div style={{ fontFamily: "'Oswald',sans-serif" }}
                  className="text-[4rem] font-bold text-gray-100 leading-none absolute top-3 right-4 select-none">{s.num}</div>
                <div style={{ fontFamily: "'Oswald',sans-serif" }} className="text-xs text-[#FF6A00] tracking-widest mb-2 font-semibold">{s.num}</div>
                <h3 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-sm font-bold uppercase tracking-wide mb-1.5 text-gray-900">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-5">
          <h2 style={{ fontFamily: "'Oswald',sans-serif" }}
            className="text-2xl md:text-3xl font-bold uppercase text-gray-900 mb-8">Частые вопросы</h2>
          <div className="space-y-3">
            {faq.map(item => <FaqItem key={item.q} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-14 bg-[#FF6A00]">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p style={{ fontFamily: "'Oswald',sans-serif" }} className="text-white text-2xl font-bold uppercase">Остались вопросы?</p>
            <p className="text-white/80 text-sm mt-1">Перезвоним через 5 минут и ответим на всё</p>
          </div>
          <div className="flex gap-3">
            <a href="tel:+79001234567"
              style={{ fontFamily: "'Oswald',sans-serif" }}
              className="flex items-center gap-2 bg-white text-gray-900 font-bold text-sm tracking-widest px-7 py-4 uppercase hover:bg-gray-100 transition-colors">
              <Icon name="Phone" size={14} />
              Позвонить
            </a>
            <a href="#form"
              style={{ fontFamily: "'Oswald',sans-serif" }}
              className="bg-gray-900 text-white font-bold text-sm tracking-widest px-7 py-4 uppercase hover:bg-black transition-colors">
              Перезвоните мне
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" style={{ fontFamily: "'Oswald',sans-serif" }}
            className="text-base font-bold tracking-widest uppercase text-white">
            КРОВ<span className="text-[#FF6A00]">ЕЛЬ</span>
          </Link>
          <p className="text-gray-500 text-xs">© 2024 Кровельная компания. Все права защищены.</p>
          <a href="tel:+79001234567"
            style={{ fontFamily: "'Oswald',sans-serif" }}
            className="flex items-center gap-2 text-sm text-[#FF6A00] tracking-wider hover:text-[#e05a00] transition-colors">
            <Icon name="Phone" size={13} />
            +7 (900) 123-45-67
          </a>
        </div>
      </footer>
    </div>
  );
}
