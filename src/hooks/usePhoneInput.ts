import { useState, useCallback } from "react";

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  const d = digits.startsWith("8") ? "7" + digits.slice(1) : digits.startsWith("7") ? digits : digits ? "7" + digits : "";
  const n = d.slice(0, 11);

  if (n.length === 0) return "";
  if (n.length <= 1) return "+7";
  if (n.length <= 4) return `+7 (${n.slice(1)}`;
  if (n.length <= 7) return `+7 (${n.slice(1, 4)}) ${n.slice(4)}`;
  if (n.length <= 9) return `+7 (${n.slice(1, 4)}) ${n.slice(4, 7)}-${n.slice(7)}`;
  return `+7 (${n.slice(1, 4)}) ${n.slice(4, 7)}-${n.slice(7, 9)}-${n.slice(9, 11)}`;
}

export function usePhoneInput(initial = "") {
  const [value, setValue] = useState(formatPhone(initial));

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(formatPhone(e.target.value));
  }, []);

  const reset = useCallback(() => setValue(""), []);

  const isValid = value.replace(/\D/g, "").length === 11;

  return { value, onChange, reset, isValid };
}
