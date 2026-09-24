"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 스크롤 등장 효과.
 * [data-reveal] 요소가 화면에 들어오면 .is-visible을 붙입니다. 실제 움직임은 globals.css에서 정의하고,
 * JS가 없거나 모션 감소 설정이면 처음부터 보이도록 CSS가 처리합니다.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const show = (el: Element) => el.classList.add("is-visible");
    if (reduce || !("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(show);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.01 },
    );
    const scan = () => document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => io.observe(el));
    scan();
    // 접힌 영역이 열리거나 클라이언트 전환으로 새로 그려진 요소도 관찰
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
  return null;
}

/** 상단 바: 맨 위에서는 투명, 스크롤하면 반투명 유리 효과 */
export function HeaderShell({ className = "", children }: { className?: string; children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-20 border-b transition-colors duration-300 ${
        scrolled ? "border-zinc-200/80 bg-white/70 backdrop-blur-md" : "border-transparent bg-transparent"
      } ${className}`}
    >
      {children}
    </header>
  );
}

/**
 * 첫 화면 오른쪽의 추상 그래픽 (Connected Intelligence).
 * 층층이 쌓인 유리 레이어와 노드 네트워크. 데스크톱에서만 마우스에 따라 아주 약하게 기울어집니다.
 */
export function HeroVisual() {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5; // -0.5 ~ 0.5
        const y = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty("--ry", `${(x * 6).toFixed(2)}deg`); // ±3deg
        el.style.setProperty("--rx", `${(-y * 4).toFixed(2)}deg`); // ±2deg
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // 위(문제) → 아래(제품)로 수렴하는 층별 노드
  const rows = [
    { y: 58, xs: [96, 160, 224] },
    { y: 122, xs: [72, 136, 200, 248] },
    { y: 186, xs: [112, 176, 232] },
    { y: 250, xs: [132, 196] },
    { y: 306, xs: [164] },
  ];
  const lines: [number, number, number, number][] = [];
  rows.slice(0, -1).forEach((row, i) => {
    const next = rows[i + 1];
    row.xs.forEach((x) =>
      next.xs.forEach((nx) => {
        if (Math.abs(nx - x) <= 72) lines.push([x, row.y, nx, next.y]);
      }),
    );
  });

  return (
    <div className="hero-visual relative h-[360px] w-[340px] lg:h-[400px] lg:w-[380px]" aria-hidden>
      <div ref={stage} className="hero-stage absolute inset-0">
        {/* 뒤쪽 반투명 구체 */}
        <div className="hero-layer absolute left-6 top-4 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(191,219,254,0.9),rgba(221,214,254,0.35)_55%,transparent_72%)] [--z:-70px]" />
        <div className="hero-layer absolute bottom-6 right-2 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(224,231,255,0.9),rgba(224,231,255,0.2)_60%,transparent_75%)] [--z:-40px]" />

        {/* 유리 레이어 두 장 */}
        <div className="hero-layer absolute left-10 top-12 h-[260px] w-[250px] rounded-[28px] border border-white/70 bg-white/35 shadow-[0_20px_60px_-30px_rgba(24,24,27,0.35)] backdrop-blur-sm [--z:-20px] lg:h-[290px] lg:w-[280px]" />
        <div className="hero-layer absolute left-16 top-20 h-[260px] w-[250px] rounded-[28px] border border-white/80 bg-white/45 backdrop-blur-md [--z:10px] lg:h-[290px] lg:w-[280px]">
          <div className="absolute inset-0 rounded-[28px] bg-[linear-gradient(to_right,rgba(113,113,122,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(113,113,122,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* 노드 네트워크 */}
        <svg viewBox="0 0 320 360" className="hero-layer absolute left-6 top-6 h-[330px] w-[300px] [--z:40px] lg:h-[370px] lg:w-[330px]">
          <defs>
            <linearGradient id="hv-line" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a1a1aa" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          {lines.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#hv-line)" strokeWidth="1" />
          ))}
          {rows.map((row, ri) =>
            row.xs.map((x, xi) => {
              const last = ri === rows.length - 1;
              return (
                <g key={`${ri}-${xi}`} className="hero-node" style={{ animationDelay: `${(ri * 3 + xi) * 0.7}s` }}>
                  <circle cx={x} cy={row.y} r={last ? 9 : 5.5} fill="white" stroke={last ? "#2563eb" : "#a1a1aa"} strokeWidth={last ? 1.5 : 1} />
                  <circle cx={x} cy={row.y} r={last ? 3.5 : 2} fill={last ? "#2563eb" : ri >= 2 ? "#60a5fa" : "#a1a1aa"} />
                </g>
              );
            }),
          )}
        </svg>

        {/* 떠 있는 작은 입자 */}
        {[
          ["left-2 top-24", "h-2 w-2", "0s"],
          ["right-6 top-10", "h-1.5 w-1.5", "2s"],
          ["right-0 top-44", "h-2.5 w-2.5", "4s"],
          ["left-8 bottom-12", "h-1.5 w-1.5", "6s"],
          ["right-16 bottom-2", "h-2 w-2", "3s"],
        ].map(([pos, size, delay]) => (
          <span
            key={pos}
            className={`hero-layer hero-particle absolute ${pos} ${size} rounded-full bg-blue-400/50 [--z:60px]`}
            style={{ animationDelay: delay }}
          />
        ))}

        {/* 앞쪽 작은 유리 칩 */}
        <div className="hero-layer absolute bottom-10 right-4 flex items-center gap-2 rounded-2xl border border-white/80 bg-white/70 px-3 py-2 shadow-sm backdrop-blur-md [--z:80px]">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          <span className="h-1.5 w-12 rounded-full bg-zinc-200" />
          <span className="h-1.5 w-6 rounded-full bg-zinc-200" />
        </div>
      </div>
    </div>
  );
}
