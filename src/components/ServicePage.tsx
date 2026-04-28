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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-[#161616] border border-[#FF6A00]/40 p-8 text-center">
        <div className="w-14 h-14 bg-[#FF6A00] flex items-center justify-center mx-auto mb-4">
          <Icon name="Phone" size={24} className="text-black" />
        </div>
        <h3 className="font-oswald text-xl font-bold uppercase mb-2">Перезвоним через 5 минут!</h3>
        <p className="text-white/50 text-sm">Мастер свяжется с вами и ответит на все вопросы.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#161616] border border-white/8 p-8">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-2 h-2 bg-[#FF6A00] rounded-full animate-pulse" />
        <span className="font-oswald text-xs tracking-widest text-[#FF6A00] uppercase">Перезвоним через 5 минут</span>
      </div>
      <h3 className="font-oswald text-2xl font-bold uppercase mb-1">{cta}</h3>
      <p className="text-white/45 text-sm mb-6">Оставьте номер — мастер позвонит и ответит на все вопросы</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="font-oswald text-[10px] tracking-widest text-white/40 uppercase block mb-1.5">Ваше имя</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            placeholder="Иван Иванов"
            required
            className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#FF6A00] transition-colors"
          />
        </div>
        <div>
          <label className="font-oswald text-[10px] tracking-widest text-white/40 uppercase block mb-1.5">Телефон</label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
            placeholder="+7 (___) ___-__-__"
            required
            className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#FF6A00] transition-colors"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-[#FF6A00] text-black font-oswald font-bold text-sm tracking-widest py-4 uppercase hover:bg-[#e05a00] transition-colors"
      >
        Перезвоните мне через 5 минут
      </button>
      <p className="text-white/20 text-xs mt-3 text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
    </form>
  );
}

export default function ServicePage({
  title,
  subtitle,
  description,
  heroIcon,
  benefits,
  steps,
  faq,
  cta,
}: ServicePageProps) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white overflow-x-hidden" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300 }}>

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#0d0d0d]/96 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link to="/" className="font-oswald text-lg font-bold tracking-widest uppercase">
            КРОВ<span className="text-[#FF6A00]">ЕЛЬ</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1.5 font-oswald text-xs tracking-widest text-white/50 hover:text-white uppercase transition-colors">
              <Icon name="ArrowLeft" size={12} />
              Все услуги
            </Link>
            <a
              href="tel:+79001234567"
              className="bg-[#FF6A00] text-black font-oswald font-semibold text-xs tracking-widest px-4 py-2.5 uppercase hover:bg-[#e05a00] transition-colors"
            >
              +7 (900) 123-45-67
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-[60px]">
        <div className="bg-[#111] border-b border-white/5">
          <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#FF6A00]" />
                <span className="font-oswald text-[11px] tracking-[0.3em] text-[#FF6A00] uppercase">Кровельные работы</span>
              </div>
              <h1 className="font-oswald text-[clamp(2.2rem,5vw,4rem)] font-bold uppercase leading-tight mb-4">
                {title}
              </h1>
              <p className="text-[#FF6A00] font-oswald text-base tracking-wide mb-5">{subtitle}</p>
              <p className="text-white/60 leading-relaxed text-base mb-8">{description}</p>
              <div className="flex flex-wrap gap-3">
                <a href="#form"
                  className="bg-[#FF6A00] text-black font-oswald font-bold text-sm tracking-widest px-7 py-4 uppercase hover:bg-[#e05a00] transition-colors">
                  Перезвоните мне
                </a>
                <a href="tel:+79001234567"
                  className="flex items-center gap-2 border border-white/20 text-white font-oswald text-sm tracking-widest px-7 py-4 uppercase hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors">
                  <Icon name="Phone" size={14} />
                  Позвонить
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-56 h-56 md:w-72 md:h-72 bg-[#FF6A00]/8 flex items-center justify-center border border-[#FF6A00]/20">
                  <Icon name={heroIcon as any} size={96} className="text-[#FF6A00]/70" />
                </div>
                <div className="absolute -top-3 -right-3 w-full h-full border border-[#FF6A00]/15 pointer-events-none" />
                {/* badges */}
                <div className="absolute -bottom-5 -left-5 bg-[#FF6A00] text-black font-oswald font-bold text-xs tracking-widest px-4 py-2">
                  ГАРАНТИЯ 5 ЛЕТ
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="font-oswald text-2xl md:text-3xl font-bold uppercase mb-8">
            Что вы получаете
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div key={b.text} className="flex items-start gap-4 bg-[#111] border border-white/5 p-5 hover:border-[#FF6A00]/30 transition-colors">
                <div className="flex-shrink-0 w-9 h-9 bg-[#FF6A00] flex items-center justify-center mt-0.5">
                  <Icon name={b.icon as any} size={16} className="text-black" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="form" className="py-16 bg-[#111]">
        <div className="max-w-2xl mx-auto px-5">
          <QuickForm cta={cta} />
        </div>
      </section>

      {/* STEPS */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="font-oswald text-2xl md:text-3xl font-bold uppercase mb-8">
            Как проходит работа
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((s) => (
              <div key={s.num} className="relative bg-[#111] border border-white/5 p-6 hover:border-[#FF6A00]/30 transition-colors">
                <div className="font-oswald text-[4.5rem] font-bold text-[#FF6A00]/8 leading-none absolute top-3 right-4 select-none">{s.num}</div>
                <div className="font-oswald text-xs text-[#FF6A00] tracking-widest mb-2">{s.num}</div>
                <h3 className="font-oswald text-sm font-bold uppercase tracking-wide mb-1.5">{s.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#111]">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-oswald text-2xl md:text-3xl font-bold uppercase mb-8">
            Частые вопросы
          </h2>
          <div className="space-y-3">
            {faq.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-14 bg-[#FF6A00]">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-oswald text-black text-2xl font-bold uppercase">Остались вопросы?</p>
            <p className="text-black/70 text-sm mt-1">Позвоните или оставьте заявку — перезвоним через 5 минут</p>
          </div>
          <div className="flex gap-3">
            <a href="tel:+79001234567"
              className="flex items-center gap-2 bg-black text-white font-oswald font-bold text-sm tracking-widest px-7 py-4 uppercase hover:bg-[#1a1a1a] transition-colors">
              <Icon name="Phone" size={14} />
              Позвонить
            </a>
            <a href="#form"
              className="bg-white text-black font-oswald font-bold text-sm tracking-widest px-7 py-4 uppercase hover:bg-white/90 transition-colors">
              Перезвоните мне
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#090909] border-t border-white/5 py-6">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="font-oswald text-base font-bold tracking-widest uppercase">
            КРОВ<span className="text-[#FF6A00]">ЕЛЬ</span>
          </Link>
          <p className="text-white/25 text-xs">© 2024 Кровельная компания. Все права защищены.</p>
          <a href="tel:+79001234567" className="flex items-center gap-2 font-oswald text-sm text-[#FF6A00] tracking-wider hover:text-[#e05a00] transition-colors">
            <Icon name="Phone" size={13} />
            +7 (900) 123-45-67
          </a>
        </div>
      </footer>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 hover:border-[#FF6A00]/30 transition-colors">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span className="font-oswald text-sm font-semibold tracking-wide uppercase">{q}</span>
        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={16} className="text-[#FF6A00] flex-shrink-0" />
      </button>
      {open && (
        <div className="px-6 pb-4 text-white/55 text-sm leading-relaxed border-t border-white/5">{a}</div>
      )}
    </div>
  );
}
