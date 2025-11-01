import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { authAPI } from '../lib/api/client';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const currentUser = authAPI.getUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    router.push('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-light tracking-wider text-gray-900">
          SHOPFINYRA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-sm font-medium">
              New Arrivals
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-sm font-medium">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-sm font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-sm font-medium">
              Contact
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
              <FiSearch className="w-5 h-5" />
            </button>
            <Link href="/cart" className="relative text-gray-700 hover:text-gray-900 transition-colors duration-200">
              <FiShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 hidden md:block">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200">
                  Login
                </Link>
                <Link href="/signup" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/products"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium"
                onClick={toggleMobileMenu}
              >
                New Arrivals
              </Link>
              <Link
                href="/products"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium"
                onClick={toggleMobileMenu}
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium"
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>
              {user ? (
                <>
                  <div className="px-3 py-2 text-gray-700 text-sm font-medium">
                    {user.name}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium"
                    onClick={toggleMobileMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
