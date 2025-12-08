# ZENTRIX E-Commerce Website

## Overview
ZENTRIX is an ultra-premium luxury lifestyle e-commerce website inspired by Apple's design philosophy. The site features a flagship shopping experience for premium fashion, exclusive footwear, beauty, technology, and high-end lifestyle accessories.

## Current State
The MVP is complete with full frontend functionality:
- **Responsive Hero Carousel** - Mobile (h-[75vh] with swipe) and Desktop (center-mode 60% active slide)
- Glassmorphism navigation with frosted-glass effect
- **Category Scroll** horizontal scrolling categories
- New Arrivals horizontal scroll section
- **Trending Now** section with featured products
- **Heritage Edition** split-screen section with Indian heritage theme
- **Trust Badges** for customer confidence
- Product detail pages with split layout
- Cart drawer with add/remove/update functionality
- Checkout page with Razorpay and PayPal payment buttons
- Contact, About, Shipping, and Support pages

## Recent Changes (December 2024)
- **Shopify Storefront API Integration** - Products now sync automatically from Shopify
- **Direct-to-Checkout Flow** - Buy Now button redirects directly to Shopify checkout with quantity
- **Image Gallery** - Product pages show all images from Shopify with navigation
- **Premium Quantity Selector** - Gold-bordered quantity selector on product pages
- **Loading States** - Beautiful skeleton loaders while fetching Shopify data
- Fixed mobile category slider with large premium circles and gold borders
- Fixed "Write a Review" modal to be responsive on mobile (90% width, centered)
- Created new Hero.tsx with separate Embla instances for mobile/desktop carousels
- Added Heritage Edition section with bg-stone-900 and split layout
- Restructured homepage: Hero -> CategoryScroll -> NewArrivals -> TrendingSection -> HeritageEdition -> TrustBadges -> Footer
- Refactored ProductCard to remove buttons (entire card is clickable)
- Updated Checkout page with Razorpay (#3395FF) and PayPal (#FFC439) buttons
- Updated mobile drawer links: Home, Shop, Heritage, Support
- Updated Footer with Facebook and Instagram social links
- Added routes: /about, /contact, /shipping

## Shopify Integration

**Your Shopify Admin Panel IS your dashboard.** Add products in Shopify, and they appear on the website automatically.

### Configuration
- **Domain:** `p52yuw-uq.myshopify.com`
- **Storefront Access Token:** Configured in `lib/shopify.ts`

### How It Works
1. Products are fetched from Shopify Storefront API on page load
2. New Arrivals and Trending sections display your Shopify products
3. Product detail pages show all images from Shopify
4. "Buy Now" button redirects to Shopify checkout with selected quantity
5. Changes in Shopify Admin reflect immediately on the website

### Files
- `lib/shopify.ts` - Shopify client and API functions
- `lib/shopify-context.tsx` - React context for global product state
- `components/product-skeleton.tsx` - Loading state components

## Architecture

### Frontend (Primary)
The frontend operates with client-side data for optimal performance:
- **Data Source**: `client/src/lib/data.ts` - Contains product catalog and categories with bundled image assets
- **Cart State**: `client/src/lib/cart-context.tsx` - React context for cart management
- **Routing**: wouter for client-side navigation
- **Animations**: Framer Motion for premium interactions
- **Carousel**: Embla Carousel for hero sliders

### Backend (Ready for Persistence)
Backend APIs are implemented and ready for when persistence is needed:
- `GET /api/products` - All products
- `GET /api/products/new` - New arrivals
- `GET /api/products/:id` - Single product
- `GET /api/products/category/:category` - Products by category
- `GET /api/categories` - All categories
- `POST/PATCH/DELETE /api/cart` - Cart CRUD operations

## Project Structure
```
client/src/
├── components/
│   ├── navbar.tsx           # Glassmorphism navigation
│   ├── cart-drawer.tsx      # Sliding cart drawer
│   ├── hero.tsx             # Responsive carousel (mobile + desktop)
│   ├── category-scroll.tsx  # Horizontal scrolling categories
│   ├── new-arrivals.tsx     # Horizontal scroll products
│   ├── trending-section.tsx # Trending products grid
│   ├── heritage-edition.tsx # Heritage theme section
│   ├── trust-badges.tsx     # Customer trust indicators
│   ├── product-card.tsx     # Clickable product card (no buttons)
│   ├── mobile-drawer.tsx    # Mobile navigation drawer
│   ├── footer.tsx           # Site footer with social links
│   └── theme-provider.tsx   # Dark/light mode
├── pages/
│   ├── home.tsx             # Homepage with all sections
│   ├── category.tsx         # Category listing
│   ├── product.tsx          # Product detail
│   ├── checkout.tsx         # Checkout with payment buttons
│   ├── contact.tsx          # Contact page (email + live chat)
│   ├── about.tsx            # About page
│   ├── shipping.tsx         # Shipping info page
│   └── support.tsx          # Support page
├── lib/
│   ├── data.ts              # Product/category data
│   └── cart-context.tsx     # Cart state management
└── App.tsx                  # Main application with routes

server/
├── routes.ts                # API endpoints
├── storage.ts               # In-memory storage
└── index.ts                 # Express server

shared/
└── schema.ts                # TypeScript types & Zod schemas
```

## Design System
Following Apple-inspired premium aesthetics:
- Inter font family for modern typography
- Generous whitespace and breathing room
- Center-mode carousel on desktop with partial adjacent slides visible
- Glassmorphism effects (navbar, cart)
- Enhanced hover effects with image scale
- Neutral color palette (black/white/gray/stone)
- Edge-to-edge imagery

## Running the Application
The application runs on port 5000 with:
```
npm run dev
```

## Contact Information
- Email: shop.with.zentrix@gmail.com
- Social: Facebook and Instagram (hardcoded in footer)

## Future Enhancements
- Stripe/Razorpay payment integration (connector available)
- User authentication
- Search functionality with filters
- Wishlist/favorites
- Order history and tracking
