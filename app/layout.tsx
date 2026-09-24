import type { Metadata } from "next"
import "./globals.css"
import { RevealObserver } from "./motion"

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
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 스크롤 등장 효과는 JS가 켜진 경우에만 적용 (없으면 내용이 처음부터 보임) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  )
}
