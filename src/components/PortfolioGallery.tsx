import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { PORTFOLIO_PROJECTS, PortfolioProject as Project } from "@/data/portfolio";

interface Props {
  onModal: (title: string) => void;
}

export default function PortfolioGallery({ onModal }: Props) {
  const projects = PORTFOLIO_PROJECTS;
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [zoomIdx, setZoomIdx] = useState<number | null>(null);

  const handleOpenProject = (p: Project) => {
    setOpenProject(p);
    document.body.style.overflow = "hidden";
  };

  const handleCloseProject = () => {
    setOpenProject(null);
    setZoomIdx(null);
    document.body.style.overflow = "";
  };

  const handleZoom = (idx: number) => setZoomIdx(idx);
  const handleCloseZoom = () => setZoomIdx(null);

  const zoomPrev = useCallback(() => {
    if (zoomIdx === null || !openProject) return;
    setZoomIdx((zoomIdx - 1 + openProject.photos.length) % openProject.photos.length);
  }, [zoomIdx, openProject]);

  const zoomNext = useCallback(() => {
    if (zoomIdx === null || !openProject) return;
    setZoomIdx((zoomIdx + 1) % openProject.photos.length);
  }, [zoomIdx, openProject]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomIdx !== null) handleCloseZoom();
        else handleCloseProject();
      }
      if (zoomIdx !== null) {
        if (e.key === "ArrowLeft") zoomPrev();
        if (e.key === "ArrowRight") zoomNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [zoomIdx, zoomPrev, zoomNext]);

  // ── Empty state ──
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

  return (
    <>
      {/* ── Cards grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map(p => (
          <button key={p.id} onClick={() => handleOpenProject(p)}
            className="group text-left focus:outline-none overflow-hidden bg-white border border-gray-200 hover:border-[#FF6A00] hover:shadow-lg transition-all duration-300">
            {/* Cover */}
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
            {/* Info */}
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

      {/* ── Project Pop-Up ── */}
      {openProject && zoomIdx === null && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={handleCloseProject}>
          <div className="relative w-full max-w-4xl bg-white shadow-2xl flex flex-col"
            style={{ maxHeight: "90vh" }}
            onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="flex-shrink-0 bg-white border-b border-gray-100 flex items-start justify-between px-6 py-5">
              <div className="pr-4">
                {openProject.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {openProject.tags.map(tag => (
                      <span key={tag} className="text-[11px] bg-orange-50 text-[#FF6A00] border border-orange-100 px-2.5 py-0.5 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 style={{ fontFamily: "'Oswald',sans-serif" }}
                  className="text-xl md:text-2xl font-bold uppercase text-gray-900 leading-tight">
                  {openProject.title}
                </h2>
                {openProject.description && (
                  <p className="text-gray-500 text-sm mt-1">{openProject.description}</p>
                )}
              </div>
              <button onClick={handleCloseProject}
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Photo grid */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {openProject.photos.map((ph, i) => (
                  <button key={i} onClick={() => handleZoom(i)}
                    className="group/ph relative overflow-hidden aspect-[4/3] focus:outline-none bg-gray-100">
                    <img src={ph.src} alt=""
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/ph:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover/ph:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover/ph:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full p-2.5">
                        <Icon name="ZoomIn" size={20} className="text-white" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-5 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Icon name="Images" size={15} className="text-[#FF6A00]" />
                <span>{openProject.photos.length} фотографий в проекте</span>
              </div>
              <button onClick={() => { handleCloseProject(); onModal("Хочу такой же результат"); }}
                style={{ fontFamily: "'Oswald',sans-serif" }}
                className="bg-[#FF6A00] text-white font-bold text-sm tracking-widest px-7 py-3 uppercase hover:bg-[#e05a00] transition-colors whitespace-nowrap">
                Хочу так же
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Zoom / Lightbox ── */}
      {openProject && zoomIdx !== null && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col"
          onClick={handleCloseZoom}>

          {/* Top bar */}
          <div className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b border-white/10"
            onClick={e => e.stopPropagation()}>
            <button onClick={handleCloseZoom}
              className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Oswald',sans-serif" }}>
              <Icon name="ArrowLeft" size={15} />
              Назад
            </button>
            <span className="text-white/50 text-sm font-bold"
              style={{ fontFamily: "'Oswald',sans-serif" }}>
              {zoomIdx + 1} / {openProject.photos.length}
            </span>
            <button onClick={handleCloseProject}
              className="text-white/50 hover:text-white transition-colors">
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Main image — tap anywhere to close */}
          <div className="flex-1 flex items-center justify-center relative min-h-0">
            {/* Prev */}
            <button onClick={e => { e.stopPropagation(); zoomPrev(); }}
              className="absolute left-3 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-[#FF6A00] text-white flex items-center justify-center transition-colors">
              <Icon name="ChevronLeft" size={22} />
            </button>

            {/* Image — click closes */}
            <img
              key={zoomIdx}
              src={openProject.photos[zoomIdx].src}
              alt=""
              className="max-h-full max-w-full object-contain select-none cursor-zoom-out px-16"
              style={{ maxHeight: "calc(100vh - 140px)" }}
              onClick={handleCloseZoom}
            />

            {/* Next */}
            <button onClick={e => { e.stopPropagation(); zoomNext(); }}
              className="absolute right-3 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-[#FF6A00] text-white flex items-center justify-center transition-colors">
              <Icon name="ChevronRight" size={22} />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="flex-shrink-0 border-t border-white/10 px-4 py-3 overflow-x-auto bg-black/60"
            onClick={e => e.stopPropagation()}>
            <div className="flex gap-2 w-max mx-auto">
              {openProject.photos.map((ph, i) => (
                <button key={i} onClick={() => setZoomIdx(i)}
                  className={`w-14 h-14 flex-shrink-0 overflow-hidden transition-all border-2 ${
                    i === zoomIdx
                      ? "border-[#FF6A00] opacity-100 scale-105"
                      : "border-transparent opacity-40 hover:opacity-70"
                  }`}>
                  <img src={ph.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}