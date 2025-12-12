import { useMemo } from "react";

interface PriceDisplayProps {
  price: number | string;
  className?: string;
  showOriginal?: boolean;
}

export function PriceDisplay({ price, className = "", showOriginal = false }: PriceDisplayProps) {
  const { displayPrice, wasConverted, originalPrice } = useMemo(() => {
    const numericValue = typeof price === "string" ? parseFloat(price) : price;
    
    if (isNaN(numericValue)) {
      return { displayPrice: "$0.00", wasConverted: false, originalPrice: 0 };
    }

    if (numericValue > 500) {
      const convertedPrice = (numericValue / 84).toFixed(2);
      return { 
        displayPrice: `$${convertedPrice}`, 
        wasConverted: true, 
        originalPrice: numericValue 
      };
    }

    return { 
      displayPrice: `$${numericValue.toFixed(2)}`, 
      wasConverted: false, 
      originalPrice: numericValue 
    };
  }, [price]);

  return (
    <span className={className}>
      {displayPrice}
      {showOriginal && wasConverted && (
        <span className="ml-2 text-xs text-neutral-500 line-through">
          ₹{originalPrice.toLocaleString()}
        </span>
      )}
    </span>
  );
}

export function formatPrice(price: number | string): string {
  const numericValue = typeof price === "string" ? parseFloat(price) : price;
  
  if (isNaN(numericValue)) {
    return "$0.00";
  }

  if (numericValue > 500) {
    return `$${(numericValue / 84).toFixed(2)}`;
  }

  return `$${numericValue.toFixed(2)}`;
}
