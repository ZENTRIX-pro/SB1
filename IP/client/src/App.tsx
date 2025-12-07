import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/lib/cart-context";
import { products } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { CartDrawer } from "@/components/cart-drawer";
import Home from "@/pages/home";
import Category from "@/pages/category";
import Product from "@/pages/product";
import Checkout from "@/pages/checkout";
import Support from "@/pages/support";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Shipping from "@/pages/shipping";
import Careers from "@/pages/careers";
import Stores from "@/pages/stores";
import Press from "@/pages/press";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:slug" component={Category} />
      <Route path="/product/:id" component={Product} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/support" component={Support} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/shipping" component={Shipping} />
      <Route path="/careers" component={Careers} />
      <Route path="/stores" component={Stores} />
      <Route path="/press" component={Press} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <CartProvider products={products}>
            <div className="min-h-screen bg-background">
              <Navbar />
              <CartDrawer />
              <Router />
            </div>
            <Toaster />
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
