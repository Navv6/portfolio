"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import { ArrowLeft } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.08 * i, ease: "easeOut" },
  }),
};

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl px-5">{children}</div>;
}

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">{eyebrow}</div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">{title}</h2>
      {desc ? <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 md:text-base break-keep">{desc}</p> : null}
    </div>
  );
}

function Section({ children, tinted = false }: { children: React.ReactNode; tinted?: boolean }) {
  return (
    <section className={`border-t border-slate-200 py-16 ${tinted ? "bg-white" : ""}`}>
      <Container>{children}</Container>
    </section>
  );
}

const stats = [
  { value: "7 / 8", label: "팀원 실사용", note: "조립 인원 제외 전원" },
  { value: "4", label: "업무 모듈", note: "샘플조달 · 시사출 · CT · 회의록" },
  { value: "213", label: "단위 테스트", note: "가상 데이터 픽스처" },
  { value: "1회", label: "파일 업로드", note: "KPI · 현황 집계 완료" },
];

const before = [
  "매일 ERP에서 엑셀을 내려받아, 어제 파일과 비교하며 신규 의뢰가 어디서부터 추가됐는지 직접 찾음",
  "KPI 보고서와 생산 계획을 ERP와 별도의 엑셀에 수기로 작성",
  "진행 상황은 메신저로 공유 — 누가 무엇을 맡았는지 한 곳에서 보이지 않음",
  "샘플조달 펜딩 리스트 · 우선 사출 리스트는 반자동 스크립트로 매번 새 파일을 만들어야 했음",
  "업무가 사람과 개인 파일에 묶여 있어 인수인계가 어려움",
];

const process = [
  { step: "01", title: "타당성 검토", desc: "AI와 대화하며 무엇을 자동화할 수 있는지, 무엇이 위험한지부터 점검했습니다." },
  { step: "02", title: "기획 문서 · 작업지시서", desc: "요구사항과 아직 확정되지 않은 결정을 분리해 작업지시서로 정리했습니다." },
  { step: "03", title: "골격 먼저", desc: "업무 모듈 등록 구조와 계층(ui → application → domain)을 먼저 세우고 검증했습니다." },
  { step: "04", title: "한 업무씩 확장", desc: "실제 ERP 파일 대조와 테스트를 통과한 모듈만 다음 단계로 넘겼습니다." },
  { step: "05", title: "팀 미팅으로 반복", desc: "팀원들에게 로드맵을 공유하고, 회의에서 나온 반영 사항을 계속 업데이트했습니다." },
];

const decisions = [
  {
    title: "원본 파일은 서버로 보내지 않는다",
    body: "엑셀 파싱을 전부 브라우저 안에서 처리하고, 필요한 12개 필드만 저장합니다. '원본 영구 저장 금지'를 규칙이 아니라 구조로 지키는 방식입니다.",
  },
  {
    title: "확정되지 않은 결정은 설정 파일 한 곳에",
    body: "지연 구간 임계값, 경과일 기준(달력/영업일), 관리 단위 같은 값은 설정 파일 하나에 모았습니다. 회의에서 결정이 바뀌면 코드 대신 설정 한 줄만 바꿉니다.",
  },
  {
    title: "업무 모듈은 끼워 넣는 구조",
    body: "모듈 등록 인터페이스만 만족하면 메뉴와 KPI 대시보드에 자동으로 들어옵니다. 샘플조달에서 만든 엑셀 처리 로직을 시사출 · CT 테스트에서 그대로 재사용했습니다.",
  },
];

