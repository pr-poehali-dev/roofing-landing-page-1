import { Link } from "react-router-dom";
import { useMeta } from "@/utils/useMeta";

const OPERATOR = "Самозанятый Кругов М. Г., ИНН 772379179900";
const TODAY = "01 января 2024 г.";

export default function Privacy() {
  useMeta({ title: "Политика конфиденциальности — На Высоте", noindex: true });
  return (
    <div className="min-h-screen bg-[#f8f8f8]" style={{ fontFamily: "'Roboto', sans-serif" }}>

      {/* NAV */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link to="/">
            <img src="https://cdn.poehali.dev/projects/0a66a9c5-b11e-428a-881d-33e417292011/bucket/1006c4f4-b5c5-4745-9e72-9744a3cb9361.svg"
              alt="На Высоте — Кровельные и фасадные работы" className="h-12 w-auto" />
          </Link>
          <Link to="/"
            className="text-sm text-gray-500 hover:text-[#FF6A00] transition-colors flex items-center gap-1.5">
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
          Политика конфиденциальности
        </h1>
        <p className="text-gray-400 text-sm mb-10">Последнее обновление: {TODAY}</p>

        <div className="prose max-w-none text-gray-700 space-y-8 text-sm md:text-base leading-relaxed">

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              1. Общие положения
            </h2>
            <p>
              Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты
              персональных данных физических лиц (далее — «Пользователи»), передающих свои персональные данные
              через формы обратной связи на сайте.
            </p>
            <p className="mt-3">
              Оператором персональных данных является: <strong>{OPERATOR}</strong>.
            </p>
            <p className="mt-3">
              Использование сайта и заполнение форм означает безоговорочное согласие Пользователя с настоящей
              Политикой и указанными в ней условиями обработки его персональных данных.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              2. Оператор персональных данных
            </h2>
            <p>
              Обработку и хранение персональных данных, собранных через формы обратной связи сайта, осуществляет:
            </p>
            <div className="bg-white border border-gray-200 p-5 mt-3 rounded-sm">
              <p><strong>Оператор:</strong> {OPERATOR}</p>
              <p className="mt-1"><strong>ИНН:</strong> 772379179900</p>
              <p className="mt-1"><strong>Статус:</strong> Самозанятый (плательщик налога на профессиональный доход)</p>
            </div>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              3. Какие данные мы собираем
            </h2>
            <p>При заполнении форм на сайте Пользователь может передавать следующие персональные данные:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Имя (фамилия, имя)</li>
              <li>Номер телефона</li>
              <li>Адрес объекта или город</li>
              <li>Описание задачи (произвольный текст, указанный пользователем)</li>
            </ul>
            <p className="mt-3">
              Сайт также может автоматически собирать технические данные: IP-адрес, тип браузера, время посещения —
              исключительно в целях аналитики и улучшения работы сайта.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              4. Цели обработки персональных данных
            </h2>
            <p>Персональные данные обрабатываются исключительно в следующих целях:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Обратная связь с Пользователем по его запросу (звонок, сообщение)</li>
              <li>Расчёт стоимости и составление коммерческого предложения</li>
              <li>Согласование замера и даты проведения работ</li>
              <li>Исполнение договора на выполнение кровельных и смежных работ</li>
            </ul>
            <p className="mt-3">
              Персональные данные не используются в целях рекламы третьих лиц и не передаются третьим лицам без
              согласия Пользователя, за исключением случаев, предусмотренных законодательством РФ.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              5. Правовое основание обработки
            </h2>
            <p>
              Обработка персональных данных осуществляется на основании:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных»</li>
              <li>Согласия субъекта персональных данных, выраженного путём проставления отметки в соответствующей
                форме на сайте</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              6. Срок хранения данных
            </h2>
            <p>
              Персональные данные хранятся не дольше, чем это необходимо для достижения целей их обработки:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>До момента исполнения договора и гарантийных обязательств</li>
              <li>До отзыва согласия субъектом персональных данных</li>
              <li>Но не более 5 лет с момента последнего взаимодействия</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              7. Права субъекта персональных данных
            </h2>
            <p>Пользователь вправе:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Получить информацию об обрабатываемых персональных данных</li>
              <li>Потребовать уточнения, блокировки или уничтожения персональных данных</li>
              <li>Отозвать согласие на обработку персональных данных в любой момент</li>
              <li>Обжаловать действия или бездействие Оператора в уполномоченном органе</li>
            </ul>
            <p className="mt-3">
              Для реализации прав Пользователь может обратиться по телефону: <strong>+7 (900) 123-45-67</strong>
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              8. Защита персональных данных
            </h2>
            <p>
              Оператор принимает необходимые организационные и технические меры для защиты персональных данных от
              несанкционированного доступа, изменения, раскрытия или уничтожения. Передача данных осуществляется
              по защищённому протоколу HTTPS.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              9. Изменения политики
            </h2>
            <p>
              Оператор оставляет за собой право вносить изменения в настоящую Политику. Актуальная версия всегда
              доступна на этой странице. Продолжение использования сайта после публикации изменений означает
              согласие с новой редакцией.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase text-gray-900 mb-3">
              10. Контактная информация
            </h2>
            <p>По вопросам обработки персональных данных:</p>
            <div className="bg-white border border-gray-200 p-5 mt-3">
              <p><strong>Оператор:</strong> {OPERATOR}</p>
              <p className="mt-1"><strong>Телефон:</strong> +7 (900) 123-45-67</p>
            </div>
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
          <p className="text-gray-500 text-xs text-center">
            © 2024 {OPERATOR}. Все права защищены.
          </p>
          <Link to="/" className="text-[#FF6A00] text-sm hover:text-[#e05a00] transition-colors">
            ← На главную
          </Link>
        </div>
      </footer>
    </div>
  );
}