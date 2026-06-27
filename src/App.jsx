import React, { useState } from 'react';
import MenuGrid from './components/MenuGrid';
import CartSidebar from './components/CartSidebar';
import { ShoppingBag, UtensilsCrossed } from 'lucide-react';

const MENU_DATA = [
  {
    id: 1,
    name: 'Premium Pepperoni Pizza',
    description: 'Authentic Italian crust topped with san marzano tomato sauce, fresh mozzarella, and premium pepperoni slices.',
    price: 18.99,
    category: 'Mains',
    image: '/images/premium_pepperoni_pizza_1782577246908.png',
    rating: '4.9'
  },
  {
    id: 2,
    name: 'Gourmet Truffle Burger',
    description: 'Double wagyu beef patty, black truffle mayo, caramelized onions, and aged cheddar on a brioche bun.',
    price: 16.50,
    category: 'Mains',
    image: '/images/gourmet_truffle_burger_1782577259009.png',
    rating: '4.8'
  },
  {
    id: 3,
    name: 'Avocado Quinoa Salad',
    description: 'Fresh mixed greens, organic quinoa, sliced avocado, cherry tomatoes, and citrus vinaigrette.',
    price: 12.99,
    category: 'Sides',
    image: '/images/avocado_quinoa_salad_1782577271571.png',
    rating: '4.7'
  },
  {
    id: 4,
    name: 'Chocolate Lava Cake',
    description: 'Decadent warm chocolate cake with a molten center, served with vanilla bean ice cream.',
    price: 8.99,
    category: 'Desserts',
    image: '/images/chocolate_lava_cake_1782577326557.png',
    rating: '4.9'
  },
  {
    id: 5,
    name: 'Berry Blast Smoothie',
    description: 'Refreshing blend of mixed berries, greek yogurt, honey, and a hint of fresh mint.',
    price: 6.50,
    category: 'Drinks',
    image: '/images/berry_smoothie_1782577336148.png',
    rating: '4.6'
  },
  {
    id: 6,
    name: 'Golden Truffle Fries',
    description: 'Crispy thick-cut fries tossed in truffle oil and sprinkled with aged parmesan cheese.',
    price: 7.99,
    category: 'Sides',
    image: '/images/truffle_fries_1782577350045.png',
    rating: '4.8'
  }
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (foodItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === foodItem.id);
      if (existing) {
        return prev.map(item => 
          item.id === foodItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...foodItem, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="bg-primary text-white p-2.5 rounded-xl">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <span className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
                Food<span className="text-accent">Hub</span>
              </span>
            </div>

            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 rounded-full hover:bg-slate-100 transition-colors flex items-center group"
            >
              <div className="bg-slate-100 p-2.5 rounded-full group-hover:bg-slate-200 transition-colors">
                <ShoppingBag className="w-6 h-6 text-slate-700" />
              </div>
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-accent text-white text-[11px] font-bold h-6 w-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm transform scale-100 animate-fade-in">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        <MenuGrid 
          menuItems={MENU_DATA}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={handleUpdateQuantity}
        removeItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;
