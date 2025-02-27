'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, basil",
    price: 14.99,
    category: "Pizza",
    image: "/images/margheritapizza.jpg"
  },
  {
    id: 2,
    name: "Chicken Burger",
    description: "Grilled chicken, lettuce, special sauce",
    price: 12.99,
    category: "Burgers",
    image: "/images/Chicken-Burgers.jpg"
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Romaine lettuce, croutons, parmesan",
    price: 9.99,
    category: "Salads",
    image: "/images/shrimp.jpg"
  },
];

export default function OrderPage() {
  const { cart, addToCart, removeFromCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...new Set(menuItems.map(item => item.category))];

  const filteredItems = selectedCategory === "All"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleConfirmOrder = () => {
    alert('Order confirmed! Total: $' + cartTotal.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Back to Home Link */}
        <Link href="/" className="flex items-center text-blue-600 hover:underline mb-4">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Place Your Order</h1>
          <p className="text-lg mt-4">Choose your favorite dish and complete your order.</p>
        </div>
        
        {/* Category Filter */}
        <div className="mb-8 flex gap-4 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category ? 'bg-orange-500 text-white' : 'bg-white text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="relative h-48 w-full mb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                    <button
                    onClick={() => addToCart({ ...item, src: item.image, quantity: 1 })} 
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                    >
                    Add to Cart
                </button>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">Your Order</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="text-gray-500 hover:text-green-500"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={handleConfirmOrder}
                    className="w-full bg-orange-600 text-white py-3 rounded-lg mt-6 hover:bg-orange-700 text-2xl"
                  >
                    Confirm Order
                  </button>
                </div>
              </>
            )}

            {/* Go Back Button */}
            <Link href="/">
              <button className="w-full mt-4 p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                Go Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
