import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayush Dubey — Full Stack & MERN Stack Developer",
  description:
    "Portfolio of Ayush Dubey — Senior Full Stack Developer specializing in Next.js, TypeScript, React, Node.js, PostgreSQL, MongoDB, and high-performance data processing pipelines.",
  keywords: [
    "Ayush Dubey",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Tailwind CSS",
  ],
  authors: [{ name: "Ayush Dubey", url: "https://github.com/ayushudaydubey" }],
  creator: "Ayush Dubey",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/ayushudaydubey",
    title: "Ayush Dubey — Full Stack & MERN Stack Developer",
    description:
      "Full Stack Developer specializing in React.js, Next.js, Node.js, Express.js, REST APIs, MongoDB, and PostgreSQL.",
    siteName: "Ayush Dubey Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Dubey — Full Stack / MERN Stack Developer",
    description:
      "Full Stack Developer specializing in React.js, Next.js, Node.js, Express.js, REST APIs, MongoDB, and PostgreSQL.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAF9] text-zinc-950 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
