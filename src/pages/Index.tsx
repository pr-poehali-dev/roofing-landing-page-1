/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

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
  {
    icon: "Home",
    title: "Монтаж новой кровли",
    desc: "Укладываем металлочерепицу, профнастил, мягкую кровлю. Делаем быстро и с гарантией — независимо от погоды.",
  },
  {
    icon: "Building2",
    title: "Мансарда и чердак",
    desc: "Строим второй и третий этаж «под ключ» — увеличиваем жилую площадь без стройки нового дома.",
  },
  {
    icon: "Wrench",
    title: "Реставрация кровли",
    desc: "Устраняем протечки, заменяем повреждённые участки, восстанавливаем старую крышу. Не нужно менять всё — починим то, что течёт.",
  },
  {
    icon: "Thermometer",
    title: "Утепление кровли и пола",
    desc: "Избавляем от конденсата и сырости. Утепляем кровлю, стены, полы — в доме становится теплее, счета за отопление снижаются.",
  },
  {
    icon: "Trees",
    title: "Дома, бани, беседки",
    desc: "Строим каркасные, брусовые и деревянные дома, бани и беседки. От фундамента до конька — всё под ключ.",
  },
  {
    icon: "Layers",
    title: "Фасадные работы",
    desc: "Монтаж сайдинга, водоотливных систем, облицовка фасада. Дом становится красивым снаружи и защищённым от осадков.",
  },
  {
    icon: "Droplets",
    title: "Исправление конденсата",
    desc: "Если в доме сыро, потеют окна или капает с потолка — найдём причину и устраним раз и навсегда.",
  },
];

const STEPS = [
  { num: "01", title: "Звоните нам", desc: "Рассказываете задачу — мы объясняем, что нужно сделать и сколько это стоит примерно." },
  { num: "02", title: "Выезжаем на замер", desc: "Мастер приедет в течение 3 часов. Замер бесплатный, ни к чему вас не обязывает." },
  { num: "03", title: "Смета и договор", desc: "После осмотра выдаём точную смету. Цена фиксируется — никаких сюрпризов в процессе." },
  { num: "04", title: "Предоплата и дата", desc: "Вносите предоплату, согласовываем день старта. Обычно выходим на объект уже на следующий день." },
  { num: "05", title: "Материалы", desc: "Помогаем выбрать и купить материалы. Можем закупить сами — привезём к нужной дате." },
  { num: "06", title: "Работа и сдача", desc: "Работаем с 8 утра до темноты. Вы можете контролировать каждый день. Принимаете работу — подписываем акт." },
];

const WHY = [
  { icon: "Zap", title: "Крышу за 5 дней", desc: "Работаем быстро — стандартный дом кроем за 5 рабочих дней." },
  { icon: "CloudRain", title: "В любую погоду", desc: "Не останавливаемся из-за дождя или ветра. Работаем, пока светло." },
  { icon: "ShieldCheck", title: "Гарантия 5 лет", desc: "Письменная гарантия на все работы. Если что — приедем и исправим бесплатно." },
  { icon: "Clock", title: "Замер через 3 часа", desc: "Позвонили утром — мастер уже у вас к обеду. Замер и выезд бесплатно." },
  { icon: "Users", title: "15 своих мастеров", desc: "Только граждане РФ с опытом. Никакого субподряда — вы знаете, кто работает у вас." },
  { icon: "Star", title: "1500+ объектов", desc: "10 лет в деле. За плечами — более полутора тысяч сданных крыш и фасадов." },
  { icon: "Package", title: "Материалы от производителя", desc: "Металлочерепица, профнастил — без посредников. Качество проверено, цена честная." },
  { icon: "Sun", title: "С 8 утра до темноты", desc: "Максимально используем световой день. Никаких «приедем после обеда»." },
];

const REVIEWS = [
  {
    name: "Сергей Михайлов",
    loc: "Подмосковье, дом 180 м²",
    text: "Обратился после сильного дождя — потекла крыша над гостиной. Приехали в тот же день, всё осмотрели. Через неделю крыша была готова. Работают аккуратно, мусор убрали за собой. Доволен.",
    stars: 5,
  },
  {
    name: "Андрей Воронов",
    loc: "Раменское, новый дом",
    text: "Делали кровлю на новом доме. Ребята помогли выбрать металлочерепицу, не навязывали дорогое. Сделали за 4 дня, даже быстрее чем обещали. Гарантийный талон выдали, всё по-честному.",
    stars: 5,
  },
  {
    name: "Виктор Лазарев",
    loc: "Дача в Калужской обл.",
    text: "Нужна была мансарда над первым этажом дачи. Приехали, замерили, предложили несколько вариантов. Сделали всё быстро и без лишней суеты. Цена вышла чуть ниже, чем я ожидал.",
    stars: 5,
  },
  {
    name: "Дмитрий Кузнецов",
    loc: "Коттедж, Истринский р-н",
    text: "Устанавливали сайдинг на фасад и водоотлив. Работа аккуратная, швы ровные. Приходили вовремя, лишних вопросов не задавали. Порекомендовал уже двум соседям.",
    stars: 5,
  },
];

const PRICES = [
  {
    title: "Ремонт и реставрация",
    price: "от 350 ₽/м²",
    time: "от 1 дня",
    items: ["Замена повреждённых участков", "Устранение протечек", "Гидроизоляция", "Замер и смета бесплатно"],
    accent: false,
  },
  {
    title: "Монтаж новой кровли",
    price: "от 800 ₽/м²",
    time: "от 5 дней",
    items: ["Металлочерепица или профнастил", "Стропильная система", "Утепление и пароизоляция", "Гарантия 5 лет"],
    accent: true,
  },
  {
    title: "Строительство домов",
    price: "по смете",
    time: "индивидуально",
    items: ["Каркасные, брусовые, деревянные", "Бани и беседки", "Кровля и фасад включены", "Под ключ"],
    accent: false,
  },
];

const GUARANTEES = [
  { icon: "ShieldCheck", title: "Гарантия 5 лет на работы", desc: "Всё прописано в договоре. Если появится протечка по нашей вине — приедем и исправим без доп. оплаты." },
  { icon: "FileCheck", title: "Цена фиксируется в договоре", desc: "Смета не растёт в процессе. Договорились — значит, именно столько и заплатите." },
  { icon: "Package", title: "Сертифицированные материалы", desc: "Работаем только с проверенными производителями металлочерепицы и профнастила." },
  { icon: "RefreshCw", title: "Бесплатные правки", desc: "Что-то не устроило по ходу работы — скажите, скорректируем. Без торгов и доплат." },
];

function RevealBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="text-[#FF6A00]">★</span>
      ))}
    </div>
  );
}

const OLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="font-oswald text-[11px] tracking-[0.3em] text-[#FF6A00] uppercase">{children}</span>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase leading-tight">{children}</h2>
);