const troubles = [
  {
    tag: "Parsing",
    title: "ERP 엑셀을 파서 두 개가 모두 읽지 못함",
    problem: "ERP 내보내기 파일을 ExcelJS와 SheetJS 모두 파싱에 실패했습니다. 파일 자체는 유효했고 Python에서는 열렸습니다.",
    cause: "zip 엔트리 순서가 비표준 · XML이 네임스페이스 접두사 형식 · 스타일 정의에 필수 속성이 빠져 있음 — 원인 세 가지를 하나씩 좁혀 확인했습니다.",
    fix: "파서를 바꾸는 대신 입력을 표준 형태로 보정하는 정규화 모듈을 만들었습니다. ERP 형식이 바뀌어도 이 모듈만 고치면 됩니다.",
  },
  {
    tag: "Data Loss",
    title: "대표 행으로 묶으면 업체가 화면에서 사라짐",
    problem: "의뢰 1건에 사출 라인이 여러 개인데, 대표 행 하나만 보여주는 방식이 기본값이었습니다.",
    cause: "실측해 보니 의뢰의 75%가 라인 2개 이상이었고, 대표 행에 한 번도 뽑히지 않아 사라지는 사출업체가 8곳 · 28라인이었습니다.",
    fix: "관리 단위를 교체 가능한 전략으로 분리하고, 손실 규모를 언제든 다시 계산해 화면 하단에 보여주도록 했습니다. 결정은 수치를 근거로 팀에 넘겼습니다.",
  },
  {
    tag: "Validation",
    title: "중복 제거가 정상 데이터를 지우는 반례",
    problem: "완전 중복 행을 걸러내는 로직을 넣자 라인 수가 줄었는데, 그중 일부는 진짜 중복이 아니었습니다.",
    cause: "같은 의뢰 · 같은 품목을 서로 다른 두 사출처에서 각각 진행하는 정상 데이터였습니다. 판정 키에 워크센터가 빠져 있었습니다.",
    fix: "중복 판정 키에 워크센터를 필수로 넣고, 이 반례를 테스트로 고정했습니다. 실제 파일 대조 결과 기존 프로토타입과 모든 KPI가 일치했습니다.",
  },
];

const after = [
  "ERP 엑셀 업로드 한 번으로 KPI · 지연 구간 · 업체별/고객사별 현황 집계",
  "신규 의뢰를 매일 비교해 찾던 작업을 ERP 신규 의뢰 자동 확인으로 대체",
  "팀원별 할당 업무 · 기한 캘린더 · 팀 게시판으로 누가 무엇을 하는지 한 화면에서 확인",
  "로그인 · 3단계 권한 · PostgreSQL 영속화로 팀 공용 도구로 운영",
];

const voices = [
  { who: "팀원", text: "기존 ERP보다 더 편리하고 좋다는 평가를 받았습니다." },
  { who: "상무", text: "개발부서의 T0~T4 개발 테스트 관리도 만들어 줄 수 있는지 요청을 받았습니다." },
  { who: "IT팀", text: "완성도를 인정받아, 사내 IT 관리 체계로 편입하는 방안을 논의하고 있습니다." },
];

const stack = ["Next.js", "TypeScript", "React", "PostgreSQL", "SheetJS", "Vitest", "Claude"];

