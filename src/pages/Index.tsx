/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import ContactModal from "@/components/ContactModal";
import PromoBanner from "@/components/PromoBanner";
import QuizModal from "@/components/QuizModal";
import ConsentCheckbox from "@/components/ConsentCheckbox";

const IMG_HERO = "https://cdn.poehali.dev/projects/0a66a9c5-b11e-428a-881d-33e417292011/files/eb1d19fa-a54a-4956-a3ee-268508e4269a.jpg";
const IMG_HOUSE = "https://cdn.poehali.dev/projects/0a66a9c5-b11e-428a-881d-33e417292011/files/52607fd3-f0f6-4492-922f-190b3233c4a4.jpg";
const IMG_BEFORE_AFTER = "https://cdn.poehali.dev/projects/0a66a9c5-b11e-428a-881d-33e417292011/files/c77f04e1-52d9-455c-9329-d9ed6ee8f8c2.jpg";

const NAV = [
  { label: "Услуги", href: "#services" },
  { label: "Как работаем", href: "#process" },
  { label: "Преимущества", href: "#why" },
  { label: "О нас", href: "#about" },
  { label: "Работы", href: "#portfolio" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Цены", href: "#prices" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Home", title: "Монтаж новой кровли", desc: "Металлочерепица, профнастил, гибкая черепица. Стандартный дом — за 5 дней.", href: "/uslugi/montazh-krovli" },
  { icon: "Building2", title: "Мансарда и чердак", desc: "Строим 2-й и 3-й этаж — увеличиваем площадь без нового фундамента.", href: "/uslugi/mansarda-i-cherdak" },
  { icon: "Wrench", title: "Реставрация кровли", desc: "Устраняем протечки точечно — не всегда нужно менять всю крышу.", href: "/uslugi/restavraciya-krovli" },
  { icon: "Thermometer", title: "Утепление", desc: "Утепляем кровлю, стены и полы. Тепло зимой, прохлада летом.", href: "/uslugi/uteplenie-doma" },
  { icon: "Trees", title: "Дома, бани, беседки", desc: "Каркасные, брусовые, деревянные дома под ключ.", href: "/uslugi/stroitelstvo-domov" },
  { icon: "Layers", title: "Фасадные работы", desc: "Сайдинг, водоотливы, облицовка. Дом защищён и выглядит новым.", href: "/uslugi/fasadnye-raboty" },
  { icon: "Droplets", title: "Исправление конденсата", desc: "Сырость, капли с потолка — найдём причину и устраним навсегда.", href: "/uslugi/ispravlenie-kondensata" },
];

const STEPS = [
  { num: "01", title: "Звоните нам", desc: "Рассказываете задачу — объясняем что нужно и примерную стоимость." },
  { num: "02", title: "Замер бесплатно", desc: "Мастер приедет в течение 3 часов. Без обязательств." },
  { num: "03", title: "Смета и договор", desc: "Точная цена фиксируется. Никаких сюрпризов в процессе." },
  { num: "04", title: "Предоплата и старт", desc: "Выходим на объект уже на следующий день после согласования." },
  { num: "05", title: "Материалы", desc: "Помогаем выбрать и купить. Можем закупить сами." },
  { num: "06", title: "Работа и сдача", desc: "С 8 утра до темноты. Ежедневный контроль. Акт и гарантия." },
];

const WHY = [
  { icon: "Zap", title: "Крышу за 5 дней", desc: "Стандартный дом кроем за 5 рабочих дней" },
  { icon: "CloudRain", title: "В любую погоду", desc: "Дождь и ветер нас не останавливают" },
  { icon: "ShieldCheck", title: "Гарантия 5 лет", desc: "Письменно в договоре. Приедем и исправим." },
  { icon: "Clock", title: "Замер через 3 часа", desc: "Позвонили утром — мастер уже у вас к обеду" },
  { icon: "Users", title: "15 своих мастеров", desc: "Граждане РФ, без субподряда, с опытом" },
  { icon: "Star", title: "1500+ объектов", desc: "10 лет опыта, более полутора тысяч кровель" },
  { icon: "Package", title: "Материалы от производителя", desc: "Металлочерепица, профнастил без наценки" },
  { icon: "Sun", title: "С 8 утра до темноты", desc: "Максимально используем световой день" },
];

const REVIEWS = [
  { name: "Сергей Михайлов", loc: "Подмосковье, 180 м²", text: "Приехали в тот же день, через неделю крыша была готова. Аккуратно, мусор убрали. Доволен.", stars: 5 },
  { name: "Андрей Воронов", loc: "Раменское, новый дом", text: "Сделали за 4 дня, быстрее чем обещали. Гарантийный талон выдали, всё по-честному.", stars: 5 },
  { name: "Виктор Лазарев", loc: "Дача, Калужская обл.", text: "Мансарда над первым этажом. Цена вышла чуть ниже, чем я ожидал. Быстро и без суеты.", stars: 5 },
  { name: "Дмитрий Кузнецов", loc: "Коттедж, Истринский р-н", text: "Сайдинг на фасад и водоотлив. Работа аккуратная, швы ровные. Уже рекомендовал соседям.", stars: 5 },
];

const GUARANTEES = [
  { icon: "ShieldCheck", title: "Гарантия на работы — 5 лет", desc: "Любые дефекты по нашей вине устраняем бесплатно в течение 5 лет" },
  { icon: "Package", title: "Только сертифицированные материалы", desc: "Металлочерепица, профнастил от проверенных производителей. Предоставляем сертификаты." },
  { icon: "FileCheck", title: "Договор с фиксированной ценой", desc: "Цена зафиксирована в договоре и не изменится — даже если выросли цены на материалы." },
  { icon: "RefreshCw", title: "Бесплатные исправления", desc: "Если что-то не понравилось — исправим до полного удовлетворения без доплат." },
];

const PRICE_TYPES = [
  { label: "Гибкая черепица", price: 1000, icon: "Layers" },
  { label: "Металлочерепица", price: 900, icon: "Home" },
  { label: "Натуральная черепица", price: 1500, icon: "Building2" },
  { label: "Композитная черепица", price: 1000, icon: "Grid3x3" },
  { label: "Ондулин", price: 800, icon: "Waves" },
  { label: "Профнастил", price: 700, icon: "AlignJustify" },
  { label: "Рулонная кровля", price: 300, icon: "ScrollText" },
];

// ── helpers ──────────────────────────────────────────────────────────────────

function RevealBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Stars({ n }: { n: number }) {
  return <div className="flex gap-0.5">{Array.from({ length: n }).map((_, i) => <span key={i} className="text-[#FF6A00] text-base">★</span>)}</div>;
}

const OLabel = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: "'Oswald',sans-serif" }} className="text-[11px] tracking-[0.3em] text-[#FF6A00] uppercase font-semibold">{children}</span>
);

