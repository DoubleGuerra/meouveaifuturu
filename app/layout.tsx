import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Me Ouve AI - Escuta Inteligente Neural | Inteligência Emocional Empresarial",
  description:
    "Transforme sua empresa com inteligência artificial emocional de última geração. Escuta empática, análise neural e insights preditivos para o futuro dos negócios. Conformidade NR-1 garantida.",
  keywords: [
    "inteligência artificial",
    "escuta empática",
    "análise emocional",
    "IA empresarial",
    "bem-estar organizacional",
    "tecnologia neural",
    "NR-1",
    "saúde mental corporativa",
    "machine learning",
    "processamento de linguagem natural",
  ].join(", "),
  authors: [{ name: "Me Ouve AI" }],
  creator: "Me Ouve AI",
  publisher: "Me Ouve AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://meouveai.com",
    title: "Me Ouve AI - Escuta Inteligente Neural",
    description: "Transforme sua empresa com inteligência artificial emocional de última geração",
    siteName: "Me Ouve AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Me Ouve AI - Escuta Inteligente Neural",
    description: "Transforme sua empresa com inteligência artificial emocional de última geração",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#667eea" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
