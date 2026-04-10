import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const products: Product[] = [
  {
    id: '1',
    name: 'Drop Shoulder Essential',
    price: 45,
    category: 'DROP SHOULDER',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop',
    description: 'Premium heavyweight cotton, engineered for the perfect silhouette.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Grey'],
    isNew: true,
  },
  {
    id: '2',
    name: 'Oversized Box Tee',
    price: 55,
    category: 'OVERSIZED',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop',
    description: 'The weight of this fabric is incredible. Truly premium street luxury.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy'],
    isNew: true,
  },
  {
    id: '3',
    name: 'Graphic Noir Tee',
    price: 65,
    category: 'GRAPHIC',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop',
    description: 'High fashion editorial shot of a textured black oversized tee.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
  },
  {
    id: '4',
    name: 'Vintage Wash Tee',
    price: 48,
    category: 'ESSENTIAL',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
    description: 'Soft-touch vintage wash cotton with a relaxed fit.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Charcoal'],
    isNew: true,
  },
  {
    id: '5',
    name: 'Minimalist Pocket Tee',
    price: 42,
    category: 'ESSENTIAL',
    image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?q=80&w=1200&auto=format&fit=crop',
    description: 'Clean lines and a functional pocket detail.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Beige'],
  },
  {
    id: '6',
    name: 'Heavyweight Studio Tee',
    price: 75,
    category: 'DROP SHOULDER',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1200&auto=format&fit=crop',
    description: 'Our heaviest cotton yet, designed for a structured drape.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
  },
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && item.selectedSize === size)));
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId && item.selectedSize === size) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
