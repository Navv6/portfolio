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
    <div className="mb-10">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p
          className={`mt-3 text-sm leading-6 text-slate-700 md:text-base break-keep ${
            wide ? "max-w-4xl" : "max-w-2xl"
          }`}
        >
          {desc}
        </p>
      ) : null}
      {caption ? (
        <p className="mt-2 text-xs text-slate-500">{caption}</p>
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
    <div className="flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <div className="text-sm font-semibold text-slate-900">{title}</div>
      </div>
      <div className="flex-1 text-sm leading-6 text-slate-700">{children}</div>
    </div>
  );
}

function StatCard({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm text-center backdrop-blur">
      <div className="text-3xl font-bold text-slate-900 tracking-tight">{value}</div>
      <div className="mt-1 text-sm font-medium text-slate-700">{label}</div>
      {sub && <div className="mt-1 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}

function ZoomableImage({
  src,
  alt,
  className,
  onOpen,
}: {
  src: string;
  alt: string;
  className?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group/zoom relative block w-full overflow-hidden"
    >
      <img src={src} alt={alt} className={className} />
      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 transition duration-200 group-hover/zoom:bg-slate-900/25">
        <span className="rounded-full bg-white/0 px-3 py-1 text-[10px] font-medium text-transparent transition duration-200 group-hover/zoom:bg-white/90 group-hover/zoom:text-slate-700">
          크게 보기
        </span>
      </div>
    </button>
  );
}


export default function PriceLensPortfolioPage() {
  const [activeImage, setActiveImage] = React.useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);

  return (
    <main className="min-h-screen bg-[#f6f4f0] text-slate-900">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-180px] h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[#ffb347]/30 blur-3xl" />
        <div className="absolute right-[-180px] top-[160px] h-[520px] w-[520px] rounded-full bg-[#ffcc80]/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.6),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.5),rgba(255,255,255,0))]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-[#f6f4f0]/80 backdrop-blur">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-slate-900">PriceLens</div>
              <div className="ml-2 hidden text-xs text-slate-500 md:block">
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
              <a href={withBasePath("/projects/pricelens")} className="text-sm font-semibold text-slate-900 transition hover:text-slate-700">
                PriceLens
              </a>
              <a href={withBasePath("/projects/tableau")} className="text-sm text-slate-600 transition hover:text-slate-900">
                Tableau
              </a>
            </nav>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section id="intro" className="pt-16 md:pt-24">
        <Container>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs text-slate-600 shadow-sm">
              Python · XGBoost · SHAP · Optuna
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
              가격 요인을 읽고
              <br className="hidden md:block" /> 서비스 개선으로 잇다
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-700 break-keep">
              NYC Airbnb 53,659개 숙소 데이터를 기반으로 숙소 특성이 가격에 미치는 영향을 정량적으로 분석했습니다.
              예측모델을 통해 어떤 요인이 가격에 영향을 미치는지 검증하고, 그 결과를 플랫폼·호스트·사용자를 위한
              <span className="font-semibold text-slate-900"> 서비스 개선 방안</span>과 실제 기능 제안, 전략 도출로 확장하였습니다.
            </p>

            <div className="mt-8 flex flex-wrap gap-2 text-xs text-slate-700">
              {[
                "53,659개 숙소 데이터",
                "4가지 모델 비교",
                "Optuna 하이퍼파라미터 튜닝",
                "SHAP 해석",
                "설명 가능 ML",
                "Stacking 앙상블",
                "통계 검정",
              ].map((t) => (
                <span key={t} className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 shadow-sm">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Stats */}
      <section className="mt-14 md:mt-20">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {[
              { value: "53,659개", label: "숙소 데이터", sub: "2025년 3월 기준" },
              { value: "73개", label: "원본 컬럼", sub: "변수 선택·가공" },
              { value: "ML 기반", label: "가격 요인 검증", sub: "4가지 모델 비교·튜닝" },
              { value: "SHAP 분석", label: "플랫폼·호스트 전략 도출", sub: "분석 결과를 실행 방안으로 연결" },
            ].map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} custom={i}>
                <StatCard {...s} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Goal & Strategy */}
      <section id="goal" className="mt-20 md:mt-28">
        <Container>
          <SectionTitle
            eyebrow="Goal & Strategy"
            title="가격 영향 요인을 검증하고 전략으로 연결"
            desc="머신러닝 기반 가격 예측을 통해 숙소 가격에 영향을 미치는 핵심 요인을 검증하고, 그 결과를 호스트 운영 전략과 플랫폼 기능 제안으로 확장하는 것을 목표로 했습니다."
            wide
          />

          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={0}
            >
              <Card title="호스트를 위한 전략" icon={<div className="h-2 w-2 rounded-full bg-amber-400" />}>
                <div className="space-y-4">
                  {[
                    {
                      n: "01",
                      title: "어메니티 차별화",
                      desc: "기본 제공품이 아닌 프리미엄 어메니티를 추가할 때 가격 경쟁력이 생깁니다. SHAP 분석에서 위생·샤워용품 카테고리가 실질적 기여도가 높게 나타났습니다.",
                    },
                    {
                      n: "02",
                      title: "리뷰·신뢰도 관리",
                      desc: "응답률, 수락률, 슈퍼호스트 여부는 예약 전환율에 결정적 역할을 합니다. 단기간에 가격을 올리기보다 신뢰도 지표를 먼저 끌어올리는 것이 유효합니다.",
                    },
                    {
                      n: "03",
                      title: "경쟁 포지셔닝",
                      desc: "같은 지역·유사 규모 숙소와 비교해 자신의 가격 위치를 파악하고, 타겟층에 맞게 마케팅 방향을 설정하는 것이 중요합니다.",
                    },
                  ].map((s) => (
                    <div key={s.n} className="flex gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-700">
                        {s.n}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{s.title}</div>
                        <div className="mt-0.5 text-xs leading-5 text-slate-600">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={1}
            >
              <Card title="플랫폼을 위한 제안" icon={<div className="h-2 w-2 rounded-full bg-rose-400" />}>
                <p className="mb-4">
                  예측 가격과 실제 가격 간의 차이를 사용자에게 알리는 기능을 제안합니다.
                </p>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-4">
                  <div className="text-xs font-semibold text-slate-600 mb-2">예시 알림 메시지</div>
                  <div className="rounded-lg bg-white border border-amber-200 p-3 text-xs text-slate-700">
                    <span className="font-semibold text-amber-600">⚠ 가격 안내</span>
                    <br />
                    이 숙소는 예측 가격보다 약 <strong>27%</strong> 더 비쌉니다.
                    주변 숙소와 비교해보세요.
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5" />
                    <span>예측가 대비 <strong>25~30% 이상</strong> 고가 숙소에 주의 메시지 표시</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5" />
                    <span>소비자 보호 및 <strong>가격 투명성</strong> 확보에 기여</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5" />
                    <span>장기적으로 사용자 신뢰와 <strong>플랫폼 충성도</strong>를 높이는 기능</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section id="process" className="mt-20 md:mt-28">
        <Container>
          <SectionTitle
            eyebrow="Analysis Process"
            title="4단계 분석 프로세스"
            desc="데이터 수집부터 전략 도출까지 각 단계마다 명확한 판단 근거를 세웠습니다."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: 1,
                step: "데이터 수집 및 전처리",
                desc: "결측치를 변수 특성에 맞는 방식으로 처리하고, 어메니티를 클러스터링으로 구조화",
              },
              {
                n: 2,
                step: "탐색적 데이터 분석",
                desc: "지역구·숙소유형별 가격 분포, 리뷰 편향, 이상치 존재 여부 파악",
              },
              {
                n: 3,
                step: "머신러닝 모델 구축",
                desc: "4가지 트리 모델 비교, Optuna 튜닝, 스태킹 앙상블로 예측 성능 극대화",
              },
              {
                n: 4,
                step: "해석 및 전략 도출",
                desc: "SHAP·통계 검정으로 실질적 가격 결정 요인 파악 후 호스트·플랫폼 전략 제안",
              },
            ].map((item, i) => (
              <motion.div
                key={item.n}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700 mb-4">
                  {item.n}
                </div>
                <div className="text-sm font-semibold text-slate-900 mb-2">{item.step}</div>
                <div className="text-xs leading-5 text-slate-600">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Variable Selection + Preprocessing */}
      <section id="data" className="mt-20 md:mt-28">
        <Container>
          <SectionTitle
            eyebrow="Variable Selection & Preprocessing"
            title="변수 선정과 전처리 전략"
            desc="73개 칼럼에서 분석 가능한 31개를 선별하고, 각 칼럼의 결측치를 판단 근거에 따라 처리했습니다."
            wide
          />

          {/* 칼럼 선별 + 결측치 처리 */}
          <div className="grid items-stretch gap-6 md:grid-cols-2">
            {/* 선별 칼럼 그룹 */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={1}
              className="h-full"
            >
              <Card
                title="선별 칼럼 — 5개 카테고리 31개"
                icon={<div className="h-2 w-2 rounded-full bg-amber-400" />}
              >
                <div className="space-y-3">
                  <div className="rounded-lg border border-amber-300 bg-amber-50 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className="mt-0.5 h-2 w-2 rounded-full shrink-0 bg-amber-500" />
                        <span className="font-semibold text-slate-900 text-xs">종속 변수 (예측 대상)</span>
                      </div>
                      <span className="shrink-0 rounded-full bg-amber-200 px-2 py-0.5 text-[10px] text-amber-800 font-semibold">price</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">숙소 1박 요금 — $1,000 이상인 숙소가 2% 미만이므로 이를 제외한 98%의 데이터 사용</p>
                  </div>
                  {[
                    {
                      group: "위치",
                      dot: "bg-amber-400",
                      badge: "bg-amber-100 text-amber-700",
                      items: ["지역구"],
                      note: "neighbourhood(세부 지역)는 결측치 과다·세분화 과잉으로 5개 자치구(지역구)로 통일",
                    },
                    {
                      group: "숙소 정보",
                      dot: "bg-orange-400",
                      badge: "bg-orange-100 text-orange-700",
                      items: ["숙소 유형", "객실 유형", "침실 수", "침대 수", "욕실 수"],
                    },
                    {
                      group: "예약 정보",
                      dot: "bg-emerald-400",
                      badge: "bg-emerald-100 text-emerald-700",
                      items: ["연간 예약가능일", "즉시 예약 여부", "예약 가능 여부", "최소 숙박일", "최대 숙박일"],
                      note: "예약가능일은 30·60·90일 단위도 존재하나, 장기적 운영 패턴을 반영하는 365일 기준만 채택",
                    },
                    {
                      group: "호스트 정보",
                      dot: "bg-blue-400",
                      badge: "bg-blue-100 text-blue-700",
                      items: ["슈퍼호스트", "응답시간", "응답률", "수락률", "인증여부", "활동시작일", "보유숙소수(지역)", "보유숙소수(전체)", "보유숙소수(플랫폼)"],
                    },
                    {
                      group: "리뷰 · 평점",
                      dot: "bg-violet-400",
                      badge: "bg-violet-100 text-violet-700",
                      items: ["총 리뷰 수", "월평균 리뷰 수", "종합점수", "정확성", "청결도", "체크인", "커뮤니케이션", "위치평가", "가격대비만족도"],
                    },
                  ].map((grp) => (
                    <div key={grp.group} className="rounded-lg border border-slate-100 bg-slate-50/60 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${grp.dot}`} />
                          <span className="font-medium text-slate-800 text-xs">{grp.group}</span>
                        </div>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${grp.badge}`}>
                          {grp.items.length}개
                        </span>
                      </div>
                      <p className="mt-1.5 text-[11px] text-slate-500 leading-5">
                        {grp.items.join(" · ")}
                      </p>
                      {"note" in grp && grp.note && (
                        <p className="mt-1 text-[10px] text-slate-400 leading-4">{grp.note}</p>
                      )}
                    </div>
                  ))}
                  <div className="rounded-lg border border-rose-100 bg-rose-50/60 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-slate-800 text-xs">파생 변수</span>
                      <span className="shrink-0 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] text-rose-700 font-medium">직접 생성</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">지역구 평균가격 — 지역별 시장 수준을 피처로 반영</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* 결측치 처리 */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={2}
              className="h-full"
            >
              <Card
                title="결측치 처리 전략"
                icon={<div className="h-2 w-2 rounded-full bg-amber-400" />}
              >
                <div className="space-y-3">
                  {[
                    {
                      col: "식별자 · URL · 텍스트 (~17개)",
                      action: "칼럼 제외",
                      why: "id, listing_url, description, picture_url 등 — 분석 영향이 없는 정보 및 결측치 과다",
                      badge: "bg-slate-100 text-slate-600",
                    },
                    {
                      col: "중복 · 세분화 과잉 (~16개)",
                      action: "칼럼 제외",
                      why: "가격변동범위 x6, 예약가능일 x3, 리뷰기간별 x3 등 — 대표 칼럼 1개로 통일",
                      badge: "bg-slate-100 text-slate-600",
                    },
                    {
                      col: "개인정보 · 기타 (~9개)",
                      action: "칼럼 제외",
                      why: "host_about, thumbnail_url, licence, 위치좌표(지역구로 대체) 등 — 가격 예측에 불필요",
                      badge: "bg-slate-100 text-slate-600",
                    },
                    {
                      col: "침실 · 침대 · 욕실",
                      action: "0으로 대체",
                      why: "정보 누락 숙소는 기본 시설이 부족할 가능성이 높다고 판단, 0으로 보수적 처리",
                    },
                    {
                      col: "예약 가능 여부",
                      action: "'No'로 대체",
                      why: "예약 가능 여부가 결측인 경우 예약 불가로 간주하는 것이 합리적",
                    },
                    {
                      col: "호스트 정보 누락",
                      action: "20행 삭제",
                      why: "호스트 관련 결측치 다수 존재 — 호스트 정보가 없는 행으로 판단하여 일괄 제거",
                    },
                    {
                      col: "리뷰 관련 (~6,800개)",
                      action: "평균값 대체",
                      why: "리뷰 관련 결측치는 평균값으로 대체 — 평균적인 만족도를 가질 것으로 보수적 처리",
                    },
                    {
                      col: "호스트 응답시간 · 슈퍼호스트 여부",
                      action: "최솟값으로 대체",
                      why: "응답시간 및 슈퍼호스트는 정보 부재를 최소 신뢰 상태로 보수적 처리",
                    },
                  ].map((row) => (
                    <div key={row.col} className="rounded-lg border border-slate-100 bg-slate-50/60 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-medium text-slate-800 text-xs">{row.col}</span>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${"badge" in row && row.badge ? row.badge : "bg-amber-100 text-amber-700"}`}>
                          {row.action}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-500">{row.why}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Amenity Vectorization */}
      <section id="amenity" className="mt-20 md:mt-28">
        <Container>
          <SectionTitle
            eyebrow="Feature Engineering"
            title="PCA가 아닌 벡터기반 클러스터링"
            desc="어메니티를 5개의 큰 카테고리로 묶고, 각 숙소가 어떤 어메니티를 얼마나 보유하고 있는지 모델이 학습할 수 있는 벡터로 변환했습니다."
            wide
          />
          <div className="grid gap-6">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={0}
              className="self-start"
            >
              <Card
                title="왜 PCA 대신 클러스터링을 사용했는가"
                icon={<div className="h-2 w-2 rounded-full bg-rose-400" />}
              >
                <p className="mb-3">
                  각 숙소의 어메니티는 <span className="font-medium text-slate-800">"삼성 TV, 냉장고, 세탁기..."</span> 형태의 텍스트 나열로, 숙소마다 항목 수와 종류가 달라 그대로 피처로 쓸 수 없었습니다.
                  그래서 의미 기반으로 어메니티를 5개의 큰 카테고리로 나누고, 그 안에 키워드를 하드코딩해 숙소별 어메니티를 수치화하는 방식이 더 적절하다고 판단했습니다.
                </p>
                <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3 text-xs text-slate-600 space-y-1.5">
                  <div><span className="font-semibold text-rose-600">원본 한계:</span> 숙소마다 어메니티 항목 수와 표현 방식이 제각각</div>
                  <div><span className="font-semibold text-amber-600">PCA의 한계:</span> 범주형 데이터를 연속적인 숫자 관계처럼 축소해 의미가 흐려질 수 있음</div>
                  <div><span className="font-semibold text-emerald-600">선택 이유:</span> 카테고리별 어메니티를 벡터화하면 어떤 요소가 가격에 얼마나 영향을 주는지 모델링할 수 있음</div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={1}
            >
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">How It Works</div>
                <div className="mt-3 grid gap-3">
                  <div className="rounded-lg bg-white p-3">
                    <div className="text-xs font-semibold text-slate-500">1. 원본 텍스트</div>
                    <div className="mt-2 rounded-md bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-700">
                      "TV, Wifi, Hair dryer, Shampoo, Kitchen, Microwave, Smoke alarm ..."
                    </div>
                  </div>
                  <div className="rounded-lg bg-white p-3">
                    <div className="text-xs font-semibold text-slate-500">2. 키워드 정리</div>
                    <div className="mt-2 rounded-md bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-700">
                      TV / Wifi / Hair dryer / Shampoo / Kitchen / Microwave / Smoke alarm
                    </div>
                  </div>
                  <div className="rounded-lg bg-white p-3">
                    <div className="text-xs font-semibold text-slate-500">3. 5개 큰 카테고리로 분류</div>
                    <div className="mt-2 rounded-md bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-700">
                      TV / Wifi / Hair dryer / Shampoo / Kitchen / Smoke alarm
                      <br />
                      → Wifi / 위생 및 샤워용품 / Entertainment / 조리시설 / 숙소관련시설로 분류
                    </div>
                  </div>
                  <div className="rounded-lg bg-white p-3">
                    <div className="text-xs font-semibold text-slate-500">4. 키워드 하드코딩 및 인덱스 지정</div>
                    <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                      {[
                        "Wifi = 0",
                        "위생 및 샤워용품 = 1",
                        "Entertainment = 2",
                        "조리시설 = 3",
                        "숙소관련시설 = 5",
                      ].map((item) => (
                        <span key={item} className="rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-amber-700">
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-[11px] leading-5 text-slate-500">
                      예: <code>TV -&gt; Entertainment</code>, <code>Shampoo -&gt; 위생 및 샤워용품</code>, <code>Kitchen -&gt; 조리시설</code>, <code>Smoke alarm -&gt; 숙소관련시설</code>
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-3">
                    <div className="text-xs font-semibold text-slate-500">5. 숙소별 어메니티 벡터화</div>
                    <div className="mt-2 rounded-md bg-slate-900 px-3 py-2 font-mono text-xs text-slate-100">
                      숙소 1 = [Wifi = 0, 위생 및 샤워용품 = 1, Entertainment = 3, 조리시설 = 2, 숙소관련시설 = 5]
                      <br />
                      숙소 2 = [Wifi = 0, 위생 및 샤워용품 = 1, Entertainment = 3, 조리시설 = 3, Entertainment = 3]
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* EDA */}
      <section id="eda" className="mt-20 md:mt-28">
        <Container>
          <SectionTitle
            eyebrow="EDA"
            title="탐색적 데이터 분석 — 주요 발견"
            desc="가격 분포, 지역 특성, 리뷰 편향을 파악해 모델 설계와 필터링 전략의 근거를 세웠습니다."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {/* 가격 분포 차트 */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={0}
              className="order-1 rounded-2xl border border-slate-200/70 bg-white/80 overflow-hidden shadow-sm"
            >
              <div className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <div className="text-sm font-semibold text-slate-900">가격 분포</div>
                </div>
                <p className="text-xs text-slate-500">$50~200 구간 약 75%, $1,000 이상 2% 미만 → 필터링 근거</p>
              </div>
              <ZoomableImage
                src={withBasePath("/pricelens/price-distribution.png")}
                alt="가격 구간별 숙소 비율"
                className="w-full object-contain bg-white"
                onOpen={() =>
                  setActiveImage({
                    src: withBasePath("/pricelens/price-distribution.png"),
                    alt: "가격 구간별 숙소 비율",
                    title: "가격 분포",
                  })
                }
              />
            </motion.div>

            {/* 지역별 가격 비교 */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={1}
              className="order-2 rounded-2xl border border-slate-200/70 bg-white/80 overflow-hidden shadow-sm"
            >
              <div className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-rose-400" />
                  <div className="text-sm font-semibold text-slate-900">지역별 평균 가격</div>
                </div>
                <p className="text-xs text-slate-500">Manhattan 평균 $285 — 2위 Brooklyn($170)과 큰 격차</p>
              </div>
              <ZoomableImage
                src={withBasePath("/pricelens/region-price.png")}
                alt="지역별 평균가 비교"
                className="w-full object-contain bg-white"
                onOpen={() =>
                  setActiveImage({
                    src: withBasePath("/pricelens/region-price.png"),
                    alt: "지역별 평균가 비교",
                    title: "지역별 평균 가격",
                  })
                }
              />
            </motion.div>

            {/* 지역별 숙소 유형 */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={2}
              className="order-4 rounded-2xl border border-slate-200/70 bg-white/80 overflow-hidden shadow-sm"
            >
              <div className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <div className="text-sm font-semibold text-slate-900">지역별 숙소 유형 분포</div>
                </div>
                <p className="text-xs text-slate-500">Manhattan은 독채 비율이 압도적 — 높은 평균가의 구조적 원인</p>
              </div>
              <ZoomableImage
                src={withBasePath("/pricelens/region-type.png")}
                alt="지역별 숙소 유형 분포"
                className="w-full object-contain bg-white"
                onOpen={() =>
                  setActiveImage({
                    src: withBasePath("/pricelens/region-type.png"),
                    alt: "지역별 숙소 유형 분포",
                    title: "지역별 숙소 유형 분포",
                  })
                }
              />
            </motion.div>

            {/* NYC 지도 */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={3}
              className="order-3 rounded-2xl border border-slate-200/70 bg-white/80 overflow-hidden shadow-sm"
            >
              <div className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-slate-400" />
                  <div className="text-sm font-semibold text-slate-900">지역별 Location Score</div>
                </div>
                <p className="text-xs text-slate-500">Manhattan·Brooklyn이 위치 점수 최고 — 수요와 가격의 구조적 연결</p>
              </div>
              <div className="px-4 pb-5">
                <ZoomableImage
                  src={withBasePath("/pricelens/map.png")}
                  alt="NYC 지역별 Location Score 지도"
                  className="w-full rounded-xl object-contain"
                  onOpen={() =>
                    setActiveImage({
                      src: withBasePath("/pricelens/map.png"),
                      alt: "NYC 지역별 Location Score 지도",
                      title: "지역별 Location Score",
                    })
                  }
                />
              </div>
            </motion.div>

            {/* 리뷰 편향 설명 */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={4}
              className="order-6 self-start"
            >
              <Card title="리뷰 데이터 편향" icon={<div className="h-2 w-2 rounded-full bg-violet-400" />}>
                <p>전체 리뷰 점수가 <strong>4.5점대에 집중</strong>되어 데이터 편향이 존재합니다.</p>
                <p className="mt-2">리뷰 수·평점은 가격과 약한 상관을 보였으나, 지역 선호도 파악에는 유효했습니다.</p>
                <p className="mt-3 text-xs text-slate-500">Manhattan·Brooklyn이 선호 지역으로 확인 → 높은 평균가의 수요 측면 근거</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <div className="font-bold text-slate-800">4.5점대</div>
                    <div className="text-slate-500 mt-0.5">리뷰 집중 구간</div>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <div className="font-bold text-slate-800">약한 상관</div>
                    <div className="text-slate-500 mt-0.5">리뷰 수 vs 가격</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={5}
              className="order-5 rounded-2xl border border-slate-200/70 bg-white/80 overflow-hidden shadow-sm"
            >
              <div className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-violet-400" />
                  <div className="text-sm font-semibold text-slate-900">평점과 가격 산점도</div>
                </div>
                <p className="text-xs text-slate-500">고평점 구간에 데이터가 밀집되어 있고, 평점만으로는 고가 숙소를 충분히 설명하지 못함</p>
              </div>
              <div className="px-4 pb-5">
                <ZoomableImage
                  src={withBasePath("/pricelens/rating-scatter.png")}
                  alt="평점과 가격 산점도"
                  className="w-full rounded-xl object-contain"
                  onOpen={() =>
                    setActiveImage({
                      src: withBasePath("/pricelens/rating-scatter.png"),
                      alt: "평점과 가격 산점도",
                      title: "평점과 가격 산점도",
                    })
                  }
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Modeling */}
      <section id="modeling" className="mt-20 md:mt-28">
        <Container>
          <SectionTitle
            eyebrow="Modeling"
            title="4가지 모델 비교 및 최적화"
            desc="단일 모델 선택이 아닌, 체계적 비교·튜닝·앙상블을 통해 예측 성능과 일관성을 동시에 검증했습니다."
            wide
          />

          {/* 모델 성능 테이블 */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={0}
            className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-2 w-2 rounded-full bg-amber-400" />
              <div className="text-sm font-semibold text-slate-900">모델 튜닝 전후 성능 비교</div>
            </div>
            <p className="mb-4 text-xs text-slate-600">
              <span className="font-semibold text-amber-600">XGBoost가 최우수인 이유</span>
              {" "}— 튜닝 후 RMSE 94.2로 전체 최저, R² 0.64로 전체 최고. 두 지표 모두에서 동시에 1위를 달성한 유일한 모델입니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-2 text-left font-semibold text-slate-500">모델</th>
                    <th className="pb-2 text-right font-semibold text-slate-500">RMSE (전)</th>
                    <th className="pb-2 text-right font-semibold text-slate-500">RMSE (후)</th>
                    <th className="pb-2 text-right font-semibold text-slate-500">개선</th>
                    <th className="pb-2 text-right font-semibold text-slate-500">R² (전)</th>
                    <th className="pb-2 text-right font-semibold text-slate-500">R² (후)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { model: "Random Forest",     rBefore: 96.3,  rAfter: 96.7, r2Before: 0.59, r2After: 0.60 },
                    { model: "Gradient Boosting", rBefore: 106.5, rAfter: 94.6, r2Before: 0.50, r2After: 0.58 },
                    { model: "XGBoost",           rBefore: 99.3,  rAfter: 94.2, r2Before: 0.56, r2After: 0.64, best: true },
                    { model: "LightGBM",          rBefore: 98.5,  rAfter: 96.4, r2Before: 0.56, r2After: 0.60 },
                  ].map((row) => (
                    <tr key={row.model} className={row.best ? "bg-amber-50/60" : ""}>
                      <td className="py-2.5 text-left">
                        <span className={`font-medium ${row.best ? "text-amber-700" : "text-slate-700"}`}>
                          {row.model}
                        </span>
                        {row.best && <span className="ml-2 text-[10px] font-semibold text-amber-500">✓ 최우수</span>}
                      </td>
                      <td className="py-2.5 text-right text-slate-400">{row.rBefore}</td>
                      <td className={`py-2.5 text-right font-semibold ${row.best ? "text-amber-600" : "text-slate-700"}`}>
                        {row.rAfter}
                      </td>
                      <td className="py-2.5 text-right text-emerald-600 font-medium">
                        {row.rBefore > row.rAfter ? `▼ ${(row.rBefore - row.rAfter).toFixed(1)}` : <span className="text-slate-400">—</span>}
                      </td>
                      <td className="py-2.5 text-right text-slate-400">{row.r2Before}</td>
                      <td className={`py-2.5 text-right font-semibold ${row.best ? "text-amber-600" : "text-slate-700"}`}>
                        {row.r2After}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* K-Fold RMSE + R² 비교 차트 */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={1}
            className="mt-4 rounded-2xl border border-slate-200/70 bg-white/80 overflow-hidden shadow-sm"
          >
            <div className="px-5 pt-5 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-rose-400" />
                <div className="text-sm font-semibold text-slate-900">K-Fold 20회 교차검증 — RMSE · R² 비교</div>
              </div>
              <p className="text-xs text-slate-500">
                Stacking = Optuna로 튜닝한 RF · GB · LGBM 기반 스태킹 앙상블, 메타 모델은 Linear Regression
              </p>
            </div>
            <ZoomableImage
              src={withBasePath("/pricelens/kfold.png")}
              alt="K-Fold RMSE R² 비교"
              className="w-full object-contain bg-white"
              onOpen={() =>
                setActiveImage({
                  src: withBasePath("/pricelens/kfold.png"),
                  alt: "K-Fold RMSE R² 비교",
                  title: "K-Fold 20회 교차검증",
                })
              }
            />
          </motion.div>

          {/* 실제값 vs 예측값 + 잔차 */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={3}
              className="rounded-2xl border border-slate-200/70 bg-white/80 overflow-hidden shadow-sm"
            >
              <div className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-rose-400" />
                  <div className="text-sm font-semibold text-slate-900">실제값 vs 예측값</div>
                </div>
                <p className="text-xs text-slate-500">대각선 근처 분포 — 전반적으로 잘 작동, 고가 구간에서 과소 예측 발생</p>
              </div>
              <ZoomableImage
                src={withBasePath("/pricelens/actual-pred.png")}
                alt="실제값과 예측값 산점도"
                className="w-full object-contain bg-white"
                onOpen={() =>
                  setActiveImage({
                    src: withBasePath("/pricelens/actual-pred.png"),
                    alt: "실제값과 예측값 산점도",
                    title: "실제값 vs 예측값",
                  })
                }
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={4}
              className="rounded-2xl border border-slate-200/70 bg-white/80 overflow-hidden shadow-sm"
            >
              <div className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <div className="text-sm font-semibold text-slate-900">잔차 분포</div>
                </div>
                <p className="text-xs text-slate-500">대부분 0 근처(-200~200) 집중 — 고가 이상치에서 우측 꼬리 발생</p>
              </div>
              <ZoomableImage
                src={withBasePath("/pricelens/residual.png")}
                alt="잔차 분포"
                className="w-full object-contain bg-white"
                onOpen={() =>
                  setActiveImage({
                    src: withBasePath("/pricelens/residual.png"),
                    alt: "잔차 분포",
                    title: "잔차 분포",
                  })
                }
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SHAP */}
      <section id="shap" className="mt-20 md:mt-28">
        <Container>
          <SectionTitle
            eyebrow="Interpretability"
            title="SHAP vs Feature Importance — 서로 다른 답"
            desc="두 방식을 함께 비교함으로써 모델 설명 가능성을 보완하고, 실질적인 가격 결정 요인을 특정했습니다."
            wide
          />

          {/* FI vs SHAP 비교 */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={0}
            className="mt-4 rounded-2xl border border-slate-200/70 bg-white/80 overflow-hidden shadow-sm"
          >
            <div className="px-5 pt-5 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-violet-400" />
                <div className="text-sm font-semibold text-slate-900">Feature Importance vs SHAP 비교</div>
              </div>
            </div>
            <ZoomableImage
              src={withBasePath("/pricelens/shap-fi.png")}
              alt="Feature Importance vs SHAP 비교"
              className="w-full object-contain bg-white px-4 pb-4"
              onOpen={() =>
                setActiveImage({
                  src: withBasePath("/pricelens/shap-fi.png"),
                  alt: "Feature Importance vs SHAP 비교",
                  title: "Feature Importance vs SHAP 비교",
                })
              }
            />
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={1}
            >
              <Card title="Feature Importance 상위" icon={<div className="h-2 w-2 rounded-full bg-slate-400" />}>
                <p className="mb-3 text-xs text-slate-500">트리 분기 빈도 기반 — 자주 사용된 변수가 높게 측정됨</p>
                <div className="space-y-2">
                  {[
                    "연간 예약 가능일",
                    "리뷰 수",
                    "숙소관련시설",
                    "리뷰 점수",
                    "조리시설",
                  ].map((item, i) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 w-4">{i + 1}</span>
                      <div className="flex-1 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{item}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={2}
            >
              <Card title="SHAP 상위 — 실질 가격 결정 요인" icon={<div className="h-2 w-2 rounded-full bg-amber-400" />}>
                <p className="mb-3 text-xs text-slate-500">예측값에 대한 실질적 기여도 반영</p>
                <div className="space-y-2">
                  {[
                    "숙소 유형 (독채 vs 개인실)",
                    "지역구 평균 가격",
                    "침대 수",
                    "침실 수",
                    "위생·샤워용품",
                  ].map((item, i) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="text-xs text-amber-500 w-4">{i + 1}</span>
                      <div className="flex-1 rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-xs text-amber-800">{item}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={3}
            className="mt-4 rounded-2xl border border-amber-200/70 bg-amber-50/60 p-5"
          >
            <div className="text-sm font-semibold text-amber-800 mb-2">해석</div>
            <p className="text-sm text-slate-700 leading-6">
              Feature Importance는 분기 빈도 기반이므로 <strong>예약 가능일·리뷰 수</strong>처럼 데이터가 많은 변수가 높게 나타납니다.
              반면 SHAP은 각 예측값에 대한 실질 기여도를 측정하므로, <strong>숙소 유형·지역 평균 가격·침실 수</strong>가 실제 가격을 결정하는 핵심 요인임을 보여줍니다.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Tech Stack */}
      <section id="stack" className="mt-20 md:mt-28">
        <Container>
          <SectionTitle eyebrow="Tech Stack" title="기술 스택" />
          <div className="grid grid-cols-3 gap-3 md:grid-cols-5 lg:grid-cols-9">
            {[
              "Python",
              "Pandas",
              "Scikit-learn",
              "XGBoost",
              "LightGBM",
              "Optuna",
              "SHAP",
              "Statsmodels",
              "SciPy",
            ].map((tech, i) => (
              <motion.div
                key={tech}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border border-slate-200/70 bg-white/80 p-3 text-center text-xs font-semibold text-slate-900 shadow-sm"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Footer */}
      <section className="mt-16 md:mt-24 border-t border-slate-200/70 pt-10 pb-16">
        <Container>
          <div className="text-center text-xs text-slate-500">
            PriceLens · Airbnb 숙소 가격 결정 요인 분석
            <br />© 2025 백경우. All Rights Reserved.
          </div>
        </Container>
      </section>

      {activeImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-6"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative w-full max-w-6xl rounded-2xl bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 transition hover:bg-slate-100"
            >
              닫기
            </button>
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[80vh] w-full rounded-xl object-contain"
            />
            <div className="mt-3">
              <div className="mb-1 text-sm font-semibold text-slate-900">{activeImage.title}</div>
              <div className="text-xs leading-5 text-slate-500">{activeImage.alt}</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
