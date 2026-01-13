import Link from "next/link";

export default function TableauPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-800">
          ← 홈으로
        </Link>
        <h1 className="mt-6 text-3xl font-semibold">Tableau</h1>
        <p className="mt-3 text-sm text-zinc-600">
          프로젝트 상세 페이지를 준비 중입니다.
        </p>
      </div>
    </main>
  );
}
