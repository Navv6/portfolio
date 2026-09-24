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
  summary: string
  done: string[]
  next: string[]
  log: { date: string; text: string }[]
}

const entries: Entry[] = [
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
      <section className="border-t border-zinc-200 pt-12 pb-24">
        <div className="mx-auto max-w-4xl px-5 mb-6">
          <h2 className="text-xl font-semibold text-zinc-900">진행 상황</h2>
        </div>
        <div className="mx-auto max-w-4xl px-5 grid gap-6">
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

              {item.video ? (
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
