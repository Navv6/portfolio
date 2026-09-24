import { confirmations } from "./content-confirmations";

export const introduction = {
  name: "백경우",
  role: "AI Application Engineer",
  headline: ["현장에서 발견한 문제를,", "직접 만들고 운영하는 것으로 해결합니다."],
  description: "문제를 데이터로 구조화하고, 적합한 AI를 선택·검증해 실제 사용되는 시스템으로 구현합니다.",
  about: "회계·세무를 전공하며 복잡한 정보를 구조화하는 일에 관심을 갖게 되었습니다. 데이터 분석을 거쳐, 분석 결과를 실제로 쓰이는 도구로 만드는 일로 이어졌습니다.",
};

export const featuredProjects = [
  {
    id: "preflight", eyebrow: "Production · Internal Use", title: "Preflight",
    description: "샘플조달·시사출·CT 테스트 업무의 지연과 조달 현황을 한 화면에서 관리하는 Pre-Production R&D 워크스페이스",
    shows: "Productization", metric: "사내망 전용", metricLabel: "실사용",
    href: "/projects/preflight", visible: true,
  },
  {
    id: "markcloud-ai", eyebrow: "Internship", title: "MarkCloud AI",
    description: "음성인식 모델을 비교·평가하고, 외부 LLM의 로컬 전환 타당성을 검토한 인턴 프로젝트",
    shows: "Model Evaluation", metric: "4종", metricLabel: "STT 모델 비교 · 의미 기반 평가 추가",
    href: "/projects/markcloud-ai", visible: confirmations.markCloudPublic === true,
  },
  {
    id: "deepvi", eyebrow: "Bootcamp", title: "DeepVi",
    description: "기업 데이터를 수집하고 LLM·RAG로 연결해 기업 분석과 질의응답을 제공한 서비스",
    shows: "AI Application · LLM + RAG", metric: "444개", metricLabel: "분석 대상 KOSPI·KOSDAQ 기업",
    href: "/projects/deepvi", visible: true,
  },
];

export const aiSteps = [
  { step: "01", title: "타당성부터", description: "자동화할 수 있는 범위와 위험 요소를 먼저 점검합니다.", example: "로컬 LLM 타당성 검토", href: confirmations.markCloudPublic === true ? "/projects/markcloud-ai#local-llm" : null },
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
    period: "2015.06 ~ 2019.08", items: ["다중 센서 정보를 해석하고 시스템을 운용했습니다.", "오류 코드와 출력 패턴으로 원인을 추적하고 설정·복구 조치를 수행했습니다."], visible: true,
  },
];

export const skills = [
  { title: "AI Engineering", items: confirmations.markCloudPublic === true ? ["LLM Integration", "RAG", "Structured Output", "STT", "Model Evaluation"] : ["LLM Integration", "RAG"], evidence: "DeepVi · MarkCloud", href: confirmations.markCloudPublic === true ? "/projects/markcloud-ai#evaluation" : "/projects/deepvi#architecture" },
  { title: "Models & Frameworks", items: confirmations.markCloudPublic === true ? ["OpenAI", "Qwen", "Whisper", "NeMo", "NVIDIA Riva", "vLLM", "LangChain", "Sentence Transformers"] : ["OpenAI", "LangChain"], evidence: "DeepVi · MarkCloud", href: confirmations.markCloudPublic === true ? "/projects/markcloud-ai#evaluation" : "/projects/deepvi#architecture" },
  { title: "Data", items: ["Python", "SQL", "PostgreSQL", "Pandas"], evidence: "DeepVi · Preflight", href: "/projects/preflight#storage-decision" },
  { title: "Product Engineering", items: ["Next.js", "TypeScript", "FastAPI", "Vitest", "Docker"], evidence: "Preflight · DeepVi", href: "/projects/preflight#technical-details" },
];

export const currentlyBuilding = [
  { title: "Preflight AI 확장", description: "안료 입고 사진 추출부터 시작해, CT 데이터 축적 후 검색과 예측으로 확장하는 계획", status: "설계 중", href: "/projects/preflight#ai-roadmap" },
  { title: "VibeCoder", description: "AI 워크플로우 커뮤니티 실험", status: null, href: confirmations.experimentLinks?.vibecoder ?? "/personal#vibecoder" },
  { title: "DaVinci Note", description: "생각을 확장하는 노트 실험", status: null, href: confirmations.experimentLinks?.davinci ?? "/personal#davinci" },
];
