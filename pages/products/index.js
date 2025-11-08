import Head from "next/head";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { productsAPI } from "../../lib/api/client";
import { FiFilter, FiGrid, FiList, FiSearch } from "react-icons/fi";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  const categories = ["All", "Murtis", "Showpieces", "Marble Decor"];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};

      if (selectedCategory !== "All") params.category = selectedCategory;
      if (sortBy === "price-low") params.sort = "price-low";
      else if (sortBy === "price-high") params.sort = "price-high";
      else params.sort = "name";

      if (searchTerm) params.search = searchTerm;

      const response = await productsAPI.getAll(params);

      if (response.success) setProducts(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to load products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm || selectedCategory !== "All" || sortBy !== "name") {
        fetchProducts();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredProducts = products.filter((product) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <Head>
        <title>Shopfinyra - Our Collection</title>
        <meta
          name="description"
          content="Browse our complete collection of handcrafted marble statues and decor pieces."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-white">
        {/* Header Section */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-wide">
              Our Collection
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Discover timeless beauty in handcrafted marble art.
            </p>
          </div>
        </div>

        {/* Filter + Search Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-gradient-to-r from-[#FBFAF8] to-[#F8F6F4] rounded-2xl py-6 px-6 mb-12 shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              
              {/* 🔍 Search Bar */}
              <div className="relative w-full max-w-sm">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-full text-sm bg-white focus:ring-1 focus:ring-gray-800 focus:border-gray-800 outline-none transition-all"
                />
              </div>

              {/* 🪶 Category Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-[#362222] text-white shadow-sm"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* ↕️ Sort Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-full px-4 py-2 text-sm bg-white focus:ring-1 focus:ring-gray-800 focus:border-gray-800 transition"
                >
                  <option value="name">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            {loading ? (
              <p className="text-gray-600">Loading products...</p>
            ) : (
              <p className="text-gray-600">
                Showing {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "item" : "items"}
              </p>
            )}
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  fetchProducts();
                }}
                className="text-gray-900 hover:text-gray-700 transition-colors duration-200"
              >
                Clear search
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="bg-[#362222] text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
