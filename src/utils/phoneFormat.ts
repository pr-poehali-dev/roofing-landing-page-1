export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  let d = digits;
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (d.startsWith("7")) d = d.slice(1);
  const n = d.slice(0, 10);
  let result = "+7";
  if (n.length > 0) result += " (" + n.slice(0, 3);
  if (n.length >= 4) result += ") " + n.slice(3, 6);
  if (n.length >= 7) result += "-" + n.slice(6, 8);
  if (n.length >= 9) result += "-" + n.slice(8, 10);
  return result;
}

export function isPhoneComplete(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 11;
}
