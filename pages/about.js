import Head from "next/head";
import Image from "next/image";
import { FiStar, FiHeart, FiShield, FiUsers, FiAward } from "react-icons/fi";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Shopfinyra</title>
        <meta
          name="description"
          content="Learn about our mission to bring timeless marble artistry to modern minimalist lifestyles."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-white">
        {/* Hero Section */}
        <div className="py-20 bg-gradient-to-b from-[#F4F2F0] to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
                Our <span className="font-medium">Mission</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light mb-8">
                Crafting divine beauty in marble for over three generations
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-lg text-gray-600">
                  <p>
                    Sacred Statues was founded in 2001 by Rajesh Kumar, a spiritual seeker who
                    recognized the need for authentic, high-quality religious statues in the Western
                    world. What started as a small collection of handpicked pieces has grown into
                    one of the most trusted sources for sacred artifacts.
                  </p>
                  <p>
                    Each statue in our collection is carefully selected for its craftsmanship,
                    spiritual significance, and ability to bring peace and prosperity to your home.
                    We work directly with master artisans and temple communities to ensure
                    authenticity and proper blessings.
                  </p>
                  <p>
                    Our mission is simple: to help you create a sacred space in your home where you
                    can connect with the divine, find inner peace, and experience the spiritual
                    benefits of having authentic religious artifacts.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="relative h-[300px] md:h-[500px] lg:h-[650px] w-full">
                  <Image
                    src="/products/about-01.png"
                    alt="Our founder with sacred statues"
                    fill
                    className="object-cover rounded-lg shadow-xl"
                  />
                </div>

                <div className="absolute inset-0 bg-gray-900/10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-[#F4F2F0] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These core principles guide everything we do, from selecting statues to serving our
                customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiStar className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Authenticity</h3>
                <p className="text-gray-600">
                  Every statue is verified for authenticity and proper blessings
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiHeart className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Spiritual Care</h3>
                <p className="text-gray-600">
                  We treat each statue with the reverence and respect it deserves
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiShield className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Quality</h3>
                <p className="text-gray-600">
                  Only the finest materials and craftsmanship make it to our collection
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUsers className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Community</h3>
                <p className="text-gray-600">
                  Supporting artisans and temple communities worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our dedicated team of spiritual advisors and customer service specialists are here
                to help you find the perfect statue.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍💼</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Rajesh Kumar</h3>
                <p className="text-gray-900 font-medium mb-2">Founder & CEO</p>
                <p className="text-gray-600">
                  Spiritual seeker with 20+ years of experience in sacred artifacts
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👩‍💼</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Priya Sharma</h3>
                <p className="text-gray-900 font-medium mb-2">Spiritual Advisor</p>
                <p className="text-gray-600">
                  Temple priestess helping customers choose the right statues
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍🔧</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Amit Patel</h3>
                <p className="text-gray-900 font-medium mb-2">Quality Assurance</p>
                <p className="text-gray-600">Ensuring every statue meets our high standards</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-4xl font-bold mb-2">20+</div>
                <div className="text-lg">Years of Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-lg">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-lg">Sacred Statues</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-lg">Temple Partners</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
