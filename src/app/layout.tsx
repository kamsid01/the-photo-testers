import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.thephototesters.com'),
  title: "Photography Software Reviews & Comparisons | The Photo Testers",
  description: "Independent reviews of photography CRMs, client galleries, AI culling tools, schedulers, portfolio platforms and more.",
  openGraph: {
    title: "Photography Software Reviews & Comparisons | The Photo Testers",
    description: "Independent reviews of photography CRMs, client galleries, AI culling tools, schedulers, portfolio platforms and more.",
    url: '/',
    siteName: 'The Photo Testers',
    type: 'website',
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'The Photo Testers'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Photography Software Reviews & Comparisons | The Photo Testers",
    description: "Independent reviews of photography CRMs, client galleries, AI culling tools, schedulers, portfolio platforms and more.",
    images: ['/og/default.jpg'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#FAF9F6',
          color: '#20221F',
          fontFamily: "'Instrument Sans', system-ui, sans-serif",
          fontSize: '17px',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        <Header />
        <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: 'none' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
