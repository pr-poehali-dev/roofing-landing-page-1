import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PORTFOLIO_PROJECTS, PortfolioProject as Project } from "@/data/portfolio";

interface Props {
  onModal: (title: string) => void;
}

export default function PortfolioGallery({ onModal }: Props) {
  const projects = PORTFOLIO_PROJECTS;
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const openProject = (p: Project) => {
    setActiveProject(p);
    setActivePhotoIdx(0);
  };

  const closeProject = () => setActiveProject(null);

  const prev = () => setActivePhotoIdx(i => (i - 1 + activeProject!.photos.length) % activeProject!.photos.length);
  const next = () => setActivePhotoIdx(i => (i + 1) % activeProject!.photos.length);

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-sm">Фотографии объектов скоро появятся</p>
        <button
          onClick={() => onModal("Хочу такой же результат")}
          style={{ fontFamily: "'Oswald',sans-serif" }}
          className="mt-6 border-2 border-[#FF6A00] text-[#FF6A00] font-semibold text-sm tracking-widest px-8 py-3 uppercase hover:bg-[#FF6A00] hover:text-white transition-colors"
        >
          Хочу такой же результат
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(p => (
          <button
            key={p.id}
            onClick={() => openProject(p)}
            className="group relative overflow-hidden border border-gray-200 text-left focus:outline-none"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={p.cover}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 bg-[#FF6A00] text-white text-xs font-bold px-2 py-1 tracking-widest"
                style={{ fontFamily: "'Oswald',sans-serif" }}>
                {p.photos.length} фото
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 style={{ fontFamily: "'Oswald',sans-serif" }}
                  className="text-white font-bold uppercase tracking-wide text-base leading-tight">
                  {p.title}
                </h3>
                {p.description && (
                  <p className="text-white/70 text-xs mt-1 line-clamp-2">{p.description}</p>
                )}
                {p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.tags.map(tag => (
                      <span key={tag} className="bg-white/15 text-white text-[10px] px-2 py-0.5 tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF6A00] transition-colors pointer-events-none" />
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => onModal("Хочу такой же результат")}
          style={{ fontFamily: "'Oswald',sans-serif" }}
          className="border-2 border-[#FF6A00] text-[#FF6A00] font-semibold text-sm tracking-widest px-8 py-3 uppercase hover:bg-[#FF6A00] hover:text-white transition-colors"
        >
          Хочу такой же результат
        </button>
      </div>

      {/* Lightbox */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col"
          onClick={closeProject}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-900 flex-shrink-0" onClick={e => e.stopPropagation()}>
            <div>
              <h3 style={{ fontFamily: "'Oswald',sans-serif" }}
                className="text-white font-bold uppercase tracking-wide text-lg">
                {activeProject.title}
              </h3>
              {activeProject.description && (
                <p className="text-white/60 text-xs mt-0.5">{activeProject.description}</p>
              )}
            </div>
            <button onClick={closeProject} className="text-white/60 hover:text-white transition-colors p-2">
              <Icon name="X" size={22} />
            </button>
          </div>

          {/* Main photo */}
          <div className="flex-1 flex items-center justify-center relative min-h-0 px-2 py-2" onClick={e => e.stopPropagation()}>
            <button onClick={prev}
              className="absolute left-2 z-10 w-10 h-10 bg-black/50 hover:bg-[#FF6A00] text-white flex items-center justify-center transition-colors">
              <Icon name="ChevronLeft" size={20} />
            </button>
            <img
              src={activeProject.photos[activePhotoIdx].src}
              alt={activeProject.photos[activePhotoIdx].caption}
              className="max-h-full max-w-full object-contain"
            />
            <button onClick={next}
              className="absolute right-2 z-10 w-10 h-10 bg-black/50 hover:bg-[#FF6A00] text-white flex items-center justify-center transition-colors">
              <Icon name="ChevronRight" size={20} />
            </button>

            {/* Caption + counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <span className="bg-[#FF6A00] text-white text-xs font-bold px-3 py-1 tracking-widest"
                style={{ fontFamily: "'Oswald',sans-serif" }}>
                {activePhotoIdx + 1} / {activeProject.photos.length}
              </span>
              {activeProject.photos[activePhotoIdx].caption && (
                <p className="text-white/70 text-xs mt-1">{activeProject.photos[activePhotoIdx].caption}</p>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex-shrink-0 bg-gray-900 px-4 py-3 overflow-x-auto" onClick={e => e.stopPropagation()}>
            <div className="flex gap-2 w-max mx-auto">
              {activeProject.photos.map((ph, i) => (
                <button key={i} onClick={() => setActivePhotoIdx(i)}
                  className={`w-14 h-14 flex-shrink-0 overflow-hidden border-2 transition-all ${i === activePhotoIdx ? "border-[#FF6A00]" : "border-transparent opacity-60 hover:opacity-100"}`}>
                  <img src={ph.src} alt={ph.caption} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}