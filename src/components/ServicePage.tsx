/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import ContactModal from "@/components/ContactModal";
import PromoBanner from "@/components/PromoBanner";

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
  { icon: "ShieldCheck", title: "Гарантия 5 лет", desc: "На все работы. Приедем и исправим — бесплатно." },
  { icon: "Eye", title: "Ежедневный контроль", desc: "Можете следить за работой каждый день. Ничего не скрываем." },
  { icon: "Users", title: "Своя бригада", desc: "15 мастеров, граждане РФ. Никакого случайного субподряда." },
];

// ── Process steps (numbered timeline style) ──────────────────────────────────
const PROCESS_STEPS = [
  { num: "1", title: "Звонок", desc: "Рассказываете задачу — мы слушаем и объясняем, что нужно сделать." },
  { num: "2", title: "Выезд мастера", desc: "Приедем в течение 3 часов. Осмотрим объект, замерим площадь." },
  { num: "3", title: "Смета за 24 часа", desc: "Фиксируем цену письменно. Никаких «по ситуации» и доплат." },
  { num: "4", title: "Работа", desc: "Выходим на объект в согласованный день. С 8 утра до темноты." },
  { num: "5", title: "Сдача и гарантия", desc: "Подписываете акт, получаете гарантийный паспорт на 5 лет." },
];

// ── Quick form ────────────────────────────────────────────────────────────────

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
        <OL>Перезвоним через 5 минут</OL>
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

// ── FAQ ───────────────────────────────────────────────────────────────────────

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

// ── Main component ────────────────────────────────────────────────────────────

export default function ServicePage({ title, subtitle, description, heroIcon, benefits, steps, faq, cta, photos }: ServicePageProps) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [modal, setModal] = useState<{ open: boolean; title: string }>({ open: false, title: "" });
  const openModal = (t: string) => setModal({ open: true, title: t });
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
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/97 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link to="/" style={{ fontFamily: "'Oswald',sans-serif" }}
            className="text-lg font-bold tracking-widest uppercase text-gray-900">
            КРОВ<span className="text-[#FF6A00]">ЕЛЬ</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" style={{ fontFamily: "'Oswald',sans-serif" }}
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
        <div className="relative max-w-6xl mx-auto px-5 py-24 md:py-32 flex items-center min-h-[75vh]">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-[#FF6A00]" />
              <span style={{ fontFamily: "'Oswald',sans-serif" }} className="text-[11px] tracking-[0.3em] text-[#FF6A00] uppercase font-semibold">
                Кровельные работы
              </span>
            </div>
            <h1 style={{ fontFamily: "'Oswald',sans-serif", animationDelay: "0.1s" }}
              className="animate-fade-in-up text-[clamp(2.2rem,5vw,4rem)] font-bold uppercase leading-tight text-white mb-4">
              {title}
            </h1>
            <p style={{ fontFamily: "'Oswald',sans-serif", animationDelay: "0.2s" }}
              className="animate-fade-in-up text-[#FF6A00] font-semibold text-lg mb-5">{subtitle}</p>
            <p style={{ animationDelay: "0.25s" }}
              className="animate-fade-in-up text-white/75 leading-relaxed mb-8 max-w-lg">{description}</p>
            <div className="animate-fade-in-up flex flex-wrap gap-3 mb-10" style={{ animationDelay: "0.3s" }}>
              <button onClick={() => openModal("Перезвоните мне")}
                style={{ fontFamily: "'Oswald',sans-serif" }}
                className="bg-[#FF6A00] text-white font-bold text-sm tracking-widest px-7 py-4 uppercase hover:bg-[#e05a00] transition-colors">
                Перезвоните мне
              </button>
              <a href="tel:+79001234567"
                style={{ fontFamily: "'Oswald',sans-serif" }}
                className="flex items-center gap-2 border-2 border-white/40 text-white font-semibold text-sm tracking-widest px-7 py-4 uppercase hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors">
                <Icon name="Phone" size={14} />
                Позвонить
              </a>
            </div>
            {/* badges */}
            <div className="animate-fade-in-up flex flex-wrap gap-3" style={{ animationDelay: "0.4s" }}>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map(b => (
              <RevealBlock key={b.text}>
                <div className="flex items-start gap-4 bg-white border border-gray-200 p-5 hover:border-[#FF6A00] transition-colors">
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
            <div className="relative overflow-hidden mb-3 group cursor-pointer" style={{ height: 420 }}
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
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <Icon name="ChevronRight" size={16} />
                  <span>следующее фото</span>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {allPhotos.map((p, i) => (
                <button key={i} onClick={() => setActivePhoto(i)}
                  className={`relative overflow-hidden h-24 border-2 transition-all ${i === activePhoto ? "border-[#FF6A00]" : "border-transparent hover:border-gray-300"}`}>
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
              <button onClick={() => openModal("Получить консультацию")}
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
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#FF6A00] text-white flex items-center justify-center font-bold text-lg z-10 relative"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_SERVICE.map(w => (
              <RevealBlock key={w.title}>
                <div className="border border-white/10 p-6 hover:border-[#FF6A00] transition-colors bg-white/5">
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
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p style={{ fontFamily: "'Oswald',sans-serif" }} className="text-white text-2xl font-bold uppercase">Готовы начать?</p>
            <p className="text-white/80 text-sm mt-1">Перезвоним через 5 минут — договоримся о замере</p>
          </div>
          <div className="flex gap-3">
            <a href="tel:+79001234567"
              style={{ fontFamily: "'Oswald',sans-serif" }}
              className="flex items-center gap-2 bg-white text-gray-900 font-bold text-sm tracking-widest px-7 py-4 uppercase hover:bg-gray-100 transition-colors">
              <Icon name="Phone" size={14} />
              Позвонить
            </a>
            <button onClick={() => openModal("Перезвоните мне")}
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