const AccentLine = () => <div className="h-px w-12 bg-[#FF6A00] flex-shrink-0" />;

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "", task: "" });
  const [sent, setSent] = useState(false);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white overflow-x-hidden" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300 }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#0d0d0d]/96 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 h-[60px] flex items-center justify-between gap-4">
          <button onClick={() => scrollTo("#hero")} className="font-oswald text-lg font-bold tracking-widest uppercase shrink-0">
            КРОВ<span className="text-[#FF6A00]">ЕЛЬ</span>
          </button>
          <div className="hidden xl:flex items-center gap-6">
            {NAV.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="nav-link font-oswald text-[11px] tracking-widest text-white/55 hover:text-white uppercase transition-colors">
                {l.label}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+79001234567"
              className="flex items-center gap-2 font-oswald text-sm tracking-wider text-white/80 hover:text-[#FF6A00] transition-colors">
              <Icon name="Phone" size={13} />
              +7 (900) 123-45-67
            </a>
            <button onClick={() => scrollTo("#order")}
              className="bg-[#FF6A00] text-black font-oswald font-semibold text-xs tracking-widest px-4 py-2.5 uppercase hover:bg-[#e05a00] transition-colors">
              Вызвать замерщика
            </button>
          </div>
          <button onClick={() => setMenuOpen(v => !v)} className="xl:hidden text-white/70 hover:text-white ml-2">
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="xl:hidden bg-[#141414] border-t border-white/5 px-5 py-5 flex flex-col gap-3">
            {NAV.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-left font-oswald text-sm tracking-widest text-white/60 hover:text-[#FF6A00] uppercase transition-colors py-1">
                {l.label}
              </button>
            ))}
            <a href="tel:+79001234567"
              className="mt-2 flex items-center gap-2 font-oswald text-sm text-white tracking-wider">
              <Icon name="Phone" size={14} className="text-[#FF6A00]" />
              +7 (900) 123-45-67
            </a>
            <button onClick={() => scrollTo("#order")}
              className="mt-1 bg-[#FF6A00] text-black font-oswald font-semibold text-sm tracking-widest px-5 py-3 uppercase">
              Вызвать замерщика
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center pt-[60px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="Кровельные работы" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/75 to-[#0d0d0d]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
        </div>
        {/* vertical accent lines */}
        <div className="absolute right-0 top-1/4 w-[3px] h-56 bg-[#FF6A00]" />
        <div className="absolute right-10 top-1/3 w-[2px] h-28 bg-[#FF6A00]/35" />

        <div className="relative max-w-7xl mx-auto px-5 py-28 md:py-36">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up flex items-center gap-3 mb-6">
              <AccentLine />
              <OLabel>Кровельные и фасадные работы</OLabel>
            </div>
            <h1 className="animate-fade-in-up font-oswald text-[clamp(2.8rem,7vw,5.5rem)] font-bold uppercase leading-[0.95] mb-5"
              style={{ animationDelay: "0.1s" }}>
              Надёжная крыша<br />
              <span className="text-[#FF6A00]">над вашим домом</span>
            </h1>
            <p className="animate-fade-in-up text-white/60 text-lg leading-relaxed mb-8 max-w-lg"
              style={{ animationDelay: "0.2s" }}>
              Монтируем, ремонтируем и утепляем кровли. Приезжаем на замер через 3 часа — бесплатно. Работаем быстро, даём гарантию 5 лет.
            </p>
            <div className="animate-fade-in-up flex flex-wrap gap-3 mb-14" style={{ animationDelay: "0.3s" }}>
              <button onClick={() => scrollTo("#order")}
                className="orange-pulse bg-[#FF6A00] text-black font-oswald font-bold text-sm tracking-widest px-7 py-4 uppercase hover:bg-[#e05a00] transition-colors">
                Вызвать замерщика
              </button>
              <button onClick={() => scrollTo("#order")}
                className="border border-white/25 text-white font-oswald text-sm tracking-widest px-7 py-4 uppercase hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors">
                Получить смету
              </button>
            </div>

            {/* mini-badges */}
            <div className="animate-fade-in-up flex flex-wrap gap-3" style={{ animationDelay: "0.45s" }}>
              {[
                { icon: "Zap", text: "Крыша за 5 дней" },
                { icon: "ShieldCheck", text: "Гарантия 5 лет" },
                { icon: "Clock", text: "Замер через 3 часа" },
                { icon: "Star", text: "1500+ объектов" },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-2 bg-white/5 border border-white/8 px-4 py-2">
                  <Icon name={b.icon as any} size={14} className="text-[#FF6A00]" />
                  <span className="font-oswald text-xs tracking-widest uppercase text-white/70">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* stat strip */}
        <div className="absolute bottom-0 inset-x-0 bg-[#0d0d0d]/90 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-5 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: "1500+", label: "объектов сдано" },
              { val: "10 лет", label: "опыт бригад" },
              { val: "5 дней", label: "средний срок кровли" },
              { val: "5 лет", label: "гарантия на работы" },
            ].map(s => (
              <div key={s.label} className="text-center md:text-left">
                <div className="font-oswald text-2xl md:text-3xl font-bold text-[#FF6A00]">{s.val}</div>
                <div className="text-white/40 text-xs uppercase tracking-wider mt-0.5" style={{ fontFamily: "'Oswald', sans-serif" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-[#111]">
        <div className="max-w-7xl mx-auto px-5">
          <RevealBlock className="mb-14">
            <div className="flex items-center gap-3 mb-3"><AccentLine /><OLabel>Что мы делаем</OLabel></div>
            <SectionTitle>Наши услуги</SectionTitle>
            <p className="text-white/45 text-sm mt-3 max-w-xl">Работаем с частными домами, дачами и коттеджами — от небольшого ремонта до стройки под ключ.</p>
          </RevealBlock>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SERVICES.map((s) => (
              <RevealBlock key={s.title}>
                <div className="service-card bg-[#161616] p-7 h-full flex flex-col">
                  <div className="w-11 h-11 bg-[#FF6A00]/12 flex items-center justify-center mb-5">
                    <Icon name={s.icon as any} size={20} className="text-[#FF6A00]" />
                  </div>
                  <h3 className="font-oswald text-base font-semibold tracking-wide mb-2 uppercase">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">{s.desc}</p>
                  <button onClick={() => scrollTo("#order")}
                    className="mt-5 text-[#FF6A00] font-oswald text-xs tracking-widest uppercase flex items-center gap-1.5 hover:gap-3 transition-all group">
                    Узнать цену <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section id="why" className="py-24 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#FF6A00]/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-5">
          <RevealBlock className="mb-14">
            <div className="flex items-center gap-3 mb-3"><AccentLine /><OLabel>Почему нас выбирают</OLabel></div>
            <SectionTitle>Наши преимущества</SectionTitle>
          </RevealBlock>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map((w) => (
              <RevealBlock key={w.title}>
                <div className="service-card bg-[#131313] p-6 h-full">
                  <div className="w-10 h-10 bg-[#FF6A00] flex items-center justify-center mb-4">
                    <Icon name={w.icon as any} size={18} className="text-black" />
                  </div>
                  <h3 className="font-oswald text-sm font-semibold tracking-wide uppercase mb-2">{w.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{w.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-24 bg-[#111]">
        <div className="max-w-7xl mx-auto px-5">
          <RevealBlock className="mb-14">
            <div className="flex items-center gap-3 mb-3"><AccentLine /><OLabel>Прозрачно и понятно</OLabel></div>
            <SectionTitle>Как мы работаем</SectionTitle>
            <p className="text-white/45 text-sm mt-3 max-w-xl">6 шагов от первого звонка до готовой крыши — без сюрпризов и скрытых расходов.</p>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STEPS.map((step, i) => (
              <RevealBlock key={step.num}>
                <div className="relative bg-[#161616] border border-white/5 p-7 h-full hover:border-[#FF6A00]/40 transition-colors">
                  <div className="font-oswald text-[5rem] font-bold text-[#FF6A00]/8 leading-none absolute top-4 right-5 select-none">{step.num}</div>
                  <div className="font-oswald text-xs text-[#FF6A00] tracking-widest mb-3">{step.num}</div>
                  <h3 className="font-oswald text-base font-semibold tracking-wide uppercase mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <RevealBlock>
              <div className="flex items-center gap-3 mb-3"><AccentLine /><OLabel>О компании</OLabel></div>
              <SectionTitle>10 лет <span className="text-[#FF6A00]">на крышах</span></SectionTitle>
              <p className="text-white/60 leading-relaxed mt-6 mb-6">
                Наши бригады работают уже 10 лет. Формально компания оформлена 5 лет назад, но люди в команде — с большим опытом за плечами. За это время мы сделали более <strong className="text-white">1500 объектов</strong>: от дачных домиков до коттеджей площадью 400 м².
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                В команде 15 сотрудников — все граждане РФ, проверенные, не боятся высоты и любят свою работу. Мы не нанимаем случайных людей. У нас нет текучки: большинство мастеров работают с нами годами.
              </p>
              <p className="text-white/60 leading-relaxed">
                Мы убеждены: кровля — это не расходы, это вложение в безопасность вашего дома. Поэтому работаем честно, не экономим на материалах и всегда объясняем, за что берём деньги.
              </p>
            </RevealBlock>
            <RevealBlock>
              <div className="relative">
                <img src={IMG_HOUSE} alt="Готовый дом с новой кровлей" className="w-full h-[400px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/60 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 grid grid-cols-3 bg-[#0d0d0d]/90 border-t border-white/8">
                  {[
                    { val: "1500+", label: "Объектов" },
                    { val: "15", label: "Мастеров" },
                    { val: "5 лет", label: "Гарантия" },
                  ].map(s => (
                    <div key={s.label} className="text-center py-5 border-r border-white/8 last:border-0">
                      <div className="font-oswald text-2xl font-bold text-[#FF6A00]">{s.val}</div>
                      <div className="text-white/40 text-xs uppercase tracking-wider mt-0.5" style={{ fontFamily: "'Oswald', sans-serif" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-24 bg-[#111]">
        <div className="max-w-7xl mx-auto px-5">
          <RevealBlock className="mb-14">
            <div className="flex items-center gap-3 mb-3"><AccentLine /><OLabel>Портфолио</OLabel></div>
            <SectionTitle>Наши работы</SectionTitle>
            <p className="text-white/45 text-sm mt-3">Реальные объекты — фото до и после</p>
          </RevealBlock>
          <RevealBlock>
            <div className="relative group overflow-hidden cursor-pointer">
              <img src={IMG_BEFORE_AFTER} alt="До и после ремонта кровли"
                className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <div className="inline-block bg-[#FF6A00] text-black font-oswald font-bold text-xs tracking-widest px-4 py-1.5 mb-3">
                  ДО / ПОСЛЕ
                </div>
                <h3 className="font-oswald text-2xl font-bold uppercase">Замена старой кровли</h3>
                <p className="text-white/60 text-sm mt-1">Металлочерепица · Подмосковье · 3 дня</p>
              </div>
            </div>
          </RevealBlock>
          <RevealBlock>
            <p className="text-center text-white/40 text-sm mt-8 mb-5">Более 1500 выполненных объектов — крыши, фасады, мансарды, дома</p>
            <div className="text-center">
              <button onClick={() => scrollTo("#order")}
                className="border border-[#FF6A00] text-[#FF6A00] font-oswald font-semibold text-sm tracking-widest px-8 py-3 uppercase hover:bg-[#FF6A00] hover:text-black transition-colors">
                Хочу такой же результат
              </button>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-5">
          <RevealBlock className="mb-14">
            <div className="flex items-center gap-3 mb-3"><AccentLine /><OLabel>Что говорят клиенты</OLabel></div>
            <SectionTitle>Отзывы</SectionTitle>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {REVIEWS.map((r) => (
              <RevealBlock key={r.name}>
                <div className="service-card bg-[#141414] p-7 h-full flex flex-col">
                  <Stars n={r.stars} />
                  <p className="text-white/65 text-sm leading-relaxed mt-4 mb-6 flex-1">«{r.text}»</p>
                  <div className="border-t border-white/8 pt-4">
                    <div className="font-oswald font-semibold text-sm tracking-wide">{r.name}</div>
                    <div className="text-white/35 text-xs mt-0.5">{r.loc}</div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICE OBJECTION BLOCK ── */}
      <section className="py-14 bg-[#131313] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <RevealBlock>
            <p className="font-oswald text-xl md:text-2xl font-bold uppercase text-white/80 leading-snug">
              «Дорого» — это когда крыша потекла повторно, <span className="text-[#FF6A00]">а подрядчик не отвечает.</span>
            </p>
            <p className="text-white/45 text-sm mt-4 max-w-2xl mx-auto leading-relaxed">
              Кровля — это не расходная статья. Это защита всего, что вы строили годами. Хорошая крыша стоит своих денег один раз и держится 20–30 лет. Плохая — стоит дешевле, но бьёт по карману снова и снова. Мы объясним всё до начала работ и предложим вариант под ваш бюджет.
            </p>
            <button onClick={() => scrollTo("#order")}
              className="mt-7 bg-[#FF6A00] text-black font-oswald font-bold text-sm tracking-widest px-8 py-4 uppercase hover:bg-[#e05a00] transition-colors">
              Получить честную смету
            </button>
          </RevealBlock>
        </div>
      </section>

      {/* ── PRICES ── */}
      <section id="prices" className="py-24 bg-[#111]">
        <div className="max-w-7xl mx-auto px-5">
          <RevealBlock className="mb-14">
            <div className="flex items-center gap-3 mb-3"><AccentLine /><OLabel>Стоимость</OLabel></div>
            <SectionTitle>Цены и сроки</SectionTitle>
            <p className="text-white/45 text-sm mt-3">Точная цена — после бесплатного замера. Это всегда выгоднее «средней по рынку».</p>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICES.map((p) => (
              <RevealBlock key={p.title}>
                <div className={`relative p-8 h-full flex flex-col ${p.accent ? "bg-[#FF6A00]" : "service-card bg-[#161616]"}`}>
                  {p.accent && (
                    <div className="absolute -top-3 left-8 bg-[#0d0d0d] text-[#FF6A00] font-oswald text-[10px] tracking-widest px-4 py-1">
                      ПОПУЛЯРНОЕ
                    </div>
                  )}
                  <h3 className={`font-oswald text-lg font-bold uppercase tracking-wide mb-2 ${p.accent ? "text-black" : "text-white"}`}>{p.title}</h3>
                  <div className={`font-oswald text-3xl font-bold mb-1 ${p.accent ? "text-black" : "text-[#FF6A00]"}`}>{p.price}</div>
                  <div className={`text-sm mb-7 ${p.accent ? "text-black/65" : "text-white/40"}`}>{p.time}</div>
                  <ul className="flex-1 space-y-2.5 mb-8">
                    {p.items.map(item => (
                      <li key={item} className={`flex items-center gap-2.5 text-sm ${p.accent ? "text-black/80" : "text-white/60"}`}>
                        <Icon name="Check" size={13} className={p.accent ? "text-black" : "text-[#FF6A00]"} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollTo("#order")}
                    className={`w-full font-oswald font-semibold text-xs tracking-widest py-3 uppercase transition-colors ${p.accent
                      ? "bg-black text-white hover:bg-[#1a1a1a]"
                      : "border border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-black"}`}>
                    Вызвать замерщика
                  </button>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEES ── */}
      <section id="guarantees" className="py-24 bg-[#0d0d0d] relative">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#FF6A00]/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5">
          <RevealBlock className="mb-14">
            <div className="flex items-center gap-3 mb-3"><AccentLine /><OLabel>Работаем честно</OLabel></div>
            <SectionTitle>Гарантии и материалы</SectionTitle>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GUARANTEES.map((g) => (
              <RevealBlock key={g.title}>
                <div className="service-card bg-[#111] p-8 flex gap-5 h-full">
                  <div className="flex-shrink-0 w-12 h-12 border border-[#FF6A00]/35 flex items-center justify-center">
                    <Icon name={g.icon as any} size={20} className="text-[#FF6A00]" />
                  </div>
                  <div>
                    <h3 className="font-oswald text-sm font-bold tracking-wide uppercase mb-2">{g.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORDER ── */}
      <section id="order" className="py-24 bg-[#111] relative overflow-hidden">
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage: "repeating-linear-gradient(135deg,transparent,transparent 40px,rgba(255,106,0,0.018) 40px,rgba(255,106,0,0.018) 41px)" }} />
        <div className="relative max-w-2xl mx-auto px-5">
          <RevealBlock>
            <div className="flex items-center justify-center gap-3 mb-3"><AccentLine /><OLabel>Бесплатно</OLabel><AccentLine /></div>
            <SectionTitle><span className="block text-center">Вызвать замерщика</span></SectionTitle>
            <p className="text-center text-white/50 text-sm mt-3 mb-10">
              Оставьте заявку — мастер свяжется в течение 15 минут и приедет в течение 3 часов.
            </p>

            {sent ? (
              <div className="bg-[#161616] border border-[#FF6A00]/40 p-10 text-center">
                <div className="w-14 h-14 bg-[#FF6A00] flex items-center justify-center mx-auto mb-5">
                  <Icon name="Check" size={26} className="text-black" />
                </div>
                <h3 className="font-oswald text-xl font-bold uppercase mb-2">Заявка принята!</h3>
                <p className="text-white/50 text-sm">Мы перезвоним в течение 15 минут.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#141414] border border-white/8 p-8 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="font-oswald text-[10px] tracking-widest text-white/40 uppercase block mb-2">Ваше имя</label>
                    <input type="text" value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Иван Иванов" required
                      className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#FF6A00] transition-colors" />
                  </div>
                  <div>
                    <label className="font-oswald text-[10px] tracking-widest text-white/40 uppercase block mb-2">Телефон</label>
                    <input type="tel" value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+7 (___) ___-__-__" required
                      className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#FF6A00] transition-colors" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="font-oswald text-[10px] tracking-widest text-white/40 uppercase block mb-2">Город / адрес</label>
                  <input type="text" value={form.city}
                    onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
                    placeholder="Москва, Подмосковье..."
                    className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#FF6A00] transition-colors" />
                </div>
                <div className="mb-7">
                  <label className="font-oswald text-[10px] tracking-widest text-white/40 uppercase block mb-2">Кратко задача</label>
                  <textarea value={form.task}
                    onChange={e => setForm(p => ({ ...p, task: e.target.value }))}
                    placeholder="Например: течёт кровля на даче, нужен ремонт"
                    rows={3}
                    className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/25 focus:outline-none focus:border-[#FF6A00] transition-colors resize-none" />
                </div>
                <button type="submit"
                  className="w-full bg-[#FF6A00] text-black font-oswald font-bold text-sm tracking-widest py-4 uppercase hover:bg-[#e05a00] transition-colors">
                  Отправить заявку
                </button>
                <p className="text-white/25 text-xs mt-4 text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            )}
          </RevealBlock>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-5">
          <RevealBlock className="mb-14">
            <div className="flex items-center gap-3 mb-3"><AccentLine /><OLabel>Связаться</OLabel></div>
            <SectionTitle>Контакты</SectionTitle>
          </RevealBlock>
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
                    <Icon name={c.icon as any} size={17} className="text-black" />
                  </div>
                  <div>
                    <div className="font-oswald text-[10px] tracking-widest text-white/35 uppercase mb-1">{c.title}</div>
                    <div className="font-oswald font-semibold text-sm tracking-wide">{c.val}</div>
                    <div className="text-white/40 text-xs mt-0.5">{c.sub}</div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#090909] border-t border-white/5 py-7">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-oswald text-lg font-bold tracking-widest uppercase">
            КРОВ<span className="text-[#FF6A00]">ЕЛЬ</span>
          </div>
          <p className="text-white/25 text-xs">© 2024 Кровельная компания. Все права защищены.</p>
          <a href="tel:+79001234567"
            className="flex items-center gap-2 font-oswald text-sm text-[#FF6A00] tracking-wider hover:text-[#e05a00] transition-colors">
            <Icon name="Phone" size={13} />
            +7 (900) 123-45-67
          </a>
        </div>
      </footer>

    </div>
  );
}
