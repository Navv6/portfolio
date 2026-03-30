"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const typePerf = [
  {
    type: "성장 잠재주",
    avg: 22.96,
    n: 31,
    desc: "성장 지표가 강한 기업군으로, 실제 시장에서도 상대적으로 높은 수익률 흐름을 보였습니다.",
  },
  {
    type: "투자 유보",
    avg: 19.9,
    n: 106,
    desc: "평균 수익률은 높았지만 편차가 매우 커서 이벤트 의존적인 고위험 특성이 함께 관찰됐습니다.",
  },
  {
    type: "중립 보통주",
    avg: 13.58,
    n: 143,
    desc: "재무 신호가 혼재된 유형으로, 추가 해석 없이 단독 판단하기에는 정보가 부족한 편입니다.",
  },
  {
    type: "종합 우량주",
    avg: 10.22,
    n: 122,
    desc: "안정성과 성장성이 비교적 균형 잡힌 그룹으로, 시장 상황에 따라 완만한 성과를 보였습니다.",
  },
  {
    type: "우량 가치주",
    avg: 8.39,
    n: 42,
    desc: "방어적 성격이 강한 기업군으로, 수익 폭은 제한적이지만 상대적으로 안정적인 흐름이 특징입니다.",
  },
];

type TooltipPayload = {
  payload: (typeof typePerf)[number];
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
};

export function TypeReturnBar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (!active || !payload?.length) {
      return null;
    }

    const data = payload[0].payload;

    return (
      <div className="max-w-xs rounded-lg border border-white/20 bg-zinc-900 px-3 py-2 shadow-lg">
        <div className="mb-1 text-sm font-semibold text-zinc-100">{data.type}</div>
        <div className="mb-2 space-y-1 text-xs text-zinc-300">
          <div className="flex justify-between gap-4">
            <span>평균 수익률</span>
            <span className="font-semibold text-blue-400">{data.avg}%</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>종목 수</span>
            <span className="text-zinc-400">{data.n}개</span>
          </div>
        </div>
        <div className="border-t border-white/10 pt-2 text-xs leading-5 text-zinc-400">
          {data.desc}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold text-zinc-900">유형별 평균 수익률 비교</div>
          <div className="text-xs text-zinc-500">2025-07-02 기준, 단위: %</div>
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
                tick={{ fill: "#71717a", fontSize: 12 }}
              />
              <XAxis
                type="number"
                tick={{ fill: "#71717a", fontSize: 12 }}
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
        막대에 마우스를 올리면 유형별 상세 설명을 확인할 수 있습니다.
      </div>
    </div>
  );
}
