"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { SiteFooter, SiteHeader } from "../../site";
import { ProjectTexture } from "../../visuals";
import { DecisionCard, ImpactCard } from "../../case-study";
import { confirmations } from "../../content-confirmations";
import { roadmap, impacts, timeline, constraints } from "./content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (name: string) => basePath + "/preflight/" + name;
type Shot = { src: string; alt: string; width: number; height: number };
const shots = {
  home: { src: "home.webp", alt: "담당자별 업무와 기한 캘린더", width: 1600, height: 1056 },
  report: { src: "import-report.webp", alt: "파일 처리 결과와 제외 사유·컬럼 충돌", width: 1600, height: 597 },
  kpi: { src: "kpi-summary.webp", alt: "업무별 집계와 준수율 대시보드", width: 1600, height: 1000 },
  trial: { src: "trial.webp", alt: "엑셀 색상에서 읽은 시사출 상태와 납기 현황", width: 1600, height: 1000 },
  order: { src: "m-02-order.webp", alt: "모바일 샘플 의뢰서 작성", width: 700, height: 1515 },
  inventory: { src: "inventory.webp", alt: "샘플실의 요청 승인·보류·거절", width: 1600, height: 1000 },
} satisfies Record<string, Shot>;

function Screenshot({ shot, onOpen, className = "" }: { shot: Shot; onOpen: (shot: Shot) => void; className?: string }) {
  return (
    <button type="button" onClick={() => onOpen(shot)}
      className={"group relative block w-full overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-sm transition hover:border-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 " + className}
      aria-label={shot.alt + " 확대해서 보기"}>
      <img src={imagePath(shot.src)} alt={shot.alt} width={shot.width} height={shot.height} className="block h-auto w-full" />
      <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-zinc-900/80 px-3 py-1.5 text-xs text-white print:hidden">
        <Maximize2 className="h-3.5 w-3.5" aria-hidden />확대
      </span>
    </button>
  );
}

function ImageDialog({ shot, onClose }: { shot: Shot; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);
  const toggleZoom = () => {
    setZoomed(value => !value);
    viewport.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };
  return (
    <dialog ref={dialog} aria-label={shot.alt} onCancel={event => { event.preventDefault(); onClose(); }}
      onKeyDown={event => {
        if (event.key !== "Tab") return;
        const items = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]');
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      className="preflight-dialog fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none bg-zinc-950 text-white backdrop:bg-zinc-950/90 print:hidden">
      <div className="flex h-full flex-col">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 px-4 py-3">
          <p className="w-full text-sm text-zinc-200 sm:w-auto">{shot.alt}</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleZoom} aria-pressed={zoomed} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-zinc-600 px-3 text-sm hover:bg-zinc-800">
              {zoomed ? <ZoomOut className="h-4 w-4" aria-hidden /> : <ZoomIn className="h-4 w-4" aria-hidden />}
              {zoomed ? "전체 보기" : "원본 확대"}
            </button>
            <a href={imagePath(shot.src)} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1 px-3 text-xs text-zinc-300 underline underline-offset-4">
              새 탭<ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="이미지 닫기" className="grid h-11 w-11 place-items-center rounded-lg hover:bg-zinc-800"><X className="h-5 w-5" aria-hidden /></button>
        </div>
        <p className="px-4 py-2 text-xs text-zinc-400" aria-live="polite">{zoomed ? "스크롤하거나 손가락으로 밀어 화면의 세부 내용을 확인하세요." : "작은 글씨는 원본 확대로 확인할 수 있습니다."}</p>
        <div ref={viewport} className="min-h-0 flex-1 overflow-auto overscroll-contain p-4" tabIndex={0} aria-label="확대 이미지 탐색">
          <div className={zoomed ? "w-max" : "flex h-full items-center justify-center"}>
            <img src={imagePath(shot.src)} alt={shot.alt} width={shot.width} height={shot.height}
              className={zoomed ? "block max-w-none rounded-lg bg-white" : "max-h-full max-w-full rounded-lg bg-white object-contain"}
              style={zoomed ? { width: shot.width, height: shot.height } : undefined} />
          </div>
        </div>
      </div>
    </dialog>
  );
}

