import type { Product } from "./types";

export const products: Product[] = [
  {
    id: 1,
    name: "Чизкейк",
    image: "catalog.png",
    description:
      "Классический шоколадный торт с густым кремом и ароматом какао. Идеален для любителей насыщенного вкуса.",
    price: "8 500 ₸",
  },
  {
    id: 2,
    name: "Медовик",
    image: "catalog.png",
    description:
      "Нежный медовый торт с карамельным вкусом и слоёными коржами, пропитанными сметанным кремом.",
    price: "7 200 ₸",
  },
  {
    id: 3,
    name: "Наполеон",
    image: "catalog.png",
    description:
      "Традиционный торт из тонких хрустящих коржей и заварного крема. Хруст и нежность в каждом кусочке.",
    price: "7 800 ₸",
  },
];
