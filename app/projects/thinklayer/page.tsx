import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "../../site";
import { ArchitectureFlow } from "../../case-study";
import { ProjectTexture } from "../../visuals";
import { built, currentStage, example, flow, principles, stages } from "./content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const stateTone: Record<string, string> = {
  KNOWN: "border-zinc-300 bg-white text-zinc-900",
  DEPENDENCY: "border-zinc-300 bg-zinc-50 text-zinc-900",
  ASSUMPTION: "border-amber-300 bg-amber-50 text-amber-900",
  UNKNOWN: "border-dashed border-zinc-400 bg-white text-zinc-600",
  RISK: "border-red-300 bg-red-50 text-red-800",
};
const gapTone: Record<string, string> = {
  CONFLICT: "bg-red-50 text-red-700",
  ASSUMPTION: "bg-amber-50 text-amber-800",
  MISSING: "bg-zinc-100 text-zinc-700",
};

function Node({ label, state }: { label: string; state: string }) {
  return (
    <span className={`inline-flex min-w-0 flex-col rounded-lg border px-3 py-2 ${stateTone[state]}`}>
      <span className="text-sm font-semibold break-keep">{label}</span>
      <span className="font-mono text-[10px] opacity-70">{state}</span>
    </span>
  );
}

export default function ThinkLayerPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <SiteHeader active="personal" title="ThinkLayer" subtitle="만들기 전에 구조를 보는 AI 사고 레이어" />
      <section className="relative mx-auto max-w-5xl px-5 pb-14 pt-12 md:pb-20 md:pt-16">
        <ProjectTexture kind="network" className="pointer-events-none absolute right-5 top-14 hidden w-56 opacity-70 lg:block" />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Open Source · Agent Skill</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">ThinkLayer</h1>
        <p className="mt-5 text-xl font-semibold leading-snug tracking-tight text-zinc-800 break-keep md:text-2xl">만들기 전에, 먼저 구조를 봅니다.</p>
        <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600 break-keep">이걸 만들어야 하는가, 만든다면 가장 작은 버전은 무엇인가. 코딩 에이전트가 코드를 쓰기 한 단계 앞에서 묻습니다.</p>
        <dl className="my-8 grid gap-4 border-y border-zinc-200 py-5 text-sm sm:grid-cols-3">
          <div><dt className="text-xs text-zinc-500">역할</dt><dd className="mt-1 font-semibold">기획 · 설계 1인</dd></div>
          <div><dt className="text-xs text-zinc-500">형태</dt><dd className="mt-1 font-semibold">코딩 에이전트 스킬 · 모델 미내장</dd></div>
          <div><dt className="text-xs text-zinc-500">단계</dt><dd className="mt-1 font-semibold">v0.1 · 구상 단계</dd></div>
        </dl>
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={basePath + "/thinklayer/demo.gif"} alt="ThinkLayer 콘셉트 데모: 인터뷰 후 MAP, GAP, PATH를 보여주는 터미널 화면" width={960} height={600} className="block h-auto w-full rounded-xl border border-zinc-800 shadow-sm" />
          <figcaption className="mt-3 text-xs text-zinc-500">콘셉트 데모 · v0.1 개발 중이며 출력은 예시입니다.</figcaption>
        </figure>
        <div className="mt-10">
          <ArchitectureFlow label="ThinkLayer가 들어가는 위치" nodes={flow} />
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white py-14 md:py-20" aria-labelledby="example-heading">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Example Output</p>
          <h2 id="example-heading" className="mt-2 text-2xl font-bold tracking-tight break-keep md:text-3xl">“{example.idea}”</h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article>
              <h3 className="font-mono text-xs font-semibold text-zinc-500">01 · MAP</h3>
              <ul className="mt-3 space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                {example.map.map(edge => (
                  <li key={edge.from + edge.to} className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
                    <Node label={edge.from} state={edge.fromState} />
                    <span className="flex flex-col items-center text-blue-700">
                      <span className="font-mono text-[10px] text-zinc-500">{edge.rel}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                    <Node label={edge.to} state={edge.toState} />
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-zinc-500">물음표가 붙은 노드는 아직 결정되지 않은 것입니다.</p>
            </article>

            <article>
              <h3 className="font-mono text-xs font-semibold text-zinc-500">02 · GAP</h3>
              <ul className="mt-3 space-y-3">
                {example.gaps.map(gap => (
                  <li key={gap.statement} className="rounded-2xl border border-zinc-200 bg-white p-4">
                    <span className={`rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold ${gapTone[gap.type]}`}>{gap.type}</span>
                    <p className="mt-2 text-sm font-semibold break-keep">{gap.statement}</p>
                    <p className="mt-1 font-mono text-[11px] text-zinc-500">source · {gap.source}</p>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <article className="mt-6">
            <h3 className="font-mono text-xs font-semibold text-zinc-500">03 · PATH</h3>
            <dl className="mt-3 grid gap-2 rounded-2xl bg-zinc-900 p-5 font-mono text-sm text-zinc-100 sm:grid-cols-[6rem_minmax(0,1fr)]">
              <dt className="text-emerald-400">NEXT</dt><dd className="break-keep">{example.path.next}</dd>
              <dt className="text-sky-400">WHY</dt><dd className="break-keep">{example.path.why}</dd>
              <dt className="text-zinc-500">NOT YET</dt><dd className="break-keep text-zinc-400">{example.path.notYet}</dd>
            </dl>
          </article>
        </div>
      </section>

      <section className="border-t border-zinc-200 py-14 md:py-20" aria-labelledby="principles-heading">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Principles</p>
          <h2 id="principles-heading" className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">설계 원칙</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(item => (
              <li key={item.title} className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="text-sm font-semibold break-keep">{item.title}</p>
                <p className="mt-1.5 text-xs leading-5 text-zinc-600 break-keep">{item.description}</p>
              </li>
            ))}
          </ul>
          <h3 className="mt-10 text-sm font-semibold">지금까지 만든 것</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {built.map(item => (
              <li key={item.title} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-1 font-mono text-[11px] text-zinc-500 [overflow-wrap:anywhere]">{item.path}</p>
                <p className="mt-2 text-xs leading-5 text-zinc-600 break-keep">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white py-14 md:py-20" aria-labelledby="roadmap-heading">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">Roadmap</p>
          <h2 id="roadmap-heading" className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">진행 상황</h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-5">
            {stages.map(stage => {
              const current = stage.number === currentStage;
              return (
                <li key={stage.number} className={`rounded-2xl border p-4 ${current ? "border-blue-300 bg-blue-50" : "border-zinc-200 bg-white"}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-zinc-400">{stage.number}</span>
                    {current ? <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-blue-800">현재</span> : null}
                  </div>
                  <p className="mt-2 text-sm font-semibold">{stage.title}</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-600 break-keep">{stage.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
