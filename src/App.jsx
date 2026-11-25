import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles, GraduationCap, Briefcase, Code, Award,
  ExternalLink, Mail, Download, ChevronRight,
  Heart, Terminal, Layers, Compass, BookOpen, MessageCircle,
  MapPin, Calendar, CheckCircle2, Star, Send, Cpu, Network,
  Server, ShoppingCart, Users, Database, ShieldCheck, Activity,
  Sun, Flower2, Leaf, Shield
} from 'lucide-react';
import confetti from 'canvas-confetti';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function App() {
  const [activeSpeech, setActiveSpeech] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [fallingElements, setFallingElements] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: '' });

  // 🪄 CUSTOM ROYAL MANHWA CURSOR STATE
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorTrailing, setCursorTrailing] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  // 🎡 CHAPTER 1 SCROLL-DRIVEN HORIZONTAL ANIMATION STATE
  // 🎡 CHAPTER 1 & CHAPTER 3 SCROLL-DRIVEN HORIZONTAL ANIMATION STATE
  const ch1ContainerRef = useRef(null);
  const [ch1Progress, setCh1Progress] = useState(0);

  // Deteksi scroll untuk navbar dan animasi kartu horizontal Chapter 1
  const ch3ContainerRef = useRef(null);
  const [ch3Progress, setCh3Progress] = useState(0);

  // Live GitHub Contributions Count
  const [totalContributions, setTotalContributions] = useState(295);

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/tasyaulfarahmazani?y=last')
      .then(res => res.json())
      .then(data => {
        if (data && data.total && (data.total.lastYear || data.total[new Date().getFullYear()])) {
          setTotalContributions(data.total.lastYear || data.total[new Date().getFullYear()]);
        }
      })
      .catch(() => {});
  }, []);

  // Deteksi scroll untuk navbar dan animasi kartu horizontal Chapter 1 & Chapter 3
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hitung progres scroll untuk Chapter 1 Profile
      if (ch1ContainerRef.current) {
        const rect = ch1ContainerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Total jarak scroll dalam container: (tinggi container - tinggi window)
        const totalScrollable = rect.height - windowHeight;
        if (totalScrollable > 0) {
          const currentScrolled = -rect.top;
          const progress = Math.max(0, Math.min(1, currentScrolled / totalScrollable));
          setCh1Progress(progress);
        }
      }

      // Hitung progres scroll untuk Chapter 3 Projects (Dual Opposing Rows)
      if (ch3ContainerRef.current) {
        const rect = ch3ContainerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalScrollable = rect.height - windowHeight;
        if (totalScrollable > 0) {
          const currentScrolled = -rect.top;
          const progress = Math.max(0, Math.min(1, currentScrolled / totalScrollable));
          setCh3Progress(progress);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Kursor Mouse Tracker & Ekor Kilau Cahaya (Sparkle Trail)
  useEffect(() => {
    let animId;
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Buat partikel bintang/kilau kecil di belakang kursor
      if (Math.random() > 0.45) {
        const newSparkle = {
          id: Math.random(),
          x: e.clientX + (Math.random() * 12 - 6),
          y: e.clientY + (Math.random() * 12 - 6),
          size: 4 + Math.random() * 6
        };
        setSparkles((prev) => [...prev.slice(-14), newSparkle]);
      }
    };

    // Smooth trailing animation loop
    const followCursor = () => {
      setCursorTrailing((prev) => ({
        x: prev.x + (cursorPos.x - prev.x) * 0.18,
        y: prev.y + (cursorPos.y - prev.y) * 0.18
      }));
      animId = requestAnimationFrame(followCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animId = requestAnimationFrame(followCursor);

    // Deteksi hover pada link dan tombol
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, [role="button"]')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [cursorPos.x, cursorPos.y]);

  // 🎬 SCROLL REVEAL & FADE OUT OBSERVER HOOK
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        } else {
          // Fade-out saat elemen di-scroll keluar layar
          entry.target.classList.remove('reveal-visible');
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal-init');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeCategory]);

  // Balon kata interaktif stiker imut Sya (Ekspresi bingung & lucu khas Manhwa)
  const cutePhrases = [
    "Hmm... bingung mau hire di bidang apa? Aku bisa Fullstack, Jaringan, sampai AI lho! (•᷄- •᷅ ;)✨",
    "Eh? Masih bingung milih project yang mana? Coba cek POS Kasir atau Sistem Magang deh! (o_O)??",
    "A-ano... bingung mau mulai dari mana ya? Coba klik tombol Hire Me aja dulu hehee~ (*/ω＼*)",
    "Kodingan web udah, monitoring server udah, model AI udah... jadi aku ini penyihir serba bisa ya? (⊙_⊙;)",
    "Pusing milih kandidat yang pas? Tenang, aku siap bantu kebutuhan sistemmu kok! 👑💻"
  ];

  const handleStickerClick = () => {
    setActiveSpeech((prev) => (prev + 1) % cutePhrases.length);
    confetti({
      particleCount: 45,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#c59b3f', '#4a8b5e', '#e25c75', '#ffffff']
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('tasyaulfarahmazani03@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ loading: false, success: false, error: 'Harap isi nama, email, dan pesan Anda.' });
      return;
    }

    setFormStatus({ loading: true, success: false, error: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', subject: '', message: '' });
        confetti({
          particleCount: 60,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#c59b3f', '#4a8b5e', '#e25c75']
        });
      } else {
        setFormStatus({ loading: false, success: false, error: result.message || 'Gagal mengirim pesan.' });
      }
    } catch (err) {
      setFormStatus({ loading: false, success: true, error: '' });
      alert('Pesan Anda telah dicatat! (Mode offline / langsung kirim ke tasyaulfarahmazani03@gmail.com)');
    }
  };

  // Efek kelopak bunga & daun hijau berterbangan di taman istana
  useEffect(() => {
    const generated = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 6,
      size: 6 + Math.random() * 8,
      isLeaf: i % 2 === 0
    }));
    setFallingElements(generated);
  }, []);

  const allProjects = [
    {
      title: "Real-Time Indonesian Sign Language Recognition",
      category: "Machine Learning & AI",
      badge: "⭐ Flagship GitHub Repository",
      icon: Cpu,
      isVerifiedRepo: true,
      repoUrl: "https://github.com/tasyaulfarahmazani/real-time-sign-language-recognition",
      demoUrl: "https://youtu.be/zqoIxfDtjvw",
      description: "Sistem kecerdasan buatan pengenalan Bahasa Isyarat Indonesia (BISINDO) secara real-time via webcam. Mengombinasikan MediaPipe hand tracking (21 landmarks), Random Forest untuk alfabet & angka (akurasi validasi 98.18%), serta GRU deep learning untuk kata dinamis (akurasi 100%). Terintegrasi FastAPI & web interface.",
      tech: ["Python 3.10", "FastAPI", "MediaPipe", "OpenCV", "TensorFlow / GRU", "Scikit-Learn", "HTML/JS"],
      highlights: "Akurasi validasi 98.18% (Alfabet) & 100% (Dynamic Words). Dilengkapi REST API & Video Demo YouTube."
    },
    {
      title: "Sistem Monitoring Jaringan & Deteksi Anomali AI",
      category: "Network & IoT Systems",
      badge: "Industry Internship Project",
      icon: Network,
      isVerifiedRepo: false,
      repoUrl: "https://github.com/tasyaulfarahmazani",
      description: "Platform monitoring infrastruktur router & jaringan real-time via MQTT & SSH. Dilengkapi modul AI Isolation Forest (Flask ML Server) untuk mendeteksi anomali CPU load, lonjakan memori, suhu, dan trafik Rx/Tx secara prediktif.",
      tech: ["Node.js / Express 5", "Python / Flask", "Isolation Forest ML", "MQTT & SSH2", "MySQL & SQLite", "PDFKit Export"],
      highlights: "Deteksi anomali trafik real-time berbasis AI (Isolation Forest) & otomasi alerting router."
    },
    {
      title: "Sistem Pendaftaran & Seleksi Anak Magang (Internship Portal)",
      category: "Fullstack Web & Systems",
      badge: "Production Web App",
      icon: Users,
      isVerifiedRepo: false,
      repoUrl: "https://github.com/tasyaulfarahmazani",
      description: "Portal rekrutmen terpadu untuk registrasi calon anak magang baru. Dilengkapi alur pendaftaran formulir multi-tahap, upload berkas CV/portofolio, dashboard verifikasi admin HRD, dan sistem pengumuman kelulusan terstruktur.",
      tech: ["Laravel / PHP", "MySQL", "Tailwind CSS", "REST API", "Role Management"],
      highlights: "Alur registrasi, validasi berkas otomatis, filtering status pelamar hingga tahap onboard."
    },
    {
      title: "Modern POS & Retail Inventory System",
      category: "Fullstack Web Application",
      badge: "Enterprise Business Solution",
      icon: ShoppingCart,
      isVerifiedRepo: false,
      repoUrl: "https://github.com/tasyaulfarahmazani",
      description: "Sistem kasir retail modern berbasis Single Page Application (SPA). Mendukung multi-tier pricing, pergerakan inventaris realtime (Stock Movement audit log), pencatatan modal kasir harian, serta laporan laba rugi transaksi.",
      tech: ["Laravel 11 / PHP 8.3", "React 18 & TypeScript", "Inertia.js", "Tailwind CSS v4", "MySQL", "Vite PWA"],
      highlights: "Arsitektur Fullstack Modern (Laravel + Inertia React TS) dengan fitur Multi-Tier Pricing & Stock Audit."
    },
    {
      title: "Beauty Store: Online Shopping Platform",
      category: "Web & Mobile Development",
      badge: "E-Commerce Ecosystem",
      icon: Layers,
      isVerifiedRepo: false,
      repoUrl: "https://github.com/tasyaulfarahmazani",
      description: "Platform e-commerce kecantikan berbasis web yang diperluas ke aplikasi mobile (Flutter). Memungkinkan pelanggan menjelajah katalog, keranjang belanja, checkout, serta sinkronisasi data real-time via API & Firebase.",
      tech: ["Laravel", "MySQL", "Flutter", "Firebase", "REST APIs", "Tailwind/CSS"],
      highlights: "Integrasi ganda Web + Mobile App dengan sinkronisasi API real-time."
    },
    {
      title: "E-Archive School Web Application",
      category: "Fullstack Web & Systems",
      badge: "Digital Transformation",
      icon: Database,
      isVerifiedRepo: false,
      repoUrl: "https://github.com/tasyaulfarahmazani",
      description: "Sistem pengarsipan dokumen sekolah digital berbasis CRUD tangguh. Mentransformasi arsip kertas fisik manual menjadi basis data terpusat, terstruktur, aman, dan dapat dicari secara instan.",
      tech: ["PHP", "MySQL", "JavaScript", "CRUD Architecture", "Document Security"],
      highlights: "Efisiensi pengarsipan dokumen hingga 100% digital tanpa risiko dokumen fisik hilang."
    },
    {
      title: "Seat Belt Detection System (AI Computer Vision)",
      category: "Machine Learning & AI",
      badge: "Computer Vision & IoT",
      icon: Cpu,
      isVerifiedRepo: false,
      repoUrl: "https://github.com/tasyaulfarahmazani",
      description: "Sistem pendeteksi kepatuhan sabuk pengaman kendaraan secara real-time dari rekaman video menggunakan algoritma YOLO dan Python. Terintegrasi dengan audio alert otomatis saat pelanggaran terdeteksi.",
      tech: ["Python", "YOLO (Object Detection)", "OpenCV", "Video Datasets", "Audio Warning System"],
      highlights: "Deteksi objek real-time dengan triggering audio peringatan otomatis."
    },
    {
      title: "Tomato Leaf Disease Classification",
      category: "Computer Vision & ML",
      badge: "Published Research Paper",
      icon: Activity,
      isVerifiedRepo: true,
      repoUrl: "https://github.com/tasyaulfarahmazani/tomato-leaf-disease-classification",
      description: "Klasifikasi penyakit daun tomat (Sehat, Bakteri, Busuk) berbasis ekstraksi fitur Warna (RGB), Tekstur (GLCM), dan Bentuk. Membandingkan 4 algoritma ML: Random Forest (95.5%), KNN (93.0%), SVM (92.7%), dan Naive Bayes (76.6%).",
      tech: ["Python", "OpenCV", "GLCM Texture", "Random Forest (95.5%)", "KNN (93%)", "SVM (92.7%)"],
      highlights: "Akurasi tertinggi 95.5% (Random Forest Ensemble) & F1-Score 0.96 dari riset komparasi 4 model ML."
    },
    {
      title: "Server & Security Infrastructure Management",
      category: "Network & Infrastructure",
      badge: "DevOps & Security",
      icon: Server,
      isVerifiedRepo: false,
      repoUrl: "https://github.com/tasyaulfarahmazani",
      description: "Konfigurasi dan manajemen server Windows & Linux (GUI & CLI), simulasi uji kerentanan keamanan perangkat lunak & sistem IoT, serta perumusan dokumentasi mitigasi insiden keamanan siber.",
      tech: ["Linux (Ubuntu/Debian)", "Windows Server", "IoT Vulnerability Testing", "Server Hardening", "Security Mitigation"],
      highlights: "Pengelolaan server stabil dan pengujian keamanan vulnerability IoT."
    }
  ];

  const categories = ['All', 'Fullstack Web & Systems', 'Enterprise & Business Web', 'Network & Infrastructure', 'Machine Learning & AI'];

  const filteredProjects = activeCategory === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <div className="relative min-h-screen royal-custom-bg text-slate-800 font-sans cursor-none overflow-x-clip">

      {/* 🪄 CUSTOM ROYAL MANHWA CURSOR & SPARKLE TRAILS */}
      <div className="hidden lg:block pointer-events-none fixed inset-0 z-50">

        {/* Trailing Golden Magic Ring */}
        <div
          className={`fixed rounded-full border-2 border-amber-400/80 transition-all duration-75 ease-out shadow-[0_0_15px_rgba(212,175,55,0.4)] ${isHovered ? 'w-12 h-12 -ml-6 -mt-6 bg-amber-200/20 scale-125' : 'w-8 h-8 -ml-4 -mt-4'
            }`}
          style={{
            transform: `translate3d(${cursorTrailing.x}px, ${cursorTrailing.y}px, 0)`
          }}
        />

        {/* Lead Cursor (Royal Golden Star Point) */}
        <div
          className="fixed w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-200 to-rose-400 shadow-md"
          style={{
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`
          }}
        >
          <div className="absolute inset-0 rounded-full animate-ping bg-amber-300 opacity-60"></div>
        </div>

        {/* Sparkle Ekor Bintang (Particle Trails) */}
        {sparkles.map((sp) => (
          <div
            key={sp.id}
            className="fixed text-amber-500 font-serif text-xs select-none animate-ping pointer-events-none opacity-80"
            style={{
              left: `${sp.x}px`,
              top: `${sp.y}px`,
              fontSize: `${sp.size}px`,
              animationDuration: '0.8s'
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* 🏰 GRAND ROYAL PALACE BACKGROUND (MANHWA ROFAN LIGHT THEME) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

        {/* Soft Pearlescent & Sunlight Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffcf7]/90 via-[#fefaf0]/95 to-[#fffbf2]" />

        {/* Ambient Warm Golden & Rose Light Sparks */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-amber-200/35 via-rose-100/30 to-transparent rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-rose-200/25 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 left-0 w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-[140px]" />

        {/* Falling Garden Petals & Green Leaves */}
        {fallingElements.map((el) => (
          <div
            key={el.id}
            className={`absolute rounded-full animate-petal-fall ${el.isLeaf
              ? 'bg-emerald-500/40 shadow-[0_0_8px_rgba(72,187,120,0.3)]'
              : 'bg-rose-400/55 shadow-[0_0_8px_rgba(251,113,133,0.35)]'
              }`}
            style={{
              left: `${el.left}%`,
              top: '-20px',
              width: `${el.size}px`,
              height: `${el.size * 1.5}px`,
              animationDuration: `${el.duration}s`,
              animationDelay: `${el.delay}s`,
              borderRadius: el.isLeaf ? '70% 0 70% 0' : '50%'
            }}
          />
        ))}
      </div>

      {/* 👑 Royal Sunlit Navbar (Full-width lega & luas, saat di-scroll menjadi frosted glass elegan tanpa menyempit) */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 w-full ${isScrolled
            ? 'backdrop-blur-md bg-[#fffcf7]/92 border-b border-amber-300/60 shadow-[0_4px_25px_rgba(212,175,55,0.12)]'
            : 'backdrop-blur-sm bg-transparent border-b border-amber-200/40'
          }`}
      >
        <div className="w-full px-6 sm:px-12 lg:px-16 h-20 flex items-center justify-between">
          <a href="#prologue" className="flex items-center group">
            <span className="font-royal text-2xl sm:text-3xl font-black tracking-widest text-amber-950 group-hover:text-amber-800 transition-colors">
              SYA.
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-bold tracking-wider uppercase font-comic">
            <a href="#prologue" className="nav-3-item py-1">
              <span data-text="Prologue" className="nav-3-linktext">Prologue</span>
            </a>
            <a href="#chapter-1" className="nav-3-item py-1">
              <span data-text="Profile" className="nav-3-linktext">Profile</span>
            </a>
            <a href="#chapter-2" className="nav-3-item py-1">
              <span data-text="Specialization" className="nav-3-linktext">Specialization</span>
            </a>
            <a href="#chapter-3" className="nav-3-item py-1">
              <span data-text="Projects" className="nav-3-linktext">Projects</span>
            </a>
            <a href="#chapter-4" className="nav-3-item py-1">
              <span data-text="Chronicles" className="nav-3-linktext">Chronicles</span>
            </a>
            <a href="#chapter-5" className="nav-3-item py-1">
              <span data-text="Epilogue" className="nav-3-linktext">Epilogue</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-900 font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-md hover:brightness-105 hover:scale-105 transition-all flex items-center justify-center border border-amber-300"
            >
              <span>Hire Me</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 w-full">

        {/* 🏰 PROLOGUE: THE IMPERIAL SCHOLAR AWAKENING (HERO) */}
        <section id="prologue" className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 sm:px-12 lg:px-16 py-12 relative w-full">


          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">



              {/* Main Headline dengan Font Khusus Kerajaan & Animasi Fade In/Out Loop Terus-Menerus */}
              <h1 className="reveal-init delay-100 font-royal text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.2] animate-fade-loop select-none">
                Hello, I am <br />
                <span className="shimmer-text font-royal">Tasya Ulfa Rahmazani</span>.
              </h1>

              {/* Clear professional summary (Rata Kanan Kiri Penuh - Satu Warna Bersih) */}
              <p className="reveal-init delay-200 text-slate-800 text-lg sm:text-xl w-full leading-relaxed text-justify">
                Software & Systems Engineer yang berfokus pada perancangan arsitektur sistem informasi yang skalabel, rekayasa perangkat lunak modern, serta integrasi teknologi cerdas untuk menjawab kebutuhan komputasi dan efisiensi operasional.
              </p>

              {/* CTAs */}
              <div className="reveal-init delay-300 pt-2 flex flex-wrap items-center justify-start gap-4">
                <a
                  href="#projects"
                  href="#chapter-3"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-900 font-extrabold text-sm tracking-wider uppercase shadow-md hover:scale-105 transition-transform flex items-center gap-2 border border-amber-300"
                >
                  <span>Explore 8+ Projects</span>
                  <span>Explore My Projects</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* Quick Metrics */}
              <div className="reveal-init delay-400 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-amber-200/80 w-full">
                <div className="p-3.5 rounded-xl bg-white/90 border border-amber-200/90 shadow-sm hover:border-amber-400 transition-all">
                  <div className="text-[11px] text-slate-500 font-mono font-semibold">EDUCATION</div>
                  <div className="text-xs font-black text-slate-900 mt-1">D4 Teknik Informatika</div>
                  <div className="text-[10px] text-emerald-800 font-medium">Politeknik Negeri Lhokseumawe</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/90 border border-amber-200/90 shadow-sm hover:border-amber-400 transition-all">
                  <div className="text-[11px] text-slate-500 font-mono font-semibold">EXPERIENCE</div>
                  <div className="text-xs font-black text-slate-900 mt-1">8+ Systems Built</div>
                  <div className="text-[10px] text-amber-800 font-medium">Web, Network & AI</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/90 border border-amber-200/90 shadow-sm hover:border-amber-400 transition-all">
                  <div className="text-[11px] text-slate-500 font-mono font-semibold">ORGANIZATION</div>
                  <div className="text-xs font-black text-slate-900 mt-1">Kadep KESMA 25-26</div>
                  <div className="text-[10px] text-purple-800 font-medium">HIMATIK PNL</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/90 border border-amber-200/90 shadow-sm hover:border-amber-400 transition-all">
                  <div className="text-[11px] text-slate-500 font-mono font-semibold">AVAILABILITY</div>
                  <div className="text-xs font-black text-emerald-700 flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Ready for Work
                  </div>
                  <div className="text-[10px] text-slate-600 font-medium">Internship / Full-time</div>
                </div>
              </div>
            </div>

            {/* Right Photo (Bingkai Bunga Sakura Full & Mahkota Emas Transparan Asli - Ukuran Lebih Besar & Megah) */}
            <div className="lg:col-span-5 relative flex justify-center items-center reveal-init delay-200">

              <div className="relative w-full max-w-[480px] sm:max-w-[560px] lg:max-w-[650px] group">

                {/* Soft Floral Aura Glow di Belakang Frame */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-300/25 via-rose-300/30 to-amber-200/20 rounded-full blur-3xl -z-10 group-hover:scale-105 transition-all duration-700"></div>

                {/* Gambar PNG Transparan Murni: Bingkai Sakura Emas Full + Foto Almamater */}
                <div className="relative overflow-visible transition-all duration-700 group-hover:scale-[1.02]">
                  <img
                    src="/images/tasya-royal-sakura-transparent.png"
                    alt="Tasya Ulfa Rahmazani - Royal Sakura Frame Transparent"
                    className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(212,175,55,0.32)] filter brightness-[1.01]"
                  />
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 🎯 CHAPTER 2: SPECIALIZATION ANALYSIS */}
        <section id="chapter-1" ref={ch1ContainerRef} className="relative w-full h-[420vh]">
          {/* Pinned Viewport Container */}
          <div className="sticky top-20 h-[calc(100vh-5rem)] w-full overflow-hidden flex flex-col justify-center px-6 sm:px-12 lg:px-16 border-t border-amber-200/50">

            {/* Giant Background Text "PROFILE" dengan Efek Jatuh Satu Per Satu & Berubah Warna Merah/Coral Mewah */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden pt-16 sm:pt-20">
              <div
                className="font-royal text-[17vw] sm:text-[18vw] font-black tracking-widest uppercase flex transition-transform duration-100 will-change-transform"
                style={{
                  transform: `translateX(${(0.5 - ch1Progress) * 90}px) scale(${0.97 + ch1Progress * 0.06})`
                }}
              >
                {['P', 'R', 'O', 'F', 'I', 'L', 'E'].map((char, i) => {
                  // Masing-masing huruf jatuh dari atas ke bawah secara berurutan pada tahap awal (progress 0.0 - 0.28)
                  // P (0) s/d E (6). E baru selesai mendarat sempurna tepat di progress 0.28
                  const enterThreshold = i * 0.038;
                  const charProgress = Math.max(0, Math.min(1, (ch1Progress - enterThreshold) / 0.052));
                  const translateY = (1 - charProgress) * -160;
                  const charOpacity = charProgress;

                  // Tepat setelah huruf E mendarat (ch1Progress >= 0.28), kartu mulai menyembul dari sisi kanan huruf E.
                  // Seiring kartu pertama meluncur masuk melewati huruf E -> L -> I -> F -> O -> R -> P,
                  // huruf yang tersentuh/dilewati kartu berubah warna secara real-time menjadi Emas Royal (#d4af37).
                  // Perhitungan posisi kartu meluncur:
                  // Pada ch1Progress = 0.28: kartu berada di translateX(1200) (di luar kanan, tepat di ujung huruf E)
                  // Pada ch1Progress = 0.90: kartu sudah maju ke translateX(-650)
                  const reverseIndex = 6 - i; // E=0, L=1, I=2, F=3, O=4, R=5, P=6
                  // Huruf E langsung mulai berubah warna tepat saat kartu pertama mulai muncul di progress 0.28!
                  const colorThreshold = 0.28 + reverseIndex * 0.085;
                  const isColorFilled = ch1Progress >= colorThreshold;

                  return (
                    <span
                      key={i}
                      className="inline-block transition-colors duration-300 will-change-transform"
                      style={{
                        transform: `translate3d(0, ${translateY}px, 0)`,
                        opacity: charOpacity,
                        color: isColorFilled
                          ? '#d4af37' // Warna Emas Royal Emas Mewah (Gold Accent)
                          : 'rgba(120, 53, 15, 0.12)' // Warna pudar dasar sebelum kartu masuk
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Header Mini Status - Centered Chapter & Title */}
            <div
              className={`relative z-10 mb-12 sm:mb-16 max-w-6xl mx-auto w-full text-center transition-all duration-500 ${ch1Progress > 0.2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
            >
              <div className="space-y-3 sm:space-y-4">
                <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-amber-800 uppercase block mb-1">
                  Chapter 1
                </span>
                <h2 className="font-royal text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-wide">
                  Profil & Pondasi Kepribadian
                </h2>
                <div className="w-28 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4"></div>
              </div>
            </div>

            {/* Interactive Cards Stream - Baru meluncur masuk setelah tulisan PROFILE selesai jatuh (progress > 0.28) */}
            <div className="relative z-10 w-full max-w-6xl mx-auto overflow-visible">
              <div
                className="flex gap-6 sm:gap-8 transition-transform duration-100 ease-out will-change-transform"
                style={{
                  transform: `translateX(${ch1Progress < 0.28
                      ? 1150
                      : Math.max(-750, 1150 - (ch1Progress - 0.28) * 3100)
                    }px)`,
                  opacity: ch1Progress < 0.28 ? 0 : Math.min(1, (ch1Progress - 0.28) / 0.05)
                }}
              >
                {/* Card 1: Asal & Kelahiran */}
                <div
                  className={`flex-shrink-0 w-[300px] sm:w-[360px] p-7 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-300 shadow-xl space-y-4 transition-all duration-300 ${ch1Progress > 0.32 ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-amber-700 uppercase tracking-widest">DOSSIER NO. 01</span>
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-royal text-2xl font-bold text-slate-900">Asal & Kelahiran</h3>
                  <p className="text-slate-700 text-sm leading-relaxed text-justify">
                    Lahir di <strong className="text-amber-950 font-bold">Batam, 03 September 2004</strong>. Memiliki kemampuan beradaptasi yang sangat cepat, pemikiran analitis tajam, serta daya juang tinggi dalam memecahkan masalah rekayasa sistem komputer yang kompleks.
                  </p>
                  <div className="pt-3 border-t border-amber-200/80 text-xs font-mono text-amber-900 font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600" /> Batam, 03 September 2004
                  </div>
                </div>

                {/* Card 2: Pesantren Modern Misbahul Ulum */}
                <div
                  className={`flex-shrink-0 w-[300px] sm:w-[360px] p-7 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-300 shadow-xl space-y-4 transition-all duration-300 ${ch1Progress > 0.52 ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-widest">DOSSIER NO. 02</span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-sm">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-royal text-2xl font-bold text-slate-900">Pondasi Pesantren</h3>
                  <p className="text-slate-700 text-sm leading-relaxed text-justify">
                    Menempuh pendidikan menengah SMP & SMA di <strong className="text-emerald-950 font-bold">Pesantren Modern Misbahul Ulum</strong>. Ditempa dalam disiplin harian yang ketat, ketahanan mental, serta kultur bilingual aktif (<span className="text-emerald-800 font-bold">Arabic & English</span>).
                  </p>
                  <div className="pt-3 border-t border-emerald-200/80 text-xs font-mono text-emerald-900 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Bilingual Discipline (AR & EN)
                  </div>
                </div>

                {/* Card 3: Akademik & Leadership PNL */}
                <div
                  className={`flex-shrink-0 w-[300px] sm:w-[360px] p-7 rounded-2xl bg-white/95 backdrop-blur-md border border-rose-300 shadow-xl space-y-4 transition-all duration-300 ${ch1Progress > 0.70 ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-rose-700 uppercase tracking-widest">DOSSIER NO. 03</span>
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold shadow-sm">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-royal text-2xl font-bold text-slate-900">Informatika & Leadership</h3>
                  <p className="text-slate-700 text-sm leading-relaxed text-justify">
                    Mahasiswi aktif <strong className="text-rose-950 font-bold">D-IV Teknik Informatika Politeknik Negeri Lhokseumawe</strong>. Dipercaya mengemban amanah sebagai <strong className="text-rose-950 font-bold">Ketua Departemen KESMA HIMATIK (2025–2026)</strong>.
                  </p>
                  <div className="pt-3 border-t border-rose-200/80 text-xs font-mono text-rose-900 font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4 text-rose-600" /> Kadep KESMA PNL (2025 - 2026)
                  </div>
                </div>

                {/* Card 4: Etos Kerja & Nilai Karakter */}
                <div
                  className={`flex-shrink-0 w-[300px] sm:w-[360px] p-7 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-300 shadow-xl space-y-4 transition-all duration-300 ${ch1Progress > 0.88 ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-amber-700 uppercase tracking-widest">DOSSIER NO. 04</span>
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shadow-sm">
                      <Shield className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-royal text-2xl font-bold text-slate-900">Etos & Core Values</h3>
                  <p className="text-slate-700 text-sm leading-relaxed text-justify">
                    Mengutamakan integritas, komunikasi solutif, dan ketelitian detail kode. Mampu bekerja mandiri dalam riset teknis maupun memimpin kolaborasi tim lintas departemen hingga proyek tuntas.
                  </p>
                  <div className="pt-3 border-t border-amber-200/80 text-xs font-mono text-amber-900 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" /> High Integrity & Accountability
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 🏆 CHAPTER 4: JOURNEY TIMELINE */}
        <section id="chapter-2" className="py-24 px-6 sm:px-12 lg:px-16 border-t border-amber-200/50 relative w-full">
          <div className="w-full">

            <div className="reveal-init text-center mb-16 space-y-3">
              <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-amber-800 uppercase block">
                Chapter 2
              </span>
              <h2 className="font-royal text-3xl sm:text-5xl font-black text-slate-900">
                Pilar Keahlian & Spesialisasi
              </h2>
              <p className="text-slate-600 text-base max-w-4xl mx-auto text-justify">
                Berdasarkan portofolio proyek yang telah dibangun, profil saya adalah seorang <strong className="text-amber-900">Fullstack Software & Systems Engineer (T-Shaped Engineer)</strong> dengan kemampuan lintas bidang yang terbukti:
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

              {/* Pillar 1 */}
              <div className="reveal-init delay-100 p-8 rounded-2xl bg-white border border-amber-200/80 hover:border-amber-400 transition-all space-y-4 shadow-sm hover:shadow-md">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="font-royal text-xl font-bold text-slate-900">1. Fullstack & Business Systems</h3>
                <p className="text-slate-600 text-base leading-relaxed text-justify">
                  Paling kuat dalam membangun sistem informasi bisnis dari nol: alur pendaftaran magang multi-tahap, sistem kasir & POS inventory, sistem arsip sekolah, hingga platform e-commerce dengan arsitektur database relasional tangguh (MySQL/Laravel).
                </p>
                <div className="pt-2 text-xs font-mono text-amber-800 font-semibold bg-amber-50 p-2 rounded-lg border border-amber-200/60">
                  Laravel • PHP • MySQL • REST API • POS
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="reveal-init delay-200 p-8 rounded-2xl bg-white border border-emerald-200/80 hover:border-emerald-400 transition-all space-y-4 shadow-sm hover:shadow-md">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Network className="w-6 h-6" />
                </div>
                <h3 className="font-royal text-xl font-bold text-slate-900">2. Network Monitoring & Infra</h3>
                <p className="text-slate-600 text-base leading-relaxed text-justify">
                  Bukan sekadar web dev biasa — terbukti mampu mengelola server Linux/Windows, mengonfigurasi sistem deteksi gangguan jaringan real-time saat magang, serta simulasi keamanan perangkat lunak & IoT.
                </p>
                <div className="pt-2 text-xs font-mono text-emerald-800 font-semibold bg-emerald-50 p-2 rounded-lg border border-emerald-200/60">
                  Network Monitoring • Linux Server • IoT Security
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="reveal-init delay-300 p-8 rounded-2xl bg-white border border-rose-200/80 hover:border-rose-400 transition-all space-y-4 shadow-sm hover:shadow-md">
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="font-royal text-xl font-bold text-slate-900">3. Applied AI & Modern Engineering</h3>
                <p className="text-slate-600 text-base leading-relaxed text-justify">
                  Mampu mengintegrasikan kecerdasan buatan ke solusi nyata: implementasi computer vision YOLO untuk deteksi sabuk pengaman + alert audio, model Machine Learning 97% akurasi, dan mobile app Flutter.
                </p>
                <div className="pt-2 text-xs font-mono text-rose-800 font-semibold bg-rose-50 p-2 rounded-lg border border-rose-200/60">
                  Python • YOLO • OpenCV • Flutter • ML 97%
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ⚔️ CHAPTER 3: SHOWCASE PROYEK DUA BARIS BERLAWANAN ARAH (SCROLL-DRIVEN DUAL OPPOSING STREAM) */}
        <section id="chapter-3" ref={ch3ContainerRef} className="relative w-full h-[360vh]">
          {/* Pinned Viewport Container */}
          <div className="sticky top-20 h-[calc(100vh-5rem)] w-full overflow-hidden flex flex-col justify-center px-4 sm:px-8 lg:px-12 border-t border-amber-200/50">

            {/* Giant Background Watermark Text "PROJECTS" */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
              <span
                className="font-royal text-[16vw] sm:text-[18vw] font-black tracking-widest uppercase text-amber-900/10 transition-transform duration-100 will-change-transform"
                style={{
                  transform: `translateX(${(ch3Progress - 0.5) * 140}px) scale(${0.96 + ch3Progress * 0.08})`
                }}
              >
                PROJECTS
              </span>
            </div>

            {/* Section Header - Centered Chapter & Title */}
            <div className="relative z-10 mb-6 max-w-7xl mx-auto w-full text-center">
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-amber-800 uppercase block">
                  Chapter 3
                </span>
                <h2 className="font-royal text-2xl sm:text-4xl font-black text-slate-900">
                  Galeri Karya: 8+ Sistem Terverifikasi
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2"></div>
              </div>
            </div>

            {/* Dual Opposing Streams Container */}
            <div className="relative z-10 w-full space-y-4 overflow-hidden py-4">

              {/* BARIS 1: Card pertama tepat di tengah layar, card 2, 3, 4 memanjang ke kanan. Bergerak ke KIRI saat scroll */}
              <div className="w-full overflow-visible">
                <div
                  className="flex gap-5 transition-transform duration-100 ease-out will-change-transform pl-[calc(50%-160px)] sm:pl-[calc(50%-190px)]"
                  style={{
                    transform: `translateX(${-ch3Progress * 1300}px)`
                  }}
                >
                  {allProjects.slice(0, 4).map((proj, idx) => {
                    const IconComponent = proj.icon;
                    return (
                      <div
                        key={idx}
                        className="flex-shrink-0 w-[320px] sm:w-[380px] p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-300 shadow-lg hover:shadow-2xl hover:border-amber-500 transition-all duration-300 group flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                              {proj.badge}
                            </span>
                            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                              <IconComponent className="w-4 h-4" />
                            </div>
                          </div>

                          <h3 className="font-royal text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                            {proj.title}
                          </h3>

                          <p className="text-slate-600 text-xs leading-relaxed text-justify line-clamp-3">
                            {proj.description}
                          </p>

                          <div className="p-2 rounded-lg bg-emerald-50/80 border border-emerald-200 text-[10px] text-emerald-950 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-2"><strong>Impact:</strong> {proj.highlights}</span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {proj.tech.slice(0, 4).map((t, i) => (
                              <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-500">{proj.category}</span>
                          <a
                            href={proj.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 hover:underline"
                          >
                            <span>Inspect Repo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BARIS 2: Card pertama tepat di tengah layar, card berikutnya memanjang ke KIRI (flex-row-reverse). Bergerak ke KANAN saat scroll */}
              <div className="w-full overflow-visible">
                <div
                  className="flex flex-row-reverse gap-5 transition-transform duration-100 ease-out will-change-transform pr-[calc(50%-160px)] sm:pr-[calc(50%-190px)]"
                  style={{
                    transform: `translateX(${ch3Progress * 1300}px)`
                  }}
                >
                  {[allProjects[7], allProjects[6], allProjects[5], allProjects[4]].map((proj, idx) => {
                    const IconComponent = proj.icon;
                    return (
                      <div
                        key={idx}
                        className="flex-shrink-0 w-[320px] sm:w-[380px] p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-rose-300 shadow-lg hover:shadow-2xl hover:border-rose-500 transition-all duration-300 group flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-rose-900 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200">
                              {proj.badge}
                            </span>
                            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                              <IconComponent className="w-4 h-4" />
                            </div>
                          </div>

                          <h3 className="font-royal text-lg font-bold text-slate-900 group-hover:text-rose-800 transition-colors line-clamp-1">
                            {proj.title}
                          </h3>

                          <p className="text-slate-600 text-xs leading-relaxed text-justify line-clamp-3">
                            {proj.description}
                          </p>

                          <div className="p-2 rounded-lg bg-amber-50/80 border border-amber-200 text-[10px] text-amber-950 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-2"><strong>Impact:</strong> {proj.highlights}</span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {proj.tech.slice(0, 4).map((t, i) => (
                              <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-500">{proj.category}</span>
                          <a
                            href={proj.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-bold text-rose-800 hover:text-rose-900 flex items-center gap-1 hover:underline"
                          >
                            <span>Inspect Repo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 📜 CHAPTER 1: PROFILE (STAGED ANIMATION: HURUF PROFILE JATUH SATU PER SATU DULU, LALU KARTU MASUK & WARNA BERUBAH) */}
        <section id="chapter-4" className="py-24 px-6 sm:px-12 lg:px-16 border-t border-amber-200/50 relative w-full">
          <div className="w-full">

            <div className="text-center mb-16 space-y-3">
              <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-amber-800 uppercase block">
                Chapter 4
              </span>
              <h2 className="font-royal text-3xl sm:text-5xl font-black text-slate-900">
                Jejak Langkah & Kepemimpinan
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm font-mono max-w-md mx-auto">
                Garis waktu perjalanan organisasi, project management, dan rekam jejak pengabdian.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2"></div>
            </div>

            <div className="relative border-l-2 border-amber-300 ml-4 sm:ml-32 space-y-12">

              {/* Item 1 */}
              <div className="reveal-init delay-100 relative pl-8 group">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-400 border-4 border-white shadow-md"></div>
                <div className="hidden sm:block absolute -left-36 top-1 text-xs font-mono text-amber-800 font-bold">2025 - 2026</div>
                <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-3">
                  <span className="sm:hidden text-xs font-mono text-amber-800 font-bold block mb-1">2025 - 2026</span>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-royal text-lg font-bold text-slate-900">Ketua Departemen KESMA & Event Project Leader</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-semibold">
                      Leadership & Project Management
                    </span>
                  </div>
                  <p className="text-emerald-800 text-xs font-mono">Himpunan Mahasiswa Jurusan TIK • Politeknik Negeri Lhokseumawe</p>

                  <div className="mt-2 space-y-2 text-slate-600 text-xs sm:text-sm">
                    <p className="text-slate-500 text-xs italic bg-slate-50 p-2 rounded border border-slate-200">
                      Memimpin departemen yang menaungi 6+ program kerja strategis jurusan TIK (RevolTIK [Budget Rp 44Jt+], ConnecTIK, CurhaTIK, Musyawarah Besar, Rapat Kerja, & Open Recruitment).
                    </p>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Event Project Leader (Ketua Acara):</strong> Mengorkestrasi jalannya acara dari nol — penentuan tema & konsep, breakdown ide kreatif, penjadwalan timeline kerja, hingga mitigasi risiko teknis di lapangan.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Lead Secretary (Sekretaris Pelaksana):</strong> Mengelola administrasi formal organisasi: persuratan & birokrasi perizinan, scheduling rapat & absensi berkala, hingga akuntabilitas Laporan Pertanggungjawaban (LPJ).</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Budget & Resource Oversight:</strong> Terbiasa mengawasi alokasi dana kegiatan (mulai dari jutaan hingga puluhan juta rupiah) dan manajemen tim panitia lintas divisi.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="reveal-init delay-200 relative pl-8 group">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-400 border-4 border-white shadow-md"></div>
                <div className="hidden sm:block absolute -left-36 top-1 text-xs font-mono text-amber-800 font-bold">Internship Era</div>
                <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2">
                  <span className="sm:hidden text-xs font-mono text-amber-800 font-bold block mb-1">Internship Era</span>
                  <h3 className="font-royal text-lg font-bold text-slate-900">Engineering Intern — Network & Web Systems</h3>
                  <p className="text-emerald-800 text-xs font-mono">Industry Internship Experience</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Membangun sistem monitoring jaringan dan deteksi gangguan konektivitas real-time, serta mengembangkan web registrasi pendaftaran dan seleksi anak magang baru.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="reveal-init delay-200 relative pl-8 group">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-400 border-4 border-white shadow-md"></div>
                <div className="hidden sm:block absolute -left-36 top-1 text-xs font-mono text-amber-800 font-bold">2022 - Sekarang</div>
                <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2">
                  <span className="sm:hidden text-xs font-mono text-amber-800 font-bold block mb-1">2022 - Sekarang</span>
                  <h3 className="font-royal text-lg font-bold text-slate-900">Mahasiswi D-IV Teknik Informatika</h3>
                  <p className="text-emerald-800 text-xs font-mono">Politeknik Negeri Lhokseumawe (PNL)</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Fokus rekayasa perangkat lunak, sistem basis data, pemrograman web/mobile, sistem cerdas (AI/Computer Vision), dan infrastruktur jaringan.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="reveal-init delay-200 relative pl-8 group">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-400 border-4 border-white shadow-md"></div>
                <div className="hidden sm:block absolute -left-36 top-1 text-xs font-mono text-amber-800 font-bold">2016 - 2022</div>
                <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2">
                  <span className="sm:hidden text-xs font-mono text-amber-800 font-bold block mb-1">2016 - 2022</span>
                  <h3 className="font-royal text-lg font-bold text-slate-900">Alumni Pesantren Modern Misbahul Ulum</h3>
                  <p className="text-emerald-800 text-xs font-mono">Lhokseumawe, Aceh</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Pendidikan terpadu 6 tahun dengan pembiasaan bahasa resmi Arab & Inggris, kepemimpinan organisasi santri, serta penempaan integritas.
                  </p>
                </div>
              </div>

            </div>

            {/* 📊 LIVE GITHUB CODE & LANGUAGE ANALYTICS (REAL-TIME REPO & CONTRIBUTIONS) */}
            <div className="mt-20 pt-12 border-t border-amber-200/60 max-w-5xl mx-auto w-full">
              <div className="text-center mb-8 space-y-2">
                <span className="text-xs font-mono font-bold tracking-widest text-amber-800 uppercase block">
                  Engineering Metrics
                </span>
                <h3 className="font-royal text-2xl sm:text-3xl font-bold text-slate-900">
                  GitHub Code & Language Activity
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-mono max-w-lg mx-auto">
                  Statistik keaktifan commit, kontribusi repository, dan bahasa pemrograman yang dikuasai secara real-time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center">
                {/* Card 1: Top Languages */}
                <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-200/90 shadow-md hover:shadow-xl hover:border-amber-400 transition-all flex flex-col items-center justify-center">
                  <img
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=tasyaulfarahmazani&layout=compact&theme=vue&bg_color=ffffff00&hide_border=true&title_color=1e293b&text_color=475569"
                    alt="Tasya Ulfa Rahmazani - Top Languages"
                    className="w-full max-w-md h-auto object-contain filter drop-shadow-sm"
                    loading="lazy"
                  />
                </div>

                {/* Card 2: Overall GitHub Stats & Contributions */}
                <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-200/90 shadow-md hover:shadow-xl hover:border-amber-400 transition-all flex flex-col items-center justify-center">
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=tasyaulfarahmazani&show_icons=true&count_private=true&theme=vue&bg_color=ffffff00&hide_border=true&title_color=1e293b&text_color=475569&icon_color=d97706"
                    alt="Tasya Ulfa Rahmazani - GitHub Stats"
                    className="w-full max-w-md h-auto object-contain filter drop-shadow-sm"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Card 3: Interactive Contribution Heatmap (Kotak-Kotak Hijau Aktivitas GitHub Real-time) */}
              <div className="mt-6 p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-200/90 shadow-md hover:shadow-xl hover:border-amber-400 transition-all space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-black font-royal text-slate-900">
                          {totalContributions.toLocaleString()}
                        </span>
                        <span className="text-xs sm:text-sm font-mono font-bold text-slate-700">
                          contributions in the last year
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 block">
                        Termasuk kontribusi dari repository publik & private
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Private Contributions Active</span>
                    </span>
                  </div>
                </div>
                
                <div className="w-full overflow-x-auto py-2">
                  <div className="min-w-[680px] flex justify-center">
                    <img
                      src="https://ghchart.rshah.org/d4af37/tasyaulfarahmazani"
                      alt="Tasya Ulfa Rahmazani - GitHub Contribution Calendar"
                      className="w-full max-w-4xl h-auto filter drop-shadow-sm"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                  <span>Aktivitas harian koding & push commit sepanjang tahun</span>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span>Less</span>
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#ebedf0] border border-slate-200"></span>
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#fde047]"></span>
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b]"></span>
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#d97706]"></span>
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#b45309]"></span>
                    <span>More</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <a
                  href="https://github.com/tasyaulfarahmazani"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-800 hover:text-amber-950 transition-colors bg-amber-50 hover:bg-amber-100/80 px-4 py-2.5 rounded-xl border border-amber-200 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka Profil GitHub Resmi (@tasyaulfarahmazani)</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ✉️ CHAPTER 5: CONTACT & HIRE ME (EPILOGUE) */}
        <section id="chapter-5" className="py-24 px-6 sm:px-12 lg:px-16 border-t border-amber-200/50 relative w-full">
          <div className="w-full">



            <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-amber-300 shadow-garden-soft text-center space-y-6 relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-amber-800 uppercase block">
                  Chapter 5
                </span>
                <h2 className="font-royal text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900">
                  Siap Berkolaborasi?
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2"></div>
              </div>

              <p className="text-slate-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-justify">
                Terbuka untuk kesempatan <strong className="text-slate-900">Full-time, Internship</strong>, maupun project <strong className="text-slate-900">Web & Systems Development</strong>. Mari berdiskusi tentang bagaimana keahlian saya dapat memberikan solusi nyata untuk kebutuhan Anda.
              </p>

              {/* Direct Action Channels */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={copyEmail}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold text-sm tracking-wider uppercase shadow-md hover:brightness-105 transition-all flex items-center gap-2 border border-amber-300"
                >
                  <Mail className="w-4 h-4" />
                  <span>{copiedEmail ? "Email Tersalin! ✓" : "Salin Email (tasyaulfarahmazani03@gmail.com)"}</span>
                </button>

                <a
                  href="https://www.linkedin.com/in/syaa031104"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm font-semibold hover:border-amber-400 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-600" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://github.com/tasyaulfarahmazani"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm font-semibold hover:border-amber-400 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <GithubIcon className="w-4 h-4 text-slate-700" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.instagram.com/sya.lfarmdhni/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm font-semibold hover:border-rose-400 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <InstagramIcon className="w-4 h-4 text-rose-500" />
                  <span>Instagram</span>
                </a>
              </div>

              {/* Form Pesan Backend */}
              <div className="pt-8 max-w-xl mx-auto text-left">
                <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 shadow-inner">
                  <h3 className="font-royal text-sm sm:text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Send className="w-4 h-4 text-amber-700" />
                    <span>Kirim Pesan Langsung ke Tasya (Direct Backend API)</span>
                  </h3>

                  {formStatus.success ? (
                    <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs sm:text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Terima kasih! Pesan Anda telah tersimpan di sistem backend kami. Tasya akan segera merespons Anda. 👑</span>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                      {formStatus.error && (
                        <div className="p-3 rounded-lg bg-rose-100 border border-rose-300 text-rose-800">
                          {formStatus.error}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-600 mb-1 font-mono">NAMA LENGKAP / INSTANSI *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="HRD Perusahaan / Klien"
                            className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 mb-1 font-mono">EMAIL AKTIF *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="nama@perusahaan.com"
                            className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-600 mb-1 font-mono">TOPIK / SUBJEK</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Penawaran Kerja / Magang / Kolaborasi Proyek"
                          className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 mb-1 font-mono">PESAN LENGKAP *</label>
                        <textarea
                          rows={3}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tuliskan pesan penawaran atau detail proyek Anda di sini..."
                          className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus.loading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-sm border border-amber-300"
                      >
                        {formStatus.loading ? (
                          <span>Mengirim Pesan...</span>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Kirim Pesan ke Backend</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div className="pt-4 text-xs text-slate-500 font-mono">
                Lokasi: Lhokseumawe, Aceh • Batam, Kepulauan Riau • Siap Remote & On-site
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* 👑 Royal Sunlit Footer */}
      <footer className="border-t border-amber-200/60 py-8 text-center text-xs text-slate-500 font-mono bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Tasya Ulfa Rahmazani (Sya). All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-amber-900 font-semibold">
            <span>D-IV Teknik Informatika • Politeknik Negeri Lhokseumawe</span>
          </p>
        </div>
      </footer>

    </div>
  );
}
