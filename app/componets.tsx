"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const typePerf = [
  { 
    type: "성장 잠재주", 
    avg: 22.96, 
    n: 31,
    desc: "성장 지표가 강한 기업군이 실제 시장에서 상대적으로 우세한 흐름."
  },
  { 
    type: "투자 유보", 
    avg: 19.90, 
    n: 106,
    desc: "평균은 높지만 분산이 극단적. 특히 바이오/제약 비중이 높아 신약·임상 이벤트에 성과가 좌우."
  },
  { 
    type: "중립 보통주", 
    avg: 13.58, 
    n: 143,
    desc: "재무 신호가 혼재된 유형. 성과도 양극화되어 '추가 맥락(뉴스/사이클)'의 필요성이 큼."
  },
  { 
    type: "종합 우량주", 
    avg: 10.22, 
    n: 122,
    desc: "안정·성장 균형형. 성과는 시장 국면/섹터 흐름 영향을 받는 경향."
  },
  { 
    type: "우량 가치주", 
    avg: 8.39, 
    n: 42,
    desc: "방어력(건전성) 기반. 큰 상승은 제한적이지만 하방 리스크 완충 성격."
  },
];
export
function TypeReturnBar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg bg-zinc-900 border border-white/20 px-3 py-2 shadow-lg max-w-xs">
          <div className="font-semibold text-zinc-100 text-sm mb-1">{data.type}</div>
          <div className="text-xs text-zinc-300 mb-2">
            <div className="flex justify-between gap-4">
              <span>평균수익률</span>
              <span className="font-semibold text-blue-400">{data.avg}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>종목 수</span>
              <span className="text-zinc-400">{data.n}개</span>
            </div>
          </div>
          <div className="text-xs text-zinc-400 leading-5 border-t border-white/10 pt-2">
            {data.desc}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <div className="text-sm font-semibold text-zinc-100">
            유형별 평균 수익률 비교
          </div>
          <div className="mt-1 text-xs text-zinc-500">
            2025.07.02 → 2025.12.30 (단위: %)
          </div>
        </div>
        <div className="text-xs text-zinc-500">n = 종목 수</div>
      </div>

      <div className="h-[260px]">
        {isClient ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={typePerf} layout="vertical" margin={{ left: 12, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
              <YAxis
                dataKey="type"
                type="category"
                width={90}
                tick={{ fill: "#a1a1aa", fontSize: 12 }}
              />
              <XAxis
                type="number"
                tick={{ fill: "#a1a1aa", fontSize: 12 }}
                domain={[0, "dataMax + 5"]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(59,130,246,0.1)" }} />
              <Bar dataKey="avg" radius={[8, 8, 8, 8]} fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full" />
        )}
      </div>

      <div className="mt-3 text-xs text-zinc-500">
        * 막대 위에 마우스를 올려 유형별 상세 정보와 해석을 확인하세요.
      </div>
    </div>
  );
}
