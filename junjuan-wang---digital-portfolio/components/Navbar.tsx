
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, activeSection }) => {
  const t = TRANSLATIONS[lang].nav;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 flex justify-between items-center bg-transparent backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-black text-xl">
           W
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-bold text-sm tracking-tight">KRISTA'S SPACE</span>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-12">
        <ul className="flex gap-12 text-[11px] font-bold tracking-[0.2em] uppercase mono">
          <li>
            <button 
              onClick={() => scrollTo('about')}
              className={`transition-all hover:text-[#7700FF] ${activeSection === 'about' ? 'text-[#7700FF] border-b border-[#7700FF]' : 'text-gray-400'}`}
            >
              {t.about}
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollTo('projects')}
              className={`transition-all hover:text-[#7700FF] ${activeSection === 'projects' ? 'text-[#7700FF] border-b border-[#7700FF]' : 'text-gray-400'}`}
            >
              {t.projects}
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollTo('contact')}
              className={`transition-all hover:text-[#7700FF] ${activeSection === 'contact' ? 'text-[#7700FF] border-b border-[#7700FF]' : 'text-gray-400'}`}
            >
              {t.contact}
            </button>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-5 py-2 rounded-full border border-white/20 text-[10px] mono font-bold hover:bg-white hover:text-black transition-all uppercase tracking-widest">
          {lang === 'en' ? 'Available for Hire' : '开放职位申请'}
        </button>
        <button 
          onClick={() => setLang(lang === 'en' ? 'cn' : 'en')}
          className="px-3 h-8 rounded-full border border-white/10 flex items-center justify-center gap-2 text-[10px] mono hover:bg-white hover:text-black transition-all group"
        >
          {lang === 'en' ? (
             <>
               <span className="text-base">🇬🇧</span>
               <span className="font-bold">EN</span>
             </>
          ) : (
            <>
              <span className="text-base">🇨🇳</span>
              <span className="font-bold">中</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
