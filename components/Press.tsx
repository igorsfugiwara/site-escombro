
import React from 'react';
import { ArrowLeft, Folder, ExternalLink, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Press: React.FC = () => {
  const driveBaseUrl = "https://drive.google.com/drive/u/0/folders/1TrHCJbkN6jzvoDiMC4mZoRxPBO1lskgf";
  
  const folders = [
    { name: "1. Disco", icon: <Folder size={24} /> },
    { name: "2. Artes", icon: <Folder size={24} /> },
    { name: "3. Fotos", icon: <Folder size={24} /> },
    { name: "4. Video clipes", icon: <Folder size={24} /> },
    { name: "5. Teasers", icon: <Folder size={24} /> },
    { name: "6. Rider e Mapa de Palco", icon: <Folder size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-24 selection:bg-amber-500 selection:text-black">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-white transition-colors mb-12 font-bold uppercase tracking-widest">
          <ArrowLeft size={20} /> Voltar para o Início
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="text-6xl md:text-8xl font-oswald font-black uppercase tracking-tighter mb-4">
              PRESS <span className="text-amber-500">KIT</span>
            </h1>
            <p className="text-zinc-400 text-xl max-w-xl">
              Material oficial para produtores, jornalistas e parceiros. Fotos em alta, artes e riders técnicos.
            </p>
          </div>
          <a 
            href={driveBaseUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white font-black py-4 px-8 rounded-xl transition-all transform hover:scale-105"
          >
            ACESSAR GOOGLE DRIVE <ExternalLink size={20} />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {folders.map((folder, index) => (
            <a 
              key={index}
              href={driveBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-800/50 transition-all flex flex-col justify-between h-48"
            >
              <div className="text-amber-500 group-hover:scale-110 transition-transform origin-left">
                {folder.icon}
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-oswald font-bold uppercase tracking-tight text-white group-hover:text-amber-500 transition-colors">
                  {folder.name}
                </h3>
                <Download size={18} className="text-zinc-600 group-hover:text-amber-500 transition-colors" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-24 p-12 bg-zinc-900/30 rounded-3xl border border-zinc-800/50 text-center">
          <h4 className="text-2xl font-oswald font-bold uppercase mb-4">Precisa de algo específico?</h4>
          <p className="text-zinc-500 mb-8">Se não encontrou o que procurava no Drive, entre em contato direto com nossa produção.</p>
          <Link to="/contato" className="text-amber-500 font-black uppercase tracking-widest hover:underline">
            Falar com a Produção
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Press;
