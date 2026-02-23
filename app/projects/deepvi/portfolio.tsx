"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  ShieldCheck,
  Layers3,
  MessageCircleQuestion,
  Database,
  ArrowUpRight,
  BrainCircuit,
  LayoutDashboard,
  ArrowRight,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import React from "react";
import { TypeReturnBar } from "../../componets";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i, ease: "easeOut" },
  }),
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string) => `${basePath}${path}`;

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl px-5">{children}</div>;
}

function SectionTitle({
  eyebrow,
  title,
  desc,
  caption,
  wide = false,
}: {
  eyebrow: string;
  title: string;
  desc?: React.ReactNode;
  caption?: string;
  wide?: boolean;
}) {
  return (
    <div className="mb-8">
      <div className="text-sm text-zinc-600">{eyebrow}</div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p
          className={`mt-3 text-sm leading-6 text-zinc-700 md:text-base break-keep
            ${wide ? "max-w-4xl" : "max-w-2xl"}`}
        >
          {desc}
        </p>
      ) : null}
      {caption ? (
        <p className="mt-2 text-xs text-zinc-500">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        {icon}
        <div className="text-sm font-semibold text-zinc-900">{title}</div>
      </div>
      <div className="mt-3 text-sm leading-6 text-zinc-700">{children}</div>
    </div>
  );
}

