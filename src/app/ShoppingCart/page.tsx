"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { ArrowLeft, Plus, Minus } from "lucide-react";

const ShoppingCart = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleConfirmOrder = () => {
    alert('Order confirmed! Total: $' + totalPrice.toFixed(2));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
      <Link href="/" className="flex items-center text-blue-600 hover:underline mb-4">
        <ArrowLeft size={20} className="mr-2" />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold text-center">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-xl mt-4">Your cart is empty.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between border p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <img src={item.src} className="w-20 h-20 object-cover rounded-lg" alt={item.name} />
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p>${item.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center">
              <button
  className="bg-gray-300 text-gray-700 p-2 rounded-full hover:bg-gray-400"
  onClick={() => removeFromCart(item.id)} 
>
  <Minus size={16} />
</button>

                <span className="mx-4 text-lg">{item.quantity || 1}</span>
                <button
                  className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                  onClick={() => addToCart(item)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Total Price & Confirm Order */}
          <div className="text-center mt-6">
            <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
            <button 
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 mt-4 rounded-lg text-white text-lg font-semibold transition-all"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
