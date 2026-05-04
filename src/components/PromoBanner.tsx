import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function PromoBanner() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="sticky top-[60px] inset-x-0 z-40 bg-[#FF6A00] text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 justify-center">
          <Icon name="Flame" size={15} className="text-white flex-shrink-0" />
          <p className="text-xs md:text-sm leading-tight text-center">
            <span style={{ fontFamily: "'Oswald',sans-serif" }} className="font-bold uppercase tracking-wide">
              Акция до 31 мая:&nbsp;
            </span>
            полный расчёт стоимости работ и материалов{" "}
            <span style={{ fontFamily: "'Oswald',sans-serif" }} className="font-bold">
              с выгодой до 20%
            </span>
          </p>
          <Icon name="Flame" size={15} className="text-white flex-shrink-0" />
        </div>
        <button
          onClick={() => setClosed(true)}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          aria-label="Закрыть"
        >
          <Icon name="X" size={14} />
        </button>
      </div>
    </div>
  );
}