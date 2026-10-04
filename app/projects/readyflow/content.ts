export const cards = [
  { src: "/readyflow/card-intro.png", alt: "ReadyFlow 소개 카드: 우리 회사는 AI를 어디부터 적용해야 할까요?", caption: "SNS 카드뉴스 01 · 문제 제기" },
  { src: "/readyflow/card-method.png", alt: "ReadyFlow 진단 방식 카드: 관리자 인터뷰와 실제 요청 데이터를 대조", caption: "SNS 카드뉴스 03 · 진단 방식 (수치는 예시)" },
];

export const evidence = [
  {
    value: "70.4%",
    label: "AI 도입 로드맵이 없다고 답한 중소기업 근로자",
    description: "대기업 근로자는 54.4%",
    source: { name: "대한상공회의소 근로자 3,000명 조사", url: "https://www.dataeconomy.co.kr/news/articleView.html?idxno=42906" },
  },
  {
    value: "−3.8% → 0",
    label: "AI로 줄어든 업무시간과 생산 증가의 상관",
    description: "개별 작업은 빨라졌지만 업무 흐름과 조직은 그대로였습니다.",
    source: { name: "한국은행 BOK 이슈노트 제2026-12호", url: "https://www.bok.or.kr/portal/bbs/P0002353/view.do?nttId=10098322&oldMenuNo=201150&menuNo=200433&programType=newsData&depth=200433&relate=Y" },
  },
];

// 현장에서 흩어져 있는 것들
export const scatter = [
  { title: "요청", value: "메신저와 전화로" },
  { title: "데이터", value: "엑셀 여러 개에" },
  { title: "진행상황", value: "담당자 머릿속에" },
];

export const diagnosisFlow = [
  { title: "인터뷰", description: "관리자가 말하는 처리 기준" },
  { title: "실제 데이터", description: "요청 · 처리 기록 수집" },
  { title: "차이 분석", description: "말과 기록이 어긋나는 지점" },
  { title: "우선순위", description: "근거와 함께 개선 · 자동화 범위 제시" },
];

export const nextSteps = [
  { number: "01", title: "첫 진단 참여 현장과 함께 만들 팀원 모집", current: true },
  { number: "02", title: "제조기업 1곳에서 첫 진단 수행", current: false },
  { number: "03", title: "진단 결과를 개선 우선순위 리포트로 정리", current: false },
];
