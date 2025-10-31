import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { getProductById } from '../../lib/data';
import { FiShoppingCart, FiHeart, FiStar, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const images = [
    product.image,
    product.image, // In a real app, you'd have multiple images
    product.image,
  ];

  return (
    <>
      <Head>
        <title>{product.name} - Sacred Statues</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-white">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-900">Home</Link>
              <span className="text-gray-400">/</span>
              <Link href="/products" className="text-gray-500 hover:text-gray-900">Products</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200">
                  <FiHeart className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                      selectedImage === index ? 'border-gray-900' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">(4.9) 127 reviews</span>
                  </div>
                  <span className="text-sm text-gray-500">Category: {product.category}</span>
                </div>
                <p className="text-lg text-gray-600">{product.description}</p>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                  <span className="text-sm text-green-600 font-medium">In Stock</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-50 transition-colors duration-200"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-gray-50 transition-colors duration-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={handleAddToCart}
                      disabled={isAdding}
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                        isAdding
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      <span>{isAdding ? 'Added to Cart!' : 'Add to Cart'}</span>
                    </button>
                    <button className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors duration-200">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Material:</span>
                    <span className="ml-2 text-gray-600">{product.material}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Dimensions:</span>
                    <span className="ml-2 text-gray-600">{product.dimensions}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Weight:</span>
                    <span className="ml-2 text-gray-600">{product.weight}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Category:</span>
                    <span className="ml-2 text-gray-600">{product.category}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose This Statue</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <FiShield className="w-5 h-5 text-gray-900" />
                    <span className="text-sm text-gray-600">Handcrafted with premium materials</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiStar className="w-5 h-5 text-gray-900" />
                    <span className="text-sm text-gray-600">Timeless minimalist design</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiTruck className="w-5 h-5 text-gray-900" />
                    <span className="text-sm text-gray-600">Carefully packaged for safe delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Link 
              href="/products" 
              className="inline-flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors duration-200"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
