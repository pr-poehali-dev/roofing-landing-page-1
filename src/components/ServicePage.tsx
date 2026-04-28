/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import ContactModal from "@/components/ContactModal";
import PromoBanner from "@/components/PromoBanner";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { formatPhone } from "@/utils/phoneFormat";
import Logo from "@/components/Logo";
import { sendLead } from "@/utils/sendLead";
import {
  trackServiceFormSubmit, trackServicePageView,
  trackContactModalOpen, trackPhoneClick,
  trackCtaClick, trackFaqToggle,
} from "@/utils/analytics";

export interface ServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  heroIcon: string;
  benefits: { icon: string; text: string }[];
  steps: { num: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
  cta: string;
  photos?: { src: string; caption: string }[];
}

// ── helpers ──────────────────────────────────────────────────────────────────

function RevealBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

const OL = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: "'Oswald',sans-serif" }} className="text-[11px] tracking-[0.3em] text-[#FF6A00] uppercase font-semibold">{children}</span>
);
const ALine = () => <div className="h-px w-10 bg-[#FF6A00] flex-shrink-0" />;

// ── Service-specific reviews (slightly different from homepage) ──────────────
const SERVICE_REVIEWS = [
  { name: "Николай Фёдоров", loc: "Одинцово, дом 120 м²", text: "Ребята работают быстро и чисто. После замера сразу назвали точную цену — не гадали. Сделали всё за 4 дня, даже в дождь не останавливались.", stars: 5 },
  { name: "Марина Соколова", loc: "Домодедово, дача", text: "Долго искала нормальную бригаду. Эти не обманули: цена не изменилась, приехали в назначенное время. Конденсат в чердаке пропал полностью.", stars: 5 },
  { name: "Игорь Белов", loc: "Серпухов, коттедж", text: "Обратился по рекламе, немного сомневался. Но всё вышло лучше, чем ожидал. Объяснили каждый шаг, показали что и как. Буду рекомендовать.", stars: 5 },
];

// ── Why us (different angle from homepage) ───────────────────────────────────
const WHY_SERVICE = [
  { icon: "Clock", title: "Замер через 3 часа", desc: "Позвонили — мастер уже едет. Бесплатно, без обязательств." },
  { icon: "FileCheck", title: "Цена фиксируется", desc: "После замера цена не меняется. Написано в договоре." },
  { icon: "CalendarCheck", title: "Старт на следующий день", desc: "Согласовали — выходим на объект уже завтра." },
  { icon: "ShieldCheck", title: "Гарантия 3 года", desc: "На все работы. Приедем и исправим — бесплатно." },
  { icon: "Eye", title: "Ежедневный контроль", desc: "Можете следить за работой каждый день. Ничего не скрываем." },
  { icon: "Users", title: "Своя бригада", desc: "15 мастеров, граждане РФ. Никакого случайного субподряда." },
];

// ── Process steps (numbered timeline style) ──────────────────────────────────
const PROCESS_STEPS = [
  { num: "1", title: "Звонок", desc: "Рассказываете задачу — мы слушаем и объясняем, что нужно сделать." },
  { num: "2", title: "Выезд мастера", desc: "Приедем в течение 3 часов. Осмотрим объект, замерим площадь." },
  { num: "3", title: "Смета за 24 часа", desc: "Фиксируем цену письменно. Никаких «по ситуации» и доплат." },
  { num: "4", title: "Работа", desc: "Выходим на объект в согласованный день. С 8 утра до темноты." },
  { num: "5", title: "Сдача и гарантия", desc: "Подписываете акт, получаете гарантийный паспорт на 3 года." },
];

// ── Quick form ────────────────────────────────────────────────────────────────

