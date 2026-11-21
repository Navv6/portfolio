"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { SiteFooter, SiteHeader } from "../../site";
import { ProjectTexture } from "../../visuals";
import { ArchitectureFlow, CaseGlance, DecisionCard, DecisionTable, ImpactCard, NextCase, StepLabel } from "../../case-study";
import { CaseStepNav } from "../../case-nav";
import { confirmations } from "../../content-confirmations";
import { changes, timeline, constraints, validation, glance, decisionRows, caseSteps, outflowBefore, outflowAfter, outflowShifts, deliveryBasics } from "./content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (name: string) => basePath + "/preflight/" + name;
type Shot = { src: string; alt: string; width: number; height: number };
const shots = {
  home: { src: "home.webp", alt: "담당자별 할 일과 기한 캘린더", width: 1600, height: 1056 },
  report: { src: "import-report.webp", alt: "파일 처리 결과 — 신규 · 값 변경 · 사라짐 판정과 바뀐 칸", width: 1200, height: 806 },
  kpi: { src: "kpi-summary.webp", alt: "업무별 집계와 준수율 대시보드", width: 1600, height: 1000 },
  trial: { src: "trial.webp", alt: "엑셀 셀 색에서 읽은 시사출 상태와 납기 현황", width: 1600, height: 1000 },
  review: { src: "review-queue.webp", alt: "업로드가 혼자 정하지 않은 건 — 검토 대기열", width: 1200, height: 605 },
  pos: { src: "pos.webp", alt: "샘플창고 반출 화면 — 품목 카드의 공지 · 입고 예정", width: 1600, height: 1000 },
  outflow: { src: "outflow.webp", alt: "반출 기록 — 반출 · 접수가 한 표에", width: 1600, height: 1000 },
  ct: { src: "ct.webp", alt: "CT 테스트 — 국내 · 해외 · 개발 구분과 완료 · 미검토", width: 1600, height: 1000 },
  settings: { src: "settings.webp", alt: "기준값 관리 — 잠정 / 확정", width: 1600, height: 1000 },
} satisfies Record<string, Shot>;

