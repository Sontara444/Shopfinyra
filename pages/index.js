import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { productsAPI } from "../lib/api/client";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FiShoppingCart } from "react-icons/fi";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { items: wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Featured
      const featuredResponse = await productsAPI.getAll({
        featured: "true",
        limit: 4,
      });
      if (featuredResponse.success) {
        setFeaturedProducts(featuredResponse.data || []);
      }

      // All products
      const allResponse = await productsAPI.getAll();
      if (allResponse.success) {
        setAllProducts(allResponse.data || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const categoryCounts = {
    Murtis: allProducts.filter((p) => p.category === "Murtis").length,
    Showpieces: allProducts.filter((p) => p.category === "Showpieces").length,
    "Marble Decor": allProducts.filter((p) => p.category === "Marble Decor").length,
  };

  return (
    <>
      <Head>
        <title>ShopFinyra - Timeless Marble Artistry</title>
        <meta
          name="description"
          content="Handcrafted murtis and showpieces that bring divine elegance to your space."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[78vh] sm:h-[86vh] w-full">
        <Image
          src="/products/hero.png"
          alt="Marble statues hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white/40" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center">
          <div className="max-w-4xl pt-4">
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-wide">
              Timeless Marble Artistry
            </h1>
            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto font-light">
              Handcrafted murtis and showpieces that bring divine elegance to your space.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center bg-gray-900 text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Explore Collection
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 🌟 Featured Collection */}
      <section className="py-24 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-16">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-wide">
              Featured Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Discover our handpicked selection of marble artistry
            </p>
          </div>

          {/* Products */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading featured products...</p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => {
                const productId = product._id || product.id;
                const isWishlisted = wishlist.some(
                  (item) => item._id === productId || item.id === productId
                );

                return (
                  <div
                    key={productId}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transform transition-all duration-700 hover:scale-[1.03] hover:shadow-lg hover:shadow-gray-200"
                  >
                    {/* 🖼️ Image + Wishlist */}
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      {/* Image */}
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
                        sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                      />

                      {/* ✨ Warm Brown Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#362222]/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"></div>

                      {/* ❤️ Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <FiHeart
                          className={`w-5 h-5 transition-all duration-300 ${
                            isWishlisted
                              ? "text-red-500 fill-red-500"
                              : "text-gray-400 hover:text-red-500"
                          }`}
                        />
                      </button>
                    </div>

                    {/* 🪷 Product Info */}
                    <div className="p-5">
                      {/* Category */}
                      <span className="inline-block text-xs uppercase tracking-wide bg-gray-100 text-gray-600 px-3 py-1 rounded-full mb-3">
                        {product.category}
                      </span>

                      {/* Name */}
                      <h3 className="text-lg font-medium text-gray-900 mb-2 transition-colors duration-300 hover:text-[#362222]">
                        {product.name}
                      </h3>

                      {/* Dimensions + Material */}
                      {(product.dimensions || product.material) && (
                        <p className="text-sm text-gray-500 mb-2">
                          {product.dimensions}
                          {product.dimensions && product.material ? " • " : ""}
                          {product.material}
                        </p>
                      )}

                      {/* Price + Add to Cart */}
                      <div className="flex items-center justify-between mt-3">
                        <p
                          className="text-[1.35rem] font-light text-gray-900 tracking-wide"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>

                        <button
                          onClick={() => addToCart(product)}
                          className="bg-[#362222] text-white py-2 px-4 rounded-md text-sm font-medium 
  flex items-center justify-center gap-2 
  transform transition-all duration-500 
  hover:bg-[#5A2300] hover:scale-110"
                        >
                          <FiShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No featured products available</p>
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-16">
            <Link
              href="/products"
              className="inline-block border border-gray-900 text-gray-900 px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-900 hover:text-white transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 bg-[#F4F2F0]">
        <div className="max-w-6xl mx-auto px-8 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Discover your next favorite piece
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <div
                key={category}
                className="bg-white p-14  text-center hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-2xl font-light text-gray-900 mb-2">{category}</h3>
                <p className="text-gray-600 mb-6">{count} items</p>
                <button className="border border-gray-900 text-gray-900 py-2 px-6 text-sm font-medium hover:bg-[#362222] hover:text-white transition-colors duration-200">
                  Browse
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">Stay Updated</h2>
          <p className="text-lg text-gray-600 mb-8 font-light">
            Subscribe to receive updates on new arrivals and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900"
            />
            <button className="bg-gray-900 text-white px-6 py-3 font-medium hover:bg-gray-800 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
