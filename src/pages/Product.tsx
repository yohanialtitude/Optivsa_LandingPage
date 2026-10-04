import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Cpu, 
  Zap, 
  Layers, 
  Server, 
  ShieldCheck, 
  Activity, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Sliders, 
  Database, 
  Lock, 
  Code2, 
  Sparkles, 
  ChevronRight, 
  X, 
  Share2, 
  BookOpen, 
  Flame, 
  Gauge, 
  Clock, 
  HardDrive, 
  ExternalLink,
  Bot
} from 'lucide-react';
import { RecaptchaCheckbox } from '../components/RecaptchaCheckbox';
import { submitContact } from '../utils/contact';

const injectFonts = () => {
  if (typeof document === 'undefined') return;
  const linkId = 'optivsa-custom-fonts';
  if (!document.getElementById(linkId)) {
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=JetBrains+Mono:ital,wght@0,400..700;1,400..700&family=Manrope:wght@300..800&display=swap';
    document.head.appendChild(link);
  }
};

export function Product() {
  const navigate = useNavigate();

  useEffect(() => {
    injectFonts();
  }, []);

  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactUseCase, setContactUseCase] = useState('');
  const [contactCaptchaToken, setContactCaptchaToken] = useState('');
  const [contactCaptchaReset, setContactCaptchaReset] = useState(0);
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactNote, setContactNote] = useState('');
  const [activePipelineStep, setActivePipelineStep] = useState(2);
  const [hardwareTier, setHardwareTier] = useState('P5_H100'); // 'P4_A100' or 'P5_H100'
  const [dashboardTab, setDashboardTab] = useState('quantization'); // quantization, telemetry, hardware, guardrails
  
  // Interactive Simulation Controls
  const [targetPrecision, setTargetPrecision] = useState('INT8');
  const [batchSize, setBatchSize] = useState(64);
  const [isQuantizing, setIsQuantizing] = useState(false);
  const [quantComplete, setQuantComplete] = useState(false);

  const handleStartQuantization = () => {
    setIsQuantizing(true);
    setQuantComplete(false);
    setTimeout(() => {
      setIsQuantizing(false);
      setQuantComplete(true);
    }, 1800);
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contactCaptchaToken) {
      setContactStatus('error');
      setContactNote('Please complete the reCAPTCHA checkbox before sending your request.');
      return;
    }

    setContactStatus('loading');
    setContactNote('');
    try {
      await submitContact({
        email: contactEmail,
        role: hardwareTier,
        message: contactUseCase,
        captchaToken: contactCaptchaToken
      });
      setContactStatus('success');
      setContactNote('Request received. We usually reply within two working days.');
      setContactEmail('');
      setContactUseCase('');
      setContactCaptchaToken('');
      setContactCaptchaReset((value) => value + 1);
    } catch (error) {
      setContactStatus('error');
      setContactCaptchaToken('');
      setContactCaptchaReset((value) => value + 1);
      const reason = error instanceof Error ? ` ${error.message}` : '';
      setContactNote(`We could not send that.${reason} Please email contact@optivsa.net directly.`);
    }
  };

  const pipelineSteps = [
    {
      id: 0,
      badge: '01. DATA INGEST',
      title: 'Raw Decision Data & Weights',
      sdk: 'Telemetry Ingestion',
      desc: 'High-frequency streaming telemetry & multi-agent decision parameters loaded directly into host-shared memory vectors.',
      metric: '850 GB/s Ingestion',
      icon: Database
    },
    {
      id: 1,
      badge: '02. RAPIDS ETL',
      title: 'cuDF Data Processing & Vectorization',
      sdk: 'NVIDIA RAPIDS',
      desc: 'Zero-copy feature engineering directly inside GPU VRAM eliminating CPU-to-GPU bus transfer bottlenecks.',
      metric: '0.12ms Vector Transform',
      icon: Zap
    },
    {
      id: 2,
      badge: '03. OPTIMIZATION',
      title: 'Quantization & Layer Fusion',
      sdk: 'TensorRT Model Optimizer / NeMo',
      desc: 'Post-Training Quantization (PTQ) and QAT with custom weight pruning & dynamic attention layer fusion.',
      metric: '4x Compression Ratio',
      icon: Sliders
    },
    {
      id: 3,
      badge: '04. RUNTIME COMPILE',
      title: 'Compiled Engine Artifacts',
      sdk: 'NVIDIA TensorRT Engine',
      desc: 'Deterministic FP16 & INT8 engine binary generation target-optimized for NVIDIA Hopper & Ampere microarchitecture.',
      metric: 'sub-ms Kernel Bounds',
      icon: Cpu
    },
    {
      id: 4,
      badge: '05. ORCHESTRATION',
      title: 'Concurrent Dynamic Batching',
      sdk: 'NVIDIA Triton Inference Server',
      desc: 'Multi-tenant GPU VRAM partition serving isolated scoring models with zero resource contention.',
      metric: '99.999% SLA Guarantee',
      icon: Server
    },
    {
      id: 5,
      badge: '06. EXECUTION',
      title: 'Real-Time Decision Intelligence',
      sdk: 'OptiVSA Core Platform',
      desc: 'Sub-millisecond dynamic pricing, algorithmic risk evaluation, and low-latency edge dispatch.',
      metric: '< 0.85ms End-To-End',
      icon: Activity
    }
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-[#FCFCFD] text-[#0D0D11] font-['Manrope',sans-serif] selection:bg-[#F63049] selection:text-white">
      {}


      {}
      <section className="relative px-4 sm:px-6 lg:px-12 pt-12 pb-20 border-b border-gray-200/80 bg-gradient-to-b from-[#FAFAFC] via-[#FCFCFD] to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-['JetBrains_Mono',monospace] text-xs font-semibold uppercase tracking-widest text-[#F63049] bg-[#F63049]/10 px-3 py-1.5 rounded-full border border-[#F63049]/20">
                DECISION ENGINE
              </span>
              <span className="font-['JetBrains_Mono',monospace] text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                AI MODEL OPTIMIZATION
              </span>
              <span className="font-['JetBrains_Mono',monospace] text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#F63049]" /> AWS GPU ACCELERATED
              </span>
            </div>

            <h1 className="font-['Bricolage_Grotesque',sans-serif] text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#0D0D11] leading-[0.95] uppercase">
              DEPLOY THE <br />
              <span className="text-[#F63049]">MODEL YOU CAN</span> <br />
              PROVE IS RIGHT.
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl">
              OptiVSA organizes your neural networks, optimization benchmarks, and throughput constraints into one sub-millisecond decision intelligence workspace. Bypassing von Neumann bottlenecks via pure GPU-native pipelines.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="https://portal.optivsa.net"
                target="_blank"
                rel="noreferrer"
                className="bg-[#F63049] hover:bg-[#d9263d] text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-[#F63049]/25 hover:shadow-xl hover:shadow-[#F63049]/35 transition-all duration-300 flex items-center gap-3 text-base group"
              >
                <span>Explore the Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button 
                onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
                className="bg-white hover:bg-gray-50 text-[#0D0D11] font-semibold px-8 py-4 rounded-full border border-gray-300 shadow-sm hover:border-gray-400 transition-all duration-300 flex items-center gap-2 text-base"
              >
                <span>Contact us</span>
                <ExternalLink className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Micro stats banner */}
            <div className="pt-6 border-t border-gray-200/80 grid grid-cols-3 gap-6 font-['JetBrains_Mono',monospace]">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">LATENCY SINK</p>
                <p className="text-2xl font-bold text-[#0D0D11] mt-1">&lt; 0.85 ms</p>
                <p className="text-[11px] text-[#F63049]">Deterministic Bound</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">GPU RAM LIMIT</p>
                <p className="text-2xl font-bold text-[#0D0D11] mt-1">&le; 12 GB</p>
                <p className="text-[11px] text-gray-600">Strict Edge Budget</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">THROUGHPUT</p>
                <p className="text-2xl font-bold text-[#0D0D11] mt-1">14,200 <span className="text-xs font-normal">rps</span></p>
                <p className="text-[11px] text-emerald-600">+310% vs CPU Host</p>
              </div>
            </div>
          </div>

          {/* Right Hero Column - Interactive Simulation Card Preview */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#F63049]/20 to-gray-200 rounded-3xl blur-xl opacity-60"></div>
            
            <div className="relative bg-white/90 backdrop-blur-md border border-gray-200/90 rounded-2xl p-6 shadow-2xl space-y-6">
              
              {/* Card Header */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 font-['JetBrains_Mono',monospace] text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F63049]"></span>
                  <span className="font-semibold text-gray-900">OPTIMIZATION STUDY / STD-118</span>
                </div>
                <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded">ENV / A100 - TRT - FP16</span>
              </div>

              {/* Interactive Diagram Placeholder */}
              <div className="bg-[#FAFAFC] border border-gray-200/80 rounded-xl p-5 relative overflow-hidden">
                <div className="flex justify-between items-center text-xs font-['JetBrains_Mono',monospace] text-gray-500 mb-3">
                  <span>DECISION PATHWAY</span>
                  <span className="text-[#F63049] font-medium">PASS: CONSTRAINT MET</span>
                </div>

                {/* Constraint Floating Badge */}
                <div className="bg-white border border-[#F63049]/30 shadow-md p-3.5 rounded-lg my-2 relative z-10">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-['JetBrains_Mono',monospace] text-gray-500 uppercase text-[10px]">CONSTRAINT RULE</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">VALIDATED</span>
                  </div>
                  <div className="font-['JetBrains_Mono',monospace] text-sm font-bold text-gray-900">
                    GPU memory &le; 12 GB
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-[#F63049] h-full w-[#60%] rounded-full"></div>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1.5 font-['JetBrains_Mono',monospace]">
                    Candidate Model B satisfies (7.8 GB Peak allocated)
                  </p>
                </div>

                {/* Micro chart simulation */}
                <div className="mt-4 pt-3 border-t border-gray-200/60 grid grid-cols-2 gap-3 font-['JetBrains_Mono',monospace]">
                  <div className="bg-white p-2.5 rounded border border-gray-100">
                    <span className="text-[10px] text-gray-400 uppercase block">LATENCY (P99)</span>
                    <span className="text-lg font-bold text-gray-900">0.42 ms</span>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-gray-100">
                    <span className="text-[10px] text-gray-400 uppercase block">PRECISION</span>
                    <span className="text-lg font-bold text-[#F63049]">INT8 (PTQ)</span>
                  </div>
                </div>
              </div>

              {/* Tradeoff Floating Tooltip */}
              <div className="bg-gradient-to-r from-gray-900 to-[#1A1A22] text-white p-4 rounded-xl font-['JetBrains_Mono',monospace] text-xs flex justify-between items-center shadow-lg">
                <div>
                  <div className="text-[#F63049] font-bold text-[10px] uppercase tracking-wider mb-0.5">EVALUATION RESULT</div>
                  <p className="text-gray-200 text-xs font-sans">
                    +2.1% accuracy gain with 3.8x lower latency in same VRAM bound.
                  </p>
                </div>
                <button 
                  onClick={() => setDashboardOpen(true)}
                  className="bg-[#F63049] hover:bg-white hover:text-[#0D0D11] text-white px-3 py-2 rounded text-[11px] font-bold transition-colors whitespace-nowrap ml-3"
                >
                  RUN TEST
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {}
      <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="border-b-2 border-black pb-4 mb-12 flex justify-between items-end">
          <div>
            <span className="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#F63049] uppercase tracking-widest block mb-1">
              VOL. 04 — ARCHITECTURAL MANIFESTO
            </span>
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-3xl sm:text-4xl font-extrabold text-[#0D0D11] uppercase tracking-tight">
              Eliminating the von Neumann Bottleneck
            </h2>
          </div>
          <span className="hidden sm:block font-['JetBrains_Mono',monospace] text-xs text-gray-500">
            PRODUCTION DOMAIN: <strong className="text-black">OPTIVSA.NET</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Editorial Text - Column 1 */}
          <div className="lg:col-span-7 space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed font-sans">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#F63049] first-letter:float-left first-letter:mr-3 first-letter:font-['Bricolage_Grotesque']">
              OptiVSA is an enterprise-grade AI model optimization and real-time decision engine platform. The system automatically ingests, compresses, quantizes, and compiles high-parameter neural network topologies into ultra-low-latency deployment artifacts.
            </p>
            <p>
              Modern financial risk evaluation, dynamic pricing engines, and edge-device algorithmic dispatch cannot afford the unpredictable latency spikes caused by traditional CPU-to-GPU memory transfers. Under dense multi-agent decision graphs, standard pipelines suffer severe memory thrashing.
            </p>
            
            {/* Pulled Quote Box */}
            <blockquote className="my-8 pl-6 border-l-4 border-[#F63049] italic font-['Bricolage_Grotesque',sans-serif] text-xl sm:text-2xl text-gray-900 bg-[#FAFAFC] py-4 pr-4 rounded-r-lg">
              "By binding each processing microservice directly to specialized NVIDIA SDKs, we bypass traditional CPU limitations and deliver sub-millisecond execution windows."
            </blockquote>

            <p>
              Through containerized microservices managed via Amazon Elastic Kubernetes Service (EKS) and the NVIDIA Container Toolkit, OptiVSA exposes low-level GPU primitives directly to container runtimes, ensuring zero-copy operations across the entire execution loop.
            </p>
          </div>

          {/* Technical Spec Sidebar - Column 2 */}
          <div className="lg:col-span-5 bg-[#FAFAFC] border border-gray-200/80 rounded-2xl p-6 sm:p-8 space-y-6 self-start">
            <h3 className="font-['Bricolage_Grotesque',sans-serif] text-xl font-bold text-gray-900 uppercase pb-3 border-b border-gray-200 flex items-center justify-between">
              <span>Core Tech Stack</span>
              <Code2 className="w-5 h-5 text-[#F63049]" />
            </h3>

            <div className="space-y-4 font-['JetBrains_Mono',monospace] text-xs">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase tracking-wider mb-1">DEEP LEARNING & OPTIMIZATION</span>
                <p className="font-semibold text-gray-900 bg-white p-2.5 rounded border border-gray-200/60">
                  PyTorch / Torch-TensorRT (Tokenization, Weight Pruning, Layer Fusion)
                </p>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase tracking-wider mb-1">DATA VECTORIZATION & ETL</span>
                <p className="font-semibold text-gray-900 bg-white p-2.5 rounded border border-gray-200/60">
                  NVIDIA RAPIDS (cuDF, cuML), Pandas, Scikit-learn
                </p>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase tracking-wider mb-1">CONTAINER RUNTIME ACCELERATION</span>
                <p className="font-semibold text-gray-900 bg-white p-2.5 rounded border border-gray-200/60">
                  Amazon EKS + Docker + NVIDIA Container Toolkit
                </p>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase tracking-wider mb-1">INFERENCE ORCHESTRATION</span>
                <p className="font-semibold text-gray-900 bg-white p-2.5 rounded border border-gray-200/60">
                  NVIDIA Triton Inference Server (Dynamic Batching & Shared VRAM)
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => setDashboardOpen(true)}
                className="w-full bg-[#0D0D11] hover:bg-[#F63049] text-white py-3 rounded-lg font-semibold text-xs font-['JetBrains_Mono',monospace] uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
              >
                <span>Launch Architecture Sandbox</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {}
        <div className="mt-16 bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-200 mb-6 gap-4">
            <div>
              <span className="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#F63049] uppercase">
                PIPELINE DIAGRAM
              </span>
              <h3 className="font-['Bricolage_Grotesque',sans-serif] text-2xl font-bold text-gray-900">
                End-To-End GPU Acceleration Pathway
              </h3>
            </div>
            <span className="text-xs font-['JetBrains_Mono',monospace] text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
              Click steps to preview stage specs
            </span>
          </div>

          {/* Flowchart Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
            {pipelineSteps.map((step) => {
              const Icon = step.icon;
              const isActive = activePipelineStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActivePipelineStep(step.id)}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between relative ${
                    isActive 
                      ? 'bg-[#0D0D11] text-white border-[#0D0D11] shadow-lg ring-2 ring-[#F63049]' 
                      : 'bg-[#FAFAFC] hover:bg-gray-100 text-gray-900 border-gray-200/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[9px] font-['JetBrains_Mono',monospace] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isActive ? 'bg-[#F63049] text-white' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {step.badge.split('.')[0]}
                      </span>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#F63049]' : 'text-gray-500'}`} />
                    </div>
                    <h4 className="font-['Bricolage_Grotesque',sans-serif] text-sm font-bold mb-1 leading-snug">
                      {step.title}
                    </h4>
                    <p className={`text-[11px] font-['JetBrains_Mono',monospace] ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                      {step.sdk}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-gray-700/30 text-[10px] font-['JetBrains_Mono',monospace] font-bold text-[#F63049]">
                    {step.metric}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Detail Drawer */}
          <div className="mt-6 bg-[#FAFAFC] border border-gray-200/80 p-5 rounded-xl font-['JetBrains_Mono',monospace] text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[#F63049] font-bold text-[10px] uppercase tracking-wider block mb-0.5">
                STAGE DETAIL — {pipelineSteps[activePipelineStep].badge}
              </span>
              <h4 className="font-['Bricolage_Grotesque',sans-serif] text-lg font-bold text-gray-900 font-sans">
                {pipelineSteps[activePipelineStep].title} ({pipelineSteps[activePipelineStep].sdk})
              </h4>
              <p className="text-gray-600 text-xs mt-1 font-sans max-w-3xl">
                {pipelineSteps[activePipelineStep].desc}
              </p>
            </div>
            <div className="bg-white border border-gray-300 px-4 py-2 rounded-lg font-bold text-gray-900 whitespace-nowrap">
              {pipelineSteps[activePipelineStep].metric}
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-[#FAFAFC] border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#F63049] uppercase tracking-widest bg-[#F63049]/10 px-3 py-1 rounded-full">
              SDK INTEGRATION MATRIX
            </span>
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#0D0D11] uppercase tracking-tight">
              Strategic NVIDIA Technical Alignment
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Each microservice is bound directly to a specialized NVIDIA SDK to eliminate CPU host memory delays and achieve sub-millisecond execution.
            </p>
          </div>

          {/* 3 Major Feature Editorial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1: RAPIDS */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 shadow-sm flex flex-col justify-between hover:border-[#F63049]/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F63049]/10 flex items-center justify-center text-[#F63049] mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#F63049] uppercase tracking-wider block mb-2">
                  01. FEATURE PIPELINES
                </span>
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-2xl font-bold text-gray-900 mb-4">
                  NVIDIA RAPIDS
                </h3>

                <div className="space-y-4 text-xs font-['JetBrains_Mono',monospace] mb-6">
                  <div className="bg-red-50/50 p-3 rounded-lg border border-red-100 text-red-900">
                    <strong className="block text-[10px] uppercase text-red-600 mb-1">THE BOTTLENECK</strong>
                    High-frequency telemetry processed on CPU leads to memory thrashing and execution delays under multi-tenant load.
                  </div>
                  <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 text-emerald-900">
                    <strong className="block text-[10px] uppercase text-emerald-600 mb-1">OUR IMPLEMENTATION</strong>
                    cuDF and cuML process, transform, and vectorize raw telemetry streams directly within GPU VRAM prior to inference.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 font-['JetBrains_Mono',monospace] text-xs flex justify-between items-center text-gray-500">
                <span>VRAM ETL Acceleration</span>
                <strong className="text-gray-900">12x Faster</strong>
              </div>
            </div>

            {/* Feature 2: TensorRT & Model Optimizer */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 shadow-sm flex flex-col justify-between hover:border-[#F63049]/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F63049]/10 flex items-center justify-center text-[#F63049] mb-6">
                  <Sliders className="w-6 h-6" />
                </div>
                <span className="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#F63049] uppercase tracking-wider block mb-2">
                  02. COMPRESSION & QUANT
                </span>
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-2xl font-bold text-gray-900 mb-4">
                  TensorRT & Optimizer
                </h3>

                <div className="space-y-4 text-xs font-['JetBrains_Mono',monospace] mb-6">
                  <div className="bg-red-50/50 p-3 rounded-lg border border-red-100 text-red-900">
                    <strong className="block text-[10px] uppercase text-red-600 mb-1">THE BOTTLENECK</strong>
                    Unoptimized deep learning models introduce latency spikes that degrade real-time automated scoring and rule execution.
                  </div>
                  <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 text-emerald-900">
                    <strong className="block text-[10px] uppercase text-emerald-600 mb-1">OUR IMPLEMENTATION</strong>
                    Post-Training Quantization (PTQ) & QAT via ONNX exports. Fused FP16 and INT8 engine binaries yield deterministic speed.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 font-['JetBrains_Mono',monospace] text-xs flex justify-between items-center text-gray-500">
                <span>Quantization Modes</span>
                <strong className="text-gray-900">FP16 / INT8 PTQ</strong>
              </div>
            </div>

            {/* Feature 3: Triton Server */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-8 shadow-sm flex flex-col justify-between hover:border-[#F63049]/40 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F63049]/10 flex items-center justify-center text-[#F63049] mb-6">
                  <Server className="w-6 h-6" />
                </div>
                <span className="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#F63049] uppercase tracking-wider block mb-2">
                  03. SERVING ORCHESTRATION
                </span>
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-2xl font-bold text-gray-900 mb-4">
                  Triton Server
                </h3>

                <div className="space-y-4 text-xs font-['JetBrains_Mono',monospace] mb-6">
                  <div className="bg-red-50/50 p-3 rounded-lg border border-red-100 text-red-900">
                    <strong className="block text-[10px] uppercase text-red-600 mb-1">THE BOTTLENECK</strong>
                    Mixed multi-model workloads create GPU memory resource contention and poor utilization across request spikes.
                  </div>
                  <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 text-emerald-900">
                    <strong className="block text-[10px] uppercase text-emerald-600 mb-1">OUR IMPLEMENTATION</strong>
                    Dynamic batching, concurrent engine execution, and zero-copy shared GPU memory allocations guarantee high throughput.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 font-['JetBrains_Mono',monospace] text-xs flex justify-between items-center text-gray-500">
                <span>GPU Execution</span>
                <strong className="text-gray-900">Shared VRAM Isolation</strong>
              </div>
            </div>

          </div>

        </div>
      </section>

      {}
      <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#F63049] uppercase tracking-widest bg-[#F63049]/10 px-3 py-1 rounded-full">
              AWS INFRASTRUCTURE JUSTIFICATION
            </span>
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-3xl sm:text-4xl font-extrabold text-[#0D0D11] uppercase tracking-tight">
              Hardware Migration: EC2 P4d to EC2 P5 (NVIDIA H100)
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              OptiVSA’s optimization pipeline dynamically evaluates complex model weights while concurrently processing real-time decision requests. The NVIDIA H100’s Transformer Engine and high HBM3 memory bandwidth are essential for holding massive quantized weight tensors in VRAM without causing Out-Of-Memory (OOM) faults or memory swap delays.
            </p>

            <div className="bg-[#FAFAFC] border border-gray-200/80 p-6 rounded-2xl space-y-4">
              <h4 className="font-['Bricolage_Grotesque',sans-serif] font-bold text-gray-900 uppercase text-lg">
                Technical Highlights
              </h4>
              <ul className="space-y-3 font-['JetBrains_Mono',monospace] text-xs text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F63049] mt-0.5 shrink-0" />
                  <span><strong>Transformer Engine FP8/FP16:</strong> Automatic dynamic precision adjustments without loss of accuracy.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F63049] mt-0.5 shrink-0" />
                  <span><strong>HBM3 Memory Bandwidth:</strong> 3.35 TB/s throughput prevents memory swap latency spikes.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F63049] mt-0.5 shrink-0" />
                  <span><strong>Zero OOM Guarantee:</strong> Allows continuous weight quantization during peak multi-tenant load.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Benchmark Comparison Toggle */}
          <div className="lg:col-span-6 bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-md">
            <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
              <div>
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-xl font-bold text-gray-900">
                  Target Hardware Benchmarks
                </h3>
                <p className="text-xs font-['JetBrains_Mono',monospace] text-gray-500">
                  Toggle compute tier to compare performance metrics
                </p>
              </div>

              {/* Toggle Buttons */}
              <div className="bg-gray-100 p-1 rounded-xl flex font-['JetBrains_Mono',monospace] text-xs">
                <button
                  onClick={() => setHardwareTier('P4_A100')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    hardwareTier === 'P4_A100' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  EC2 P4de (A100)
                </button>
                <button
                  onClick={() => setHardwareTier('P5_H100')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    hardwareTier === 'P5_H100' ? 'bg-[#F63049] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  EC2 P5 (H100 Target)
                </button>
              </div>
            </div>

            {/* Benchmark Display Card */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 font-['JetBrains_Mono',monospace]">
                <div className="bg-[#FAFAFC] p-4 rounded-xl border border-gray-200/80">
                  <span className="text-[10px] text-gray-400 uppercase block mb-1">GPU ACCELERATOR</span>
                  <span className="text-xl font-bold text-gray-900">
                    {hardwareTier === 'P5_H100' ? 'NVIDIA H100 80GB' : 'NVIDIA A100 80GB'}
                  </span>
                  <span className="text-[11px] text-[#F63049] block mt-1">
                    {hardwareTier === 'P5_H100' ? 'Hopper Architecture' : 'Ampere Architecture'}
                  </span>
                </div>

                <div className="bg-[#FAFAFC] p-4 rounded-xl border border-gray-200/80">
                  <span className="text-[10px] text-gray-400 uppercase block mb-1">MEMORY BANDWIDTH</span>
                  <span className="text-xl font-bold text-gray-900">
                    {hardwareTier === 'P5_H100' ? '3,350 GB/s' : '2,039 GB/s'}
                  </span>
                  <span className="text-[11px] text-emerald-600 block mt-1">
                    {hardwareTier === 'P5_H100' ? '+64% Speedup' : 'Baseline'}
                  </span>
                </div>
              </div>

              {/* Progress metric bars */}
              <div className="space-y-4 font-['JetBrains_Mono',monospace] text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Decision Telemetry Ingestion Throughput</span>
                    <span className="font-bold text-gray-900">
                      {hardwareTier === 'P5_H100' ? '48,000 rps' : '18,500 rps'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#F63049] h-full transition-all duration-500 rounded-full"
                      style={{ width: hardwareTier === 'P5_H100' ? '100%' : '40%' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Model Quantization Compile Time (70B Model)</span>
                    <span className="font-bold text-gray-900">
                      {hardwareTier === 'P5_H100' ? '4.2 minutes' : '14.8 minutes'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#0D0D11] h-full transition-all duration-500 rounded-full"
                      style={{ width: hardwareTier === 'P5_H100' ? '28%' : '85%' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">P99 Latency under 500 Concurrent Decision Threads</span>
                    <span className="font-bold text-gray-900">
                      {hardwareTier === 'P5_H100' ? '0.38 ms' : '1.12 ms'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
                      style={{ width: hardwareTier === 'P5_H100' ? '25%' : '75%' }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button 
                  onClick={() => setContactOpen(true)}
                  className="text-xs font-['JetBrains_Mono',monospace] text-[#F63049] font-bold hover:underline inline-flex items-center space-x-1"
                >
                  <span>Request full AWS benchmark report PDF</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-[#0D0D11] text-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-6 border-b border-gray-800 gap-6">
            <div>
              <span className="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#F63049] uppercase tracking-widest block mb-2">
                ADVANCED ROADMAP — Q3-Q4 PLANNING
              </span>
              <h2 className="font-['Bricolage_Grotesque',sans-serif] text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
                Next-Gen Ecosystem Upgrades
              </h2>
            </div>
            <p className="text-gray-400 max-w-md text-sm font-sans">
              Expanding strategic alignment with NVIDIA AI Enterprise software stack for standardized deployment and deterministic policy enforcement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Roadmap Item 1: NVIDIA NIM */}
            <div className="bg-[#171720] border border-gray-800 rounded-2xl p-8 hover:border-[#F63049]/50 transition-all space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-[#F63049]/20 text-[#F63049] flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="font-['JetBrains_Mono',monospace] text-xs font-bold bg-[#F63049] text-white px-3 py-1 rounded-full uppercase">
                  Q3 INITIATIVE
                </span>
              </div>

              <div>
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-2xl font-bold text-white mb-2">
                  NVIDIA NIM (Inference Microservices)
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  Containerizing optimized TensorRT engine artifacts into standardized NIM microservices. This streamlines enterprise blueprint deployment across multi-cloud EKS clusters and drastically reduces cold-start auto-scaling delays.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-800 font-['JetBrains_Mono',monospace] text-xs space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-500">Target Outcome:</span>
                  <strong className="text-white">Sub-second pod cold-start</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Blueprint Standard:</span>
                  <strong className="text-white">OCI-Compliant Container Images</strong>
                </div>
              </div>
            </div>

            {/* Roadmap Item 2: NVIDIA NeMo Guardrails */}
            <div className="bg-[#171720] border border-gray-800 rounded-2xl p-8 hover:border-[#F63049]/50 transition-all space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-[#F63049]/20 text-[#F63049] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="font-['JetBrains_Mono',monospace] text-xs font-bold bg-[#F63049] text-white px-3 py-1 rounded-full uppercase">
                  Q4 INITIATIVE
                </span>
              </div>

              <div>
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-2xl font-bold text-white mb-2">
                  NVIDIA NeMo Guardrails Integration
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  Integrating programmable safety rails and domain boundary enforcement directly into the real-time decision graph pipeline. Guarantees deterministic rule bounds and prevents policy hallucinations during automated dispatch.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-800 font-['JetBrains_Mono',monospace] text-xs space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-500">Target Outcome:</span>
                  <strong className="text-white">Zero Policy Drift Guarantee</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Latency Overhead:</span>
                  <strong className="text-white">&lt; 0.05 ms Guardrail Overhead</strong>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {}
      {dashboardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-[#0D0D11] text-white p-6 flex justify-between items-center border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-[#F63049]"></div>
                <div>
                  <h3 className="font-['Bricolage_Grotesque',sans-serif] text-xl font-bold uppercase tracking-tight">
                    OptiVSA Interactive Control Workspace
                  </h3>
                  <p className="font-['JetBrains_Mono',monospace] text-xs text-gray-400">
                    LIVE SIMULATION ENGINE — OPTIVSA.NET DEMO
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setDashboardOpen(false)}
                className="text-gray-400 hover:text-white p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Workspace Navigation Tabs */}
            <div className="bg-gray-100 border-b border-gray-200 px-6 pt-3 flex space-x-2 font-['JetBrains_Mono',monospace] text-xs overflow-x-auto">
              <button
                onClick={() => setDashboardTab('quantization')}
                className={`px-4 py-2.5 rounded-t-lg font-bold transition-colors ${
                  dashboardTab === 'quantization' ? 'bg-white text-[#F63049] border-t-2 border-[#F63049]' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                1. Quantization Studio
              </button>
              <button
                onClick={() => setDashboardTab('telemetry')}
                className={`px-4 py-2.5 rounded-t-lg font-bold transition-colors ${
                  dashboardTab === 'telemetry' ? 'bg-white text-[#F63049] border-t-2 border-[#F63049]' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                2. Decision Telemetry
              </button>
              <button
                onClick={() => setDashboardTab('guardrails')}
                className={`px-4 py-2.5 rounded-t-lg font-bold transition-colors ${
                  dashboardTab === 'guardrails' ? 'bg-white text-[#F63049] border-t-2 border-[#F63049]' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                3. NeMo Guardrail Monitor
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {dashboardTab === 'quantization' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <label className="block text-xs font-['JetBrains_Mono',monospace] font-bold text-gray-700 uppercase">
                        Target Precision Scheme
                      </label>
                      <div className="grid grid-cols-2 gap-2 font-['JetBrains_Mono',monospace] text-xs">
                        {['FP16', 'INT8', 'FP8', 'INT4'].map((prec) => (
                          <button
                            key={prec}
                            onClick={() => setTargetPrecision(prec)}
                            className={`p-3 rounded-lg font-bold border transition-all ${
                              targetPrecision === prec 
                                ? 'bg-[#0D0D11] text-white border-[#0D0D11]' 
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-200'
                            }`}
                          >
                            {prec}
                          </button>
                        ))}
                      </div>

                      <div className="pt-2">
                        <label className="block text-xs font-['JetBrains_Mono',monospace] font-bold text-gray-700 uppercase mb-2">
                          Batch Size Limit: <span className="text-[#F63049]">{batchSize}</span>
                        </label>
                        <input 
                          type="range" 
                          min="1" 
                          max="256" 
                          value={batchSize}
                          onChange={(e) => setBatchSize(Number(e.target.value))}
                          className="w-full accent-[#F63049]"
                        />
                      </div>

                      <button
                        onClick={handleStartQuantization}
                        disabled={isQuantizing}
                        className="w-full bg-[#F63049] hover:bg-[#d9263d] disabled:opacity-50 text-white py-3 rounded-lg font-bold font-['JetBrains_Mono',monospace] text-xs uppercase tracking-wider transition-colors shadow-md"
                      >
                        {isQuantizing ? 'Compressing Weights...' : 'Execute TensorRT Quantization'}
                      </button>
                    </div>

                    <div className="md:col-span-2 bg-[#FAFAFC] border border-gray-200 rounded-xl p-5 font-['JetBrains_Mono',monospace] space-y-4">
                      <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200">
                        <span className="font-bold text-gray-900">QUANTIZATION COMPILER LOGS</span>
                        <span className="text-emerald-600 font-bold">NV-TRT-OPT-V3</span>
                      </div>

                      <div className="bg-[#0D0D11] text-emerald-400 p-4 rounded-lg text-xs space-y-1.5 h-44 overflow-y-auto font-mono">
                        <p className="text-gray-500">[00:00:01] Loading PyTorch weights into GPU VRAM...</p>
                        <p className="text-gray-500">[00:00:02] Initializing TensorRT Model Optimizer PTQ...</p>
                        {isQuantizing && (
                          <>
                            <p className="text-yellow-400">[00:00:03] Fusing attention layer multi-head projections...</p>
                            <p className="text-yellow-400">[00:00:04] Applying calibration dataset for {targetPrecision} scale factor bounds...</p>
                            <p className="text-[#F63049] animate-pulse">[00:00:05] Compiling GPU Engine Binary...</p>
                          </>
                        )}
                        {quantComplete && !isQuantizing && (
                          <>
                            <p className="text-emerald-400">[00:00:06] Layer fusion complete. Reduced model weight size from 28.4GB to 7.1GB.</p>
                            <p className="text-emerald-400 font-bold">[00:00:07] OPTIMIZATION SUCCESS: P99 Latency = 0.42ms (Target MET)</p>
                          </>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center text-xs">
                        <div className="bg-white p-2.5 rounded border border-gray-200">
                          <span className="text-[10px] text-gray-400 uppercase block">VRAM SAVINGS</span>
                          <span className="font-bold text-gray-900">{targetPrecision === 'INT8' ? '74.8%' : '52.1%'}</span>
                        </div>
                        <div className="bg-white p-2.5 rounded border border-gray-200">
                          <span className="text-[10px] text-gray-400 uppercase block">SPEEDUP</span>
                          <span className="font-bold text-[#F63049]">{targetPrecision === 'INT8' ? '3.8x' : '2.1x'}</span>
                        </div>
                        <div className="bg-white p-2.5 rounded border border-gray-200">
                          <span className="text-[10px] text-gray-400 uppercase block">PERPLEXITY DRIFT</span>
                          <span className="font-bold text-emerald-600">&lt; 0.02%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {dashboardTab === 'telemetry' && (
                <div className="space-y-6 font-['JetBrains_Mono',monospace]">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="bg-[#FAFAFC] p-4 rounded-xl border border-gray-200">
                      <span className="text-[10px] text-gray-400 uppercase block">ACTIVE WORKERS</span>
                      <span className="text-2xl font-bold text-gray-900">32 Pods</span>
                    </div>
                    <div className="bg-[#FAFAFC] p-4 rounded-xl border border-gray-200">
                      <span className="text-[10px] text-gray-400 uppercase block">CURRENT THROUGPUT</span>
                      <span className="text-2xl font-bold text-[#F63049]">14,210 rps</span>
                    </div>
                    <div className="bg-[#FAFAFC] p-4 rounded-xl border border-gray-200">
                      <span className="text-[10px] text-gray-400 uppercase block">AVG LATENCY</span>
                      <span className="text-2xl font-bold text-emerald-600">0.41 ms</span>
                    </div>
                    <div className="bg-[#FAFAFC] p-4 rounded-xl border border-gray-200">
                      <span className="text-[10px] text-gray-400 uppercase block">GPU UTILIZATION</span>
                      <span className="text-2xl font-bold text-gray-900">92.4%</span>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 p-5 rounded-xl space-y-3">
                    <h4 className="font-bold text-xs uppercase text-gray-700">Live Multi-Tenant Execution Streams</h4>
                    <div className="space-y-2 text-xs">
                      {[
                        { tenant: 'Risk-Evaluation-Agent-01', model: 'RiskScore-v4-INT8', status: 'ACTIVE', latency: '0.38ms', vram: '3.2GB' },
                        { tenant: 'Dynamic-Pricing-Engine-US', model: 'PricingMatrix-FP16', status: 'ACTIVE', latency: '0.52ms', vram: '4.8GB' },
                        { tenant: 'Edge-Dispatch-Algorithmic', model: 'DispatchRoute-INT8', status: 'ACTIVE', latency: '0.29ms', vram: '2.1GB' },
                      ].map((stream, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-[#FAFAFC] p-3 rounded border border-gray-100">
                          <span className="font-bold text-gray-900">{stream.tenant}</span>
                          <span className="text-gray-500">{stream.model}</span>
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">{stream.status}</span>
                          <span className="text-gray-700 font-bold">{stream.latency}</span>
                          <span className="text-[#F63049]">{stream.vram}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {dashboardTab === 'guardrails' && (
                <div className="space-y-6 font-['JetBrains_Mono',monospace]">
                  <div className="bg-[#FAFAFC] border border-gray-200 p-6 rounded-xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm text-gray-900">NVIDIA NeMo Guardrails Enforcement Status</h4>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded">POLICY RIGID</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="p-3 bg-white rounded border border-gray-200 flex justify-between items-center">
                        <div>
                          <strong className="block text-gray-900">Financial Boundary Check</strong>
                          <span className="text-gray-500">Enforcing strict maximum leverage rule bounds on automated trades</span>
                        </div>
                        <span className="text-emerald-600 font-bold">100% PASSED</span>
                      </div>

                      <div className="p-3 bg-white rounded border border-gray-200 flex justify-between items-center">
                        <div>
                          <strong className="block text-gray-900">Out-Of-Domain Input Block</strong>
                          <span className="text-gray-500">Preventing adversarial prompt injection in multi-agent routing</span>
                        </div>
                        <span className="text-emerald-600 font-bold">0 INJECTIONS</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-[#FAFAFC] px-8 py-4 border-t border-gray-200 flex justify-between items-center">
              <span className="font-['JetBrains_Mono',monospace] text-xs text-gray-500">
                OptiVSA Inception Production Stack v3.2
              </span>
              <button
                onClick={() => setDashboardOpen(false)}
                className="bg-[#0D0D11] text-white px-6 py-2.5 rounded-lg text-xs font-['JetBrains_Mono',monospace] font-bold hover:bg-[#F63049] transition-colors"
              >
                Close Demo Dashboard
              </button>
            </div>

          </div>
        </div>
      )}

      {}
      {contactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-xl p-8 shadow-2xl relative space-y-6">
            <button 
              onClick={() => setContactOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#F63049] uppercase tracking-widest block mb-1">
                GET IN TOUCH WITH OPTIVSA
              </span>
              <h3 className="font-['Bricolage_Grotesque',sans-serif] text-3xl font-extrabold text-gray-900">
                Schedule Architecture Review
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Direct channel for enterprise infrastructure evaluation and NVIDIA GPU acceleration onboarding.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4 font-['JetBrains_Mono',monospace] text-xs">
              <div>
                <label htmlFor="product-contact-email" className="block text-gray-700 font-bold uppercase mb-1">Work Email</label>
                <input 
                  id="product-contact-email"
                  type="email" 
                  required 
                  placeholder="name@company.com" 
                  value={contactEmail}
                  onChange={(event) => setContactEmail(event.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F63049] font-sans text-sm"
                />
              </div>

              <div>
                <label htmlFor="product-contact-tier" className="block text-gray-700 font-bold uppercase mb-1">Current Compute Tier</label>
                <select id="product-contact-tier" value={hardwareTier} onChange={(event) => setHardwareTier(event.target.value)} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F63049] font-sans text-sm">
                  <option value="P4_A100">AWS EC2 P4d/P4de (A100)</option>
                  <option value="P5_H100">AWS EC2 P5 (H100 Target)</option>
                  <option value="HGX">On-Premise NVIDIA HGX</option>
                  <option value="HYBRID">Other Hybrid Cloud</option>
                </select>
              </div>

              <div>
                <label htmlFor="product-contact-use-case" className="block text-gray-700 font-bold uppercase mb-1">Technical Use Case</label>
                <textarea 
                  id="product-contact-use-case"
                  rows={3} 
                  required
                  placeholder="Describe your model parameter size, target latency budget, and decision engine throughput requirements..."
                  value={contactUseCase}
                  onChange={(event) => setContactUseCase(event.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F63049] font-sans text-sm"
                />
              </div>

              <RecaptchaCheckbox key={contactCaptchaReset} onTokenChange={setContactCaptchaToken} />

              {contactNote && (
                <p className={`text-sm ${contactStatus === 'error' ? 'text-[#D02752]' : 'text-gray-600'}`} role={contactStatus === 'error' ? 'alert' : 'status'}>
                  {contactNote}
                </p>
              )}

              <button 
                type="submit"
                disabled={contactStatus === 'loading' || contactStatus === 'success'}
                className="w-full bg-[#F63049] hover:bg-[#d9263d] text-white py-4 rounded-lg font-bold uppercase tracking-wider text-sm shadow-lg shadow-[#F63049]/20 transition-all disabled:cursor-not-allowed disabled:opacity-60"
              >
                {contactStatus === 'loading' ? 'Sending…' : contactStatus === 'success' ? 'Request sent' : 'Submit Technical Profile'}
              </button>
            </form>

            <p className="text-[11px] text-gray-400 font-['JetBrains_Mono',monospace] text-center">
              Direct Inquiries: <a href="mailto:contact@optivsa.net" className="text-gray-700 underline">contact@optivsa.net</a>
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
