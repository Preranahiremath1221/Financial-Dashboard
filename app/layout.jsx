import React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { MobileAppProvider } from "@/components/mobile-app-provider"
import { Suspense } from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Financial Dashboard",
  description: "Professional Financial Dashboard with Mobile Support",
  generator: "Prerana",
  manifest: "/manifest.json",
  themeColor: "#164e63",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <MobileAppProvider>{children}</MobileAppProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
