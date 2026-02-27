
import React from 'react';
import { ArrowLeft, Mail, Instagram, Youtube, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-24 selection:bg-amber-500 selection:text-black">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-white transition-colors mb-12 font-bold uppercase tracking-widest">
          <ArrowLeft size={20} /> Voltar para o Início
        </Link>
        
        <h1 className="text-6xl md:text-8xl font-oswald font-black uppercase tracking-tighter mb-8">
          CONTATO <span className="text-amber-500">DIRETO</span>
        </h1>
        
        <p className="text-zinc-400 text-xl md:text-2xl mb-16 max-w-2xl leading-relaxed">
          Para shows, parcerias, imprensa ou qualquer outro assunto, entre em contato através do nosso canal oficial.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-zinc-900/50 p-10 rounded-2xl border border-zinc-800 hover:border-amber-500/50 transition-all group">
            <Mail className="text-amber-500 mb-6 group-hover:scale-110 transition-transform" size={48} />
            <h3 className="text-2xl font-oswald font-bold uppercase mb-2">E-mail Oficial</h3>
            <a href="mailto:escombrohc@gmail.com" className="text-3xl md:text-4xl font-black text-white hover:text-amber-500 transition-colors break-all">
              escombrohc@gmail.com
            </a>
          </div>
          
          <div className="flex flex-col justify-center gap-6">
            <h3 className="text-xl font-oswald font-bold uppercase text-zinc-500 tracking-widest">Siga a Resistência</h3>
            <div className="flex gap-4">
              <a href="#" className="p-4 bg-zinc-900 rounded-xl hover:bg-amber-500 transition-all hover:-translate-y-1"><Instagram size={32} /></a>
              <a href="#" className="p-4 bg-zinc-900 rounded-xl hover:bg-amber-500 transition-all hover:-translate-y-1"><Youtube size={32} /></a>
              <a href="#" className="p-4 bg-zinc-900 rounded-xl hover:bg-amber-500 transition-all hover:-translate-y-1"><Facebook size={32} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
