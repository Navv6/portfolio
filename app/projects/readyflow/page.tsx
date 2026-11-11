import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "../../site";
import { ArchitectureFlow, MetricCard } from "../../case-study";
import { ProjectTexture } from "../../visuals";
import { cards, diagnosisFlow, evidence, nextSteps, scatter } from "./content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function ReadyFlowPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <SiteHeader active="personal" title="ReadyFlow" subtitle="제조 중소기업 AI 도입 전 업무 진단" />
      <section className="relative mx-auto max-w-5xl px-5 pb-14 pt-12 md:pb-20 md:pt-16">
        <ProjectTexture kind="data" className="pointer-events-none absolute right-5 top-14 hidden w-56 opacity-70 lg:block" />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Startup · AX Diagnosis</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">ReadyFlow</h1>
        <p className="mt-5 text-xl font-semibold leading-snug tracking-tight text-zinc-800 break-keep md:text-2xl">AI를 들이기 전에, 일하는 방식부터 봅니다.</p>
        <p className="mt-3 font-mono text-sm text-zinc-500">Understand first. Automate second. AI when ready.</p>
        <dl className="my-8 grid gap-4 border-y border-zinc-200 py-5 text-sm sm:grid-cols-3">
          <div><dt className="text-xs text-zinc-500">역할</dt><dd className="mt-1 font-semibold">문제 정의 · 진단 설계 · 창업 준비</dd></div>
          <div><dt className="text-xs text-zinc-500">대상</dt><dd className="mt-1 font-semibold">20~300명 제조기업 개발 · 품질 · 생산관리 · 구매</dd></div>
          <div><dt className="text-xs text-zinc-500">단계</dt><dd className="mt-1 font-semibold">첫 진단 현장 모집</dd></div>
        </dl>
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map(card => (
            <figure key={card.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src={basePath + card.src} alt={card.alt} width={1080} height={1350} className="block h-auto w-full rounded-xl border border-zinc-200 shadow-sm" />
              <figcaption className="mt-2 text-xs text-zinc-500">{card.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white py-14 md:py-20" aria-labelledby="problem-heading">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Problem</p>
          <h2 id="problem-heading" className="mt-2 text-2xl font-bold tracking-tight break-keep md:text-3xl">AI를 들여도 회사가 달라지지 않는 이유</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {evidence.map(item => (
              <div key={item.label} className="flex flex-col">
                <MetricCard value={item.value} label={item.label} description={item.description} />
                <a href={item.source.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-800">
                  출처 · {item.source.name}<ArrowUpRight className="h-3 w-3" aria-hidden />
                </a>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {scatter.map(item => (
              <div key={item.title} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-medium text-zinc-500">{item.title}</p>
                <p className="mt-1 text-base font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 py-14 md:py-20" aria-labelledby="method-heading">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">How it works</p>
          <h2 id="method-heading" className="mt-2 text-2xl font-bold tracking-tight break-keep md:text-3xl">말과 데이터의 차이에서 개선 지점을 찾습니다</h2>
          <div className="mt-6">
            <ArchitectureFlow label="진단 흐름" nodes={diagnosisFlow} />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white py-14 md:py-20" aria-labelledby="origin-heading">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Origin</p>
          <h2 id="origin-heading" className="mt-2 text-2xl font-bold tracking-tight break-keep md:text-3xl">Preflight에서 먼저 겪은 문제입니다</h2>
          <Link href="/projects/preflight#problem" className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition hover:border-zinc-400">
            <div>
              <p className="text-sm font-semibold">Preflight · 현업 프로젝트</p>
              <p className="mt-1 text-sm leading-6 text-zinc-600 break-keep">ERP 엑셀·개별 파일·메신저에 흩어진 현황을 한 화면으로 구조화한 뒤에야 AI 확장을 설계할 수 있었습니다.</p>
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-500 transition group-hover:text-zinc-900" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="border-t border-zinc-200 py-14 md:py-20" aria-labelledby="next-heading">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">Next</p>
          <h2 id="next-heading" className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">다음 단계</h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-3">
            {nextSteps.map(step => (
              <li key={step.number} className={`rounded-2xl border bg-white p-4 ${step.current ? "border-blue-300" : "border-zinc-200"}`}>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-zinc-400">{step.number}</span>
                  {step.current ? <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-800">지금</span> : null}
                </div>
                <p className="mt-2 text-sm font-semibold break-keep">{step.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
