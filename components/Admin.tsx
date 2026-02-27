
import React, { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';
import { INITIAL_ALBUMS, INITIAL_TOUR_DATES, INITIAL_NEWS, INITIAL_HERO, sortNews } from '../constants';
import { Album, TourDate, NewsItem } from '../types';
import { Plus, Trash2, Save, ArrowLeft, Lock, LogOut } from 'lucide-react';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [saving, setSaving] = useState(false);

  const [albums, setAlbums] = useState<Album[]>(INITIAL_ALBUMS);
  const [tourDates, setTourDates] = useState<TourDate[]>(INITIAL_TOUR_DATES);
  const [news, setNews] = useState<NewsItem[]>(sortNews(INITIAL_NEWS));
  const [hero, setHero] = useState(INITIAL_HERO);
  const [activeTab, setActiveTab] = useState<'hero' | 'albums' | 'tour' | 'news'>('hero');

  // Auth state listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsub();
  }, []);

  // Load current Firestore data into admin form
  useEffect(() => {
    if (!isLoggedIn) return;

    const unsubAlbums = onSnapshot(doc(db, 'siteData', 'albums'), (snap) => {
      if (snap.exists()) setAlbums(snap.data().items ?? INITIAL_ALBUMS);
    });
    const unsubTour = onSnapshot(doc(db, 'siteData', 'tourDates'), (snap) => {
      if (snap.exists()) setTourDates(snap.data().items ?? INITIAL_TOUR_DATES);
    });
    const unsubNews = onSnapshot(doc(db, 'siteData', 'news'), (snap) => {
      if (snap.exists()) setNews(sortNews(snap.data().items ?? INITIAL_NEWS));
    });
    const unsubHero = onSnapshot(doc(db, 'siteData', 'hero'), (snap) => {
      if (snap.exists()) setHero(snap.data() as typeof INITIAL_HERO);
    });

    return () => {
      unsubAlbums();
      unsubTour();
      unsubNews();
      unsubHero();
    };
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setLoginError('E-mail ou senha incorretos');
    }
  };

  const handleLogout = () => signOut(auth);

  const handleReset = async () => {
    if (!confirm('Isso irá restaurar todos os dados para os valores originais. Deseja continuar?')) return;
    setSaving(true);
    try {
      await Promise.all([
        setDoc(doc(db, 'siteData', 'albums'), { items: INITIAL_ALBUMS }),
        setDoc(doc(db, 'siteData', 'tourDates'), { items: INITIAL_TOUR_DATES }),
        setDoc(doc(db, 'siteData', 'news'), { items: sortNews(INITIAL_NEWS) }),
        setDoc(doc(db, 'siteData', 'hero'), INITIAL_HERO),
      ]);
      alert('Dados restaurados com sucesso!');
    } catch (err) {
      alert('Erro ao restaurar dados. Tente novamente.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const sortedNews = sortNews(news);
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Tempo esgotado. Verifique as regras do Firestore.')), 10000)
      );
      await Promise.race([
        Promise.all([
          setDoc(doc(db, 'siteData', 'albums'), { items: albums }),
          setDoc(doc(db, 'siteData', 'tourDates'), { items: tourDates }),
          setDoc(doc(db, 'siteData', 'news'), { items: sortedNews }),
          setDoc(doc(db, 'siteData', 'hero'), hero),
        ]),
        timeout,
      ]);
      setNews(sortedNews);
      alert('Dados salvos com sucesso!');
    } catch (err) {
      alert(`Erro ao salvar: ${err instanceof Error ? err.message : 'Verifique sua conexão e tente novamente.'}`);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const addItem = (type: 'albums' | 'tour' | 'news') => {
    if (type === 'albums') {
      const newItem: Album = { id: Date.now().toString(), title: 'Novo Álbum', year: '2024', cover: 'https://picsum.photos/seed/new/600/600', link: '#' };
      setAlbums([...albums, newItem]);
    } else if (type === 'tour') {
      const newItem: TourDate = { id: Date.now().toString(), date: '01 JAN', city: 'Cidade - UF', venue: 'Local', ticketLink: '#' };
      setTourDates([...tourDates, newItem]);
    } else {
      const newItem: NewsItem = { id: Date.now().toString(), title: 'Nova Notícia', date: '01/01/2024', excerpt: 'Resumo da notícia...', imageUrl: 'https://picsum.photos/seed/newnews/800/450', link: '#' };
      setNews([...news, newItem]);
    }
  };

  const removeItem = (type: 'albums' | 'tour' | 'news', id: string) => {
    if (type === 'albums') setAlbums(albums.filter(i => i.id !== id));
    else if (type === 'tour') setTourDates(tourDates.filter(i => i.id !== id));
    else setNews(news.filter(i => i.id !== id));
  };

  const updateItem = (type: 'albums' | 'tour' | 'news', id: string, field: string, value: string) => {
    if (type === 'albums') {
      setAlbums(albums.map(i => i.id === id ? { ...i, [field]: value } : i));
    } else if (type === 'tour') {
      setTourDates(tourDates.map(i => i.id === id ? { ...i, [field]: value } : i));
    } else {
      setNews(news.map(i => i.id === id ? { ...i, [field]: value } : i));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-amber-500/10 rounded-full text-amber-500">
              <Lock size={40} />
            </div>
          </div>
          <h1 className="text-3xl font-oswald font-black text-center mb-8 uppercase tracking-tighter">
            ADMIN <span className="text-amber-500">ESCOMBRO</span>
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-zinc-400 uppercase mb-2">E-mail</label>
              <input
                type="email"
                className="w-full bg-zinc-800 p-3 rounded border border-zinc-700 focus:border-amber-500 outline-none text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-400 uppercase mb-2">Senha</label>
              <input
                type="password"
                className="w-full bg-zinc-800 p-3 rounded border border-zinc-700 focus:border-amber-500 outline-none text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {loginError && <p className="text-red-500 text-sm font-bold">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-4 rounded transition-all uppercase tracking-widest"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6 md:mb-12">
          <div className="flex items-center gap-3">
            <a href="/" className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </a>
            <h1 className="text-2xl md:text-4xl font-oswald font-black uppercase tracking-tighter">
              CMS <span className="text-amber-500">ESCOMBRO</span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-4">
            <button
              onClick={handleReset}
              disabled={saving}
              className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white font-bold py-2 px-3 md:py-3 md:px-6 text-xs md:text-sm rounded transition-all disabled:opacity-50"
            >
              RESTAURAR PADRÕES
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 px-3 md:py-3 md:px-6 text-xs md:text-sm rounded transition-all"
            >
              <LogOut size={16} /> SAIR
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-3 md:py-3 md:px-8 text-xs md:text-sm rounded transition-all disabled:opacity-50"
            >
              <Save size={16} /> {saving ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
            </button>
          </div>
        </div>

        <div className="flex gap-2 md:gap-4 mb-6 md:mb-8 border-b border-zinc-800 overflow-x-auto">
          {(['hero', 'albums', 'tour', 'news'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 md:pb-4 px-3 md:px-4 text-sm md:text-base font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'text-amber-500 border-b-2 border-amber-500' : 'text-zinc-500 hover:text-white'}`}
            >
              {tab === 'hero' ? 'Hero' : tab === 'albums' ? 'Discografia' : tab === 'tour' ? 'Tour' : 'Notícias'}
            </button>
          ))}
        </div>

        <div className="bg-zinc-900/50 p-3 md:p-6 rounded-xl border border-zinc-800">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-lg md:text-2xl font-oswald font-bold uppercase">
              Gerenciar {activeTab === 'hero' ? 'Hero Section' : activeTab === 'albums' ? 'Álbuns' : activeTab === 'tour' ? 'Datas' : 'Postagens'}
            </h2>
            {activeTab !== 'hero' && (
              <button
                onClick={() => addItem(activeTab)}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-4 rounded transition-all"
              >
                <Plus size={18} /> ADICIONAR
              </button>
            )}
          </div>

          <div className="space-y-6">
            {activeTab === 'hero' && (
              <div className="grid grid-cols-1 gap-6 p-4 bg-black/40 rounded border border-zinc-800">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Título Principal (Use | para quebrar linha)</label>
                  <input
                    className="w-full bg-zinc-800 p-3 rounded border border-zinc-700 focus:border-amber-500 outline-none"
                    value={hero.title}
                    onChange={(e) => setHero({ ...hero, title: e.target.value })}
                    placeholder="Ex: HARDCORE POR UM | MUNDO MAIS DIGNO"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Subtítulo</label>
                  <textarea
                    className="w-full bg-zinc-800 p-3 rounded border border-zinc-700 focus:border-amber-500 outline-none h-24"
                    value={hero.subtitle}
                    onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">URL da Imagem de Fundo</label>
                  <input
                    className="w-full bg-zinc-800 p-3 rounded border border-zinc-700 focus:border-amber-500 outline-none"
                    value={hero.imageUrl}
                    onChange={(e) => setHero({ ...hero, imageUrl: e.target.value })}
                  />
                </div>
              </div>
            )}

            {activeTab === 'albums' && albums.map(album => (
              <div key={album.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-black/40 rounded border border-zinc-800 relative group">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Título</label>
                  <input
                    className="w-full bg-zinc-800 p-2 rounded border border-zinc-700 focus:border-amber-500 outline-none"
                    value={album.title}
                    onChange={(e) => updateItem('albums', album.id, 'title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Ano</label>
                  <input
                    className="w-full bg-zinc-800 p-2 rounded border border-zinc-700 focus:border-amber-500 outline-none"
                    value={album.year}
                    onChange={(e) => updateItem('albums', album.id, 'year', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">URL da Capa</label>
                  <input
                    className="w-full bg-zinc-800 p-2 rounded border border-zinc-700 focus:border-amber-500 outline-none"
                    value={album.cover}
                    onChange={(e) => updateItem('albums', album.id, 'cover', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Link Spotify</label>
                  <input
                    className="w-full bg-zinc-800 p-2 rounded border border-zinc-700 focus:border-amber-500 outline-none"
                    value={album.link}
                    onChange={(e) => updateItem('albums', album.id, 'link', e.target.value)}
                  />
                </div>
                <div className="flex items-end pb-1">
                  <button
                    onClick={() => removeItem('albums', album.id)}
                    className="text-red-500 hover:text-red-400 p-2 flex justify-center items-center w-full bg-red-500/10 rounded"
                  >
                    <Trash2 size={20} /> <span className="ml-2 font-bold text-xs">REMOVER</span>
                  </button>
                </div>
              </div>
            ))}

            {activeTab === 'tour' && tourDates.map(show => (
              <div key={show.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-black/40 rounded border border-zinc-800">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Data</label>
                  <input
                    className="w-full bg-zinc-800 p-2 rounded border border-zinc-700 focus:border-amber-500 outline-none"
                    value={show.date}
                    onChange={(e) => updateItem('tour', show.id, 'date', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Cidade</label>
                  <input
                    className="w-full bg-zinc-800 p-2 rounded border border-zinc-700 focus:border-amber-500 outline-none"
                    value={show.city}
                    onChange={(e) => updateItem('tour', show.id, 'city', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Local</label>
                  <input
                    className="w-full bg-zinc-800 p-2 rounded border border-zinc-700 focus:border-amber-500 outline-none"
                    value={show.venue}
                    onChange={(e) => updateItem('tour', show.id, 'venue', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Link</label>
                  <input
                    className="w-full bg-zinc-800 p-2 rounded border border-zinc-700 focus:border-amber-500 outline-none"
                    value={show.ticketLink}
                    onChange={(e) => updateItem('tour', show.id, 'ticketLink', e.target.value)}
                  />
                </div>
                <div className="flex items-end pb-1">
                  <button
                    onClick={() => removeItem('tour', show.id)}
                    className="text-red-500 hover:text-red-400 p-2 flex justify-center items-center w-full bg-red-500/10 rounded"
                  >
                    <Trash2 size={20} /> <span className="ml-2 font-bold text-xs">REMOVER</span>
                  </button>
                </div>
              </div>
            ))}

            {activeTab === 'news' && news.map(item => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-black/40 rounded border border-zinc-800">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Título</label>
                  <input
                    className="w-full bg-zinc-800 p-2 rounded border border-zinc-700 focus:border-amber-500 outline-none"
                    value={item.title}
                    onChange={(e) => updateItem('news', item.id, 'title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Data</label>
                  <input
                    className="w-full bg-zinc-800 p-2 rounded border border-zinc-700 focus:border-amber-500 outline-none"
                    value={item.date}
                    onChange={(e) => updateItem('news', item.id, 'date', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Resumo</label>
                  <input
                    className="w-full bg-zinc-800 p-2 rounded border border-zinc-700 focus:border-amber-500 outline-none"
                    value={item.excerpt}
                    onChange={(e) => updateItem('news', item.id, 'excerpt', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Imagem</label>
                  <input
                    className="w-full bg-zinc-800 p-2 rounded border border-zinc-700 focus:border-amber-500 outline-none"
                    value={item.imageUrl}
                    onChange={(e) => updateItem('news', item.id, 'imageUrl', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Link</label>
                  <input
                    className="w-full bg-zinc-800 p-2 rounded border border-zinc-700 focus:border-amber-500 outline-none"
                    value={item.link}
                    onChange={(e) => updateItem('news', item.id, 'link', e.target.value)}
                  />
                </div>
                <div className="flex items-end pb-1">
                  <button
                    onClick={() => removeItem('news', item.id)}
                    className="text-red-500 hover:text-red-400 p-2 flex justify-center items-center w-full bg-red-500/10 rounded"
                  >
                    <Trash2 size={20} /> <span className="ml-2 font-bold text-xs">REMOVER</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
