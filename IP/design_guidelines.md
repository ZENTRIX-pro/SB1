# ZENTRIX E-Commerce Design Guidelines

## Design Approach: Apple-Inspired Premium Aesthetic
Following the ultra-premium visual language of Apple's official website with edge-to-edge imagery, generous whitespace, and sophisticated minimalism.

## Typography System
- **Primary Font:** Inter or SF Pro Display (thin/light weights for body, bold for headlines)
- **Headline Sizes:** Extremely large (text-6xl to text-8xl) with font-weight 300-400
- **Body Text:** text-base to text-lg with font-weight 300
- **Whitespace:** Generous line-height (leading-relaxed to leading-loose)
- **Hierarchy:** Minimal text, maximum impact - let visuals dominate

## Layout Architecture

### Homepage Structure
1. **Hero Section:** Full-screen (100vh) video/image slider with brand slogan "Define Your Future" - massive typography overlaid on cinematic visuals
2. **Bento Grid Showcase:** Asymmetric grid layout displaying 5 product categories with massive background images (similar to Apple's product showcase grids)
3. **New Arrivals:** Horizontal scrolling section with smooth momentum scrolling
4. **Footer:** Minimal, clean footer with essential links

### Product Detail Page
- Split layout: Sticky image gallery (50% width, left side) with scrollable product details (50% width, right side)
- Large product imagery with zoom capability
- Clean purchase interface with size/color selectors

## Component Design

### Glassmorphism Navbar
- Sticky positioned with backdrop-blur-xl effect
- Semi-transparent background (bg-white/70 or bg-black/50)
- Links: Men | Women | Footwear | Accessories | Search icon | Bag icon
- Minimal height (h-16) with clean typography

### Cart Drawer
- Slides in from right side (full-height overlay)
- Glassmorphism backdrop with blur effect
- Smooth Framer Motion slide animation
- Clean product list with quantity controls

### Bento Grid Categories
Display these 5 collections with varied sizes in asymmetric grid:
- ZENTRIX Men (Luxury Suits, Minimalist Jackets, Premium Shirts)
- ZENTRIX Women (Elegant Evening Wear, Chic Dresses)
- Z-Footwear (High-end Sneakers & Leather Boots)
- Leather & Carry (Luxury Handbags, Backpacks, Wallets)
- Z-Lifestyle (Premium Tech Accessories, Smart Rings, Minimalist Decor)

## Spacing System
Use Tailwind's generous spacing: py-20, py-32, gap-8, gap-12 for premium breathing room

## Animation Strategy (Framer Motion - Critical)
- **Page Loads:** Smooth fade-in effects (opacity 0 to 1)
- **Scroll Interactions:** Parallax effects on hero images
- **Hover States:** Subtle zoom effects (scale 1 to 1.05) on product cards
- **Cart Drawer:** Slide-in animation from right
- **Hero Slider:** Smooth crossfade transitions between slides

## Images
**Hero Section:** Full-bleed, cinematic lifestyle imagery or video loop showcasing premium lifestyle (models in ZENTRIX apparel, elegant environments)

**Bento Grid:** Each category needs a large, high-quality background image:
- Men: Sophisticated suit/jacket close-up or lifestyle shot
- Women: Elegant dress or evening wear editorial-style
- Footwear: Premium sneaker/boot product photography with dramatic lighting
- Leather & Carry: Luxury bag detail shots
- Lifestyle: Tech accessories in minimalist settings

**Product Cards:** Clean product photography on neutral backgrounds, Apple-style

## Interactive Elements
- Buttons on hero images: Frosted-glass blur backgrounds (backdrop-blur-md bg-white/20)
- Primary CTAs: Minimal, thin border buttons or solid dark buttons
- Product cards: Subtle hover lift effect with shadow
- Navigation: Smooth scroll behavior

## Mock Data Structure
15 premium products (3 per category):
- Naming: "ZENTRIX [Product Name]" (e.g., "ZENTRIX AirFlow Sneaker", "ZENTRIX Noir Tote")
- Price Range: $150 - $800 USD
- High-quality product descriptions emphasizing craftsmanship and exclusivity

## Mobile Responsiveness
- Bento Grid: Converts to single-column stacked layout on mobile
- Horizontal scrolls: Touch-friendly with momentum scrolling
- Navbar: Hamburger menu on mobile with full-screen overlay
- Product page: Stacked layout (image gallery above details)

## Color Palette (Minimal)
Focus on imagery with neutral UI tones - specific colors to be defined by brand assets, but maintain Apple's restraint with mostly white/black/gray UI elements allowing products to shine.