import { useEffect } from "react";

interface MetaOptions {
  title?: string;
  description?: string;
  keywords?: string;
  noindex?: boolean;
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

function removeMeta(name: string) {
  const el = document.querySelector(`meta[name="${name}"]`);
  if (el) el.remove();
}

export function useMeta({ title, description, keywords, noindex }: MetaOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;
    if (description) setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      removeMeta("robots");
    }
    return () => {
      document.title = prevTitle;
    };
  }, [title, description, keywords, noindex]);
}
