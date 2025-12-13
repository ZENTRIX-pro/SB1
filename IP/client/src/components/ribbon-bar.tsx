import { Link, useLocation } from "wouter";

interface RibbonCategory {
  name: string;
  link: string;
  image: string;
}

const categories: RibbonCategory[] = [
  {
    name: "Men",
    link: "/collections/men",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Women",
    link: "/collections/women",
    image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Active",
    link: "/collections/active",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Beauty",
    link: "/collections/beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Tech",
    link: "/collections/tech",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Home",
    link: "/collections/home",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Scents",
    link: "/collections/fragrances",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Gifts",
    link: "/collections/gifts",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=300&q=80"
  }
];

export function RibbonBar() {
  const [location] = useLocation();

  return (
    <div id="category-ribbon" className="sticky top-14 z-40 bg-transparent">
      <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex items-center justify-start md:justify-center gap-6 md:gap-8 px-4 py-4 min-w-max max-w-7xl mx-auto">
          {categories.map((category) => {
            const isActive = location === category.link || location.startsWith(category.link + "/");
            
            return (
              <Link
                key={category.name}
                href={category.link}
              >
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden transition-transform duration-300 ${
                    isActive 
                      ? "ring-2 ring-[#1D1D1F] ring-offset-2" 
                      : "group-hover:scale-110"
                  }`}>
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className={`text-xs font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-[#1D1D1F]"
                      : "text-[#1D1D1F]/70 group-hover:text-[#1D1D1F]"
                  }`}>
                    {category.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
