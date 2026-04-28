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
const CDN = "https://cdn.poehali.dev/projects/0a66a9c5-b11e-428a-881d-33e417292011/bucket";

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "obj1",
    title: "Строительство 10 крыш в коттеджном поселке",
    description: "Построили новые крыши для 10 домов в коттеджном поселке",
    tags: ["Строительство", "Монтаж новой кровли", "Частный дом"],
    cover: `${CDN}/2d56fa10-a71a-48ab-9501-16855a57e794.jpg`,
    photos: [
      { src: `${CDN}/2d56fa10-a71a-48ab-9501-16855a57e794.jpg` },
      { src: `${CDN}/c0417a7b-efed-49df-ae9a-5df7040c830a.jpg` },
      { src: `${CDN}/abd24fd0-4fa1-44af-8a86-c1c4c6dc406f.jpg` },
      { src: `${CDN}/148d5160-a555-4c1a-93ba-c7f7ef17c734.jpg` },
      { src: `${CDN}/d779bba8-ec4f-41dd-8291-2d2584bc2d26.jpg` },
      { src: `${CDN}/5400ce5c-156d-4d41-8c8f-ebd182f9ef10.jpg` },
      { src: `${CDN}/1e4ceb60-f83b-426d-b3f3-a58e723e59d4.jpg` },
      { src: `${CDN}/8bf8b02d-22b0-40cc-b814-ed6528830ab2.jpg` },
      { src: `${CDN}/9b39cd0b-9d40-4a66-9c46-f7242399a9a7.jpg` },
      { src: `${CDN}/44ecfef9-1362-4b69-9c2c-95722c012f59.jpg` },
      { src: `${CDN}/3d96a4c4-2b39-467c-8d85-6e284db80df7.jpg` },
      { src: `${CDN}/3dcf3056-74ae-4d8c-b866-eb4f611fa97c.jpg` },
      { src: `${CDN}/25a1205a-7166-4b7a-bd59-8250c9911424.jpg` },
      { src: `${CDN}/2219e7e4-c387-4f23-bcc2-210091c86402.jpg` },
      { src: `${CDN}/140667c2-38b6-4e83-90d4-5bd8c51f326d.jpg` },
      { src: `${CDN}/3b7bfa77-2e12-4a68-aa40-bf7eb141d26c.jpg` },
      { src: `${CDN}/6c74b7df-5ac9-4e7b-aaad-91fdb8c3e7a3.jpg` },
      { src: `${CDN}/1ea9bf14-7d41-47f4-93ff-35227b13d9ab.jpg` },
      { src: `${CDN}/1c2b997d-e52b-43ae-b2b7-4158d0299e3d.jpg` },
      { src: `${CDN}/16330d03-da47-4c41-ac45-7b903225911e.jpg` },
    ],
  },
];