// ✅ 5가지 유형 분류 비주얼 컴포넌트 (HTML 디자인 이식)
function TypeAnalysisVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0a0e1a] p-2 text-white overflow-hidden select-none">
      <div className="flex w-full max-w-5xl items-stretch gap-2 lg:gap-4 scale-[0.6] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 origin-center transition-transform">
        
        {/* Card 1: 투자철학 */}
        <div className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <div className="mb-2 flex items-center gap-2 border-l-4 border-blue-500 pl-2">
            <h2 className="text-lg font-bold">투자철학</h2>
          </div>
            <div className="mb-3 rounded-xl bg-black/20 p-3">
            <p className="mb-1 text-xs font-bold text-blue-400">워렌 버핏</p>
            <ul className="list-none space-y-1 text-[12px] text-zinc-300">
              <li>• 가치·안정 중심 재무 해석</li>
              <li>• 지속가능한 이익/현금흐름</li>
            </ul>
          </div>

          <div className="rounded-lg bg-black/20 p-3">
            <p className="mb-1 text-xs font-bold text-purple-400">피터 린치</p>
            <ul className="list-none space-y-1 text-[12px] text-zinc-300">
              <li>• 성장성(매출·EPS) 흐름 주목</li>
              <li>• 스토리보다 숫자 추세 우선</li>
            </ul>
            </div>          
        </div>

        {/* Arrow 1 */}
        <div className="flex items-center justify-center text-zinc-500">
          <ArrowRight className="h-6 w-6" />
        </div>

        {/* Card 2: 분류 기준 */}
        <div className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <div className="mb-4 flex items-center gap-2 border-l-4 border-blue-500 pl-3">
            <h2 className="text-lg font-bold text-white">분류 기준</h2>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/5 bg-black/30">
            <table className="w-full border-collapse text-left">
              <thead className="bg-white/5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                <tr>
                  <th className="px-3 py-3">유형</th>
                  <th className="px-3 py-3">조건</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[11px] text-zinc-200">
                {[ 
                  { type: "우량 가치주", desc: "버핏 ≥ 4 & 린치 ≤ 1" },
                  { type: "성장 잠재주", desc: "린치 ≥ 3 & 버핏 ≤ 2" },
                  { type: "종합 우량주", desc: "버핏 + 린치 ≥ 5" },
                  { type: "투자 유보", desc: "버핏 + 린치 ≤ 2" },
                  { type: "중립 보통주", desc: "위 조건 외" },
                ].map((item, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-3 py-3 font-bold text-white">{item.type}</td>
                    <td className="px-3 py-3 text-zinc-200">{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Arrow 2 */}
        <div className="flex items-center justify-center text-zinc-500">
          <ArrowRight className="h-6 w-6" />
        </div>

        {/* Card 3: 투자유형 */}
        <div className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <div className="mb-3 flex items-center gap-2 border-l-4 border-purple-500 pl-3">
            <h2 className="text-lg font-bold">유형 해석</h2>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {[ 
              { title: "종합 우량주", desc: "가치·성장 균형, 안정성 높음", accent: "" },
              { title: "우량 가치주", desc: "저평가·안정 구간 강점", accent: "" },
              { title: "성장 잠재주", desc: "성장 지표 강하고 확장 국면", accent: "" },
              { title: "중립 보통주", desc: "지표 혼재, 추가 확인 필요", accent: "" },
              { title: "투자 유보", desc: "불확실성/리스크 높음", accent: "" },
            ].map((item) => (
              <div
                key={item.title}
                className={`col-span-2 rounded border border-white/10 bg-white/5 p-3 transition hover:border-purple-500/50 hover:bg-white/10 ${item.accent}`}
              >
                <p className="text-xs font-bold text-white">{item.title}</p>
                <p className="text-[10px] text-zinc-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function FeatureCarousel({
  items,
}: {
  items: Array<{
    title: string;
    desc: string;
    imgSrc?: string | [string, string];
    component?: React.ReactNode;
    badge?: string;
    icon: React.ReactNode;
  }>;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const scrollByOne = (dir: "prev" | "next") => {
    if (!ref.current) return;
    const el = ref.current;
    const slide = el.querySelector<HTMLElement>("[data-slide='true']");
    const w = slide?.offsetWidth ?? el.clientWidth;
    el.scrollBy({ left: dir === "next" ? w : -w, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: "none" as any }}
      >
        {items.map((it, idx) => (
          <div
            key={it.title}
            data-slide="true"
            className="relative w-full flex-none snap-center"
          >
            <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
              {/* ✅ 이미지 영역: 16:9 고정 + contain */}
              <div className="relative w-full bg-black/30 aspect-video">
                {it.component ? (
                    it.component
                ) : Array.isArray(it.imgSrc) ? (
                  // 2장일 때
                  <div className="grid h-full w-full grid-cols-1 gap-2 p-3 sm:grid-cols-2">
                    <div className="overflow-hidden rounded-lg bg-black/20">
                      <img
                        src={it.imgSrc[0]}
                        alt={`${it.title} view 1`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="overflow-hidden rounded-lg bg-black/20">
                      <img
                        src={it.imgSrc[1]}
                        alt={`${it.title} view 2`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  // 1장일 때
                  <img
                    src={it.imgSrc}
                    alt={it.title}
                    className="h-full w-full object-contain"
                  />
                )}

                {/* 배지 */}
                {it.badge ? (
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-3 py-1 text-xs text-zinc-900 backdrop-blur">
                    {it.icon}
                    <span>{it.badge}</span>
                  </div>
                ) : null}

                {/* Hover 오버레이 화살표 */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-y-0 left-0 flex w-16 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => scrollByOne("prev")}
                      className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-zinc-200 bg-white/90 text-zinc-900 opacity-0 backdrop-blur transition
                                 group-hover:opacity-100 hover:bg-zinc-100"
                      aria-label="Previous"
                      title="Previous"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="absolute inset-y-0 right-0 flex w-16 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => scrollByOne("next")}
                      className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-zinc-200 bg-white/90 text-zinc-900 opacity-0 backdrop-blur transition
                                 group-hover:opacity-100 hover:bg-zinc-100"
                      aria-label="Next"
                      title="Next"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/35 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/35 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
              </div>

              {/* 텍스트 */}
              <div className="p-5">
                <div className="text-base font-semibold text-zinc-900 md:text-lg">
                  {it.title}
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-700 break-keep">
                  {it.desc}
                </p>
                <div className="mt-4 text-xs text-zinc-500">
                  {idx + 1} / {items.length}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DeepViPortfolioPage() {
  const featureCards = [
    {
      title: "AI 재무 해석 코멘트",
      desc: "최근 2년간 재무제표와 경제 지표,뉴스,주가 등을 근거로 기업에 대한 분석 코멘트를 제공합니다.",
      imgSrc: withBasePath("/reco.png"),
      icon: <BarChart3 className="h-4 w-4 text-zinc-900" />,
    },
    {
      title: "5가지 기업 유형 분류",
      desc: "워렌 버핏과 피터 린치의 투자 철학을 기반으로 기업의 재무지표를 점수화하여 5가지 유형으로 분류하였습니다.",
      component: <TypeAnalysisVisual />,
      icon: <Layers3 className="h-4 w-4 text-zinc-900" />,
    },
    {
      title: "재무 건전성 평가",
      desc: "복잡한 재무제표를 수익성·현금·안정성의 핵심 구조로 재구성해, 전년 대비 기업의 재무 상태를 한눈에 파악할 수 있습니다.",
      imgSrc: withBasePath("/finacial.png"),
      icon: <ShieldCheck className="h-4 w-4 text-zinc-900" />,
    },
    {
      title: "뉴스 감정 분석 - 워드 클라우드",
      desc: "뉴스의 맥락을 분석해 기업 이슈를 키워드로 시각화합니다.",
      imgSrc: withBasePath("/cloud2.png"),
      icon: <MessageCircleQuestion className="h-4 w-4 text-zinc-900" />,
    },
    {
      title: "뉴스 감정 분석 - 감정 분류",
      desc: "뉴스 내용을 감정 단위로 분석해 긍정/부정/중립을 분류합니다.",
      imgSrc: withBasePath("/senti.png"),
      icon: <MessageCircleQuestion className="h-4 w-4 text-zinc-900" />,
    },
    {
      title: "Q&A 해석 시스템",
      desc: "질문 → 근거 데이터 참조 → 설명형 답변으로 '왜'에 답합니다.",
      imgSrc: withBasePath("/QnA.png"),
      icon: <MessageCircleQuestion className="h-4 w-4 text-zinc-900" />,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-zinc-900">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-200px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-[-160px] top-[160px] h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_45%)]" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-zinc-900">DeepVi</div>
              <div className="ml-2 hidden text-xs text-zinc-600 md:block">
                LLM 기반 기업 분석 서비스
              </div>
            </div>
            <nav className="flex items-center gap-6">
              <a href={withBasePath("/")} className="text-sm text-zinc-600 transition hover:text-zinc-900">
                Home
              </a>
              <a href={withBasePath("/projects/deepvi")} className="text-sm text-zinc-900 font-semibold transition hover:text-zinc-700">
                DeepVi
              </a>
              <a
                href={withBasePath("/projects/pricelens")}
                className="text-sm text-zinc-600 transition hover:text-zinc-900"
              >
                PriceLens
              </a>
              <a
                href={withBasePath("/projects/tableau")}
                className="text-sm text-zinc-600 transition hover:text-zinc-900"
              >
                Tableau
              </a>
            </nav>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section id="intro" className="pt-14 md:pt-20">
        <Container>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700 shadow-sm">
              Python · FastAPI · PostgreSQL · LLM · LangChain · RAG
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-900 md:text-6xl">
              데이터를 넘어,
              <br className="hidden md:block" /> 기업의 본질을 설명합니다
            </h1>

            <p className="mt-5 max-w-4xl text-sm leading-6 text-zinc-700">
            DeepVi는 재무제표와 시장 맥락을 해석해,<br />
            기업을 ‘투자 판단 이전 단계에서 이해’하도록 돕는 LLM 기반 기업 분석 서비스입니다.
            </p>
            
            {/* Quick chips */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-zinc-700">
              {[
                "기간: 25.05.28 - 25.07.02",
                "5가지 기업 유형",
                "재무 건전성 평가",
                "뉴스 감정 분석",
                "RAG 기반 Q&A",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-zinc-200 bg-white px-3 py-1 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Problem / Solution */}
      <section id="problem" className="mt-16 md:mt-24">
        <Container>
          <SectionTitle
            eyebrow="Background"
            title="왜 DeepVi가 필요한가?"
            desc="정보는 넘쳐나지만, 기업의 성격과 위험을 한눈에 설명해주는 해석은 부족합니다."
            wide
          />

          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              custom={0}
            >
              <Card
                title="Problem"
                icon={<div className="h-2 w-2 rounded-full bg-red-400" />}
              >
                <ul className="list-disc space-y-2 pl-5">
                  <li>재무제표는 중요하지만, 일반 투자자가 해석하기엔 진입 장벽이 높음</li>
                  <li>수치·지표는 많지만 기업의 성격·리스크를 직관적으로 설명하지 못함</li>
                  <li>뉴스·지표 데이터는 맥락 없는 나열에 그치는 경우가 많음</li>
                  <li>그 결과, 투자 판단이 감·소문·이슈 중심으로 흐르기 쉬움</li>
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              custom={1}
            >
              <Card
                title="Solution"
                icon={<div className="h-2 w-2 rounded-full bg-blue-400" />}
              >
                <ul className="list-disc space-y-2 pl-5">
                  <li>재무 데이터를 기반으로 기업 성격/리스크 구조를 설명</li>
                  <li>5가지 기업 유형 분류로 기업의 성격을 한눈에 파악</li>
                  <li>뉴스 감정 분석을 통한 직관적인 기업 이슈 파악</li>
                  <li>투자자가 "이해하고 판단"할 수 있는 코멘트 제공</li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </Container>

        {/* Process Flow */}
        <section id="process" className="mt-16 md:mt-24">
        <Container>
            <SectionTitle
            eyebrow="Process"
            title="DeepVi 분석 프로세스"
            desc={
              <>
                데이터 수집부터 AI 모델링까지의 엔드투엔드 파이프라인을 구축했습니다.
                <span className="ml-2 text-xs font-normal text-zinc-500">
                  (KOSPI/KOSDAQ 444개 기업 대상)
                </span>
              </>
            }
            wide
            />

            <div className="relative">
              {/* Mobile: Vertical stack / Desktop: Horizontal row */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-2">
                {[
                  {
                    step: "01",
                    title: "데이터 수집",
                    desc: "재무·뉴스·주가·기업·경제 데이터 수집",
                    icon: <Database className="h-5 w-5" />,
                  },
                  {
                    step: "02",
                    title: "ML 기반 지표 도출",
                    desc: "머신러닝을 활용한 재무 건전성 평가 지표 산출",
                    icon: <BarChart3 className="h-5 w-5" />,
                  },
                  {
                    step: "03",
                    title: "DB 및 API 구축",
                    desc: "PostgreSQL + FastAPI 기반 데이터 연동",
                    icon: <Layers3 className="h-5 w-5" />,
                  },
                  {
                    step: "04",
                    title: "AI 분석",
                    desc: "LangChain+RAG 활용 LLM 기반 자연어 해석",
                    icon: <BrainCircuit className="h-5 w-5" />,
                  },
                  {
                    step: "05",
                    title: "대시보드 제공",
                    desc: "보고서·Q&A·시각화 결과",
                    icon: <LayoutDashboard className="h-5 w-5" />,
                  },
                ].map((item, idx, arr) => (
                  <React.Fragment key={item.step}>
                    <motion.div
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.35 }}
                      variants={fadeUp}
                      custom={idx}
                      className="flex-1"
                    >
                      <div className="group relative z-10 flex h-full flex-col items-center rounded-2xl border border-zinc-200 bg-white p-5 text-center transition-all hover:bg-zinc-50 hover:border-zinc-300 shadow-sm">
                        {/* Glow effect */}
                        <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                          <div className="absolute -top-12 left-1/2 h-24 w-48 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl opacity-50" />
                        </div>

                        {/* Icon */}
                        <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900">
                          {item.icon}
                        </div>

                        {/* Text */}
                        <div className="mb-1 text-[11px] font-bold text-blue-600">
                          STEP {item.step}
                        </div>
                        <h3 className="text-sm font-semibold text-zinc-900">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs leading-5 text-zinc-600 break-keep">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>

                    {/* Arrow between steps (except last) */}
                    {idx < arr.length - 1 && (
                      <div className="flex items-center justify-center py-2 text-zinc-600 lg:py-0">
                        <ArrowDown className="block h-5 w-5 lg:hidden" />
                        <ArrowRight className="hidden h-5 w-5 lg:block" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
                <span className="font-semibold text-zinc-900">(수정하기)프로젝트 내 역할:</span>{" "}
                뉴스·재무건전성 평가를 제외하고, 기획→수집→백엔드/DB→LLM→대시보드→배포까지 전 과정을 주도했습니다.
              </div>
            </div>
        </Container>
        </section>
        
        {/* Achievements (Post-evaluation) */}
        <section id="achievements" className="mt-16 md:mt-24">
        <Container>
            <SectionTitle
            eyebrow="Backtest / Post-evaluation"
            title="DeepVi 유형 분류의 시장 유효성"
            desc="재무 기반 유형 분류가 단순 분류를 넘어, 시장 성과와 위험 구조를 설명하는 유효한 정보 구조임을 검증했습니다."
            wide
            />

            {/* KPI Cards (줄이고 의미만 남김) */}
            <div className="grid gap-4 md:grid-cols-2">
            {[
                {
                label: "유형별 최고 평균 수익률",
                value: "성장 잠재주 +22.96%",
                desc: "유형 평균 수익률 1위 (31개). 성장 지표가 시장 성과로 연결된 경향을 확인.",
                icon: <ArrowUpRight className="h-5 w-5 text-emerald-400" />,
                },
                {
                label: "리스크(변동성) 최대 유형",
                value: "투자 유보 53.80%",
                desc: <>유형 내 성과 분산이 가장 큼. (최대 +261.39% / 최소 -56.5%)<br />이벤트 의존적 리스크 신호로 해석.</>,
                icon: <BarChart3 className="h-5 w-5 text-zinc-700" />,
                },
            ].map((item, idx) => (
                <motion.div
                key={item.label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeUp}
                custom={idx}
                >
                <div className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition hover:bg-zinc-50 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        {item.label}
                    </span>
                    {item.icon}
                    </div>

                    <div className="mb-2 text-2xl font-bold text-zinc-900 break-keep">
                    {item.value}
                    </div>

                    <p className="text-xs leading-5 text-zinc-600 break-keep">
                    {item.desc}
                    </p>
                </div>
                </motion.div>
            ))}
            </div>

            <TypeReturnBar />

            {/* Key Insight (1박스로 압축) */}
            <div className="mt-8">
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeUp}
                custom={8}
            >
                <Card
                title="후평가 핵심 인사이트"
                icon={<div className="h-2 w-2 rounded-full bg-blue-400" />}
                >
                <ul className="list-disc space-y-2 pl-5 text-sm">
                    <li>
                    재무 기반 유형 분류만으로도 <b>유형별 성과 구조(수익/리스크)가 구분</b>되는
                    경향을 확인했습니다.
                    </li>
                    <li>
                    <b>성장 잠재주</b>는 평균 수익률이 가장 높았고, <b>투자 유보</b>는 성과 분산이
                    가장 커 <b>리스크 신호</b>로 해석됩니다.
                    </li>
                    <li>
                    투자 유보 유형은 바이오/제약 비중이 높아 <b>신약·임상 이벤트</b>에 의해
                    성과가 크게 갈리는 구조가 관찰되었습니다.
                    </li>
                    <li>
                    이러한 유형 간 성과 차이는 단순 우연이 아닌, 섹터 구성과 재무적 특성 차이에 기반한
                    구조적 결과임을 시사했습니다.
                    </li>
                </ul>
                </Card>
            </motion.div>
            </div>
        </Container>
        </section>

      </section>
        {/* Features */}
        <section id="features" className="mt-16 md:mt-24">
        <Container>
            <SectionTitle
            eyebrow="Core"
            title="핵심 기능"
            desc="기능별 화면을 크게 보고, 좌우로 넘기며 흐름을 이해할 수 있게 구성했습니다."
            />

            {/* Controls + Carousel */}
            <FeatureCarousel items={featureCards} />
        </Container>
        </section>

      {/* Demo Video (큰 증거) */}
      <section id="demo" className="mt-16 md:mt-24">
        <Container>
          <SectionTitle
            eyebrow="Demo"
            title="AI 답변 생성"
            desc="기업에 대해 LLM이 실시간으로 답변을 생성하는 과정을 담았습니다."
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeUp}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl"
          >
            <video
              src={withBasePath("/demo3.mp4")}
              muted
              autoPlay
              loop
              playsInline
              className="h-auto w-full"
            />
          </motion.div>

          <p className="mt-3 text-xs text-zinc-600">
          </p>
        </Container>
      </section>

      {/* Stack */}
      <section id="stack" className="mt-16 md:mt-24">
        <Container>
          <div className="mt-10 border-t border-zinc-200 pt-6 text-center text-xs text-zinc-600">
            DeepVi — 설명 가능한 재무 해석 중심 기업 분석<br /> © 2025 All Rights Reserved
          </div>
        </Container>
      </section>

      {/* Floating Navigation */}
      <nav className="fixed bottom-8 left-1/2 z-30 hidden -translate-x-1/2 lg:block">
        <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white/90 px-2 py-2 shadow-lg backdrop-blur">
          {[
            { id: "intro", label: "소개" },
            { id: "problem", label: "배경" },
            { id: "process", label: "프로세스" },
            { id: "achievements", label: "성과" },
            { id: "features", label: "기능" },
            { id: "demo", label: "데모" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  const headerOffset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                  });
                }
              }}
              className="rounded-full px-4 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </main>
  );
}
