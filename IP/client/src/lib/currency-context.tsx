import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

export const GLOBAL_CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.36 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.53 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 149.50 },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", rate: 7.24 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.12 },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", rate: 3.67 },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal", rate: 3.75 },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", rate: 1.34 },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar", rate: 7.82 },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc", rate: 0.88 },
  { code: "SEK", symbol: "kr", name: "Swedish Krona", rate: 10.42 },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone", rate: 10.68 },
  { code: "DKK", symbol: "kr", name: "Danish Krone", rate: 6.87 },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar", rate: 1.64 },
  { code: "ZAR", symbol: "R", name: "South African Rand", rate: 18.62 },
  { code: "MXN", symbol: "MX$", name: "Mexican Peso", rate: 17.15 },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", rate: 4.97 },
  { code: "KRW", symbol: "₩", name: "South Korean Won", rate: 1298.50 },
  { code: "THB", symbol: "฿", name: "Thai Baht", rate: 35.42 },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit", rate: 4.72 },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah", rate: 15650 },
  { code: "PHP", symbol: "₱", name: "Philippine Peso", rate: 55.82 },
  { code: "VND", symbol: "₫", name: "Vietnamese Dong", rate: 24350 },
  { code: "PLN", symbol: "zł", name: "Polish Zloty", rate: 3.98 },
  { code: "TRY", symbol: "₺", name: "Turkish Lira", rate: 29.15 },
  { code: "RUB", symbol: "₽", name: "Russian Ruble", rate: 92.50 },
  { code: "ILS", symbol: "₪", name: "Israeli Shekel", rate: 3.68 },
  { code: "EGP", symbol: "E£", name: "Egyptian Pound", rate: 30.90 },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", rate: 785 },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", rate: 153.50 },
  { code: "PKR", symbol: "Rs", name: "Pakistani Rupee", rate: 278.50 },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka", rate: 109.75 },
  { code: "QAR", symbol: "QR", name: "Qatari Riyal", rate: 3.64 },
  { code: "KWD", symbol: "KD", name: "Kuwaiti Dinar", rate: 0.31 },
  { code: "BHD", symbol: "BD", name: "Bahraini Dinar", rate: 0.38 },
  { code: "OMR", symbol: "OMR", name: "Omani Rial", rate: 0.38 },
  { code: "CLP", symbol: "CL$", name: "Chilean Peso", rate: 878.50 },
  { code: "COP", symbol: "CO$", name: "Colombian Peso", rate: 3985 },
  { code: "ARS", symbol: "AR$", name: "Argentine Peso", rate: 350.50 },
  { code: "PEN", symbol: "S/", name: "Peruvian Sol", rate: 3.72 },
];

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amount: string | number, originalCurrencyCode?: string) => string;
  convertPrice: (amount: number, fromCurrency?: string) => number;
  currencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

const CURRENCY_STORAGE_KEY = "zentrix_currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const found = GLOBAL_CURRENCIES.find(c => c.code === parsed.code);
          if (found) return found;
        } catch {}
      }
    }
    return GLOBAL_CURRENCIES[0];
  });

  const setCurrency = useCallback((newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    if (typeof window !== "undefined") {
      localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify({ code: newCurrency.code }));
    }
  }, []);

  const convertPrice = useCallback((amount: number, fromCurrency: string = "USD"): number => {
    if (fromCurrency === currency.code) return amount;
    
    const fromRate = GLOBAL_CURRENCIES.find(c => c.code === fromCurrency)?.rate || 1;
    const usdAmount = amount / fromRate;
    return usdAmount * currency.rate;
  }, [currency]);

  const formatPrice = useCallback((amount: string | number, originalCurrencyCode: string = "USD"): string => {
    let numericValue = typeof amount === "string" ? parseFloat(amount) : amount;
    
    if (isNaN(numericValue)) {
      numericValue = 0;
    }

    const convertedValue = convertPrice(numericValue, originalCurrencyCode);
    
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.code,
        minimumFractionDigits: currency.code === "JPY" || currency.code === "KRW" || currency.code === "VND" ? 0 : 2,
        maximumFractionDigits: currency.code === "JPY" || currency.code === "KRW" || currency.code === "VND" ? 0 : 2,
      }).format(convertedValue);
    } catch {
      return `${currency.symbol}${convertedValue.toFixed(2)}`;
    }
  }, [currency, convertPrice]);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        currencies: GLOBAL_CURRENCIES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
