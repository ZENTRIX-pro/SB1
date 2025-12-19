import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, Search, User, ShoppingBag, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { fetchMenuWithCollectionImages, fetchCollectionByHandle, ShopifyMenuItem, ShopifyProduct } from "@/lib/shopify";

interface MegaMenuCategory {
  title: string;
  links: { label: string; href: string }[];
}

const fallbackMenuCategories: MegaMenuCategory[] = [
  {
    title: "Collections",
    links: [
      { label: "Men's Collection", href: "/collections/men" },
      { label: "Women's Collection", href: "/collections/women" },
      { label: "Accessories", href: "/collections/all-accessories" },
      { label: "Active", href: "/collections/active" },
      { label: "Scents", href: "/collections/scents" },
    ]
  },
  {
    title: "Discover",
    links: [
      { label: "New Arrivals", href: "/collections/new" },
      { label: "Trending Now", href: "/collections/trending" },
      { label: "Gift Guide", href: "/collections/gifts" },
      { label: "Heritage Edition", href: "/heritage" },
    ]
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Stores", href: "/stores" },
      { label: "Contact", href: "/contact" },
      { label: "Support", href: "/support" },
    ]
  }
];

export function ZentrixNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<ShopifyMenuItem[]>([]);
  const [hoveredItem, setHoveredItem] = useState<ShopifyMenuItem | null>(null);
  const [previewProduct, setPreviewProduct] = useState<ShopifyProduct | null>(null);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const { items, openCart } = useCart();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const items = await fetchMenuWithCollectionImages("main-menu");
        if (items && items.length > 0) {
          setMenuItems(items);
        }
      } catch (error) {
        console.error("Error loading menu:", error);
      }
      setIsLoadingMenu(false);
    };
    loadMenu();
  }, []);

  useEffect(() => {
    const loadPreviewProduct = async () => {
      if (hoveredItem?.collectionHandle) {
        try {
          const { products } = await fetchCollectionByHandle(hoveredItem.collectionHandle);
          if (products.length > 0) {
            setPreviewProduct(products[0]);
          }
        } catch (error) {
          console.error("Error loading preview product:", error);
        }
      }
    };
    loadPreviewProduct();
  }, [hoveredItem]);

  const visibleMenuItems = menuItems.filter(item => {
    if (item.productCount !== undefined && item.productCount === 0) {
      return false;
    }
    return true;
  });

  const handleMenuMouseEnter = () => {
    setIsMegaMenuOpen(true);
  };

  const handleMenuMouseLeave = () => {
    setIsMegaMenuOpen(false);
    setHoveredItem(null);
    setPreviewProduct(null);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-black/5 shadow-sm">
        <div className="flex items-center justify-between h-14 px-4 md:px-8 max-w-7xl mx-auto">
          <div 
            className="relative"
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
          >
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-[#1D1D1F]/70 hover:text-[#1D1D1F] transition-colors md:hidden"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              className="hidden md:flex p-2 text-[#1D1D1F]/70 hover:text-[#1D1D1F] transition-colors items-center gap-1"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
              <span className="text-sm font-medium">Menu</span>
            </button>

            <AnimatePresence>
              {isMegaMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="hidden md:block absolute left-0 top-full pt-2"
                  style={{ width: '600px' }}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden">
                    <div className="flex">
                      <div className="w-1/2 p-6 border-r border-black/5">
                        <h3 className="text-xs uppercase tracking-[0.2em] text-[#1D1D1F]/40 font-medium mb-4">
                          Collections
                        </h3>
                        <ul className="space-y-2">
                          {visibleMenuItems.length > 0 ? (
                            visibleMenuItems.map((item) => (
                              <li key={item.id}>
                                <Link
                                  href={item.url.replace(/^https?:\/\/[^/]+/, '')}
                                  onClick={() => setIsMegaMenuOpen(false)}
                                  onMouseEnter={() => setHoveredItem(item)}
                                  className="flex items-center justify-between py-2 px-3 rounded-lg text-[#1D1D1F]/80 hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-all group"
                                >
                                  <span className="text-sm font-medium">{item.title}</span>
                                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                              </li>
                            ))
                          ) : (
                            fallbackMenuCategories[0].links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  onClick={() => setIsMegaMenuOpen(false)}
                                  className="flex items-center justify-between py-2 px-3 rounded-lg text-[#1D1D1F]/80 hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-all group"
                                >
                                  <span className="text-sm font-medium">{link.label}</span>
                                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>

                      <div className="w-1/2 p-6 bg-[#FAFAFA]">
                        {previewProduct ? (
                          <div className="h-full flex flex-col">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#1D1D1F]/40 font-medium mb-3">
                              Featured
                            </p>
                            <div className="flex-1 relative rounded-xl overflow-hidden mb-3">
                              <img
                                src={previewProduct.images[0]?.src || "https://placehold.co/300x400?text=Product"}
                                alt={previewProduct.title}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                            <h4 className="font-medium text-[#1D1D1F] text-sm line-clamp-1">
                              {previewProduct.title}
                            </h4>
                            <p className="text-[#1D1D1F]/60 text-xs mt-1">
                              ${parseFloat(previewProduct.variants[0]?.price.amount || "0").toFixed(2)}
                            </p>
                          </div>
                        ) : hoveredItem?.collectionImage ? (
                          <div className="h-full flex flex-col">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#1D1D1F]/40 font-medium mb-3">
                              {hoveredItem.title}
                            </p>
                            <div className="flex-1 relative rounded-xl overflow-hidden">
                              <img
                                src={hoveredItem.collectionImage}
                                alt={hoveredItem.title}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center text-[#1D1D1F]/30">
                            <p className="text-sm">Hover over a category</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-black/5 p-4 bg-white">
                      <div className="flex gap-6 justify-center">
                        <Link href="/about" onClick={() => setIsMegaMenuOpen(false)} className="text-xs text-[#1D1D1F]/60 hover:text-[#1D1D1F] transition-colors">
                          Our Story
                        </Link>
                        <Link href="/stores" onClick={() => setIsMegaMenuOpen(false)} className="text-xs text-[#1D1D1F]/60 hover:text-[#1D1D1F] transition-colors">
                          Stores
                        </Link>
                        <Link href="/contact" onClick={() => setIsMegaMenuOpen(false)} className="text-xs text-[#1D1D1F]/60 hover:text-[#1D1D1F] transition-colors">
                          Contact
                        </Link>
                        <Link href="/support" onClick={() => setIsMegaMenuOpen(false)} className="text-xs text-[#1D1D1F]/60 hover:text-[#1D1D1F] transition-colors">
                          Support
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl md:text-2xl font-semibold tracking-[0.2em] text-[#1D1D1F]">
              ZENTRIX
            </h1>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#1D1D1F]/70 hover:text-[#1D1D1F] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/account" className="p-2 text-[#1D1D1F]/70 hover:text-[#1D1D1F] transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => openCart()}
              className="relative p-2 text-[#1D1D1F]/70 hover:text-[#1D1D1F] transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-[#1D1D1F] text-white rounded-full font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-black/5 overflow-hidden bg-white/90 backdrop-blur-xl"
            >
              <div className="p-4 max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search ZENTRIX..."
                  className="w-full bg-[#F5F5F7] border border-black/10 rounded-full px-5 py-3 text-[#1D1D1F] placeholder:text-[#1D1D1F]/40 focus:outline-none focus:ring-2 focus:ring-[#1D1D1F]/20"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-[70] w-full max-w-md bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-black/5">
                <h2 className="text-xl font-semibold tracking-[0.15em] text-[#1D1D1F]">
                  ZENTRIX
                </h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-[#1D1D1F]/60 hover:text-[#1D1D1F] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                {visibleMenuItems.length > 0 ? (
                  <>
                    <div className="mb-8">
                      <h3 className="text-xs uppercase tracking-[0.2em] text-[#1D1D1F]/40 font-medium mb-4">
                        Collections
                      </h3>
                      <ul className="space-y-1">
                        {visibleMenuItems.map((item) => (
                          <li key={item.id}>
                            <Link
                              href={item.url.replace(/^https?:\/\/[^/]+/, '')}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-4 py-3 text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors"
                            >
                              {item.collectionImage && (
                                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                  <img
                                    src={item.collectionImage}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <span className="text-lg font-medium">{item.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-black/5 pt-6">
                      <h3 className="text-xs uppercase tracking-[0.2em] text-[#1D1D1F]/40 font-medium mb-4">
                        About
                      </h3>
                      <ul className="space-y-3">
                        <li><Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-lg text-[#1D1D1F]/80 hover:text-[#1D1D1F]">Our Story</Link></li>
                        <li><Link href="/stores" onClick={() => setIsMenuOpen(false)} className="text-lg text-[#1D1D1F]/80 hover:text-[#1D1D1F]">Stores</Link></li>
                        <li><Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg text-[#1D1D1F]/80 hover:text-[#1D1D1F]">Contact</Link></li>
                        <li><Link href="/support" onClick={() => setIsMenuOpen(false)} className="text-lg text-[#1D1D1F]/80 hover:text-[#1D1D1F]">Support</Link></li>
                      </ul>
                    </div>
                  </>
                ) : (
                  fallbackMenuCategories.map((category) => (
                    <div key={category.title} className="mb-8">
                      <h3 className="text-xs uppercase tracking-[0.2em] text-[#1D1D1F]/40 font-medium mb-4">
                        {category.title}
                      </h3>
                      <ul className="space-y-3">
                        {category.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="block text-lg text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
