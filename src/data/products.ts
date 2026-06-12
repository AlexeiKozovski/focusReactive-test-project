export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  tags: string[];
  inStock: boolean;
};

export const categories: string[] = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Books',
  'Sports & Fitness',
  'Accessories',
];

const seedItems: Product[] = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    price: 79.99,
    tags: ['wireless', 'bluetooth', 'audio', 'portable', 'music'],
    inStock: true,
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    category: 'Clothing',
    price: 24.99,
    tags: ['organic', 'cotton', 'casual', 'comfortable', 'eco-friendly'],
    inStock: true,
  },
  {
    id: 3,
    name: 'Stainless Steel Water Bottle',
    category: 'Home & Garden',
    price: 18.95,
    tags: ['stainless', 'water', 'bottle', 'reusable', 'hydration'],
    inStock: false,
  },
  {
    id: 4,
    name: 'JavaScript: The Good Parts',
    category: 'Books',
    price: 29.99,
    tags: ['javascript', 'programming', 'web', 'development', 'coding'],
    inStock: true,
  },
  {
    id: 5,
    name: 'Gaming Mechanical Keyboard',
    category: 'Electronics',
    price: 129.99,
    tags: ['gaming', 'mechanical', 'keyboard', 'rgb', 'tactile'],
    inStock: true,
  },
  {
    id: 6,
    name: 'Yoga Mat Premium',
    category: 'Sports & Fitness',
    price: 45,
    tags: ['yoga', 'exercise', 'mat', 'fitness', 'non-slip'],
    inStock: true,
  },
  {
    id: 7,
    name: 'Smart Watch Fitness Tracker',
    category: 'Electronics',
    price: 199.99,
    tags: ['smart', 'watch', 'fitness', 'tracker', 'health'],
    inStock: false,
  },
  {
    id: 8,
    name: 'Denim Jacket Classic',
    category: 'Clothing',
    price: 68.5,
    tags: ['denim', 'jacket', 'classic', 'casual', 'fashion'],
    inStock: true,
  },
  {
    id: 9,
    name: 'Coffee Maker French Press',
    category: 'Home & Garden',
    price: 32.99,
    tags: ['coffee', 'french', 'press', 'brewing', 'morning'],
    inStock: true,
  },
  {
    id: 10,
    name: 'React Hooks Handbook',
    category: 'Books',
    price: 34.99,
    tags: ['react', 'hooks', 'frontend', 'javascript', 'web'],
    inStock: true,
  },
];

const nameWords = [
  'Wireless',
  'Portable',
  'Smart',
  'Classic',
  'Premium',
  'Modern',
  'Compact',
  'Professional',
  'Advanced',
  'Essential',
];

const productWords = [
  'Headset',
  'Backpack',
  'Lamp',
  'Sneakers',
  'Guide',
  'Tracker',
  'Bottle',
  'Keyboard',
  'Stand',
  'Mat',
];

const itemsPerCategory = Math.ceil(
  (100 - seedItems.length) / categories.length
);

const generatedItems: Product[] = categories.flatMap(
  (category, categoryIndex) =>
    Array.from({ length: itemsPerCategory }, (_, index): Product => {
      const id =
        seedItems.length + categoryIndex * itemsPerCategory + index + 1;
      const prefix = nameWords[(categoryIndex + index) % nameWords.length];
      const noun =
        productWords[(categoryIndex * 3 + index) % productWords.length];
      const basePrice = 15 + ((categoryIndex * 19 + index * 11) % 230);

      return {
        id,
        name: `${prefix} ${noun} ${id}`,
        category,
        price: Number((basePrice + (index % 3) * 0.99).toFixed(2)),
        tags: [
          category
            .toLowerCase()
            .replace(/\s*&\s*/g, '-')
            .replace(/\s+/g, '-'),
          prefix.toLowerCase(),
          noun.toLowerCase(),
          index % 2 === 0 ? 'wireless' : 'portable',
          index % 3 === 0 ? 'bluetooth' : 'fitness',
        ],
        inStock: id % 4 !== 0,
      };
    })
);

export const items: Product[] = [...seedItems, ...generatedItems].slice(0, 100);