function QuickForm({ cta }: { cta: string }) {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [consentData, setConsentData] = useState(false);
  const [consentPolicy, setConsentPolicy] = useState(false);
  const [sent, setSent] = useState(false);
  const allConsented = consentData && consentPolicy;

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
    <form onSubmit={e => { e.preventDefault(); if (allConsented) { trackServiceFormSubmit(cta); sendLead({ name: form.name, phone: form.phone, source: `Страница услуги: ${cta}` }); setSent(true); } }}
      className="bg-white border border-gray-200 shadow-md p-7">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
        <OL>Перезвоним через 5 минут</OL>
      </div>
      <h3 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-5 leading-tight">{cta}</h3>
      <div className="space-y-3 mb-4">
        <input type="text" placeholder="Ваше имя" value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required
          className="w-full border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#FF6A00] transition-colors" />
        <input type="tel" placeholder="+7 (___) ___-__-__" value={form.phone}
          onChange={e => setForm(p => ({ ...p, phone: formatPhone(e.target.value) }))} required
          className="w-full border border-gray-300 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-[#FF6A00] transition-colors" />
      </div>
      <div className="mb-4">
        <ConsentCheckbox
          consentData={consentData} onConsentData={setConsentData}
          consentPolicy={consentPolicy} onConsentPolicy={setConsentPolicy}
        />
      </div>
      <button type="submit" disabled={!allConsented}
        style={{ fontFamily: "'Oswald',sans-serif" }}
        className={`w-full font-bold text-sm tracking-widest py-4 uppercase transition-colors ${
          allConsented ? "bg-[#FF6A00] text-white hover:bg-[#e05a00]" : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}>
        Перезвоните мне через 5 минут
      </button>
    </form>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 hover:border-[#FF6A00] transition-colors bg-white">
      <button onClick={() => { setOpen(v => !v); if (!open) trackFaqToggle(q); }}
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

// ── Main component ────────────────────────────────────────────────────────────

export default function ServicePage({ title, subtitle, description, heroIcon, benefits, steps, faq, cta, photos }: ServicePageProps) {
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => { trackServicePageView(title); }, [title]);
  const [modal, setModal] = useState<{ open: boolean; title: string }>({ open: false, title: "" });
  const openModal = (t: string) => { trackContactModalOpen(title); setModal({ open: true, title: t }); };
  const closeModal = () => setModal(p => ({ ...p, open: false }));

  const allPhotos = photos && photos.length > 0 ? photos : [
    { src: "https://cdn.poehali.dev/projects/0a66a9c5-b11e-428a-881d-33e417292011/files/eb1d19fa-a54a-4956-a3ee-268508e4269a.jpg", caption: "Работы на объекте" },
    { src: "https://cdn.poehali.dev/projects/0a66a9c5-b11e-428a-881d-33e417292011/files/c77f04e1-52d9-455c-9329-d9ed6ee8f8c2.jpg", caption: "Результат до и после" },
    { src: "https://cdn.poehali.dev/projects/0a66a9c5-b11e-428a-881d-33e417292011/files/52607fd3-f0f6-4492-922f-190b3233c4a4.jpg", caption: "Готовый объект" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-gray-900 overflow-x-hidden" style={{ fontFamily: "'Roboto',sans-serif" }}>
      <ContactModal open={modal.open} onClose={closeModal} title={modal.title} />

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link to="/"><Logo /></Link>
          <div className="flex items-center gap-4">
            <Link to="/" style={{ fontFamily: "'Oswald',sans-serif" }}
              className="flex items-center gap-1.5 text-xs tracking-widest text-gray-500 hover:text-gray-900 uppercase transition-colors">
              <Icon name="ArrowLeft" size={12} />
              Все услуги
            </Link>
            <a href="tel:+79681003243" onClick={() => trackPhoneClick("service_nav")}
              style={{ fontFamily: "'Oswald',sans-serif" }}
              className="bg-[#FF6A00] text-white font-semibold text-xs tracking-widest px-4 py-2.5 uppercase hover:bg-[#e05a00] transition-colors">
              +7 (968) 100-32-43
            </a>
          </div>
        </div>
      </nav>

      {/* ── PROMO BANNER ── */}
      <div className="pt-[60px]">
        <PromoBanner />
      </div>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "72vh" }}>
        {/* background image */}
        <div className="absolute inset-0">
          <img
            src={allPhotos[0].src}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/88 via-gray-900/60 to-gray-900/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        </div>

        {/* content */}
        <div className="relative max-w-6xl mx-auto px-4 md:px-5 py-16 md:py-28 flex items-center" style={{ minHeight: "60vh" }}>
          <div className="max-w-2xl">
            <div className="animate-fade-in-up flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#FF6A00]" />
              <span style={{ fontFamily: "'Oswald',sans-serif" }} className="text-[11px] tracking-[0.3em] text-[#FF6A00] uppercase font-semibold">
                Кровельные работы
              </span>
            </div>
            <h1 style={{ fontFamily: "'Oswald',sans-serif", animationDelay: "0.1s" }}
              className="animate-fade-in-up text-[clamp(1.8rem,5vw,4rem)] font-bold uppercase leading-tight text-white mb-3">
              {title}
            </h1>
            <p style={{ fontFamily: "'Oswald',sans-serif", animationDelay: "0.2s" }}
              className="animate-fade-in-up text-[#FF6A00] font-semibold text-base mb-4">{subtitle}</p>
            <p style={{ animationDelay: "0.25s" }}
              className="animate-fade-in-up text-white/75 text-sm md:text-base leading-relaxed mb-6 max-w-lg hidden sm:block">{description}</p>
            <div className="animate-fade-in-up flex flex-wrap gap-3 mb-10" style={{ animationDelay: "0.3s" }}>
              <button onClick={() => openModal("Перезвоните мне")}
                style={{ fontFamily: "'Oswald',sans-serif" }}
                className="bg-[#FF6A00] text-white font-bold text-sm tracking-widest px-7 py-4 uppercase hover:bg-[#e05a00] transition-colors">
                Перезвоните мне
              </button>
              <a href="tel:+79681003243" onClick={() => trackPhoneClick("service_hero")}
                style={{ fontFamily: "'Oswald',sans-serif" }}
                className="flex items-center gap-2 border-2 border-white/40 text-white font-semibold text-sm tracking-widest px-7 py-4 uppercase hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors">
                <Icon name="Phone" size={14} />
                Позвонить
              </a>
            </div>
            {/* badges — скрыты на маленьких экранах */}
            <div className="animate-fade-in-up hidden sm:flex flex-wrap gap-3" style={{ animationDelay: "0.4s" }}>
              {[
                { icon: "Zap", text: "За 5 дней" },
                { icon: "ShieldCheck", text: "Гарантия 5 лет" },
                { icon: "Clock", text: "Замер за 3 часа" },
                { icon: "DollarSign", text: "Цена фиксируется" },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5">
                  <Icon name={b.icon as any} size={13} className="text-[#FF6A00]" />
                  <span style={{ fontFamily: "'Oswald',sans-serif" }} className="text-xs tracking-widest uppercase text-white/80">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-16 bg-[#f4f4f4]">
        <div className="max-w-6xl mx-auto px-5">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-3"><ALine /><OL>Что вы получаете</OL></div>
            <h2 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-3xl font-bold uppercase text-gray-900 mb-8">Результат работы</h2>
          </RevealBlock>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
            {benefits.map(b => (
              <RevealBlock key={b.text} className="h-full">
                <div className="flex items-start gap-4 bg-white border border-gray-200 p-5 hover:border-[#FF6A00] transition-colors h-full">
                  <div className="flex-shrink-0 w-9 h-9 bg-[#FF6A00] flex items-center justify-center mt-0.5">
                    <Icon name={b.icon as any} size={16} className="text-white" />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{b.text}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTOS / PORTFOLIO ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-3"><ALine /><OL>Примеры работ</OL></div>
            <h2 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-3xl font-bold uppercase text-gray-900 mb-8">Фото наших объектов</h2>
          </RevealBlock>

          <RevealBlock>
            {/* Main photo */}
            <div className="relative overflow-hidden mb-3 group cursor-pointer h-48 sm:h-72 md:h-[400px]"
              onClick={() => setActivePhoto((activePhoto + 1) % allPhotos.length)}>
              <img
                src={allPhotos[activePhoto].src}
                alt={allPhotos[activePhoto].caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <span className="bg-[#FF6A00] text-white text-xs font-bold tracking-widest px-3 py-1.5 uppercase"
                    style={{ fontFamily: "'Oswald',sans-serif" }}>
                    {activePhoto + 1} / {allPhotos.length}
                  </span>
                  <p className="text-white font-semibold text-sm mt-2" style={{ fontFamily: "'Oswald',sans-serif" }}>
                    {allPhotos[activePhoto].caption}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-white/70 text-xs">
                  <Icon name="ChevronRight" size={16} />
                  <span>следующее фото</span>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-2">
              {allPhotos.map((p, i) => (
                <button key={i} onClick={() => setActivePhoto(i)}
                  className={`relative overflow-hidden h-16 sm:h-24 border-2 transition-all ${i === activePhoto ? "border-[#FF6A00]" : "border-transparent hover:border-gray-300"}`}>
                  <img src={p.src} alt={p.caption} className="w-full h-full object-cover" />
                  {i === activePhoto && (
                    <div className="absolute inset-0 bg-[#FF6A00]/20" />
                  )}
                </button>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── QUICK FORM ── */}
      <section id="form" className="py-16 bg-[#f4f4f4]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <RevealBlock>
              <div className="flex items-center gap-3 mb-3"><ALine /><OL>Бесплатно</OL></div>
              <h2 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-3xl font-bold uppercase text-gray-900 mb-4">
                Получить консультацию
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Расскажите задачу — мастер перезвонит в течение 5 минут, ответит на вопросы и договорится о бесплатном выезде.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { icon: "Clock", text: "Перезваниваем через 5 минут" },
                  { icon: "MapPin", text: "Выезд на замер в течение 3 часов" },
                  { icon: "DollarSign", text: "Замер и консультация — бесплатно" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FF6A00] flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as any} size={14} className="text-white" />
                    </div>
                    <span className="text-gray-700 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { trackCtaClick("Получить консультацию", "service_form"); openModal("Получить консультацию"); }}
                style={{ fontFamily: "'Oswald',sans-serif" }}
                className="bg-[#FF6A00] text-white font-bold text-sm tracking-widest px-7 py-4 uppercase hover:bg-[#e05a00] transition-colors w-full lg:w-auto">
                Получить консультацию бесплатно
              </button>
            </RevealBlock>
            <RevealBlock>
              <QuickForm cta={cta} />
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK (timeline style) ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-3"><ALine /><OL>Без сюрпризов</OL></div>
            <h2 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-3xl font-bold uppercase text-gray-900 mb-10">Как проходит работа</h2>
          </RevealBlock>
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
            <div className="space-y-6">
              {PROCESS_STEPS.map((s, i) => (
                <RevealBlock key={s.num}>
                  <div className="flex items-start gap-3 md:gap-6">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-[#FF6A00] text-white flex items-center justify-center font-bold text-base md:text-lg z-10 relative"
                      style={{ fontFamily: "'Oswald',sans-serif" }}>
                      {s.num}
                    </div>
                    <div className={`flex-1 bg-white border border-gray-200 p-5 hover:border-[#FF6A00] transition-colors ${i < PROCESS_STEPS.length - 1 ? "mb-0" : ""}`}>
                      <h3 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-base font-bold uppercase tracking-wide text-gray-900 mb-1">{s.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-5">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-3"><ALine /><OL>Наши преимущества</OL></div>
            <h2 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-3xl font-bold uppercase text-white mb-10">Почему выбирают нас</h2>
          </RevealBlock>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
            {WHY_SERVICE.map(w => (
              <RevealBlock key={w.title} className="h-full">
                <div className="border border-white/10 p-6 hover:border-[#FF6A00] transition-colors bg-white/5 h-full">
                  <div className="w-10 h-10 bg-[#FF6A00] flex items-center justify-center mb-4">
                    <Icon name={w.icon as any} size={18} className="text-white" />
                  </div>
                  <h3 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-sm font-bold uppercase tracking-wide text-white mb-2">{w.title}</h3>
                  <p className="text-white/55 text-xs leading-relaxed">{w.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-16 bg-[#f4f4f4]">
        <div className="max-w-6xl mx-auto px-5">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-3"><ALine /><OL>Отзывы клиентов</OL></div>
            <h2 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-3xl font-bold uppercase text-gray-900 mb-8">Что говорят о нас</h2>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SERVICE_REVIEWS.map(r => (
              <RevealBlock key={r.name}>
                <div className="bg-white border border-gray-200 p-7 h-full flex flex-col hover:border-[#FF6A00] transition-colors">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <span key={i} className="text-[#FF6A00] text-base">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">«{r.text}»</p>
                  <div className="border-t border-gray-100 pt-4">
                    <div style={{ fontFamily: "'Oswald',sans-serif" }} className="font-semibold text-sm tracking-wide text-gray-900">{r.name}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{r.loc}</div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-5">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-3"><ALine /><OL>Ответы на вопросы</OL></div>
            <h2 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-3xl font-bold uppercase text-gray-900 mb-8">Частые вопросы</h2>
          </RevealBlock>
          <div className="space-y-3">
            {faq.map(item => <FaqItem key={item.q} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-14 bg-[#FF6A00]">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p style={{ fontFamily: "'Oswald',sans-serif" }} className="text-white text-xl md:text-2xl font-bold uppercase">Готовы начать?</p>
            <p className="text-white/80 text-sm mt-1">Перезвоним через 5 минут — договоримся о замере</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a href="tel:+79681003243" onClick={() => trackPhoneClick("service_cta")}
              style={{ fontFamily: "'Oswald',sans-serif" }}
              className="flex items-center gap-2 bg-white text-gray-900 font-bold text-sm tracking-widest px-7 py-4 uppercase hover:bg-gray-100 transition-colors">
              <Icon name="Phone" size={14} />
              Позвонить
            </a>
            <button onClick={() => { trackCtaClick("Перезвоните мне", "service_cta"); openModal("Перезвоните мне"); }}
              style={{ fontFamily: "'Oswald',sans-serif" }}
              className="bg-gray-900 text-white font-bold text-sm tracking-widest px-7 py-4 uppercase hover:bg-black transition-colors">
              Перезвоните мне
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/"><Logo dark /></Link>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="text-gray-500 text-xs">© 2024 Кровельная компания. Все права защищены.</p>
            <p className="text-gray-600 text-xs">Оператор ПД: самозанятый Кругов М. Г., ИНН 772379179900</p>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <Link to="/privacy" className="text-gray-600 text-xs hover:text-[#FF6A00] transition-colors underline underline-offset-2">
                Политика конфиденциальности
              </Link>
              <span className="text-gray-700 text-xs">·</span>
              <Link to="/terms" className="text-gray-600 text-xs hover:text-[#FF6A00] transition-colors underline underline-offset-2">
                Правила использования
              </Link>
            </div>
          </div>
          <a href="tel:+79681003243" onClick={() => trackPhoneClick("service_footer")}
            style={{ fontFamily: "'Oswald',sans-serif" }}
            className="flex items-center gap-2 text-sm text-[#FF6A00] tracking-wider hover:text-[#e05a00] transition-colors">
            <Icon name="Phone" size={13} />
            +7 (968) 100-32-43
          </a>
        </div>
      </footer>

    </div>
  );
}