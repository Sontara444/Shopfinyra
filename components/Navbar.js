"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiUser, FiHeart } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "../lib/api/client";

const Navbar = () => {
  const { getTotalItems } = useCart();
  const { items: wishlist } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const updateUser = () => {
      const currentUser = authAPI.getUser();
      setUser(currentUser);
    };
    updateUser();
    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    router.push("/");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-light tracking-wider text-gray-900">
            SHOPFINYRA
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
              New Arrivals
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
           

            {/* ❤️ Wishlist Icon */}
            <Link href="/wishlist" className="relative text-gray-700 hover:text-gray-900 transition">
              <FiHeart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* 🛒 Cart Icon */}
            <Link href="/cart" className="relative text-gray-700 hover:text-gray-900 transition">
              <FiShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* 👤 User Avatar */}
            {user ? (
              <div className="relative group">
                <button className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </button>
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">{user.name || "Account"}</div>
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Profile</Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Orders</Link>
                  <Link href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Wishlist</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="flex items-center text-gray-700 hover:text-gray-900">
                <FiUser className="w-5 h-5" />
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button onClick={toggleMobileMenu} className="md:hidden p-2 text-gray-700 hover:text-gray-900">
              {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
