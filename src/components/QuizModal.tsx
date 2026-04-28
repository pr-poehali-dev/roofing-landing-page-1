/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Icon from "@/components/ui/icon";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import { formatPhone } from "@/utils/phoneFormat";
import { trackQuizModalClose, trackQuizStep1, trackQuizStep2, trackQuizSubmit } from "@/utils/analytics";

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
}

const WORK_TYPES = [
  { id: "new", icon: "Home", label: "Монтаж новой кровли" },
  { id: "repair", icon: "Wrench", label: "Ремонт / реставрация" },
  { id: "mansard", icon: "Building2", label: "Мансарда или чердак" },
  { id: "insulation", icon: "Thermometer", label: "Утепление" },
  { id: "facade", icon: "Layers", label: "Фасадные работы" },
  { id: "house", icon: "Trees", label: "Дом, баня, беседка" },
  { id: "condensate", icon: "Droplets", label: "Конденсат / сырость" },
];

const MATERIALS: Record<string, { id: string; icon: string; label: string; price: string }[]> = {
  new: [
    { id: "metal", icon: "Grid3x3", label: "Металлочерепица", price: "от 900 ₽/м²" },
    { id: "profnastil", icon: "AlignJustify", label: "Профнастил", price: "от 700 ₽/м²" },
    { id: "flex", icon: "Layers", label: "Гибкая черепица", price: "от 1000 ₽/м²" },
    { id: "natural", icon: "Building2", label: "Натуральная черепица", price: "от 1500 ₽/м²" },
    { id: "composite", icon: "Grid2x2", label: "Композитная черепица", price: "от 1000 ₽/м²" },
    { id: "ondulin", icon: "Waves", label: "Ондулин", price: "от 800 ₽/м²" },
    { id: "roll", icon: "ScrollText", label: "Рулонная кровля", price: "от 300 ₽/м²" },
  ],
  repair: [
    { id: "metal", icon: "Grid3x3", label: "Металлочерепица", price: "от 350 ₽/м²" },
    { id: "profnastil", icon: "AlignJustify", label: "Профнастил", price: "от 350 ₽/м²" },
    { id: "flex", icon: "Layers", label: "Гибкая черепица", price: "от 400 ₽/м²" },
    { id: "roll", icon: "ScrollText", label: "Рулонная кровля", price: "от 300 ₽/м²" },
    { id: "notsure", icon: "HelpCircle", label: "Не знаю, нужна оценка", price: "бесплатно" },
  ],
  mansard: [
    { id: "metal", icon: "Grid3x3", label: "Металлочерепица", price: "от 900 ₽/м²" },
    { id: "flex", icon: "Layers", label: "Гибкая черепица", price: "от 1000 ₽/м²" },
    { id: "notsure", icon: "HelpCircle", label: "Помогите выбрать", price: "бесплатно" },
  ],
  insulation: [
    { id: "wool", icon: "Package", label: "Минеральная вата", price: "от 350 ₽/м²" },
    { id: "foam", icon: "Square", label: "Пенополистирол", price: "от 300 ₽/м²" },
    { id: "notsure", icon: "HelpCircle", label: "Подберите сами", price: "бесплатно" },
  ],
  facade: [
    { id: "vinyl", icon: "Layers", label: "Виниловый сайдинг", price: "от 400 ₽/м²" },
    { id: "metal_s", icon: "AlignJustify", label: "Металлический сайдинг", price: "от 500 ₽/м²" },
    { id: "water", icon: "Droplets", label: "Водоотливная система", price: "по смете" },
    { id: "notsure", icon: "HelpCircle", label: "Подберите сами", price: "бесплатно" },
  ],
  house: [
    { id: "frame", icon: "Home", label: "Каркасный дом", price: "по смете" },
    { id: "timber", icon: "Trees", label: "Брусовый дом", price: "по смете" },
    { id: "bath", icon: "Flame", label: "Баня", price: "по смете" },
    { id: "gazebo", icon: "Umbrella", label: "Беседка", price: "по смете" },
  ],
  condensate: [
    { id: "diag", icon: "Search", label: "Диагностика + устранение", price: "по смете" },
    { id: "ventilation", icon: "Wind", label: "Наладить вентиляцию", price: "по смете" },
    { id: "notsure", icon: "HelpCircle", label: "Не знаю причину", price: "бесплатно" },
  ],
};

