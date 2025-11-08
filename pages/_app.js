import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head"; // ✅ Import Head

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* ✅ Elegant serif font for price */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </>
  );
}

export default MyApp;
