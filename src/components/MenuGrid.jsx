import React, { useState } from 'react';
import FoodCard from './FoodCard';
import { Search } from 'lucide-react';

export default function MenuGrid({ menuItems, cartItems, onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Mains', 'Sides', 'Desserts', 'Drinks'];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">Delicious</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Explore our premium selection of gourmet meals.</p>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl leading-5 bg-transparent placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm transition-all shadow-sm"
            placeholder="Search for food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex space-x-3 mb-10 overflow-x-auto pb-2 hide-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2.5 rounded-full whitespace-nowrap font-medium text-sm transition-all duration-300 ${
              activeCategory === category
                ? 'bg-primary text-white shadow-md transform scale-105'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map(item => (
            <FoodCard 
              key={item.id} 
              item={item} 
              onAddToCart={onAddToCart}
              isAdded={cartItems.some(cartItem => cartItem.id === item.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No items found</h3>
          <p className="text-slate-500 mt-1">Try adjusting your search or category.</p>
        </div>
      )}
    </div>
  );
}
