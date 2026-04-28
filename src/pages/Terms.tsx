import { Link } from "react-router-dom";

const OPERATOR = "Самозанятый Кругов М. Г., ИНН 772379179900";
const TODAY = "01 января 2024 г.";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]" style={{ fontFamily: "'Roboto', sans-serif" }}>

      {/* NAV */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link to="/">
            <img src="https://cdn.poehali.dev/projects/0a66a9c5-b11e-428a-881d-33e417292011/bucket/1006c4f4-b5c5-4745-9e72-9744a3cb9361.svg"
              alt="На Высоте — Кровельные и фасадные работы" className="h-12 w-auto" />
          </Link>
          <Link to="/" className="text-sm text-gray-500 hover:text-[#FF6A00] transition-colors">
            ← На главную
          </Link>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto px-5 py-12 md:py-16">

        <h1
          style={{ fontFamily: "'Oswald', sans-serif" }}
          className="text-3xl md:text-4xl font-bold uppercase text-gray-900 mb-2"
        >
          Правила использования сайта
        </h1>
        <p className="text-gray-400 text-sm mb-10">Последнее обновление: {TODAY}</p>

        <div className="space-y-8 text-gray-700 text-sm md:text-base leading-relaxed">

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              1. Общие положения
            </h2>
            <p>
              Настоящие Правила использования сайта (далее — «Правила») регулируют порядок использования
              интернет-сайта кровельной компании (далее — «Сайт»). Используя Сайт, вы принимаете настоящие
              Правила в полном объёме.
            </p>
            <p className="mt-3">
              Владелец и администратор Сайта: <strong>{OPERATOR}</strong>.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              2. Цены на услуги — не являются офертой
            </h2>
            <div className="bg-orange-50 border-l-4 border-[#FF6A00] p-5">
              <p className="font-semibold text-gray-900 mb-2">Важно:</p>
              <p>
                Все цены, указанные на Сайте (в том числе в разделах «Цены на работы» и «Калькулятор сметы»),
                носят <strong>исключительно информационный характер</strong> и <strong>не являются публичной офертой</strong> в
                соответствии со статьёй 437 Гражданского кодекса Российской Федерации.
              </p>
            </div>
            <p className="mt-4">
              Цены на сайте являются ориентировочными и могут зависеть от следующих факторов:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Площадь и сложность объекта</li>
              <li>Тип и стоимость выбранных материалов</li>
              <li>Удалённость объекта и транспортные расходы</li>
              <li>Объём подготовительных и сопутствующих работ</li>
              <li>Сезонность и сроки выполнения</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              3. Порядок определения окончательной стоимости
            </h2>
            <p>
              <strong>Конечная стоимость работ и материалов фиксируется исключительно в договоре</strong>,
              заключаемом между Клиентом и Исполнителем после проведения бесплатного выезда и замера объекта.
            </p>
            <p className="mt-3">
              До подписания договора никакие устные договорённости, переписка в мессенджерах или данные
              на Сайте не являются обязательными для Исполнителя и не порождают обязательств по определённой цене.
            </p>
            <p className="mt-3">
              После подписания договора <strong>стоимость работ является фиксированной</strong> и не может быть
              изменена в одностороннем порядке без письменного согласия обеих сторон.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              4. Бесплатные услуги
            </h2>
            <div className="bg-white border border-gray-200 p-5 space-y-3">
              {[
                { title: "Выезд замерщика", desc: "Выезд специалиста на объект для проведения замеров осуществляется бесплатно, без каких-либо условий и обязательств со стороны Клиента." },
                { title: "Консультация", desc: "Первичная консультация по телефону, в мессенджерах или при выезде на объект предоставляется бесплатно. Консультация не обязывает Клиента заключать договор." },
                { title: "Составление сметы", desc: "Расчёт предварительной сметы по результатам замера выполняется бесплатно и предоставляется Клиенту в течение 24 часов после выезда." },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-[#FF6A00] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title} — бесплатно</p>
                    <p className="text-gray-600 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              5. Использование форм обратной связи
            </h2>
            <p>
              Заполняя формы на Сайте, Пользователь подтверждает, что предоставляемые данные являются
              достоверными. Отправка формы является запросом на получение информации или услуги, но
              <strong> не является заключением договора</strong> и не обязывает ни одну из сторон к каким-либо
              действиям.
            </p>
            <p className="mt-3">
              Заявки, поданные через формы на Сайте, обрабатываются в рабочее время (8:00–20:00).
              Перезвон осуществляется в течение 15 минут с момента получения заявки в рабочие часы.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              6. Ограничение ответственности
            </h2>
            <p>
              Администратор Сайта не несёт ответственности за:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Ущерб, возникший в результате использования или невозможности использования Сайта</li>
              <li>Несоответствие ориентировочных цен на Сайте реальной стоимости услуг</li>
              <li>Временную недоступность Сайта по техническим причинам</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              7. Интеллектуальная собственность
            </h2>
            <p>
              Все материалы Сайта (тексты, изображения, дизайн) являются собственностью администратора.
              Копирование и использование без письменного разрешения запрещено.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              8. Изменения правил
            </h2>
            <p>
              Администратор оставляет за собой право вносить изменения в настоящие Правила. Актуальная
              версия всегда доступна на этой странице.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              9. Контакты
            </h2>
            <div className="bg-white border border-gray-200 p-5">
              <p><strong>Администратор сайта:</strong> {OPERATOR}</p>
              <p className="mt-1"><strong>Телефон:</strong> +7 (900) 123-45-67</p>
            </div>
            <p className="mt-4">
              Также ознакомьтесь с нашей{" "}
              <Link to="/privacy" className="text-[#FF6A00] underline underline-offset-2 hover:text-[#e05a00] transition-colors">
                Политикой конфиденциальности
              </Link>.
            </p>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6 mt-10">
        <div className="max-w-4xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/">
            <img src="https://cdn.poehali.dev/projects/0a66a9c5-b11e-428a-881d-33e417292011/bucket/1006c4f4-b5c5-4745-9e72-9744a3cb9361.svg"
              alt="На Высоте — Кровельные и фасадные работы" className="h-10 w-auto brightness-0 invert" />
          </Link>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-gray-500 text-xs">© 2024 {OPERATOR}.</p>
            <div className="flex items-center gap-3">
              <Link to="/privacy" className="text-gray-600 text-xs hover:text-[#FF6A00] transition-colors underline underline-offset-2">
                Политика конфиденциальности
              </Link>
              <span className="text-gray-700 text-xs">·</span>
              <Link to="/terms" className="text-gray-600 text-xs hover:text-[#FF6A00] transition-colors underline underline-offset-2">
                Правила использования
              </Link>
            </div>
          </div>
          <Link to="/" className="text-[#FF6A00] text-sm hover:text-[#e05a00] transition-colors">
            ← На главную
          </Link>
        </div>
      </footer>
    </div>
  );
}