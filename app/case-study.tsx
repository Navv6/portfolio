import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function CaseSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} className="scroll-mt-20 border-t border-zinc-200 py-14 md:py-16">
    <h2 className="text-2xl font-bold tracking-tight break-keep md:text-3xl">{title}</h2>
    <div className="mt-5 text-sm leading-7 text-zinc-600 break-keep">{children}</div>
  </section>;
}

export function MetricCard({ value, label, description, baseline }: { value: string | number | null; label: string; description?: string; baseline?: string | null }) {
  if (value === null || value === "") return null;
  return <div className="rounded-2xl border border-zinc-200 bg-white p-5">
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
  return <article className="rounded-2xl border border-zinc-200 bg-white p-5">
    <h3 className="font-semibold text-zinc-900">{problem}</h3>
    <p className="mt-2 text-sm leading-6 text-zinc-600">{action}</p>
    {result && <p className="mt-3 text-sm leading-6 text-blue-800">{result}</p>}
  </article>;
}

export function ArchitectureFlow({ nodes, label }: { nodes: { title: string; description?: string }[]; label: string }) {
  return <figure aria-label={label} className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
    <figcaption className="mb-4 text-xs font-medium text-zinc-500">{label}</figcaption>
    <ol className="flex flex-col gap-3 lg:flex-row">
      {nodes.map((node, index) => <li key={node.title} className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row">
        <div className="flex-1 rounded-lg bg-zinc-50 p-3">
          <p className="text-sm font-semibold text-zinc-900">{node.title}</p>
          {node.description && <p className="mt-1 text-xs leading-5 text-zinc-600">{node.description}</p>}
        </div>
        {index < nodes.length - 1 && <ArrowRight aria-hidden className="h-4 w-4 shrink-0 self-center rotate-90 text-blue-700 lg:rotate-0" />}
      </li>)}
    </ol>
  </figure>;
}
