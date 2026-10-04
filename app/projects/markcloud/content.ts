// 2026-09-25 사용자 제공 실험 기록. 인프라 정보는 공개 데이터에 포함하지 않습니다.
// 기존 운영 모델의 기준선/KPI와 표의 분할별 집계 방식은 아직 확인되지 않았습니다.
export const sttModels = [
  { name: "Faster-Whisper Medium", wer: 0.5001, cer: 0.2937, rtf: 0.2493 },
  { name: "NVIDIA Riva Streaming v2", wer: 0.3116, cer: 0.1515, rtf: 0.0566 },
  { name: "Whisper-small-ko Fine-tuned", wer: 0.239, cer: 0.1246, rtf: 0.0623 },
  { name: "NeMo Conformer CTC", wer: 0.226, cer: 0.114, rtf: 0.0216 },
];

export const evaluationConditions = [
  { label: "평가 대상", value: "KsponSpeech eval_clean 3,000개 · eval_other 3,000개" },
  { label: "정답 전처리", value: "특수 태그·불필요한 구두점 제거, 텍스트 정규화와 표기 오류 정제" },
  { label: "지표", value: "WER: 단어 오류율 · CER: 문자 오류율 · RTF: 음성 길이 대비 처리 시간" },
];

export const failures = [
  {
    problem: "빠른 모델도 인식 품질이 먼저였습니다.",
    action: "Faster-Whisper Turbo의 한국어 인식이 기대에 미치지 못했습니다.",
    result: "추가 최적화 비용을 고려해 비교 후보에서 제외했습니다.",
  },
  {
    problem: "일부 음성의 출력이 중간에 끊겼습니다.",
    action: "Riva Offline 평가에서 출력 cutoff를 확인했습니다.",
    result: "Streaming 방식으로 평가 파이프라인을 변경했습니다.",
  },
  {
    problem: "LLM이 고친 문장에서 의미가 달라졌습니다.",
    action: "STT 후처리의 과도한 교정이 원문의 말투와 의미를 바꾸는 경우가 있었습니다.",
    result: "문체와 의미를 유지하고 필요한 부분만 수정하도록 후처리 정책을 제한했습니다.",
  },
];

export const localCriteria = [
  { title: "출력 구조", description: "정해진 JSON 스키마를 유지하는가" },
  { title: "요약 품질", description: "원문의 판단 근거를 놓치지 않는가" },
  { title: "처리 시간", description: "긴 문서를 현실적인 시간 안에 처리하는가" },
  { title: "실패 대응", description: "누락·스키마 오류 시 재시도나 대체 처리가 필요한가" },
];

export const outputFields = [
  { field: "refusal_law", description: "거절 근거 법령" },
  { field: "reject_reason_summary", description: "거절 이유 요약" },
  { field: "citation_evidence[]", description: "인용 근거" },
  { field: "final_summary", description: "최종 요약" },
];

// 2026-09-25 사용자 제공 의미 평가 결과
export const semanticResults = [
  {
    metric: "Semantic Similarity",
    direction: "높을수록 좋음",
    caption: "정답 문장과 인식 결과의 의미 유사도",
    values: [
      { model: "Whisper", value: "0.917" },
      { model: "NeMo", value: "0.934", better: true },
    ],
  },
  {
    metric: "SemWER @ 0.85",
    direction: "낮을수록 좋음",
    caption: "의미 유사도 0.85 기준으로 집계한 의미 오류율",
    values: [
      { model: "Whisper", value: "0.0776" },
      { model: "NeMo", value: "0.0664", better: true },
    ],
  },
];
