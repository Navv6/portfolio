import Link from "next/link";
import type { ReactNode } from "react";

export type CategoryKey = "work" | "personal" | "bootcamp";

export const categories: { key: CategoryKey; label: string; short: string; href: string; desc: string }[] = [
  {
    key: "work",
    label: "현업 프로젝트",
    short: "현업",
    href: "/work",
    desc: "회사에서 팀 업무 문제를 풀기 위해 만들고, 실제로 운영 중인 프로젝트입니다.",
  },
  {
    key: "personal",
    label: "개인 프로젝트",
    short: "개인",
    href: "/personal",
    desc: "개인적인 아이디어를 직접 구현하고 있는 프로젝트입니다. 문제 정의부터 화면 설계, 구현, 배포까지 빠르게 반복하며 다듬고 있습니다.",
  },
  {
    key: "bootcamp",
    label: "부트캠프 프로젝트",
    short: "부트캠프",
    href: "/bootcamp",
    desc: "내일배움캠프 데이터분석가 과정(2025.02 ~ 2025.07)에서 진행한 프로젝트입니다.",
  },
];

export type Project = {
  id: string;
  category: CategoryKey;
  title: string;
  subtitle: string;
  summary: string;
  period?: string;
  status: string;
  href: string;
  external?: boolean;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "preflight",
    category: "work",
    title: "Preflight",
    subtitle: "Pre-Production R&D 업무 관리 워크스페이스",
    summary:
      "샘플조달 · 시사출 업무의 지연과 조달 현황을 확인하는 데 드는 반복 작업을 자동화했습니다. ERP 엑셀을 올리면 현황 · KPI · 주간 관리 파일이 만들어지고, 담당자별 할 일과 지연 사유를 함께 관리합니다. 기획부터 개발 · 운영까지 혼자 맡아, 팀 전체가 실무에 사용하고 있습니다.",
    period: "2026.08 ~",
    status: "운영 중",
    href: "/projects/preflight",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "SheetJS", "Vitest", "Claude"],
  },
  {
    id: "vibecoder",
    category: "personal",
    title: "VibeCoder",
    subtitle: "AI 워크플로우 커뮤니티",
    summary:
      "비개발자도 AI로 직접 만들 수 있게 돕는 워크플로우 커뮤니티 서비스로, AI 뉴스 · 영상 · 플레이북 · 빌드 로그를 한 곳에서 탐색할 수 있도록 구성하고 있습니다.",
    status: "진행 중",
    href: "/personal#vibecoder",
    tags: [],
  },
  {
    id: "davinci",
    category: "personal",
    title: "DaVinci Note",
    subtitle: "생각을 확장하는 노트",
    summary:
      "아이디어를 기록하는 데서 끝나지 않고, 말과 손동작, 시각적 연결, AI 보조를 통해 생각을 확장하는 노트형 서비스로 발전시키고 있습니다.",
    status: "진행 중",
    href: "/personal#davinci",
    tags: [],
  },
  {
    id: "deepvi",
    category: "bootcamp",
    title: "DeepVi",
    subtitle: "LLM 기반 기업 분석 서비스",
    summary:
      "재무제표와 시장 맥락을 AI로 해석해, 투자자가 스스로 이해하고 판단할 수 있도록 돕는 서비스입니다. KOSPI/KOSDAQ 444개 기업을 대상으로 데이터 수집부터 AI 분석, 대시보드 구축까지 전체 프로세스를 설계했습니다.",
    period: "2025.05 ~ 2025.07",
    status: "완료",
    href: "/projects/deepvi",
    tags: ["Python", "FastAPI", "PostgreSQL", "LangChain", "RAG", "LLM"],
  },
  {
    id: "pricelens",
    category: "bootcamp",
    title: "PriceLens",
    subtitle: "Airbnb 가격 결정 요인 해석",
    summary:
      "NYC Airbnb 53,659개 숙소 데이터를 기반으로 가격에 영향을 미치는 요인을 정량적으로 분석했습니다. 4가지 트리 모델 비교, Optuna 튜닝, SHAP 해석을 통해 가격 영향 요인을 검증하고 이를 서비스 개선 방안으로 연결했습니다.",
    status: "완료",
    href: "/projects/pricelens",
    tags: ["Python", "XGBoost", "LightGBM", "Optuna", "SHAP", "Statsmodels"],
  },
  {
    id: "tableau",
    category: "bootcamp",
    title: "Tableau",
    subtitle: "LoL 챔피언 분석 가이드",
    summary:
      "Riot API와 CSV 데이터를 기반으로 챔피언 스탯, 성장 패턴, 라인별 특성을 분석하고, 이를 Tableau 인터랙티브 대시보드로 구현한 프로젝트입니다.",
    status: "완료",
    href: "/projects/tableau",
    tags: ["Tableau", "Riot API", "Python", "CSV Data", "Data Storytelling"],
  },
];

export const projectsIn = (key: CategoryKey) => projects.filter((p) => p.category === key);

