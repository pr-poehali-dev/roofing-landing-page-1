const LEAD_URL = "https://functions.poehali.dev/3bd5d4fd-58f5-4fa6-81d5-1212212edc14";

interface LeadData {
  name?: string;
  phone: string;
  question?: string;
  source: string;
  work_type?: string;
  material?: string;
}

export async function sendLead(data: LeadData): Promise<void> {
  try {
    await fetch(LEAD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (_) {
    // не блокируем сабмит если сеть недоступна
  }
}
