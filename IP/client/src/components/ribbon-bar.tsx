import { Link, useLocation } from "wouter";
import { Smartphone, User, UserCircle, Home, Globe, Gift } from "lucide-react";

interface RibbonItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isScroll?: boolean;
}

const ribbonItems: RibbonItem[] = [
  { icon: <Smartphone className="w-4 h-4" />, label: "Tech", href: "/collections/tech" },
  { icon: <User className="w-4 h-4" />, label: "Men", href: "/collections/men" },
  { icon: <UserCircle className="w-4 h-4" />, label: "Women", href: "/collections/women" },
  { icon: <Home className="w-4 h-4" />, label: "Home", href: "/collections/bags" },
  { icon: <Globe className="w-4 h-4" />, label: "World", href: "#world-map-section", isScroll: true },
  { icon: <Gift className="w-4 h-4" />, label: "Gifts", href: "/collections/jewelry" },
];

export function RibbonBar() {
  const [location] = useLocation();

  const handleClick = (item: RibbonItem, e: React.MouseEvent) => {
    if (item.isScroll) {
      e.preventDefault();
      const element = document.getElementById("world-map-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="sticky top-16 z-40 bg-neutral-950/95 backdrop-blur-sm border-b border-white/5">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-center justify-start md:justify-center gap-1 px-2 py-2 min-w-max">
          {ribbonItems.map((item) => {
            const isActive = location === item.href || location.startsWith(item.href + "/");
            
            if (item.isScroll) {
              return (
                <button
                  key={item.label}
                  onClick={(e) => handleClick(item, e)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                    isActive
                      ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            }
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                  isActive
                    ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
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
