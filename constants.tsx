
import React from 'react';
import { 
  ClipboardCheck, 
  MapPin, 
  Wrench, 
  GraduationCap, 
  LayoutDashboard, 
  Search, 
  Home,
  Trophy
} from 'lucide-react';
import { StepProps, FAQItem, PricingItem } from './types';

export const GROWTH_DATA = [
  { year: '2021', count: 5 },
  { year: '2022 상반기', count: 22 },
  { year: '2022 하반기', count: 45 },
  { year: '2023 상반기', count: 78 },
  { year: '2023 하반기', count: 112 },
  { year: '2024 (진행중)', count: 148 },
];

export const PRICING_LIST: PricingItem[] = [
  { category: '기본', item: '베카 스마트 키오스크 시스템', description: '배팅 예약, 결제 및 멤버십 연동 시스템', price: '15,000,000' },
  { category: '기본', item: 'AI 스윙 분석 솔루션', description: '고성능 카메라 및 데이터 분석 서버 (베카 전용)', price: '22,000,000' },
  { category: '선택', item: '프로급 피칭 머신', description: '3휠 구속 조절 시스템 (레인당 단가)', price: '12,500,000' },
  { category: '필수', item: '고밀도 인조잔디 시공', description: '충격 흡수 패드 및 전문 스포츠 잔디', price: '8,000,000' },
  { category: '필수', item: '안전 그물망 및 휀스', description: '특수 강화 나일론망 및 충격 방지 프레임', price: '7,500,000' },
  { category: '필수', item: '인테리어 & 조명', description: '스테이션형 디자인 및 고광량 LED 조명', price: '45,000,000' },
  { category: '필수', item: '설계 및 집기 디자인', description: '전문 야구장 규격 설계 및 락커룸 디자인', price: '6,000,000' },
  { category: '필수', item: '운영 교육 및 오픈지원', description: '무인 운영 노하우 및 마케팅 지원', price: '2,000,000' },
  { category: '선택', item: '브랜드 로열티', description: '매출 기반 관리 수수료', price: '0 (오픈 1년간 면제)' },
  { category: '필수', item: '가맹 가입비', description: '독점 상권 보호 및 가맹 유지', price: '10,000,000' },
];

export const STEPS: StepProps[] = [
  { number: '01', title: '창업 상담', description: '베카24 야구 창업 전문가의 상권 적합성 진단', icon: <Search className="w-8 h-8 text-primary" /> },
  { number: '02', title: '입지 분석', description: '높은 층고와 기둥 없는 최적의 야구 시설 입지 조사', icon: <MapPin className="w-8 h-8 text-primary" /> },
  { number: '03', title: '레이아웃 설계', description: '투구 거리 및 안전 반경을 고려한 최적 동선 설계', icon: <LayoutDashboard className="w-8 h-8 text-primary" /> },
  { number: '04', title: '계약 체결', description: '시스템 도입 및 가맹 계약 공식 진행', icon: <ClipboardCheck className="w-8 h-8 text-primary" /> },
  { number: '05', title: '시설 공사', description: '피칭 머신 설치, 잔디 시공 및 센서 정밀 셋팅', icon: <Wrench className="w-8 h-8 text-primary" /> },
  { number: '06', title: '시스템 교육', description: '무인 관리 솔루션 및 고객 서비스 교육', icon: <GraduationCap className="w-8 h-8 text-primary" /> },
  { number: '07', title: '그랜드 오픈', description: '지역 야구 커뮤니티 연계 마케팅 및 오픈', icon: <Trophy className="w-8 h-8 text-primary" /> },
];

export const FAQ_LIST: FAQItem[] = [
  {
    question: "야구 관련 경험이나 매장 운영 경험이 없어도 창업이 가능한가요?",
    answer: "네, 가능합니다. 야구 전문 지식이나 매장 운영 경험이 없어도 운영할 수 있도록 무인 시스템과 표준화된 운영 구조로 설계되었습니다. 본사에서 초기 세팅과 운영 가이드를 제공합니다."
  },
  {
    question: "상주 직원 없이도 매장 운영이 정말 가능한가요?",
    answer: "가능합니다. 자동 결제, 무인 출입, 원격 관리 시스템을 통해 상주 인력 없이 운영이 가능합니다. 점주는 매장 상황을 비대면으로 확인하고 관리할 수 있습니다."
  },
  {
    question: "하루에 매장을 직접 관리해야 하는 시간은 어느 정도인가요?",
    answer: "매장 상황에 따라 다르지만, 평균적으로는 짧은 관리 시간만으로도 운영이 가능합니다. 현장 방문은 주로 정기 점검이나 소모품 관리 수준으로 이루어집니다."
  },
  {
    question: "창업 후 매출 구조는 어떻게 구성되나요?",
    answer: "야구 체험 콘텐츠 이용료와 음료·부가 상품 판매를 통한 복합 매출 구조를 가지고 있어, 단일 수익원 대비 안정적인 운영이 가능합니다."
  },
  {
    question: "초기 창업 준비부터 오픈까지 얼마나 걸리나요?",
    answer: "점포 계약 후 인테리어 및 시스템 설치를 포함해 평균적으로 비교적 빠른 기간 내 오픈이 가능합니다. 자세한 일정은 상권과 매장 규모에 따라 달라질 수 있습니다."
  },
  {
    question: "매장 운영 중 문제가 발생하면 어떻게 대응하나요?",
    answer: "원격 지원 시스템을 통해 운영 중 발생할 수 있는 문제에 대해 본사에서 대응을 지원합니다. 무인 운영에 대한 불안 요소를 최소화하는 구조입니다."
  },
  {
    question: "상권이나 입지 선정은 어떻게 도와주나요?",
    answer: "업종 특성에 맞는 상권 분석과 입지 컨설팅을 통해 점주의 창업 리스크를 줄이는 방향으로 지원합니다."
  }
];
