
import React, { useState, useEffect } from 'react';
import { Language, Project } from './types';
import { TRANSLATIONS, PROJECTS as DEFAULT_PROJECTS, EXPERIENCES, EDUCATION } from './constants';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import HeroCanvas from './components/HeroCanvas';
import WorkCard from './components/WorkCard';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('cn');
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [hoveredExpId, setHoveredExpId] = useState<string | null>(null);
  
  // Contact Detail State
  const [activeContactDetail, setActiveContactDetail] = useState<{ type: string, value: string } | null>(null);
  const [copyStatus, setCopyStatus] = useState(false);

  // High quality version of a professional portrait placeholder
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop');
  const [isPortfolioHovered, setIsPortfolioHovered] = useState(false);
  
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'contact'];
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 300) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  return (
    <div className="min-h-screen selection:bg-[#7700FF] selection:text-white bg-[#050505]">
      <Cursor />
      <Navbar lang={lang} setLang={setLang} activeSection={activeSection} />

      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute bottom-[-10%] right-[10%] w-[55vw] h-[55vw] bg-[#7700FF]/15 blur-[180px] rounded-full mix-blend-screen pointer-events-none animate-[floatUp_18s_infinite_alternate] z-[-2]" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[60vw] h-[60vw] bg-[#4F46E5]/12 blur-[220px] rounded-full mix-blend-screen pointer-events-none animate-[floatUp_25s_infinite_alternate_reverse] z-[-2]" />
        
        <HeroCanvas />
        <div className="absolute inset-0 bg-grid-white/[0.015] pointer-events-none z-[-1]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center translate-y-4">
          <h1 className="flex flex-col items-center mb-16 opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards] w-full overflow-visible">
            <span 
              className={`text-[8.2vw] md:text-[7.1vw] font-bold leading-none tracking-[0.11em] transition-all duration-700 cursor-default inline-block ${isPortfolioHovered ? 'text-[#7700FF]' : 'text-white'}`}
              onMouseEnter={() => setIsPortfolioHovered(true)}
              onMouseLeave={() => setIsPortfolioHovered(false)}
            >
              {t.hero.titlePrefix}
            </span>
            <span className="text-[7.3vw] md:text-[6.3vw] font-bold text-white/90 leading-none whitespace-nowrap mt-3 md:mt-4 tracking-[0.04em] uppercase">
              {t.hero.titleSuffix}
            </span>
          </h1>

          <div className="max-w-4xl mx-auto opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
            <p className="text-gray-400 text-sm md:text-base font-normal leading-relaxed mb-14 px-4 max-w-xl mx-auto">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col items-center">
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-14 py-4 bg-white text-black font-bold rounded-full transition-all hover:bg-[#7700FF] hover:text-white hover:scale-105 active:scale-95 flex items-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.08)]"
              >
                <span className="tracking-tight text-sm font-bold uppercase tracking-widest">{t.hero.cta}</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-24 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
            <h2 className="text-5xl md:text-7xl font-bold leading-none tracking-tighter uppercase">
              <span className="text-white">{t.about.title}</span>
              {' '}
              <span className="text-[#7700FF]">{t.about.titleMe}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="relative group w-full aspect-[4/5] md:w-64 md:h-80 mb-10 overflow-hidden rounded-[1.5rem] border border-white/10 transition-all duration-700 hover:border-[#7700FF]/50">
                <img 
                  src={avatar} 
                  alt="Portrait" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                />
                <label className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all hover:bg-[#7700FF] shadow-xl">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <input type="file" className="hidden" onChange={handleAvatarUpload} accept="image/*" />
                </label>
              </div>

              <div className="mb-14">
                <h3 className="text-4xl font-bold mb-2 tracking-tight">王俊娟</h3>
                <p className="text-[#7700FF] font-bold text-lg uppercase tracking-wider mb-8">UX & Product Manager</p>
                
                <div className="flex items-center gap-6 relative">
                  <button 
                    onClick={() => setActiveContactDetail({ type: 'PHONE', value: '+86 186-2007-1647' })}
                    className="text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-95" title="Phone">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" /></svg>
                  </button>
                  <button 
                    onClick={() => setActiveContactDetail({ type: 'WECHAT', value: 'WJJ_1647' })}
                    className="text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-95" title="WeChat">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M11.9,4C7.54,4,4,6.91,4,10.5C4,12.56,5.19,14.39,7,15.61L6.1,18.3L8.8,17.1C9.76,17.36,10.81,17.5,11.9,17.5C12.33,17.5,12.74,17.47,13.15,17.42C12.77,16.5,12.57,15.5,12.57,14.5C12.57,11.46,15.04,9,18.07,9C18.72,9,19.34,9.11,19.92,9.31C19.78,6.33,16.54,4,11.9,4M18.07,10.5C15.86,10.5,14.07,12.29,14.07,14.5C14.07,16.71,15.86,18.5,18.07,18.5C18.67,18.5,19.24,18.37,19.75,18.13L21.3,18.82L20.8,17.26C21.6,16.56,22.07,15.58,22.07,14.5C22.07,12.29,20.28,10.5,18.07,10.5Z" /></svg>
                  </button>
                  <a href="mailto:kriswang1999@gmail.com" className="text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-95" title="Gmail">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.11,4 20,4M20,8L12,13L4,8V6L12,11L20,6V8Z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/krista-wang" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-95" title="LinkedIn">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C13.93,9.94 13,10.63 12.59,11.24V10.13H10.13V18.5H12.59V14.24C12.59,13.11 12.8,12.03 14.19,12.03C15.55,12.03 15.58,13.3 15.58,14.32V18.5H18.5M6.31,8.31C7.09,8.31 7.72,7.68 7.72,6.9C7.72,6.12 7.09,5.49 6.31,5.49C5.53,5.49 4.9,6.12 4.9,6.9C4.9,7.68 5.53,8.31 6.31,8.31M5.08,18.5H7.54V10.13H5.08V18.5Z" /></svg>
                  </a>

                  {activeContactDetail && (
                    <div className="absolute left-0 bottom-full mb-4 w-64 bg-white/10 backdrop-blur-3xl border border-white/20 p-5 rounded-3xl animate-[fadeIn_0.3s_ease-out] shadow-2xl z-50 overflow-hidden">
                       <div className="absolute top-0 right-0 p-2">
                         <button onClick={() => setActiveContactDetail(null)} className="text-white/40 hover:text-white">
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                         </button>
                       </div>
                       <p className="text-[10px] mono text-white/40 mb-1 tracking-widest font-bold">{activeContactDetail.type}</p>
                       <p className="text-white font-bold mb-4 text-sm truncate">{activeContactDetail.value}</p>
                       <button 
                        onClick={() => copyToClipboard(activeContactDetail.value)}
                        className={`w-full py-2 rounded-xl text-[10px] mono font-bold transition-all ${copyStatus ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-[#7700FF] hover:text-white'}`}
                       >
                         {copyStatus ? 'COPIED!' : 'COPY TO CLIPBOARD'}
                       </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <h4 className="text-[10px] mono uppercase text-white/40 mb-10 tracking-[0.3em] font-bold">{t.about.educationLabel}</h4>
                <div className="space-y-8">
                  {EDUCATION.map(edu => (
                    <div key={edu.id} className="relative group">
                      <span className="text-[12px] mono text-gray-500 mb-1 block tracking-wider font-normal group-hover:text-gray-300 transition-colors duration-500">{edu.period}</span>
                      <h5 className="text-[15px] font-bold text-white mb-0.5 leading-tight">{edu.school} - {edu.degree}</h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <h4 className="text-[10px] mono uppercase text-white/30 mb-10 tracking-[0.4em] font-bold uppercase">EXPERIENCE TIMELINE</h4>
              <div className="space-y-8">
                {EXPERIENCES.map((exp, idx) => {
                  const isHovered = hoveredExpId === exp.id;
                  return (
                    <div key={exp.id} className="relative pl-12 border-l border-white/5 pb-2 last:pb-0">
                      <div className="absolute -left-[7px] top-6 w-3.5 h-3.5 rounded-full border border-white/10 bg-[#050505] flex items-center justify-center z-10 transition-colors duration-300">
                         <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isHovered || (idx === 0 && !hoveredExpId) ? 'bg-[#7700FF] shadow-[0_0_12px_#7700FF] scale-125' : 'bg-white/20'}`} />
                         {(idx === 0 || isHovered) && (
                           <div className="absolute inset-0 w-full h-full rounded-full bg-[#7700FF]/30 animate-ping pointer-events-none" />
                         )}
                      </div>
                      
                      <div 
                        onMouseEnter={() => setHoveredExpId(exp.id)}
                        onMouseLeave={() => setHoveredExpId(null)}
                        className={`group relative p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-3xl border border-white/10 transition-all duration-700 hover:border-[#7700FF]/40 hover:shadow-[0_20px_60px_-15px_rgba(119,0,255,0.12)] overflow-hidden`}
                      >
                         <div className="absolute -top-[20%] -right-[10%] w-[40%] h-[60%] bg-[#7700FF]/5 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                         
                         <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 relative z-10">
                           <div className="flex flex-col gap-2">
                             <h4 className="text-[17px] font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">{exp.company}</h4>
                             <div className="flex items-center gap-2">
                               <span className="text-[13px] font-bold tracking-wide uppercase text-white/60">{exp.role}</span>
                             </div>
                           </div>
                           
                           <span className="text-[10px] mono text-[#7700FF] bg-[#7700FF]/15 px-4 py-1.5 rounded-full uppercase tracking-widest border border-[#7700FF]/25 font-bold self-start md:self-auto backdrop-blur-md">
                             {exp.period}
                           </span>
                         </div>

                         <div className="mt-8 pt-8 border-t border-white/5 relative z-10">
                           <ul className="space-y-5">
                             {exp.description.map((line, i) => (
                               <li key={i} className="text-[13px] text-gray-500 flex items-start gap-5 leading-relaxed group-hover:text-gray-300 transition-all duration-500">
                                 <div className="mt-2.5 shrink-0">
                                   <div className="w-1.5 h-1.5 rounded-full bg-[#7700FF]/20 group-hover:bg-[#7700FF] shadow-[0_0_8px_rgba(119,0,255,0.2)] group-hover:shadow-[0_0_12px_rgba(119,0,255,0.6)] transition-all" />
                                 </div>
                                 <span className="line-clamp-2 tracking-wide font-normal">{line}</span>
                               </li>
                             ))}
                           </ul>
                         </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 md:px-24 bg-[#080808]">
        <div className="flex flex-col md:flex-row md:items-end mb-24">
           <div>
             <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none uppercase">
               <span className="text-white">WORK</span><br/>
               <span className="text-[#7700FF]">PROJECTS</span>
             </h3>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map(project => (
            <WorkCard 
              key={project.id} 
              project={project} 
              lang={lang} 
              onClick={() => setSelectedProject(project)}
              onEdit={() => setEditingProject(project)}
            />
          ))}
        </div>
      </section>

      {/* Contact Section - Increased pb to shift footer line and content down by 10pt (approx 13px) */}
      <section id="contact" className="pt-16 pb-[94px] px-6 md:px-12 flex flex-col items-center justify-center text-center bg-[#050505] relative overflow-hidden">
        {/* Subtle diffuse background light effects */}
        <div className="absolute top-[25%] left-[15%] w-[35vw] h-[35vw] bg-[#7700FF]/4 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[20%] right-[20%] w-[30vw] h-[30vw] bg-[#4F46E5]/3 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[20vw] bg-[#7700FF]/2 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-grid-white/[0.008] pointer-events-none" />
        
        <h3 className="text-4xl md:text-[5.5vw] font-bold mb-10 tracking-tighter leading-none uppercase opacity-0 animate-[fadeIn_1s_ease-out_forwards] z-10">
          <span className="text-white">LET'S</span><br/>
          <span className="text-[#7700FF]">TALK.</span>
        </h3>
        
        <div className="opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards] z-10">
          <a 
            href="mailto:kriswang1999@gmail.com"
            className="group relative px-14 py-5 bg-white text-black font-bold rounded-full transition-all hover:bg-[#7700FF] hover:text-white hover:scale-105 active:scale-95 flex items-center shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
          >
            <span className="tracking-tight text-base md:text-lg font-bold lowercase">kriswang1999@gmail.com</span>
          </a>
        </div>
      </section>

      {/* Footer Section - Contains the top line and copyright row */}
      <footer className="pt-12 pb-20 px-6 md:px-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 bg-[#050505]">
        <div className="flex items-center">
          <p className="text-base md:text-lg text-white/40 font-medium tracking-tight">
            © Copyright 2026
          </p>
        </div>
        <div className="flex items-center gap-10 md:gap-14">
          <button 
            onClick={() => setActiveContactDetail({ type: 'PHONE', value: '+86 186-2007-1647' })}
            className="text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-95" title="Phone">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82,16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" /></svg>
          </button>
          <button 
            onClick={() => setActiveContactDetail({ type: 'WECHAT', value: 'WJJ_1647' })}
            className="text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-95" title="WeChat">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M11.9,4C7.54,4,4,6.91,4,10.5C4,12.56,5.19,14.39,7,15.61L6.1,18.3L8.8,17.1C9.76,17.36,10.81,17.5,11.9,17.5C12.33,17.5,12.74,17.47,13.15,17.42C12.77,16.5,12.57,15.5,12.57,14.5C12.57,11.46,15.04,9,18.07,9C18.72,9,19.34,9.11,19.92,9.31C19.78,6.33,16.54,4,11.9,4M18.07,10.5C15.86,10.5,14.07,12.29,14.07,14.5C14.07,16.71,15.86,18.5,18.07,18.5C18.67,18.5,19.24,18.37,19.75,18.13L21.3,18.82L20.8,17.26C21.6,16.56,22.07,15.58,22.07,14.5C22.07,12.29,20.28,10.5,18.07,10.5Z" /></svg>
          </button>
          <a href="mailto:kriswang1999@gmail.com" className="text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-95" title="Gmail">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.11,4 20,4M20,8L12,13L4,8V6L12,11L20,6V8Z" /></svg>
          </a>
          <a href="https://www.linkedin.com/in/krista-wang" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-all transform hover:scale-110 active:scale-95" title="LinkedIn">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C13.93,9.94 13,10.63 12.59,11.24V10.13H10.13V18.5H12.59V14.24C12.59,13.11 12.8,12.03 14.19,12.03C15.55,12.03 15.58,13.3 15.58,14.32V18.5H18.5M6.31,8.31C7.09,8.31 7.72,7.68 7.72,6.9C7.72,6.12 7.09,5.49 6.31,5.49C5.53,5.49 4.9,6.12 4.9,6.9C4.9,7.68 5.53,8.31 6.31,8.31M5.08,18.5H7.54V10.13H5.08V18.5Z" /></svg>
          </a>
        </div>
      </footer>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#050505] animate-[fadeIn_0.5s_cubic-bezier(0.19,1,0.22,1)]">
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
          <button 
            onClick={() => setSelectedProject(null)}
            className="fixed top-10 right-10 z-[210] w-14 h-14 rounded-full bg-white/5 backdrop-blur-2xl flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-all hover:rotate-90"
          >
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
          </button>

          <div className="max-w-7xl mx-auto py-32 px-6 md:px-16">
            <div className="mb-32">
              <p className="text-[#7700FF] mono text-xs mb-6 uppercase tracking-[0.3em] font-bold">{selectedProject.category}</p>
              <h2 className="text-6xl md:text-[10vw] font-bold mb-16 leading-[0.8] tracking-tighter uppercase">{selectedProject.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-20 py-16 border-y border-white/5">
                <div>
                  <h4 className="text-white/30 text-[10px] mono uppercase mb-6 tracking-widest uppercase">{t.modal.challenge}</h4>
                  <p className="text-gray-400 leading-relaxed text-lg">{selectedProject.challenge}</p>
                </div>
                <div>
                  <h4 className="text-white/30 text-[10px] mono uppercase mb-6 tracking-widest uppercase">{t.modal.solution}</h4>
                  <p className="text-gray-400 leading-relaxed text-lg">{selectedProject.solution}</p>
                </div>
                <div>
                  <h4 className="text-white/30 text-[10px] mono uppercase mb-6 tracking-widest uppercase">{t.modal.results}</h4>
                  <ul className="space-y-6">
                    {selectedProject.metrics.map((m, i) => (
                      <li key={i} className="text-2xl font-bold flex items-center gap-4 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7700FF] shadow-[0_0_10px_#7700FF]" />
                        <span className="group-hover:translate-x-1 transition-transform">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-16">
              {selectedProject.longImages.map((src, i) => (
                <div key={i} className="rounded-[3rem] overflow-hidden bg-white/5 border border-white/5 shadow-2xl">
                  <img src={src} className="w-full h-auto object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            
            <div className="mt-32 text-center">
               <button 
                onClick={() => setSelectedProject(null)}
                className="px-12 py-5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all mono uppercase tracking-widest text-xs"
               >
                 Close Case Study
               </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatUp {
          0% { transform: translateY(20%) scale(1); opacity: 0.2; }
          100% { transform: translateY(-30%) scale(1.1); opacity: 0.5; }
        }
        .bg-grid-white {
          background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