function Screenshot({ shot, onOpen, className = "" }: { shot: Shot; onOpen: (shot: Shot) => void; className?: string }) {
  return (
    <button type="button" onClick={() => onOpen(shot)}
      className={"group relative block w-full overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-sm transition hover:border-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 " + className}
      aria-label={shot.alt + " 확대해서 보기"}>
      <img loading="lazy" decoding="async" src={imagePath(shot.src)} alt={shot.alt} width={shot.width} height={shot.height} className="block h-auto w-full" />
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

const printStyles = ".preflight-dialog:focus-visible,.preflight-dialog :focus-visible{outline:2px solid #93c5fd;outline-offset:3px}@media print{.preflight-case{background:white}.preflight-case .preflight-sheet{break-before:page}.preflight-case .preflight-feature{break-inside:avoid}.preflight-case .preflight-intro figure img{max-height:430px;object-fit:contain}.preflight-case .preflight-print-kpi img{max-height:360px;object-fit:contain}.preflight-case .preflight-print-trial img{max-height:340px;object-fit:contain}.preflight-case .preflight-print-flow ol,.preflight-case .preflight-print-flow ol>li{flex-direction:row!important}.preflight-case .preflight-print-flow ol>li>svg{transform:none!important}.preflight-case .preflight-print-pos img{max-height:380px;object-fit:contain}.preflight-case .preflight-print-half img{max-height:260px;object-fit:contain}}";

export default function PreflightPage() {
  const [selected, setSelected] = useState<Shot | null>(null);
  const closeImage = useCallback(() => setSelected(null), []);
  return (
    <main className="preflight-case min-h-screen bg-zinc-50 text-zinc-900">
      <SiteHeader active="work" title="Preflight" subtitle="Pre-Production R&D 업무 관리 워크스페이스" className="print:hidden" />
      <section className="preflight-intro relative mx-auto max-w-5xl px-5 pb-14 pt-12 md:pb-20 md:pt-16 print:p-0">
        <ProjectTexture kind="data" className="pointer-events-none absolute right-5 top-14 hidden w-56 opacity-70 lg:block print:hidden" />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Production · Internal Use · 제조업 R&D 조직</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl print:text-3xl">Preflight</h1>
        <p className="mt-5 text-xl font-semibold leading-snug tracking-tight text-zinc-800 break-keep md:text-2xl print:text-lg">흩어진 팀 업무를, 함께 확인하는 한 화면으로.</p>
        <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600 break-keep print:text-sm">ERP 엑셀의 반복 집계를 자동화하고, 담당 업무와 지연 사유, 샘플 출고와 재고까지 한곳에서 관리하는 R&D 워크스페이스입니다.</p>
        <div className="my-8 print:my-4"><CaseGlance {...glance} /></div>
        <figure>
          <Screenshot shot={shots.home} onOpen={setSelected} />
          <figcaption className="mt-3 text-xs leading-5 text-zinc-500">회의록의 할 일을 담당자와 기한별로 모으고, 미배정 업무와 지연 사유, 팀 게시판을 메인 화면에서 함께 확인합니다.</figcaption>
        </figure>
        <p className="mt-2 text-xs leading-5 text-zinc-500">화면은 가상 데이터로 재현했습니다. 인물·업체명과 화면 속 수치는 실제 운영 성과가 아닙니다.</p>
      </section>
      <CaseStepNav steps={caseSteps} />
      <section className="mx-auto max-w-5xl px-5 pb-14 pt-12 md:pb-20 print:p-0">
        <div id="problem" className="scroll-mt-32 print:mt-4">
          <StepLabel step="01" title="Business Problem" />
          <div className="mt-3 border-l-2 border-blue-300 pl-5">
            <h2 className="text-lg font-semibold break-keep md:text-xl">지연된 업무를 확인하려면, 먼저 파일부터 모아야 했습니다.</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-600 break-keep">샘플조달과 시사출 현황이 ERP 엑셀·개별 파일·메신저에 흩어져 있었습니다. 무엇이 늦어지는지 보려면 매번 파일을 다시 모아 정리해야 했고, 그 정리 작업 자체에 시간이 들었습니다.</p>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-600 break-keep">샘플 출고도 같았습니다. 영업사원이 샘플창고에서 꺼내 가며 종이에 적으면, 팀원이 그 기록을 다시 엑셀로 옮겨 KPI에 썼습니다.</p>
          </div>
        </div>
        <div id="constraints" className="scroll-mt-32 mt-10 print:mt-4">
          <StepLabel step="02" title="Discovery & Constraints" />
          <h2 className="mt-2 text-lg font-semibold break-keep md:text-xl">현장에서 지켜야 했던 조건</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3">
            {constraints.map(item => (
              <li key={item.title} className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="text-sm font-semibold break-keep">{item.title}</p>
                <p className="mt-1.5 text-xs leading-5 text-zinc-600 break-keep">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="decisions" className="preflight-sheet scroll-mt-28 border-t border-zinc-200 bg-white py-14 md:py-20 print:border-0 print:py-0" aria-labelledby="decisions-heading">
        <div className="mx-auto max-w-5xl px-5 print:px-0">
          <StepLabel step="03" title="Engineering Decisions" />
          <h2 id="decisions-heading" className="mt-2 text-2xl font-bold tracking-tight md:text-3xl print:text-xl">만들면서 바꾼 판단</h2>
          <div className="mt-6"><DecisionTable rows={decisionRows} /></div>
          <div className="mt-10 space-y-8 print:space-y-4">
            <div>
              <p className="mb-2 font-mono text-xs text-blue-700">ADR-01 · 일부 필드 저장 → 원본 보존</p>
              <DecisionCard id="storage-decision"
                decision="화면에 필요한 값만 저장했더니, 다음 기능을 만들 수 없었습니다."
                reason="처음에는 12개 필드만 남겼지만, 미결 업무 목록과 준수율 집계에는 제외했던 정보가 필요했습니다."
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
            </div>
            <div>
              <p className="mb-2 font-mono text-xs text-blue-700">ADR-02 · 중복 판정 키에 워크센터 추가</p>
              <DecisionCard id="dedup-decision"
                decision="같은 품목이어도, 업체가 다르면 다른 업무였습니다."
                reason="중복 제거 과정에서 두 사출처에 나눠 맡긴 정상 데이터가 사라졌습니다."
                tradeoff="업체별 업무를 구분하기 위해 중복 판정 규칙이 복잡해집니다."
                result="판정 키에 워크센터를 포함하고 해당 반례를 테스트에 추가해, 업체별 진행 현황이 누락되지 않도록 보완했습니다." />
            </div>
            <div>
              <p className="mb-2 font-mono text-xs text-blue-700">ADR-03 · 행 번호 → 원본 내용으로 행 식별</p>
              <DecisionCard id="identity-decision"
                decision="팀 엑셀에 줄 하나가 끼자, 사람이 고친 값이 전부 옆 행으로 밀렸습니다."
                reason="처음에는 엑셀의 몇 번째 행인지로 같은 업무를 찾았습니다. 팀 파일 중간에 행이 하나 끼면, 화면에서 고쳐 둔 진행 상태와 사유가 그 아래 행들에 한 칸씩 밀려 붙었습니다."
                tradeoff="원본 값만으로는 같은 업무라고 이을 수 없는 행이 생깁니다. 그 행의 수정값은 자동으로 옮기지 않으므로, 확인할 일이 남을 수 있습니다."
                result="행 번호 대신 원본 값으로 행을 식별하고, 확신할 수 없으면 엉뚱한 행에 붙이지 않고 제자리에 남기도록 바꿨습니다. 파일 중간에 줄이 끼는 경우를 실제 DB 점검 시나리오에 넣었습니다." />
            </div>
            <div>
              <p className="mb-2 font-mono text-xs text-blue-700">ADR-05 · 파일에서 빠진 행 ≠ 삭제 · 위험한 것만 사람이 검토</p>
              <DecisionCard id="sync-decision"
                decision="파일에서 사라진 행이 끝난 건지 취소된 건지, 업로드는 알 수 없었습니다."
                reason="ERP 조회는 미완료 건만 내려주기 때문에, 행이 빠진 이유가 완료인지 취소인지 파일만으로는 구분되지 않았습니다. 사람이 고친 값과 ERP의 새 값이 부딪힐 때도 한쪽을 조용히 택해 판단 근거가 남지 않았습니다."
                tradeoff="모든 변경을 사람에게 물으면 업로드가 일이 됩니다. 그래서 위험도로 나눴고, 그 기준을 따로 관리해야 합니다."
                result="빠진 행은 지우지 않고 업무 단계(완료 · 취소 · 드롭)로 관리합니다. 끝났다는 근거 없이 빠진 행, 완료가 진행 중으로 되돌아가는 변경, 사람이 고친 칸과 부딪히는 변경만 검토 대기열로 보내고 나머지는 자동으로 반영합니다. 마지막 업로드는 되돌릴 수 있습니다.">
                <figure className="mt-5 print:mt-3">
                  <Screenshot shot={shots.review} onOpen={setSelected} className="preflight-print-half" />
                  <figcaption className="mt-2 text-xs leading-5 text-zinc-500">고르기 전까지는 지금 값을 그대로 둡니다. 같은 파일을 다시 올려도 검토 건이 늘지 않습니다.</figcaption>
                </figure>
              </DecisionCard>
            </div>
            <p className="text-xs leading-5 text-zinc-500 break-keep">ADR-07(방문 출고 자동화)은 아래 <a href="#automation" className="underline underline-offset-4 hover:text-zinc-800">자동화</a> 섹션에서 따로 다룹니다.</p>
          </div>
        </div>
      </section>

      <section id="delivery" className="preflight-sheet scroll-mt-28 border-t border-zinc-200 py-14 md:py-20 print:border-0 print:py-0" aria-labelledby="delivery-heading">
        <div className="mx-auto max-w-5xl space-y-12 px-5 print:space-y-5 print:px-0">
          <div>
            <StepLabel step="04" title="Delivery & Iteration" />
            <h2 id="delivery-heading" className="mt-2 text-2xl font-bold tracking-tight break-keep md:text-3xl print:text-xl">세 업무의 엑셀을 읽어, 팀이 매일 여는 화면으로</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600 break-keep">샘플조달 · 시사출 · CT 테스트는 ERP와 팀 엑셀에서 읽고, 샘플 출고 · 재고 · 회의록 · 팀 게시판은 사람이 직접 적습니다. 업무 모듈 6개가 같은 로그인 · 권한 · 화면 규칙 위에서 돌아갑니다.</p>
          </div>
          <Feature number="01" title="업로드가 무엇을 바꿨는지 칸 단위로 확인" description="지난번 ERP 값과 칸마다 비교해 신규 · 값 변경 · 변화 없음 · 사라짐 · 다시 나타남으로 나누고, 바뀐 칸의 전과 후를 보여 줍니다. 화면 목록에서 빠진 행도 저장에서는 빠지지 않았다는 것, 비표준 파일을 어떻게 보정해 읽었는지도 함께 밝힙니다. 오래된 파일은 반영 전에 한 번 더 묻고, 마지막 업로드는 되돌릴 수 있습니다.">
            <Screenshot shot={shots.report} onOpen={setSelected} />
          </Feature>
          <Feature number="02" title="세 업무의 KPI를 한 장으로" description="샘플조달 · 시사출 · CT의 누적 건수와 통합 준수율, 워크센터 Worst 5, 7개 분류별 구성과 월별 추이를 주간 · 월간 · 연간으로 봅니다. 샘플조달은 쌓인 원본에서 라인마다 최신 값으로 계산해, 미완료만 든 주간 파일을 올려도 완료 건이 KPI에서 사라지지 않습니다. 주간 관리 파일 3개(우선순위 · 외주 사출처 · 펜딩)도 같은 기준일로 내보냅니다.">
            <Screenshot shot={shots.kpi} onOpen={setSelected} className="preflight-print-kpi" />
          </Feature>
          <Feature number="03" title="엑셀의 색을 업무 상태로 — 시사출 · CT" description="팀이 상태를 셀 채우기 색으로 적어 온 양식을 바꾸지 않고, 테마 색과 명암(tint)까지 풀어 상태로 읽습니다. 시사출은 금형번호 셀 색으로 사출완료 · 계획예정 · 금형보관을, CT는 행 배경색으로 완료 · 미검토를 가립니다. 납기 준수율과 주차별 이월(미완료 = 전주 이월 + 의뢰 − 완료)을 함께 집계하고, CT는 국내 · 해외 · 개발로 나눠 봅니다.">
            <div className="grid gap-3 md:grid-cols-2 print:grid-cols-2">
              <Screenshot shot={shots.trial} onOpen={setSelected} className="preflight-print-half" />
              <Screenshot shot={shots.ct} onOpen={setSelected} className="preflight-print-half" />
            </div>
          </Feature>
          <Feature number="04" title="계산 기준은 담당자가 화면에서 확정" description="목표 준수율 · 준수 기준일 · 위험 임계값처럼 회의에서 바뀌는 값은 코드에 굳히지 않습니다. 기본값과 그 이유는 설정 파일에 두고, 담당자가 화면에서 고쳐 「확정」하면 화면의 「잠정」 표시가 사라집니다. 원본을 그대로 두고 화면을 열 때 계산하므로, 바꾼 기준은 지난 집계에도 같이 적용됩니다.">
            <Screenshot shot={shots.settings} onOpen={setSelected} className="preflight-print-half" />
          </Feature>
          <Feature number="05" title="매일 쓰는 표의 기본기" description="팀원이 하루 종일 표에 적고 읽는 도구라, 화면마다 다르게 동작하지 않게 규칙을 하나로 묶었습니다.">
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3">
              {deliveryBasics.map(item => (
                <li key={item.title} className="rounded-xl border border-zinc-200 bg-white p-3">
                  <p className="text-sm font-semibold break-keep">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-600 break-keep">{item.body}</p>
                </li>
              ))}
            </ul>
          </Feature>
          <div>
            <h3 className="text-sm font-semibold">구축 · 개선 기록</h3>
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
        </div>
      </section>

      <section id="automation" className="preflight-sheet scroll-mt-28 border-t border-zinc-200 bg-white py-14 md:py-20 print:border-0 print:py-0" aria-labelledby="automation-heading">
        <div className="mx-auto max-w-5xl px-5 print:px-0">
          <StepLabel step="05" title="Automation · 방문 출고" />
          <h2 id="automation-heading" className="mt-2 text-2xl font-bold tracking-tight break-keep md:text-3xl print:text-xl">종이에 적고 다시 옮겨 적던 출고 기록을, 누르는 순간 끝나게.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600 break-keep">영업사원이 샘플창고에 와서 샘플을 꺼내 가면 종이에 적었고, 팀원이 그 종이를 다시 엑셀로 옮겨 KPI에 썼습니다. 샘플창고 공용 노트북에 반출 화면을 두고, 꺼내는 자리에서 누르면 기록 · 재고 차감 · KPI 집계가 한 번에 끝나도록 바꿨습니다.</p>

          <div className="preflight-print-flow mt-6 grid gap-3 print:gap-2">
            <ArchitectureFlow label="이전 — 사람이 두 번 기록" nodes={outflowBefore} />
            <ArchitectureFlow label="지금 — 반출 화면에서 한 번" nodes={outflowAfter} />
          </div>

          <div className="mt-8 print:mt-4">
            <h3 className="text-sm font-semibold">사람 일이 사라진 자리</h3>
            <div className="mt-3 overflow-hidden rounded-2xl border border-zinc-200">
              <table className="w-full text-left text-sm">
                <thead><tr className="border-b border-zinc-200 bg-zinc-50 text-[11px] text-zinc-500">
                  <th scope="col" className="px-4 py-2.5 font-semibold">일</th><th scope="col" className="px-4 py-2.5 font-semibold">이전</th><th scope="col" className="px-4 py-2.5 font-semibold">지금</th>
                </tr></thead>
                <tbody>{outflowShifts.map(row => (
                  <tr key={row.label} className="border-b border-zinc-100 last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium text-zinc-800 break-keep">{row.label}</th>
                    <td className="px-4 py-3 text-zinc-600 break-keep">{row.before}</td>
                    <td className="px-4 py-3 font-medium text-blue-800 break-keep">{row.after}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <p className="mt-2 text-xs leading-5 text-zinc-500 break-keep">현업 확인을 거친 정성 비교입니다. 반출 건수 · 수기 입력 감소 같은 측정 수치는 운영 데이터에서 집계한 뒤 더합니다.</p>
          </div>

          <div className="mt-10 space-y-8 print:mt-5 print:space-y-4">
            <Feature number="01" title="샘플창고 반출 화면" description="이름을 고르고 가져가는 샘플을 누르면 끝입니다. 승인을 기다리지 않습니다. 품목 카드에 다른 품목과 부품을 같이 쓴다는 공지와 입고 예정일이 떠서, 꺼내기 전에 압니다. 공용 기기라 누르는 곳과 글자를 크게 잡았습니다.">
              <Screenshot shot={shots.pos} onOpen={setSelected} className="preflight-print-pos" />
            </Feature>
            <Feature number="02" title="반출 · 접수가 한 표에" description="반출 화면에는 고치기 · 지우기가 없습니다. 잘못 누른 것은 로그인한 팀원이 반출 기록에서 고치고, 재고와 변경 이력이 함께 맞춰집니다. 재고가 모자란 만큼은 접수로 남아 팀이 처리합니다.">
              <Screenshot shot={shots.outflow} onOpen={setSelected} className="preflight-print-pos" />
            </Feature>
          </div>

          <div id="pos-decision" className="scroll-mt-20 mt-10 print:mt-5">
            <p className="mb-2 font-mono text-xs text-blue-700">ADR-07 · 요청 관리 → 방문 출고 자동화</p>
            <DecisionCard
              decision="처음 만든 「요청 → 승인 → 준비 → 수거」 흐름은 접었습니다."
              reason="처음 목표는 팀에 들어오는 샘플 요청을 관리하는 것이었고, 모바일 의뢰서와 승인 화면까지 만들었습니다. 그러나 업무 환경의 제약으로 영업사원이 요청 화면을 쓰기 어려웠습니다."
              tradeoff="승인 단계가 없어 잘못 누른 기록이 바로 재고에 반영됩니다. 그래서 고치기 · 지우기를 로그인한 팀원 화면에만 두고 변경 이력을 남겼습니다."
              result="만든 흐름을 고집하지 않고, 영업사원이 샘플창고에서 직접 꺼내 가는 현장의 방식을 그대로 둔 채 그 자리에서 누르는 기록으로 바꿨습니다." />
          </div>
        </div>
      </section>

      <section id="adoption" className="preflight-sheet scroll-mt-28 border-t border-zinc-200 py-14 md:py-20 print:border-0 print:py-0" aria-labelledby="adoption-heading">
        <div className="mx-auto max-w-5xl px-5 print:px-0">
          <StepLabel step="06" title="Operation & Adoption" />
          <h2 id="adoption-heading" className="mt-2 text-2xl font-bold tracking-tight break-keep md:text-3xl print:text-xl">개발 서버와 운영 서버를 나눠, 팀이 실무에서 쓰고 있습니다.</h2>
          <div id="technical-details" className="scroll-mt-20 mt-6">
            <ul className="grid gap-3 sm:grid-cols-3">
              {validation.map(item => (
                <li key={item.title} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1.5 text-xs leading-5 text-zinc-600 break-keep">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10">
            <h3 className="text-lg font-semibold break-keep md:text-xl">팀에서 쓰면서 달라진 점</h3>
            <ul className="mt-4 space-y-3">
              {changes.map(item => (
                <li key={item.after} className="grid gap-2 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-stretch">
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-xs font-medium text-zinc-500">이전</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-600 break-keep">{item.before}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 self-center justify-self-center rotate-90 text-blue-600 md:rotate-0" aria-hidden />
                  <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
                    <p className="text-xs font-medium text-blue-700">지금</p>
                    <p className="mt-1 text-sm font-medium leading-6 text-zinc-900 break-keep">{item.after}</p>
                  </div>
                </li>
              ))}
            </ul>
            {confirmations.timeComparison && <div className="mt-4 max-w-sm"><ImpactCard title="도입 전후 소요 시간" metric={confirmations.timeComparison.after} description={"도입 전 " + confirmations.timeComparison.before + " · " + confirmations.timeComparison.method} /></div>}
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600 break-keep">샘플조달·시사출·CT 테스트·회의록·샘플 출고 업무에 사용하고 있습니다.</p>
        </div>
      </section>

      <NextCase href="/projects/markcloud" title="MarkCloud" desc="고령 응답자 리서치의 AI 전환을 위한 한국어 STT 평가와 로컬 LLM 타당성 검토" />
      <SiteFooter className="print:hidden" />
      {selected && <ImageDialog shot={selected} onClose={closeImage} />}
      <style>{printStyles}</style>
    </main>
  );
}
