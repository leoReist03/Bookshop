import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/app/ui/navbar/navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Howler Books",
  description: "Here you can browse through books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Navbar />
        <div className="grid grid-cols-9">
          <div className="col-start-2 col-span-7">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
