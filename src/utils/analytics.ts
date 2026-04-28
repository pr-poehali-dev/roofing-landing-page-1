declare global {
  interface Window {
    ym?: (id: number, action: string, goal?: string, params?: object) => void;
    dataLayer?: object[];
  }
}

const METRIKA_ID = 108907789;

function ym(goal: string, params?: object) {
  try {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(METRIKA_ID, "reachGoal", goal, params);
    }
  } catch (_) {
    // silent fail — метрика не должна ломать сайт
  }
}

// ─── Формы ────────────────────────────────────────────────────────────────────

/** Форма «Вызвать замерщика» в шапке главной страницы */
export const trackHeroFormSubmit = () => ym("hero_form_submit");

/** Форма «Получить консультацию» в секции контактов на главной */
export const trackConsultFormSubmit = () => ym("consult_form_submit");

/** Форма в модальном окне «Перезвоните мне» */
export const trackContactModalSubmit = (title: string) =>
  ym("contact_modal_submit", { title });

/** Финальный шаг квиза — отправка телефона */
export const trackQuizSubmit = (workType: string | null, material: string | null) =>
  ym("quiz_submit", { work_type: workType, material });

/** Форма на странице услуги */
export const trackServiceFormSubmit = (serviceName: string) =>
  ym("service_form_submit", { service: serviceName });

// ─── Модальные окна ───────────────────────────────────────────────────────────

export const trackContactModalOpen = (source: string) =>
  ym("contact_modal_open", { source });

export const trackContactModalClose = () => ym("contact_modal_close");

export const trackQuizModalOpen = () => ym("quiz_modal_open");

export const trackQuizModalClose = () => ym("quiz_modal_close");

// ─── Квиз — шаги ─────────────────────────────────────────────────────────────

export const trackQuizStep1 = (workType: string) =>
  ym("quiz_step1_work_type", { work_type: workType });

export const trackQuizStep2 = (material: string) =>
  ym("quiz_step2_material", { material });

// ─── Клики по телефону ────────────────────────────────────────────────────────

export const trackPhoneClick = (source: string) =>
  ym("phone_click", { source });

// ─── Клики по кнопкам CTA ─────────────────────────────────────────────────────

export const trackCtaClick = (label: string, source: string) =>
  ym("cta_click", { label, source });

// ─── Калькулятор ─────────────────────────────────────────────────────────────

export const trackCalculatorMaterialSelect = (material: string) =>
  ym("calculator_material_select", { material });

export const trackCalculatorSubmit = (material: string, area: number) =>
  ym("calculator_submit", { material, area });

// ─── Скролл до секций ─────────────────────────────────────────────────────────

export const trackSectionVisible = (section: string) =>
  ym("section_visible", { section });

// ─── Галерея портфолио ────────────────────────────────────────────────────────

export const trackPortfolioPhotoClick = () => ym("portfolio_photo_click");

// ─── Страницы услуг ───────────────────────────────────────────────────────────

export const trackServicePageView = (serviceName: string) =>
  ym("service_page_view", { service: serviceName });

export const trackFaqToggle = (question: string) =>
  ym("faq_toggle", { question });