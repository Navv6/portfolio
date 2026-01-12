import DeepViPortfolio from './portfolio'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* 네비게이션 바 */}
      <nav className="sticky top-0 bg-slate-900/90 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-white">
          <h1 className="text-2xl font-bold">백경우 | AI Application Engineer</h1>
          <div className="flex gap-2">
            <Link href="/" className="px-3 py-2 rounded-lg text-sm bg-white/10 hover:bg-white/20 font-semibold">
              v1
            </Link>
            <Link href="/v2" className="px-3 py-2 rounded-lg text-sm hover:bg-white/20">
              v2
            </Link>
            <Link href="/v3" className="px-3 py-2 rounded-lg text-sm hover:bg-white/20">
              v3
            </Link>
          </div>
        </div>
      </nav>
      <DeepViPortfolio />
    </>
  )
}
