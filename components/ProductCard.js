"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);

  const productId = product._id || product.id;
  const productForCart = { ...product, id: productId };
  const inWishlist = isInWishlist(productId);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(productForCart);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    toggleWishlist(productForCart);
  };

  return (
    <div className="product-card group" key={productId}>
      <Link href={`/products/${productId}`}>
        <div className="relative overflow-hidden rounded-lg mb-4">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* ❤️ Wishlist Button */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleWishlistToggle}
              className="bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <FiHeart
                className={`w-5 h-5 transition-colors duration-200 ${
                  inWishlist
                    ? "text-red-500 fill-red-500"
                    : "text-gray-600 hover:text-red-500"
                }`}
              />
            </button>
          </div>
        </div>
      </Link>

      <div className="space-y-2">
        <Link href={`/products/${productId}`}>
          <h3 className="font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
              isAdding
                ? "bg-green-100 text-green-700"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            <FiShoppingCart className="w-4 h-4" />
            <span>{isAdding ? "Added!" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
