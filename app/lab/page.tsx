"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// 예전 '끄적임' 주소. 개인 프로젝트 목록으로 옮겨졌습니다.
export default function LabRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/personal");
  }, [router]);
  return (
    <main className="grid min-h-screen place-items-center bg-gray-50 text-sm text-zinc-600">
      <Link href="/personal" className="underline underline-offset-4">
        개인 프로젝트 페이지로 이동합니다
      </Link>
    </main>
  );
}