export default function PreflightPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700 transition">
              <ArrowLeft className="h-4 w-4" />
              Portfolio
            </Link>
            <span className="text-sm font-semibold text-slate-900">Preflight</span>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-14 md:pt-24">
        <Container>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
              Case Study · 삼화 R&D본부 Pre-Production팀 · 2026.08 ~
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">Preflight</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700 break-keep md:text-xl">
              수기와 엑셀로 돌아가던 화장품 용기 R&D 팀의 업무를, ERP 파일 업로드 한 번으로 현황이 정리되는 워크스페이스로 바꿨습니다.
            </p>
            <p className="mt-3 text-sm text-slate-500">기획 · 설계 · 개발 · 운영 1인 · 사내 전용 도구</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span key={tech} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i + 1}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="font-mono text-2xl font-semibold text-slate-900 md:text-3xl">{s.value}</div>
                <div className="mt-1 text-sm font-medium text-slate-800">{s.label}</div>
                <div className="mt-1 text-xs text-slate-500">{s.note}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Problem */}
      <Section tinted>
        <SectionTitle
          eyebrow="Problem"
          title="요청은 늘어나는데, 업무는 수기로 돌아가고 있었습니다"
          desc="입사 후 CT 테스트와 시사출 생산 관리를 맡으며, 처리해야 할 요청 건수와 업무 종류가 계속 늘어나는 걸 봤습니다. 그런데 그 시간의 상당 부분이 팀의 본래 업무가 아닌 반복 작업에 쓰이고 있었습니다."
        />
        <ul className="grid gap-3 md:grid-cols-2">
          {before.map((item) => (
            <li key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 break-keep">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Process */}
      <Section>
        <SectionTitle
          eyebrow="How I Worked with AI"
          title="AI와 함께, 검증된 것만 다음 단계로"
          desc="코드를 바로 생성하지 않았습니다. AI를 설계 파트너로 두고 타당성 검토부터 작업지시서까지 먼저 정리한 뒤, 큰 골격을 세우고 한 업무씩 확장했습니다."
        />
        <ol className="grid gap-3 md:grid-cols-5">
          {process.map((p) => (
            <li key={p.step} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm break-inside-avoid">
              <div className="font-mono text-xs text-slate-400">{p.step}</div>
              <div className="mt-2 text-sm font-semibold text-slate-900">{p.title}</div>
              <p className="mt-2 text-xs leading-5 text-slate-600 break-keep">{p.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Design decisions */}
      <Section tinted>
        <SectionTitle eyebrow="Design" title="바뀔 수 있는 것과 지켜야 할 것을 구조로 나눴습니다" />
        <div className="grid gap-4 md:grid-cols-3">
          {decisions.map((d) => (
            <div key={d.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 break-inside-avoid">
              <div className="text-sm font-semibold text-slate-900 break-keep">{d.title}</div>
              <p className="mt-3 text-sm leading-6 text-slate-700 break-keep">{d.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Troubleshooting */}
      <Section>
        <SectionTitle
          eyebrow="Troubleshooting"
          title="실제 ERP 데이터로 끝까지 검증했습니다"
          desc="테스트는 가상 데이터로 돌리고, 실제 파일은 커밋하지 않는 로컬 스크립트로만 대조했습니다. 그 과정에서 찾은 문제 세 가지입니다."
        />
        <div className="grid gap-5">
          {troubles.map((t) => (
            <article key={t.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm break-inside-avoid">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 font-mono text-[11px] text-slate-600">{t.tag}</span>
                <h3 className="text-base font-semibold text-slate-900 break-keep">{t.title}</h3>
              </div>
              <dl className="mt-4 grid gap-3 md:grid-cols-3">
                {[
                  { k: "문제", v: t.problem },
                  { k: "원인", v: t.cause },
                  { k: "해결", v: t.fix },
                ].map((row) => (
                  <div key={row.k} className={`rounded-xl p-4 ${row.k === "해결" ? "border border-blue-200 bg-blue-50" : "border border-slate-200 bg-slate-50"}`}>
                    <dt className={`text-xs font-semibold ${row.k === "해결" ? "text-blue-700" : "text-slate-500"}`}>{row.k}</dt>
                    <dd className="mt-2 text-sm leading-6 text-slate-700 break-keep">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </Section>

      {/* Result */}
      <Section tinted>
        <SectionTitle eyebrow="Result" title="아날로그 업무가 디지털로 바뀌었습니다" />
        <div className="grid gap-6 md:grid-cols-2">
          <ul className="space-y-3">
            {after.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700 break-keep">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                {item}
              </li>
            ))}
          </ul>
          <div className="space-y-3">
            {voices.map((v) => (
              <div key={v.who} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-500">{v.who}</div>
                <p className="mt-1 text-sm leading-6 text-slate-800 break-keep">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Next */}
      <Section>
        <SectionTitle eyebrow="Next" title="다음 단계" />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "영업부 샘플 요청 알림 · 로그 기반 재고 추적",
            "사내 IT 관리 체계에 맞춘 재정비와 공용 서버 운용",
            "개발부서 T0~T4 개발 테스트 관리 모듈로 확장",
            "검토 / 승인 워크플로우 화면",
          ].map((item) => (
            <div key={item} className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900 break-keep">
              {item}
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-slate-500">
          회사 데이터 보호를 위해 업체명 · 고객사 · 의뢰번호 등 식별 가능한 정보는 공개하지 않습니다.
        </p>
      </Section>

      <footer className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-5xl px-5 text-center text-sm text-slate-600">© 2025 백경우. All rights reserved.</div>
      </footer>
    </main>
  );
}