const ALine = () => <div className="h-px w-10 bg-[#FF6A00] flex-shrink-0" />;

function SectionHead({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <RevealBlock className="mb-12">
      <div className="flex items-center gap-3 mb-3"><ALine /><OLabel>{label}</OLabel></div>
      <h2 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-4xl md:text-5xl font-bold uppercase text-gray-900 leading-tight">{title}</h2>
      {sub && <p className="text-gray-500 text-sm mt-3 max-w-xl">{sub}</p>}
    </RevealBlock>
  );
}

// ── Mini quick-form (hero sidebar) ────────────────────────────────────────────

function HeroForm() {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [consentData, setConsentData] = useState(false);
  const [consentPolicy, setConsentPolicy] = useState(false);
  const [sent, setSent] = useState(false);
  const allConsented = consentData && consentPolicy;

  if (sent) return (
    <div className="bg-white border border-gray-200 shadow-xl p-6 text-center">
      <div className="w-12 h-12 bg-[#FF6A00] flex items-center justify-center mx-auto mb-3">
        <Icon name="Phone" size={22} className="text-white" />
      </div>
      <p style={{ fontFamily: "'Oswald',sans-serif" }} className="text-lg font-bold uppercase text-gray-900 mb-1">Перезвоним через 5 минут!</p>
      <p className="text-gray-500 text-sm">Мастер свяжется и ответит на все вопросы.</p>
    </div>
  );

  return (
    <form onSubmit={e => { e.preventDefault(); if (allConsented) setSent(true); }}
      className="bg-white border border-gray-200 shadow-xl p-6 md:p-7">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
        <OLabel>Перезвоним через 5 минут</OLabel>
      </div>
      <p style={{ fontFamily: "'Oswald',sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-4 leading-tight">
        Бесплатный замер<br /><span className="text-[#FF6A00]">сегодня</span>
      </p>
      <div className="space-y-3 mb-4">
        <input type="text" placeholder="Ваше имя" value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required
          className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#FF6A00] transition-colors bg-gray-50" />
        <input type="tel" placeholder="+7 (___) ___-__-__" value={form.phone}
          onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required
          className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#FF6A00] transition-colors bg-gray-50" />
      </div>
      <div className="mb-4">
        <ConsentCheckbox
          consentData={consentData} onConsentData={setConsentData}
          consentPolicy={consentPolicy} onConsentPolicy={setConsentPolicy}
        />
      </div>
      <button type="submit" disabled={!allConsented}
        className={`w-full font-bold text-sm tracking-widest py-4 uppercase transition-colors ${
          allConsented ? "orange-pulse bg-[#FF6A00] text-white hover:bg-[#e05a00]" : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        style={{ fontFamily: "'Oswald',sans-serif" }}>
        Вызвать замерщика
      </button>
    </form>
  );
}

// ── Calculator ────────────────────────────────────────────────────────────────

function Calculator() {
  const [area, setArea] = useState(80);
  const [typeIdx, setTypeIdx] = useState(1);
  const selected = PRICE_TYPES[typeIdx];
  const workCost = area * selected.price;
  const materialCoeff = 1.4;
  const total = Math.round(workCost * materialCoeff);

  return (
    <section id="calculator" className="py-20 bg-[#FF6A00]">
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex items-center gap-3 mb-3"><div className="h-px w-10 bg-white/50" /><span style={{ fontFamily: "'Oswald',sans-serif" }} className="text-[11px] tracking-[0.3em] text-white/80 uppercase">Быстрая оценка</span></div>
        <h2 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-4xl md:text-5xl font-bold uppercase text-white mb-2">Калькулятор сметы</h2>
        <p className="text-white/80 text-sm mb-10">Предварительный расчёт. Точную цену узнайте после бесплатного замера.</p>

        <div className="bg-white shadow-2xl p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Left: controls */}
            <div>
              {/* Area slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label style={{ fontFamily: "'Oswald',sans-serif" }} className="text-sm font-semibold uppercase tracking-wider text-gray-700">Площадь кровли</label>
                  <div className="flex items-center gap-2">
                    <input type="number" min={10} max={1000} value={area}
                      onChange={e => setArea(Math.max(10, Math.min(1000, Number(e.target.value))))}
                      className="w-20 border border-gray-300 text-center py-1.5 text-sm font-bold text-[#FF6A00] focus:outline-none focus:border-[#FF6A00]" />
                    <span className="text-gray-500 text-sm">м²</span>
                  </div>
                </div>
                <input type="range" min={10} max={500} value={area}
                  onChange={e => setArea(Number(e.target.value))}
                  className="w-full" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>10 м²</span><span>500 м²</span>
                </div>
              </div>

              {/* Type selector */}
              <div>
                <label style={{ fontFamily: "'Oswald',sans-serif" }} className="text-sm font-semibold uppercase tracking-wider text-gray-700 block mb-3">Тип покрытия</label>
                <div className="grid grid-cols-1 gap-2">
                  {PRICE_TYPES.map((t, i) => (
                    <button key={t.label} onClick={() => setTypeIdx(i)}
                      className={`flex items-center justify-between px-4 py-3 border text-sm transition-colors ${i === typeIdx
                        ? "border-[#FF6A00] bg-orange-50 text-[#FF6A00] font-semibold"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-400"}`}>
                      <span style={{ fontFamily: "'Oswald',sans-serif" }} className="uppercase tracking-wide">{t.label}</span>
                      <span className="font-bold">от {t.price} ₽/м²</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: result */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="bg-gray-50 border border-gray-200 p-6 mb-4">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "'Oswald',sans-serif" }}>Работы</p>
                  <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Oswald',sans-serif" }}>
                    {workCost.toLocaleString("ru-RU")} ₽
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{area} м² × {selected.price} ₽/м²</p>
                </div>
                <div className="bg-[#FF6A00] p-6 mb-6">
                  <p className="text-white/80 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "'Oswald',sans-serif" }}>Итого с материалами</p>
                  <p className="text-4xl font-bold text-white" style={{ fontFamily: "'Oswald',sans-serif" }}>
                    от {total.toLocaleString("ru-RU")} ₽
                  </p>
                  <p className="text-white/70 text-xs mt-1">Включая доставку материалов</p>
                </div>
                <div className="space-y-2 mb-6">
                  {[
                    "Точная цена — после бесплатного замера",
                    "Цена фиксируется в договоре",
                    "Гарантия 5 лет на все работы",
                  ].map(t => (
                    <div key={t} className="flex items-center gap-2 text-sm text-gray-600">
                      <Icon name="Check" size={14} className="text-[#FF6A00] flex-shrink-0" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => openModal("Получить точную смету")}
                className="block w-full bg-gray-900 text-white text-center font-bold text-sm tracking-widest py-4 uppercase hover:bg-black transition-colors"
                style={{ fontFamily: "'Oswald',sans-serif" }}>
                Получить точную смету
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Consultation form ─────────────────────────────────────────────────────────

function ConsultForm() {
  const [form, setForm] = useState({ name: "", phone: "", question: "" });
  const [consentData, setConsentData] = useState(false);
  const [consentPolicy, setConsentPolicy] = useState(false);
  const [sent, setSent] = useState(false);
  const allConsented = consentData && consentPolicy;

  if (sent) return (
    <div className="max-w-xl mx-auto text-center py-10">
      <div className="w-16 h-16 bg-[#FF6A00] flex items-center justify-center mx-auto mb-4">
        <Icon name="CheckCheck" size={28} className="text-white" />
      </div>
      <h3 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-2xl font-bold uppercase text-gray-900 mb-2">Заявка принята!</h3>
      <p className="text-gray-500">Перезвоним в течение 15 минут и ответим на все вопросы.</p>
    </div>
  );

  return (
    <form onSubmit={e => { e.preventDefault(); if (allConsented) setSent(true); }} className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label style={{ fontFamily: "'Oswald',sans-serif" }} className="text-[10px] tracking-widest text-gray-500 uppercase block mb-1.5">Ваше имя</label>
          <input type="text" placeholder="Иван Иванов" value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required
            className="w-full border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#FF6A00] transition-colors" />
        </div>
        <div>
          <label style={{ fontFamily: "'Oswald',sans-serif" }} className="text-[10px] tracking-widest text-gray-500 uppercase block mb-1.5">Телефон</label>
          <input type="tel" placeholder="+7 (___) ___-__-__" value={form.phone}
            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required
            className="w-full border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#FF6A00] transition-colors" />
        </div>
      </div>
      <div className="mb-5">
        <label style={{ fontFamily: "'Oswald',sans-serif" }} className="text-[10px] tracking-widest text-gray-500 uppercase block mb-1.5">Ваш вопрос (необязательно)</label>
        <textarea placeholder="Например: течёт крыша, нужен срочный ремонт" rows={3} value={form.question}
          onChange={e => setForm(p => ({ ...p, question: e.target.value }))}
          className="w-full border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#FF6A00] transition-colors resize-none" />
      </div>
      <div className="mb-5">
        <ConsentCheckbox
          consentData={consentData} onConsentData={setConsentData}
          consentPolicy={consentPolicy} onConsentPolicy={setConsentPolicy}
        />
      </div>
      <button type="submit" disabled={!allConsented}
        className={`w-full font-bold text-sm tracking-widest py-4 uppercase transition-colors ${
          allConsented ? "bg-[#FF6A00] text-white hover:bg-[#e05a00]" : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        style={{ fontFamily: "'Oswald',sans-serif" }}>
        Перезвоните мне через 15 минут
      </button>
      <p className="text-gray-400 text-xs mt-3 text-center">Консультируем бесплатно по любому вопросу кровли</p>
    </form>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; title: string }>({ open: false, title: "" });
  const openModal = (title: string) => setModal({ open: true, title });
  const closeModal = () => setModal(p => ({ ...p, open: false }));

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-gray-900 overflow-x-hidden" style={{ fontFamily: "'Roboto',sans-serif" }}>
      <ContactModal open={modal.open} onClose={closeModal} title={modal.title} />
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/97 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <button onClick={() => scrollTo("#hero")}
            style={{ fontFamily: "'Oswald',sans-serif" }}
            className="text-lg font-bold tracking-widest uppercase text-gray-900 shrink-0">
            КРОВ<span className="text-[#FF6A00]">ЕЛЬ</span>
          </button>
          <div className="hidden xl:flex items-center gap-6">
            {NAV.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                style={{ fontFamily: "'Oswald',sans-serif" }}
                className="nav-link text-[11px] tracking-widest text-gray-500 hover:text-gray-900 uppercase transition-colors">
                {l.label}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+79001234567"
              style={{ fontFamily: "'Oswald',sans-serif" }}
              className="flex items-center gap-2 text-sm tracking-wider text-gray-700 hover:text-[#FF6A00] transition-colors font-semibold">
              <Icon name="Phone" size={13} className="text-[#FF6A00]" />
              +7 (900) 123-45-67
            </a>
            <button onClick={() => openModal("Бесплатная консультация")}
              style={{ fontFamily: "'Oswald',sans-serif" }}
              className="bg-[#FF6A00] text-white font-semibold text-xs tracking-widest px-4 py-2.5 uppercase hover:bg-[#e05a00] transition-colors">
              Консультация
            </button>
          </div>
          <button onClick={() => setMenuOpen(v => !v)} className="xl:hidden text-gray-600 hover:text-gray-900 ml-2">
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="xl:hidden bg-white border-t border-gray-200 px-5 py-5 flex flex-col gap-3 shadow-lg">
            {NAV.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                style={{ fontFamily: "'Oswald',sans-serif" }}
                className="text-left text-sm tracking-widest text-gray-600 hover:text-[#FF6A00] uppercase transition-colors py-1">
                {l.label}
              </button>
            ))}
            <a href="tel:+79001234567"
              className="mt-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Icon name="Phone" size={14} className="text-[#FF6A00]" />
              +7 (900) 123-45-67
            </a>
            <button onClick={() => openModal("Бесплатная консультация")}
              style={{ fontFamily: "'Oswald',sans-serif" }}
              className="bg-[#FF6A00] text-white font-semibold text-sm tracking-widest px-5 py-3 uppercase">
              Консультация бесплатно
            </button>
          </div>
        )}
      </nav>

      {/* ── PROMO BANNER ── */}
      <div className="pt-[60px]">
        <PromoBanner />
      </div>

      {/* ── HERO ── */}
      <section id="hero">
        <div className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={IMG_HERO} alt="Кровельные работы" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/60 to-transparent" />
          </div>
          <div className="relative max-w-7xl mx-auto px-5 py-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left text */}
              <div>
                <div className="animate-fade-in-up flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-[#FF6A00]" />
                  <OLabel>Кровельные и фасадные работы</OLabel>
                </div>
                <h1 className="animate-fade-in-up text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-[0.95] text-white mb-5"
                  style={{ fontFamily: "'Oswald',sans-serif", animationDelay: "0.1s" }}>
                  Надёжная крыша<br />
                  <span className="text-[#FF6A00]">над вашим домом</span>
                </h1>
                <p className="animate-fade-in-up text-white/70 text-lg leading-relaxed mb-6 max-w-md"
                  style={{ animationDelay: "0.2s" }}>
                  Монтаж, ремонт и утепление кровли. Замер через 3 часа — бесплатно. Гарантия 5 лет.
                </p>
                <div className="animate-fade-in-up flex flex-wrap gap-3 mb-6" style={{ animationDelay: "0.25s" }}>
                  <button
                    onClick={() => setQuizOpen(true)}
                    style={{ fontFamily: "'Oswald',sans-serif" }}
                    className="flex items-center gap-2.5 bg-[#FF6A00] text-white font-bold text-sm tracking-widest px-7 py-4 uppercase hover:bg-[#e05a00] transition-colors"
                  >
                    <Icon name="ClipboardList" size={16} />
                    Рассчитать стоимость
                  </button>
                  <button
                    onClick={() => openModal("Вызвать замерщика")}
                    style={{ fontFamily: "'Oswald',sans-serif" }}
                    className="flex items-center gap-2.5 border-2 border-white/40 text-white font-semibold text-sm tracking-widest px-7 py-4 uppercase hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors"
                  >
                    Вызвать замерщика
                  </button>
                </div>
                <div className="animate-fade-in-up flex flex-wrap gap-3 mb-10" style={{ animationDelay: "0.3s" }}>
                  {[
                    { icon: "Zap", text: "Крыша за 5 дней" },
                    { icon: "ShieldCheck", text: "Гарантия 5 лет" },
                    { icon: "Clock", text: "Замер за 3 часа" },
                    { icon: "Star", text: "1500+ объектов" },
                  ].map(b => (
                    <div key={b.text} className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5">
                      <Icon name={b.icon as any} size={13} className="text-[#FF6A00]" />
                      <span style={{ fontFamily: "'Oswald',sans-serif" }} className="text-xs tracking-widest uppercase text-white/80">{b.text}</span>
                    </div>
                  ))}
                </div>
                {/* Stats */}
                <div className="animate-fade-in-up grid grid-cols-3 gap-3 border-t border-white/15 pt-6" style={{ animationDelay: "0.4s" }}>
                  {[
                    { val: "1500+", label: "объектов" },
                    { val: "10 лет", label: "опыт" },
                    { val: "5 лет", label: "гарантия" },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="font-bold text-[#FF6A00] text-xl md:text-3xl" style={{ fontFamily: "'Oswald',sans-serif" }}>{s.val}</div>
                      <div className="text-white/50 text-[10px] uppercase tracking-wide mt-0.5" style={{ fontFamily: "'Oswald',sans-serif" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right form */}
              <div className="w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                <HeroForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <Calculator />

      {/* ── PRICES ── */}
      <section id="prices" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHead label="Стоимость" title="Цены на работы" sub="Стоимость работ без материалов. Точная цена — после бесплатного замера." />
          <RevealBlock>
            {/* Mobile: cards; Desktop: table */}
            <div className="md:hidden grid grid-cols-1 gap-2">
              {PRICE_TYPES.map(t => (
                <div key={t.label} className="flex items-center justify-between bg-white border border-gray-200 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <Icon name={t.icon as any} size={15} className="text-[#FF6A00]" />
                    </div>
                    <span style={{ fontFamily: "'Oswald',sans-serif" }} className="font-semibold text-gray-900 uppercase tracking-wide text-sm">{t.label}</span>
                  </div>
                  <span style={{ fontFamily: "'Oswald',sans-serif" }} className="text-base font-bold text-[#FF6A00] flex-shrink-0 ml-2">от {t.price} ₽</span>
                </div>
              ))}
            </div>
            <div className="hidden md:block overflow-hidden border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th style={{ fontFamily: "'Oswald',sans-serif" }} className="text-left px-6 py-4 text-sm tracking-widest uppercase font-semibold">Тип покрытия</th>
                    <th style={{ fontFamily: "'Oswald',sans-serif" }} className="text-right px-6 py-4 text-sm tracking-widest uppercase font-semibold">Цена за м²</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {PRICE_TYPES.map((t, i) => (
                    <tr key={t.label} className={`border-b border-gray-100 hover:bg-orange-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-50 flex items-center justify-center flex-shrink-0">
                            <Icon name={t.icon as any} size={15} className="text-[#FF6A00]" />
                          </div>
                          <span style={{ fontFamily: "'Oswald',sans-serif" }} className="font-semibold text-gray-900 uppercase tracking-wide text-sm">{t.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span style={{ fontFamily: "'Oswald',sans-serif" }} className="text-xl font-bold text-[#FF6A00]">от {t.price} ₽</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => openModal("Узнать точную стоимость")}
                          style={{ fontFamily: "'Oswald',sans-serif" }}
                          className="border border-[#FF6A00] text-[#FF6A00] text-xs tracking-widest px-4 py-2 uppercase hover:bg-[#FF6A00] hover:text-white transition-colors font-semibold">
                          Узнать точно
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 md:hidden text-center">
              <button onClick={() => openModal("Узнать точную стоимость")}
                style={{ fontFamily: "'Oswald',sans-serif" }}
                className="w-full border border-[#FF6A00] text-[#FF6A00] text-xs tracking-widest px-4 py-3 uppercase font-semibold">
                Узнать точную стоимость
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-4 text-center">* Цены указаны на работы без учёта материалов. Окончательная стоимость — после замера.</p>
          </RevealBlock>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-[#f4f4f4]">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHead label="Что мы делаем" title="Наши услуги" sub="Работаем с частными домами, дачами и коттеджами — от небольшого ремонта до стройки под ключ." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SERVICES.map(s => (
              <RevealBlock key={s.title}>
                <div className="service-card p-7 h-full flex flex-col bg-white">
                  <div className="w-11 h-11 bg-orange-50 flex items-center justify-center mb-5">
                    <Icon name={s.icon as any} size={20} className="text-[#FF6A00]" />
                  </div>
                  <Link to={s.href}>
                    <h3 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-base font-semibold tracking-wide mb-2 uppercase text-gray-900 hover:text-[#FF6A00] transition-colors cursor-pointer">{s.title}</h3>
                  </Link>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{s.desc}</p>
                  <Link to={s.href}
                    style={{ fontFamily: "'Oswald',sans-serif" }}
                    className="mt-5 inline-flex items-center gap-1.5 bg-[#FF6A00] text-white text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-[#e05a00] transition-colors font-semibold self-start">
                    Подробнее <Icon name="ArrowRight" size={12} />
                  </Link>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section id="why" className="py-24 bg-[#f4f4f4]">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHead label="Почему нас выбирают" title="Наши преимущества" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY.map(w => (
              <RevealBlock key={w.title}>
                <div className="service-card bg-white p-6 h-full">
                  <div className="w-10 h-10 bg-[#FF6A00] flex items-center justify-center mb-4">
                    <Icon name={w.icon as any} size={18} className="text-white" />
                  </div>
                  <h3 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-sm font-semibold tracking-wide uppercase mb-2 text-gray-900">{w.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{w.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHead label="Прозрачно и понятно" title="Как мы работаем" sub="6 шагов от первого звонка до готовой крыши — без сюрпризов." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STEPS.map(step => (
              <RevealBlock key={step.num}>
                <div className="relative bg-white border border-gray-200 p-7 h-full hover:border-[#FF6A00] transition-colors group">
                  <div style={{ fontFamily: "'Oswald',sans-serif" }} className="text-[5rem] font-bold text-gray-100 leading-none absolute top-4 right-5 select-none group-hover:text-orange-100 transition-colors">{step.num}</div>
                  <div style={{ fontFamily: "'Oswald',sans-serif" }} className="text-xs text-[#FF6A00] tracking-widest mb-3 font-semibold">{step.num}</div>
                  <h3 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-base font-semibold tracking-wide uppercase mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 bg-[#f4f4f4]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <RevealBlock>
              <div className="flex items-center gap-3 mb-3"><ALine /><OLabel>О компании</OLabel></div>
              <h2 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-4xl md:text-5xl font-bold uppercase text-gray-900 mb-6">
                10 лет <span className="text-[#FF6A00]">на крышах</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Наши бригады работают уже 10 лет. За это время мы сделали более <strong className="text-gray-900">1500 объектов</strong> — от дачных домиков до коттеджей на 400 м².
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                В команде 15 сотрудников — все граждане РФ, проверенные, опытные. Никаких случайных людей и субподряда.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Мы убеждены: кровля — это вложение в безопасность вашего дома. Поэтому работаем честно, не экономим на материалах и всегда объясняем, за что берём деньги.
              </p>
            </RevealBlock>
            <RevealBlock>
              <div className="relative">
                <img src={IMG_HOUSE} alt="Готовый дом" className="w-full h-[380px] object-cover" />
                <div className="grid grid-cols-3 bg-gray-900 text-white">
                  {[
                    { val: "1500+", label: "Объектов" },
                    { val: "15", label: "Мастеров" },
                    { val: "5 лет", label: "Гарантия" },
                  ].map(s => (
                    <div key={s.label} className="text-center py-5 border-r border-white/10 last:border-0">
                      <div className="font-bold text-[#FF6A00] text-2xl" style={{ fontFamily: "'Oswald',sans-serif" }}>{s.val}</div>
                      <div className="text-white/50 text-xs uppercase tracking-wider mt-0.5" style={{ fontFamily: "'Oswald',sans-serif" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHead label="Портфолио" title="Наши работы" sub="Реальные объекты — фото до и после" />
          <RevealBlock>
            <div className="relative group overflow-hidden cursor-pointer border border-gray-200">
              <img src={IMG_BEFORE_AFTER} alt="До и после ремонта кровли"
                className="w-full h-48 sm:h-72 md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                <div className="inline-block bg-[#FF6A00] text-white font-bold text-xs tracking-widest px-3 py-1 mb-2"
                  style={{ fontFamily: "'Oswald',sans-serif" }}>
                  ДО / ПОСЛЕ
                </div>
                <h3 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-base md:text-2xl font-bold uppercase text-white">Замена старой кровли</h3>
                <p className="text-white/70 text-xs md:text-sm mt-1">Металлочерепица · Подмосковье · 3 дня</p>
              </div>
            </div>
          </RevealBlock>
          <RevealBlock>
            <p className="text-center text-gray-400 text-sm mt-8 mb-5">Более 1500 выполненных объектов</p>
            <div className="text-center">
              <button onClick={() => openModal("Хочу такой же результат")}
                style={{ fontFamily: "'Oswald',sans-serif" }}
                className="border-2 border-[#FF6A00] text-[#FF6A00] font-semibold text-sm tracking-widest px-8 py-3 uppercase hover:bg-[#FF6A00] hover:text-white transition-colors">
                Хочу такой же результат
              </button>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-24 bg-[#f4f4f4]">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHead label="Что говорят клиенты" title="Отзывы" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {REVIEWS.map(r => (
              <RevealBlock key={r.name}>
                <div className="service-card bg-white p-7 h-full flex flex-col">
                  <Stars n={r.stars} />
                  <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-6 flex-1">«{r.text}»</p>
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

      {/* ── PRICE OBJECTION ── */}
      <section className="py-14 bg-gray-900">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <RevealBlock>
            <p style={{ fontFamily: "'Oswald',sans-serif" }} className="text-xl md:text-3xl font-bold uppercase text-white leading-snug">
              «Дорого» — это когда крыша потекла повторно,{" "}
              <span className="text-[#FF6A00]">а подрядчик не отвечает.</span>
            </p>
            <p className="text-white/50 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              Хорошая кровля стоит своих денег один раз и держится 20–30 лет. Мы объясним всё до начала работ и предложим вариант под ваш бюджет.
            </p>
            <button onClick={() => openModal("Получить честную смету")}
              style={{ fontFamily: "'Oswald',sans-serif" }}
              className="mt-7 bg-[#FF6A00] text-white font-bold text-sm tracking-widest px-8 py-4 uppercase hover:bg-[#e05a00] transition-colors">
              Получить честную смету
            </button>
          </RevealBlock>
        </div>
      </section>

      {/* ── GUARANTEES ── */}
      <section id="guarantees" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHead label="Работаем честно" title="Гарантии и материалы" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GUARANTEES.map(g => (
              <RevealBlock key={g.title}>
                <div className="service-card bg-white p-7 flex gap-5 h-full">
                  <div className="flex-shrink-0 w-12 h-12 border-2 border-[#FF6A00] flex items-center justify-center">
                    <Icon name={g.icon as any} size={20} className="text-[#FF6A00]" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-sm font-bold tracking-wide uppercase mb-2 text-gray-900">{g.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULT FORM ── */}
      <section id="consult" className="py-24 bg-[#f4f4f4]">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-10">
            <RevealBlock>
              <div className="flex items-center justify-center gap-3 mb-3"><ALine /><OLabel>Бесплатная консультация</OLabel><ALine /></div>
              <h2 style={{ fontFamily: "'Oswald',sans-serif" }} className="text-4xl md:text-5xl font-bold uppercase text-gray-900 mb-3">
                Задайте любой вопрос<br />по кровле
              </h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                Течёт крыша? Нужна смета? Не знаете с чего начать? — Перезвоним в течение 15 минут и разберёмся вместе.
              </p>
            </RevealBlock>
          </div>
          <RevealBlock>
            <div className="bg-white border border-gray-200 shadow-sm p-8 md:p-10">
              <ConsultForm />
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHead label="Связаться" title="Контакты" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "Phone", title: "Телефон", val: "+7 (900) 123-45-67", sub: "Ежедневно 8:00–20:00" },
              { icon: "MessageCircle", title: "WhatsApp / Telegram", val: "+7 (900) 123-45-67", sub: "Пишите в любое время" },
              { icon: "MapPin", title: "Зона работы", val: "Москва и область", sub: "Выезжаем в любой район МО" },
              { icon: "Clock", title: "График", val: "8:00 — до темноты", sub: "Без выходных в сезон" },
            ].map(c => (
              <RevealBlock key={c.title}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-11 h-11 bg-[#FF6A00] flex items-center justify-center mt-0.5">
                    <Icon name={c.icon as any} size={17} className="text-white" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Oswald',sans-serif" }} className="text-[10px] tracking-widest text-gray-400 uppercase mb-1">{c.title}</div>
                    <div style={{ fontFamily: "'Oswald',sans-serif" }} className="font-semibold text-sm tracking-wide text-gray-900">{c.val}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{c.sub}</div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ fontFamily: "'Oswald',sans-serif" }} className="text-lg font-bold tracking-widest uppercase text-white">
            КРОВ<span className="text-[#FF6A00]">ЕЛЬ</span>
          </div>
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