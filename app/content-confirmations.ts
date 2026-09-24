// v2 §0.5: 사용자 확인 전에는 값을 추정하지 않습니다.
// 수치·인프라 원문은 공개 번들에 넣지 않고, 확인된 값만 이 파일에 반영합니다.
export const confirmations: {
  markCloudPublic: boolean | null;
  markCloudInfrastructurePublic: boolean | null;
  localLlmOutcome: "feasibility" | "production" | null;
  sttBaseline: { wer: number; cer: number; rtf: number | null; kpi: string } | null;
  modelDecision: string | null;
  semanticThresholdReason: string | null;
  evaluationSamples: number | null;
  employerName: string | null;
  implementedExtras: string[] | null;
  timeComparison: { before: string; after: string; method: string } | null;
  experimentLinks: { vibecoder?: string; davinci?: string } | null;
} = {
  markCloudPublic: true, // C1: 2026-09-25 사용자 확인
  markCloudInfrastructurePublic: false, // 인프라 정보는 비공개
  localLlmOutcome: "feasibility", // C2: 타당성 검토 후 인턴 종료
  sttBaseline: null, // C3
  modelDecision: "정확도 중심의 후보는 NeMo Conformer CTC, 실시간 입력을 다룰 후보는 Riva Streaming으로 구분했습니다. RTF 비교와 별개로 스트리밍 응답 지연은 추가 검증이 필요합니다.", // C4: 2026-09-25 제공 자료의 목적별 판단
  semanticThresholdReason: null, // C5
  evaluationSamples: 6000, // C6: 2026-09-25 제공 자료 · eval_clean / eval_other 각 3,000
  employerName: "삼화", // C7: 사용자 확인
  implementedExtras: null, // C8
  timeComparison: null, // C9
  experimentLinks: null, // C10
};
