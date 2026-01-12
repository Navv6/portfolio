import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "DeepVi - 기업 분석 포트폴리오",
  description: "LLM 기반 기업 분석 서비스",
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
