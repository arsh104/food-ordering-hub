import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function CartSidebar({ 
  isOpen, 
  onClose, 
  cartItems, 
  updateQuantity,
  removeItem 
}) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + deliveryFee;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-display font-bold text-slate-900">Your Order</h2>
            {totalItems > 0 && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                {totalItems} items
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-slate-300" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">Cart is empty</h3>
                <p className="text-slate-500 text-sm mt-1">Looks like you haven't added anything yet.</p>
              </div>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 animate-slide-in">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 rounded-2xl object-cover bg-slate-50"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900 text-sm pr-4">{item.name}</h4>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-danger transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-accent font-bold text-sm mt-1">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-3 bg-slate-50 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-primary"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-primary"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-slate-100 p-6 bg-slate-50/50">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Delivery Fee</span>
                <span className="font-medium text-slate-900">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="h-px bg-slate-200 my-4" />
              <div className="flex justify-between items-end">
                <span className="font-bold text-slate-900">Total</span>
                <span className="font-display font-extrabold text-2xl text-slate-900">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
            
            <button className="w-full bg-primary hover:bg-slate-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <span>Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
