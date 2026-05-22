import type { Metadata } from "next"
import "./globals.css"

import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
  title: "RpGadget",
  description: "Premium iPhone Store",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}