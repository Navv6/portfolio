import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** 케이스 스터디 단계 표시 (예: 01 · Business Problem). 모든 케이스 스터디가 같은 표기를 씁니다. */
export function StepLabel({ step, title }: { step: string; title: string }) {
  return <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500"><span className="text-blue-700">{step}</span> · {title}</p>;
}

export function CaseSection({ id, title, step, children }: { id: string; title: string; step?: { step: string; title: string }; children: ReactNode }) {
  return <section id={id} className="scroll-mt-28 border-t border-zinc-200 py-14 first:border-t-0 md:py-16">
    {step && <div className="mb-2"><StepLabel {...step} /></div>}
    <h2 className="text-2xl font-bold tracking-tight break-keep md:text-3xl">{title}</h2>
    <div className="mt-5 text-sm leading-7 text-zinc-600 break-keep">{children}</div>
  </section>;
}

export function MetricCard({ value, label, description, baseline }: { value: string | number | null; label: string; description?: string; baseline?: string | null }) {
  if (value === null || value === "") return null;
  return <div data-reveal className="rounded-2xl border border-zinc-200 bg-white p-5">
    <p className="text-3xl font-bold tracking-tight text-zinc-900 tabular-nums">{value}</p>
    <p className="mt-2 text-sm font-medium text-zinc-800">{label}</p>
    {description && <p className="mt-1 text-xs leading-5 text-zinc-500">{description}</p>}
    {baseline && <p className="mt-3 border-t border-zinc-100 pt-3 text-xs leading-5 text-zinc-600">비교 기준: {baseline}</p>}
  </div>;
}

export function ImpactCard({ title, metric, description }: { title: string; metric: string | null; description: string }) {
  return <MetricCard value={metric} label={title} description={description} />;
}

export function DecisionCard({ decision, reason, tradeoff, result, children, id }: {
  decision: string; reason: string; tradeoff?: string; result: string; children?: ReactNode; id?: string;
}) {
  return <article id={id} className="scroll-mt-20 border-l-2 border-blue-300 pl-5">
    <h3 className="text-lg font-semibold text-zinc-900 print:text-base">{decision}</h3>
    <p className="mt-2 text-sm leading-7 text-zinc-600 break-keep print:leading-6">{reason}</p>
    {tradeoff && <p className="mt-2 text-xs leading-6 text-zinc-500 break-keep">고려한 부담 · {tradeoff}</p>}
    <p className="mt-2 text-sm leading-6 text-zinc-700 break-keep">{result}</p>
    {children}
  </article>;
}

export function FailureCard({ problem, action, result }: { problem: string; action: string; result?: string | null }) {
  return <article data-reveal className="rounded-2xl border border-zinc-200 bg-white p-5">
    <h3 className="font-semibold text-zinc-900">{problem}</h3>
    <p className="mt-2 text-sm leading-6 text-zinc-600">{action}</p>
    {result && <p className="mt-3 text-sm leading-6 text-blue-800">{result}</p>}
  </article>;
}

export function ArchitectureFlow({ nodes, label }: { nodes: { title: string; description?: string }[]; label: string }) {
  return <figure aria-label={label} className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
    <figcaption className="mb-4 text-xs font-medium text-zinc-500">{label}</figcaption>
    <ol className="flex flex-col gap-3 lg:flex-row">
      {nodes.map((node, index) => <li key={node.title} data-reveal style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties} className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row">
        <div className="flow-node flex-1 rounded-lg bg-zinc-50 p-3">
          <p className="text-sm font-semibold text-zinc-900">{node.title}</p>
          {node.description && <p className="mt-1 text-xs leading-5 text-zinc-600">{node.description}</p>}
        </div>
        {index < nodes.length - 1 && <ArrowRight aria-hidden className="h-4 w-4 shrink-0 self-center rotate-90 text-blue-700 lg:rotate-0" />}
      </li>)}
    </ol>
  </figure>;
}

