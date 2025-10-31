export const products = [
  {
    id: 1,
    name: "Marble Ganesha Murti",
    description: "Handcrafted white marble statue of Lord Ganesha, the remover of obstacles. Perfect for home altars and meditation spaces.",
    price: 299,
    image: "/products/ganesh-01.png",
    category: "Murtis",
    featured: true,
    inStock: true,
    dimensions: "8 inches",
    material: "White Marble",
    weight: "2.5 lbs"
  },
  {
    id: 2,
    name: "Carved Marble Bowl",
    description: "Exquisite white marble bowl with intricate gold floral carvings. A perfect blend of traditional craftsmanship and modern elegance.",
    price: 189,
    image: "/products/decor-01.png",
    category: "Showpieces",
    featured: true,
    inStock: true,
    dimensions: "6 inches",
    material: "White Marble with Gold",
    weight: "1.8 lbs"
  },
  {
    id: 3,
    name: "Marble Lakshmi Murti",
    description: "Elegant white marble statue of Goddess Lakshmi, the goddess of wealth and prosperity. Hand-carved with intricate details.",
    price: 449,
    image: "/products/laxmi-01.png",
    category: "Murtis",
    featured: true,
    inStock: true,
    dimensions: "10 inches",
    material: "White Marble",
    weight: "4.2 lbs"
  },
  {
    id: 4,
    name: "Marble Elephant Showpiece",
    description: "Beautiful white marble elephant statue standing on a rectangular base with subtle gray veining. Symbol of wisdom and strength.",
    price: 129,
    image: "/products/elephant-01.png",
    category: "Showpieces",
    featured: true,
    inStock: true,
    dimensions: "5 inches",
    material: "White Marble",
    weight: "1.5 lbs"
  },
  {
    id: 5,
    name: "Marble Buddha Statue",
    description: "Serene white marble Buddha statue in meditation pose. Brings peace and tranquility to any space with its minimalist beauty.",
    price: 279,
    image: "/products/decor-01.png",
    category: "Murtis",
    featured: false,
    inStock: true,
    dimensions: "7 inches",
    material: "White Marble",
    weight: "3.1 lbs"
  },
  {
    id: 6,
    name: "Marble Lotus Vase",
    description: "Elegant white marble vase with lotus petal design. Perfect for displaying flowers or as a standalone decorative piece.",
    price: 199,
    image: "/products/elephant-01.png",
    category: "Marble Decor",
    featured: false,
    inStock: true,
    dimensions: "9 inches",
    material: "White Marble",
    weight: "2.8 lbs"
  },
  {
    id: 7,
    name: "Marble Krishna Statue",
    description: "Charming white marble statue of Lord Krishna playing his flute. A symbol of divine love and joy, perfect for devotees.",
    price: 329,
    image: "/products/decor-01.png",
    category: "Murtis",
    featured: false,
    inStock: true,
    dimensions: "8 inches",
    material: "White Marble",
    weight: "3.5 lbs"
  },
  {
    id: 8,
    name: "Marble Candle Holder",
    description: "Minimalist white marble candle holder with clean lines. Perfect for creating a serene and elegant atmosphere.",
    price: 89,
    image: "/products/elephant-01.png",
    category: "Marble Decor",
    featured: false,
    inStock: true,
    dimensions: "4 inches",
    material: "White Marble",
    weight: "1.2 lbs"
  },
  {
    id: 9,
    name: "Marble Shiva Lingam",
    description: "Sacred white marble Shiva Lingam, a symbol of divine energy and consciousness. Hand-polished to perfection.",
    price: 159,
    image: "/products/decor-01.png",
    category: "Murtis",
    featured: false,
    inStock: true,
    dimensions: "6 inches",
    material: "White Marble",
    weight: "2.1 lbs"
  },
  {
    id: 10,
    name: "Marble Bookend Set",
    description: "Pair of elegant white marble bookends with geometric design. Functional art for your bookshelf or desk.",
    price: 149,
    image: "/products/laxmi-01.png",
    category: "Marble Decor",
    featured: false,
    inStock: true,
    dimensions: "5 inches each",
    material: "White Marble",
    weight: "2.3 lbs"
  }
];

export const featuredProducts = products.filter(product => product.featured);

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};
