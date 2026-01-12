"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  ShieldCheck,
  Layers3,
  MessageCircleQuestion,
  ArrowUpRight,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i, ease: "easeOut" },
  }),
};

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl px-5">{children}</div>;
}

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-8">
      <div className="text-sm text-zinc-400">{eyebrow}</div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 md:text-base">
          {desc}
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
      <div className="flex items-center gap-2">
        {icon}
        <div className="text-sm font-semibold text-zinc-100">{title}</div>
      </div>
      <div className="mt-3 text-sm leading-6 text-zinc-300">{children}</div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#070A12] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-200px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-[-160px] top-[160px] h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_45%)]" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#070A12]/70 backdrop-blur">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 text-sm font-bold">
                DV
              </div>
              <div className="text-sm font-semibold text-zinc-100">DeepVi</div>
              <div className="ml-2 hidden text-xs text-zinc-400 md:block">
                LLM 기반 기업 분석 랜딩
              </div>
            </div>

            <nav className="hidden items-center gap-5 text-sm text-zinc-300 md:flex">
              <a className="hover:text-white" href="#problem">
                Problem
              </a>
              <a className="hover:text-white" href="#features">
                Features
              </a>
              <a className="hover:text-white" href="#demo">
                Demo
              </a>
              <a className="hover:text-white" href="#stack">
                Stack
              </a>
            </nav>

            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-zinc-100 hover:bg-white/15"
            >
              데모 보기 <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section className="pt-14 md:pt-20">
        <Container>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300">
              재무 해석 · 투자유형 분류 · 뉴스/주가 맥락
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-100 md:text-6xl">
              데이터를 넘어,
              <br className="hidden md:block" /> 기업의 본질을 설명합니다
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-300 md:text-base">
              DeepVi는 재무제표와 시장 맥락(뉴스·주가 흐름)을 결합해, 투자자가{" "}
              <b className="text-zinc-100">스스로 이해하고 판단</b>할 수 있도록 돕는
              LLM 기반 기업 분석 서비스입니다.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-200"
              >
                데모/스크린샷 보기 <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/[0.06]"
              >
                핵심 기능 보기
              </a>
            </div>

            {/* Quick chips */}
            <div className="mt-10 flex flex-wrap gap-2 text-xs text-zinc-300">
              {[
                "재무 해석 코멘트",
                "5가지 기업 유형",
                "뉴스 감정/맥락",
                "Q&A 기반 설명",
                "FastAPI + Streamlit",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1"
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
            title="왜 DeepVi가 필요한가"
            desc="정보는 많지만 해석은 어렵고, 기존 서비스는 “왜 좋은 기업인지”를 충분히 설명하지 못하는 경우가 많습니다."
          />

          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={fadeUp}
              custom={0}
            >
              <Card title="Problem" icon={<div className="h-2 w-2 rounded-full bg-red-400" />}>
                <ul className="list-disc space-y-2 pl-5">
                  <li>재무제표는 중요하지만, 해석은 전문가 영역에 의존</li>
                  <li>수치·지표는 많지만 “그래서 좋은가?”가 비어 있음</li>
                  <li>결국 감/소문에 의존하거나 판단 비용이 커짐</li>
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
                  <li>뉴스 감정 + 주가 흐름을 보조 맥락으로 연결</li>
                  <li>투자자가 “이해하고 판단”할 수 있는 코멘트 제공</li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section id="features" className="mt-16 md:mt-24">
        <Container>
          <SectionTitle
            eyebrow="Core"
            title="핵심 기능"
            desc="추천이 아니라 해석 중심. 숫자가 의미하는 바를 설명하는 구조로 설계했습니다."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "AI 분석 코멘트",
                icon: <BarChart3 className="h-5 w-5 text-zinc-200" />,
                desc: "재무제표(PL/BS/CF)와 지표를 근거로 성장·수익·안정성 구조를 자연어로 해석합니다.",
              },
              {
                title: "재무 건전성 평가",
                icon: <ShieldCheck className="h-5 w-5 text-zinc-200" />,
                desc: "성장성·수익성·안정성·현금흐름을 종합해 기업 상태를 구조적으로 평가합니다.",
              },
              {
                title: "5가지 기업 유형 분류",
                icon: <Layers3 className="h-5 w-5 text-zinc-200" />,
                desc: "기업의 재무적 성격을 유형화해, 리스크 성격과 해석 프레임을 제공합니다.",
              },
              {
                title: "Q&A 해석 시스템",
                icon: <MessageCircleQuestion className="h-5 w-5 text-zinc-200" />,
                desc: "질문 → 근거 데이터 참조 → 설명형 답변으로 ‘왜’에 답합니다.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeUp}
                custom={i}
              >
                <Card title={f.title} icon={f.icon}>
                  {f.desc}
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Demo */}
      <section id="demo" className="mt-16 md:mt-24">
        <Container>
          <SectionTitle
            eyebrow="Preview"
            title="데모 / 스크린샷"
            desc="여기엔 실제 화면 이미지 2~4장을 넣으면 완성도가 확 올라갑니다. (지금은 자리만 만들어둠)"
          />

          <div className="grid gap-4 md:grid-cols-2">
            {["스크린샷 1", "스크린샷 2"].map((label, i) => (
              <motion.div
                key={label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeUp}
                custom={i}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="flex h-56 items-center justify-center text-sm text-zinc-400">
                  {label} (이미지로 교체)
                </div>
              </motion.div>
            ))}
          </div>

          {/* Optional: video embed placeholder */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm font-semibold text-zinc-100">데모 영상 (선택)</div>
            <p className="mt-2 text-sm text-zinc-300">
              유튜브/loom 링크를 iframe으로 넣으면 노션 임베드도 자연스럽게 연결됩니다.
            </p>
          </div>
        </Container>
      </section>

      {/* Stack */}
      <section id="stack" className="mt-16 md:mt-24 pb-20">
        <Container>
          <SectionTitle eyebrow="Tech" title="기술 스택" />
          <div className="flex flex-wrap gap-2">
            {[
              "Python",
              "FastAPI",
              "PostgreSQL",
              "Streamlit",
              "Pandas",
              "Plotly",
              "OpenAI API",
              "Gemini API",
              "RAG(구성 확장)",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-zinc-400">
            © DeepVi — 설명 가능한 재무 해석 중심 기업 분석
          </div>
        </Container>
      </section>
    </main>
  );
}
