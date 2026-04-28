import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { PORTFOLIO_PROJECTS, PortfolioProject as Project } from "@/data/portfolio";

interface Props {
  onModal: (title: string) => void;
}

export default function PortfolioGallery({ onModal }: Props) {
  const projects = PORTFOLIO_PROJECTS;
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const openProject = (p: Project, idx = 0) => {
    setActiveProject(p);
    setActivePhotoIdx(idx);
    document.body.style.overflow = "hidden";
  };

  const closeProject = () => {
    setActiveProject(null);
    document.body.style.overflow = "";
  };

  const prev = useCallback(() =>
    setActivePhotoIdx(i => (i - 1 + activeProject!.photos.length) % activeProject!.photos.length),
    [activeProject]);

  const next = useCallback(() =>
    setActivePhotoIdx(i => (i + 1) % activeProject!.photos.length),
    [activeProject]);

  useEffect(() => {
    if (!activeProject) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeProject, prev, next]);

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
      {/* Project cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map(p => (
          <div key={p.id} className="group border border-gray-200 overflow-hidden bg-white">
            {/* Cover — крупное превью */}
            <button onClick={() => openProject(p, 0)} className="block w-full focus:outline-none">
              <div className="relative h-72 md:h-80 overflow-hidden">
                <img src={p.cover} alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-[#FF6A00] text-white text-xs font-bold px-2.5 py-1 tracking-widest"
                  style={{ fontFamily: "'Oswald',sans-serif" }}>
                  {p.photos.length} фото
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/50 rounded-full p-4">
                    <Icon name="ZoomIn" size={28} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 style={{ fontFamily: "'Oswald',sans-serif" }}
                    className="text-white font-bold uppercase tracking-wide text-lg leading-tight">
                    {p.title}
                  </h3>
                  {p.description && (
                    <p className="text-white/75 text-sm mt-1">{p.description}</p>
                  )}
                  {p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.tags.map(tag => (
                        <span key={tag} className="bg-white/20 text-white text-xs px-2.5 py-0.5 tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </button>

            {/* Thumbnail strip */}
            {p.photos.length > 1 && (
              <div className="grid grid-cols-5 gap-1 p-1 bg-gray-100">
                {p.photos.slice(0, 5).map((ph, i) => (
                  <button key={i} onClick={() => openProject(p, i)}
                    className="relative overflow-hidden h-20 focus:outline-none group/thumb">
                    <img src={ph.src} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-110" />
                    {i === 4 && p.photos.length > 5 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span style={{ fontFamily: "'Oswald',sans-serif" }}
                          className="text-white font-bold text-lg">+{p.photos.length - 5}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button onClick={() => onModal("Хочу такой же результат")}
          style={{ fontFamily: "'Oswald',sans-serif" }}
          className="border-2 border-[#FF6A00] text-[#FF6A00] font-semibold text-sm tracking-widest px-8 py-3 uppercase hover:bg-[#FF6A00] hover:text-white transition-colors">
          Хочу такой же результат
        </button>
      </div>

      {/* Fullscreen lightbox */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col" onClick={closeProject}>

          {/* Header */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-black/80 backdrop-blur-sm flex-shrink-0 border-b border-white/10"
            onClick={e => e.stopPropagation()}>
            <div>
              <h3 style={{ fontFamily: "'Oswald',sans-serif" }}
                className="text-white font-bold uppercase tracking-wide text-base md:text-lg">
                {activeProject.title}
              </h3>
              {activeProject.description && (
                <p className="text-white/50 text-xs mt-0.5 hidden md:block">{activeProject.description}</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span style={{ fontFamily: "'Oswald',sans-serif" }}
                className="text-white/60 text-sm font-bold">
                {activePhotoIdx + 1} / {activeProject.photos.length}
              </span>
              <button onClick={closeProject}
                className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors rounded-full">
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Main photo — на весь экран */}
          <div className="flex-1 flex items-center justify-center relative min-h-0"
            onClick={e => e.stopPropagation()}>
            <button onClick={prev}
              className="absolute left-3 md:left-6 z-10 w-12 h-12 bg-black/50 hover:bg-[#FF6A00] text-white flex items-center justify-center transition-colors rounded-full backdrop-blur-sm">
              <Icon name="ChevronLeft" size={24} />
            </button>

            <img
              key={activePhotoIdx}
              src={activeProject.photos[activePhotoIdx].src}
              alt=""
              className="max-h-full max-w-full object-contain select-none"
              style={{ maxHeight: "calc(100vh - 160px)" }}
            />

            <button onClick={next}
              className="absolute right-3 md:right-6 z-10 w-12 h-12 bg-black/50 hover:bg-[#FF6A00] text-white flex items-center justify-center transition-colors rounded-full backdrop-blur-sm">
              <Icon name="ChevronRight" size={24} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex-shrink-0 bg-black/80 border-t border-white/10 px-4 py-3 overflow-x-auto"
            onClick={e => e.stopPropagation()}>
            <div className="flex gap-2 w-max mx-auto">
              {activeProject.photos.map((ph, i) => (
                <button key={i} onClick={() => setActivePhotoIdx(i)}
                  className={`w-16 h-16 flex-shrink-0 overflow-hidden border-2 transition-all ${
                    i === activePhotoIdx ? "border-[#FF6A00] opacity-100" : "border-transparent opacity-40 hover:opacity-80"
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
