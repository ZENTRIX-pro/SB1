# ZENTRIX E-Commerce Platform

## Overview

ZENTRIX is an ultra-premium luxury e-commerce platform inspired by Apple's design philosophy. The platform showcases high-end fashion, footwear, jewelry, and lifestyle accessories with a focus on sophisticated minimalism, generous whitespace, and cinematic imagery. The application features a responsive design optimized for both mobile and desktop experiences, with smooth animations and premium interactions throughout.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and optimized production builds
- **Routing:** Wouter for lightweight client-side routing
- **Styling:** Tailwind CSS with custom design tokens following Apple-inspired aesthetics
- **UI Components:** Radix UI primitives with shadcn/ui component library
- **Animations:** Framer Motion for premium micro-interactions and page transitions
- **Carousel:** Embla Carousel for hero sliders and product showcases
- **State Management:** React Context API for cart functionality

**Design System:**
- Custom typography using Inter, Playfair Display, and Cinzel fonts
- Glassmorphism effects with backdrop-blur for navigation
- Generous spacing system (py-20, py-32, gap-8, gap-12)
- Apple-inspired color scheme with neutral tones and high contrast
- Responsive breakpoints: mobile-first with md (768px) and lg (1024px) breakpoints

**Key Frontend Features:**
- Client-side data management via `client/src/lib/data.ts` for optimal performance
- React Context (`cart-context.tsx`) for shopping cart state management
- Responsive hero carousel with separate mobile/desktop implementations
- Horizontal scrolling category sections
- Product detail pages with split-screen layout (sticky image gallery + scrollable details)
- Checkout flow with mock payment integration (Razorpay and PayPal buttons)
- Full mobile drawer navigation with smooth animations

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with Express.js framework
- **Language:** TypeScript with ESNext module system
- **ORM:** Drizzle ORM configured for PostgreSQL
- **Session Management:** express-session with connect-pg-simple for PostgreSQL session store
- **Build Process:** esbuild for server bundling, Vite for client bundling

**API Structure:**
The backend provides RESTful endpoints ready for database integration:
- `GET /api/products` - Retrieve all products
- `GET /api/products/new` - Fetch new arrivals
- `GET /api/products/:id` - Get single product by ID
- `GET /api/products/category/:category` - Filter products by category
- `GET /api/categories` - Retrieve all categories
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove cart item

**Data Layer Design:**
- In-memory storage implementation (`MemStorage` class) for MVP functionality
- Interface-based storage design (`IStorage`) enabling easy swap to PostgreSQL
- Schema definitions using Zod for runtime validation
- Drizzle ORM configuration prepared for PostgreSQL migration

**Architectural Decisions:**
1. **Client-side data for MVP:** Products and categories stored in `client/src/lib/data.ts` with bundled image assets for fast initial load and zero database dependencies
2. **Backend APIs ready but unused:** Full CRUD endpoints implemented to enable seamless transition to persistent storage when needed
3. **Interface-based storage:** `IStorage` interface allows switching from `MemStorage` to database implementation without changing API routes

### Data Storage Design

**Current Implementation:**
- Static product catalog in TypeScript (`client/src/lib/data.ts`)
- In-memory cart state via React Context
- Session data ready for PostgreSQL via connect-pg-simple

**Database Schema (Prepared):**
- Drizzle schema defined in `shared/schema.ts`
- Product categories: men, women, footwear, leather, lifestyle, beauty, tech, jewelry
- Product fields: id, name, description, price, category, image, isNew, sizes[], colors[]
- Cart items: id, productId, quantity, size, color
- Categories: id, name, slug, description, image

**Migration Path:**
- PostgreSQL database configured via `DATABASE_URL` environment variable
- Drizzle migrations directory: `./migrations`
- Schema-to-database sync via `npm run db:push`

### Product Categories

The platform features 8 distinct luxury product categories:
1. **ZENTRIX Men** - Luxury suits, minimalist jackets, premium shirts
2. **ZENTRIX Women** - Elegant evening wear, chic dresses
3. **Z-Footwear** - High-end sneakers and leather boots (men's)
4. **Women's Footwear** - Designer heels and luxury footwear
5. **Leather & Carry** - Luxury handbags, backpacks, wallets
6. **Z-Lifestyle** - Premium tech accessories, smart rings, minimalist decor
7. **Beauty & Wellness** - Premium skincare and luxury beauty products
8. **Tech & Innovation** - High-end tech gadgets and lifestyle technology

## External Dependencies

### Third-Party UI Libraries
- **Radix UI:** Headless component primitives (accordion, dialog, dropdown, popover, select, tabs, toast, tooltip)
- **shadcn/ui:** Pre-styled component library built on Radix UI
- **class-variance-authority:** Utility for component variant management
- **clsx & tailwind-merge:** Conditional className utilities

### Animation & Interaction
- **Framer Motion:** Production-grade animation library for React
- **Embla Carousel:** Lightweight carousel with touch/mouse drag support

### Data Management
- **@tanstack/react-query:** Server state management (configured for future API integration)
- **Zod:** Runtime type validation and schema definition
- **drizzle-zod:** Bridge between Drizzle ORM and Zod schemas

### Form Management
- **React Hook Form:** Performant form library
- **@hookform/resolvers:** Zod integration for form validation

### Payment Integration (Mock)
- Razorpay button (color: #3395FF)
- PayPal button (color: #FFC439)
- Note: Payment flows are demonstration-only in current implementation

### Development Tools
- **@replit/vite-plugin-runtime-error-modal:** Development error overlay
- **@replit/vite-plugin-cartographer:** Development tooling
- **PostCSS with Autoprefixer:** CSS processing
- **TypeScript:** Static type checking across entire codebase

### Asset Management
- Product images stored in `attached_assets/generated_images/`
- Path alias `@assets` configured in Vite for asset imports
- All product imagery bundled with application for optimal performance