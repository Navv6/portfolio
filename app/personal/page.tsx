"use client";

import { ArrowRight } from 'lucide-react'
import { BoardPage } from '../site'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const withBasePath = (path: string) => `${basePath}${path}`

type Entry = {
  id: string
  name: string
  tagline: string
  url: string | null
  status: string
  preview: boolean
  video: string | null
  images?: { src: string; alt: string; caption: string }[]
  summary: string
  notes?: { label: string; text: string; source?: { name: string; url: string } }[]
  done: string[]
  next: string[]
  log: { date: string; text: string }[]
}

const entries: Entry[] = [
  {
    id: "readyflow",
    name: "ReadyFlow",
    tagline: "From Work to AI-Ready · 제조 중소기업 AI 도입 전 업무 진단",
    url: null,
    status: "검증 준비",
    preview: false,
    video: null,
    images: [
      { src: withBasePath("/readyflow/card-intro.png"), alt: "ReadyFlow 소개 카드: 우리 회사는 AI를 어디부터 적용해야 할까요?", caption: "소개 카드 · 문제 제기" },
      { src: withBasePath("/readyflow/card-method.png"), alt: "ReadyFlow 진단 방식 카드: 관리자 인터뷰와 실제 요청 데이터를 대조", caption: "진단 방식 · 카드의 수치는 예시입니다" },
    ],
    summary: "요청은 메신저와 전화로, 데이터는 여러 엑셀에, 진행상황은 담당자 머릿속에 흩어진 채로는 AI를 들여도 일하는 방식이 달라지지 않습니다. ReadyFlow는 AI 도입 전에 관리자 인터뷰와 실제 요청 데이터를 대조해, 먼저 개선해야 할 업무와 우선순위를 근거와 함께 제시하는 진단 서비스입니다. Preflight에서 흩어진 엑셀과 요청 흐름을 구조화한 경험을 다른 제조 현장으로 넓히는 창업 아이템입니다.",
    notes: [
      { label: "왜 필요한가 · 1", text: "중소기업 근로자의 70.4%가 회사에 생성형 AI 도입 로드맵이 없다고 응답했습니다(대기업 54.4%).", source: { name: "대한상공회의소 근로자 3,000명 조사", url: "https://www.dataeconomy.co.kr/news/articleView.html?idxno=42906" } },
      { label: "왜 필요한가 · 2", text: "AI 활용으로 업무시간은 평균 3.8% 줄었지만 실제 생산 증가와의 상관은 0이었습니다. 개별 작업은 빨라졌지만 업무 흐름과 조직은 그대로였기 때문으로 분석됩니다.", source: { name: "한국은행 BOK 이슈노트 제2026-12호", url: "https://www.bok.or.kr/portal/bbs/P0002353/view.do?nttId=10098322&oldMenuNo=201150&menuNo=200433&programType=newsData&depth=200433&relate=Y" } },
      { label: "원칙", text: "Understand first. Automate second. AI when ready." },
    ],
    done: ["공개 통계로 문제 정의 정리", "인터뷰와 실제 데이터를 대조하는 진단 방식 설계", "SNS 소개 카드뉴스 제작"],
    next: ["20~300명 규모 제조기업 개발 · 품질 · 생산관리 · 구매 부서에서 첫 진단", "진단 결과를 개선 우선순위와 자동화 범위로 정리하는 리포트 양식", "함께 만들 팀원 모집"],
    log: [],
  },
  {
    id: "thinklayer",
    name: "ThinkLayer",
    tagline: "만들기 전에, 먼저 구조를 봅니다 · AI가 만들기 전의 사고 레이어",
    url: null,
    status: "Concept",
    preview: false,
    video: null,
    images: [
      { src: withBasePath("/thinklayer/demo.gif"), alt: "ThinkLayer 콘셉트 데모: 인터뷰 후 MAP, GAP, PATH를 보여주는 터미널 화면", caption: "콘셉트 데모 · v0.1 개발 중이며 출력은 예시입니다" },
    ],
    summary: "AI 코딩 에이전트로 만드는 속도는 빨라졌지만, 무엇을 만들지 정하는 속도는 그대로입니다. ThinkLayer는 스펙을 쓰기 한 단계 앞에서 \"이걸 만들어야 하는가, 만든다면 가장 작은 버전은 무엇인가\"를 묻습니다. 짧은 인터뷰로 아이디어의 구조(MAP), 놓친 부분(GAP), 다음 행동 하나(PATH)를 보여주고, 요청하면 PRD와 에이전트 지침을 내보냅니다.",
    notes: [
      { label: "흐름", text: "아이디어 → ThinkLayer (MAP · GAP · PATH) → PRD / 스펙 → 코딩 에이전트" },
      { label: "원칙", text: "모르는 것은 추측하지 않고 Unknown · Assumption으로 표시합니다. 다음 행동은 하나만 제시하고, 사용자가 확정한 내용은 모델이 덮어쓰지 않습니다." },
      { label: "형태", text: "모델을 내장하지 않고, 사용자가 이미 쓰는 코딩 에이전트 안에서 실행되는 에이전트 스킬입니다. 목적별 Slot · 질문 · Gap 규칙은 Pack으로 분리했습니다." },
    ],
    done: ["Project State JSON Schema 설계", "Vibe Coding Pack(Slot · 질문 힌트 · Gap 규칙 · Export) 문서화", "인터뷰 → MAP → GAP → PATH 스킬 지침 작성", "예시 프로젝트(상태 · 맵 · PRD)와 콘셉트 데모"],
    next: ["Prototype: 아이디어 하나를 끝까지 처리", "MVP: 로컬 상태 저장 · Export · 사용자 테스트 10~20명", "Validation: Gap 유용성과 범위 변화 측정", "Idea · Startup · Project · Decision Pack 확장"],
    log: [],
  },
  {
    id: "vibecoder",
    name: "VibeCoder",
    tagline: "AI 워크플로우 커뮤니티",
    url: "https://vibecoderlabs.vercel.app/",
    status: "진행 중",
    preview: true,
    video: null,
    summary: "비개발자도 AI로 직접 만들 수 있게 돕는 워크플로우 커뮤니티 서비스로, AI 뉴스·영상·플레이북·빌드 로그를 한 곳에서 탐색할 수 있도록 구성하고 있습니다.",
    done: ["홈 피드와 추천 캐러셀 구성", "커뮤니티/플레이북 탐색 구조 구현", "빌드 로그 공유 흐름과 라이브 배포"],
    next: ["피드백 기반 정보 구조 보완", "커뮤니티 참여 흐름 고도화", "큐레이션 품질과 운영 기능 확장"],
    log: [],
  },
  {
    id: "davinci",
    name: "DaVinci Note",
    tagline: "생각을 확장하는 노트",
    url: "https://navv6.github.io/Davinci/",
    status: "진행 중",
    preview: false,
    video: withBasePath("/davinci-demo.mp4"),
    summary: "아이디어를 기록하는 데서 끝나지 않고, 말과 손동작, 시각적 연결, AI 보조를 통해 생각을 확장하는 노트형 서비스로 발전시키고 있습니다.",
    done: ["초기 노트 화면과 탐색 흐름 구현", "전체 톤앤매너와 인터랙션 방향 설계", "프로토타입 배포 환경 구성"],
    next: ["모션캡처 기반 손동작 인식", "STT 기반 음성 입력", "구조를 자유롭게 이동·연결하는 인터랙션", "AI 어시스턴트로 아이디어 확장·검토·보완 추천"],
    log: [],
  },
]

