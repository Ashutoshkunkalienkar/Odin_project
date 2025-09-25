
import React from 'react';
import { CartItem } from '../types';
import { MinusIcon, PlusIcon, TrashIcon, XIcon, ArrowRightIcon } from './Icons';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  cartItems: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout, cartItems, updateQuantity, removeFromCart }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}>
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-sans font-bold text-primary">Your Cart</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <XIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-grow p-6">
              <p className="text-lg text-gray-500">Your cart is empty.</p>
              <button onClick={onClose} className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-accent transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
                    <div className="flex-grow">
                      <h3 className="font-sans font-bold text-lg">{item.name}</h3>
                      <p className="text-gray-500">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 border rounded-full hover:bg-gray-100 disabled:opacity-50" disabled={item.quantity <= 1}>
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span key={`${item.id}-${item.quantity}`} className="px-4 font-bold tabular-nums animate-pulse-quantity">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 border rounded-full hover:bg-gray-100">
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-400 hover:text-red-500">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t">
                <div className="flex justify-between items-center text-xl font-bold mb-4">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <button onClick={onCheckout} className="group w-full bg-primary text-white py-3 rounded-full text-lg font-bold hover:bg-accent transition-colors flex items-center justify-center overflow-hidden">
                  Proceed to Checkout <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};