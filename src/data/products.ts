export interface Product {
  id: number;
  name: string;
  image: string;
  callback: string;
  description: string;
  price: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Куртки",
    image: "wear.jpeg",
    callback: "wear",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi eum deserunt dolores alias debitis deleniti facilis recusandae nostrum velit quam.",
    price: "20 000 ₸",
  },
  {
    id: 2,
    name: "Футболки",
    image: "t-shirt.jpeg",
    callback: "tshirt",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi eum deserunt dolores alias debitis deleniti facilis recusandae nostrum velit quam.",
    price: "3 000 ₸",
  },
  {
    id: 3,
    name: "Джинсы",
    image: "jeans.jpeg",
    callback: "jeans",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi eum deserunt dolores alias debitis deleniti facilis recusandae nostrum velit quam.",
    price: "8 000 ₸",
  },
  {
    id: 4,
    name: "Шапки",
    image: "jeans.jpeg",
    callback: "heads",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi eum deserunt dolores alias debitis deleniti facilis recusandae nostrum velit quam.",
    price: "2 000 ₸",
  },
  {
    id: 5,
    name: "Слаксы",
    image: "jeans.jpeg",
    callback: "slaks",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi eum deserunt dolores alias debitis deleniti facilis recusandae nostrum velit quam.",
    price: "9 000 ₸",
  },
  {
    id: 6,
    name: "Худи",
    image: "jeans.jpeg",
    callback: "hudie",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi eum deserunt dolores alias debitis deleniti facilis recusandae nostrum velit quam.",
    price: "10 000 ₸",
  },
  {
    id: 7,
    name: "Кофты",
    image: "jeans.jpeg",
    callback: "cofty",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi eum deserunt dolores alias debitis deleniti facilis recusandae nostrum velit quam.",
    price: "8 000 ₸",
  },
];
