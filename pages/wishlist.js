"use client";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const { items: wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-light mb-4">Your wishlist is empty 💔</h2>
        <Link href="/products" className="text-blue-600 hover:underline">
          Browse Products
        </Link>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-light text-gray-900 mb-10 text-center">
        Your Wishlist ❤️
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={300}
              height={300}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
            <p className="text-gray-600 mb-3">{item.category}</p>
            <p className="font-bold text-gray-900 mb-4">₹{item.price}</p>

            <div className="flex gap-2">
              <button
                onClick={() => addToCart(item)}
                className="flex-1 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="flex-1 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
