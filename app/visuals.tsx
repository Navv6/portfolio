/**
 * 프로젝트별 추상 그래픽. 모두 같은 선 두께·색으로 그려 하나의 디자인 언어를 유지합니다.
 * - data: 표(엑셀) → 데이터 → 저장소 (Preflight)
 * - wave: 음성 파형 → 인식 → 텍스트 (MarkCloud)
 * - network: 데이터 노드가 하나의 답으로 연결 (DeepVi)
 * 실제 구조도가 아니라 분위기만 전하는 배경용이라 aria-hidden 처리합니다.
 */
export type TextureKind = "data" | "wave" | "network";

const stroke = "#a1a1aa";
const accent = "#2563eb";

export function ProjectTexture({ kind, className = "" }: { kind: TextureKind; className?: string }) {
  return (
    <svg viewBox="0 0 240 160" fill="none" className={className} aria-hidden>
      {kind === "data" ? <DataArt /> : kind === "wave" ? <WaveArt /> : <NetworkArt />}
    </svg>
  );
}

function DataArt() {
  const cols = [20, 44, 68, 92];
  const rows = [28, 44, 60, 76, 92, 108];
  return (
    <g strokeWidth="1">
      {/* 표 */}
      <rect x="14" y="18" width="92" height="100" rx="6" stroke={stroke} />
      {rows.slice(1).map((y) => (
        <line key={y} x1="14" x2="106" y1={y - 6} y2={y - 6} stroke={stroke} strokeOpacity="0.6" />
      ))}
      {cols.slice(1).map((x) => (
        <line key={x} x1={x - 4} x2={x - 4} y1="18" y2="118" stroke={stroke} strokeOpacity="0.6" />
      ))}
      <rect x="40" y="54" width="24" height="16" fill={accent} fillOpacity="0.18" />
      {/* 흐름 */}
      <path d="M112 68 C 134 68, 138 60, 156 60" stroke={accent} strokeOpacity="0.6" />
      <path d="M112 76 C 134 76, 138 96, 156 96" stroke={stroke} />
      {/* 저장소 */}
      <ellipse cx="190" cy="50" rx="30" ry="9" stroke={stroke} />
      <path d="M160 50 v28 a30 9 0 0 0 60 0 v-28" stroke={stroke} />
      <path d="M160 64 a30 9 0 0 0 60 0" stroke={stroke} strokeOpacity="0.6" />
      {/* 대시보드 막대 */}
      <rect x="164" y="104" width="10" height="24" rx="2" stroke={stroke} />
      <rect x="180" y="96" width="10" height="32" rx="2" fill={accent} fillOpacity="0.18" stroke={accent} strokeOpacity="0.6" />
      <rect x="196" y="112" width="10" height="16" rx="2" stroke={stroke} />
    </g>
  );
}

function WaveArt() {
  const bars = Array.from({ length: 22 }, (_, i) => {
    const h = 6 + Math.round(Math.abs(Math.sin(i * 0.9) * 22 + Math.sin(i * 0.37) * 10));
    return { x: 14 + i * 6, h };
  });
  return (
    <g strokeWidth="1">
      {bars.map((b, i) => (
        <line key={b.x} x1={b.x} x2={b.x} y1={62 - b.h / 2} y2={62 + b.h / 2} stroke={i > 7 && i < 14 ? accent : stroke} strokeOpacity={i > 7 && i < 14 ? 0.7 : 0.8} strokeLinecap="round" />
      ))}
      <path d="M150 62 H 168" stroke={stroke} />
      <circle cx="182" cy="62" r="13" stroke={accent} strokeOpacity="0.7" />
      <circle cx="182" cy="62" r="4" fill={accent} fillOpacity="0.5" />
      {/* 텍스트 줄 */}
      <rect x="150" y="100" width="76" height="6" rx="3" fill={stroke} fillOpacity="0.35" />
      <rect x="150" y="114" width="58" height="6" rx="3" fill={stroke} fillOpacity="0.35" />
      <rect x="150" y="128" width="68" height="6" rx="3" fill={accent} fillOpacity="0.2" />
      <path d="M182 76 V 92" stroke={stroke} strokeDasharray="2 3" />
    </g>
  );
}

function NetworkArt() {
  const nodes: [number, number][] = [
    [28, 34], [34, 92], [70, 132], [78, 60], [120, 28], [132, 102], [176, 58], [210, 112],
  ];
  const edges: [number, number][] = [
    [0, 3], [1, 3], [1, 2], [2, 5], [3, 4], [3, 5], [4, 6], [5, 6], [5, 7], [6, 7],
  ];
  return (
    <g strokeWidth="1">
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={b >= 6 ? accent : stroke} strokeOpacity={b >= 6 ? 0.55 : 0.7} />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 7 ? 9 : 5} fill="white" stroke={i >= 6 ? accent : stroke} strokeOpacity={i >= 6 ? 0.8 : 1} />
          {i === 7 ? <circle cx={x} cy={y} r="3.5" fill={accent} fillOpacity="0.6" /> : null}
        </g>
      ))}
    </g>
  );
}
