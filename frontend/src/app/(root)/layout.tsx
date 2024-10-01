import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/utils/cn";
import LeftSidebar from "@/components/shared/left-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Taste of Yesterday",
  description: "A blog about food and recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('flex h-screen p-4 space-x-4 bg-primary-100', inter.className)}>
        <LeftSidebar />
        {children}
        </body>
    </html>
  );
}
