# Sacred Statues E-commerce Website

A beautiful, spiritual e-commerce website for God statues built with Next.js (Pages Router) and Tailwind CSS.

## Features

- 🏠 **Homepage** with featured statues and spiritual messaging
- 🛍️ **Product Catalog** with filtering and search functionality
- 📱 **Product Details** with image gallery and detailed information
- 🛒 **Shopping Cart** with quantity management and checkout
- 📱 **Responsive Design** optimized for all devices
- 🎨 **Spiritual Aesthetic** with saffron and gold color scheme
- ⚡ **Fast Performance** with Next.js optimization

## Tech Stack

- **Framework**: Next.js 13.5.6 (Pages Router)
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **State Management**: React Context API
- **Language**: JavaScript (TypeScript ready)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation bar
│   ├── Footer.js       # Footer component
│   ├── ProductCard.js  # Product card component
│   └── CartDrawer.js   # Shopping cart drawer
├── context/            # React Context
│   └── CartContext.js # Cart state management
├── lib/               # Utilities and data
│   └── data.js        # Product data
├── pages/             # Next.js pages
│   ├── index.js       # Homepage
│   ├── products/      # Product pages
│   ├── cart.js        # Shopping cart
│   ├── about.js       # About page
│   └── contact.js     # Contact page
└── styles/           # Global styles
    └── globals.css   # Tailwind CSS imports
```

## Key Features

### 🏠 Homepage
- Hero section with spiritual messaging
- Featured products showcase
- Company values and mission
- Call-to-action buttons

### 🛍️ Product Catalog
- Grid/list view toggle
- Category filtering
- Search functionality
- Price sorting
- Responsive product cards

### 📱 Product Details
- Image gallery with thumbnails
- Detailed product information
- Quantity selector
- Add to cart functionality
- Related products

### 🛒 Shopping Cart
- Cart item management
- Quantity updates
- Price calculations
- Checkout process
- Persistent storage

### 🎨 Design System
- Saffron and gold color palette
- Spiritual-inspired typography
- Smooth animations and transitions
- Mobile-first responsive design
- Accessibility features

## Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
- Saffron: `#FF9933`
- Gold: `#FFD700`
- Spiritual Gold: `#B8860B`

### Products
Add or modify products in `lib/data.js`:
```javascript
export const products = [
  {
    id: 1,
    name: "Product Name",
    description: "Product description",
    price: 99.99,
    image: "image-url",
    category: "Category",
    featured: true,
    // ... other properties
  }
];
```

## Deployment

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

3. **Deploy to Vercel** (Recommended)
   ```bash
   npx vercel
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact us at info@sacredstatues.com

---

Made with ❤️ for spiritual seekers worldwide.
