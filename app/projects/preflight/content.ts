export const roadmap = [
  { number: "02", title: "텍스트 요청 구조화", status: "계획", description: "회의록과 메신저로 들어오는 요청을 담당자·기한·품목이 정리된 할 일이나 의뢰서 초안으로 변환할 계획입니다." },
  { number: "03", title: "CT 결과 데이터 표준화", status: "계획", description: "NG 유형 코드와 재질·내용물·시험 조건을 정의해 결과를 구조화된 데이터로 기록합니다. 유사 이력 검색과 결과 예측의 전제 조건입니다." },
  { number: "04", title: "유사 제품 NG 이력 검색", status: "데이터 축적 후", description: "임베딩 기반 검색으로 재질과 내용물이 비슷한 과거 제품의 NG 사례를 찾아 CT 검토 전에 참고하도록 할 계획입니다." },
  { number: "05", title: "CT 결과 예측", status: "데이터 축적 후", description: "해석 가능한 모델로 NG 가능성이 높은 샘플의 검토 우선순위를 제시할 계획입니다." },
];

export const impacts = [
  { title: "팀 실사용", metric: "팀 전원", description: "조립 인원 제외" },
  { title: "주간 관리 파일", metric: "3종", description: "같은 기준일로 자동 생성" },
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
  { title: "클라우드 없이 서버 PC 한 대", description: "사내 서버 PC에서 데이터를 보관·운영하고, 설치·백업·복원을 PowerShell 스크립트로 정리했습니다." },
  { title: "원본 파일은 밖으로 보내지 않기", description: "엑셀 파일은 브라우저에서 파싱하고, 파싱한 값만 저장합니다." },
  { title: "파서가 못 읽는 ERP 파일", description: "ExcelJS·SheetJS가 모두 실패한 비표준 xlsx를 보정하는 정규화 모듈을 만들었습니다." },
  { title: "기존 관리 방식 유지", description: "셀 색상으로 적던 상태와 기존 엑셀 양식을 바꾸지 않고 그대로 읽습니다." },
];
