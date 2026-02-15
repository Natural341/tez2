import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "InsightFlow - Data Analysis Platform",
  description: "AI-powered data analysis and business intelligence platform. Upload your CSV and Excel files, perform powerful analyses.",
  keywords: ["data analysis", "business intelligence", "AI", "data analytics"],
  authors: [{ name: "InsightFlow" }],
  openGraph: {
    title: "InsightFlow - Data Analysis Platform",
    description: "AI-powered data analysis and business intelligence platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
