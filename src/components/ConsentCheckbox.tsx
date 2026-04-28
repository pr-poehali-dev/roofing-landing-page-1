import { Link } from "react-router-dom";

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}

export default function ConsentCheckbox({ checked, onChange }: ConsentCheckboxProps) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer group">
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          required
          className="sr-only"
        />
        <div
          onClick={() => onChange(!checked)}
          className={`w-4 h-4 border-2 flex items-center justify-center transition-colors ${
            checked ? "bg-[#FF6A00] border-[#FF6A00]" : "bg-white border-gray-300 group-hover:border-[#FF6A00]"
          }`}
        >
          {checked && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-xs text-gray-500 leading-relaxed">
        Я даю согласие на обработку персональных данных в соответствии с{" "}
        <Link
          to="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF6A00] underline underline-offset-2 hover:text-[#e05a00] transition-colors"
          onClick={e => e.stopPropagation()}
        >
          Политикой конфиденциальности
        </Link>
        . Оператор: самозанятый Кругов М. Г., ИНН 772379179900.
      </span>
    </label>
  );
}
