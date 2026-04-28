import { useState, useEffect, useCallback, useRef } from "react";
import Icon from "@/components/ui/icon";
import { PORTFOLIO_PROJECTS, PortfolioProject as Project } from "@/data/portfolio";

interface Props {
  onModal: (title: string) => void;
}

export default function PortfolioGallery({ onModal }: Props) {
  const projects = PORTFOLIO_PROJECTS;
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [zoomIdx, setZoomIdx] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleOpenProject = (p: Project) => {
    setOpenProject(p);
    setZoomIdx(null);
  };

  const handleCloseProject = () => {
    setOpenProject(null);
    setZoomIdx(null);
  };

  const zoomPrev = useCallback(() => {
    if (zoomIdx === null || !openProject) return;
    setZoomIdx((zoomIdx - 1 + openProject.photos.length) % openProject.photos.length);
  }, [zoomIdx, openProject]);

  const zoomNext = useCallback(() => {
    if (zoomIdx === null || !openProject) return;
    setZoomIdx((zoomIdx + 1) % openProject.photos.length);
  }, [zoomIdx, openProject]);

  // Закрытие по клику вне попапа (только десктоп)
  useEffect(() => {
    if (!openProject) return;
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        handleCloseProject();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openProject]);

  // Клавиатура
  useEffect(() => {
    if (!openProject) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseProject();
      if (zoomIdx !== null) {
        if (e.key === "ArrowLeft") zoomPrev();
        if (e.key === "ArrowRight") zoomNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openProject, zoomIdx, zoomPrev, zoomNext]);

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-sm mb-6">Фотографии объектов скоро появятся</p>
        <button onClick={() => onModal("Хочу такой же результат")}
          style={{ fontFamily: "'Oswald',sans-serif" }}
          className="border-2 border-[#FF6A00] text-[#FF6A00] font-semibold text-sm tracking-widest px-8 py-3 uppercase hover:bg-[#FF6A00] hover:text-white transition-colors">
          Хочу такой же результат
        </button>
      </div>
    );
  }

  /* ── Содержимое попапа (используется и в десктоп, и в bottom sheet) ── */
  const PopupContent = openProject ? (
    <>
      {/* Drag handle (только мобильный) */}
      <div className="md:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
        <div className="w-10 h-1 rounded-full bg-gray-300" />
      </div>

      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-100 flex items-start justify-between px-5 py-4">
        <div className="pr-4 min-w-0">
          {openProject.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {openProject.tags.map(tag => (
                <span key={tag} className="text-[11px] bg-orange-50 text-[#FF6A00] border border-orange-100 px-2 py-0.5 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h2 style={{ fontFamily: "'Oswald',sans-serif" }}
            className="text-lg md:text-xl font-bold uppercase text-gray-900 leading-tight">
            {openProject.title}
          </h2>
          {openProject.description && (
            <p className="text-gray-500 text-sm mt-0.5 line-clamp-2">{openProject.description}</p>
          )}
        </div>
        <button onClick={handleCloseProject}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors">
          <Icon name="X" size={18} />
        </button>
      </div>

      {/* Zoom view или сетка */}
      {zoomIdx !== null ? (
        /* ── Увеличенное фото внутри попапа ── */
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Back + counter */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-gray-50">
            <button onClick={() => setZoomIdx(null)}
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors text-sm">
              <Icon name="ArrowLeft" size={15} />
              <span style={{ fontFamily: "'Oswald',sans-serif" }} className="text-xs tracking-widest uppercase">К фото</span>
            </button>
            <span style={{ fontFamily: "'Oswald',sans-serif" }} className="text-gray-400 text-xs font-bold">
              {zoomIdx + 1} / {openProject.photos.length}
            </span>
            <div className="flex items-center gap-2">
              <button onClick={zoomPrev}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#FF6A00] hover:text-white transition-colors text-gray-600">
                <Icon name="ChevronLeft" size={16} />
              </button>
              <button onClick={zoomNext}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#FF6A00] hover:text-white transition-colors text-gray-600">
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>

          {/* Big photo */}
          <div className="flex-1 flex items-center justify-center bg-gray-900 min-h-0 cursor-pointer"
            onClick={() => setZoomIdx(null)}>
            <img
              key={zoomIdx}
              src={openProject.photos[zoomIdx].src}
              alt=""
              className="max-w-full max-h-full object-contain select-none"
              style={{ maxHeight: "100%" }}
              onClick={e => e.stopPropagation()}
            />
          </div>

          {/* Thumbnail strip */}
          <div className="flex-shrink-0 bg-gray-900 px-3 py-2 overflow-x-auto border-t border-white/10">
            <div className="flex gap-1.5 w-max">
              {openProject.photos.map((ph, i) => (
                <button key={i} onClick={() => setZoomIdx(i)}
                  className={`w-12 h-12 flex-shrink-0 overflow-hidden border-2 transition-all ${
                    i === zoomIdx ? "border-[#FF6A00] opacity-100" : "border-transparent opacity-40 hover:opacity-70"
                  }`}>
                  <img src={ph.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ── Сетка превью ── */
        <>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {openProject.photos.map((ph, i) => (
                <button key={i} onClick={() => setZoomIdx(i)}
                  className="group/ph relative overflow-hidden aspect-[4/3] focus:outline-none bg-gray-100">
                  <img src={ph.src} alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/ph:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover/ph:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover/ph:opacity-100 transition-opacity bg-black/30 rounded-full p-2">
                      <Icon name="ZoomIn" size={16} className="text-white" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 border-t border-gray-100 px-5 py-3 bg-gray-50 flex items-center justify-between gap-3">
            <span className="text-gray-400 text-xs flex items-center gap-1.5">
              <Icon name="Images" size={13} className="text-[#FF6A00]" />
              {openProject.photos.length} фото
            </span>
            <button onClick={() => { handleCloseProject(); onModal("Хочу такой же результат"); }}
              style={{ fontFamily: "'Oswald',sans-serif" }}
              className="bg-[#FF6A00] text-white font-bold text-xs tracking-widest px-5 py-2.5 uppercase hover:bg-[#e05a00] transition-colors whitespace-nowrap">
              Хочу так же
            </button>
          </div>
        </>
      )}
    </>
  ) : null;

  return (
    <>
      {/* ── Cards grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map(p => (
          <button key={p.id} onClick={() => handleOpenProject(p)}
            className="group text-left focus:outline-none overflow-hidden bg-white border border-gray-200 hover:border-[#FF6A00] hover:shadow-lg transition-all duration-300">
            <div className="relative h-56 overflow-hidden">
              <img src={p.cover} alt={p.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <span className="absolute top-3 right-3 bg-[#FF6A00] text-white text-[11px] font-bold px-2.5 py-1 tracking-widest"
                style={{ fontFamily: "'Oswald',sans-serif" }}>
                {p.photos.length} фото
              </span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 bg-[#FF6A00] px-5 py-2.5">
                  <Icon name="Eye" size={15} className="text-white" />
                  <span style={{ fontFamily: "'Oswald',sans-serif" }}
                    className="text-white text-sm font-bold tracking-widest uppercase">Смотреть</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 style={{ fontFamily: "'Oswald',sans-serif" }}
                className="text-gray-900 font-bold uppercase tracking-wide text-[15px] leading-snug mb-1">
                {p.title}
              </h3>
              {p.description && (
                <p className="text-gray-500 text-sm line-clamp-2">{p.description}</p>
              )}
              {p.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.tags.map(tag => (
                    <span key={tag} className="text-[11px] bg-orange-50 text-[#FF6A00] border border-orange-100 px-2 py-0.5 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button onClick={() => onModal("Хочу такой же результат")}
          style={{ fontFamily: "'Oswald',sans-serif" }}
          className="border-2 border-[#FF6A00] text-[#FF6A00] font-semibold text-sm tracking-widest px-8 py-3 uppercase hover:bg-[#FF6A00] hover:text-white transition-colors">
          Хочу такой же результат
        </button>
      </div>

      {/* ── Overlay backdrop (клик закрывает) ── */}
      {openProject && (
        <div className="fixed inset-0 z-40 bg-black/40 md:bg-black/30"
          onClick={handleCloseProject} />
      )}

      {/* ── Desktop: центрированный попап ── */}
      {openProject && (
        <div className="hidden md:flex fixed inset-0 z-50 items-center justify-center p-6 pointer-events-none">
          <div ref={popupRef}
            className="w-full bg-white shadow-2xl flex flex-col pointer-events-auto"
            style={{ maxWidth: 680, maxHeight: "88vh" }}
            onClick={e => e.stopPropagation()}>
            {PopupContent}
          </div>
        </div>
      )}

      {/* ── Mobile: Bottom Sheet ── */}
      {openProject && (
        <div className="md:hidden fixed inset-x-0 bottom-0 z-50 flex flex-col"
          style={{ maxHeight: "90vh" }}
          onClick={e => e.stopPropagation()}>
          <div className="bg-white flex flex-col rounded-t-2xl shadow-2xl overflow-hidden"
            style={{ maxHeight: "90vh" }}>
            {PopupContent}
          </div>
        </div>
      )}
    </>
  );
}
