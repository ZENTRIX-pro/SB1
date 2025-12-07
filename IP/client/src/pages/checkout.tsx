import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { CreditCard, ChevronLeft, Check } from "lucide-react";
import { SiPaypal } from "react-icons/si";
import { useCart } from "@/lib/cart-context";

export default function Checkout() {
  const { items, totalPrice, clearCart, getProduct } = useCart();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const shippingCost = totalPrice >= 200 ? 0 : 15;
  const orderTotal = totalPrice + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = (method: "razorpay" | "paypal") => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (orderComplete) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-white pt-20 pb-16 px-4"
      >
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-green-600" />
          </motion.div>
          <h1 className="font-heading text-3xl font-semibold text-black mb-3">
            Order Confirmed!
          </h1>
          <p className="text-neutral-600 mb-8">
            Thank you for your purchase. Your order will be shipped within 2-3 business days.
          </p>
          <Link href="/">
            <button className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </motion.main>
    );
  }

  if (items.length === 0) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-white pt-20 pb-16 px-4"
      >
        <div className="max-w-md mx-auto text-center">
          <h1 className="font-heading text-2xl font-semibold text-black mb-3">
            Your bag is empty
          </h1>
          <p className="text-neutral-600 mb-6">
            Add some items to your bag before checking out.
          </p>
          <Link href="/">
            <button className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      </motion.main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-neutral-50 pt-16"
    >
      <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-8">
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Continue Shopping</span>
        </button>

        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-black mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl p-6">
              <h2 className="font-semibold text-black mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-black mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street, Apt 4B"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Mumbai"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Maharashtra"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h2 className="font-semibold text-black mb-4">Payment Method</h2>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handlePayment("razorpay")}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-xl font-medium text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#3395FF" }}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{isProcessing ? "Processing..." : "Pay via Razorpay"}</span>
                </button>

                <button
                  onClick={() => handlePayment("paypal")}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#FFC439", color: "#003087" }}
                >
                  <SiPaypal className="w-5 h-5" />
                  <span>{isProcessing ? "Processing..." : "Pay via PayPal"}</span>
                </button>
              </div>
              <p className="text-xs text-neutral-500 text-center mt-4">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 sticky top-20">
              <h2 className="font-semibold text-black mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;
                  return (
                    <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-black text-sm truncate">{product.name}</p>
                        <p className="text-xs text-neutral-500">
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && " | "}
                          {item.color && item.color}
                        </p>
                        <p className="text-sm text-neutral-600 mt-1">
                          Qty: {item.quantity} x ${product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-neutral-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="text-black">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="text-black">
                    {shippingCost === 0 ? "Free" : `$${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-black pt-2 border-t border-neutral-100">
                  <span>Total</span>
                  <span>${orderTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
