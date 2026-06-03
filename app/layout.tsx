import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Serrure Intelligente Maroc | SmartLock Store Casablanca",
  description:
    "Achetez les meilleures serrures intelligentes au Maroc. Empreinte digitale, WiFi, Bluetooth. Paiement à la livraison (COD). Livraison gratuite partout au Maroc.",
  keywords: [
    "serrure intelligente",
    "serrure intelligente maroc",
    "smart lock morocco",
    "serrure biométrique",
    "contrôle d'accès maroc",
    "sécurité maison",
    "COD maroc",
    "serrure wifi",
    "serrure porte",
  ],
  openGraph: {
    title: "Serrure Intelligente Maroc | SmartLock Store",
    description:
      "Achetez les meilleures serrures intelligentes au Maroc. Empreinte digitale, WiFi, Bluetooth. Paiement à la livraison (COD). Livraison gratuite.",
    type: "website",
    locale: "fr_MA",
    url: "https://smartlock.ma",
    siteName: "SmartLock Maroc",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serrure Intelligente Maroc",
    description: "Les meilleures serrures intelligentes avec paiement à la livraison au Maroc.",
  },
  alternates: {
    canonical: "https://smartlock.ma",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "SmartLock Maroc",
              "image": "https://smartlock.ma/logo.png",
              "@id": "https://smartlock.ma",
              "url": "https://smartlock.ma",
              "telephone": "+212682192641",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Agadir",
                "addressLocality": "Agadir",
                "addressRegion": "Souss-Massa",
                "postalCode": "80000",
                "addressCountry": "MA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 30.4278,
                "longitude": -9.5981
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "19:00"
              },
              "priceRange": "$$"
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
