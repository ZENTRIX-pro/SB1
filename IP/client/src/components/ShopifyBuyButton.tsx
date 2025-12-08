import { useEffect, useRef } from "react";

declare global {
  interface Window {
    ShopifyBuy?: {
      buildClient: (config: { domain: string; storefrontAccessToken: string }) => unknown;
      UI: {
        onReady: (client: unknown) => Promise<{ createComponent: (type: string, config: unknown) => void }>;
      };
    };
  }
}

interface ShopifyBuyButtonProps {
  productId?: string;
}

export function ShopifyBuyButton({ productId = "7450552172647" }: ShopifyBuyButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const scriptId = "shopify-buy-button-script";
    
    const initShopifyBuyButton = () => {
      if (!window.ShopifyBuy || !containerRef.current) return;

      const client = window.ShopifyBuy.buildClient({
        domain: "p52yuw-uq.myshopify.com",
        storefrontAccessToken: "c65b638b635b6782cc4d5a467c024378",
      });

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        if (!containerRef.current) return;
        
        ui.createComponent("product", {
          id: productId,
          node: containerRef.current,
          moneyFormat: "%24%7B%7Bamount%7D%7D",
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0",
                    "margin-bottom": "0px",
                  },
                },
                button: {
                  "font-family": "system-ui, -apple-system, sans-serif",
                  "font-weight": "500",
                  "font-size": "14px",
                  "padding-top": "14px",
                  "padding-bottom": "14px",
                  ":hover": {
                    "background-color": "#1a1a1a",
                  },
                  "background-color": "#000000",
                  ":focus": {
                    "background-color": "#1a1a1a",
                  },
                  "border-radius": "9999px",
                },
                quantityInput: {
                  "font-size": "14px",
                  "padding-top": "14px",
                  "padding-bottom": "14px",
                },
              },
              buttonDestination: "checkout",
              contents: {
                img: false,
                title: false,
                price: false,
                description: false,
                button: true,
                quantity: false,
              },
              text: {
                button: "Buy Now",
              },
            },
            productSet: {
              styles: {
                products: {
                  "@media (min-width: 601px)": {
                    "margin-left": "-20px",
                  },
                },
              },
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px",
                  },
                },
                button: {
                  "font-family": "system-ui, -apple-system, sans-serif",
                  "font-weight": "500",
                  "font-size": "14px",
                  "padding-top": "14px",
                  "padding-bottom": "14px",
                  ":hover": {
                    "background-color": "#1a1a1a",
                  },
                  "background-color": "#000000",
                  ":focus": {
                    "background-color": "#1a1a1a",
                  },
                  "border-radius": "9999px",
                },
              },
            },
            option: {},
            cart: {
              styles: {
                button: {
                  "font-family": "system-ui, -apple-system, sans-serif",
                  "font-weight": "500",
                  "font-size": "14px",
                  "padding-top": "14px",
                  "padding-bottom": "14px",
                  ":hover": {
                    "background-color": "#1a1a1a",
                  },
                  "background-color": "#000000",
                  ":focus": {
                    "background-color": "#1a1a1a",
                  },
                  "border-radius": "9999px",
                },
              },
              text: {
                total: "Subtotal",
                button: "Checkout",
              },
            },
            toggle: {
              styles: {
                toggle: {
                  "font-family": "system-ui, -apple-system, sans-serif",
                  "font-weight": "500",
                  "background-color": "#000000",
                  ":hover": {
                    "background-color": "#1a1a1a",
                  },
                  ":focus": {
                    "background-color": "#1a1a1a",
                  },
                },
              },
            },
          },
        });
      });
    };

    if (document.getElementById(scriptId)) {
      if (window.ShopifyBuy) {
        initShopifyBuyButton();
      }
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
    script.onload = initShopifyBuyButton;
    document.head.appendChild(script);

    return () => {
      initializedRef.current = false;
    };
  }, [productId]);

  return (
    <div 
      ref={containerRef} 
      id="shopify-buy-button-container"
      className="flex-1"
    />
  );
}
