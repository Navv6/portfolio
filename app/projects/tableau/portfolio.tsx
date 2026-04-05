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
  return <div className="mx-auto w-full max-w-5xl px-5">{children}</div>;
}

function SectionTitle({
  eyebrow,
  title,
  desc,
  wide = false,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  wide?: boolean;
}) {
  return (
    <div className="mb-10">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{eyebrow}</div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">{title}</h2>
      {desc && (
        <p className={`mt-3 text-sm leading-6 text-slate-700 md:text-base break-keep ${wide ? "max-w-4xl" : "max-w-2xl"}`}>
          {desc}
        </p>
      )}
    </div>
  );
}

function Card({ title, icon, children, className = "" }: { title: string; icon?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <div className="text-sm font-semibold text-slate-900">{title}</div>
      </div>
      <div className="text-sm leading-6 text-slate-700">{children}</div>
    </div>
  );
}

export default function TableauPortfolioPage() {
  const [activeFrame, setActiveFrame] = useState<number | null>(null);
  const [activeAnalysis, setActiveAnalysis] = useState<{
    title: string;
    image: string;
    summary: string;
    detail: string;
  } | null>(null);

  const frames = [
    {
      id: 0,
      title: "시작 페이지",
      image: "/tableau/시작.png",
      desc: "전투사관학교 스킨 챔피언들이 카드 형태로 펼쳐지는 로비 화면입니다. START 버튼을 클릭하면 가이드북으로 진입합니다.",
    },
    {
      id: 1,
      title: "챔피언 상세",
      image: "/tableau/챔피언상세.png",
      desc: "매개변수로 챔피언을 선택하면 6각형 레이더 차트, 추천 아이템 5종, 유사 챔피언 TOP3가 동시에 전환됩니다. FIXED LOD 계산식으로 유사 챔피언을 자동 필터링합니다.",
    },
    {
      id: 2,
      title: "챔피언 비교",
      image: "/tableau/챔피언비교.png",
      desc: "하단 갤러리에서 두 챔피언을 선택하면 기본 스탯 8개와 역할 스탯 7개를 가로 막대 차트로 나란히 비교합니다. 이미지 클릭이 곧 필터입니다.",
    },
    {
      id: 3,
      title: "챔피언 팝업",
      image: "/tableau/챔피언팝업창.png",
      desc: "전체 챔피언 갤러리에서 이미지를 클릭하면 Tableau 확장 기능을 활용한 팝업 화면이 열립니다. 챔피언 설명, 추천 아이템 5종, P~R 스킬 아이콘을 깔끔한 카드 형태로 확인할 수 있게 구성했습니다.",
    },
  ];

  const carouselRef = React.useRef<HTMLDivElement | null>(null);

  const scrollByOne = (dir: "prev" | "next") => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const slide = el.querySelector<HTMLElement>("[data-slide='true']");
    const w = slide?.offsetWidth ?? el.clientWidth;
    el.scrollBy({ left: dir === "next" ? w : -w, behavior: "smooth" });
  };

  const storyItems = [
    {
      frameId: 1,
      badge: "챔피언소개",
      badgeColor: "bg-sky-100 text-sky-700",
      dot: "bg-sky-400",
      steps: [
        "매개변수 [챔피언 1 선택]을 기준으로 설명, 레이더 차트, 추천 아이템, 유사 챔피언 시트를 동시에 연동",
        "[라인추출], [주역할추출] 계산으로 선택 챔피언의 라인·역할을 먼저 고정하고, [비슷한챔피언뽑아내기] 필드로 같은 조건이면서 자기 자신은 제외한 챔피언만 남기도록 구성",
        "[TOP 3]는 INDEX() <= 3 테이블 계산으로 상위 3명만 노출되게 제한해, 유사 챔피언 영역이 항상 간결하게 유지되도록 설계",
        "기본 스탯 6개를 레이더 차트로 재구성해 캐릭터 특성을 한눈에 비교 가능하게 설계",
        "추천 아이템 시트와 스킬 시트를 연결해 챔피언 전환 시 즉시 갱신되도록 구성",
      ],
    },
    {
      frameId: 2,
      badge: "챔피언비교",
      badgeColor: "bg-violet-100 text-violet-700",
      dot: "bg-violet-400",
      steps: [
        "매개변수 [챔피언 1 선택], [챔피언 2 선택]을 각각 좌·우 비교 축으로 사용",
        "단순 선택값만 둔 것이 아니라 [챔피언 1 이미지], [챔피언 2 이미지] 계산 필드를 따로 만들어 각 매개변수에 맞는 로딩 스크린 URL이 서로 다른 위치에 표시되도록 구성",
        "기본 스탯 8개와 역할 스탯 7개를 가로 막대 차트로 나눠 두 챔피언 차이를 직관적으로 비교",
        "하단 갤러리 이미지 시트를 필터처럼 동작하게 만들어 이미지 클릭 자체가 비교 흐름이 되도록 설계",
        "라인·역할 필터를 함께 두어 같은 포지션 안에서 비교 대상을 빠르게 좁힐 수 있게 구성",
      ],
    },
    {
      frameId: 3,
      badge: "챔피언검색",
      badgeColor: "bg-emerald-100 text-emerald-700",
      dot: "bg-emerald-400",
      steps: [
        "매개변수 [챔피언 검색 매개변수]와 검색용 필터 시트를 연결해 원하는 챔피언을 바로 탐색",
        "대시보드 액션으로 이미지 클릭 시 팝업 시트에 필터값을 전달해 상세 정보가 열리도록 구현",
        "AppsforTableau의 Picture This 확장 기능을 활용해 팝업 레이아웃을 더 깔끔하게 구성",
        "팝업 안에 챔피언 설명, 추천 아이템 5종, P~R 스킬 시트를 한 번에 배치해 탐색과 상세 확인이 이어지도록 설계",
      ],
    },
  ];

  const analysisItems = [
    {
      title: "종합점수 트리맵",
      image: "/tableau/종합점수트리맵.png",
      summary: "정규화한 주요 스탯을 합산한 종합점수로 각 챔피언의 전반적인 성능 분포를 한눈에 볼 수 있게 했습니다.",
      detail: "난이도 필터와 함께 상위권 챔피언 분포를 확인해 어떤 챔피언이 안정적으로 높은 수치를 보이는지 비교할 수 있게 했습니다.",
    },
    {
      title: "종합점수별 산점도",
      image: "/tableau/종합점수별 산점도.png",
      summary: "종합점수와 라인별 분포를 함께 보며 챔피언별 위치와 특성 차이를 비교할 수 있게 구성했습니다.",
      detail: "라인과 난이도 필터를 조합해 어떤 챔피언이 어떤 구간에 모이는지 설명하고 비교 기준으로 활용할 수 있게 했습니다.",
    },
    {
      title: "18렙-1렙 스탯 비교",
      image: "/tableau/18렙-1렙 스탯 비교.png",
      summary: "초반형과 성장형 챔피언의 차이를 시각적으로 비교해 플레이 감각이 어떻게 다른지 해석할 수 있게 했습니다.",
      detail: "평균선과 극값을 함께 보여줘 성장 패턴을 읽을 수 있게 했고, 챔피언별 플레이 성향 차이를 설명할 수 있게 했습니다.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#eef3ff] text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-220px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#7dd3fc]/35 blur-3xl" />
        <div className="absolute right-[-220px] top-[140px] h-[520px] w-[520px] rounded-full bg-[#a5b4fc]/35 blur-3xl" />
      </div>

      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900">Tableau</span>
              <span className="ml-2 hidden text-xs text-slate-600 md:block">전투사관학교 챔피언 가이드북</span>
            </div>
            <nav className="flex items-center gap-6">
              {[
                { label: "Home", href: "/" },
                { label: "DeepVi", href: "/projects/deepvi" },
                { label: "PriceLens", href: "/projects/pricelens" },
                { label: "Tableau", href: "/projects/tableau", active: true },
              ].map((item) => (
                <a
                  key={item.label}
                  href={withBasePath(item.href)}
                  className={`text-sm transition hover:text-slate-900 ${"active" in item ? "font-semibold text-slate-900" : "text-slate-600"}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section className="pt-16 md:pt-24">
        <Container>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs text-slate-700 shadow-sm">
              Tableau · Riot API · Data Storytelling
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
              전투사관학교
              <br className="hidden md:block" /> 챔피언 분석 가이드
            </h1>
            <p className="mt-6 max-w-4xl text-sm leading-6 text-slate-700">
              Riot API와 CSV 데이터를 기반으로 챔피언 스탯, 성장 패턴, 라인별 특성을 분석하고, 이를 탐색할 수 있는 Tableau 인터랙티브 대시보드로 구현했습니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-2 text-xs">
              {["챔피언 분석", "챔피언 비교", "추천 아이템", "인터랙티브 대시보드", "Tableau 스토리텔링"].map((t) => (
                <span key={t} className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 shadow-sm text-slate-700">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 캐러셀 */}
      <section className="mt-16 md:mt-24">
        <Container>
          <SectionTitle
            eyebrow="DASHBOARD"
            title="대시보드 미리보기"
            desc="시작 - 챔피언 상세 - 챔피언 비교 - 챔피언 팝업 순서로 이어지는 4개 화면입니다. 클릭하면 크게 볼 수 있습니다."
            wide
          />
          <div className="relative group">
            <div
              ref={carouselRef}
              className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
              style={{ scrollbarWidth: "none" as React.CSSProperties["scrollbarWidth"] }}
            >
              {frames.map((frame) => (
                <div key={`carousel-${frame.id}`} data-slide="true" className="relative w-full flex-none snap-center">
                  <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setActiveFrame(frame.id)}
                      className="group/img relative block w-full overflow-hidden bg-[#0d1117]"
                    >
                      <img
                        src={withBasePath(frame.image)}
                        alt={frame.title}
                        className="w-full object-cover transition duration-300 group-hover/img:scale-[1.02]"
                        style={{ minHeight: "460px", maxHeight: "560px", objectFit: "cover" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 transition duration-300 group-hover/img:bg-slate-900/25">
                        <span className="rounded-full bg-white/0 px-4 py-1.5 text-xs font-medium text-transparent transition duration-300 group-hover/img:bg-white/90 group-hover/img:text-slate-700">
                          크게 보기
                        </span>
                      </div>
                    </button>
                    <div className="p-5">
                      <div className="text-base font-semibold text-slate-900">{frame.title}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{frame.desc}</p>
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
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex w-16 items-center justify-center">
              <button
                type="button"
                onClick={() => scrollByOne("next")}
                className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-900 opacity-0 backdrop-blur transition group-hover:opacity-100 hover:bg-slate-100"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/70 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/70 to-transparent opacity-0 transition group-hover:opacity-100" />
          </div>
        </Container>
      </section>

      {/* 목적 */}
      <section className="mt-16 md:mt-24">
        <Container>
          <SectionTitle
            eyebrow="Project Goal"
            title="챔피언을 이해하기 위한 3가지 질문에서 출발"
            desc="어떤 챔피언인가, 어떤 아이템을 쓰는가, 어떤 라인에 어울리는가를 중심으로 데이터를 구조화하여 분석 기반을 설계했습니다."
            wide
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                q: "어떤 챔피언?",
                dot: "bg-sky-400",
                border: "border-sky-100",
                bg: "bg-sky-50",
                text: "text-sky-700",
                desc: "챔피언 수가 많아 각 챔피언의 특성과 성장 차이를 한눈에 파악하기 어렵습니다.",
                answer: "스탯 정규화와 성장형/초반형 분류를 통해 챔피언별 특징을 비교할 수 있는 기준을 만들었습니다.",
              },
              {
                q: "어떤 아이템?",
                dot: "bg-violet-400",
                border: "border-violet-100",
                bg: "bg-violet-50",
                text: "text-violet-700",
                desc: "챔피언마다 어울리는 아이템이 다르고 상황에 따라 달라집니다.",
                answer: "챔피언별 추천 아이템 시트 연결 - 5종의 추천 아이템 표시",
              },
              {
                q: "무슨 라인?",
                dot: "bg-emerald-400",
                border: "border-emerald-100",
                bg: "bg-emerald-50",
                text: "text-emerald-700",
                desc: "각 포지션의 역할과 적합 챔피언이 다릅니다.",
                answer: "포지션별 역할 + 라인 필터로 원하는 포지션 챔피언만 탐색 가능",
              },
            ].map((item, i) => (
              <motion.div key={item.q} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} custom={i}>
                <div className={`rounded-2xl border ${item.border} bg-white/80 p-5 shadow-sm h-full`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`h-2 w-2 rounded-full ${item.dot}`} />
                    <span className="text-sm font-semibold text-slate-900">{item.q}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-5 mb-3">{item.desc}</p>
                  <div className={`rounded-lg ${item.bg} px-3 py-2 text-[11px] ${item.text} leading-5`}>
                    {item.answer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 데이터 & 분석 */}
      <section className="mt-16 md:mt-24">
        <Container>
          <SectionTitle
            eyebrow="Data & Analysis"
            title="가이드북 확장의 근거가 된 분석 화면"
            desc="종합점수, 성장 성향, 라인별 스탯 차이를 함께 분석해 챔피언을 해석할 수 있는 기준을 만들었고, 이 구조를 바탕으로 추후 초보자용 가이드북으로 확장할 수 있는 방향을 정리했습니다."
            wide
          />
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} custom={0}>
              <Card title="챔피언 분석 방법론" icon={<div className="h-2 w-2 rounded-full bg-violet-400" />} className="h-full">
                <div className="space-y-4">
                  {[
                    {
                      n: "01",
                      title: "성장치 종합점수 계산",
                      color: "text-sky-600",
                      points: [
                        "정규화된챔피언스탯.csv 기준으로 18레벨 체력, 마나, 방어력, 공격력, 사거리 등을 재계산",
                        "각 스탯을 최대값 대비 비율로 환산한 뒤 가중합해 [성장치종합점수] 필드 생성",
                        "종합점수와 [종합점수랭킹]을 기반으로 챔피언 특성을 비교할 수 있는 기준 마련",
                      ],
                    },
                    {
                      n: "02",
                      title: "18렙-1렙 성장 차이 분석",
                      color: "text-violet-600",
                      points: [
                        "1레벨과 18레벨 스탯 차이 평균을 계산해 성장 폭을 수치화",
                        "전체 평균보다 크면 [성장형], 아니면 [초반형]으로 분류",
                        "난이도와 성장 성향을 함께 보며 추후 초보자용 가이드 기준으로 확장 가능하도록 정리",
                      ],
                    },
                    {
                      n: "03",
                      title: "유사 챔피언 및 검색 로직",
                      color: "text-emerald-600",
                      points: [
                        "선택 챔피언의 주 라인과 역할을 추출해 같은 조건의 챔피언만 남기는 계산식 구현",
                        "[비슷한챔피언뽑아내기]로 자기 자신을 제외한 동일 라인·역할 챔피언만 남기고, [TOP 3]로 노출 개수 제한",
                        "검색 매개변수와 대시보드 액션을 결합해 상세 팝업 탐색 흐름 완성",
                      ],
                    },
                  ].map((item) => (
                    <div key={item.n} className="rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2.5">
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold ${item.color}`}>{item.n}</span>
                        <span className="text-xs font-semibold text-slate-800">{item.title}</span>
                      </div>
                      {item.points.map((p) => (
                        <div key={p} className="mt-0.5 flex items-start gap-1.5">
                          <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                          <p className="text-[10px] leading-5 text-slate-500">{p}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {analysisItems.map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} custom={i + 1}>
                <Card title={item.title} icon={<div className="h-2 w-2 rounded-full bg-sky-400" />} className="h-full">
                  <button
                    type="button"
                    onClick={() => setActiveAnalysis(item)}
                    className="group/analysis relative block w-full overflow-hidden rounded-xl border border-slate-200/80 bg-[#0d1117]"
                  >
                    <img
                      src={withBasePath(item.image)}
                      alt={item.title}
                      className="aspect-[16/10] w-full object-cover transition duration-300 group-hover/analysis:scale-[1.02]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 transition duration-200 group-hover/analysis:bg-slate-900/30">
                      <span className="rounded-full bg-white/0 px-3 py-1 text-[10px] font-medium text-transparent transition duration-200 group-hover/analysis:bg-white/90 group-hover/analysis:text-slate-700">
                        원본 크기로 보기
                      </span>
                    </div>
                  </button>
                  <p className="mt-3 text-[11px] leading-5 text-slate-600">{item.summary}</p>
                  <p className="mt-1 text-[11px] leading-5 text-slate-400">{item.detail}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 스토리보드 - 구현 작업 */}
      <section className="mt-16 md:mt-24">
        <Container>
          <SectionTitle
            eyebrow="Implementation"
            title="대시보드별 구현 작업"
            desc="각 대시보드를 어떤 Tableau 기능으로 구현했는지 단계별로 정리했습니다. 썸네일을 클릭하면 크게 볼 수 있습니다."
            wide
          />
          <div className="space-y-5">
            {storyItems.map((item, i) => {
              const frame = frames[item.frameId];
              return (
                <motion.div
                  key={item.badge}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={fadeUp}
                  custom={i}
                >
                  <div className="rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <button
                        type="button"
                        onClick={() => setActiveFrame(frame.id)}
                        className="group/thumb relative shrink-0 overflow-hidden bg-[#0d1117] md:w-64"
                        style={{ minHeight: "180px" }}
                      >
                        <img
                          src={withBasePath(frame.image)}
                          alt={frame.title}
                          className="h-full w-full object-cover transition duration-300 group-hover/thumb:scale-105"
                          style={{ minHeight: "180px" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 transition duration-200 group-hover/thumb:bg-slate-900/35">
                          <span className="rounded-full bg-white/0 px-3 py-1 text-[10px] font-medium text-transparent transition duration-200 group-hover/thumb:bg-white/90 group-hover/thumb:text-slate-700">
                            크게 보기
                          </span>
                        </div>
                      </button>
                      <div className="flex-1 p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`h-2 w-2 rounded-full ${item.dot}`} />
                          <span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 ${item.badgeColor}`}>{item.badge}</span>
                          <span className="text-sm font-semibold text-slate-900">{frame.title}</span>
                        </div>
                        <div className="space-y-1.5">
                          {item.steps.map((step, si) => (
                            <div key={si} className="flex items-start gap-2">
                              <span className="mt-0.5 text-[10px] font-bold text-slate-300 shrink-0 w-4">{si + 1}</span>
                              <span className="text-xs text-slate-600 leading-5">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 기술 스택 */}
      <section className="mt-16 md:mt-24">
        <Container>
          <SectionTitle eyebrow="Tech Stack" title="기술 스택" />
          <div className="grid gap-3 md:grid-cols-4">
            {[
              { name: "Tableau", desc: "대시보드 시각화 · 인터랙션 구현" },
              { name: "CSV Data", desc: "챔피언 · 스킬 · 아이템 데이터 통합" },
              { name: "Riot API", desc: "챔피언 이미지 · 아이템 데이터" },
              { name: "Python", desc: "데이터 수집 · 정규화 · CSV 정제" },
            ].map((tech, i) => (
              <motion.div key={tech.name} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} custom={i}>
                <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm text-center">
                  <div className="text-sm font-semibold text-slate-900">{tech.name}</div>
                  <div className="mt-1 text-[11px] text-slate-400">{tech.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 다운로드 */}
      <section className="mt-16 md:mt-24">
        <Container>
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">전투사관학교 챔피언 가이드북</div>
              <div className="mt-1 text-xs text-slate-400">Tableau Workbook (.twbx)</div>
            </div>
            <a
              href="https://drive.google.com/uc?export=download&id=1GjNCKsnuh3I3qAcGnK1xTDCOn36lCpqw"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              download
            >
              Tableau 파일 다운로드
            </a>
          </div>
        </Container>
      </section>

      {/* 푸터 */}
      <section className="mt-16 md:mt-24 border-t border-slate-200/70 pt-10 pb-16">
        <Container>
          <div className="text-center text-xs text-slate-400">
            Tableau · 전투사관학교 챔피언 가이드북 © 2025
          </div>
        </Container>
      </section>

      {/* 모달 */}
      {activeFrame !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-6"
          onClick={() => setActiveFrame(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveFrame(null)}
              className="absolute right-4 top-4 z-10 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 transition hover:bg-slate-100"
            >
              닫기
            </button>
            <img
              src={withBasePath(frames[activeFrame]?.image ?? "")}
              alt={frames[activeFrame]?.title}
              className="w-full rounded-xl object-contain max-h-[80vh]"
            />
            <div className="mt-3">
              <div className="text-sm font-semibold text-slate-900 mb-1">{frames[activeFrame]?.title}</div>
              <div className="text-xs leading-5 text-slate-500">{frames[activeFrame]?.desc}</div>
            </div>
          </div>
        </div>
      )}

      {activeAnalysis !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-6"
          onClick={() => setActiveAnalysis(null)}
        >
          <div
            className="relative w-full max-w-6xl rounded-2xl bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveAnalysis(null)}
              className="absolute right-4 top-4 z-10 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 transition hover:bg-slate-100"
            >
              닫기
            </button>
            <img
              src={withBasePath(activeAnalysis.image)}
              alt={activeAnalysis.title}
              className="w-full rounded-xl object-contain max-h-[80vh]"
            />
            <div className="mt-3">
              <div className="mb-1 text-sm font-semibold text-slate-900">{activeAnalysis.title}</div>
              <div className="text-xs leading-5 text-slate-500">{activeAnalysis.summary}</div>
              <div className="mt-1 text-xs leading-5 text-slate-400">{activeAnalysis.detail}</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
