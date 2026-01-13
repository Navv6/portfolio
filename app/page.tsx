"use client";

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, FileText, Briefcase, Code2, ArrowRight, Phone } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-zinc-900">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-200px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-[-160px] top-[160px] h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-5">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="text-sm font-semibold text-zinc-900 hover:text-zinc-700 transition">
              Portfolio
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm text-zinc-900 font-semibold transition hover:text-zinc-700">
                홈
              </Link>
              <Link href="/projects/deepvi" className="text-sm text-zinc-600 transition hover:text-zinc-900">
                DeepVi
              </Link>
              <Link href="/projects/pricelens" className="text-sm text-zinc-600 transition hover:text-zinc-900">
                PriceLens
              </Link>
              <Link href="/projects/tableau" className="text-sm text-zinc-600 transition hover:text-zinc-900">
                Tableau
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="intro" className="pt-20 md:pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-5">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6">
              백경우
            </h1>
            <p className="text-2xl md:text-3xl text-zinc-700 mb-8">
              AI Application Engineer
            </p>
            
            {/* About Me */}
            <div className="flex flex-col md:flex-row gap-8 mb-8 max-w-4xl items-start">
              <div className="flex-1 space-y-4">
                <p className="text-base text-zinc-700 leading-relaxed">회계와 세무를 전공하며 전문 용어와 복잡한 정보가 만드는 <span className="font-semibold text-zinc-900">'이해의 장벽'</span>을 체감했습니다. 복잡한 정보는 누구나 쉽게 접근하고 활용할 수 있어야 한다는 믿음으로, 정보를 구조화하고 핵심을 전달하는 데이터 분석의 길을 걷기 시작했습니다.</p>
                
                <p className="text-base text-zinc-700 leading-relaxed">분석은 인사이트를 도출할 수 있지만, 즉시 활용할 수 있는 형태로 재가공하는 과정은 늘 추가적인 과제로 남았습니다. 이러한 <span className="font-semibold text-zinc-900">분석과 활용 사이의 공백을 메우기 위해 AI를 접목</span>했고, 다양한 AI를 경험하며 최신 트렌드를 학습해 왔습니다.</p>
                
                <p className="text-base text-zinc-700 leading-relaxed">이제는 단순히 툴을 활용하는 것을 넘어, <span className="font-semibold text-zinc-900">문제를 근본적으로 해결하기 위한 AI 서비스를 직접 설계하고 구현</span>하는 데 집중하고 있습니다.</p>
              </div>
              
              <div className="hidden md:block flex-shrink-0">
                <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-blue-100 to-violet-100 border-2 border-zinc-200 shadow-md flex items-center justify-center overflow-hidden">
                  <img 
                    src="/image.png" 
                    alt="프로필 사진" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://github.com/Navv6" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-50 transition text-sm shadow-sm"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a 
                href="http://www.linkedin.com/in/navv6" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-50 transition text-sm shadow-sm"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a 
                href="mailto:bwme43@gmail.com" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-50 transition text-sm shadow-sm"
              >
                <Mail className="h-4 w-4" />
                bwme43@gmail.com
              </a>
              <div 
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-50 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm"
                style={{ width: 'auto' }}
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="whitespace-nowrap text-sm transition-all duration-300 max-w-0 group-hover:max-w-xs opacity-0 group-hover:opacity-100">
                  010-5279-3430
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 border-t border-zinc-200">
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-8">Experience</h2>
          
          <div className="space-y-8">
            {/* Experience 1 */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">마크클라우드 (인턴)</h3>
                  <p className="text-sm text-zinc-600 mt-1">2025.11 ~ 2025.12</p>
                </div>
                <Briefcase className="h-5 w-5 text-zinc-600" />
              </div>
              <ul className="space-y-2 text-sm text-zinc-700">
                <li>• LLM API 호출 부하로 인한 서비스 불안정 문제를 분석하고, 로컬 LLM 전환을 포함한 개선 방안을 검토 및 테스트 진행</li>
                <li>• STT 모델의 구조적 특성을 비교하여 사업 요구 사항에 적합한 모델로 교체, 테스트 및 성능 지표 산출을 통해 성능 개선</li>
                <li>• 보고서 템플릿과 생성 엔진을 직접 설계하여, CSV 데이터를 기반으로 일관된 형식의 PDF 보고서를 자동 생성하는 프로세스 구축</li>
              </ul>
            </div>

            {/* Experience 2 */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">내일배움캠프 데이터분석가과정</h3>
                  <p className="text-sm text-zinc-600 mt-1">2025.02 ~ 2025.07</p>
                </div>
                <Briefcase className="h-5 w-5 text-zinc-600" />
              </div>
              <ul className="space-y-2 text-sm text-zinc-700">
                <li>• Python, SQL 기반 데이터 수집·정제·분석·시각화 전 과정을 경험</li>
                <li>• 데이터를 통해 가설을 검증하며 문제의 근본 원인을 파악하는 분석 프로젝트 수행</li>
                <li>• 머신러닝 모델링을 통한 분석 및 액션 가능한 인사이트 제시</li>
              </ul>
            </div>

            {/* Experience 3 */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">해군부사관</h3>
                  <p className="text-sm text-zinc-600 mt-1">2015.06 ~ 2019.08</p>
                </div>
                <Briefcase className="h-5 w-5 text-zinc-600" />
              </div>
              <ul className="space-y-2 text-sm text-zinc-700">
                <li>• 다중 센서 데이터 환경에서 실시간 정보를 해석하고 판단 및 시스템 운용</li>
                <li>• 탄착군 영상 분석, 오차 패턴 규명 및 개선안 도출</li>
                <li>• 노이즈와 간섭 환경에서 파라미터 튜닝으로 출력 품질과 신뢰도를 개선하는 최적화 경험</li>
                <li>• 시스템 장애 발생 시 오류 코드를 기반으로 원인을 추적하고, 설정 및 복구 조치를 통한 유지 보수 경험</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 border-t border-zinc-200">
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-8">Skill Set</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LLM / AI */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-zinc-900">LLM / AI</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['OpenAI', 'Oven', 'LLama', 'RAG', 'LangChain'].map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs text-purple-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Analysis */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-semibold text-zinc-900">Data Analysis</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Python', 'SQL', 'Tableau'].map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend / Data Handling */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-zinc-900">Backend / Data Handling</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'SQLAlchemy'].map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs text-blue-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Others */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-5 w-5 text-zinc-600" />
                <h3 className="text-lg font-semibold text-zinc-900">Others</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Streamlit', 'Linux/Ubuntu', 'WSL'].map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs text-zinc-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 border-t border-zinc-200">
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-8">Projects</h2>
          
          <div className="grid gap-6">
            {/* Project 1: DeepVi */}
            <Link 
              href="/projects/deepvi"
              className="group block rounded-2xl border border-zinc-200 bg-white p-8 hover:bg-zinc-50 transition shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">DeepVi</h3>
                  <p className="text-sm text-zinc-600">LLM 기반 기업 분석 서비스</p>
                </div>
                <ArrowRight className="h-5 w-5 text-zinc-600 group-hover:text-zinc-900 group-hover:translate-x-1 transition" />
              </div>
              
              <p className="text-sm text-zinc-700 leading-relaxed mb-4">
                재무제표와 시장 맥락을 AI로 해석해, 투자자가 스스로 이해하고 판단할 수 있도록 돕는 서비스입니다.
                KOSPI/KOSDAQ 447개 기업을 대상으로 데이터 수집부터 AI 분석, 대시보드 구축까지 전체 프로세스를 설계했습니다.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {['Python', 'FastAPI', 'PostgreSQL', 'LangChain', 'RAG', 'LLM'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs text-zinc-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>

            {/* Project 2: PriceLens */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 opacity-50 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">PriceLens</h3>
                  <p className="text-sm text-zinc-600">Airbnb 가격 요인 분석</p>
                </div>
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed">
                준비 중입니다...
              </p>
            </div>

            {/* Project 3: Tableau */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 opacity-50 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2">Tableau</h3>
                  <p className="text-sm text-zinc-600">LoL 초보자 가이드 시각화</p>
                </div>
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed">
                준비 중입니다...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 mt-16">
        <div className="mx-auto max-w-4xl px-5 text-center text-sm text-zinc-600">
          © 2025 백경우. All rights reserved.
        </div>
      </footer>

      {/* Floating Navigation */}
      <nav className="fixed bottom-8 left-1/2 z-30 hidden -translate-x-1/2 lg:block">
        <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white/90 px-2 py-2 shadow-lg backdrop-blur">
          {[
            { id: "intro", label: "소개" },
            { id: "experience", label: "경력" },
            { id: "skills", label: "기술" },
            { id: "projects", label: "프로젝트" },
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
  )
}
