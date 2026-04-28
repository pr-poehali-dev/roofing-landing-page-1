import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { PORTFOLIO_PROJECTS, PortfolioProject as Project } from "@/data/portfolio";

interface Props {
  onModal: (title: string) => void;
}

export default function PortfolioGallery({ onModal }: Props) {
  const projects = PORTFOLIO_PROJECTS;
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openProject = (p: Project) => {
    setActiveProject(p);
    document.body.style.overflow = "hidden";
  };

  const closeProject = () => {
    setActiveProject(null);
    setLightboxIdx(null);
    document.body.style.overflow = "";
  };

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);

  const lbPrev = useCallback(() => {
    if (lightboxIdx === null || !activeProject) return;
    setLightboxIdx((lightboxIdx - 1 + activeProject.photos.length) % activeProject.photos.length);
  }, [lightboxIdx, activeProject]);

  const lbNext = useCallback(() => {
    if (lightboxIdx === null || !activeProject) return;
    setLightboxIdx((lightboxIdx + 1) % activeProject.photos.length);
  }, [lightboxIdx, activeProject]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIdx !== null) closeLightbox();
        else closeProject();
      }
      if (lightboxIdx !== null) {
        if (e.key === "ArrowLeft") lbPrev();
        if (e.key === "ArrowRight") lbNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, lbPrev, lbNext]);

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-sm">Фотографии объектов скоро появятся</p>
        <button onClick={() => onModal("Хочу такой же результат")}
          style={{ fontFamily: "'Oswald',sans-serif" }}
          className="mt-6 border-2 border-[#FF6A00] text-[#FF6A00] font-semibold text-sm tracking-widest px-8 py-3 uppercase hover:bg-[#FF6A00] hover:text-white transition-colors">
          Хочу такой же результат
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Project cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map(p => (
          <button key={p.id} onClick={() => openProject(p)}
            className="group text-left focus:outline-none border border-gray-200 overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-64 overflow-hidden">
              <img src={p.cover} alt={p.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute top-3 right-3 bg-[#FF6A00] text-white text-xs font-bold px-2.5 py-1 tracking-widest"
                style={{ fontFamily: "'Oswald',sans-serif" }}>
                {p.photos.length} фото
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-[#FF6A00] px-5 py-2.5 flex items-center gap-2">
                  <Icon name="FolderOpen" size={16} className="text-white" />
                  <span style={{ fontFamily: "'Oswald',sans-serif" }}
                    className="text-white font-bold text-sm tracking-widest uppercase">Открыть проект</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 style={{ fontFamily: "'Oswald',sans-serif" }}
                className="font-bold uppercase tracking-wide text-gray-900 text-base leading-tight mb-1">
                {p.title}
              </h3>
              {p.description && (
                <p className="text-gray-500 text-sm line-clamp-2">{p.description}</p>
              )}
              {p.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.tags.map(tag => (
                    <span key={tag} className="bg-orange-50 text-[#FF6A00] text-xs px-2.5 py-0.5 font-medium border border-orange-100">
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
      {activeProject && lightboxIdx === null && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-6 px-4"
          onClick={closeProject}>
          <div className="relative w-full max-w-5xl bg-white shadow-2xl my-auto"
            onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="flex items-start justify-between p-5 md:p-7 border-b border-gray-100">
              <div>
                {activeProject.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {activeProject.tags.map(tag => (
                      <span key={tag} className="bg-orange-50 text-[#FF6A00] text-xs px-2.5 py-0.5 font-medium border border-orange-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 style={{ fontFamily: "'Oswald',sans-serif" }}
                  className="text-2xl md:text-3xl font-bold uppercase text-gray-900 leading-tight">
                  {activeProject.title}
                </h2>
                {activeProject.description && (
                  <p className="text-gray-500 mt-2 text-sm md:text-base">{activeProject.description}</p>
                )}
              </div>
              <button onClick={closeProject}
                className="ml-4 flex-shrink-0 w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors rounded-full">
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Main photo */}
            <div className="relative bg-gray-900 cursor-zoom-in" onClick={() => openLightbox(0)}>
              <img src={activeProject.photos[0].src} alt={activeProject.title}
                className="w-full h-72 md:h-[480px] object-cover hover:opacity-95 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="bg-black/40 rounded-full p-4">
                  <Icon name="ZoomIn" size={32} className="text-white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-[#FF6A00] text-white text-xs font-bold px-3 py-1 tracking-widest"
                style={{ fontFamily: "'Oswald',sans-serif" }}>
                1 / {activeProject.photos.length}
              </div>
            </div>

            {/* Photo grid */}
            <div className="p-5 md:p-7">
              <p style={{ fontFamily: "'Oswald',sans-serif" }}
                className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-3">
                Все фотографии — {activeProject.photos.length} шт.
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {activeProject.photos.map((ph, i) => (
                  <button key={i} onClick={() => openLightbox(i)}
                    className="group/ph relative overflow-hidden aspect-square border-2 border-transparent hover:border-[#FF6A00] transition-all focus:outline-none">
                    <img src={ph.src} alt=""
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/ph:scale-110" />
                    <div className="absolute inset-0 bg-black/0 group-hover/ph:bg-black/25 transition-colors flex items-center justify-center">
                      <Icon name="ZoomIn" size={18} className="text-white opacity-0 group-hover/ph:opacity-100 transition-opacity drop-shadow" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 md:px-7 py-5 border-t border-gray-100 bg-gray-50">
              <p className="text-gray-600 text-sm text-center sm:text-left">Хотите такой же результат для вашего объекта?</p>
              <button onClick={() => { closeProject(); onModal("Хочу такой же результат"); }}
                style={{ fontFamily: "'Oswald',sans-serif" }}
                className="flex-shrink-0 bg-[#FF6A00] text-white font-bold text-sm tracking-widest px-8 py-3 uppercase hover:bg-[#e05a00] transition-colors whitespace-nowrap">
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Fullscreen lightbox ── */}
      {activeProject && lightboxIdx !== null && (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col" onClick={closeLightbox}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 bg-black/80 flex-shrink-0 border-b border-white/10"
            onClick={e => e.stopPropagation()}>
            <button onClick={closeLightbox}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <Icon name="ChevronLeft" size={16} />
              <span style={{ fontFamily: "'Oswald',sans-serif" }} className="tracking-widest uppercase text-xs">К проекту</span>
            </button>
            <span style={{ fontFamily: "'Oswald',sans-serif" }} className="text-white/60 text-sm font-bold">
              {lightboxIdx + 1} / {activeProject.photos.length}
            </span>
            <button onClick={closeProject}
              className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors">
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Photo */}
          <div className="flex-1 flex items-center justify-center relative min-h-0 px-16"
            onClick={e => e.stopPropagation()}>
            <button onClick={lbPrev}
              className="absolute left-3 w-12 h-12 bg-white/10 hover:bg-[#FF6A00] text-white flex items-center justify-center transition-colors rounded-full">
              <Icon name="ChevronLeft" size={24} />
            </button>
            <img key={lightboxIdx}
              src={activeProject.photos[lightboxIdx].src}
              alt=""
              className="max-h-full max-w-full object-contain select-none"
              style={{ maxHeight: "calc(100vh - 148px)" }}
            />
            <button onClick={lbNext}
              className="absolute right-3 w-12 h-12 bg-white/10 hover:bg-[#FF6A00] text-white flex items-center justify-center transition-colors rounded-full">
              <Icon name="ChevronRight" size={24} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex-shrink-0 bg-black/80 border-t border-white/10 px-4 py-3 overflow-x-auto"
            onClick={e => e.stopPropagation()}>
            <div className="flex gap-2 w-max mx-auto">
              {activeProject.photos.map((ph, i) => (
                <button key={i} onClick={() => setLightboxIdx(i)}
                  className={`w-16 h-16 flex-shrink-0 overflow-hidden border-2 transition-all ${
                    i === lightboxIdx ? "border-[#FF6A00] opacity-100" : "border-transparent opacity-40 hover:opacity-80"
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
