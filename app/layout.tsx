import type { Metadata } from "next"
import "./globals.css"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const siteOrigin = "https://navv6.github.io"
const siteUrl = `${siteOrigin}${basePath}/`

export const metadata: Metadata = {
  title: "백경우 | Portfolio",
  metadataBase: new URL(siteOrigin),
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
    locale: "ko_KR",
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
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
