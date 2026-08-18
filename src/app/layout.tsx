import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import { Navbar } from "@/components/navigation/navbar";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displayFont = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CloudWeb — Intelligent Software, AI & Cybersecurity",
  description: "CloudWeb builds intelligent software systems, AI agents, LLM applications and secure digital infrastructure.",
};

// Single dark theme site-wide — no OS-preference branch, no toggle.
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0a0908",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} antialiased`}>
      <body className="bg-bg text-text">
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
