import { motion } from "framer-motion";
import { Link } from "wouter";
import { User, Mail, Lock, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Footer } from "@/components/footer";

export default function Account() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "https://p52yuw-uq.myshopify.com/account";
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pt-14 bg-white min-h-screen"
      data-testid="page-account"
    >
      <div className="max-w-md mx-auto px-4 py-12">
        <Link href="/">
          <span className="inline-flex items-center gap-1.5 text-blue-600 text-sm hover:underline cursor-pointer mb-8 block">
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </span>
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
            <User className="w-8 h-8 text-neutral-600" />
          </div>
          <h1 className="text-2xl font-semibold text-black mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-neutral-600 text-sm">
            {isLogin
              ? "Sign in to access your account"
              : "Join ZENTRIX for exclusive access"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-black text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-neutral-600 hover:text-black transition-colors"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
          <p className="text-xs text-neutral-500">
            By continuing, you agree to ZENTRIX's Terms of Service and Privacy
            Policy
          </p>
        </div>
      </div>

      <Footer />
    </motion.main>
  );
}
