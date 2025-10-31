import Link from 'next/link';
import { FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Automatically get current year

  return (
    <footer className="bg-[#F4F2F0] text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-light tracking-wider text-gray-900 mb-4">
              SHOPFINYRA
            </h3>
            <p className="text-gray-600 mb-6 max-w-md font-light">
              Blending tradition with modern artistry.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Follow Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Follow</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  <FiInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  <FiTwitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-600 text-sm">
                © {currentYear} SHOPFINYRA. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
