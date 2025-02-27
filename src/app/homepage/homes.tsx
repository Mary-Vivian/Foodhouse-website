"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type MenuItem = {
  id: number;
  src: string;
  name: string;
  price: number;
  description: string;
};

const HomePg = () => {
  const { cart, addToCart } = useCart();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchMenu = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/menus/");
      const data: { id: number; image?: string; name: string; price: number; description?: string }[] = 
        await response.json();
      
      console.log("Fetched menu data:", data);
      
      setMenu(
        data.map((item) => ({
          id: item.id,
          src: item.image ?? "",  
          name: item.name,
          price: item.price,
          description: item.description ?? "No description available",
        }))
      );
  
      setIsMenuOpen(true);
    } catch (error) {
      console.error("Error fetching menu:", error);
      setIsMenuOpen(true);
    }
  };
  
  


  const popularFoods = [
    { id: 1, src: "./images/fruitfish.jpg", name: "Fruit Dish", price: 400, description: "A delicious fruit mix" },
    { id: 2, src: "./images/fruitdish.jpg", name: "Fruit Dish", price: 400, description: "A tasty fruit dish" },
    { id: 3, src: "./images/seafish.jpg", name: "Seafood Dish", price: 400, description: "Fresh seafood platter" },
    { id: 4, src: "./images/pizza.jpg", name: "Pizza", price: 400, description: "Cheesy and delicious pizza" },
  ];
  

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex gap-20 justify-center items-center mt-8">
        <div className="text-6xl">
          <h1>Enjoy Delicious</h1>
          <h1>
            Food in <b className="text-amber-400">Healthy Life</b>
          </h1>
          <Link href="/order">
            <button className="bg-orange-600 mt-5 p-3 rounded-lg text-white text-2xl">
              ORDER NOW
            </button>
          </Link>
        </div>
        <div className="mt-4">
          <img 
            src="./images/plate1.jpg" 
            width={500} 
            alt="Delicious Food"
            className="rounded-lg" 
          />
        </div>
      </section>

      {/* Popular Foods Section */}
      <section className="my-16">
        <h2 className="text-5xl text-center mb-12">Popular Foods</h2>
        <div className="flex gap-20 justify-center items-center mx-24">
          {popularFoods.map((item, index) => (
            <div key={index} className="text-center">
              <img 
                src={item.src} 
                className="w-[200px] h-[200px] object-cover rounded-lg shadow-lg" 
                alt={item.name} 
              />
              <p className="text-2xl mt-4">{item.name}</p>
              <button
                className="bg-orange-600 mt-5 p-2 rounded-lg text-white text-sm hover:bg-orange-700 transition-colors"
                onClick={() => addToCart({ ...item, quantity: 1 })}
              >
                Add to cart ${item.price}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Button */}
      <section className="text-center my-8">
        <Link href="/ShoppingCart">
          <button className="bg-blue-600 p-3 rounded-lg text-white text-lg hover:bg-blue-700 transition-colors">
            Go to Cart ({cart?.length || 0} items)
          </button>
        </Link>
      </section>

      {/* Special Offer Section */}
      <section className="flex justify-center items-center my-16">
        <div className="mx-20">
          <h2 className="text-6xl">Our Special Offer</h2>
          <p className="mt-8 text-4xl">Best cooks and best delivery guys at your service.</p>
          <button 
            className="bg-orange-600 mt-5 p-2 rounded-lg text-white text-sm hover:bg-orange-700 transition-colors"
            onClick={fetchMenu}
          >
            See All Menu
          </button>
        </div>
        <div>
          <img 
            src="./images/menu.jpg" 
            width={400} 
            alt="Special Menu"
            className="rounded-lg shadow-lg" 
          />
        </div>
      </section>

      {/* Menu Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="text-red-500 text-lg hover:text-red-700 transition-colors"
              >
                ✖ Close
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menu.length > 0 ? (
                menu.map((item) => (
                  <div key={item.id} className="border p-4 rounded-lg shadow-sm">
                    {item.src ? (
                      <img
                        src={item.src}
                        className="w-full h-40 object-cover rounded-lg mb-2"
                        alt={item.name}
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg mb-2">
                        <p className="text-gray-500">No Image Available</p>
                      </div>
                    )}
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.description || "No description available"}</p>
                    <p className="font-bold text-lg mt-2">${item.price}</p>
                    <button
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg mt-2 w-full hover:bg-orange-700 transition-colors"
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-2 text-center py-8">No menu items available</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white mt-auto">
        <div className="flex gap-20 justify-center items-start p-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FoodHouse.</h3>
            <p className="max-w-xs">Best cooks and best delivery guys all at your service.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>Career</li>
              <li>About Us</li>
              <li>Blog</li>
              <li>Press Info</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>Breakfast</li>
              <li>Lunch</li>
              <li>Dinner</li>
            </ul>
          </div>
        </div>
        <div className="bg-amber-400 text-white p-2 text-center">
          <p>Copyright 2021 Bensik All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePg;