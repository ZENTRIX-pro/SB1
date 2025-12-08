import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/lib/cart-context";
import { ShopifyProvider } from "@/lib/shopify-context";
import { products } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { CartDrawer } from "@/components/cart-drawer";
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
import HeritageStory from "@/pages/story/heritage";
import FutureTechStory from "@/pages/story/future-tech";
import GentlemanStory from "@/pages/story/gentleman";
import MuseStory from "@/pages/story/muse";
import SignatureStory from "@/pages/story/signature";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:slug" component={Category} />
      <Route path="/collections/:slug" component={Category} />
      <Route path="/product/:id" component={Product} />
      <Route path="/heritage" component={Heritage} />
      <Route path="/support" component={Support} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/shipping" component={Shipping} />
      <Route path="/careers" component={Careers} />
      <Route path="/stores" component={Stores} />
      <Route path="/press" component={Press} />
      <Route path="/story/heritage" component={HeritageStory} />
      <Route path="/story/future-tech" component={FutureTechStory} />
      <Route path="/story/gentleman" component={GentlemanStory} />
      <Route path="/story/muse" component={MuseStory} />
      <Route path="/story/signature" component={SignatureStory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <ShopifyProvider>
            <CartProvider products={products}>
              <div className="min-h-screen bg-background">
                <Navbar />
                <CartDrawer />
                <Router />
              </div>
              <Toaster />
            </CartProvider>
          </ShopifyProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