export default function PersonalProjects() {
  return (
    <BoardPage category="personal">
      {/* Entries */}
      <section className="border-t border-zinc-200 pt-12 pb-16">
        <div className="mx-auto max-w-5xl px-5 mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">진행 상황</h2>
        </div>
        <div className="mx-auto max-w-5xl px-5 grid gap-6">
          {entries.map((item) => (
            <article key={item.id} id={item.id} className="scroll-mt-20 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm break-inside-avoid">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-xl font-semibold text-zinc-900">{item.name}</h2>
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 mb-3">{item.tagline}</p>
                  <p className="text-sm leading-6 text-zinc-700 max-w-2xl">{item.summary}</p>
                </div>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-800 transition hover:bg-zinc-100"
                  >
                    바로가기
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">현재까지 구현</div>
                  <div className="mt-2 space-y-1.5">
                    {item.done.map((point) => (
                      <div key={point} className="text-sm text-zinc-700">• {point}</div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">개발 예정</div>
                  <div className="mt-2 space-y-1.5">
                    {item.next.map((point) => (
                      <div key={point} className="text-sm text-blue-800">• {point}</div>
                    ))}
                  </div>
                </div>
              </div>

              {item.notes?.length ? (
                <dl className="mt-4 grid gap-3 md:grid-cols-3">
                  {item.notes.map((note) => (
                    <div key={note.label} className="rounded-xl border border-zinc-200 p-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{note.label}</dt>
                      <dd className="mt-2 text-sm leading-6 text-zinc-700 break-keep">{note.text}</dd>
                      {note.source ? (
                        <dd className="mt-2 text-xs text-zinc-500">
                          출처 ·{" "}
                          <a href={note.source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-800">
                            {note.source.name}
                          </a>
                        </dd>
                      ) : null}
                    </div>
                  ))}
                </dl>
              ) : null}

              {item.log.length > 0 ? (
                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-3">진행 로그</div>
                  <ol className="border-l border-zinc-200 pl-4 space-y-2.5">
                    {item.log.map((entry) => (
                      <li key={entry.date} className="relative text-sm text-zinc-700">
                        <span className="absolute -left-[21px] top-[7px] h-2 w-2 rounded-full bg-zinc-400" />
                        <span className="font-mono text-xs text-zinc-500 mr-3">{entry.date}</span>
                        {entry.text}
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}

              {item.images?.length ? (
                <div className={`mt-5 grid gap-4 ${item.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
                  {item.images.map((image) => (
                    <figure key={image.src} className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.src} alt={image.alt} loading="lazy" className="w-full bg-white" />
                      <figcaption className="border-t border-zinc-200 px-4 py-2 text-xs text-zinc-500">{image.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : item.video ? (
                <div className="mt-5 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                  <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 text-xs text-zinc-500">
                    <span>{item.name} Demo</span>
                    <span>Video Preview</span>
                  </div>
                  <div className="bg-white">
                    <video
                      src={item.video}
                      className="aspect-[16/9] w-full bg-black"
                      autoPlay
                      controls
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>
              ) : item.preview && item.url ? (
                <div className="mt-5 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                  <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 text-xs text-zinc-500">
                    <span>{item.url}</span>
                    <span>Live Preview</span>
                  </div>
                  <div className="aspect-[16/9] bg-white">
                    <iframe
                      src={item.url}
                      title={`${item.name} preview`}
                      className="h-full w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

    </BoardPage>
  )
}
