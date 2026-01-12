'use client'

import React, { useState } from 'react';
import { Play, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const DeepViPortfolio = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImage, setCurrentImage] = useState(0);

  // 스크린샷 데이터 (실제로는 여기에 이미지 URL을 넣으세요)
  const screenshots = [
    { id: 1, title: 'AI 분석 결과 화면', desc: '기업 재무 데이터를 자연어로 해석한 결과' },
    { id: 2, title: '재무 건전성 대시보드', desc: '수익성, 성장성, 안정성 지표 시각화' },
    { id: 3, title: '투자 유형 분류', desc: '5가지 유형별 기업 분류 및 설명' }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 바 */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">DeepVi</h1>
          <div className="flex gap-2">
            <Link href="/" className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100">
              v1
            </Link>
            <Link href="/v2" className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100">
              v2
            </Link>
            <Link href="/v3" className="px-3 py-2 rounded-lg text-sm bg-indigo-100 text-indigo-600 font-semibold">
              v3
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center px-6">
        <div className="max-w-6xl w-full text-center">
          <h1 className="text-7xl md:text-9xl font-bold mb-8">DeepVi</h1>
          <p className="text-2xl md:text-3xl mb-6 opacity-90">
            "데이터를 넘어 기업의 본질을 설명합니다"
          </p>
          <p className="text-xl opacity-80 max-w-3xl mx-auto mb-12">
            재무제표를 AI가 해석하여 투자자가<br />
            스스로 판단할 수 있도록 돕는 기업 분석 서비스
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <span className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
              📅 2026.01 - 진행중
            </span>
            <span className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
              👤 Full-stack Developer
            </span>
            <span className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
              🔗 GitHub · Demo
            </span>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-gray-500 mb-4">001 / OVERVIEW</div>
          <h2 className="text-5xl md:text-6xl font-bold mb-12">프로젝트 개요</h2>
          <p className="text-xl leading-relaxed max-w-4xl">
            DeepVi는 복잡한 재무제표와 시장 지표를 AI가 해석하여, 
            <strong> "이 기업을 사야 할까?" </strong> 대신 
            <strong> "이 기업은 어떤 기업인가?" </strong>에 답하는 
            LLM 기반 기업 분석 서비스입니다.
          </p>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-gray-400 mb-4">002 / CHALLENGE</div>
          <h2 className="text-5xl md:text-6xl font-bold mb-12">문제와 해결</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-10 rounded-2xl hover:-translate-y-2 transition-transform">
              <h3 className="text-3xl font-bold mb-6">🔴 Problem</h3>
              <ul className="space-y-4">
                <li className="pl-6 relative before:content-['→'] before:absolute before:left-0">
                  <strong>해석의 장벽</strong><br />
                  <span className="text-red-100">재무제표는 전문가 없이 이해하기 어려움</span>
                </li>
                <li className="pl-6 relative before:content-['→'] before:absolute before:left-0">
                  <strong>불친절한 정보</strong><br />
                  <span className="text-red-100">"그래서 왜 좋은가?"에 답하지 못함</span>
                </li>
                <li className="pl-6 relative before:content-['→'] before:absolute before:left-0">
                  <strong>잘못된 판단</strong><br />
                  <span className="text-red-100">'감'이나 '소문'에 의존하는 투자</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-10 rounded-2xl hover:-translate-y-2 transition-transform">
              <h3 className="text-3xl font-bold mb-6">🔵 Solution</h3>
              <ul className="space-y-4">
                <li className="pl-6 relative before:content-['→'] before:absolute before:left-0">
                  <strong>데이터 해석</strong><br />
                  <span className="text-blue-100">재무적 성격과 리스크를 자연어로 설명</span>
                </li>
                <li className="pl-6 relative before:content-['→'] before:absolute before:left-0">
                  <strong>자립적 투자</strong><br />
                  <span className="text-blue-100">스스로 판단할 수 있는 근거 제공</span>
                </li>
                <li className="pl-6 relative before:content-['→'] before:absolute before:left-0">
                  <strong>맥락 분석</strong><br />
                  <span className="text-blue-100">뉴스·주가 흐름과 결합한 시장 맥락</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-gray-500 mb-4">003 / DEMO</div>
          <h2 className="text-5xl md:text-6xl font-bold mb-12">데모 영상</h2>
          
          {/* MP4 자동재생 비디오 */}
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mb-8">
            <video 
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/videos/demo.mp4" type="video/mp4" />
              브라우저가 비디오를 지원하지 않습니다.
            </video>
          </div>
          
          <p className="text-center text-gray-600 mb-8">
            💡 실제 DeepVi 서비스 작동 화면입니다
          </p>

          {/* 스크린샷 슬라이더 */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold mb-8">주요 화면</h3>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-6xl mb-4">📊</div>
                  <h4 className="text-2xl font-bold mb-2">{screenshots[currentImage].title}</h4>
                  <p className="opacity-90">{screenshots[currentImage].desc}</p>
                  <p className="text-sm opacity-75 mt-4">실제 스크린샷을 여기에 삽입하세요</p>
                </div>
              </div>
              
              {/* 슬라이더 컨트롤 */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* 인디케이터 */}
              <div className="flex justify-center gap-2 mt-6">
                {screenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-3 h-3 rounded-full transition ${
                      idx === currentImage ? 'bg-indigo-600 w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features with Tabs */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-gray-500 mb-4">004 / FEATURES</div>
          <h2 className="text-5xl md:text-6xl font-bold mb-12">주요 기능</h2>
          
          {/* 탭 네비게이션 */}
          <div className="flex gap-4 mb-8 overflow-x-auto">
            {['overview', 'analysis', 'evaluation', 'classification'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab === 'overview' && '전체 개요'}
                {tab === 'analysis' && 'AI 분석'}
                {tab === 'evaluation' && '재무 평가'}
                {tab === 'classification' && '유형 분류'}
              </button>
            ))}
          </div>

          {/* 탭 콘텐츠 */}
          <div className="bg-white p-10 rounded-2xl shadow-lg">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-2xl font-bold mb-3">AI 분석 코멘트</h3>
                  <p className="text-gray-600">재무제표를 기반으로 기업의 재무 구조, 성장성, 안정성을 자연어로 해석</p>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold mb-3">재무 건전성 평가</h3>
                  <p className="text-gray-600">수익성·성장성·안정성·현금흐름 지표를 종합하여 구조적으로 평가</p>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">🏷️</div>
                  <h3 className="text-2xl font-bold mb-3">투자 유형 분류</h3>
                  <p className="text-gray-600">재무적 특성에 따라 성장/중립/가치/우량/유보로 분류하고 리스크 설명</p>
                </div>
              </div>
            )}
            
            {activeTab === 'analysis' && (
              <div>
                <h3 className="text-3xl font-bold mb-6">🤖 AI 분석 코멘트</h3>
                <p className="text-lg text-gray-700 mb-6">
                  LLM을 활용하여 복잡한 재무 데이터를 쉬운 자연어로 변환합니다.
                </p>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl">
                  <h4 className="font-bold text-lg mb-4">주요 기능:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">✓</span>
                      <span>재무제표 자동 분석 및 해석</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">✓</span>
                      <span>기업의 강점과 약점 자연어 설명</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">✓</span>
                      <span>산업 평균 대비 위치 분석</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'evaluation' && (
              <div>
                <h3 className="text-3xl font-bold mb-6">📊 재무 건전성 평가</h3>
                <p className="text-lg text-gray-700 mb-6">
                  4가지 핵심 지표를 통한 구조적 평가 시스템
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-2">수익성</h4>
                    <p className="text-gray-700">ROE, ROA, 영업이익률 등</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-2">성장성</h4>
                    <p className="text-gray-700">매출성장률, 순이익 증가율</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-2">안정성</h4>
                    <p className="text-gray-700">부채비율, 유동비율, 이자보상배율</p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-2">현금흐름</h4>
                    <p className="text-gray-700">영업CF, 투자CF, 재무CF</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'classification' && (
              <div>
                <h3 className="text-3xl font-bold mb-6">🏷️ 투자 유형 분류</h3>
                <p className="text-lg text-gray-700 mb-6">
                  재무적 특성에 따라 5가지 유형으로 자동 분류
                </p>
                <div className="space-y-4">
                  {['성장형', '중립형', '가치형', '우량형', '유보형'].map((type, idx) => (
                    <div key={idx} className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition">
                      <h4 className="font-bold text-lg">{type}</h4>
                      <p className="text-gray-600 mt-1">
                        {type === '성장형' && '높은 성장성, 공격적 투자 전략'}
                        {type === '중립형' && '균형잡힌 재무구조'}
                        {type === '가치형' && '낮은 밸류에이션, 안정적 수익'}
                        {type === '우량형' && '모든 지표 우수'}
                        {type === '유보형' && '신중한 접근 필요'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-gray-500 mb-4">005 / TECH STACK</div>
          <h2 className="text-5xl md:text-6xl font-bold mb-12">기술 스택</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-8 rounded-xl border-t-4 border-indigo-500">
              <h4 className="text-xl font-bold mb-4">🧠 AI/LLM</h4>
              <ul className="space-y-2 text-gray-700">
                <li>→ OpenAI API</li>
                <li>→ Gemini API</li>
                <li>→ RAG 기반 설계</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border-t-4 border-blue-500">
              <h4 className="text-xl font-bold mb-4">⚙️ Backend</h4>
              <ul className="space-y-2 text-gray-700">
                <li>→ Python</li>
                <li>→ FastAPI</li>
                <li>→ PostgreSQL</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border-t-4 border-green-500">
              <h4 className="text-xl font-bold mb-4">📊 Data</h4>
              <ul className="space-y-2 text-gray-700">
                <li>→ Pandas</li>
                <li>→ NumPy</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border-t-4 border-purple-500">
              <h4 className="text-xl font-bold mb-4">📈 Visualization</h4>
              <ul className="space-y-2 text-gray-700">
                <li>→ Matplotlib</li>
                <li>→ Plotly</li>
                <li>→ Streamlit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-gray-500 mb-4">006 / IMPACT</div>
          <h2 className="text-5xl md:text-6xl font-bold mb-12">주요 성과</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '✅',
                title: '투자 유형 분류',
                desc: '재무 데이터만으로 투자유형 분류 및 시장 구조 설명 가능성 검증'
              },
              {
                icon: '✅',
                title: '성과 원인 구조화',
                desc: '검증된 투자 유형 교차 분석을 통한 성과 원인 구조화'
              },
              {
                icon: '✅',
                title: '설명 가능한 AI',
                desc: '단순 추천이 아닌 설명 가능한 AI 분석 시스템 구현'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-lg text-center hover:-translate-y-2 transition-transform">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">프로젝트 더 알아보기</h2>
          <p className="text-xl opacity-90 mb-10">
            상세한 구현 내용과 데모를 확인해보세요
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="#" 
              className="flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:-translate-y-1 transition shadow-lg"
            >
              <Github className="w-5 h-5" />
              GitHub 보기
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold hover:-translate-y-1 transition"
            >
              <ExternalLink className="w-5 h-5" />
              라이브 데모
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeepViPortfolio;
