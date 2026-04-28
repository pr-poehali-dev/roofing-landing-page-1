interface LogoProps {
  dark?: boolean;
  className?: string;
}

export default function Logo({ dark = false, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
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