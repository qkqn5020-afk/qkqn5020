import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  MapPin,
  Menu,
  Smartphone,
  Users,
  Trophy,
  Activity,
  Zap,
  Target,
  BarChart2,
  CheckCircle2,
  Wallet,
  Clock,
  Settings,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Award,
  Cpu,
  X,
  Phone
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LabelList
} from 'recharts';
import { STEPS, FAQ_LIST, PRICING_LIST } from './constants';
import TechnologyPage from './TechnologyPage';

const PREVIEW_IMAGES = [
  { src: "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/2.png", alt: "공간 미리보기 2" },
  { src: "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/5.png", alt: "공간 미리보기 5" },
  { src: "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/6.png", alt: "공간 미리보기 6" },
  { src: "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/7.png", alt: "공간 미리보기 7" },
];

const PATENT_IMAGES = [
  "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%881.png",
  "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%882.png",
  "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%883.png",
  "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%884.png",
  "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%885.png",
  "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%886.png",
  "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%887.png",
  "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%8A%B9%ED%97%888.png"
];

// Interactive high-performance animated counter utilizing requestAnimationFrame for 60fps pacing
const AnimatedCounter: React.FC<{ end: number; suffix?: string; duration?: number; decimals?: number }> = ({ end, suffix = '', duration = 1200, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const currentVal = percentage * end;
      setCount(currentVal);

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, end, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'Home' | 'Technology'>('Home');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const [isHighlighted, setIsHighlighted] = useState(false);
  const [pendingScrollAndFocus, setPendingScrollAndFocus] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleScrollToForm = () => {
    setIsHighlighted(true);
    const targetElement = document.getElementById('contact');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus({ preventScroll: true });
      }
    }, 850);
    setTimeout(() => {
      setIsHighlighted(false);
    }, 2500);
  };

  const [formData, setFormData] = useState({
    name: '',
    region: '',
    phone: '',
    details: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitMessage(null);

    if (!formData.name.trim()) {
      setSubmitMessage({ type: 'error', text: '성함을 입력해 주세요.' });
      return;
    }
    if (!formData.region.trim()) {
      setSubmitMessage({ type: 'error', text: '희망 지역을 입력해 주세요.' });
      return;
    }
    if (!formData.phone.trim()) {
      setSubmitMessage({ type: 'error', text: '연락처를 입력해 주세요.' });
      return;
    }
    if (!formData.details.trim()) {
      setSubmitMessage({ type: 'error', text: '문의 내용을 입력해 주세요.' });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/jlsports777@naver.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: "[창업 상담 신청] 새로운 상담 신청",
          _captcha: "false",
          "성함": formData.name,
          "희망 지역": formData.region,
          "연락처": formData.phone,
          "문의 내용": formData.details,
          "Name": formData.name,
          "Preferred Region": formData.region,
          "Contact Number": formData.phone,
          "Inquiry Details": formData.details
        })
      });

      if (response.ok) {
        setSubmitMessage({ 
          type: 'success', 
          text: '상담 신청이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.' 
        });
        setFormData({ name: '', region: '', phone: '', details: '' });
      } else {
        const errData = await response.json().catch(() => ({}));
        setSubmitMessage({ 
          type: 'error', 
          text: errData.message || '상담 신청 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' 
        });
      }
    } catch (err: any) {
      console.error('FormSubmit sending error:', err);
      setSubmitMessage({ 
        type: 'error', 
        text: '상담 신청 중 오류가 발생했습니다. 다시 시도해 주세요.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (currentPage !== 'Home') return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-text, .patent-grid-item').forEach(el => observer.observe(el));
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 'Home' && pendingScrollAndFocus) {
      setPendingScrollAndFocus(false);
      setTimeout(() => {
        handleScrollToForm();
      }, 300);
    }
  }, [currentPage, pendingScrollAndFocus]);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % PREVIEW_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + PREVIEW_IMAGES.length) % PREVIEW_IMAGES.length);
  };

  const goToTech = () => {
    setCurrentPage('Technology');
    window.scrollTo(0, 0);
  };

  const goToHome = (scrollFocus?: boolean) => {
    setCurrentPage('Home');
    if (scrollFocus === true) {
      setPendingScrollAndFocus(true);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  if (currentPage === 'Technology') {
    return <TechnologyPage onBack={goToHome} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 01: GNB */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={goToHome}
          >
            <img 
              src="https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%EB%B0%B0%EB%84%88%20%EC%95%84%EC%9D%B4%EC%BD%984.png" 
              alt="BECA24 로고" 
              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleScrollToForm}
              className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
            >
              1:1 창업 상담
            </button>
          </div>
        </div>
      </header>

      {/* SECTION 02: HERO */}
      <section className="relative h-screen overflow-hidden bg-black">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
          style={{ transform: `scale(${1 + scrollY * 0.0003}) translate3d(0, ${scrollY * 0.1}px, 0)` }}
        >
          <source 
            src="https://github.com/qkqn5020-afk/qkqn5020/raw/main/%EC%96%B4%EB%91%90%EC%9A%B4%EB%B2%84%EC%A0%84%20(1).mp4" 
            type="video/mp4" 
          />
        </video>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 md:justify-center md:pb-0 text-center text-white z-10 px-4">
          <div className="animate-fade-in-up">
            <p className="text-xl md:text-3xl font-bold mb-10 md:mb-6 tracking-tight drop-shadow-lg leading-relaxed">
              국내유일 야구카페!<br />
              치고! 던지고! 마시고! 즐기자!
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-9xl font-black tracking-tighter drop-shadow-2xl whitespace-nowrap">
              베카24 & 홈런짱24
            </h2>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50 animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* SECTION 02.5: UNMANNED SOLUTION DETAIL */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="reveal-text">
            <h2 className="text-3xl md:text-5xl font-black text-[#111] leading-tight tracking-tight">
              <span className="text-primary relative z-10">365일 24시간</span> 수익은 계속됩니다.
            </h2>
          </div>
          <div className="reveal-text mt-3 mb-16 md:mb-20" style={{ transitionDelay: '0.2s' }}>
            <h3 className="text-xl md:text-2xl font-light text-gray-400 tracking-tight">
              하루 30분 관리, 인건비 No, 고정비 부담 최소화
            </h3>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 justify-center">
            {[
              "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%EB%B0%B0%EB%84%881.png",
              "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%EB%B0%B0%EB%84%882.png",
              "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%EB%B0%B0%EB%84%883.png"
            ].map((url, index) => (
              <div key={index} className="reveal-text aspect-[4/3] overflow-hidden rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-50" style={{ transitionDelay: `${index * 0.1}s` }}>
                <img 
                  src={url} 
                  alt={`베카24 배너 ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENHANCED SECTION: TECHNOLOGY - ARM PITCHING MACHINE */}
      <section className="py-24 bg-white text-black overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 reveal-text">
            <span className="text-black font-bold tracking-widest uppercase mb-4 block">WORLD-CLASS HARDWARE</span>
            <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-black">
              실제 투수의 궤적을 재현하는<br />
              <span className="text-primary">ARM형 피칭머신</span>
            </h3>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              일반적인 휠 방식이 아닌, 실제 투수가 공을 던지는 메커니즘을 가진 암(Arm)형 머신을 채택했습니다. 
              구질의 안정성과 타격 시의 리듬감을 극대화하여 무인 운영 환경에서도 프로급 연습 환경을 제공합니다.
            </p>
          </div>
          <div className="flex-1 relative">
            <div 
              className="relative z-10 transition-transform duration-500 ease-out flex justify-center items-center"
              style={{ transform: `translate3d(0, ${(scrollY - 1500) * -0.05}px, 0)` }}
            >
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full max-w-lg h-auto arm-cutout-shadow object-contain"
              >
                <source src="https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%94%BC%EC%B9%AD%EB%A8%B8%EC%8B%A0%20%EC%98%81%EC%83%81.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED SECTION: LED MOTION SCREEN */}
      <section className="py-32 bg-black overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-20">
          <div className="flex-1 reveal-text">
            <span className="text-blue-400 font-bold tracking-widest uppercase mb-4 block">Visual Immersion</span>
            <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-white">
              타격과 동시에 펼쳐지는<br />
              <span className="text-blue-400">LED 모션 그래픽</span>
            </h3>
            <p className="text-white text-lg font-light leading-relaxed mb-8">
              머신에서 투구된 공이 센서를 통과하는 순간, 대형 LED 스크린은 그 궤적을 실제 구장과 동일하게 시뮬레이션합니다. 
              단순한 연습을 넘어 마치 경기장에 서 있는 듯한 현장감을 선사합니다.
            </p>
            <div className="flex items-center gap-4 text-blue-400 font-bold text-xl">
              <Zap className="w-8 h-8 text-accent" /> 0.01초 실시간 연동 시스템
            </div>
          </div>
          <div className="flex-1 reveal-text flex justify-center items-center">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full max-w-2xl h-auto arm-cutout-shadow object-contain"
            >
              <source src="https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%EB%8D%98%EC%A7%80%EB%8A%94%20%EB%AA%A8%EC%85%98%20%ED%8E%B8%EC%A7%91.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* SECTION: INDOOR INTERIOR ENHANCED */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal-text">
            <h3 className="text-4xl font-black mb-6">프리미엄 인테리어 & 공간 미학</h3>
            <p className="text-gray-500 text-lg">단순한 연습장을 넘어 고객이 머물고 싶은 하이엔드 공간을 제안.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="reveal-text relative overflow-hidden rounded-[60px] aspect-square md:aspect-[3/2] shadow-2xl">
              <img src="https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%EC%8B%A4%EB%82%B41.png" alt="실내 인테리어 1" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-12 left-12 text-white">
                <p className="font-bold text-3xl mb-2 drop-shadow-lg uppercase">PLAY & DESIGN ZONE</p>
                <p className="text-base opacity-80 font-light">감각적인 스포츠 플레이 존</p>
              </div>
            </div>
            <div className="reveal-text relative overflow-hidden rounded-[60px] aspect-square md:aspect-[3/2] shadow-2xl">
              <img src="https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%EC%8B%A4%EB%82%B42.png" alt="실내 인테리어 2" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-12 left-12 text-white">
                <p className="font-bold text-3xl mb-2 drop-shadow-lg">LOUNGE AREA</p>
                <p className="text-base opacity-80 font-light">무인 스마트 키오스크 & 커뮤니티 공간</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: SPACE & CONTENT PREVIEW CAROUSEL */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12 reveal-text">
            <div>
              <h3 className="text-4xl font-black mb-4 text-slate-900">BECA24 공간 & 콘텐츠 미리보기</h3>
              <p className="text-gray-400 text-lg">압도적인 브랜드 비주얼과 세련된 매장 인테리어로 완성된 프리미엄 무인 야구 문화 공간</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-lg font-bold text-slate-400">
                <span className="text-primary">{currentSlide + 1}</span> / {PREVIEW_IMAGES.length}
              </span>
              <div className="flex gap-2">
                <button onClick={prevSlide} className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                  <ChevronLeft className="w-6 h-6 text-slate-600" />
                </button>
                <button onClick={nextSlide} className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                  <ChevronRight className="w-6 h-6 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="relative group reveal-text">
            <div className="aspect-[21/9] md:aspect-[21/10] overflow-hidden rounded-[40px] shadow-2xl shadow-slate-200">
              <div className="flex transition-transform duration-700 ease-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {PREVIEW_IMAGES.map((img, i) => (
                  <div key={i} className="min-w-full h-full">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-10">
              {PREVIEW_IMAGES.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-10 bg-primary' : 'w-2 bg-gray-200'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVENUE CASES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12 reveal-text">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">매장 규모에 따른 운영 시뮬레이션</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[
              { title: '35평형', rev: '(3레인 기준)', img: 'https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/35%ED%8F%89.png' },
              { title: '45평형', rev: '(4레인 기준)', img: "https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/45%ED%8F%89%ED%98%95.png" },
              { title: '60평형', rev: '(5레인 기준)', img: 'https://github.com/qkqn5020-afk/qkqn5020/raw/main/60%ED%8F%89.png' },
            ].map((item, i) => (
              <div key={i} className="reveal-text bg-white rounded-[40px] overflow-hidden shadow-sm group hover:shadow-xl transition-all border border-gray-100" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="overflow-hidden h-56">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-10 text-center">
                  <div className="bg-blue-50 text-blue-600 font-bold text-sm inline-block px-4 py-1.5 rounded-full mb-6">{item.title}</div>
                  <h4 className="text-3xl font-black text-primary">{item.rev}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORY */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="reveal-text bg-blue-950 rounded-[40px] p-8 md:p-20 relative flex flex-col md:flex-row gap-12 items-center shadow-3xl">
            <div className="flex-1 text-white z-10">
              <h3 className="text-3xl font-black mb-10 text-orange-400">BECA24<br />Field Insight</h3>
              <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 mb-8">
                <p className="text-lg leading-relaxed font-light text-gray-100">
                  “베카24는 운동을 하러 오는 공간이면서, 쉬고 즐기러 오는 공간이기도 합니다. 야구를 치다가 로봇탁구를 하고, 잠시 카페에서 쉬었다가 다른 스포츠 콘텐츠를 즐기며 무인 운영 환경에서도 매장은 늘 활기 있게 유지됩니다.”
                </p>
              </div>
            </div>
            <div className="flex-1 w-full text-center">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group border-4 border-white/10 bg-black cursor-pointer" onClick={!isVideoPlaying ? handlePlayVideo : undefined} style={{ backgroundImage: !isVideoPlaying ? "url('https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/hero-background.jpg')" : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <video ref={videoRef} src="https://github.com/qkqn5020-afk/qkqn5020/raw/main/251120_%EB%B2%A0%EC%B9%B4%ED%99%8D%EB%B3%B4%EC%98%81%EC%83%81%20%EC%B5%9C%EC%A2%85.mp4" className={`w-full h-full object-cover ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`} playsInline controls={isVideoPlaying} />
                {!isVideoPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all">
                    <button className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl transform transition-transform">
                      <Play className="text-white fill-white ml-1 w-10 h-10" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SMART ANALYTICS */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-32">
          <div className="flex-1 md:max-w-[55%] reveal-text text-left">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-6 block">SMART ANALYTICS</span>
            <h3 className="text-3xl md:text-4xl font-black mb-10 leading-[1.3] text-slate-900 tracking-tight">상상만 하던<br /><span className="text-orange-500">데이터 야구</span>가 실제 운영이 됩니다</h3>
            <div className="text-gray-500 text-lg leading-relaxed mb-12 space-y-6">
              <p>베카24는 단순히 공을 치는 공간이 아닙니다. 타구 속도, 회전수, 비거리와 같은 데이터를 실시간으로 기록하고 시각화해 이용자가 자신의 변화를 직접 확인할 수 있도록 합니다.</p>
              <p>이렇게 축적된 데이터는 자연스럽게 재도전과 재방문으로 이어지고, 무인 운영 환경에서도 안정적인 이용 흐름을 만들어내며, 재방문율을 획기적으로 높이는 원동력이 됩니다.</p>
              <p className="font-bold text-slate-700">데이터는 곧, 운영의 안정성입니다.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['#실시간데이터', '#재방문구조', '#무인운영시스템'].map((tag, idx) => (
                <span key={idx} className="bg-blue-50 text-primary px-5 py-2.5 rounded-full text-sm font-bold">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex-1 md:flex-[1.1] reveal-text flex justify-center items-center w-full">
            <div className="p-2 md:p-3 bg-white rounded-[60px] shadow-[0_35px_70px_-15px_rgba(0,0,0,0.12)] border border-slate-50 w-full">
              <img src="https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/beca24%20loading.png" alt="데이터 야구" className="w-full h-[380px] md:h-[450px] rounded-[52px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* UNMANNED AUTOMATION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
          <div className="flex-1 reveal-text text-left">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-6 block">24/7 FULL AUTOMATION</span>
            <h3 className="text-3xl md:text-4xl font-black mb-10 leading-[1.3] text-slate-900 tracking-tight">인건비 0원의 기적<br /><span className="text-primary">완전 무인 자동화 시스템</span></h3>
            <div className="text-gray-500 text-lg leading-relaxed mb-10 space-y-6">
              <p>베카24 & 홈런짱24는 사람이 상주하지 않아도 매장이 스스로 운영되도록 설계된 공간입니다.</p>
              <p>결제, 이용, 종료까지 모든 과정이 자동으로 연결되며, 매장은 24시간 끊김 없이 운영됩니다.</p>
              <p>운영자는 현장에 없어도 모바일 또는 관리자 시스템을 통해 매장 상태와 이용 흐름을 간편하게 확인할 수 있습니다.</p>
              <p className="font-bold text-slate-800">인건비 부담 없이, 운영은 단순하게. 수익 구조는 안정적으로 유지됩니다.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-bold">#무인자동화</span>
              <span className="bg-blue-50 text-primary px-5 py-2.5 rounded-full text-sm font-bold">#인건비절감</span>
              <span className="bg-blue-50 text-primary px-5 py-2.5 rounded-full text-sm font-bold">#24시간운영</span>
            </div>
          </div>
          <div className="flex-1 reveal-text flex justify-center items-center w-full">
            <div className="p-2 md:p-3 bg-white rounded-[60px] shadow-[0_35px_70px_-15px_rgba(0,0,0,0.12)] border border-slate-50 w-full overflow-hidden">
              <img src="https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%ED%99%88%EB%9F%B0%EC%A7%B124.jpg" alt="무인 자동화 시스템" className="w-full h-[380px] md:h-[450px] rounded-[52px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* VARIOUS ENTERTAINMENT */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 reveal-text text-left">
            <span className="text-orange-500 font-bold text-sm tracking-widest uppercase mb-6 block">MAXIMIZE REVENUE</span>
            <h3 className="text-3xl md:text-4xl font-black mb-10 leading-[1.3] text-slate-900 tracking-tight">다양한 오락기계 제공<br /><span className="text-primary">지루할 틈 없는 복합 스포츠 공간</span></h3>
            <div className="text-gray-500 text-lg leading-relaxed mb-10 space-y-6">
              <p>베카24는 메인 콘텐츠인 야구 외에도 축구, 농구, 탁구, 사격 등 누구나 즐길 수 있는 다양한 스포츠 오락 기계를 함께 제공합니다.</p>
              <p>짧은 플레이 타임과 높은 접근성으로 대기 시간까지 매출로 연결하며, 고객이 매장에 더 오래 머물 수 있는 환경을 조성합니다.</p>
              <p>이러한 콘텐츠 다양성은 무인 운영 환경에서도 꾸준한 이용 흐름을 만들어내며, 재방문율을 획기적으로 높이는 원동력이 됩니다.</p>
              <p className="font-bold text-slate-800">콘텐츠의 확장이 곧 매장 경쟁력이자 수익의 극대화입니다.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="bg-blue-50 text-primary px-5 py-2.5 rounded-full text-sm font-bold">#스포츠오락</span>
              <span className="bg-blue-50 text-primary px-5 py-2.5 rounded-full text-sm font-bold">#체류시간증대</span>
              <span className="bg-blue-50 text-primary px-5 py-2.5 rounded-full text-sm font-bold">#추가수익창출</span>
            </div>
          </div>
          <div className="flex-1 reveal-text flex justify-center items-center w-full">
            <div className="p-2 md:p-3 bg-white rounded-[60px] shadow-[0_35px_70px_-15px_rgba(0,0,0,0.12)] border border-slate-50 w-full overflow-hidden">
              <img src="https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%EC%98%A4%EB%9D%BD%EA%B8%B0%EA%B3%84.png" alt="다양한 오락시설" className="w-full h-auto rounded-[52px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & PATENT GALLERY */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-24">
            <div className="flex-1 md:flex-[1.5] w-full overflow-hidden">
              <div className="animate-slow-marquee flex gap-10 py-6">
                {[...PATENT_IMAGES, ...PATENT_IMAGES].map((url, i) => (
                  <div key={i} className="flex-shrink-0 bg-white p-5 rounded-xl shadow-lg border border-slate-50 h-72 md:h-96 w-auto flex items-center justify-center">
                    <img src={url} alt={`특허증 ${i + 1}`} className="h-full w-auto object-contain" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 reveal-text text-left">
              <span className="text-primary font-bold tracking-widest uppercase block mb-4">Official Verification</span>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">검증된 독보적 기술력</h3>
              <p className="text-gray-500 text-lg leading-relaxed">베카24의 모든 시스템은 지식재산권으로 보호받는 본사 고유의 기술입니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-blue-800 py-8 overflow-hidden whitespace-nowrap relative z-10 shadow-2xl">
        <div className="animate-marquee inline-flex text-white font-black text-2xl uppercase tracking-widest gap-20">
          {Array(10).fill(0).map((_, i) => (
            <span key={i} className="flex items-center gap-6">BECA24 BASEBALL CAFE 24 <Zap className="text-orange-400 w-8 h-8" /> DATA-DRIVEN TRAINING <Zap className="text-orange-400 w-8 h-8" /> UNMANNED ACADEMY</span>
          ))}
        </div>
      </div>

      {/* CORE TECHNOLOGY */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 reveal-text">
            <h3 className="text-4xl font-black mb-6 text-slate-900">베카24 무인 운영의 핵심 기술</h3>
            <p className="text-gray-500 text-lg">사람 없이도 매장이 안정적으로 운영되는 비결입니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: '3-Wheel 머신', desc: '안정적인 구질로 밤납없이 돌아가는 매장의 핵심 장비입니다.', icon: <Activity className="w-12 h-12 mb-6 text-primary" /> },
              { label: '비전 센서', desc: '타구 결과를 자동 인식하여 관리 부담을 획기적으로 낮춥니다.', icon: <Target className="w-12 h-12 mb-6 text-primary" /> },
              { label: 'AI 아카데미', desc: '혼자서도 실력이 느는 비대면 트레이닝 시스템입니다.', icon: <Smartphone className="w-12 h-12 mb-6 text-primary" /> },
              { label: '스마트 라운지', desc: '야구, 로봇탁구, 카페 등 추가 수익 창출의 근간이 됩니다.', icon: <Users className="w-12 h-12 mb-6 text-primary" /> }
            ].map((item, i) => (
              <div key={i} className="reveal-text bg-white p-10 rounded-[40px] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all group" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                  {React.cloneElement(item.icon as React.ReactElement<any>, { className: 'w-10 h-10 text-primary group-hover:text-white transition-colors' })}
                </div>
                <h4 className="font-black mb-4 text-xl text-slate-900">{item.label}</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING & PACKAGE SECTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 reveal-text">
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-4">합리적인 비용으로<br /><span className="text-primary">무인 스포츠 창업</span>을 시작하세요</h3>
            <p className="text-gray-400 text-lg md:text-xl font-light">초기 부담은 낮추고, 운영 안정성과 확장성은 높인 BECA24 표준 창업 모델</p>
          </div>

          <div className="reveal-text bg-white rounded-[60px] overflow-hidden shadow-2xl border border-slate-100 mb-16">
            <div className="bg-primary py-12 px-6 text-center text-white">
              <p className="text-lg font-bold opacity-80 mb-4">BECA24 표준 창업 패키지 (추천)</p>
              <h4 className="text-3xl md:text-5xl font-black mb-2">창업비용은 1:1 문의</h4>
              <p className="text-white/75 text-sm md:text-base font-light">※ 매장 규모 및 구성에 따라 상이 / 부가세 별도</p>
            </div>
            
            {/* Original 2-column checklist layout */}
            <div className="p-8 md:p-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
                {/* Item 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full border border-blue-500 flex items-center justify-center text-blue-600 bg-blue-50/50">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-none mb-2">무인 운영 시스템</h5>
                    <p className="text-slate-400 text-sm sm:text-base">출입, 결제, 원격 관리 통합 무인 시스템</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full border border-blue-500 flex items-center justify-center text-blue-600 bg-blue-50/50">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-none mb-2">피칭머신 & 분석 시스템</h5>
                    <p className="text-slate-400 text-sm sm:text-base">ARM형 피칭머신, LED 모션 스크린</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full border border-blue-500 flex items-center justify-center text-blue-600 bg-blue-50/50">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-none mb-2">실내 · 외 시설 공사</h5>
                    <p className="text-slate-400 text-sm sm:text-base">방음, 네트, 바닥, 안전 시설</p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full border border-blue-500 flex items-center justify-center text-blue-600 bg-blue-50/50">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-none mb-2">인테리어 시공</h5>
                    <p className="text-slate-400 text-sm sm:text-base">기본 인테리어, 조명, 사인물</p>
                  </div>
                </div>

                {/* Item 5 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full border border-blue-500 flex items-center justify-center text-blue-600 bg-blue-50/50">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-none mb-2">콘텐츠 설비</h5>
                    <p className="text-slate-400 text-sm sm:text-base">야구, 로봇탁구 등 복합 스포츠 콘텐츠</p>
                  </div>
                </div>

                {/* Item 6 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full border border-blue-500 flex items-center justify-center text-blue-600 bg-blue-50/50">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-none mb-2">초도 비품</h5>
                    <p className="text-slate-400 text-sm sm:text-base">공, 배트, 보호 장비</p>
                  </div>
                </div>

                {/* Item 7 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full border border-blue-500 flex items-center justify-center text-blue-600 bg-blue-50/50">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-none mb-2">교육 및 오픈 지원</h5>
                    <p className="text-slate-400 text-sm sm:text-base">설치, 교육, 초기 운영 지원 포함</p>
                  </div>
                </div>

                {/* Item 8 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full border border-blue-500 flex items-center justify-center text-blue-600 bg-blue-50/50">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-none mb-2">브랜드 사용</h5>
                    <p className="text-slate-400 text-sm sm:text-base">BECA24 브랜드 및 시스템 사용 포함</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PREMIUM FRANCHISE OPPORTUNITY */}
      <section className="py-28 bg-[#ffffff] border-t border-gray-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* 1. Success Store Showcase */}
          <div className="text-center mb-16 reveal-text">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary text-sm font-bold tracking-wide uppercase mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              SUCCESS STORY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              전국을 사로잡은 <span className="text-primary">실제 매장 성공 신화</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 font-medium tracking-tight mt-4 max-w-3xl mx-auto">
              가상의 그래픽이나 무작위 배치가 아닌, 실제 성황리에 활발히 가동 중인 자랑스러운 전국 브랜드 가맹 스페이스입니다. 믿을 수 있는 점주님들의 현명한 지점별 경영 전경을 확인하세요.
            </p>
          </div>

          {/* Grid Layout: Desktop 2x2, Mobile Single Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-28">
            
            {/* Card 1: 홈런짱24 양산점 */}
            <div className="reveal-text group relative bg-slate-50 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_70px_rgba(249,115,22,0.15)] border border-slate-100 transition-all duration-500 transform hover:-translate-y-3">
              {/* Image Frame */}
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10] w-full bg-slate-900">
                <img 
                  src="https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/yangsan.jpg" 
                  alt="홈런짱24 양산점 전경"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                />
                {/* Decorative Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
                {/* Top Badge */}
                <span className="absolute top-6 left-6 px-4 py-1.5 bg-orange-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/20 tracking-wider">
                  대형 복합 레저 매장
                </span>
              </div>
              {/* Card Bottom Content */}
              <div className="p-6 md:p-8 bg-white border-t border-slate-50 relative">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-xs font-black text-orange-500 tracking-widest uppercase block mb-1">BASEBALL & PLAY STAGE</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">홈런짱24 양산점</h3>
                  </div>
                  <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-orange-600 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
                    </span>
                    주말 하루 내방 500명 돌파
                  </div>
                </div>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed tracking-tight">
                  24시 무인 야구배팅과 레저 플레이 및 각종 인기 오락 가두 시설이 환상적으로 결합한 대형 복합 스포츠 전경입니다. 뛰어난 인테리어와 폭넓은 계층 집객으로 경남권 요충지 최고 랜드마크로 떠올랐습니다.
                </p>
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 text-slate-400 text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  <span>경상남도 양산시 핵심 주거 및 상가 밀집 중심로</span>
                </div>
              </div>
            </div>

            {/* Card 2: 베카24 서면점 */}
            <div className="reveal-text group relative bg-slate-50 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_70px_rgba(30,64,175,0.15)] border border-slate-100 transition-all duration-500 transform hover:-translate-y-3">
              {/* Image Frame */}
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10] w-full bg-slate-900">
                <img 
                  src="https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/beca24.jpg" 
                  alt="베카24 서면점 전경"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                />
                {/* Decorative Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
                {/* Top Badge */}
                <span className="absolute top-6 left-6 px-4 py-1.5 bg-blue-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/20 tracking-wider">
                  AI 스윙 프리미엄 지점
                </span>
              </div>
              {/* Card Bottom Content */}
              <div className="p-6 md:p-8 bg-white border-t border-slate-50 relative">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-xs font-black text-blue-600 tracking-widest uppercase block mb-1">AI SWING ANALYSIS PORTAL</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">베카24 서면점</h3>
                  </div>
                  <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-600 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                    </span>
                    완전 무인오토 정착형 모델
                  </div>
                </div>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed tracking-tight">
                  특허 획득 무인 플레이 배팅 센서와 자체 키오스크 모바일 연동을 통해 AI 아카데미 전문형으로 설계된 지점입니다. 트렌디한 네온 그래픽의 고급 공간 설계로 부산 메인 상권의 젊은 스포츠 팬층을 집결시키고 있습니다.
                </p>
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 text-slate-400 text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>부산시 서면 대적형 로데오메인 상가 랜드마크</span>
                </div>
              </div>
            </div>

            {/* Card 3: 짱탁구장 잠실새내점 */}
            <div className="reveal-text group relative bg-slate-50 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_70px_rgba(168,85,247,0.15)] border border-slate-100 transition-all duration-500 transform hover:-translate-y-3">
              {/* Image Frame */}
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10] w-full bg-slate-900">
                <img 
                  src="https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/zamsil.jpg" 
                  alt="짱탁구장 잠실새내점 전경"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                />
                {/* Decorative Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
                {/* Top Badge */}
                <span className="absolute top-6 left-6 px-4 py-1.5 bg-purple-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-purple-600/20 tracking-wider">
                  2030 트렌디 스팟
                </span>
              </div>
              {/* Card Bottom Content */}
              <div className="p-6 md:p-8 bg-white border-t border-slate-50 relative">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-xs font-black text-purple-600 tracking-widest uppercase block mb-1">HYPER SPEED PINGPONG ROOM</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">짱탁구장 잠실새내점</h3>
                  </div>
                  <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-100 text-purple-600 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
                    </span>
                    매출액 1위 돌파 레전드 마일
                  </div>
                </div>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed tracking-tight">
                  오렌지와 퍼플의 유니크한 힙 인테리어와 로봇 탁구 시스템이 시너지를 내는 무인 핫플레이스입니다. 뛰어난 접근성은 물론 2차 캐주얼 모임, 직딩 데이트 등 심야 황금 상권을 연중무휴 24시간 가치로 누리고 있습니다.
                </p>
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 text-slate-400 text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-purple-600" />
                  <span>서울특별시 송파구 잠실새내역 맛집 및 도보 중앙 중심 동선</span>
                </div>
              </div>
            </div>

            {/* Card 4: 짱탁구장 경남대점 */}
            <div className="reveal-text group relative bg-slate-50 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_70px_rgba(16,185,129,0.15)] border border-slate-100 transition-all duration-500 transform hover:-translate-y-3">
              {/* Image Frame */}
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10] w-full bg-slate-900">
                <img 
                  src="https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/kynam.jpg" 
                  alt="짱탁구장 경남대점 전경"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                />
                {/* Decorative Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
                {/* Top Badge */}
                <span className="absolute top-6 left-6 px-4 py-1.5 bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/20 tracking-wider">
                  안정적 학거리 최고매출
                </span>
              </div>
              {/* Card Bottom Content */}
              <div className="p-6 md:p-8 bg-white border-t border-slate-50 relative">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-xs font-black text-emerald-600 tracking-widest uppercase block mb-1">ROBOTIC ACADEMY CELL</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">짱탁구장 경남대점</h3>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-600 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    점주 상주 시간 0시간 연속 실천
                  </div>
                </div>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed tracking-tight">
                  로봇 연동형 개인 연습 존과 탁월한 그룹 경기가 자유롭게 행해지는 학원가 최고의 복합 스포츠룸입니다. 대학교, 중고등학교가 인접한 등하교 핵심 관문을 선점하며 연중 비성수기 없는 고른 경영 실적을 성취했습니다.
                </p>
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 text-slate-400 text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>경남 마산합포구 경남대학교 대학가 중심 통행 스트리트</span>
                </div>
              </div>
            </div>

          </div>

          {/* 2. Why This Business Works */}
          <div className="my-36">
            <div className="text-center mb-16 reveal-text">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-bold tracking-wide uppercase mb-4">
                STABLE FRANCHISE VALUE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                왜 <span className="text-orange-500">무인 가맹 비즈니스</span> 여야만 할까요?
              </h2>
              <p className="text-lg md:text-xl text-slate-500 font-medium tracking-tight mt-4 max-w-3xl mx-auto">
                가장 정밀하고 오류 없는 오토파일럿 무인 제어로 점주님께 완전한 경영 편리성과 안정된 최상위 수익을 안겨드립니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Card 1 */}
              <div className="reveal-text group bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(30,64,175,0.08)] hover:border-blue-100 transition-all duration-400 flex flex-col justify-between items-start h-full">
                <div>
                  <div className="mb-8 p-4 rounded-2xl bg-blue-50 text-primary w-fit group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-md">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-primary transition-colors">오토 파일럿 원격 제어</h3>
                  <p className="text-slate-500 text-sm leading-relaxed tracking-tight">
                    스마트폰 원격 전원 통제, 기기 리셋, 매장 내 냉난방기 조절 및 24시간 안심 CCTV 솔루션을 탑재하여 현장 근무 상주가 불필요합니다.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary/70">
                  <span>원격 시스템 100% 모바일 연동</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="reveal-text group bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(249,115,22,0.08)] hover:border-orange-100 transition-all duration-400 flex flex-col justify-between items-start h-full">
                <div>
                  <div className="mb-8 p-4 rounded-2xl bg-orange-50 text-orange-500 w-fit group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-md">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-orange-500 transition-colors">24시간 정지 없는 수입</h3>
                  <p className="text-slate-500 text-sm leading-relaxed tracking-tight">
                    직장에 근무하고 계실 적, 한가로운 여가를 즐기실 적, 편히 수면을 취하는 깊은 밤에도 매장은 알아서 결제되고 끊임없이 돌아갑니다.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-orange-600/70">
                  <span>공백 시간이 전혀 없는 연속 매출</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="reveal-text group bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(168,85,247,0.08)] hover:border-purple-100 transition-all duration-400 flex flex-col justify-between items-start h-full">
                <div>
                  <div className="mb-8 p-4 rounded-2xl bg-purple-50 text-purple-600 w-fit group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-md">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-purple-600 transition-colors">가장 두려운 인건비 제로</h3>
                  <p className="text-slate-500 text-sm leading-relaxed tracking-tight">
                    알바생 고용 갈등, 지속적인 실망, 최저임금 급상승 리스크로부터 100% 해방되어 순이익 마진율을 파격적인 비율로 높였습니다.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-purple-600/70">
                  <span>고정 고정비 최적화 실현</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="reveal-text group bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.08)] hover:border-emerald-100 transition-all duration-400 flex flex-col justify-between items-start h-full">
                <div>
                  <div className="mb-8 p-4 rounded-2xl bg-emerald-50 text-teal-600 w-fit group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-md">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-emerald-600 transition-colors">본사 안심 올케어 지원</h3>
                  <p className="text-slate-500 text-sm leading-relaxed tracking-tight">
                    프랜차이즈 상권 정밀분석부터 공학적 스포츠 시공, 고밀도 사양 기기 설치, 홍보 기획 마케팅까지 모든 노하우를 다이렉트로 인계합니다.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-600/70">
                  <span>책임 공정 및 원스톱 오픈 보장</span>
                </div>
              </div>

            </div>
          </div>

          {/* 3. Trust & Proven Operation (Statistics) */}
          <div className="my-36 bg-slate-900 rounded-[48px] p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Visual Lights */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 reveal-text">
                <span className="text-orange-500 font-extrabold text-sm sm:text-base tracking-wider uppercase block mb-3">TRUST & PROVEN FACTS</span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                  JLSPORTS의 <br/>
                  <span className="text-blue-400">검증된 가치</span>
                </h3>
                <p className="text-slate-400 font-medium text-base sm:text-lg tracking-tight mt-6 leading-relaxed">
                  본사의 탄탄한 경영 실적과 전국적인 기기 공용률 데이터를 있는 그대로 자부합니다. 수많은 실 오너 분들의 연중무휴 매출 데이터가 당사의 견고한 비즈니스 뼈대를 입증합니다.
                </p>
              </div>
              
              <div className="lg:col-span-7 grid grid-cols-2 gap-6 md:gap-8 reveal-text">
                
                {/* Stat block 1 */}
                <div id="trust-card-1" className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-[32px] backdrop-blur-md hover:border-blue-500/30 hover:bg-white/10 transition-all duration-300">
                  <span className="text-blue-400 text-xs sm:text-sm font-bold block mb-3">TRUST 01</span>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug min-h-[3rem] sm:min-h-[4rem] flex items-center">
                    전국 직영점 운영
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm font-semibold tracking-tight mt-4">
                    실제 운영 매장 기반으로 창업 상담
                  </p>
                </div>

                {/* Stat block 2 */}
                <div id="trust-card-2" className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-[32px] backdrop-blur-md hover:border-orange-500/30 hover:bg-white/10 transition-all duration-300">
                  <span className="text-orange-400 text-xs sm:text-sm font-bold block mb-3">TRUST 02</span>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug min-h-[3rem] sm:min-h-[4rem] flex items-center">
                    24시간 무인 운영
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm font-semibold tracking-tight mt-4">
                    연중무휴 무인 시스템 운영 가능
                  </p>
                </div>

                {/* Stat block 3 */}
                <div id="trust-card-3" className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-[32px] backdrop-blur-md hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300">
                  <span className="text-purple-400 text-xs sm:text-sm font-bold block mb-3">TRUST 03</span>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug min-h-[3rem] sm:min-h-[4rem] flex items-center">
                    본사 직접 시공
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm font-semibold tracking-tight mt-4">
                    상담·설치·시공까지 본사 직접 진행
                  </p>
                </div>

                {/* Stat block 4 */}
                <div id="trust-card-4" className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-[32px] backdrop-blur-md hover:border-emerald-500/30 hover:bg-white/10 transition-all duration-300">
                  <span className="text-emerald-400 text-xs sm:text-sm font-bold block mb-3">TRUST 04</span>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug min-h-[3rem] sm:min-h-[4rem] flex items-center">
                    검증된 창업 모델
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm font-semibold tracking-tight mt-4">
                    실제 매장 운영 경험으로 구성된 시스템
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* 4. Powerful CTA Section */}
          <div className="reveal-text max-w-5xl mx-auto mt-28">
            <div className="relative rounded-[40px] overflow-hidden bg-[#0a1224] p-10 sm:p-14 border border-blue-900/40 shadow-[0_30px_70px_rgba(0,0,0,0.35)] text-center">
              {/* Radial gradient background lights */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/60 via-transparent to-orange-950/20 pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] bg-gradient-to-r from-blue-600/15 to-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                {/* Pulsing high contrast badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-extrabold text-sm sm:text-base px-6 py-2.5 rounded-2xl shadow-lg shadow-orange-500/20 tracking-wider mb-6">
                  <Phone className="w-4 h-4 fill-white animate-pulse" />
                  창업 문의 환영
                </div>
                
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-snug mb-4">
                  성공적인 무인 오토 창업 파트너, <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">제이엘에스와 부담 없이 시작하세요!</span>
                </h3>
                <p className="text-slate-400 font-medium text-sm sm:text-base md:text-lg tracking-tight mb-10 max-w-2xl">
                  아래 간단한 문의를 접수해 주시면 원하는 희망 지역권의 상권 보고서와 초기 설계 수익 추정 시뮬레이션을 전액 무상 지원합니다.
                </p>
                
                {/* Call & CTA Buttons Container */}
                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center w-full">
                  <div className="bg-white/5 border border-white/10 rounded-[24px] px-8 py-4 flex flex-col items-center sm:items-start group transition-all duration-300 hover:border-blue-500/55 w-full sm:w-auto">
                    <span className="text-slate-400 text-xs font-bold block tracking-wider uppercase mb-1">본사 다이렉트 긴급 개설 라인</span>
                    <a href="tel:1544-4788" className="text-3xl sm:text-4xl font-black text-blue-400 tracking-tighter hover:text-blue-300 transition-colors">
                      1544-4788
                    </a>
                  </div>
                  
                  <button 
                    onClick={handleScrollToForm}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black px-12 py-5 sm:py-6 rounded-[24px] text-lg sm:text-xl shadow-xl shadow-blue-900/30 transition-all duration-300 hover:shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-3 group"
                  >
                    <span>무료 창업 상담 신청</span>
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ & CONTACT */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 relative reveal-text">
          <div className={`rounded-[60px] p-12 md:p-20 shadow-inner overflow-hidden border transition-all duration-700 ease-out ${
            isHighlighted 
              ? 'bg-blue-50 border-primary scale-[1.02] ring-8 ring-primary/15 shadow-[0_30px_60px_-15px_rgba(30,64,175,0.2)]' 
              : 'bg-blue-50/50 border-blue-100 scale-100 ring-0'
          }`}>
            <h3 className="text-4xl font-black mb-4 text-center">창업 상담 신청</h3>
            <p className="text-gray-400 text-center mb-12">상권 분석 리포트를 무료로 제공해 드립니다.</p>
            <form action="https://formsubmit.co/jlsports777@naver.com" method="POST" onSubmit={handleFormSubmit} className="space-y-6">
              <input type="hidden" name="_subject" value="[창업 상담 신청] 새로운 상담 신청" />
              <input type="hidden" name="_captcha" value="false" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  ref={nameInputRef}
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={submitting}
                  placeholder="성함" 
                  className="bg-white border border-gray-200 rounded-2xl px-6 py-4 outline-none transition-all shadow-sm focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-400" 
                />
                <input 
                  type="text" 
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  disabled={submitting}
                  placeholder="희망 지역" 
                  className="bg-white border border-gray-200 rounded-2xl px-6 py-4 outline-none transition-all shadow-sm focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-400" 
                />
              </div>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={submitting}
                placeholder="연락처" 
                className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 outline-none transition-all shadow-sm focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-400" 
              />
              <textarea 
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                disabled={submitting}
                placeholder="문의 내용" 
                className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 h-40 outline-none resize-none transition-all shadow-sm focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-400"
              ></textarea>
              
              {submitMessage && (
                <div className={`p-4 rounded-xl text-center font-bold text-sm leading-relaxed ${
                  submitMessage.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {submitMessage.text}
                </div>
              )}

              <button 
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-white font-black py-6 rounded-2xl text-xl hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all active:scale-[0.98] disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>신청 접수 중...</span>
                  </>
                ) : '무료 창업 상담 예약하기'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white pt-24 pb-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <img src="https://raw.githubusercontent.com/qkqn5020-afk/qkqn5020/main/%EB%B0%B0%EB%84%88%20%EC%95%84%EC%9D%B4%EC%BD%984.png" alt="로고" className="h-12 mb-6 mx-auto md:mx-0" />
            <p className="text-gray-400 text-sm font-light">대한민국 No.1 무인 야구 배팅 센터 브랜드 BECA24</p>
          </div>
          <div className="text-center md:text-right">
            <h4 className="text-4xl md:text-5xl font-black text-blue-400 mb-2 tracking-tighter">1544-4788</h4>
            <p className="text-gray-500 text-sm font-light">주식회사 제이엘에스 151-86-02163</p>
            <p className="text-gray-500 text-sm font-light">대표: 조가비, 조현은</p>
            <p className="text-gray-500 text-sm font-light">경상남도 김해시 대동면 산단중앙로 190-31</p>
            <p className="text-gray-500 text-sm font-light">jlsports777@naver.com</p>
            <p className="text-gray-600 text-[10px] mt-6">© 2024 BECA24 Baseball Technology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;