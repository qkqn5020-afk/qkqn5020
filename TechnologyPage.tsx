import React, { useEffect, useState, useRef } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Zap, 
  Settings, 
  Cpu, 
  ArrowRight,
  Maximize2,
  ChevronRight
} from 'lucide-react';

interface TechnologyPageProps {
  onBack: () => void;
}

const TechnologyPage: React.FC<TechnologyPageProps> = ({ onBack }) => {
  const [scrollY, setScrollY] = useState(0);
  const [activePatent, setActivePatent] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Reveal effect on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.tech-reveal').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const PATENT_IMAGES = [
    "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%881_optimized.jpg",
    "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%882_optimized.jpg",
    "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%883_optimized.jpg",
    "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%884_optimized.jpg",
    "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%885_optimized.jpg",
    "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%886_optimized.jpg",
    "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%887_optimized.jpg",
    "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%888_optimized.jpg"
  ];

  return (
    <div className="bg-[#050505] text-white overflow-x-hidden selection:bg-blue-500/30">
      {/* SECTION 1 – INTRO */}
      <section className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
        <div className="space-y-4">
          <p className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-8 tech-reveal opacity-0 transition-all duration-1000 translate-y-10 [.active&]:opacity-100 [.active&]:translate-y-0">
            BACA24 Engineering
          </p>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-none tech-reveal opacity-0 transition-all duration-1000 delay-300 translate-y-10 [.active&]:opacity-100 [.active&]:translate-y-0">
            THIS IS NOT A GAME.
          </h1>
          <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-none text-blue-600 tech-reveal opacity-0 transition-all duration-1000 delay-700 translate-y-10 [.active&]:opacity-100 [.active&]:translate-y-0">
            THIS IS TECHNOLOGY.
          </h2>
        </div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="w-[1px] h-12 bg-white mx-auto"></div>
        </div>
      </section>

      {/* SECTION 2 – ARM TYPE PITCHING SYSTEM */}
      <section className="min-h-screen py-32 relative flex flex-col items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center z-10">
          <div className="tech-reveal opacity-0 transition-all duration-1000 -translate-x-10 [.active&]:opacity-100 [.active&]:translate-x-0">
            <h3 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tighter">
              ARM TYPE
            </h3>
            <p className="text-2xl md:text-4xl font-bold text-blue-500 mb-6 uppercase tracking-widest">
              Real Throw
            </p>
            <div className="h-[2px] w-24 bg-blue-600 mb-12"></div>
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-lg">
              기계적인 회전이 아닙니다. <br />
              실제 인간 투수의 투구 메커니즘을 <br className="hidden md:block" />
              정밀하게 공학적으로 재현했습니다.
            </p>
            <div className="mt-12 text-blue-600 font-black text-sm tracking-[0.5em] uppercase">
              MECHANICAL, NOT DIGITAL
            </div>
          </div>
          
          <div className="relative">
            <div 
              className="relative z-10 transition-transform duration-500 ease-out"
              style={{ transform: `scale(${1 + Math.max(0, (scrollY - 800) * 0.0002)})` }}
            >
              <img 
                src="https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/arm%ED%98%95%20%ED%94%BC%EC%B9%AD%EB%A8%B8%EC%8B%A0.png" 
                alt="ARM Type Machine" 
                className="w-full max-w-2xl mx-auto h-auto drop-shadow-[0_35px_100px_rgba(30,64,175,0.4)]"
              />
            </div>
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-blue-600/10 blur-[150px] rounded-full -z-10 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* SECTION 3 – LED MOTION EXPERIENCE */}
      <section className="min-h-screen py-32 bg-[#0a0a0a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="text-center mb-24 tech-reveal opacity-0 transition-all duration-1000 translate-y-10 [.active&]:opacity-100 [.active&]:translate-y-0">
            <h3 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              YOU DON’T WATCH.<br />
              <span className="text-blue-600">YOU FACE A PITCHER.</span>
            </h3>
          </div>
          
          <div className="relative w-full max-w-5xl group">
            <div className="rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(30,64,175,0.2)] border border-white/5 relative">
              <img 
                src="https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/led%EB%AA%A8%EC%85%98.png" 
                alt="LED Motion" 
                className="w-full h-auto transition-transform duration-[3000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              
              {/* Overlay Label */}
              <div className="absolute bottom-10 left-10 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
                  <Maximize2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-blue-400">Sync Rate</p>
                  <p className="text-xl font-bold">0.01s Realtime Response</p>
                </div>
              </div>
            </div>
            
            {/* Light Streaks */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full animate-pulse delay-700"></div>
          </div>
        </div>
      </section>

      {/* SECTION 4 – SYSTEM RELIABILITY */}
      <section className="py-40 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Settings />, title: "MECHANICAL STABILITY", desc: "고속 회전 부하를 견디는 고강도 합금 설계로 연중무휴 가동을 보장합니다." },
              { icon: <Cpu />, title: "SMART CALIBRATION", desc: "실시간 센서 피드백을 통해 구속과 궤적의 오차를 0.1% 미만으로 유지합니다." },
              { icon: <Zap />, title: "ENERGY EFFICIENT", desc: "최적화된 모터 제어 기술로 무인 운영 시 전력 소모를 30% 이상 절감했습니다." },
            ].map((item, i) => (
              <div key={i} className="tech-reveal opacity-0 transition-all duration-1000 translate-y-10 [.active&]:opacity-100 [.active&]:translate-y-0" style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-8 text-blue-500">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                </div>
                <h4 className="text-xl font-black mb-4 tracking-tight">{item.title}</h4>
                <p className="text-slate-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 – PATENTED STRUCTURE */}
      <section className="py-40 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32 tech-reveal opacity-0 transition-all duration-1000 translate-y-10 [.active&]:opacity-100 [.active&]:translate-y-0">
            <h3 className="text-4xl md:text-6xl font-black mb-6">PATENTED BY DESIGN.</h3>
            <p className="text-slate-500 text-lg uppercase tracking-[0.4em] font-light">Protected Innovation</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {PATENT_IMAGES.map((url, i) => (
              <div 
                key={i} 
                className="group relative tech-reveal opacity-0 transition-all duration-1000 scale-95 [.active&]:opacity-100 [.active&]:scale-100 overflow-hidden rounded-2xl border border-white/5 bg-white/5 aspect-[3/4] flex items-center justify-center p-6 cursor-pointer hover:border-blue-500/50 transition-colors"
                style={{ transitionDelay: `${(i % 4) * 100}ms` }}
                onMouseEnter={() => setActivePatent(i)}
                onMouseLeave={() => setActivePatent(null)}
              >
                <img 
                  src={url} 
                  alt={`Patent ${i+1}`} 
                  className={`max-h-full max-w-full object-contain transition-all duration-500 ${activePatent === i ? 'scale-110 filter-none' : 'filter grayscale opacity-40'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] font-black tracking-widest uppercase text-blue-400">Verified Tech</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-32 flex flex-col md:flex-row items-center justify-center gap-12 tech-reveal opacity-0 transition-all duration-1000 translate-y-10 [.active&]:opacity-100 [.active&]:translate-y-0">
             <div className="flex items-center gap-6 bg-white/5 px-10 py-8 rounded-[30px] border border-white/10 group hover:border-blue-500/50 transition-all">
               <ShieldCheck className="w-12 h-12 text-blue-500" />
               <div className="text-left">
                 <p className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Certification</p>
                 <p className="text-xl font-bold">암형 피칭 특허 보유</p>
               </div>
             </div>
             <div className="flex items-center gap-6 bg-white/5 px-10 py-8 rounded-[30px] border border-white/10 group hover:border-blue-500/50 transition-all">
               <Award className="w-12 h-12 text-blue-500" />
               <div className="text-left">
                 <p className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Standard</p>
                 <p className="text-xl font-bold">KOLAS 정밀도 검증</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 – CLOSING */}
      <section className="py-60 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl space-y-12 tech-reveal opacity-0 transition-all duration-1000 translate-y-10 [.active&]:opacity-100 [.active&]:translate-y-0">
          <p className="text-2xl md:text-3xl font-light text-slate-300 leading-relaxed">
            You are not opening a batting cage.<br />
            <span className="text-white font-black">You are opening a system.</span>
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
            <button 
              onClick={onBack}
              className="px-10 py-6 bg-blue-600 text-white font-black rounded-full text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(30,64,175,0.3)] group"
            >
              창업 안내 페이지로 이동 <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => {
                onBack();
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-10 py-6 bg-white/5 border border-white/10 text-white font-black rounded-full text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              1:1 창업 상담 신청 <ChevronRight className="opacity-40" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER MINI */}
      <footer className="py-12 border-t border-white/5 text-center text-[10px] text-slate-600 uppercase tracking-[0.3em]">
        BECA24 TECHNOLOGY DIVISION & SYSTEM DESIGN LAB
      </footer>
    </div>
  );
};

export default TechnologyPage;