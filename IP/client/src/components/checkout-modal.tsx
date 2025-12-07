import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Smartphone } from "lucide-react";
import { FaPaypal } from "react-icons/fa";
import { useCart } from "@/lib/cart-context";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { totalPrice, clearCart } = useCart();

  const handlePayment = (method: string) => {
    alert(`Processing payment with ${method}...\nTotal: $${totalPrice.toLocaleString()}\n\nThis is a demo. In production, you would be redirected to the payment provider.`);
    clearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                <h2 className="text-lg font-semibold text-black">
                  Checkout
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-neutral-500 hover:text-black transition-colors rounded-full hover:bg-neutral-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6 text-center">
                  <p className="text-sm text-neutral-500 mb-1">Total Amount</p>
                  <p className="text-3xl font-semibold text-black">
                    ${totalPrice.toLocaleString()}
                  </p>
                </div>

                <p className="text-sm text-neutral-500 mb-4">
                  Select payment method
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => handlePayment("PayPal")}
                    className="w-full flex items-center gap-4 p-4 bg-[#0070BA] hover:bg-[#005ea6] text-white rounded-2xl transition-colors"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <FaPaypal className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">PayPal</p>
                      <p className="text-xs text-white/70">Pay with your PayPal account</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handlePayment("Credit Card")}
                    className="w-full flex items-center gap-4 p-4 bg-black hover:bg-neutral-800 text-white rounded-2xl transition-colors"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Credit Card</p>
                      <p className="text-xs text-white/70">Visa, Mastercard, American Express</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handlePayment("UPI / Razorpay")}
                    className="w-full flex items-center gap-4 p-4 bg-[#528FF0] hover:bg-[#3d7be0] text-white rounded-2xl transition-colors"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">UPI / Razorpay</p>
                      <p className="text-xs text-white/70">Pay with UPI, Wallets, or Net Banking</p>
                    </div>
                  </button>
                </div>

                <p className="text-xs text-neutral-400 text-center mt-6">
                  Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
