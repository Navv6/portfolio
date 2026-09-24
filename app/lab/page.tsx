"use client";

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const withBasePath = (path: string) => `${basePath}${path}`

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

// 사내 업무 도구의 공개용 이름. 이름이 바뀌면 여기만 고치면 됩니다.
const WORKSPACE_NAME = "Preflight"

type Entry = {
  name: string
  tagline: string
  url: string | null
  caseStudy?: string
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
    name: WORKSPACE_NAME,
    tagline: "R&D 업무 관리 워크스페이스",
    url: null,
    caseStudy: "/projects/preflight",
    status: "사용 중",
    preview: false,
    video: null,
    summary: "ERP에서 내려받은 엑셀을 끌어다 놓으면 샘플조달·시사출·CT 테스트 현황과 팀원별 할 일이 한 화면에 정리되는 사내 업무 도구입니다. 팀에서 사용 중이며, 사내 IT 관리 체계에 맞춰 계속 다듬고 있습니다.",
    done: ["업무 모듈 4종 (샘플조달 · 시사출 · CT 테스트 · 회의록)", "비표준 ERP xlsx 정규화 파서", "로그인 · 3단계 권한 · PostgreSQL 영속화"],
    next: ["영업부 샘플 요청 알림 · 로그 기반 재고 추적", "사내 IT 관리 체계에 맞춘 재정비", "개발부서 T0~T4 개발 테스트 관리 모듈", "검토/승인 워크플로우 화면"],
    log: [
      { date: "2026.08.16", text: "엑셀 업로드를 전체 교체에서 누적 병합으로 전환 · 팀 게시판 · DB 백업 스크립트" },
      { date: "2026.08.15", text: "로그인과 계정 관리 추가, 전 모듈 PostgreSQL 이전" },
      { date: "2026.08.13", text: "현업 피드백 반영 — 메인/KPI 분리, 팀원별 담당자 지정" },
      { date: "2026.08.12", text: "ERP 엑셀 파싱·저장 파이프라인 구축, 실제 파일 수치 대조" },
    ],
  },
  {
    name: "VibeCoder",
    tagline: "AI 워크플로우 커뮤니티",
    url: "https://vibecoderlabs.vercel.app/",
    status: "In Progress",
    preview: true,
    video: null,
    summary: "비개발자도 AI로 직접 만들 수 있게 돕는 워크플로우 커뮤니티 서비스로, AI 뉴스·영상·플레이북·빌드 로그를 한 곳에서 탐색할 수 있도록 구성하고 있습니다.",
    done: ["홈 피드와 추천 캐러셀 구성", "커뮤니티/플레이북 탐색 구조 구현", "빌드 로그 공유 흐름과 라이브 배포"],
    next: ["피드백 기반 정보 구조 보완", "커뮤니티 참여 흐름 고도화", "큐레이션 품질과 운영 기능 확장"],
    log: [],
  },
  {
    name: "DaVinci Note",
    tagline: "생각을 확장하는 노트",
    url: "https://navv6.github.io/Davinci/",
    status: "In Progress",
    preview: false,
    video: withBasePath("/davinci-demo.mp4"),
    summary: "아이디어를 기록하는 데서 끝나지 않고, 말과 손동작, 시각적 연결, AI 보조를 통해 생각을 확장하는 노트형 서비스로 발전시키고 있습니다.",
    done: ["초기 노트 화면과 탐색 흐름 구현", "전체 톤앤매너와 인터랙션 방향 설계", "프로토타입 배포 환경 구성"],
    next: ["모션캡처 기반 손동작 인식", "STT 기반 음성 입력", "구조를 자유롭게 이동·연결하는 인터랙션", "AI 어시스턴트로 아이디어 확장·검토·보완 추천"],
    log: [],
  },
]

export default function Lab() {
  return (
    <main className="min-h-screen bg-gray-50 text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-5">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-zinc-700 transition">
              <ArrowLeft className="h-4 w-4" />
              Portfolio
            </Link>
            <span className="text-sm font-semibold text-zinc-900">끄적임</span>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="pt-16 md:pt-24 pb-10">
        <div className="mx-auto max-w-4xl px-5">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3">Building Now</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-5">끄적임</h1>
            <p className="text-base leading-7 text-zinc-700 max-w-2xl">
              완성된 프로젝트와 별도로, 지금 만들어보고 있는 것들을 모아둔 곳입니다.
              문제 정의부터 화면 설계, 구현, 배포까지 빠르게 반복하며 다듬고 있습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Entries */}
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-5 grid gap-6">
          {entries.map((item) => (
            <article key={item.name} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm break-inside-avoid">
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
                ) : item.caseStudy ? (
                  <Link
                    href={item.caseStudy}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-800 transition hover:bg-zinc-100"
                  >
                    케이스 스터디
                    <ArrowRight className="h-4 w-4" />
                  </Link>
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

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8">
        <div className="mx-auto max-w-4xl px-5 text-center text-sm text-zinc-600">
          © 2025 백경우. All rights reserved.
        </div>
      </footer>
    </main>
  )
}
