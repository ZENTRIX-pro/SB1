import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { 
    isOpen, 
    closeCart, 
    items, 
    removeItem, 
    updateQuantity, 
    totalPrice, 
    getProduct,
    totalItems,
    addItem
  } = useCart();

  const hasMembership = items.some(item => {
    const product = getProduct(item.productId);
    return product?.name.toLowerCase().includes("zentrix black") || product?.name.toLowerCase().includes("membership");
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            data-testid="cart-backdrop"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl"
            data-testid="cart-drawer"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  <h2 className="text-lg font-light tracking-wide text-foreground">
                    Your Bag ({totalItems})
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeCart}
                  className="p-2 text-muted-foreground"
                  data-testid="button-close-cart"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-6" strokeWidth={1} />
                    <p className="text-lg font-light text-foreground mb-2">Your bag is empty</p>
                    <p className="text-sm text-muted-foreground">
                      Add items to begin your journey
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    <AnimatePresence mode="popLayout">
                      {items.map((item) => {
                        const product = getProduct(item.productId);
                        if (!product) return null;

                        return (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex gap-4"
                            data-testid={`cart-item-${item.id}`}
                          >
                            {/* Product Image */}
                            <div className="w-24 h-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-foreground truncate">
                                {product.name}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {item.size && `Size: ${item.size}`}
                                {item.size && item.color && " / "}
                                {item.color && `${item.color}`}
                              </p>
                              <p className="text-sm font-medium text-foreground mt-2">
                                ${product.price.toLocaleString()}
                              </p>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3 mt-3">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground"
                                  data-testid={`button-decrease-${item.id}`}
                                >
                                  <Minus className="w-3 h-3" />
                                </motion.button>
                                <span className="text-sm font-medium text-foreground w-6 text-center">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground"
                                  data-testid={`button-increase-${item.id}`}
                                >
                                  <Plus className="w-3 h-3" />
                                </motion.button>
                              </div>
                            </div>

                            {/* Remove Button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground self-start"
                              data-testid={`button-remove-${item.id}`}
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-border px-6 py-6 space-y-4">
                  {/* Membership Status */}
                  {hasMembership && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-lg p-4 border border-[#D4AF37]/50"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">👑</span>
                        <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wide">
                          VIP Member Applied
                        </h3>
                      </div>
                      <p className="text-xs text-[#D4AF37]/80 mt-2">
                        Enjoy priority access & lifetime free shipping!
                      </p>
                    </motion.div>
                  )}

                  {/* Membership Upsell Banner */}
                  {!hasMembership && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-black to-[#1a1a1a] rounded-lg p-4 border border-[#D4AF37]/30"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🚀</span>
                          <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wide">
                            Get Free Shipping & VIP Status?
                          </h3>
                        </div>
                        <p className="text-xs text-white/90">
                          ZENTRIX BLACK gives you priority access & lifetime free shipping.
                        </p>
                        <Button
                          onClick={() => {
                            window.location.href = "/products/zentrix-black-membership";
                          }}
                          className="w-full bg-[#D4AF37] text-black hover:bg-[#E8C547] font-bold text-xs uppercase tracking-wide"
                          size="sm"
                        >
                          Add Membership +
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="text-lg font-light text-foreground">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Shipping and taxes calculated at checkout
                  </p>

                  {/* Checkout Button */}
                  <Button
                    className="w-full"
                    size="lg"
                    data-testid="button-checkout"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