/** 모든 페이지 공통 상단 바. 왼쪽은 페이지 이름, 오른쪽은 카테고리 메뉴 */
export function SiteHeader({
  active,
  title = "Portfolio",
  subtitle,
  className = "",
}: {
  active?: CategoryKey | "home";
  title?: ReactNode;
  subtitle?: string;
  className?: string;
}) {
  const linkCls = (key: string) =>
    `text-sm transition ${active === key ? "font-semibold text-zinc-900" : "text-zinc-600 hover:text-zinc-900"}`;
  return (
    <header className={`sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur ${className}`}>
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex h-14 items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-baseline gap-2 text-sm font-semibold text-zinc-900 transition hover:text-zinc-700">
            <span className="truncate">{title}</span>
            {subtitle ? <span className="hidden truncate text-xs font-normal text-zinc-500 lg:inline">{subtitle}</span> : null}
          </Link>
          <nav className="flex h-full shrink-0 items-center gap-4 md:gap-6">
            <Link href="/" aria-current={active === "home" ? "page" : undefined} className={`hidden sm:inline ${linkCls("home")}`}>
              Home
            </Link>
            {categories.map((cat, i) => {
              // 박스는 메뉴 바로 아래 가운데. 맨 오른쪽 메뉴만 화면 밖으로 나가지 않도록 오른쪽 끝을 맞춤
              const last = i === categories.length - 1;
              return (
              // 데스크톱: 마우스를 올리거나 Tab으로 들어오면 프로젝트 목록이 펼쳐짐. 모바일: 탭하면 목록 페이지로 이동
              <div key={cat.key} className="group relative flex h-full items-center">
                <Link href={cat.href} aria-current={active === cat.key ? "page" : undefined} className={linkCls(cat.key)}>
                  <span className="md:hidden">{cat.short}</span>
                  <span className="hidden md:inline">{cat.label}</span>
                </Link>
                <div className={`invisible absolute top-full z-30 hidden w-80 md:block pt-2 opacity-0 ${last ? "-right-3" : "left-1/2 -translate-x-1/2"} transition duration-150 md:group-hover:visible md:group-hover:opacity-100 md:group-focus-within:visible md:group-focus-within:opacity-100`}>
                  {/* 어느 메뉴에서 나온 박스인지 가리키는 화살표 */}
                  <span
                    aria-hidden
                    className={`absolute top-[3px] z-10 h-3 w-3 rotate-45 border-l border-t border-zinc-200 bg-white ${last ? "right-16" : "left-1/2 -translate-x-1/2"}`}
                  />
                  <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg">
                    <ul className="py-1.5">
                      {projectsIn(cat.key).map((p) => (
                        <li key={p.id}>
                          <Link href={p.href} className="flex items-start justify-between gap-3 px-4 py-2.5 transition hover:bg-zinc-50 focus-visible:bg-zinc-50 focus-visible:outline-none">
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-zinc-900">{p.title}</span>
                              <span className="mt-0.5 block text-xs leading-5 text-zinc-500 break-keep">{p.subtitle}</span>
                            </span>
                            {p.status !== "완료" ? <StatusBadge status={p.status} /> : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href={cat.href} className="block border-t border-zinc-100 bg-zinc-50 px-4 py-2 text-xs text-zinc-600 transition hover:text-zinc-900">
                      {cat.label} 전체 보기 →
                    </Link>
                  </div>
                </div>
              </div>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

/** 카테고리 목록(게시판) */
export function ProjectBoard({ list }: { list: Project[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="hidden grid-cols-[3rem_minmax(0,1fr)_9rem_5rem] gap-4 border-b border-zinc-200 bg-zinc-50 px-5 py-3 text-xs font-semibold text-zinc-500 md:grid">
        <span>번호</span>
        <span>프로젝트</span>
        <span>기간</span>
        <span className="text-right">상태</span>
      </div>
      <ol>
        {list.map((p, i) => {
          const body = (
            <>
              <span className="hidden font-mono text-xs text-zinc-400 md:block md:pt-1">{String(list.length - i).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-base font-semibold text-zinc-900 group-hover:underline group-hover:underline-offset-4">{p.title}</span>
                  <span className="text-sm text-zinc-500">{p.subtitle}</span>
                </span>
                <span className="mt-1.5 block text-sm leading-6 text-zinc-600 break-keep">{p.summary}</span>
                <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500 md:hidden">
                  {p.period ? <span>{p.period}</span> : null}
                  <span>{p.status}</span>
                </span>
              </span>
              <span className="hidden text-sm text-zinc-600 md:block md:pt-0.5">{p.period ?? "—"}</span>
              <span className="hidden text-right md:block">
                <StatusBadge status={p.status} />
              </span>
            </>
          );
          const cls =
            "group grid gap-4 px-5 py-5 transition hover:bg-zinc-50 md:grid-cols-[3rem_minmax(0,1fr)_9rem_5rem]";
          return (
            <li key={p.id} className="border-b border-zinc-100 last:border-b-0">
              <Link href={p.href} className={cls}>
                {body}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "운영 중"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : status === "진행 중"
        ? "border-blue-200 bg-blue-50 text-blue-700"
        : "border-zinc-200 bg-zinc-50 text-zinc-600";
  return <span className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tone}`}>{status}</span>;
}

/** 카테고리 목록 페이지 공통 레이아웃 */
export function BoardPage({ category, children }: { category: CategoryKey; children?: ReactNode }) {
  const cat = categories.find((c) => c.key === category)!;
  const list = projectsIn(category);
  return (
    <main className="min-h-screen bg-gray-50 text-zinc-900">
      <SiteHeader active={category} />
      <section className="pt-14 pb-10 md:pt-20">
        <div className="mx-auto max-w-4xl px-5">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Projects · {list.length}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{cat.label}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-700 break-keep">{cat.desc}</p>
        </div>
      </section>
      <section className="pb-16">
        <div className="mx-auto max-w-4xl px-5">
          <ProjectBoard list={list} />
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {categories
              .filter((c) => c.key !== category)
              .map((c) => (
                <Link key={c.key} href={c.href} className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-zinc-700 transition hover:bg-zinc-50">
                  {c.label} 보기 →
                </Link>
              ))}
          </div>
        </div>
      </section>
      {children}
      <footer className="border-t border-zinc-200 py-8">
        <div className="mx-auto max-w-4xl px-5 text-center text-sm text-zinc-600">© 2025 백경우. All rights reserved.</div>
      </footer>
    </main>
  );
}
