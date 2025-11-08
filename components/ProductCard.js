"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);

  const productId = product._id || product.id;
  const inWishlist = isInWishlist(productId);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden 
      shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 
      group"
    >
      {/* 🖼 Product Image */}
      <Link href={`/products/${productId}`}>
        <div className="relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-80 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* ❤️ Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full 
            shadow-md hover:scale-110 transition-all duration-300"
            title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <FiHeart
              className={`w-5 h-5 ${
                inWishlist ? "text-red-500 fill-red-500" : "text-gray-700"
              }`}
            />
          </button>
        </div>
      </Link>

      {/* 🧾 Product Info */}
      <div className="p-5 space-y-2">
        {/* Category Tag */}
        {product.category && (
          <span className="inline-block text-xs font-medium text-gray-700 bg-gray-100 rounded-full px-3 py-1">
            {product.category}
          </span>
        )}

        {/* Product Name */}
        <Link href={`/products/${productId}`}>
          <h3
            className="text-lg font-medium text-gray-900 line-clamp-1 
            group-hover:text-[#362222] transition-colors duration-300"
          >
            {product.name}
          </h3>
        </Link>

        {/* Dimensions & Material */}
        <p className="text-sm text-gray-600">
          {product.dimensions && <span>{product.dimensions}</span>}
          {product.dimensions && product.material && (
            <span className="mx-2 text-gray-400">•</span>
          )}
          {product.material && <span>{product.material}</span>}
        </p>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between pt-3">
          <p
            className="text-lg font-semibold text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium 
            transition-all duration-300 ${
              isAdding
                ? "bg-green-100 text-green-700"
                : "bg-[#362222] text-white hover:bg-gray-800"
            }`}
          >
            <FiShoppingCart className="w-4 h-4" />
            {isAdding ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
