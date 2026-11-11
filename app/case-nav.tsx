"use client";

import { useEffect, useState } from "react";

/** 케이스 스터디 단계 이동 바. 화면 위에 붙어 있고, 지금 읽는 단계를 강조합니다. */
export function CaseStepNav({ steps }: { steps: { id: string; label: string }[] }) {
  const [active, setActive] = useState(steps[0]?.id);
  useEffect(() => {
    const targets = steps.map(s => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px" },
    );
    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [steps]);
  return (
    <nav aria-label="케이스 스터디 단계" className="sticky top-14 z-10 border-y border-zinc-200 bg-zinc-50/90 backdrop-blur-md print:hidden">
      <ol className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-5 py-2 [scrollbar-width:none]">
        {steps.map((step, i) => (
          <li key={step.id} className="shrink-0">
            <a href={`#${step.id}`} aria-current={active === step.id ? "step" : undefined}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs transition ${active === step.id ? "bg-white font-semibold text-zinc-900 shadow-sm ring-1 ring-zinc-200" : "text-zinc-500 hover:text-zinc-900"}`}>
              <span className={`font-mono ${active === step.id ? "text-blue-700" : "text-zinc-400"}`}>{String(i + 1).padStart(2, "0")}</span>
              {step.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
