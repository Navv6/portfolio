"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// 예전 주소. MarkCloud 케이스 스터디로 옮겨졌습니다.
export default function MarkCloudRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/projects/markcloud");
  }, [router]);
  return (
    <main className="grid min-h-screen place-items-center bg-gray-50 text-sm text-zinc-600">
      <Link href="/projects/markcloud" className="underline underline-offset-4">
        MarkCloud 페이지로 이동합니다
      </Link>
    </main>
  );
}