export default function QuizModal({ open, onClose }: QuizModalProps) {
  const [step, setStep] = useState(1);
  const [workType, setWorkType] = useState<string | null>(null);
  const [material, setMaterial] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [consentData, setConsentData] = useState(false);
  const [consentPolicy, setConsentPolicy] = useState(false);
  const [sent, setSent] = useState(false);

  const allConsented = consentData && consentPolicy;

  const handleClose = () => {
    trackQuizModalClose();
    onClose();
    setTimeout(() => {
      setStep(1);
      setWorkType(null);
      setMaterial(null);
      setPhone("");
      setConsentData(false);
      setConsentPolicy(false);
      setSent(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allConsented) return;
    trackQuizSubmit(workType, material);
    setSent(true);
  };

  if (!open) return null;

  const currentMaterials = workType ? (MATERIALS[workType] ?? MATERIALS["new"]) : [];
  const selectedWork = WORK_TYPES.find(w => w.id === workType);
  const selectedMat = currentMaterials.find(m => m.id === material);

  const progressWidth = step === 1 ? "33%" : step === 2 ? "66%" : "100%";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="bg-white w-full max-w-lg shadow-2xl animate-fade-in-up relative flex flex-col"
        style={{ animationDuration: "0.25s", maxHeight: "95vh" }}>

        {/* Header */}
        <div className="px-4 md:px-7 pt-5 pb-0 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p style={{ fontFamily: "'Oswald',sans-serif" }}
                className="text-[10px] tracking-[0.3em] text-[#FF6A00] uppercase font-semibold mb-0.5">
                Шаг {sent ? 3 : step} из 3
              </p>
              <h2 style={{ fontFamily: "'Oswald',sans-serif" }}
                className="text-xl font-bold uppercase text-gray-900 leading-tight">
                {sent
                  ? "Заявка отправлена!"
                  : step === 1
                  ? "Выберите тип работ"
                  : step === 2
                  ? "Выберите материал"
                  : "Оставьте номер телефона"}
              </h2>
            </div>
            <button onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0 ml-4">
              <Icon name="X" size={18} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-gray-100 mb-5">
            <div
              className="h-full bg-[#FF6A00] transition-all duration-500"
              style={{ width: sent ? "100%" : progressWidth }}
            />
          </div>
        </div>

        {/* Body — scrollable */}
        <div className="px-4 md:px-7 pb-5 md:pb-7 overflow-y-auto flex-1">

          {/* STEP 1 */}
          {step === 1 && !sent && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {WORK_TYPES.map(w => (
                <button key={w.id}
                  onClick={() => { setWorkType(w.id); setMaterial(null); setStep(2); trackQuizStep1(w.label); }}
                  className={`flex items-center gap-3 p-3 md:p-4 border-2 text-left transition-all hover:border-[#FF6A00] hover:bg-orange-50 group ${
                    workType === w.id ? "border-[#FF6A00] bg-orange-50" : "border-gray-200 bg-white"
                  }`}>
                  <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 transition-colors ${
                    workType === w.id ? "bg-[#FF6A00]" : "bg-gray-100 group-hover:bg-[#FF6A00]"
                  }`}>
                    <Icon name={w.icon as any} size={15}
                      className={workType === w.id ? "text-white" : "text-gray-500 group-hover:text-white"} />
                  </div>
                  <span style={{ fontFamily: "'Oswald',sans-serif" }}
                    className="text-sm font-semibold uppercase tracking-wide text-gray-900 leading-tight">
                    {w.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && !sent && (
            <div>
              {selectedWork && (
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                  <Icon name="Check" size={13} className="text-[#FF6A00]" />
                  <span>Тип работ: <strong className="text-gray-900">{selectedWork.label}</strong></span>
                </div>
              )}
              <div className="grid grid-cols-1 gap-2.5">
                {currentMaterials.map(m => (
                  <button key={m.id}
                    onClick={() => { setMaterial(m.id); setStep(3); trackQuizStep2(m.label); }}
                    className={`flex items-center justify-between gap-3 p-4 border-2 text-left transition-all hover:border-[#FF6A00] hover:bg-orange-50 group ${
                      material === m.id ? "border-[#FF6A00] bg-orange-50" : "border-gray-200 bg-white"
                    }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors ${
                        material === m.id ? "bg-[#FF6A00]" : "bg-gray-100 group-hover:bg-[#FF6A00]"
                      }`}>
                        <Icon name={m.icon as any} size={16}
                          className={material === m.id ? "text-white" : "text-gray-500 group-hover:text-white"} />
                      </div>
                      <span style={{ fontFamily: "'Oswald',sans-serif" }}
                        className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                        {m.label}
                      </span>
                    </div>
                    <span className="text-[#FF6A00] font-bold text-sm flex-shrink-0"
                      style={{ fontFamily: "'Oswald',sans-serif" }}>
                      {m.price}
                    </span>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)}
                className="mt-4 flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-sm transition-colors">
                <Icon name="ArrowLeft" size={13} />
                Назад
              </button>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && !sent && (
            <form onSubmit={handleSubmit}>
              {/* Summary */}
              <div className="bg-orange-50 border border-[#FF6A00]/20 p-4 mb-5 space-y-2">
                {selectedWork && (
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Check" size={13} className="text-[#FF6A00]" />
                    <span className="text-gray-600">Тип работ: <strong className="text-gray-900">{selectedWork.label}</strong></span>
                  </div>
                )}
                {selectedMat && (
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Check" size={13} className="text-[#FF6A00]" />
                    <span className="text-gray-600">Материал: <strong className="text-gray-900">{selectedMat.label}</strong>
                      {" "}<span className="text-[#FF6A00] font-semibold">{selectedMat.price}</span>
                    </span>
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Специалисты уже получили ваш запрос и готовы перезвонить для бесплатной консультации. Оставьте номер телефона — перезвоним в течение 15 минут.
              </p>

              <div className="mb-4">
                <label style={{ fontFamily: "'Oswald',sans-serif" }}
                  className="text-[10px] tracking-widest text-gray-400 uppercase block mb-1.5">
                  Номер телефона
                </label>
                <input type="tel" placeholder="+7 (___) ___-__-__"
                  value={phone} onChange={e => setPhone(formatPhone(e.target.value))} required
                  autoFocus
                  className="w-full border-2 border-gray-300 bg-gray-50 px-4 py-3.5 text-base focus:outline-none focus:border-[#FF6A00] transition-colors" />
              </div>

              <div className="mb-4">
                <ConsentCheckbox
                  consentData={consentData} onConsentData={setConsentData}
                  consentPolicy={consentPolicy} onConsentPolicy={setConsentPolicy}
                />
              </div>

              <button type="submit" disabled={!allConsented}
                style={{ fontFamily: "'Oswald',sans-serif" }}
                className={`w-full font-bold text-sm tracking-widest py-4 uppercase transition-colors ${
                  allConsented
                    ? "bg-[#FF6A00] text-white hover:bg-[#e05a00]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}>
                Перезвоните мне бесплатно
              </button>

              <button type="button" onClick={() => setStep(2)}
                className="mt-3 flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-sm transition-colors">
                <Icon name="ArrowLeft" size={13} />
                Назад
              </button>
            </form>
          )}

          {/* SENT */}
          {sent && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-[#FF6A00] flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCheck" size={30} className="text-white" />
              </div>
              <p className="text-gray-700 leading-relaxed mb-2">
                Наш специалист перезвонит вам в течение <strong>15 минут</strong>.
              </p>
              {selectedWork && selectedMat && (
                <p className="text-gray-500 text-sm mb-6">
                  Подготовим расчёт по запросу: <strong>{selectedWork.label}</strong>, {selectedMat.label}.
                </p>
              )}
              <button onClick={handleClose}
                style={{ fontFamily: "'Oswald',sans-serif" }}
                className="bg-gray-900 text-white font-bold text-sm tracking-widest px-8 py-3 uppercase hover:bg-black transition-colors w-full">
                Закрыть
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}