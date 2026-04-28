interface LogoProps {
  dark?: boolean;
  className?: string;
}

export default function Logo({ dark = false, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <svg width="34" height="32" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 2L34 16H2L18 2Z" fill="#FF6A00" />
        <rect x="6" y="16" width="24" height="16" fill={dark ? "#e5e7eb" : "#2B2B2B"} />
        <rect x="14" y="22" width="8" height="10" fill="#FF6A00" />
        <rect x="25" y="9" width="4" height="7" fill={dark ? "#e5e7eb" : "#2B2B2B"} />
      </svg>
      <div className="leading-none">
        <div
          style={{ fontFamily: "'Oswald', sans-serif", color: dark ? "#ffffff" : "#2B2B2B" }}
          className="text-[18px] font-bold tracking-wider uppercase"
        >
          На <span style={{ color: "#FF6A00" }}>Высоте</span>
        </div>
        <div
          style={{ fontFamily: "'Roboto', sans-serif", color: dark ? "#9ca3af" : "#9ca3af" }}
          className="text-[9px] tracking-[0.15em] uppercase mt-0.5"
        >
          Кровельные и фасадные работы
        </div>
      </div>
    </div>
  );
}
