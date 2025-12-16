import { useCurrency } from "@/lib/currency-context";

interface PriceDisplayProps {
  price: number | string;
  className?: string;
  showOriginal?: boolean;
  currencyCode?: string;
}

export function PriceDisplay({ price, className = "", showOriginal = false, currencyCode = "USD" }: PriceDisplayProps) {
  const { formatPrice } = useCurrency();
  
  const displayPrice = formatPrice(price, currencyCode);

  return (
    <span className={className}>
      {displayPrice}
    </span>
  );
}

export function formatPriceStatic(price: number | string): string {
  const numericValue = typeof price === "string" ? parseFloat(price) : price;
  
  if (isNaN(numericValue)) {
    return "$0.00";
  }

  if (numericValue > 500) {
    return `$${(numericValue / 84).toFixed(2)}`;
  }

  return `$${numericValue.toFixed(2)}`;
}
