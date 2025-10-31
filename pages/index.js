import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import { featuredProducts, products } from '../lib/data';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
  // Get category counts
  const categoryCounts = {
    'Murtis': products.filter(p => p.category === 'Murtis').length,
    'Showpieces': products.filter(p => p.category === 'Showpieces').length,
    'Marble Decor': products.filter(p => p.category === 'Marble Decor').length,
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">
              Featured Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Handpicked essentials that blend form and function
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-square bg-gray-50 relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.dimensions}</p>
                  <p className="text-lg font-medium text-gray-900 mb-4">${product.price}</p>
                  <button className="w-full border border-gray-300 text-gray-900 py-2 px-4 text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            ))}
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
