export const flow = [
  { title: "아이디어", description: "\"○○를 만들고 싶어\"" },
  { title: "인터뷰", description: "빠진 정보 기준, 한 번에 한 질문" },
  { title: "MAP · GAP · PATH", description: "구조 · 빈틈 · 다음 행동 하나" },
  { title: "PRD · 에이전트 지침", description: "코딩 에이전트나 스펙 도구로" },
];

// examples/workout-tracker 의 실제 예시 출력
export const example = {
  idea: "세트와 무게만 빠르게 기록하는 운동 앱",
  map: [
    { from: "운동 기록", rel: "depends_on", to: "저장소", fromState: "KNOWN", toState: "DEPENDENCY" },
    { from: "친구 공유?", rel: "depends_on", to: "로그인?", fromState: "ASSUMPTION", toState: "UNKNOWN" },
    { from: "로그인?", rel: "introduces", to: "개인정보 · 계정 복구", fromState: "UNKNOWN", toState: "RISK" },
  ],
  gaps: [
    { type: "CONFLICT", statement: "'세트와 무게만' vs 로그인이 필요한 친구 공유", source: "2 · 3번 답변" },
    { type: "ASSUMPTION", statement: "친구들이 계속 기록할 것이다", source: "노드 · 친구 공유" },
    { type: "MISSING", statement: "v1 성공 기준이 없음", source: "slot · success_metric" },
  ],
  path: {
    next: "헬스장 친구 3명에게 1주일간 공유 시트로 기록 부탁하기",
    why: "가장 큰 불확실성: 계속 기록할까?",
    notYet: "로그인 · 기기 간 동기화 · 소셜 피드",
  },
};

export const principles = [
  { title: "결과보다 구조 먼저", description: "문제가 명확해지기 전에 답하지 않습니다." },
  { title: "모르는 것은 모른다고", description: "추측 대신 Unknown·Assumption으로 표시합니다." },
  { title: "다음 행동은 하나", description: "조언 스무 개가 아니라 지금 할 한 가지." },
  { title: "사람이 확정", description: "사용자가 확정한 내용은 모델이 덮어쓰지 않습니다." },
];

export const built = [
  { title: "Agent Skill", path: "skills/thinklayer/SKILL.md", description: "인터뷰 → MAP → GAP → PATH 지침" },
  { title: "Pack", path: "packs/vibe-coding/pack.yaml", description: "Slot · 질문 힌트 · Gap 규칙 · Export" },
  { title: "State Schema", path: "schemas/project-state.schema.json", description: "중단 후 이어가는 프로젝트 상태" },
];

export const stages = [
  { number: "0", title: "Concept", description: "Schema와 Vibe Coding Pack 문서화" },
  { number: "1", title: "Prototype", description: "아이디어 하나를 끝까지 처리" },
  { number: "2", title: "MVP", description: "로컬 상태 저장 · Export · 사용자 테스트 10~20명" },
  { number: "3", title: "Validation", description: "Gap 유용성과 범위 변화 측정" },
  { number: "4", title: "Release", description: "Pack 작성 가이드 · 외부 Pack" },
];
export const currentStage = "0";
