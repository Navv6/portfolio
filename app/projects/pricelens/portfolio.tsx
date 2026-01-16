"use client";

import { motion } from "framer-motion";
import React from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.08 * i, ease: "easeOut" },
  }),
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string) => `${basePath}${path}`;

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-5">{children}</div>;
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
    <div className="mb-10">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p
          className={`mt-3 text-sm leading-6 text-slate-700 md:text-base break-keep
            ${wide ? "max-w-4xl" : "max-w-2xl"}`}
        >
          {desc}
        </p>
      ) : null}
      {caption ? <p className="mt-2 text-xs text-slate-500">{caption}</p> : null}
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
    <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.5)] backdrop-blur">
      <div className="flex items-center gap-2">
        {icon}
        <div className="text-sm font-semibold text-slate-900">{title}</div>
      </div>
      <div className="mt-4 text-sm leading-6 text-slate-700">{children}</div>
    </div>
  );
}

export default function PriceLensPortfolioPage() {
  return (
    <main className="min-h-screen bg-[#f6f4f0] text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-180px] h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[#ffb347]/35 blur-3xl" />
        <div className="absolute right-[-180px] top-[160px] h-[520px] w-[520px] rounded-full bg-[#ffcc80]/45 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.6),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.6),rgba(255,255,255,0))]" />
      </div>

      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-[#f6f4f0]/80 backdrop-blur">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-slate-900">PriceLens</div>
              <div className="ml-2 hidden text-xs text-slate-600 md:block">
                Airbnb 숙소 가격 결정 요인 해석
              </div>
            </div>
            <nav className="flex items-center gap-6">
              <a href={withBasePath("/")} className="text-sm text-slate-600 transition hover:text-slate-900">
                Home
              </a>
              <a href={withBasePath("/projects/deepvi")} className="text-sm text-slate-600 transition hover:text-slate-900">
                DeepVi
              </a>
              <a
                href={withBasePath("/projects/pricelens")}
                className="text-sm text-slate-900 font-semibold transition hover:text-slate-700"
              >
                PriceLens
              </a>
              <a
                href={withBasePath("/projects/tableau")}
                className="text-sm text-slate-600 transition hover:text-slate-900"
              >
                Tableau
              </a>
            </nav>
          </div>
        </Container>
      </header>

      <section id="intro" className="pt-16 md:pt-24">
        <Container>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs text-slate-700 shadow-sm">
              Python · Pandas · Tree Models · SHAP
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
              가격은 예측보다
              <br className="hidden md:block" /> 이해될 때 강해진다
            </h1>

            <p className="mt-6 max-w-4xl text-sm leading-6 text-slate-700">
              숙소의 위치, 편의시설, 리뷰 등 다양한 요인이 가격에 미치는 영향을 정량적으로 분석합니다.
              <br />
              목표는 단순 정확도가 아니라 “왜 이 가격이 나왔는지” 설명 가능한 구조를 만드는 것입니다.
            </p>

            <div className="mt-10 flex flex-wrap gap-2 text-xs text-slate-700">
              {[
                "회귀 기반 가격 예측",
                "피처 엔지니어링",
                "SHAP 해석",
                "설명 가능 ML",
                "가격 결정 메커니즘",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      <section id="goal" className="mt-16 md:mt-24">
        <Container>
          <SectionTitle
            eyebrow="Project Goal"
            title="가격 결정 메커니즘을 데이터로 설명"
            desc="예측값을 넘어, 어떤 특성이 가격을 끌어올리거나 낮추는지 투명하게 보여주는 모델을 설계했습니다."
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
              <Card title="핵심 과제" icon={<div className="h-2 w-2 rounded-full bg-rose-400" />}>
                <ul className="list-disc space-y-2 pl-5">
                  <li>숙소 특성의 영향력을 정량화</li>
                  <li>예측 성능과 설명 가능성의 균형</li>
                  <li>피처 구조화와 변수 간 상호작용 정리</li>
                  <li>해석 결과를 비전문가도 이해 가능하게 전달</li>
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
              <Card title="주요 접근" icon={<div className="h-2 w-2 rounded-full bg-amber-400" />}>
                <ul className="list-disc space-y-2 pl-5">
                  <li>회귀 기반 가격 예측 모델 설계</li>
                  <li>피처 엔지니어링으로 숙소 특성 구조화</li>
                  <li>SHAP 기반 해석으로 가격 결정 요인 도출</li>
                  <li>결과를 인사이트 카드로 요약</li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      <section id="meaning" className="mt-16 md:mt-24">
        <Container>
          <SectionTitle
            eyebrow="Meaning"
            title="설명 중심 ML 설계 철학의 출발점"
            desc="이 프로젝트는 “예측이 아니라 설명이 가치다”라는 관점을 정립했고, 이후 DeepVi의 해석 중심 모델 설계 철학으로 자연스럽게 연결됩니다."
            wide
          />
        </Container>
      </section>

      <section id="stack" className="mt-16 md:mt-24">
        <Container>
          <SectionTitle eyebrow="Tech Stack" title="기술 스택" />
          <div className="grid gap-3 md:grid-cols-5">
            {["Python", "Pandas", "Tree Models", "SHAP", "Explainable ML"].map((tech) => (
              <div
                key={tech}
                className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-center text-sm font-semibold text-slate-900 shadow-sm"
              >
                {tech}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="mt-16 md:mt-24 border-t border-slate-200/70 pt-10">
        <Container>
          <div className="text-center text-xs text-slate-600">
            PriceLens · Airbnb 숙소 가격 예측 프로젝트
            <br /> © 2025 All Rights Reserved
          </div>
        </Container>
      </section>
    </main>
  );
}
