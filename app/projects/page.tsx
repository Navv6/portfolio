import { categories, projectsIn, ProjectBoard, SiteFooter, SiteHeader } from "../site";
import { featuredProjects } from "../home-content";

export default function ProjectsPage() {
  const featuredIds = new Set(featuredProjects.filter(project => project.visible).map(project => project.id));
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-12 md:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">More Projects</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">다른 프로젝트</h1>
        {categories.map(category => {
          const otherProjects = projectsIn(category.key).filter(project => !featuredIds.has(project.id));
          if (!otherProjects.length) return null;
          return (
          <section key={category.key} className="mt-10">
            <h2 className="mb-4 text-sm font-semibold text-zinc-500">{category.label}</h2>
            <ProjectBoard list={otherProjects} />
          </section>
          );
        })}
      </div>
      <SiteFooter />
    </main>
  );
}
