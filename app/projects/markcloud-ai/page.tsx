import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../site";
import { CaseSection, MetricCard, FailureCard, ArchitectureFlow } from "../../case-study";
import { confirmations } from "../../content-confirmations";
import { sttModels, evaluationConditions, failures, localCriteria, outputFields } from "./content";

export default function MarkCloudCaseStudy() {
  if (confirmations.markCloudPublic !== true) notFound();
  const baseline = confirmations.sttBaseline;

  return (
    <main className="min-h-screen bg-gray-50 text-zinc-900">
      <SiteHeader active="work" title="MarkCloud AI" className="print:hidden" />
      <div className="mx-auto max-w-5xl px-5">
        <section className="pb-14 pt-12 md:pb-20 md:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Internship · MarkCloud</p>
          <h1 className="mt-2 max-w-4xl text-4xl font-bold leading-tight tracking-tight break-keep md:text-5xl">한국어 STT 모델 평가와<br className="hidden sm:block" /> 로컬 LLM 타당성 검토</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600 break-keep">음성인식 모델의 오류율·처리 속도·의미 보존을 비교하고, 긴 문서 요약을 로컬 LLM으로 옮길 수 있는지 검토했습니다.</p>
          <dl className="my-8 grid gap-4 border-y border-zinc-200 py-5 text-sm sm:grid-cols-3">
            <div><dt className="text-xs text-zinc-500">역할 · 기간</dt><dd className="mt-1 font-semibold">데이터/AI 인턴 · 2025.11 ~ 12</dd></div>
            <div><dt className="text-xs text-zinc-500">담당 업무</dt><dd className="mt-1 font-semibold break-keep">평가 파이프라인 · 모델 비교 · 후처리 정책 · 구조화 출력</dd></div>
            <div><dt className="text-xs text-zinc-500">결과 단계</dt><dd className="mt-1 font-semibold break-keep">STT 평가 수행 · 로컬 LLM 타당성 검토</dd></div>
          </dl>
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricCard value="4종" label="STT 모델 비교" description="WER · CER · RTF와 의미 보존을 함께 검토" />
            <MetricCard value={confirmations.evaluationSamples === null ? null : `약 ${confirmations.evaluationSamples.toLocaleString("ko-KR")}개`} label="평가 대상 음성 샘플" description="KsponSpeech eval_clean / eval_other" />
          </div>
        </section>

        <CaseSection id="evaluation" title="모델 이름보다, 같은 기준의 결과를 먼저">
          <p id="problem" className="scroll-mt-20">한국어 음성인식에 사용할 후보를 고르기 위해 같은 데이터셋과 평가 조건으로 정확도와 처리 시간을 비교했습니다.</p>
          <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
            <table className="w-full table-fixed text-left text-xs sm:text-sm">
              <caption className="mb-4 text-left font-semibold text-zinc-900">후보 모델 비교 <span className="block pt-1 text-xs font-normal text-zinc-600 sm:inline sm:pl-2">WER·CER·RTF 모두 낮을수록 좋음 · 비율 표기</span></caption>
              <thead>
                <tr className="border-b border-zinc-300 text-zinc-700">
                  <th scope="col" className="w-[43%] py-3 pr-2 font-medium">모델</th>
                  <th scope="col" className="py-3 text-right font-medium">WER</th>
                  <th scope="col" className="py-3 text-right font-medium">CER</th>
                  <th scope="col" className="py-3 text-right font-medium">RTF</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {sttModels.map(model => (
                  <tr key={model.name} className="border-b border-zinc-100 last:border-0">
                    <th scope="row" className="py-4 pr-2 font-medium leading-5 text-zinc-900 break-words">{model.name}</th>
                    <td className="py-4 text-right">{model.wer.toFixed(4)}</td>
                    <td className="py-4 text-right">{model.cer.toFixed(4)}</td>
                    <td className="py-4 text-right">{model.rtf.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-6 text-zinc-500">실험 기록의 비교값입니다. 표의 eval_clean / eval_other 집계 범위는 미명시이며, 기존 운영 모델 대비 개선율이나 KPI 달성 여부를 뜻하지 않습니다.</p>
          {baseline && <p className="mt-3 text-xs leading-6 text-zinc-600">기존 모델 기준선: WER {baseline.wer} · CER {baseline.cer} · RTF {baseline.rtf ?? "미측정"} / KPI: {baseline.kpi}</p>}
          <dl className="mt-5 space-y-3">
            {evaluationConditions.map(item => <div key={item.label} className="grid gap-1 sm:grid-cols-[110px_1fr]"><dt className="font-medium text-zinc-900">{item.label}</dt><dd>{item.value}</dd></div>)}
          </dl>
          <div className="mt-6 border-l-2 border-blue-300 pl-5">
            <h3 className="text-lg font-semibold text-zinc-900">정확도와 실시간 입력을 나눠 판단했습니다.</h3>
            <p className="mt-2">이 비교표에서 NeMo는 WER·CER·RTF가 모두 가장 낮았습니다.</p>
            {confirmations.modelDecision && <p className="mt-2">{confirmations.modelDecision}</p>}
          </div>
        </CaseSection>

        <CaseSection id="semantic-evaluation" title="글자가 달라도, 의미는 같을 수 있었습니다.">
          <p>WER·CER만으로는 의미가 유지된 표현 차이와 핵심 의미가 바뀐 오류를 구분하기 어려웠습니다. KR-SBERT로 정답과 인식 결과의 의미 유사도를 계산하고, 반복 샘플링으로 평가의 안정성을 확인했습니다.</p>
          <p className="mt-3 font-medium text-zinc-900">문자 오류율을 대체하는 대신, 의미 보존을 함께 살피는 보조 평가를 추가했습니다.</p>
          {confirmations.semanticThresholdReason && <p className="mt-3 text-xs">{confirmations.semanticThresholdReason}</p>}
        </CaseSection>

        <CaseSection id="iteration" title="실패가 다음 실험의 기준이 됐습니다.">
          <div className="grid gap-4 md:grid-cols-3">{failures.map(item => <FailureCard key={item.problem} {...item} />)}</div>
        </CaseSection>

        <CaseSection id="local-llm" title="문서 요약도, 모델 교체보다 출력 검증이 먼저">
          <p>외부 GPT API 기반 요약에서 긴 문서의 타임아웃과 외부 의존 문제가 있었습니다. Qwen2.5-7B-Instruct로 요약 품질을 유지하면서 기존 시스템이 사용하는 JSON 구조를 만들 수 있는지 검토했습니다.</p>
          <div className="mt-5"><ArchitectureFlow label="검토한 처리 흐름" nodes={[
            { title: "문서 파싱", description: "긴 PDF의 텍스트 처리" },
            { title: "로컬 LLM", description: "요약·정보 추출" },
            { title: "출력 검증", description: "JSON 구조·내용 확인" },
            { title: "실패 대응 검토", description: "재시도·대체 처리 필요성" },
          ]} /></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {localCriteria.map(item => <div key={item.title}><h3 className="font-semibold text-zinc-900">{item.title}</h3><p className="mt-1">{item.description}</p></div>)}
          </div>
          <details className="mt-6 rounded-2xl border border-zinc-200 bg-white px-5">
            <summary className="cursor-pointer py-4 font-medium text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">구조화 출력 항목과 추가 검토 내용</summary>
            <div className="border-t border-zinc-100 pb-5 pt-4">
              <p>자유형 요약 대신 애플리케이션에서 사용할 JSON을 설계했습니다. 주요 출력 항목은 다음과 같습니다.</p>
              <dl className="mt-3 space-y-2">{outputFields.map(item => <div key={item.field} className="flex flex-wrap gap-x-3"><dt><code className="text-xs text-zinc-900">{item.field}</code></dt><dd>{item.description}</dd></div>)}</dl>
              <p className="mt-4">긴 문서에는 한 번에 생성하는 방식 외에도, 구간별 추출 후 통합하거나 두 단계로 요약하는 방식을 검토했습니다.</p>
            </div>
          </details>
          {confirmations.localLlmOutcome === "feasibility" && <p className="mt-6 border-l-2 border-blue-300 pl-4 font-medium text-zinc-800">타당성 검토까지 수행했으며, 인턴 기간 종료로 실제 전환·운영까지 진행하지 않았습니다.</p>}
        </CaseSection>
      </div>
      <SiteFooter />
    </main>
  );
}
