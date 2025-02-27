'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [cartCount] = useState(0); 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-orange-500 text-white p-2 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold cursor-pointer">Foodie</span>
        </Link>
        
        <div className="hidden md:flex gap-6 text-lg">
          <Link href="/" className="hover:text-green-400 mr-12">Home</Link>
          <Link href="/order" className="hover:text-green-200 mr-4">Order</Link>
          <Link href="/ShoppingCart" className="flex items-center gap-1 hover:text-gray-200 mr-28">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="bg-white text-orange-500 px-2 py-1 rounded-full text-sm font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
        
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <span className="text-xl">☰</span>
        </button>
      </div>
      
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 bg-orange-600 py-4 text-lg">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/order" onClick={() => setIsOpen(false)}>Order</Link>
          <Link href="/cart" className="flex items-center gap-1" onClick={() => setIsOpen(false)}>
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="bg-white text-orange-500 px-2 py-1 rounded-full text-sm font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
