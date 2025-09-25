export type Page = 
  | 'home' 
  | 'products' 
  | 'productDetail' 
  | 'cart' 
  | 'checkout' 
  | 'login' 
  | 'account' 
  | 'admin'
  | 'orderConfirmation'
  | 'about'
  | 'contact';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  occasion: string[];
  color: string[];
  stock: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  wishlist: number[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
  orderDate: Date;
}

export interface AIRecommendation {
  title: string;
  reasoning: string;
  suggestedProductIds: number[];
}

export interface Review {
  id: string;
  productId: number;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO String
}