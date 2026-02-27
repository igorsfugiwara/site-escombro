
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Youtube, Play, Ticket, ExternalLink, ChevronRight, Settings } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import SectionHeading from './components/SectionHeading';
import { INITIAL_ALBUMS, INITIAL_TOUR_DATES, INITIAL_NEWS, INITIAL_HERO, sortNews } from './constants';
import { Album, TourDate, NewsItem } from './types';
import Admin from './components/Admin';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import Press from './components/Press';
import { Toaster } from 'react-hot-toast';

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [albums, setAlbums] = useState<Album[]>(INITIAL_ALBUMS);
  const [tourDates, setTourDates] = useState<TourDate[]>(INITIAL_TOUR_DATES);
  const [news, setNews] = useState<NewsItem[]>(sortNews(INITIAL_NEWS));
  const [hero, setHero] = useState(INITIAL_HERO);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const fetchData = async () => {
      const [albumsSnap, tourSnap, newsSnap, heroSnap] = await Promise.all([
        getDoc(doc(db, 'siteData', 'albums')),
        getDoc(doc(db, 'siteData', 'tourDates')),
        getDoc(doc(db, 'siteData', 'news')),
        getDoc(doc(db, 'siteData', 'hero')),
      ]);
      if (albumsSnap.exists()) setAlbums(albumsSnap.data().items ?? INITIAL_ALBUMS);
      if (tourSnap.exists()) setTourDates(tourSnap.data().items ?? INITIAL_TOUR_DATES);
      if (newsSnap.exists()) setNews(sortNews(newsSnap.data().items ?? INITIAL_NEWS));
      if (heroSnap.exists()) setHero(heroSnap.data() as typeof INITIAL_HERO);
    };
    fetchData();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Tour', href: '#tour' },
    { name: 'Discografia', href: '#music' },
    { name: 'Notícias', href: '#news' },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-black">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 py-4 border-b border-zinc-800' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="text-3xl font-oswald font-black tracking-tighter text-white">
            ESCOMBRO<span className="text-amber-500">HC</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="font-oswald font-bold text-lg hover:text-amber-500 transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-4 ml-8">
              <Instagram size={20} className="hover:text-amber-500 cursor-pointer" />
              <Youtube size={20} className="hover:text-amber-500 cursor-pointer" />
              <Link to="/admin" className="hover:text-amber-500 transition-colors">
                <Settings size={20} />
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 text-4xl font-oswald font-black uppercase md:hidden">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500">
                {link.name}
              </a>
            ))}
            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="hover:text-amber-500">Admin</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={hero.imageUrl}
            alt="Escombro HC Live"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-[3.5rem] md:text-9xl font-oswald font-black leading-none mb-4 mt-12 md:mt-0 animate-tighten flex flex-col items-center">
            {hero.title.includes('|') ? (
              <>
                <span>{hero.title.split('|')[0]}</span>
                <span className="text-amber-500">{hero.title.split('|')[1]}</span>
              </>
            ) : (
              <>
                <span>{hero.title.split(' ').slice(0, Math.ceil(hero.title.split(' ').length / 2)).join(' ')}</span>
                <span className="text-amber-500">{hero.title.split(' ').slice(Math.ceil(hero.title.split(' ').length / 2)).join(' ')}</span>
              </>
            )}
          </h1>
          <p className="max-w-2xl w-[90%] md:w-auto mx-auto text-zinc-400 text-base md:text-xl font-medium mb-10 tracking-wide uppercase italic">
            {hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://open.spotify.com/intl-pt/artist/11PXwcpndk1zz25pgz8uDY"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-700 text-white font-oswald font-black py-4 px-10 text-xl tracking-widest transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              OUÇA AGORA <Play fill="white" size={20} />
            </a>
            <a
              href="#tour"
              className="border-2 border-white hover:bg-white hover:text-black text-white font-oswald font-black py-4 px-10 text-xl tracking-widest transition-all transform hover:scale-105 active:scale-95"
            >
              VER TOUR
            </a>
          </div>
        </div>
      </header>

      {/* Tour Dates Section */}
      <section id="tour" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Tour 2026" subtitle="O Grito das Ruas pelo Brasil" />
          <div className="grid gap-4 mt-12">
            {tourDates.map((show) => (
              <div key={show.id} className="group bg-black/40 hover:bg-amber-500 p-6 flex flex-wrap items-center justify-between transition-all duration-300 border-b border-zinc-800 hover:border-transparent">
                <div className="flex items-center gap-0 md:gap-8 min-w-[300px]">
                  <span className="text-3xl font-oswald font-black text-amber-500 group-hover:text-white transition-colors">
                    {show.date}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight">{show.city}</h3>
                    <p className="text-zinc-500 uppercase font-bold group-hover:text-white/80">{show.venue}</p>
                  </div>
                </div>
                <a
                  href={show.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-zinc-800 group-hover:bg-white group-hover:text-amber-600 text-white font-black py-3 px-8 rounded transition-all"
                >
                  INGRESSOS <Ticket size={18} />
                </a>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href="#" className="inline-flex items-center gap-2 text-amber-500 font-bold hover:underline">
              VER TODAS AS DATAS <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Discography Section */}
      <section id="music" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Discografia" subtitle="Sombras, Luta e Resistência" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {albums.map((album) => (
              <div key={album.id} className="group relative overflow-hidden aspect-square cursor-pointer">
                <img
                  src={album.cover}
                  alt={album.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 transition-opacity"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-amber-500 font-bold text-sm mb-1">{album.year}</span>
                  <h3 className="text-2xl font-oswald font-black leading-none mb-4">{album.title}</h3>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <a
                      href={album.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black p-2 rounded-full hover:bg-amber-500 hover:text-white transition-colors"
                    >
                      <Play size={20} fill="currentColor" />
                    </a>
                    <a
                      href={album.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black p-2 rounded-full hover:bg-amber-500 hover:text-white transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section id="news" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Últimas" subtitle="Notícias do Front" />
          <div className="grid md:grid-cols-2 gap-10 mt-12">
            {news.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer block"
              >
                <div className="overflow-hidden mb-6 aspect-video">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-amber-500 font-bold text-sm">{item.date}</span>
                <h3 className="text-3xl font-oswald font-black mt-2 mb-4 group-hover:text-amber-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  {item.excerpt}
                </p>
                <div className="flex items-center gap-2 font-black uppercase tracking-widest text-sm group-hover:gap-4 transition-all">
                  LER MAIS <ChevronRight size={18} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 pt-20 pb-10 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <h2 className="text-4xl font-oswald font-black tracking-tighter mb-6">
                ESCOMBRO<span className="text-amber-500">HC</span>
              </h2>
              <p className="text-zinc-500 max-w-md text-lg leading-relaxed">
              Nascido no caos urbano de São Paulo em 2016, o Escombro é uma banda de hardcore com forte crítica social, que expõe desigualdades, opressões e as lutas cotidianas da população brasileira através de letras diretas e urgentes. Através do hardcore, levamos união, consciência e respeito para quem é da luta.
              </p>
            </div>
            <div>
              <h4 className="font-oswald text-xl font-bold uppercase mb-6 text-amber-500">Links Rápidos</h4>
              <ul className="space-y-4 font-medium text-zinc-400">
                <li><Link to="/imprensa" className="hover:text-white transition-colors">Imprensa</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Loja Oficial</a></li>
                <li><Link to="/politica" className="hover:text-white transition-colors">Políticas</Link></li>
                <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-oswald text-xl font-bold uppercase mb-6 text-amber-500">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-zinc-900 rounded hover:bg-amber-500 transition-all"><Instagram size={24} /></a>
                <a href="#" className="p-3 bg-zinc-900 rounded hover:bg-amber-500 transition-all"><Youtube size={24} /></a>
                <a href="#" className="p-3 bg-zinc-900 rounded hover:bg-amber-500 transition-all"><Facebook size={24} /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-900 pt-10 text-center text-zinc-600 text-sm font-medium">
            <p>© {new Date().getFullYear()} ESCOMBRO HC. CRIADO PELA E PARA A CENA UNDERGROUND.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster position="bottom-center" toastOptions={{ style: { background: '#18181b', color: '#fff', border: '1px solid #3f3f46' } }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/politica" element={<PrivacyPolicy />} />
        <Route path="/imprensa" element={<Press />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
