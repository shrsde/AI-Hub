import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ExplainTool } from "@/components/ExplainTool";
import { SearchModal } from "@/components/SearchModal";
import { CheatSheet } from "@/components/CheatSheet";

export const metadata: Metadata = {
  title: "AI Hub — Claude for Absolute Beginners",
  description:
    "Everything you need to go from 'what is Claude Code?' to running parallel AI agents across your projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <ExplainTool />
        <SearchModal />
        <CheatSheet />
      </body>
    </html>
  );
}
