"use client";

import "./globals.css";

import { Inter } from "next/font/google";

import * as React from "react";

import AuthProvider from "@/context/AuthProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="flex justify-center items-start min-h-screen">
            <div className="h-screen w-screen flex justify-center items-center">
              <div className="container mx-auto px-4 text-center">
                {children}
              </div>
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
