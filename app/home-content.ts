import { confirmations } from "./content-confirmations";

export const introduction = {
  name: "백경우",
  role: "Product Engineer · Applied AI",
  headline: ["현장에서 발견한 문제를,", "직접 만들고 운영하며 해결합니다."],
  description: "문제 정의부터 설계·개발·배포까지 한 흐름으로 맡고, AI는 실제 데이터로 검증한 곳에 적용합니다.",
  about: "회계·세무를 전공하며 복잡한 정보를 구조화하는 일에 관심을 갖게 되었고, 그 관심이 데이터 분석을 거쳐 실제로 쓰이는 도구를 만드는 일로 이어졌습니다.",
};

export const featuredProjects = [
  {
    id: "preflight", eyebrow: "Production · Internal Use", status: "운영 중", title: "Preflight",
    problem: "업무 현황이 ERP 엑셀·개별 파일·메신저에 흩어져, 지연을 확인하려면 파일부터 모아야 했습니다.",
    role: "기획·개발·운영 1인",
    result: "팀 전원이 실무에 사용 · 사내망 운영",
    href: "/projects/preflight", visible: true,
  },
  {
    id: "markcloud", eyebrow: "Internship", status: "인턴 프로젝트", title: "MarkCloud",
    problem: "고령 응답자 리서치를 AI로 전환하기 위해, 한국어 STT 후보를 같은 기준으로 골라야 했습니다.",
    role: "데이터/AI 인턴 · 평가 파이프라인",
    result: "STT 4종 비교 · 의미 기반 평가 추가",
    href: "/projects/markcloud", visible: confirmations.markCloudPublic === true,
  },
  {
    id: "deepvi", eyebrow: "Bootcamp", status: "완료", title: "DeepVi",
    problem: "일반 투자자가 재무제표와 뉴스를 스스로 해석하기 어렵습니다.",
    role: "기획·데이터 수집·백엔드/DB·LLM 주도 (팀 프로젝트)",
    result: "444개 기업 분석 · 시연과 사용자 테스트",
    href: "/projects/deepvi", visible: true,
  },
];

export const aiSteps = [
  { step: "01", title: "타당성부터", description: "자동화할 수 있는 범위와 위험 요소를 먼저 점검합니다.", example: "로컬 LLM 타당성 검토", href: confirmations.markCloudPublic === true ? "/projects/markcloud#local-llm" : null },
  { step: "02", title: "문서로 설계", description: "요구사항과 데이터 구조, 미확정 결정을 분리합니다.", example: "Preflight 요구사항과 도입 조건", href: "/projects/preflight#problem" },
  { step: "03", title: "골격 먼저", description: "큰 구조를 세우고 기능 단위로 확장합니다.", example: "Preflight 저장 구조 변경", href: "/projects/preflight#storage-decision" },
  { step: "04", title: "실데이터로 검증", description: "AI 결과는 실제 데이터 대조와 테스트로 확인한 뒤 사용합니다.", example: "Preflight 중복 판정 반례", href: "/projects/preflight#dedup-decision" },
];

export const responsibilities = [
  { title: "직접 결정", items: ["문제 정의", "데이터·업무 규칙", "평가 지표", "최종 검증"] },
  { title: "AI 활용", items: ["대안 탐색", "코드 생성·리팩터링", "테스트 케이스 초안", "문서화"] },
];

export const experience = [
  {
    id: "manufacturing", company: confirmations.employerName, title: "R&D본부 Pre-Production팀 · 사원",
    period: "2026.06 ~ 재직 중 · 화장품 용기 제조",
    items: ["시사출 샘플의 CT 테스트·검토, 금형 이동 관리와 생산 계획 수립", "반복 집계와 관리 문서 작성을 자동화한 Preflight를 1인 기획·개발·운영"],
    visible: true,
  },
  {
    id: "markcloud", company: "마크클라우드", title: "데이터/AI 인턴",
    period: "2025.11 ~ 2025.12",
    items: ["STT 모델 비교와 의미 기반 평가 보완", "외부 LLM API의 처리 한계를 분석하고 로컬 전환 타당성 검토", "CSV 기반 데이터 처리와 LLM 코멘트를 연결한 보고서 생성 프로세스 구현"],
    visible: confirmations.markCloudPublic === true,
  },
  {
    id: "bootcamp", company: null, title: "내일배움캠프 데이터분석가과정",
    period: "2025.02 ~ 2025.07", items: ["Python·SQL 기반 수집·정제·분석·시각화, 머신러닝 모델 비교와 서비스 구현"], visible: true,
  },
  {
    id: "navy", company: null, title: "해군부사관",
    period: "2015.06 ~ 2019.08", items: ["다중 센서 정보 해석과 시스템 운용", "오류 코드·출력 패턴 기반 원인 추적과 설정·복구 조치"], visible: true,
  },
];

export const skills = [
  { title: "AI Engineering", items: confirmations.markCloudPublic === true ? ["LLM Integration", "RAG", "Structured Output", "STT", "Model Evaluation"] : ["LLM Integration", "RAG"], evidence: "DeepVi · MarkCloud", href: confirmations.markCloudPublic === true ? "/projects/markcloud#evaluation" : "/projects/deepvi#architecture" },
  { title: "Models & Frameworks", items: confirmations.markCloudPublic === true ? ["OpenAI", "Qwen", "Whisper", "NeMo", "NVIDIA Riva", "vLLM", "LangChain", "Sentence Transformers"] : ["OpenAI", "LangChain"], evidence: "DeepVi · MarkCloud", href: confirmations.markCloudPublic === true ? "/projects/markcloud#evaluation" : "/projects/deepvi#architecture" },
  { title: "Data", items: ["Python", "SQL", "PostgreSQL", "Pandas"], evidence: "DeepVi · Preflight", href: "/projects/preflight#storage-decision" },
  { title: "Product Engineering", items: ["Next.js", "TypeScript", "FastAPI", "Vitest", "Docker"], evidence: "Preflight · DeepVi", href: "/projects/preflight#technical-details" },
];

export const currentlyBuilding = [
  { title: "Preflight 이력 관리 확장", description: "금형 · 시사출 회차 · 사출조건 · 평가 결과를 연결해 변경과 결과를 추적하는 구조로 확장 구상", status: "확장 검토", href: "/projects/preflight#ai-roadmap" },
  { title: "ReadyFlow", description: "AI 도입 전, 흩어진 업무부터 진단하는 제조 중소기업 대상 창업 아이템. Preflight 경험을 다른 현장으로 넓히는 시도", status: "검증 준비", href: "/projects/readyflow" },
  { title: "ThinkLayer", description: "만들기 전에 아이디어의 구조 · 빈틈 · 다음 행동 하나를 보여주는 코딩 에이전트용 스킬", status: "구상 단계", href: "/projects/thinklayer" },
];

// 대회 참가 경험. 과제 내용은 대회 규정상 비공개라 형식과 결과만 적습니다.
export const activities = [
  {
    title: "SK하이닉스 AI 해커톤 2026",
    kind: "대외활동 · AI 문제 해결 챌린지",
    result: ["1차 예선 통과", "2차 예선 참가", "본선 미진출"],
    description: "SK하이닉스 사내 문제 예제를 제한 시간 안에 AI로 해결하는 형식의 해커톤입니다. 과제 내용은 대회 규정상 공개하지 않습니다.",
    learned: "해결 방식을 고른 근거를 설명하고, 결과를 검증하는 힘을 더 길러야 한다는 점을 배웠습니다.",
  },
];
