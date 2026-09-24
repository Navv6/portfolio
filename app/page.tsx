import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { SectionHeader, SiteFooter, SiteHeader, StatusBadge } from "./site";
import { introduction, featuredProjects, aiSteps, responsibilities, experience, skills, currentlyBuilding } from "./home-content";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600";
const section = "scroll-mt-20 border-t border-zinc-200 py-14 md:py-20";
const card = "rounded-2xl border border-zinc-200 bg-white";

export default function Home() {
  const visibleProjects = featuredProjects.filter((project) => project.visible);
  const [lead, ...others] = visibleProjects;

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <SiteHeader active="home" className="print:hidden" />

      {/* Intro */}
      <section id="intro" className="scroll-mt-20 pb-14 pt-12 md:pb-20 md:pt-20" aria-labelledby="intro-title">
        <div className="mx-auto grid max-w-5xl items-start gap-8 px-5 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-zinc-500">{introduction.name}</p>
            <h1 id="intro-title" className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">
              {introduction.role}
            </h1>
            <p className="mt-6 text-xl font-semibold leading-snug tracking-tight text-zinc-800 break-keep md:text-2xl">
              {introduction.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 break-keep">{introduction.description}</p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-500 break-keep">{introduction.about}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className={"inline-flex min-h-11 items-center gap-2 rounded-lg bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-zinc-700 " + focus}>
                View Work
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a href="https://github.com/Navv6" target="_blank" rel="noopener noreferrer" className={"inline-flex min-h-11 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-sm transition hover:bg-zinc-100 " + focus}>
                <Github className="h-4 w-4" aria-hidden />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/navv6" target="_blank" rel="noopener noreferrer" className={"inline-flex min-h-11 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-sm transition hover:bg-zinc-100 " + focus}>
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
            </div>
          </div>
          <img
            src={basePath + "/profile.jpg"}
            alt="백경우 프로필"
            width={160}
            height={160}
            className="hidden h-40 w-40 rounded-2xl border border-zinc-200 bg-white object-contain object-top shadow-sm md:block"
          />
        </div>
      </section>

      {/* Selected Work */}
      <section id="projects" className={section} aria-labelledby="work-heading">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader
            id="work-heading"
            eyebrow="Selected Work"
            title="대표 프로젝트"
            action={
              <Link href="/projects" className={"inline-flex min-h-11 items-center gap-1.5 text-sm text-zinc-600 transition hover:text-zinc-900 " + focus}>
                More Projects
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            }
          />

          {lead ? (
            <Link href={lead.href} className={`group grid overflow-hidden md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] ${card} transition hover:border-zinc-300 hover:shadow-md ${focus}`}>
              <div className="flex flex-col p-6 md:p-8">
                <p className="text-xs font-semibold text-zinc-500">{lead.eyebrow}</p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight">{lead.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600 break-keep">{lead.description}</p>
                <p className="mt-4 text-xs text-zinc-500">
                  Shows <span className="ml-1.5 font-medium text-blue-700">{lead.shows}</span>
                </p>
                <div className="mt-8 flex items-end justify-between gap-4 border-t border-zinc-100 pt-5 md:mt-auto">
                  <div>
                    <p className="text-3xl font-bold tracking-tight tabular-nums">{lead.metric}</p>
                    <p className="mt-1 text-xs text-zinc-500">{lead.metricLabel}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                    Case Study
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </div>
              <div className="relative hidden min-h-[22rem] border-l border-zinc-100 bg-zinc-100 md:block">
                <img
                  src={basePath + "/preflight/home.webp"}
                  alt="Preflight 메인 화면 (가상 데이터)"
                  className="absolute bottom-0 left-6 top-6 w-[calc(100%-1.5rem)] rounded-tl-xl border-l border-t border-zinc-200 object-cover object-left-top shadow-sm"
                />
              </div>
            </Link>
          ) : null}

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {others.map((project) => (
              <Link key={project.id} href={project.href} className={`group flex flex-col p-6 md:p-7 ${card} transition hover:border-zinc-300 hover:shadow-md ${focus}`}>
                <p className="text-xs font-semibold text-zinc-500">{project.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600 break-keep">{project.description}</p>
                <p className="mt-4 text-xs text-zinc-500">
                  Shows <span className="ml-1.5 font-medium text-blue-700">{project.shows}</span>
                </p>
                <div className="mt-8 flex items-end justify-between gap-4 border-t border-zinc-100 pt-5 md:mt-auto">
                  <div>
                    <p className="text-2xl font-bold tracking-tight tabular-nums">{project.metric}</p>
                    <p className="mt-1 text-xs text-zinc-500">{project.metricLabel}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                    Case Study
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How I Build with AI */}
      <section id="ai" className={section} aria-labelledby="ai-heading">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader id="ai-heading" eyebrow="How I Build with AI" title="AI는 빠르게, 판단과 검증은 직접" />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aiSteps.map((step) => (
              <li key={step.step} className={`flex flex-col p-5 ${card}`}>
                <p className="font-mono text-xs text-zinc-400">{step.step}</p>
                <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 break-keep">{step.description}</p>
                {step.href ? (
                  <Link href={step.href} className={"mt-auto inline-flex items-center gap-1 pt-5 text-xs font-medium text-blue-700 hover:text-blue-900 " + focus}>
                    {step.example}
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  </Link>
                ) : (
                  <p className="mt-auto pt-5 text-xs text-zinc-500">{step.example}</p>
                )}
              </li>
            ))}
          </ol>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {responsibilities.map((group, i) => (
              <div key={group.title} className={`p-5 ${i === 0 ? "rounded-2xl border border-blue-200 bg-blue-50/60" : card}`}>
                <h3 className={`text-sm font-semibold ${i === 0 ? "text-blue-900" : "text-zinc-900"}`}>{group.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className={`rounded-full border px-3 py-1 text-xs ${i === 0 ? "border-blue-200 bg-white text-blue-900" : "border-zinc-200 bg-zinc-50 text-zinc-700"}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className={section} aria-labelledby="experience-heading">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader id="experience-heading" eyebrow="Experience" title="경력" />
          <ol className={`divide-y divide-zinc-100 ${card}`}>
            {experience
              .filter((item) => item.visible)
              .map((item) => (
                <li key={item.id} className="grid gap-2 p-5 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-6 md:p-6">
                  <p className="text-xs leading-6 text-zinc-500 tabular-nums">
                    {item.period.split(" · ").map((part, i) => (
                      <span key={part} className={i === 0 ? "block font-medium text-zinc-700" : "block"}>
                        {part}
                      </span>
                    ))}
                  </p>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold break-keep">
                      {item.company ? <>{item.company} · </> : null}
                      {item.title}
                    </h3>
                    <ul className="mt-2 space-y-1.5">
                      {item.items.map((line) => (
                        <li key={line} className="flex gap-2.5 text-sm leading-6 text-zinc-600 break-keep">
                          <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-zinc-400" aria-hidden />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className={section} aria-labelledby="skills-heading">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader id="skills-heading" eyebrow="Skills" title="기술" />
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((group) => (
              <div key={group.title} className={`flex flex-col p-5 ${card}`}>
                <h3 className="text-base font-semibold">{group.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700">
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={group.href} className={"mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-blue-700 hover:text-blue-900 " + focus}>
                  {group.evidence}에서 사용
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-zinc-500">Development workflow · Claude, Codex (AI-assisted development, human-verified)</p>
        </div>
      </section>

      {/* Currently Building */}
      <section id="building" className={section} aria-labelledby="building-heading">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader id="building-heading" eyebrow="Currently Building" title="진행 중인 작업" />
          <div className="grid gap-4 md:grid-cols-3">
            {currentlyBuilding.map((item) => {
              const body = (
                <>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    {item.status ? <StatusBadge status={item.status} /> : null}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 break-keep">{item.description}</p>
                  {item.href ? (
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-blue-700">
                      자세히 보기
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  ) : null}
                </>
              );
              return item.href ? (
                <Link key={item.title} href={item.href} className={`group flex flex-col p-5 ${card} transition hover:border-zinc-300 hover:shadow-md ${focus}`}>
                  {body}
                </Link>
              ) : (
                <div key={item.title} className={`flex flex-col p-5 ${card}`}>
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={section} aria-labelledby="contact-heading">
        <div className="mx-auto max-w-5xl px-5">
          <div className={`flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8 ${card}`}>
            <div>
              <h2 id="contact-heading" className="text-2xl font-bold tracking-tight">Contact</h2>
              <p className="mt-2 text-sm text-zinc-600">협업이나 채용 관련 연락은 메일로 부탁드립니다.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:bwme43@gmail.com" className={"inline-flex min-h-11 items-center gap-2 rounded-lg bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-zinc-700 " + focus}>
                <Mail className="h-4 w-4" aria-hidden />
                bwme43@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/navv6" target="_blank" rel="noopener noreferrer" className={"inline-flex min-h-11 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-sm transition hover:bg-zinc-100 " + focus}>
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