/** 케이스 스터디 첫 화면 요약: 위는 한눈에 보기(문제·역할·판단·결과), 아래는 기술 요약(기간·환경·스택·데이터 흐름). */
export function CaseGlance({ cells, spec, flow }: {
  cells: { label: string; lines: string[]; sub?: string; highlight?: boolean }[];
  spec: { label: string; value: string; mono?: boolean }[];
  flow?: string[];
}) {
  return <section aria-label="한눈에 보기" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
    <p className="border-b border-zinc-200 bg-zinc-50 px-5 py-2.5 text-xs text-zinc-500"><span className="font-semibold text-zinc-900">한눈에 보기</span> · 30초 요약</p>
    <dl className="grid sm:grid-cols-2 lg:grid-cols-4">
      {cells.map(cell => (
        <div key={cell.label} className={`border-zinc-200 p-5 [&:not(:first-child)]:border-t sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(even)]:border-l lg:border-t-0 lg:[&:not(:first-child)]:border-l ${cell.highlight ? "bg-blue-50/70" : ""}`}>
          <dt className={`text-xs font-semibold ${cell.highlight ? "text-blue-700" : "text-zinc-500"}`}>{cell.label}</dt>
          {cell.lines.map(line => <dd key={line} className={`mt-1.5 text-sm leading-6 break-keep ${cell.highlight ? "font-semibold text-zinc-900" : "text-zinc-700"}`}>{line}</dd>)}
          {cell.sub && <dd className="mt-1 text-xs leading-5 text-zinc-500 break-keep">{cell.sub}</dd>}
        </div>
      ))}
    </dl>
    <div className="border-t border-zinc-200">
      <p className="px-5 pt-4 text-xs font-semibold text-zinc-500">기술 요약</p>
      <dl className="px-5 pb-4 text-sm">
        {spec.map(row => (
          <div key={row.label} className="grid gap-1 border-b border-zinc-100 py-2.5 last:border-0 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
            <dt className="text-xs text-zinc-500 sm:pt-0.5">{row.label}</dt>
            <dd className={row.mono ? "font-mono text-xs leading-6 text-zinc-700 [overflow-wrap:anywhere]" : "leading-6 text-zinc-700 break-keep"}>{row.value}</dd>
          </div>
        ))}
        {flow && (
          <div className="grid gap-1 py-2.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
            <dt className="text-xs text-zinc-500 sm:pt-1">데이터 흐름</dt>
            <dd><ol className="flex flex-wrap items-center gap-1.5">{flow.map((node, i) => (
              <li key={node} className="flex items-center gap-1.5">
                {i > 0 && <ArrowRight className="h-3 w-3 text-blue-600" aria-hidden />}
                <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono text-[11px] text-zinc-700">{node}</span>
              </li>
            ))}</ol></dd>
          </div>
        )}
      </dl>
    </div>
  </section>;
}

/** 설계 판단 비교표. 바쁜 독자는 이 표만 보고 넘어갈 수 있게, 상세 카드보다 먼저 둡니다. */
export function DecisionTable({ rows }: { rows: { id: string; anchor: string; before: string; problem: string; after: string }[] }) {
  return <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
    <table className="hidden w-full text-left text-sm md:table">
      <thead><tr className="border-b border-zinc-200 text-[11px] uppercase tracking-wider text-zinc-500">
        <th scope="col" className="w-24 px-4 py-3 font-semibold">ADR</th><th scope="col" className="px-4 py-3 font-semibold">처음 선택</th><th scope="col" className="px-4 py-3 font-semibold">막힌 지점</th><th scope="col" className="px-4 py-3 font-semibold">바꾼 방식</th>
      </tr></thead>
      <tbody>{rows.map(row => (
        <tr key={row.id} className="border-b border-zinc-100 align-top last:border-0">
          <th scope="row" className="px-4 py-3.5 font-mono text-xs font-medium text-blue-700"><a href={`#${row.anchor}`} className="hover:underline">{row.id}</a></th>
          <td className="px-4 py-3.5 text-zinc-600 break-keep">{row.before}</td>
          <td className="px-4 py-3.5 text-zinc-600 break-keep">{row.problem}</td>
          <td className="px-4 py-3.5 font-medium text-zinc-900 break-keep">{row.after}</td>
        </tr>
      ))}</tbody>
    </table>
    <ul className="divide-y divide-zinc-100 md:hidden">{rows.map(row => (
      <li key={row.id} className="p-4 text-sm">
        <p className="font-mono text-xs font-medium text-blue-700">{row.id}</p>
        <p className="mt-1.5 text-zinc-600 break-keep"><span className="text-xs text-zinc-500">처음 · </span>{row.before}</p>
        <p className="mt-1 text-zinc-600 break-keep"><span className="text-xs text-zinc-500">막힘 · </span>{row.problem}</p>
        <p className="mt-1 font-medium text-zinc-900 break-keep"><span className="text-xs font-normal text-zinc-500">변경 · </span>{row.after}</p>
      </li>
    ))}</ul>
  </div>;
}

/** 케이스 스터디 맨 아래, 다음 사례로 이어지는 링크 */
export function NextCase({ href, title, desc }: { href: string; title: string; desc: string }) {
  return <section className="border-t border-zinc-200 py-12 print:hidden">
    <div className="mx-auto max-w-5xl px-5">
      <Link href={href} className="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-400">
        <span><span className="text-xs text-zinc-500">다음 사례</span><span className="mt-1 block text-lg font-semibold">{title}</span><span className="mt-0.5 block text-sm text-zinc-600 break-keep">{desc}</span></span>
        <ArrowRight className="h-5 w-5 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-zinc-900" aria-hidden />
      </Link>
    </div>
  </section>;
}
