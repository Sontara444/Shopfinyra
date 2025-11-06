import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../lib/api/client';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch featured products
      const featuredResponse = await productsAPI.getAll({ featured: 'true', limit: 4 });
      if (featuredResponse.success) {
        setFeaturedProducts(featuredResponse.data || []);
      }

      // Fetch all products for category counts
      const allResponse = await productsAPI.getAll();
      if (allResponse.success) {
        setAllProducts(allResponse.data || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get category counts
  const categoryCounts = {
    'Murtis': allProducts.filter(p => p.category === 'Murtis').length,
    'Showpieces': allProducts.filter(p => p.category === 'Showpieces').length,
    'Marble Decor': allProducts.filter(p => p.category === 'Marble Decor').length,
  };

  return (
    <>
      <Head>
        <title>Minimalist - Timeless Marble Artistry</title>
        <meta name="description" content="Handcrafted murtis and showpieces that bring divine elegance to your space." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section with background image */}
      <section className="relative h-[78vh] sm:h-[86vh] w-full">
        {/* Background image */}
        <Image
          src="/products/hero.png"
          alt="Marble statues hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white/40" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-wide">
              Timeless Marble Artistry
            </h1>
            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto font-light">
              Handcrafted murtis and showpieces that bring divine elegance to your space.
            </p>
            <Link href="/products" className="inline-flex items-center bg-gray-900 text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors duration-200">
              Explore Collection
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

    {/* Featured Collection */}
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-5xl font-light text-gray-900 mb-4 tracking-wide">
        Featured Collection
      </h2>
      <p className="text-lg text-gray-600 font-light">
        Discover our handpicked selection of marble artistry
      </p>
    </div>

    {/* Products Grid */}
    {loading ? (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading featured products...</p>
      </div>
    ) : featuredProducts.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {featuredProducts.map((product) => (
          <div
            key={product._id || product.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover object-center"
                sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
              />
              {/* Heart Icon */}
              <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.014-4.5-4.5-4.5a4.491 
                    4.491 0 00-3.621 1.77A4.491 4.491 0 009.257 
                    3.75C6.772 3.75 4.757 5.765 4.757 
                    8.25c0 7.02 7.743 11.778 7.743 
                    11.778S21 15.27 21 8.25z"
                  />
                </svg>
              </button>
            </div>

            {/* Product Details */}
            <div className="p-6 text-center">
              <span className="inline-block text-xs font-medium uppercase tracking-wide bg-gray-100 text-gray-600 px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>

              <h3 className="text-lg font-normal text-gray-900 mb-2 leading-snug">
                {product.name}
              </h3>

              <div className="text-sm text-gray-600 mb-4 space-x-1">
                {product.dimensions && (
                  <span>{product.dimensions}</span>
                )}
                {product.dimensions && product.color && <span>•</span>}
                {product.color && <span>{product.color}</span>}
              </div>

              <p className="text-lg font-medium text-gray-900 mb-5">
                ₹{product.price}
              </p>

              <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 
                    5M7 13l-2 9h14l-2-9M10 21a1 1 0 100-2 
                    1 1 0 000 2zm8 0a1 1 0 100-2 
                    1 1 0 000 2z"
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Discover your next favorite piece
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <div key={category} className="bg-white p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-light text-gray-900 mb-2">{category}</h3>
                <p className="text-gray-600 mb-6">{count} items</p>
                <button className="border border-gray-900 text-gray-900 py-2 px-6 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors duration-200">
                  Browse
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">
            Stay Updated
          </h2>
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
