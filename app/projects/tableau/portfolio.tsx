"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

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

export default function TableauPortfolioPage() {
  const [activeFrame, setActiveFrame] = useState<number | null>(null);

  const openFrame = (index: number) => {
    setActiveFrame(index);
  };

  const closeFrame = () => {
    setActiveFrame(null);
  };

  const frames = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
    title: `Frame ${index + 1}`,
    desc: `스토리보드 단계 ${index + 1} 설명 자리. 제목과 핵심 메시지를 함께 배치할 수 있습니다.`,
  }));

  const carouselRef = React.useRef<HTMLDivElement | null>(null);

  const scrollByOne = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const slide = el.querySelector<HTMLElement>("[data-slide='true']");
    const w = slide?.offsetWidth ?? el.clientWidth;
    el.scrollBy({ left: dir === "next" ? w : -w, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#f3f6fb] text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-220px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#7dd3fc]/35 blur-3xl" />
        <div className="absolute right-[-220px] top-[140px] h-[520px] w-[520px] rounded-full bg-[#a5b4fc]/35 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.7),transparent_48%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.6),rgba(255,255,255,0))]" />
      </div>

      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-[#f3f6fb]/80 backdrop-blur">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-slate-900">Tableau</div>
              <div className="ml-2 hidden text-xs text-slate-600 md:block">
                전투 데이터 기반 초보자 가이드
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
                className="text-sm text-slate-600 transition hover:text-slate-900"
              >
                PriceLens
              </a>
              <a
                href={withBasePath("/projects/tableau")}
                className="text-sm text-slate-900 font-semibold transition hover:text-slate-700"
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
              Tableau · Riot API · Data Storytelling
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
              전투사관학교
              <br className="hidden md:block" /> 챔피언 초보자 가이드
            </h1>

            <p className="mt-6 max-w-4xl text-sm leading-6 text-slate-700">
              게임 초보자의 고민은 명확합니다. “어떤 챔피언을 골라야 하지?”, “내 실력에 맞는 캐릭터는?”,
              “상대 스킬이 뭔지 모르겠어…”.
              <br />
              그래서 초보자가 꼭 알아야 할 핵심 질문을 기준으로 추천 시스템을 설계했습니다.
            </p>

            <div className="mt-10 flex flex-wrap gap-2 text-xs text-slate-700">
              {[
                "챔피언 추천",
                "아이템 가이드",
                "포지션 추천",
                "초보자 맞춤 설계",
                "Tableau 스토리텔링",
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

      <section id="guidebook" className="mt-16 md:mt-24">
        <Container>
          <SectionTitle
            eyebrow="Guidebook"
            title="TEST"
            desc="최종 가이드북 대시보드 화면을 큰 이미지로 보여주는 영역입니다."
            wide
          />
          <div className="relative group">
            <div
              ref={carouselRef}
              className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
              style={{ scrollbarWidth: "none" as any }}
            >
              {frames.map((frame) => (
                <div
                  key={`carousel-${frame.id}`}
                  data-slide="true"
                  className="relative w-full flex-none snap-center"
                >
                  <div className="group overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-white/70 shadow-sm">
                    <button
                      type="button"
                      onClick={() => openFrame(frame.id)}
                      className="flex h-[360px] w-full items-center justify-center bg-white/80 text-sm text-slate-500 transition hover:text-slate-600"
                    >
                      {frame.title} 이미지 자리
                    </button>
                    <div className="p-5">
                      <div className="text-base font-semibold text-slate-900">
                        {frame.title}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {frame.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex w-16 items-center justify-center">
              <button
                type="button"
                onClick={() => scrollByOne("prev")}
                className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-900 opacity-0 backdrop-blur transition group-hover:opacity-100 hover:bg-slate-100"
                aria-label="Previous"
                title="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex w-16 items-center justify-center">
              <button
                type="button"
                onClick={() => scrollByOne("next")}
                className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-900 opacity-0 backdrop-blur transition group-hover:opacity-100 hover:bg-slate-100"
                aria-label="Next"
                title="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/70 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/70 to-transparent opacity-0 transition group-hover:opacity-100" />
          </div>
        </Container>
      </section>

      <section id="goal" className="mt-16 md:mt-24">
        <Container>
          <SectionTitle
            eyebrow="Project Goal"
            title="초보자에게 필요한 3가지 질문에 답한다"
            desc="“어떤 챔피언을 골라야 하는가?”, “어떤 아이템을 사야 하는가?”, “무슨 라인을 가야 하는가?”를 기준으로 추천 구조를 설계했습니다."
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
              <Card title="데이터 접근" icon={<div className="h-2 w-2 rounded-full bg-sky-400" />}>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Riot 개발자 API로 필요한 데이터를 전량 수집</li>
                  <li>고급 모델링보다 데이터 구조화에 집중</li>
                  <li>Tableau 분석에 맞게 피벗/정제 수행</li>
                  <li>시각화 설계를 중심으로 인사이트 전달</li>
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
              <Card title="핵심 기능" icon={<div className="h-2 w-2 rounded-full bg-indigo-400" />}>
                <ul className="list-disc space-y-2 pl-5">
                  <li>챔피언 성장치·기본 스탯 기반 우선 추천</li>
                  <li>초보자 기준의 아이템/라인 가이드 제공</li>
                  <li>대시보드 레이아웃과 흐름을 시각화 중심으로 설계</li>
                  <li>복잡한 분석 대신 직관적 이해를 목표로 구성</li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      <section id="work" className="mt-16 md:mt-24">
        <Container>
          <SectionTitle
            eyebrow="What I Built"
            title="입문자 가이드를 위한 설계와 구현"
            desc="피드백에 담긴 작업 내용을 바탕으로, 실제로 어떤 문제를 어떻게 풀었는지 핵심만 발췌해 구성했습니다."
            wide
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="문제 정의 및 UX 설계" icon={<div className="h-2 w-2 rounded-full bg-emerald-400" />}>
              <ul className="list-disc space-y-2 pl-5">
                <li>롤 입문자라는 구체적 타겟을 정의하고 핵심 고민을 도출</li>
                <li>챔피언 선택·아이템 구매·라인 선택을 중심 질문으로 구성</li>
                <li>챔피언 소개/비교/검색 대시보드로 입문자 흐름 설계</li>
                <li>팝업 요약 정보 등 사용성 중심의 UI 구성</li>
              </ul>
            </Card>
            <Card title="데이터 설계 및 시각화" icon={<div className="h-2 w-2 rounded-full bg-amber-400" />}>
              <ul className="list-disc space-y-2 pl-5">
                <li>스탯 정규화와 성장형/초반형 분류로 챔피언 특성화</li>
                <li>점수 기반 종합 스탯으로 난이도 정량화 시도</li>
                <li>Riot API 데이터 수집 후 Tableau 맞춤 피벗/정제</li>
                <li>시각화 디자인 완성도와 스토리 흐름에 집중</li>
              </ul>
            </Card>
          </div>
          <div className="mt-10">
            <div className="mb-1 text-sm font-semibold text-slate-900">Storyboard</div>
            <div className="mb-4 text-xs text-slate-500">
              설계와 구현 흐름을 시각적으로 정리한 단계별 보드입니다.
            </div>
            <div className="space-y-4">
              {frames.map((frame) => (
                <div
                  key={`story-${frame.id}`}
                  className="flex flex-col gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/70 p-4 text-slate-600 md:flex-row md:items-center"
                >
                  <button
                    type="button"
                    onClick={() => openFrame(frame.id)}
                    className="flex h-28 w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/80 text-xs text-slate-500 transition hover:border-slate-400 hover:text-slate-600 md:h-24 md:w-40"
                  >
                    {frame.title}
                  </button>
                  <div className="text-sm text-slate-600">{frame.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {activeFrame !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-6"
          onClick={closeFrame}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeFrame}
              className="absolute right-4 top-4 rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              닫기
            </button>
            <div className="flex h-[420px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              {frames[activeFrame]?.title} 확대 보기
            </div>
            <div className="mt-4 text-sm text-slate-600">
              {frames[activeFrame]?.desc}
            </div>
          </div>
        </div>
      ) : null}

      <section id="download" className="mt-16 md:mt-24">
        <Container>
          <SectionTitle
            eyebrow="Tableau File"
            title="Tableau 파일 다운로드"
            desc="파일 준비 후 버튼에 실제 파일 경로를 연결하면 바로 다운로드됩니다."
          />
          <div className="flex flex-col gap-3 rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">전투사관학교 대시보드</div>
              <div className="mt-1 text-xs text-slate-500">
                파일 경로 예시: public/files/tableau/academy.twbx
              </div>
            </div>
            <a
              href={withBasePath("/files/tableau/academy.twbx")}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              download
            >
              Tableau 파일 다운로드
            </a>
          </div>
        </Container>
      </section>

      <section id="stack" className="mt-16 md:mt-24">
        <Container>
          <SectionTitle eyebrow="Tech Stack" title="기술 스택" />
          <div className="grid gap-3 md:grid-cols-5">
            {["Tableau", "Riot API", "Data Viz", "Storytelling", "Analytics"].map((tech) => (
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
            Tableau · 전투사관학교 프로젝트
            <br /> © 2025 All Rights Reserved
          </div>
        </Container>
      </section>
    </main>
  );
}
