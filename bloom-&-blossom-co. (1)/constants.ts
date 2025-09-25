import { Product, Order } from './types';

export const CATEGORIES = ['Bouquets', 'Arrangements', 'Potted Plants', 'Seasonal'];
export const OCCASions = ['Birthday', 'Anniversary', 'Thank You', 'Congratulations', 'Sympathy', 'Wedding'];
export const COLORS = ['Red', 'Pink', 'White', 'Yellow', 'Purple', 'Mixed'];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Crimson Rose Bouquet',
    price: 59.99,
    description: 'A classic bouquet of a dozen long-stemmed crimson roses, perfect for expressing love and passion. Hand-tied with a silk ribbon.',
    imageUrl: 'https://images.unsplash.com/photo-1596230922125-9c1d0f5854da?q=80&w=800&auto=format&fit=crop',
    category: 'Bouquets',
    occasion: ['Anniversary', 'Wedding'],
    color: ['Red'],
    stock: 50,
  },
  {
    id: 2,
    name: 'Sunny Day Arrangement',
    price: 74.99,
    description: 'Brighten someone\'s day with this cheerful arrangement of sunflowers, yellow daisies, and white lilies in a rustic vase.',
    imageUrl: 'https://images.unsplash.com/photo-1599605353723-7a0b8b1a43cf?q=80&w=800&auto=format&fit=crop',
    category: 'Arrangements',
    occasion: ['Birthday', 'Thank You', 'Congratulations'],
    color: ['Yellow', 'White'],
    stock: 35,
  },
  {
    id: 3,
    name: 'Orchid Serenity',
    price: 89.99,
    description: 'An elegant and long-lasting Phalaenopsis orchid in a ceramic pot. A symbol of beauty, strength, and luxury.',
    imageUrl: 'https://images.unsplash.com/photo-1530364124626-a0a9978c452e?q=80&w=800&auto=format&fit=crop',
    category: 'Potted Plants',
    occasion: ['Thank You', 'Congratulations'],
    color: ['White', 'Purple'],
    stock: 20,
  },
  {
    id: 4,
    name: 'Pastel Dream Bouquet',
    price: 65.00,
    description: 'A soft and dreamy bouquet featuring pink peonies, lavender hyacinths, and white freesias. A gentle gesture of affection.',
    imageUrl: 'https://images.unsplash.com/photo-1604323992224-1428a1e2b4a5?q=80&w=800&auto=format&fit=crop',
    category: 'Bouquets',
    occasion: ['Birthday', 'Anniversary'],
    color: ['Pink', 'Purple', 'White'],
    stock: 40,
  },
  {
    id: 5,
    name: 'Seasonal Tulip Medley',
    price: 49.99,
    description: 'A vibrant mix of seasonal tulips in various colors, capturing the essence of spring. Available for a limited time.',
    imageUrl: 'https://images.unsplash.com/photo-1588825928373-3f14b35a3952?q=80&w=800&auto=format&fit=crop',
    category: 'Seasonal',
    occasion: ['Birthday', 'Thank You'],
    color: ['Mixed'],
    stock: 60,
  },
  {
    id: 6,
    name: 'Elegant White Lily Vase',
    price: 82.50,
    description: 'A stunning arrangement of pure white oriental lilies, known for their captivating fragrance. A classic choice for sympathy or formal occasions.',
    imageUrl: 'https://images.unsplash.com/photo-1615362945237-7703dba7536a?q=80&w=800&auto=format&fit=crop',
    category: 'Arrangements',
    occasion: ['Sympathy', 'Wedding'],
    color: ['White'],
    stock: 25,
  },
  {
    id: 7,
    name: 'Fiddle Leaf Fig Tree',
    price: 120.00,
    description: 'A popular and stylish indoor plant with large, violin-shaped leaves. Perfect for adding a touch of green to any modern home.',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e4d524c52243?q=80&w=800&auto=format&fit=crop',
    category: 'Potted Plants',
    occasion: ['Congratulations'],
    color: [],
    stock: 15,
  },
  {
    id: 8,
    name: 'Purple Passion Bouquet',
    price: 68.99,
    description: 'A rich and luxurious bouquet of deep purple irises, lavender roses, and violet lisianthus. A bouquet that speaks of royalty and admiration.',
    imageUrl: 'https://images.unsplash.com/photo-1582964321175-a226786c0032?q=80&w=800&auto=format&fit=crop',
    category: 'Bouquets',
    occasion: ['Anniversary', 'Congratulations'],
    color: ['Purple'],
    stock: 30,
  },
];

export const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD-12345',
        userId: 'user1',
        items: [
            { id: 1, name: 'Crimson Rose Bouquet', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1596230922125-9c1d0f5854da?q=80&w=800&auto=format&fit=crop', quantity: 1 },
            { id: 3, name: 'Orchid Serenity', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1530364124626-a0a9978c452e?q=80&w=800&auto=format&fit=crop', quantity: 1 }
        ],
        total: 149.98,
        deliveryAddress: '123 Bloom St, Floral City, FL 12345',
        deliveryDate: '2023-10-28',
        deliveryTime: '10:00 - 12:00',
        status: 'Delivered',
        orderDate: new Date('2023-10-26'),
    },
    {
        id: 'ORD-67890',
        userId: 'user1',
        items: [
            { id: 5, name: 'Seasonal Tulip Medley', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1588825928373-3f14b35a3952?q=80&w=800&auto=format&fit=crop', quantity: 2 }
        ],
        total: 99.98,
        deliveryAddress: '456 Petal Ln, Garden Town, GA 67890',
        deliveryDate: '2023-11-05',
        deliveryTime: '14:00 - 16:00',
        status: 'Shipped',
        orderDate: new Date('2023-11-02'),
    }
];