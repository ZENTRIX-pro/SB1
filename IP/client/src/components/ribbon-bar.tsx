import { Link, useLocation } from "wouter";
import { Smartphone, User, UserCircle, Home, Sparkles, Gift } from "lucide-react";

interface RibbonItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const ribbonItems: RibbonItem[] = [
  { icon: <User className="w-4 h-4" />, label: "Men", href: "/collections/men" },
  { icon: <UserCircle className="w-4 h-4" />, label: "Women", href: "/collections/women" },
  { icon: <Smartphone className="w-4 h-4" />, label: "Tech", href: "/collections/tech" },
  { icon: <Home className="w-4 h-4" />, label: "Home", href: "/collections/bags" },
  { icon: <Sparkles className="w-4 h-4" />, label: "Scents", href: "/collections/scents" },
  { icon: <Gift className="w-4 h-4" />, label: "Gifts", href: "/collections/jewelry" },
];

export function RibbonBar() {
  const [location] = useLocation();

  return (
    <div id="category-ribbon" className="sticky top-14 z-40 bg-transparent">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-center justify-start md:justify-center gap-1 md:gap-2 px-4 py-3 min-w-max max-w-7xl mx-auto">
          {ribbonItems.map((item) => {
            const isActive = location === item.href || location.startsWith(item.href + "/");
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "text-[#1D1D1F]"
                    : "text-[#1D1D1F]/60 hover:text-[#1D1D1F]"
                }`}
              >
                {item.icon}
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