function Feature({ number, title, description, children }: { number: string; title: string; description: string; children: ReactNode }) {
  return (
    <article className="preflight-feature">
      <div className="mb-4 print:mb-2">
        <span className="font-mono text-xs text-zinc-400">{number}</span>
        <h3 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 md:text-2xl print:text-lg">{title}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 break-keep print:text-xs print:leading-5">{description}</p>
      </div>
      {children}
    </article>
  );
}

const printStyles = ".preflight-dialog:focus-visible,.preflight-dialog :focus-visible{outline:2px solid #93c5fd;outline-offset:3px}@media print{.preflight-case{background:white}.preflight-case .preflight-sheet{break-before:page}.preflight-case .preflight-feature{break-inside:avoid}.preflight-case .preflight-intro figure img{max-height:430px;object-fit:contain}.preflight-case .preflight-print-kpi img{max-height:360px;object-fit:contain}.preflight-case .preflight-print-trial img{max-height:340px;object-fit:contain}.preflight-case .preflight-request{max-width:600px;margin-inline:auto}}";

export default function PreflightPage() {
  const [selected, setSelected] = useState<Shot | null>(null);
  const closeImage = useCallback(() => setSelected(null), []);
  return (
    <main className="preflight-case min-h-screen bg-zinc-50 text-zinc-900">
      <SiteHeader active="work" title="Preflight" subtitle="Pre-Production R&D 업무 관리 워크스페이스" className="print:hidden" />
      <section className="preflight-intro relative mx-auto max-w-5xl px-5 pb-14 pt-12 md:pb-20 md:pt-16 print:p-0">
        <ProjectTexture kind="data" className="pointer-events-none absolute right-5 top-14 hidden w-56 opacity-70 lg:block print:hidden" />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Production · Internal Use · 삼화 R&D본부</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl print:text-3xl">Preflight</h1>
        <p className="mt-5 text-xl font-semibold leading-snug tracking-tight text-zinc-800 break-keep md:text-2xl print:text-lg">흩어진 팀 업무를, 함께 확인하는 한 화면으로.</p>
        <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600 break-keep print:text-sm">ERP 엑셀의 반복 집계를 자동화하고, 담당 업무와 지연 사유를 함께 관리하는 R&D 워크스페이스입니다.</p>
        <dl className="my-8 grid gap-4 border-y border-zinc-200 py-5 text-sm sm:grid-cols-3 print:my-4 print:grid-cols-3">
          <div><dt className="text-xs text-zinc-500">역할</dt><dd className="mt-1 font-semibold">기획부터 개발·운영까지 1인</dd></div>
          <div><dt className="text-xs text-zinc-500">사용</dt><dd className="mt-1 font-semibold">팀 전원 (조립 인원 제외)</dd></div>
          <div><dt className="text-xs text-zinc-500">초기 구축</dt><dd className="mt-1 font-semibold">2026.08.12–08.27 · 이후 개선</dd></div>
        </dl>
        <figure>
          <Screenshot shot={shots.home} onOpen={setSelected} />
          <figcaption className="mt-3 text-xs leading-5 text-zinc-500">회의록의 할 일을 담당자와 기한별로 모으고, 미배정 업무와 지연 사유도 함께 확인합니다.</figcaption>
        </figure>
        <p className="mt-2 text-xs leading-5 text-zinc-500">화면은 가상 데이터로 재현했습니다. 인물·업체명과 화면 속 수치는 실제 운영 성과가 아닙니다.</p>
        <div id="problem" className="scroll-mt-20 mt-12 border-l-2 border-blue-300 pl-5 print:mt-4">
          <h2 className="text-lg font-semibold break-keep md:text-xl">지연된 업무를 확인하려면, 먼저 파일부터 모아야 했습니다.</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-600 break-keep">샘플조달과 시사출 현황이 ERP 엑셀·개별 파일·메신저에 흩어져 있었습니다. 무엇이 늦어지는지 보려면 매번 파일을 다시 모아 정리해야 했고, 그 정리 작업 자체에 시간이 들었습니다.</p>
        </div>
        <div id="constraints" className="scroll-mt-20 mt-10 print:mt-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">현장에서 지켜야 했던 조건</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
            {constraints.map(item => (
              <li key={item.title} className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="text-sm font-semibold break-keep">{item.title}</p>
                <p className="mt-1.5 text-xs leading-5 text-zinc-600 break-keep">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="preflight-sheet border-t border-zinc-200 bg-white py-14 md:py-20 print:border-0 print:py-0" aria-labelledby="data-heading">
        <div className="mx-auto max-w-5xl space-y-12 px-5 print:space-y-5 print:px-0">
          <h2 id="data-heading" className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">파일에서 현황까지</h2>
          <Feature number="01" title="빠진 데이터의 이유까지 확인" description="어떤 행이 제외됐는지, 컬럼 값이 어디서 충돌했는지 표시합니다. 목록이 예상과 다를 때 원본 파일을 다시 열기 전에 원인을 확인할 수 있습니다.">
            <Screenshot shot={shots.report} onOpen={setSelected} />
          </Feature>
          <Feature number="02" title="수기로 만들던 KPI를 업로드 한 번으로 집계" description="업무별 현황과 준수율을 집계하고, 주간 관리 파일 3종을 같은 기준일로 내보냅니다. 준수율의 계산 기준과 판정에서 제외한 항목도 화면에 명시했습니다.">
            <Screenshot shot={shots.kpi} onOpen={setSelected} className="preflight-print-kpi" />
          </Feature>
        </div>
      </section>
      <section className="preflight-sheet border-t border-zinc-200 py-14 md:py-20 print:border-0 print:py-0" aria-labelledby="workflow-heading">
        <div className="mx-auto max-w-5xl space-y-12 px-5 print:space-y-5 print:px-0">
          <h2 id="workflow-heading" className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">현장 업무와 연결</h2>
          <Feature number="03" title="엑셀의 색상도 업무 상태로 읽기" description="금형번호 셀의 채우기 색을 엑셀 테마 색과 tint 값까지 해석해 사출완료·계획예정·금형보관 등의 상태로 변환하고, 상태별 조회와 납기 집계에 사용합니다.">
            <Screenshot shot={shots.trial} onOpen={setSelected} className="preflight-print-trial" />
          </Feature>
          <Feature number="04" title="샘플 요청과 승인 과정을 연결" description="모바일에서 작성한 의뢰서를 샘플실에서 승인·보류·거절할 수 있도록 구현했습니다. 요청과 처리 상태가 하나의 흐름으로 이어집니다.">
            <div className="mb-3"><span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-600">구현 완료</span></div>
            <div className="preflight-request grid grid-cols-[minmax(0,1fr)_minmax(0,3fr)] items-start gap-3 md:gap-5">
              <Screenshot shot={shots.order} onOpen={setSelected} />
              <Screenshot shot={shots.inventory} onOpen={setSelected} />
            </div>
          </Feature>
        </div>
      </section>
      <section className="preflight-sheet border-t border-zinc-200 bg-white py-14 md:py-20 print:border-0 print:py-0" aria-labelledby="decisions-heading">
        <div className="mx-auto max-w-5xl px-5 print:px-0">
          <h2 id="decisions-heading" className="text-2xl font-bold tracking-tight md:text-3xl print:text-xl">만들면서 바꾼 두 가지 판단</h2>
          <div className="mt-6 space-y-6 print:space-y-4">
            <DecisionCard id="storage-decision"
              decision="화면에 필요한 값만 저장했더니, 다음 기능을 만들 수 없었습니다."
              reason="처음에는 12개 필드만 남겼지만, 펜딩리스트와 준수율 집계에는 제외했던 정보가 필요했습니다."
              tradeoff="전체 원본을 보관할 저장 공간과 JSONB·집계 컬럼을 함께 관리할 복잡도가 늘어납니다."
              result="전체 행·컬럼을 보관하고, 저장된 원본에서 화면과 보고서에 필요한 값을 가공하도록 변경했습니다.">
              <figure className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 print:mt-3 print:break-inside-avoid" aria-labelledby="storage-caption">
                <figcaption id="storage-caption" className="mb-3 text-xs font-semibold text-zinc-500">샘플조달 데이터 보관 구조</figcaption>
                <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center print:flex-row print:items-center">
                  <div className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-white p-3">
                    <p className="text-sm font-semibold">업로드 기록</p>
                    <p className="mt-1 font-mono text-[11px] text-zinc-500">import_batches</p>
                    <p className="mt-2 text-xs leading-5 text-zinc-600">파일명·업로드 시점 보관</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 self-center rotate-90 text-blue-600 sm:rotate-0 print:rotate-0" aria-hidden />
                  <div className="min-w-0 flex-1 rounded-lg border border-blue-200 bg-blue-50 p-3">
                    <p className="text-sm font-semibold">원본 행 보관</p>
                    <p className="mt-1 font-mono text-[11px] text-zinc-500">erp_raw_rows</p>
                    <p className="mt-2 text-xs leading-5 text-zinc-600">업로드별 전체 값 저장</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 self-center rotate-90 text-blue-600 sm:rotate-0 print:rotate-0" aria-hidden />
                  <div className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-white p-3">
                    <p className="text-sm font-semibold">필요한 값 활용</p>
                    <p className="mt-1 text-[11px] text-zinc-500">조회·집계</p>
                    <p className="mt-2 text-xs leading-5 text-zinc-600">화면·KPI·주간 파일 생성</p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-5 text-zinc-600 break-keep">추출마다 달라지는 원본 컬럼은 JSONB로 보관하고, 준수율 계산에 필요한 수령완료일 등은 별도 컬럼으로 관리했습니다.</p>
              </figure>
            </DecisionCard>
            <DecisionCard id="dedup-decision"
              decision="같은 품목이어도, 업체가 다르면 다른 업무였습니다."
              reason="중복 제거 과정에서 두 사출처에 나눠 맡긴 정상 데이터가 사라졌습니다."
              tradeoff="업체별 업무를 구분하기 위해 중복 판정 규칙이 복잡해집니다."
              result="판정 키에 워크센터를 포함하고 해당 반례를 테스트에 추가해, 업체별 진행 현황이 누락되지 않도록 보완했습니다." />
          </div>
          <div id="technical-details" className="scroll-mt-20 mt-10 print:hidden">
            <h3 className="text-sm font-semibold">그 밖의 구현</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { title: "업무 규칙", body: "의뢰 1건과 여러 공정 라인을 분리해 관리합니다. 지연 기준과 관리 단위는 설정으로 분리하고, 잠정값은 화면에도 표시합니다." },
                { title: "검증", body: "계산 규칙과 중복 판정은 가상 데이터로 테스트하고, 실제 회사 파일의 수치는 저장소에 넣지 않는 로컬 스크립트로 대조했습니다." },
                { title: "권한 · 영속화", body: "로그인과 3단계 권한, PostgreSQL 기반 데이터 영속화를 구현했습니다." },
              ].map(item => (
                <li key={item.title} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1.5 text-xs leading-5 text-zinc-600 break-keep">{item.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-xs text-zinc-500">Next.js · React · TypeScript · PostgreSQL · SheetJS · Vitest · PowerShell</p>
          </div>
          <div id="adoption" className="scroll-mt-20 mt-14 border-t border-zinc-200 pt-12 print:mt-6 print:pt-5">
            <h2 className="text-2xl font-bold tracking-tight break-keep md:text-3xl print:text-xl">팀에서 사용하며 다음 업무로 확장하고 있습니다.</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 print:grid-cols-2">
              {impacts.map(impact => <ImpactCard key={impact.title} {...impact} />)}
              {confirmations.timeComparison && <ImpactCard title="도입 전후 소요 시간" metric={confirmations.timeComparison.after} description={"도입 전 " + confirmations.timeComparison.before + " · " + confirmations.timeComparison.method} />}
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600 break-keep">샘플조달·시사출·CT 테스트·회의록 업무에 사용하고 있습니다.</p>
            <div className="mt-8">
              <h3 className="text-sm font-semibold">피드백을 받아 바로 고친 기록</h3>
              <ol className="mt-4 border-l border-zinc-200">
                {timeline.map(entry => (
                  <li key={entry.date} className="relative grid gap-1 pb-4 pl-6 last:pb-0 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-4">
                    <span className="absolute -left-[5px] top-[7px] h-2.5 w-2.5 rounded-full border-2 border-white bg-blue-500" aria-hidden />
                    <span className="font-mono text-xs leading-6 text-zinc-500">{entry.date}</span>
                    <span className="text-sm leading-6 text-zinc-700 break-keep">{entry.text}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-600 break-keep">앞으로는 쌓인 지연 사유를 바탕으로 어느 단계와 업체에서 지연이 반복되는지 분석하고, 요청 알림과 재고 추적을 보완할 계획입니다.</p>
          </div>
        </div>
      </section>
      <section id="ai-roadmap" className="preflight-sheet border-t border-zinc-200 py-14 md:py-20 print:border-0 print:py-0" aria-labelledby="ai-roadmap-heading">
        <div className="mx-auto max-w-5xl px-5 print:px-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">AI 확장 계획 · 향후 업데이트</p>
          <h2 id="ai-roadmap-heading" className="mt-2 max-w-3xl text-2xl font-bold tracking-tight break-keep md:text-3xl print:text-xl">AI로 입력을 줄이고, 쌓인 데이터로 검토를 돕기</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600 break-keep">학습 데이터 없이 시작할 수 있는 정보 추출부터 적용하고, 기록이 쌓이면 검색과 예측으로 넓힙니다.</p>

          <article className="mt-7 rounded-xl border border-blue-200 bg-white p-5 md:p-6 print:mt-5 print:p-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-zinc-400">01</span>
              <h3 className="text-lg font-semibold break-keep">먼저, 안료 입고 사진을 의뢰서와 연결합니다.</h3>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-800">설계 중</span>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600 break-keep">입고 사진에서 안료 코드·색상명·LOT·수량을 읽어 의뢰서와 대조하고, 누락과 불일치를 표시하도록 설계하고 있습니다. 담당자가 확정한 뒤 해당 안료를 기다리는 시사출 건의 상태를 갱신하는 흐름입니다.</p>
            <ol aria-label="안료 입고 처리 설계" className="mt-5 grid gap-3 sm:grid-cols-3 print:grid-cols-3">
              <li className="border-l-2 border-blue-200 pl-3">
                <p className="text-xs font-medium text-blue-800">AI · 추출</p>
                <p className="mt-1 text-sm text-zinc-700">사진 판독·업체별 표기 정규화</p>
              </li>
              <li className="border-l-2 border-zinc-200 pl-3">
                <p className="text-xs font-medium text-zinc-500">규칙 · 대조</p>
                <p className="mt-1 text-sm text-zinc-700">안료 코드 매칭·의뢰서 확인</p>
              </li>
              <li className="border-l-2 border-zinc-200 pl-3">
                <p className="text-xs font-medium text-zinc-500">담당자 · 확정</p>
                <p className="mt-1 text-sm text-zinc-700">검토 후 저장·시사출 상태 반영</p>
              </li>
            </ol>
          </article>

          <ol className="mt-4 grid gap-3 sm:grid-cols-2 print:grid-cols-2" aria-label="이후 확장 계획">
            {roadmap.map(step => (
              <li key={step.number} className="rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-mono text-xs text-zinc-400">{step.number}</span>
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600">{step.status}</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-zinc-600 break-keep">{step.description}</p>
              </li>
            ))}
          </ol>

          <div className="mt-7 border-t border-zinc-200 pt-5 print:mt-5">
            <h3 className="text-sm font-semibold">설계 원칙과 검증 계획</h3>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-600 break-keep">AI가 채운 값은 담당자 확인 후 저장하고, 판독할 수 없는 항목은 추측하지 않고 빈칸으로 남깁니다. 추출·매칭은 수정률과 매칭 정확도로, 예측은 실제 NG를 찾는 재현율로 평가할 계획입니다. 예측 결과는 시험을 대체하지 않고 검토 순서를 정하는 데 활용합니다.</p>
          </div>
        </div>
      </section>
      <SiteFooter className="print:hidden" />
      {selected && <ImageDialog shot={selected} onClose={closeImage} />}
      <style>{printStyles}</style>
    </main>
  );
}
