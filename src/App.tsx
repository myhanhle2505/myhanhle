/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Briefcase, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Users, 
  Cpu,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', href: '#home' },
    { name: 'Nói về tôi', href: '#about' },
    { name: 'Kinh nghiệm', href: '#experience' },
    { name: 'Kỹ năng', href: '#skills' },
    { name: 'Liên hệ', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif font-bold text-primary"
        >
          Myhanh Le
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <motion.a
            href="https://www.topcv.vn/xem-cv/VQMBXQVXA1QIWwQHBlMPV1UAB1BXD1QHB1YLBQ4489"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="bg-accent-tan px-6 py-2 rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] font-medium text-sm transition-transform relative overflow-hidden flex items-center justify-center text-zinc-900"
          >
            <span className="relative z-10 uppercase tracking-widest font-bold text-[10px]">Hãy xem CV của tôi</span>
            {/* Note paper texture effect */}
            <div className="absolute top-0 right-0 w-4 h-4 bg-black/5 -mr-2 -mt-2 rotate-45"></div>
          </motion.a>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-t p-6 flex flex-col space-y-4 md:hidden shadow-lg"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://www.topcv.vn/xem-cv/VQMBXQVXA1QIWwQHBlMPV1UAB1BXD1QHB1YLBQ4489"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-tan py-3 rounded-md font-bold text-center uppercase text-sm tracking-widest"
            >
              Hãy xem CV của tôi
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Ticker = ({ value, label, prefix = '', suffix = '' }: { value: number; label: string; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const end = value;
    if (start === end) return;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [hasStarted, value]);

  return (
    <div ref={ref} className="text-center p-6 bg-white/40 rounded-2xl border border-white/20 backdrop-blur-sm">
      <div className="text-4xl font-serif font-bold text-primary mb-1">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">{label}</div>
    </div>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-16 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-serif font-bold mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-primary italic tracking-wide max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-20 h-1 bg-primary/20 mx-auto mt-8 rounded-full"></div>
  </div>
);

// --- Sections ---

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const experiences = [
    {
      year: '2023 - Present',
      company: 'EMDDI (Onsite)',
      role: 'Giám đốc Nhân sự & Marketing',
      desc: 'Thiết lập hệ thống nhân sự chuyên nghiệp cho startup quy mô lớn. Tăng trưởng quy mô nhân sự 200% trong 8 tháng.',
      details: [
        'Xây dựng quy trình vận hành & sơ đồ tổ chức linh hoạt.',
        'Kết hợp HR Branding & Marketing để thu hút nhân tài.',
        'Tối đa hiệu suất đội ngũ thông qua hệ thống đánh giá.'
      ],
      icon: <Users className="w-4 h-4" />
    },
    {
      year: '2025 - Present',
      company: 'ANYSHARE (Remote)',
      role: 'COO - COO Chuyên gia Tư vấn',
      desc: 'Cố vấn chiến lược vận hành và nhân sự cho Startup xanh.',
      icon: <Cpu className="w-4 h-4" />
    },
    {
      year: '2010 - 2023',
      company: 'Head of Talent',
      role: 'Hành chính và vận hành',
      desc: 'Thực hiện các quy trình & quản lý Hành chính của Công ty.',
      icon: <Award className="w-4 h-4" />
    }
  ];

  const skills = [
    'HR Strategy',
    'Brand Marketing',
    'Talent Acquisition',
    'Headhunting',
    'Internal Comm',
    'Leadership',
    'Change Management',
    'AI in HR'
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-50 origin-[0%]" style={{ scaleX }} />
      <Navbar />

      <main className="flex-1 mt-[84px] max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-[320px_1fr] border-x border-primary/10">
        {/* Sidebar */}
        <aside className="p-10 md:border-r border-primary/20 flex flex-col justify-between space-y-12 bg-background/50">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="about-me"
            id="about"
          >
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-4 border-b border-primary/20 pb-2">Nói về tôi</h2>
            <p className="text-sm font-light italic leading-loose text-zinc-600">
              Tôi là một chuyên gia quản trị nhân sự và vận hành chiến lược với hơn 7 năm kinh nghiệm, sở hữu tư duy hệ thống sắc bén và phong cách lãnh đạo chú trọng hiệu quả thực thi. Thế mạnh của tôi nằm ở việc thiết lập nền tảng HR chuyên nghiệp cho các hệ thống có tốc độ tăng trưởng nhanh, đặc biệt là khả năng kết hợp giữa quản trị nhân sự bài bản và chiến lược thương hiệu nhà tuyển dụng (Employer Branding) để thu hút các nhóm nhân sự đặc thù (như khối chuyên môn kỹ thuật cao). Tôi cam kết mang lại sự minh bạch trong chính sách, kỷ luật trong vận hành và sự tận tâm trong việc phát triển đội ngũ để tối ưu hóa trải nghiệm của nhân sự nội bộ cũng như khách hàng.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="skills-section"
            id="skills"
          >
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-4 border-b border-primary/20 pb-2">Kỹ năng</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-accent-tan text-[10px] font-bold uppercase tracking-wider rounded-full text-zinc-700">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="contact-info space-y-2 pt-12"
          >
             <p className="text-xs font-bold text-primary flex items-center gap-2">
               <MapPin className="w-3 h-3" /> Hà Nội, Việt Nam
             </p>
             <p className="text-xs font-bold text-primary flex items-center gap-2">
               <Phone className="w-3 h-3" /> 038 338 0788
             </p>
             <p className="text-[11px] text-zinc-400 font-medium tracking-tight">myhanhle.forwork@gmail.com</p>
             <div className="flex gap-4 pt-4">
               <a href="https://www.linkedin.com/in/myhanhle/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-primary transition-colors flex items-center gap-2 group">
                 <Linkedin className="w-4 h-4" />
                 <span className="text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Linkedin</span>
               </a>
               <a href="https://www.instagram.com/myhanhle2505/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-primary transition-colors flex items-center gap-2 group">
                 <Instagram className="w-4 h-4" />
                 <span className="text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Instagram</span>
               </a>
             </div>
          </motion.div>
        </aside>

        {/* Content Area */}
        <section className="p-10 flex flex-col gap-12 overflow-y-auto">
          {/* Hero Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hero-box relative overflow-hidden p-12 bg-gradient-to-br from-accent-blue/30 to-primary/5 border border-accent-blue rounded-lg z-20"
          >
            <div className="max-w-xl relative z-10">
              <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 font-bold leading-tight mb-4">
                DREAM... AFTER ALL, IS A FORM OF PLANNING.
              </h1>
              <p className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-8">
                is a person who brings value
              </p>
              <a 
                href="#experience" 
                className="inline-block px-8 py-3 bg-white/40 backdrop-blur-md border border-white/50 rounded-[30px_5px_30px_5px] text-xs font-bold tracking-widest text-zinc-900 hover:shadow-lg transition-all shadow-md group uppercase"
              >
                TÌM HIỂU THÊM
              </a>
            </div>

            {/* Background pattern */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
          </motion.div>

          {/* Experience Section */}
          <div id="experience" className="experience-section relative z-10">
            <div className="w-full h-0.5 bg-primary/20 mb-10 overflow-hidden relative border-t border-primary">
               {/* This is the blue line the elbow rests on */}
               <div className="absolute inset-0 bg-primary w-24 translate-x-12 opacity-50"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/60 p-6 border-t-4 border-primary shadow-sm hover:shadow-md transition-all relative group"
                >
                  <div className="text-2xl font-serif font-bold text-primary mb-2">{exp.year}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 mb-2 truncate">{exp.role}</div>
                  <p className="text-[11px] leading-relaxed text-zinc-500 mb-4">{exp.desc}</p>
                  <div className="absolute bottom-4 right-4 text-primary/10 group-hover:text-primary/20 transition-colors">
                    {exp.icon}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social Stats / Highlights */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Ticker value={7} label="Năm Kinh Nghiệm" suffix="+" />
            <Ticker value={200} label="Tăng Trưởng NS" suffix="%" />
            <Ticker value={400} label="Quản Trị Quy Mô" suffix="+" />
            <Ticker value={10} label="Đối Tác Chiến Lược" />
          </div>

          {/* Footer inside content area as per theme */}
          <footer className="mt-auto pt-10 border-t border-primary/10 flex flex-col gap-12 pb-6">
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="text-center py-12"
            >
               <h3 className="text-3xl font-serif italic text-primary/60 mb-2">Lời cảm ơn</h3>
               <p className="text-zinc-500 font-light tracking-wide">
                 Chân thành cảm ơn bạn đã ghé thăm và tìm hiểu về hành trình nghề nghiệp của tôi. <br />
                 Hy vọng chúng ta sẽ có dịp kết nối và kiến tạo giá trị cùng nhau.
               </p>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                MYHANH LE © 2026 • GIÁM ĐỐC NHÂN SỰ & MARKETING
              </div>
              <div className="flex gap-6">
                 <a href="https://www.linkedin.com/in/myhanhle/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold tracking-widest text-primary hover:text-zinc-600 transition-colors">LINKEDIN</a>
                 <a href="https://www.instagram.com/myhanhle2505/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold tracking-widest text-primary hover:text-zinc-600 transition-colors">INSTAGRAM</a>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default App;
