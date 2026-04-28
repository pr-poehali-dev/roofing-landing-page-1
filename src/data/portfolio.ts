export interface PortfolioPhoto {
  src: string;
  caption?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  cover: string;
  photos: PortfolioPhoto[];
}

/**
 * Чтобы добавить новый проект в галерею:
 * 1. Загрузи фотографии в Хранилище
 * 2. Скопируй CDN-ссылки на каждое фото
 * 3. Добавь объект ниже по образцу
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "obj1",
    title: "Монтаж кровли",
    description: "Частный дом, выполнено качественно и в срок",
    tags: ["Кровля"],
    cover: "https://cdn.poehali.dev/projects/0a66a9c5-b11e-428a-881d-33e417292011/bucket/2d56fa10-a71a-48ab-9501-16855a57e794.jpg",
    photos: [
      {
        src: "https://cdn.poehali.dev/projects/0a66a9c5-b11e-428a-881d-33e417292011/bucket/2d56fa10-a71a-48ab-9501-16855a57e794.jpg",
        caption: "Готовый объект",
      },
    ],
  },
];