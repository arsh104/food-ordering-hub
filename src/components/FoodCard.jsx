import React from 'react';
import { Plus, Check, Star } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function FoodCard({ item, onAddToCart, isAdded }) {
  return (
    <div className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 transform hover:-translate-y-1">
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Price tag overlay */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl font-display font-bold text-slate-800 shadow-sm border border-white/50">
          ${item.price.toFixed(2)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-bold text-xl text-slate-900 leading-tight">
            {item.name}
          </h3>
          <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-lg">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-amber-600">{item.rating || '4.8'}</span>
          </div>
        </div>
        
        <p className="text-slate-500 text-sm mb-6 flex-1 line-clamp-2">
          {item.description}
        </p>

        {/* Action Button */}
        <button
          onClick={() => onAddToCart(item)}
          className={cn(
            "w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center space-x-2",
            isAdded 
              ? "bg-emerald-50 text-emerald-600 border-2 border-emerald-100"
              : "bg-primary text-white hover:bg-slate-800 shadow-md hover:shadow-xl"
          )}
        >
          {isAdded ? (
            <>
              <Check className="w-5 h-5" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
