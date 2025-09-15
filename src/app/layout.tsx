import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Onest,
  Instrument_Serif,
  Inter,
  Space_Mono,
  Manrope,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "ShadII",
  description: "ShadII - Real Time Shader Generator",

  // Basic SEO
  keywords: ["ShadII", "web app", "next.js", "react", "webgl", "typescript"],
  authors: [{ name: "Your Name" }],
  creator: "Astar",
  publisher: "Astar",

  // Viewport and mobile
  viewport: "width=device-width, initial-scale=1",

  // Icons
  icons: {
    icon: "/logo.png", // standard favicon
    shortcut: "/logo.png", // for browsers
    apple: "/logo.png", // Apple touch icon
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/logo.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/logo.png",
      },
    ],
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shadii-generator.vercel.app",
    title: "ShadII",
    description: "ShadII - Real Time Shader Generator",
    siteName: "ShadII",
    images: [
      {
        url: "https://shadii-generator.vercel.app/graph.png", // 1200x630px recommended
        width: 1200,
        height: 630,
        alt: "ShadII - Real Time Shader Generator",
      },
      {
        url: "https://shadii-generator.vercel.app/graph.png", // Square version
        width: 1200,
        height: 1200,
        alt: "ShadII - Real Time Shader Generator",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "ShadII",
    description: "ShadII - Real Time Shader Generator",
    creator: "@astarcodes",
    site: "@your_site_handle",
    images: [
      {
        url: "https://shadii-generator.vercel.app/graph.png", // 1200x675px recommended
        alt: "ShadII - Real Time Shader Generator",
      },
    ],
  },

  // Additional meta tags
  other: {
    // Theme color for mobile browsers
    "theme-color": "#000000",

    // Microsoft tile color
    "msapplication-TileColor": "#000000",
    "msapplication-TileImage": "/logo.png",

    // Apple mobile web app
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "ShadII",

    // Additional social/SEO tags

    // Pinterest
    "pinterest-rich-pin": "true",

    // Google+

    // Bing

    // Yandex

    // Additional Twitter tags
    "twitter:label1": "Written by",
    "twitter:data1": "astarcodes",
    "twitter:label2": "Est. reading time",
    "twitter:data2": "3 minutes",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  alternates: {
    canonical: "https://your-domain.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${instrumentSerif.variable} ${manrope.variable} ${spaceMono.variable} ${onest.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
