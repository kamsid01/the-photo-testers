import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.thephototesters.com'),
  title: "Photography Software Reviews & Comparisons | The Photo Testers",
  description: "Independent, hands-on reviews of photography CRMs, client galleries, AI culling tools, schedulers, portfolio platforms and more.",
  openGraph: {
    title: "Photography Software Reviews & Comparisons | The Photo Testers",
    description: "Independent, hands-on reviews of photography CRMs, client galleries, AI culling tools, schedulers, portfolio platforms and more.",
    url: '/',
    siteName: 'The Photo Testers',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Photography Software Reviews & Comparisons | The Photo Testers",
    description: "Independent, hands-on reviews of photography CRMs, client galleries, AI culling tools, schedulers, portfolio platforms and more.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-bg text-ink text-[18px] leading-[1.7]">
        {children}
      </body>
    </html>
  );
}
