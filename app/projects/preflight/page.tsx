"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { SiteHeader } from "../../site";

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
      className={"group relative block w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 " + className}
      aria-label={shot.alt + " 확대해서 보기"}>
      <img src={imagePath(shot.src)} alt={shot.alt} width={shot.width} height={shot.height} className="block h-auto w-full" />
      <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs text-white print:hidden">
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
      className="preflight-dialog fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none bg-slate-950 text-white backdrop:bg-slate-950/90 print:hidden">
      <div className="flex h-full flex-col">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 px-4 py-3">
          <p className="w-full text-sm text-slate-200 sm:w-auto">{shot.alt}</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleZoom} aria-pressed={zoomed} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-600 px-3 text-sm hover:bg-slate-800">
              {zoomed ? <ZoomOut className="h-4 w-4" aria-hidden /> : <ZoomIn className="h-4 w-4" aria-hidden />}
              {zoomed ? "전체 보기" : "원본 확대"}
            </button>
            <a href={imagePath(shot.src)} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1 px-3 text-xs text-slate-300 underline underline-offset-4">
              새 탭<ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="이미지 닫기" className="grid h-11 w-11 place-items-center rounded-lg hover:bg-slate-800"><X className="h-5 w-5" aria-hidden /></button>
        </div>
        <p className="px-4 py-2 text-xs text-slate-400" aria-live="polite">{zoomed ? "스크롤하거나 손가락으로 밀어 화면의 세부 내용을 확인하세요." : "작은 글씨는 원본 확대로 확인할 수 있습니다."}</p>
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
        <span className="font-mono text-xs text-slate-400">{number}</span>
        <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl print:text-lg">{title}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 break-keep print:text-xs print:leading-5">{description}</p>
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
    <main className="preflight-case min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader active="work" title="Preflight" subtitle="Pre-Production R&D 업무 관리 워크스페이스" className="print:hidden" />
      <section className="preflight-intro mx-auto max-w-5xl px-5 pb-12 pt-10 md:pt-14 print:p-0">
        <p className="text-xs tracking-wider text-slate-500">삼화 R&D본부 · Pre-Production팀</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl print:text-3xl">Preflight</h1>
        <p className="mt-3 text-xl font-semibold leading-8 break-keep md:text-2xl print:text-lg">흩어진 팀 업무를, 함께 확인하는 한 화면으로.</p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 break-keep">ERP 엑셀의 반복 집계를 자동화하고, 담당 업무와 지연 사유를 함께 관리하는 R&D 워크스페이스입니다.</p>
        <dl className="my-6 flex flex-wrap gap-x-8 gap-y-3 text-sm print:my-4">
          <div><dt className="text-xs text-slate-500">역할</dt><dd className="mt-1 font-medium">기획부터 개발·운영까지 1인</dd></div>
          <div><dt className="text-xs text-slate-500">사용</dt><dd className="mt-1 font-medium">팀 전원 (조립 인원 제외)</dd></div>
          <div><dt className="text-xs text-slate-500">초기 구축</dt><dd className="mt-1 font-medium">2026.08.12–08.27 · 이후 개선</dd></div>
        </dl>
        <figure>
          <Screenshot shot={shots.home} onOpen={setSelected} />
          <figcaption className="mt-3 text-xs leading-5 text-slate-500">회의록의 할 일을 담당자와 기한별로 모으고, 미배정 업무와 지연 사유도 함께 확인합니다.</figcaption>
        </figure>
        <p className="mt-2 text-xs leading-5 text-slate-500">화면은 가상 데이터로 재현했습니다. 인물·업체명과 화면 속 수치는 실제 운영 성과가 아닙니다.</p>
        <div className="mt-10 border-l-2 border-blue-300 pl-5 print:mt-4">
          <h2 className="text-base font-semibold">지연된 업무를 확인하려면, 먼저 파일부터 모아야 했습니다.</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 break-keep">샘플조달과 시사출 현황이 ERP 엑셀·개별 파일·메신저에 흩어져 있었습니다. 현황 집계와 관리 문서 작성을 자동화하는 것에서 출발해, 진행 상태와 지연 사유를 함께 확인하는 도구로 확장했습니다.</p>
        </div>
      </section>
      <section className="preflight-sheet border-t border-slate-200 bg-white py-12 print:border-0 print:py-0" aria-labelledby="data-heading">
        <div className="mx-auto max-w-5xl space-y-12 px-5 print:space-y-5 print:px-0">
          <h2 id="data-heading" className="text-xs font-semibold uppercase tracking-widest text-slate-500">파일에서 현황까지</h2>
          <Feature number="01" title="빠진 데이터의 이유까지 확인" description="어떤 행이 제외됐는지, 컬럼 값이 어디서 충돌했는지 표시합니다. 목록이 예상과 다를 때 원본 파일을 다시 열기 전에 원인을 확인할 수 있습니다.">
            <Screenshot shot={shots.report} onOpen={setSelected} />
          </Feature>
          <Feature number="02" title="수기로 만들던 KPI를 업로드 한 번으로 집계" description="업무별 현황과 준수율을 집계하고, 주간 관리 파일 3종을 같은 기준일로 내보냅니다. 준수율의 계산 기준과 판정에서 제외한 항목도 화면에 명시했습니다.">
            <Screenshot shot={shots.kpi} onOpen={setSelected} className="preflight-print-kpi" />
          </Feature>
        </div>
      </section>
      <section className="preflight-sheet border-t border-slate-200 py-12 print:border-0 print:py-0" aria-labelledby="workflow-heading">
        <div className="mx-auto max-w-5xl space-y-12 px-5 print:space-y-5 print:px-0">
          <h2 id="workflow-heading" className="text-xs font-semibold uppercase tracking-widest text-slate-500">현장의 관리 방식을 그대로</h2>
          <Feature number="03" title="엑셀의 색상도 업무 상태로 읽기" description="금형번호 셀의 채우기 색을 사출완료·계획예정·금형보관 등의 상태로 변환합니다. 기존 엑셀 관리 방식을 유지하면서 상태별 조회와 납기 집계를 가능하게 했습니다.">
            <Screenshot shot={shots.trial} onOpen={setSelected} className="preflight-print-trial" />
          </Feature>
          <Feature number="04" title="샘플 요청과 승인 과정을 연결" description="모바일에서 작성한 의뢰서를 샘플실에서 승인·보류·거절할 수 있도록 구현했습니다. 요청과 처리 상태가 하나의 흐름으로 이어집니다.">
            <div className="mb-3"><span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600">구현 완료</span></div>
            <div className="preflight-request grid grid-cols-[minmax(0,1fr)_minmax(0,3fr)] items-start gap-3 md:gap-5">
              <Screenshot shot={shots.order} onOpen={setSelected} />
              <Screenshot shot={shots.inventory} onOpen={setSelected} />
            </div>
          </Feature>
        </div>
      </section>
      <section className="preflight-sheet border-t border-slate-200 bg-white py-12 print:border-0 print:py-0" aria-labelledby="decisions-heading">
        <div className="mx-auto max-w-5xl px-5 print:px-0">
          <h2 id="decisions-heading" className="text-2xl font-semibold tracking-tight print:text-xl">만들면서 바꾼 두 가지 판단</h2>
          <div className="mt-6 space-y-6 print:space-y-4">
            <article className="border-l-2 border-blue-300 pl-5">
              <h3 className="text-lg font-semibold print:text-base">화면에 필요한 값만 저장했더니, 다음 기능을 만들 수 없었습니다.</h3>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 break-keep print:leading-6">처음에는 12개 필드만 남겼지만, 펜딩리스트와 준수율 집계에는 제외했던 정보가 필요했습니다. 전체 행·컬럼을 보관하고 화면과 보고서에 맞게 가공하는 구조로 변경했습니다.</p>
              <figure className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 print:mt-3 print:break-inside-avoid" aria-labelledby="storage-caption">
                <figcaption id="storage-caption" className="mb-3 text-xs font-semibold text-slate-500">샘플조달 데이터 보관 구조</figcaption>
                <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center print:flex-row print:items-center">
                  <div className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-sm font-semibold">업로드 기록</p>
                    <p className="mt-1 font-mono text-[11px] text-slate-500">import_batches</p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">파일명·업로드 시점 보관</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 self-center rotate-90 text-blue-600 sm:rotate-0 print:rotate-0" aria-hidden />
                  <div className="min-w-0 flex-1 rounded-lg border border-blue-200 bg-blue-50 p-3">
                    <p className="text-sm font-semibold">원본 행 보관</p>
                    <p className="mt-1 font-mono text-[11px] text-slate-500">erp_raw_rows</p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">업로드별 전체 값 저장</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 self-center rotate-90 text-blue-600 sm:rotate-0 print:rotate-0" aria-hidden />
                  <div className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white p-3">
                    <p className="text-sm font-semibold">필요한 값 활용</p>
                    <p className="mt-1 text-[11px] text-slate-500">조회·집계</p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">화면·KPI·주간 파일 생성</p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-600 break-keep">추출마다 달라지는 원본 컬럼은 JSONB로 보관하고, 준수율 계산에 필요한 수령완료일 등은 별도 컬럼으로 관리했습니다.</p>
              </figure>
            </article>
            <article className="border-l-2 border-blue-300 pl-5">
              <h3 className="text-lg font-semibold print:text-base">같은 품목이어도, 업체가 다르면 다른 업무였습니다.</h3>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 break-keep print:leading-6">중복 제거 과정에서 두 사출처에 나눠 맡긴 정상 데이터가 사라졌습니다. 판정 키에 워크센터를 포함하고 해당 반례를 테스트에 추가해, 업체별 진행 현황이 누락되지 않도록 보완했습니다.</p>
            </article>
          </div>
          <details className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 print:hidden">
            <summary className="cursor-pointer text-sm font-semibold">기술 구조와 검증 자세히 보기</summary>
            <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600 break-keep">
              <p><strong className="text-slate-900">저장 구조.</strong> 엑셀 파일 자체는 전송하지 않고 브라우저에서 파싱합니다. 파싱한 전체 행·컬럼은 PostgreSQL에 저장하며, 화면용 12개 필드는 이 보관본에서 구성합니다.</p>
              <p><strong className="text-slate-900">ERP 파일 처리.</strong> ExcelJS와 SheetJS가 읽지 못하던 파일의 ZIP 엔트리·XML 접두사·서식 정보를 보정하는 정규화 모듈을 만들었습니다.</p>
              <p><strong className="text-slate-900">업무 규칙.</strong> 의뢰 1건과 여러 공정 라인을 분리해 관리합니다. 지연 기준과 관리 단위는 설정으로 분리하고, 잠정값을 화면에도 표시합니다.</p>
              <p><strong className="text-slate-900">검증.</strong> 계산 규칙과 중복 판정을 가상 데이터로 테스트하고, 실제 회사 파일의 수치는 저장소에 포함하지 않는 로컬 스크립트로 대조했습니다.</p>
              <p><strong className="text-slate-900">운영.</strong> 로그인·3단계 권한과 데이터 영속화를 구현하고, 서버 PC 설치·백업·복원 절차를 PowerShell 스크립트로 정리했습니다.</p>
              <p className="font-mono text-xs text-slate-500">Next.js · React · TypeScript · PostgreSQL · SheetJS · Vitest · PowerShell</p>
            </div>
          </details>
          <div className="mt-10 border-t border-slate-200 pt-8 print:mt-6 print:pt-5">
            <h2 className="text-2xl font-semibold tracking-tight print:text-xl">팀에서 사용하며 다음 업무로 확장하고 있습니다.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 break-keep">팀원 8명 중 조립 인원을 제외한 7명이 샘플조달·시사출·CT 테스트·회의록 업무에 사용하고 있습니다. 개발부서의 T0~T4 테스트 관리 확장 요청을 받았고, 사내 IT 관리 체계로의 편입을 논의하고 있습니다.</p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 break-keep">앞으로는 쌓인 지연 사유를 바탕으로 어느 단계와 업체에서 지연이 반복되는지 분석하고, 요청 알림과 재고 추적을 보완할 계획입니다.</p>
          </div>
        </div>
      </section>
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 print:hidden">Preflight · 백경우</footer>
      {selected && <ImageDialog shot={selected} onClose={closeImage} />}
      <style>{printStyles}</style>
    </main>
  );
}
