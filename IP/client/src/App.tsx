import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/lib/cart-context";
import { ShopifyProvider } from "@/lib/shopify-context";
import { AuthProvider } from "@/lib/auth-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { products } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { ZDrawingLoader } from "@/components/z-drawing-loader";
import { CartDrawer } from "@/components/cart-drawer";
import { LimitedDropBar } from "@/components/limited-drop-bar";
import Home from "@/pages/home";
import Category from "@/pages/category";
import Product from "@/pages/product";
import Heritage from "@/pages/heritage";
import Support from "@/pages/support";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Shipping from "@/pages/shipping";
import Careers from "@/pages/careers";
import Stores from "@/pages/stores";
import Press from "@/pages/press";
import NotFound from "@/pages/not-found";
import Account from "@/pages/account";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import HeritageStory from "@/pages/story/heritage";
import FutureTechStory from "@/pages/story/future-tech";
import GentlemanStory from "@/pages/story/gentleman";
import MuseStory from "@/pages/story/muse";
import SignatureStory from "@/pages/story/signature";
import Returns from "@/pages/returns";
import TrackOrder from "@/pages/track-order";

// Hardcoded Membership Landing Page
function MembershipLanding() {
  const handleJoinNow = () => {
    // Direct checkout without needing cart context
    window.location.href = '/checkout?membership=zentrix-black&price=9.99';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-5xl font-bold text-[#D4AF37] mb-8 text-center">ZENTRIX BLACK Membership</h1>
        
        <div className="space-y-6 mb-12 bg-white/5 rounded-2xl p-8 border border-white/20">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🚀</span>
            <div>
              <p className="font-semibold text-[#D4AF37] mb-2">Limited Offer</p>
              <p className="text-white/80">First 500 Members Only. Founding membership with exclusive lifetime benefits.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-3xl">💰</span>
            <div>
              <p className="font-semibold text-[#D4AF37] mb-2">Instant Benefit</p>
              <p className="text-white/80">Get $20 OFF on orders over $70 immediately after joining.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <span className="text-3xl">✅</span>
            <div>
              <p className="font-semibold text-[#D4AF37] mb-2">Auto-Coupon</p>
              <p className="text-white/80">Code <span className="font-mono font-bold">ZENTRIXBLACK</span> applied automatically to every order.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <button onClick={handleJoinNow} className="bg-[#D4AF37] text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-[#E8C547] transition-all w-full md:w-auto">
            Join Now - $9.99
          </button>
          <p className="text-white/50 text-sm">Secure checkout • Instant access</p>
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:slug" component={Category} />
      <Route path="/collections/:slug" component={Category} />
      <Route path="/product/:id" component={Product} />
      <Route path="/products/zentrix-black-membership" component={MembershipLanding} />
      <Route path="/heritage" component={Heritage} />
      <Route path="/support" component={Support} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/shipping" component={Shipping} />
      <Route path="/careers" component={Careers} />
      <Route path="/stores" component={Stores} />
      <Route path="/press" component={Press} />
      <Route path="/returns" component={Returns} />
      <Route path="/track-order" component={TrackOrder} />
      <Route path="/story/heritage" component={HeritageStory} />
      <Route path="/story/future-tech" component={FutureTechStory} />
      <Route path="/story/gentleman" component={GentlemanStory} />
      <Route path="/story/muse" component={MuseStory} />
      <Route path="/story/signature" component={SignatureStory} />
      <Route path="/account" component={Account} />
      <Route path="/login" component={Account} />
      <Route path="/signup" component={Account} />
      <Route path="/register" component={Account} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <CurrencyProvider>
            <ShopifyProvider>
              <AuthProvider>
                <CartProvider products={products}>
                  {isLoading && <ZDrawingLoader onComplete={() => setIsLoading(false)} />}
                  <div className="min-h-screen bg-white">
                    <LimitedDropBar />
                    <Navbar />
                    <CartDrawer />
                    <Router />
                  </div>
                  <Toaster />
                </CartProvider>
              </AuthProvider>
            </ShopifyProvider>
          </CurrencyProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
