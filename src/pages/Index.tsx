import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

/* eslint-disable @typescript-eslint/no-explicit-any */



const HERO_IMG = "https://cdn.poehali.dev/projects/0a66a9c5-b11e-428a-881d-33e417292011/files/cb1f50ae-fa7d-4dd3-9a44-e07a3a0e5e65.jpg";
const BEFORE_AFTER_IMG = "https://cdn.poehali.dev/projects/0a66a9c5-b11e-428a-881d-33e417292011/files/bc587d18-e73d-4682-a383-9219ae776066.jpg";

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Как работаем", href: "#process" },
  { label: "Преимущества", href: "#why" },
  { label: "Работы", href: "#portfolio" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Гарантии", href: "#guarantees" },
  { label: "Цены", href: "#prices" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Hammer", title: "Комплексный ремонт", desc: "Полный цикл работ под ключ — от демонтажа до финишной отделки" },
  { icon: "Layers", title: "Отделочные работы", desc: "Штукатурка, шпаклёвка, покраска, поклейка обоев премиум-класса" },
  { icon: "Grid3x3", title: "Укладка плитки", desc: "Керамогранит, мозаика, мрамор — любые форматы и паттерны" },
  { icon: "Building2", title: "Натяжные потолки", desc: "Глянец, матовые, тканевые — монтаж за 1 день" },
  { icon: "Wrench", title: "Сантехника", desc: "Разводка труб, установка оборудования, тёплые полы" },
  { icon: "Zap", title: "Электромонтаж", desc: "Замена проводки, монтаж щитков, умный дом" },
];

const STEPS = [
  { num: "01", title: "Замер и смета", desc: "Выезжаем бесплатно, составляем точную смету за 24 часа" },
  { num: "02", title: "Договор", desc: "Фиксируем цену и сроки — никаких дополнительных расходов" },
  { num: "03", title: "Работы", desc: "Бригада приступает в согласованный день, ежедневный фотоотчёт" },
  { num: "04", title: "Сдача объекта", desc: "Принимаете работу, подписываете акт, получаете гарантийный паспорт" },
];

const WHY = [
  { icon: "ShieldCheck", title: "Гарантия 5 лет", desc: "На все виды работ и материалы — письменно в договоре" },
  { icon: "Clock", title: "Точно в срок", desc: "Штрафные санкции за каждый день просрочки — 1% от суммы" },
  { icon: "FileText", title: "Фиксированная цена", desc: "Смета не меняется в процессе работ. Никогда" },
  { icon: "Users", title: "Своя бригада", desc: "Только штатные мастера с опытом от 8 лет, без субподряда" },
  { icon: "Camera", title: "Фотоотчёты", desc: "Ежедневные отчёты в мессенджер — видите всё в реальном времени" },
  { icon: "Award", title: "Сертификаты", desc: "Официальный партнёр ведущих производителей материалов" },
];

const REVIEWS = [
  { name: "Алексей Морозов", obj: "3-комнатная квартира, 87 м²", text: "Сделали ремонт за 6 недель вместо обещанных 7. Качество — выше всяких похвал. Особенно порадовал ежедневный фотоотчёт, был в командировке и всё видел онлайн.", rating: 5 },
  { name: "Екатерина Соколова", obj: "Офис, 240 м²", text: "Уже второй объект с этой компанией. Первый раз — квартира, теперь офис. Работают чётко, по смете, без лишних вопросов. Рекомендую.", rating: 5 },
  { name: "Дмитрий Павлов", obj: "Загородный дом, 180 м²", text: "Сложный объект — много нестандартных решений. Ребята предложили отличные идеи, сэкономили на материалах без потери качества.", rating: 5 },
];

const GUARANTEES = [
  { icon: "ShieldCheck", title: "Гарантия на работы — 5 лет", desc: "Любые дефекты, возникшие по нашей вине, устраняем бесплатно в течение 5 лет" },
  { icon: "Package", title: "Только сертифицированные материалы", desc: "Работаем только с проверенными поставщиками, предоставляем сертификаты на все материалы" },
  { icon: "FileCheck", title: "Договор с фиксированной ценой", desc: "Цена зафиксирована в договоре и не изменится даже если выросли цены на материалы" },
  { icon: "RefreshCw", title: "Бесплатные исправления", desc: "Если что-то не нравится — исправим до вашего полного удовлетворения без доп. оплаты" },
];

const PRICES = [
  { type: "Косметический ремонт", price: "от 2 500 ₽/м²", time: "2–4 недели", features: ["Поклейка обоев", "Покраска потолков", "Укладка ламината", "Установка плинтусов"], highlight: false },
  { type: "Ремонт под ключ", price: "от 5 500 ₽/м²", time: "6–10 недель", features: ["Все виды работ", "Электрика и сантехника", "Плитка и стяжка", "Отделка балкона"], highlight: true },
  { type: "Дизайнерский ремонт", price: "от 9 000 ₽/м²", time: "10–16 недель", features: ["Авторский дизайн", "Премиальные материалы", "Умный дом", "Гарантия 7 лет"], highlight: false },
];

function RevealBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function StarRating({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="text-[#FF6A00] text-base">★</span>
      ))}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", area: "" });

  const handleScroll = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300 }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-widest" style={{ fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>
            СТРОЙ<span className="text-[#FF6A00]">МАСТЕР</span>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => handleScroll(l.href)}
                className="nav-link text-xs tracking-widest text-white/60 hover:text-white uppercase transition-colors"
                style={{ fontFamily: "'Oswald', sans-serif" }}>
                {l.label}
              </button>
            ))}
          </div>
          <a href="tel:+79001234567"
            className="hidden lg:flex items-center gap-2 bg-[#FF6A00] text-black font-semibold text-sm px-5 py-2.5 tracking-wider hover:bg-[#cc5500] transition-colors"
            style={{ fontFamily: "'Oswald', sans-serif" }}>
            <Icon name="Phone" size={14} />
            +7 (900) 123-45-67
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white/70 hover:text-white">
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-[#141414] border-t border-white/5 px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => handleScroll(l.href)}
                className="text-left text-sm tracking-widest text-white/60 hover:text-[#FF6A00] uppercase transition-colors"
                style={{ fontFamily: "'Oswald', sans-serif" }}>
                {l.label}
              </button>
            ))}
            <a href="tel:+79001234567"
              className="mt-2 flex items-center justify-center gap-2 bg-[#FF6A00] text-black font-semibold text-sm px-5 py-3 tracking-wider"
              style={{ fontFamily: "'Oswald', sans-serif" }}>
              <Icon name="Phone" size={14} />
              +7 (900) 123-45-67
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Ремонт" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
        </div>
        <div className="absolute right-0 top-1/4 w-1 h-64 bg-[#FF6A00] opacity-60" />
        <div className="absolute right-12 top-1/3 w-1 h-32 bg-[#FF6A00] opacity-25" />

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="animate-fade-in-up flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#FF6A00]" />
              <span className="text-xs tracking-[0.3em] text-[#FF6A00] uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Профессиональный ремонт
              </span>
            </div>
            <h1 className="animate-fade-in-up text-5xl md:text-7xl font-bold leading-none mb-6"
              style={{ fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase', animationDelay: '0.1s' }}>
              РЕМОНТ, <br />
              <span className="text-[#FF6A00]">КОТОРОМУ</span> <br />
              ДОВЕРЯЮТ
            </h1>
            <p className="animate-fade-in-up text-white/60 text-lg leading-relaxed mb-10 max-w-xl"
              style={{ animationDelay: '0.2s' }}>
              Квартиры, дома, офисы. Фиксированная цена, точные сроки, гарантия 5 лет. Более 500 завершённых объектов.
            </p>
            <div className="animate-fade-in-up flex flex-wrap gap-4" style={{ animationDelay: '0.3s' }}>
              <button onClick={() => handleScroll("#order")}
                className="orange-pulse bg-[#FF6A00] text-black font-bold px-8 py-4 tracking-widest text-sm uppercase hover:bg-[#cc5500] transition-colors"
                style={{ fontFamily: "'Oswald', sans-serif" }}>
                Заказать замер бесплатно
              </button>
              <button onClick={() => handleScroll("#portfolio")}
                className="border border-white/20 text-white font-semibold px-8 py-4 tracking-widest text-sm uppercase hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors"
                style={{ fontFamily: "'Oswald', sans-serif" }}>
                Наши работы
              </button>
            </div>

            <div className="animate-fade-in-up mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10"
              style={{ animationDelay: '0.5s' }}>
              {[
                { val: "500+", label: "Объектов сдано" },
                { val: "12", label: "Лет на рынке" },
                { val: "98%", label: "Клиентов довольны" },
              ].map(s => (
                <div key={s.label}>
                  <div className="stat-number">{s.val}</div>
                  <div className="text-white/40 text-xs tracking-wider uppercase mt-1"
                    style={{ fontFamily: "'Oswald', sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-[#FF6A00]" />
              <span className="text-xs tracking-[0.3em] text-[#FF6A00] uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>Что мы делаем</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-16" style={{ fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>Наши услуги</h2>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <RevealBlock key={s.title}>
                <div className="service-card bg-[#161616] p-8 h-full">
                  <div className="w-12 h-12 bg-[#FF6A00]/10 flex items-center justify-center mb-6">
                    <Icon name={s.icon as any} size={22} className="text-[#FF6A00]" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-wider mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-[#FF6A00]" />
              <span className="text-xs tracking-[0.3em] text-[#FF6A00] uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>Прозрачный процесс</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-16" style={{ fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>Как мы работаем</h2>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {STEPS.map((step, i) => (
              <RevealBlock key={step.num}>
                <div className="relative p-8 border border-white/5 bg-[#111] h-full">
                  <div className="text-6xl font-bold text-[#FF6A00]/12 leading-none mb-4 select-none"
                    style={{ fontFamily: "'Oswald', sans-serif" }}>{step.num}</div>
                  <div className="absolute top-8 left-8 text-xs text-[#FF6A00] tracking-widest"
                    style={{ fontFamily: "'Oswald', sans-serif" }}>{step.num}</div>
                  <h3 className="text-lg font-semibold tracking-wider mb-3 mt-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}>{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="py-24 bg-[#111111] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-px h-full bg-[#FF6A00]/15" />
        <div className="max-w-7xl mx-auto px-6">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-[#FF6A00]" />
              <span className="text-xs tracking-[0.3em] text-[#FF6A00] uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>Наши преимущества</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-16" style={{ fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>Почему нас выбирают</h2>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {WHY.map((w) => (
              <RevealBlock key={w.title}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FF6A00] flex items-center justify-center mt-1">
                    <Icon name={w.icon as any} size={18} className="text-black" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-wider mb-2"
                      style={{ fontFamily: "'Oswald', sans-serif" }}>{w.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-[#FF6A00]" />
              <span className="text-xs tracking-[0.3em] text-[#FF6A00] uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>Портфолио</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>Наши работы</h2>
            <p className="text-white/40 text-sm mb-16">Реальные объекты — фото до и после</p>
          </RevealBlock>
          <RevealBlock>
            <div className="relative overflow-hidden group cursor-pointer">
              <img src={BEFORE_AFTER_IMG} alt="До и после" className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <div className="inline-block bg-[#FF6A00] text-black font-bold text-xs tracking-widest px-4 py-2 mb-3"
                  style={{ fontFamily: "'Oswald', sans-serif" }}>ДО / ПОСЛЕ</div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>3-комнатная квартира, 87 м²</h3>
                <p className="text-white/60 text-sm">Капитальный ремонт под ключ · 8 недель</p>
              </div>
            </div>
          </RevealBlock>
          <RevealBlock>
            <div className="mt-8 text-center">
              <p className="text-white/40 text-sm mb-6">Более 500 завершённых объектов в портфолио</p>
              <button onClick={() => handleScroll("#order")}
                className="border border-[#FF6A00] text-[#FF6A00] font-semibold px-8 py-3 tracking-widest text-sm uppercase hover:bg-[#FF6A00] hover:text-black transition-colors"
                style={{ fontFamily: "'Oswald', sans-serif" }}>
                Хочу такой же результат
              </button>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-[#FF6A00]" />
              <span className="text-xs tracking-[0.3em] text-[#FF6A00] uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>Отзывы</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-16" style={{ fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>Клиенты о нас</h2>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REVIEWS.map((r) => (
              <RevealBlock key={r.name}>
                <div className="service-card bg-[#161616] p-8 h-full flex flex-col">
                  <StarRating n={r.rating} />
                  <p className="text-white/70 text-sm leading-relaxed mt-5 mb-6 flex-1">«{r.text}»</p>
                  <div className="border-t border-white/8 pt-5">
                    <div className="font-semibold tracking-wider text-sm" style={{ fontFamily: "'Oswald', sans-serif" }}>{r.name}</div>
                    <div className="text-white/40 text-xs mt-1">{r.obj}</div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section id="guarantees" className="py-24 bg-[#0f0f0f] relative">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#FF6A00]/4 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-[#FF6A00]" />
              <span className="text-xs tracking-[0.3em] text-[#FF6A00] uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>Надёжность</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-16" style={{ fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>Гарантии и материалы</h2>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GUARANTEES.map((g) => (
              <RevealBlock key={g.title}>
                <div className="service-card bg-[#111] p-8 flex gap-5 h-full">
                  <div className="flex-shrink-0 w-12 h-12 border border-[#FF6A00]/40 flex items-center justify-center">
                    <Icon name={g.icon as any} size={20} className="text-[#FF6A00]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-wider mb-2"
                      style={{ fontFamily: "'Oswald', sans-serif" }}>{g.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-[#FF6A00]" />
              <span className="text-xs tracking-[0.3em] text-[#FF6A00] uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>Стоимость</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>Цены и сроки</h2>
            <p className="text-white/40 text-sm mb-16">Точная стоимость — после бесплатного замера</p>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICES.map((p) => (
              <RevealBlock key={p.type}>
                <div className={`relative p-8 h-full flex flex-col ${p.highlight ? "bg-[#FF6A00]" : "service-card bg-[#161616]"}`}>
                  {p.highlight && (
                    <div className="absolute -top-3 left-8 bg-black text-[#FF6A00] text-xs tracking-widest px-4 py-1"
                      style={{ fontFamily: "'Oswald', sans-serif" }}>
                      ПОПУЛЯРНЫЙ
                    </div>
                  )}
                  <h3 className={`text-lg font-semibold tracking-wider mb-2 ${p.highlight ? "text-black" : "text-white"}`}
                    style={{ fontFamily: "'Oswald', sans-serif" }}>{p.type}</h3>
                  <div className={`text-3xl font-bold mb-1 ${p.highlight ? "text-black" : "text-[#FF6A00]"}`}
                    style={{ fontFamily: "'Oswald', sans-serif" }}>{p.price}</div>
                  <div className={`text-sm mb-6 ${p.highlight ? "text-black/70" : "text-white/40"}`}>{p.time}</div>
                  <ul className="flex-1 space-y-3 mb-8">
                    {p.features.map(f => (
                      <li key={f} className={`flex items-center gap-3 text-sm ${p.highlight ? "text-black/80" : "text-white/60"}`}>
                        <Icon name="Check" size={14} className={p.highlight ? "text-black" : "text-[#FF6A00]"} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleScroll("#order")}
                    className={`w-full font-semibold text-sm tracking-widest py-3 uppercase transition-colors ${p.highlight
                      ? "bg-black text-white hover:bg-[#111]"
                      : "border border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-black"}`}
                    style={{ fontFamily: "'Oswald', sans-serif" }}>
                    Выбрать
                  </button>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="order" className="py-24 bg-[#0f0f0f] relative overflow-hidden">
        <div className="absolute inset-0 opacity-50"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,106,0,0.015) 40px, rgba(255,106,0,0.015) 41px)" }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <RevealBlock>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-12 bg-[#FF6A00]" />
              <span className="text-xs tracking-[0.3em] text-[#FF6A00] uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>Бесплатно</span>
              <div className="h-px w-12 bg-[#FF6A00]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>Заказать замер</h2>
            <p className="text-white/50 text-sm mb-12">Выедем в течение 24 часов. Смету подготовим за 24 часа после замера.</p>

            <div className="bg-[#141414] border border-white/8 p-8 md:p-10 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs tracking-widest text-white/40 uppercase block mb-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}>Ваше имя</label>
                  <input type="text" value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="Иван Иванов"
                    className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#FF6A00] transition-colors" />
                </div>
                <div>
                  <label className="text-xs tracking-widest text-white/40 uppercase block mb-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}>Телефон</label>
                  <input type="tel" value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#FF6A00] transition-colors" />
                </div>
              </div>
              <div className="mb-6">
                <label className="text-xs tracking-widest text-white/40 uppercase block mb-2"
                  style={{ fontFamily: "'Oswald', sans-serif" }}>Площадь объекта (м²)</label>
                <input type="text" value={formData.area}
                  onChange={e => setFormData(p => ({ ...p, area: e.target.value }))}
                  placeholder="Например: 65"
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#FF6A00] transition-colors" />
              </div>
              <button className="w-full bg-[#FF6A00] text-black font-bold text-sm tracking-widest py-4 uppercase hover:bg-[#cc5500] transition-colors"
                style={{ fontFamily: "'Oswald', sans-serif" }}>
                Отправить заявку на замер
              </button>
              <p className="text-white/25 text-xs mt-4 text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-[#FF6A00]" />
              <span className="text-xs tracking-[0.3em] text-[#FF6A00] uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>Связаться</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-16" style={{ fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>Контакты</h2>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: "Phone", title: "Телефон", val: "+7 (900) 123-45-67", sub: "Ежедневно 8:00–22:00" },
              { icon: "MapPin", title: "Адрес", val: "г. Москва", sub: "Работаем по всей Москве и МО" },
              { icon: "Mail", title: "Email", val: "info@stroymaster.ru", sub: "Ответим в течение часа" },
            ].map(c => (
              <RevealBlock key={c.title}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#FF6A00] flex items-center justify-center">
                    <Icon name={c.icon as any} size={18} className="text-black" />
                  </div>
                  <div>
                    <div className="text-xs tracking-widest text-white/40 uppercase mb-1"
                      style={{ fontFamily: "'Oswald', sans-serif" }}>{c.title}</div>
                    <div className="font-semibold text-base" style={{ fontFamily: "'Oswald', sans-serif" }}>{c.val}</div>
                    <div className="text-white/40 text-xs mt-1">{c.sub}</div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-lg font-bold tracking-widest" style={{ fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>
            СТРОЙ<span className="text-[#FF6A00]">МАСТЕР</span>
          </div>
          <div className="text-white/25 text-xs">© 2024 СтройМастер. Все права защищены.</div>
          <a href="tel:+79001234567"
            className="flex items-center gap-2 text-[#FF6A00] text-sm tracking-wider hover:text-[#cc5500] transition-colors"
            style={{ fontFamily: "'Oswald', sans-serif" }}>
            <Icon name="Phone" size={14} />
            +7 (900) 123-45-67
          </a>
        </div>
      </footer>

    </div>
  );
}