import type { Metadata } from "next"
import "./globals.css"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const siteUrl = `https://navv6.github.io${basePath}`

export const metadata: Metadata = {
  title: "백경우 | Portfolio",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: `${basePath}/favicon.svg`,
  },
  openGraph: {
    title: "백경우 | Portfolio",
    url: siteUrl,
    siteName: "백경우 | Portfolio",
    images: [
      {
        url: `${basePath}/og.png`,
        width: 1200,
        height: 630,
        alt: "백경우 | Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "백경우 | Portfolio",
    images: [`${basePath}/og.png`],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
