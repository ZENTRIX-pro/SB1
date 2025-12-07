import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Package, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
  items: { name: string; quantity: number; price: number }[];
}

const mockOrders: Order[] = [
  {
    id: "ZNT-001",
    customer: "John Smith",
    email: "john@example.com",
    total: 1280,
    status: "delivered",
    date: "2024-12-05",
    items: [
      { name: "ZENTRIX Noir Tailored Suit", quantity: 1, price: 795 },
      { name: "ZENTRIX Essential Jacket", quantity: 1, price: 485 }
    ]
  },
  {
    id: "ZNT-002",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    total: 750,
    status: "shipped",
    date: "2024-12-06",
    items: [
      { name: "ZENTRIX Aurora Evening Gown", quantity: 1, price: 750 }
    ]
  },
  {
    id: "ZNT-003",
    customer: "Michael Chen",
    email: "michael@example.com",
    total: 820,
    status: "processing",
    date: "2024-12-07",
    items: [
      { name: "ZENTRIX AirFlow Sneaker", quantity: 1, price: 395 },
      { name: "ZENTRIX Velvet Wrap Dress", quantity: 1, price: 425 }
    ]
  },
  {
    id: "ZNT-004",
    customer: "Emily Davis",
    email: "emily@example.com",
    total: 570,
    status: "pending",
    date: "2024-12-07",
    items: [
      { name: "ZENTRIX Titan Smart Ring", quantity: 1, price: 395 },
      { name: "ZENTRIX Signature Wallet", quantity: 1, price: 175 }
    ]
  }
];

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "zentrix_boss") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      default: return "bg-neutral-100 text-neutral-800";
    }
  };

  if (!isLoggedIn) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-neutral-50 flex items-center justify-center px-4"
      >
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="font-heading text-2xl font-semibold text-center text-black mb-2">
              Admin Access
            </h1>
            <p className="text-neutral-500 text-center text-sm mb-8">
              Enter your credentials to access the admin panel
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black pr-12"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-medium rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </motion.main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-neutral-50 pt-20 pb-16 px-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-black">Orders Dashboard</h1>
            <p className="text-neutral-500 mt-1">Manage and track all customer orders</p>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-black transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-neutral-500 text-sm">Total Orders</p>
            <p className="font-heading text-3xl font-semibold text-black">{mockOrders.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-neutral-500 text-sm">Pending</p>
            <p className="font-heading text-3xl font-semibold text-yellow-600">
              {mockOrders.filter(o => o.status === "pending").length}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-neutral-500 text-sm">Processing</p>
            <p className="font-heading text-3xl font-semibold text-blue-600">
              {mockOrders.filter(o => o.status === "processing").length}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-neutral-500 text-sm">Revenue</p>
            <p className="font-heading text-3xl font-semibold text-green-600">
              ${mockOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100">
            <h2 className="font-semibold text-black flex items-center gap-2">
              <Package className="w-5 h-5" />
              Recent Orders
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Order ID</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Total</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-black">{order.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-black">{order.customer}</p>
                        <p className="text-neutral-500 text-sm">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">{order.date}</td>
                    <td className="px-6 py-4 font-medium text-black">${order.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status === "delivered" && <CheckCircle className="w-3 h-3" />}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-sm text-black font-medium hover:text-neutral-600 transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-black text-lg">Order {selectedOrder.id}</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-neutral-400 hover:text-black"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-neutral-500 text-sm">Customer</p>
                  <p className="text-black font-medium">{selectedOrder.customer}</p>
                  <p className="text-neutral-600 text-sm">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-neutral-500 text-sm mb-2">Items</p>
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm py-1">
                      <span className="text-black">{item.name} × {item.quantity}</span>
                      <span className="text-neutral-600">${item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-neutral-100 flex justify-between">
                  <span className="font-semibold text-black">Total</span>
                  <span className="font-semibold text-black">${selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full mt-6 py-3 bg-black text-white font-medium rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </motion.main>
  );
}
