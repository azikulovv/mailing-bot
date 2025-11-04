import type { Product } from "./types";

export const products: Product[] = [
  {
    id: 1,
    name: "Чизкейк",
    image:
      "https://plus.unsplash.com/premium_photo-1731167468076-7e4cdb16941d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=388",
    description:
      "Классический шоколадный торт с густым кремом и ароматом какао. Идеален для любителей насыщенного вкуса.",
    price: "8 500 ₸",
  },
  {
    id: 2,
    name: "Медовик",
    image:
      "https://images.unsplash.com/photo-1488716820095-cbe80883c496?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=386",
    description:
      "Нежный медовый торт с карамельным вкусом и слоёными коржами, пропитанными сметанным кремом.",
    price: "7 200 ₸",
  },
  {
    id: 3,
    name: "Наполеон",
    image:
      "https://plus.unsplash.com/premium_photo-1761298779443-1f12b296a8c0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
    description:
      "Традиционный торт из тонких хрустящих коржей и заварного крема. Хруст и нежность в каждом кусочке.",
    price: "7 800 ₸",
  },
];
