import type { Metadata } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import BackToTop from "@/components/back-to-top";
import ThemeToggle from "@/components/theme-toggle";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.openclaw101.club"),
  title: {
    default: "万物碎碎念研究所",
    template: "%s | 万物碎碎念研究所",
  },
  description: "一个中文文章分享站，记录 AI、工具、效率和日常思考。",
  keywords: ["AI", "效率", "运维", "Next.js", "中文博客"],
  openGraph: {
    title: "万物碎碎念研究所",
    description: "一个中文文章分享站，记录 AI、工具、效率和日常思考。",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "万物碎碎念研究所",
    description: "一个中文文章分享站，记录 AI、工具、效率和日常思考。",
  },
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${geist.variable} antialiased`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var dark=t?t==='dark':d;document.documentElement.classList.toggle('dark',dark);}catch(e){}})();`}
        </Script>
        {children}
        <ThemeToggle />
        <BackToTop />
      </body>
    </html>
  );
}
