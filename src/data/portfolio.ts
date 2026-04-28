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
  {
    id: "obj2",
    title: "Новая пристройка к дому + замена покрытия и утепление",
    description: "1. Пристройка жилого помещения под ключ 48 м²\n2. Демонтаж старого покрытия, замена на металлочерепицу\n3. Утепление дома по всему периметру\n4. Монтаж сайдинга из фасадных панелей",
    tags: ["Пристройка", "Демонтаж", "Утепление крыши", "Монтаж сайдинга", "Частный дом"],
    cover: `${CDN}/6ecc158f-f29f-4ac3-91af-eab16a241124.jpg`,
    photos: [
      { src: `${CDN}/6ecc158f-f29f-4ac3-91af-eab16a241124.jpg` },
      { src: `${CDN}/3b70367d-e704-47ab-a63b-ab3af61ea677.jpg` },
      { src: `${CDN}/301c4a0b-2f4d-487e-9289-6419cb7e57af.jpg` },
      { src: `${CDN}/a83f448b-3042-46fd-9a0e-90a8854a3a3f.jpg` },
      { src: `${CDN}/dc333dd0-06b2-47da-b728-72a44fceb20a.jpg` },
      { src: `${CDN}/bcf3ec2a-b321-4293-8b0c-21394dcbd339.jpg` },
      { src: `${CDN}/0072fad8-a0ff-441c-a5d7-b38b6a2524a8.jpg` },
      { src: `${CDN}/1a09f0b7-5376-46a0-be6e-65bc69e0b160.jpg` },
      { src: `${CDN}/ecca44ce-501e-4feb-9078-2f9e33305886.jpg` },
      { src: `${CDN}/f949881f-8f99-4e9c-b7d1-a2b9586c2062.jpg` },
      { src: `${CDN}/3d4dfb86-4fe4-4bf0-84d4-5d93bd6009ec.jpg` },
      { src: `${CDN}/abddf18b-6dab-43cb-bf6a-d9514a125f30.jpg` },
      { src: `${CDN}/820b81ab-cf50-4a65-8631-8b0a80ff7535.jpg` },
      { src: `${CDN}/74ec4cfb-81ca-4b95-87ae-de0243bbd1b3.jpg` },
      { src: `${CDN}/125acd58-2b33-42aa-98b6-46f9df8cd6a7.jpg` },
      { src: `${CDN}/f47d69a8-bb6f-402f-85cf-a02551b7fe6e.jpg` },
      { src: `${CDN}/ece15b06-1c0d-44f5-b005-c22ea3eac8a3.jpg` },
      { src: `${CDN}/30a951cd-d76e-45d5-90b5-4ede36dcfb0d.jpg` },
      { src: `${CDN}/01f32bdb-adfd-4475-9a64-8aca9f7a7682.jpg` },
    ],
  },
  {
    id: "obj3",
    title: "Замена старого профнастила",
    description: "Изначально была плохая теплоизоляция и большие теплопотери. Произвели замену утеплителя и монтаж нового покрытия из металлочерепицы",
    tags: ["Металлочерепица", "Новое покрытие", "Замена утеплителя", "Частный дом"],
    cover: `${CDN}/ae600e17-4e54-4b72-a3ef-53cf67e88598.jpg`,
    photos: [
      { src: `${CDN}/ae600e17-4e54-4b72-a3ef-53cf67e88598.jpg` },
      { src: `${CDN}/0e945150-8274-4f63-8164-441cd54f7fea.jpg` },
      { src: `${CDN}/8ed3b9fc-85b1-4172-b651-9e71059da52c.jpg` },
      { src: `${CDN}/682edea8-426b-4fe3-ade5-20ccab957417.jpg` },
      { src: `${CDN}/e26c6dd0-a436-4283-9b62-d28497a3fc38.jpg` },
      { src: `${CDN}/1e5553a3-66f9-42de-b625-3d2bd52d3c63.jpg` },
      { src: `${CDN}/401ff1e1-cfdf-409c-aac3-7fbb06ff791c.jpg` },
      { src: `${CDN}/a8d54662-26c1-4eb8-8a0b-75bbfd60274f.jpg` },
      { src: `${CDN}/c398c492-a920-44cd-9c4e-ef3dc663a521.jpg` },
      { src: `${CDN}/887236b5-88e3-40ef-9786-2b1103173d6e.jpg` },
      { src: `${CDN}/43dc80a5-4801-4518-a8e7-c81dc17fd309.jpg` },
      { src: `${CDN}/d855cd48-23e9-4398-a9de-4b57385c5af6.jpg` },
    ],
  },
];