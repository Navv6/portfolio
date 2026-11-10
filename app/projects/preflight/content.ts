// From Workflow Tracking to Manufacturing Traceability. Phase 1만 운영 중이고 나머지는 확장 구상입니다.
export const phases: { phase: string; title: string; status: string; live: boolean; items: { title: string; status?: string; description?: string }[] }[] = [
  {
    phase: "Phase 1", title: "엑셀 연동 · 시사출 업무 · KPI 관리", status: "운영 중", live: true,
    items: [
      { title: "현재 워크스페이스", description: "ERP 엑셀 업로드, 현황 · KPI · 주간 관리 파일, 샘플 요청 · 승인" },
      { title: "안료 입고 사진을 의뢰서와 연결", status: "설계 중", description: "AI로 안료 코드 · 색상명 · LOT · 수량을 읽고, 규칙으로 대조한 뒤 담당자가 확정" },
      { title: "텍스트 요청 구조화", status: "계획", description: "회의록 · 메신저 요청을 담당자 · 기한 · 품목이 정리된 할 일 초안으로 변환" },
    ],
  },
  {
    phase: "Phase 2", title: "제품 · 금형 · 시사출 회차 · 사출조건 이력", status: "확장 검토", live: false,
    items: [
      { title: "이력 엔터티 설계", description: "product · mold · mold_revision · trial_run · process_condition · sample · evaluation_result" },
      { title: "입력 · 변경 이력 화면", description: "사출설비, 원재료 Lot, 온도, 보압, 냉각시간, 변경 사유" },
    ],
  },
  {
    phase: "Phase 3", title: "변경 전후 비교 · 평가 결과 연결", status: "계획", live: false,
    items: [
      { title: "CT 결과 데이터 표준화", description: "NG 유형 코드와 재질 · 내용물 · 시험 조건을 구조화된 데이터로 기록" },
      { title: "변경 전후 비교와 평가 증빙 연결", description: "개발 단계별 평가 결과를 금형 · 조건 변경 이력과 연결" },
    ],
  },
  {
    phase: "Phase 4", title: "유사 불량 검색 · 검토 우선순위 보조", status: "장기 구상", live: false,
    items: [
      { title: "유사 제품 NG 이력 검색", description: "재질 · 내용물이 비슷한 과거 제품의 NG 사례를 CT 검토 전에 참고" },
      { title: "CT 결과 예측", description: "해석 가능한 모델로 NG 가능성이 높은 샘플의 검토 순서 제시" },
    ],
  },
];

export const traceabilityFlow = [
  { title: "제품 · 금형" },
  { title: "금형 Revision" },
  { title: "시사출 회차" },
  { title: "사출조건 · 샘플" },
  { title: "측정 · 평가 결과" },
];

export const traceabilityConsiderations = ["설정값과 실제 계측값 분리", "이전 버전 보존", "입력자 · 변경자 기록"];

export const validation = [
  { title: "개발 · 운영 서버 분리", body: "개발 서버와 운영 서버를 나눠 운영합니다. 팀이 쓰는 운영 환경에 영향을 주지 않고 개발 서버에서 변경 사항을 만들고 확인합니다." },
  { title: "업무 규칙", body: "의뢰 1건과 여러 공정 라인을 분리해 관리합니다. 지연 기준과 관리 단위는 설정으로 분리하고, 잠정값은 화면에도 표시합니다." },
  { title: "권한 · 데이터 저장", body: "로그인과 3단계 권한, PostgreSQL 기반 데이터 저장을 구현했습니다." },
];


// 도입 전후로 일하는 방식이 달라진 점 (정성 비교, 수치 측정 전)
export const changes = [
  { before: "담당자마다 실적을 각자 입력하고, 자료를 모아 보고서를 따로 만들어야 했습니다.", after: "공통 브라우저 화면 하나에서 팀 전체 현황을 바로 파악합니다." },
  { before: "담당자와 미팅을 잡아 진행 상황을 확인하고, 다음 계획까지 확정받았습니다.", after: "모두 같은 화면을 보기 때문에, 현황 확인과 계획 확정을 위한 미팅 단계를 건너뜁니다." },
];

// 초기 구축 기간의 작업 기록 (예전 '끄적임' 페이지의 진행 로그)
export const timeline = [
  { date: "08.12", text: "ERP 엑셀 파싱·저장 파이프라인 구축, 실제 파일 수치 대조" },
  { date: "08.13", text: "현업 피드백 반영 — 메인/KPI 화면 분리, 팀원별 담당자 지정" },
  { date: "08.15", text: "로그인·계정 관리 추가, 전 모듈 PostgreSQL 이전" },
  { date: "08.16", text: "엑셀 업로드를 전체 교체에서 누적 병합으로 전환 · 팀 게시판 · DB 백업 스크립트" },
  { date: "이후", text: "개발부 T0~T4 테스트 관리 확장 요청 · 사내 IT 관리 체계 편입 논의" },
];

// 현장에서 지켜야 했던 도입 조건
export const constraints = [
  { title: "클라우드 없이 사내 서버로", description: "사내 서버에서 데이터를 보관·운영하고, 설치·백업·복원을 PowerShell 스크립트로 정리했습니다." },
  { title: "원본 파일은 밖으로 보내지 않기", description: "엑셀 파일은 브라우저에서 파싱하고, 파싱한 값만 저장합니다." },
  { title: "파서가 못 읽는 ERP 파일", description: "ExcelJS·SheetJS가 모두 실패한 비표준 xlsx를 보정하는 정규화 모듈을 만들었습니다." },
  { title: "기존 관리 방식 유지", description: "셀 색상으로 적던 상태와 기존 엑셀 양식을 바꾸지 않고 그대로 읽습니다." },
];
