import { motion } from "framer-motion";
import { Link, useLocation, useSearch } from "wouter";
import { User, Mail, Lock, ChevronLeft, AlertCircle, Check, LogOut, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { Footer } from "@/components/footer";
import { useAuth } from "@/lib/auth-context";


function AuthenticatedView() {
  const { customer, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
          <User className="w-10 h-10 text-amber-700" />
        </div>
        <h1 className="text-2xl font-semibold text-black mb-1">
          Welcome, {customer?.firstName || "Member"}
        </h1>
        <p className="text-neutral-600 text-sm">{customer?.email}</p>
      </div>

      <div className="bg-neutral-50 rounded-2xl p-6 space-y-4">
        <h2 className="font-medium text-black">Account Details</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Email</span>
            <span className="text-black">{customer?.email}</span>
          </div>
          {customer?.firstName && (
            <div className="flex justify-between">
              <span className="text-neutral-600">First Name</span>
              <span className="text-black">{customer.firstName}</span>
            </div>
          )}
          {customer?.lastName && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Last Name</span>
              <span className="text-black">{customer.lastName}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <Link href="/orders">
          <span className="block w-full py-3.5 text-center bg-black text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors cursor-pointer">
            View Orders
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3.5 border border-neutral-200 text-neutral-700 rounded-xl font-medium hover:bg-neutral-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

function LoginForm({ initialEmail = "" }: { initialEmail?: string }) {
  const { login } = useAuth();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await login(email, password);

    if (!result.success) {
      setError(result.error || "Login failed");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-black mb-1.5">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-1.5">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full pl-11 pr-12 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-black text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}

function RegisterForm({ initialEmail = "" }: { initialEmail?: string }) {
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (password.length < 5) {
      setError("Password must be at least 5 characters");
      setIsLoading(false);
      return;
    }

    const result = await register(email, password, firstName, lastName);

    if (!result.success) {
      setError(result.error || "Registration failed");
    } else {
      setSuccess(true);
    }

    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-black mb-2">Account Created!</h2>
        <p className="text-neutral-600 text-sm">
          Welcome to ZENTRIX. You are now signed in.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-black mb-1.5">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1.5">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-1.5">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-1.5">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 5 characters"
            className="w-full pl-11 pr-12 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-black text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}

export default function Account() {
  const { isAuthenticated, isLoading } = useAuth();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString || "");
  const emailFromUrl = params.get("email") || "";
  const showSignup = params.get("signup") === "true";
  
  const [isLogin, setIsLogin] = useState(!showSignup);

  useEffect(() => {
    if (showSignup) {
      setIsLogin(false);
    }
  }, [showSignup]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
          <span className="inline-flex items-center gap-1.5 text-neutral-600 text-sm hover:text-black cursor-pointer mb-8 block transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </span>
        </Link>

        {isAuthenticated ? (
          <AuthenticatedView />
        ) : (
          <>
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

            {isLogin ? <LoginForm initialEmail={emailFromUrl} /> : <RegisterForm initialEmail={emailFromUrl} />}

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
          </>
        )}
      </div>

      <Footer />
    </motion.main>
  );
}
