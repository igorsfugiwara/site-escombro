
import React from 'react';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-24 selection:bg-amber-500 selection:text-black">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-white transition-colors mb-12 font-bold uppercase tracking-widest">
          <ArrowLeft size={20} /> Voltar para o Início
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
          <ShieldAlert className="text-amber-500" size={48} />
          <h1 className="text-5xl md:text-7xl font-oswald font-black uppercase tracking-tighter">
            POLÍTICA DE <span className="text-amber-500">COLETIVIDADE</span>
          </h1>
        </div>
        
        <div className="prose prose-invert prose-amber max-w-none space-y-12 text-zinc-400 text-lg leading-relaxed">
          <section>
            <h2 className="text-3xl font-oswald font-bold text-white uppercase tracking-tight mb-4">1. Propriedade Privada é Roubo</h2>
            <p>
              Neste espaço digital, rejeitamos a lógica da mercadoria. Seus dados não são ativos para serem vendidos ao capital financeiro. O que você compartilha conosco pertence à coletividade da cena, não a algoritmos de vigilância burguesa.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-oswald font-bold text-white uppercase tracking-tight mb-4">2. Vigilância do Estado e do Capital</h2>
            <p>
              Coletamos o mínimo necessário para a organização da nossa luta. Não rastreamos seus passos para alimentar a máquina de consumo. Nossa única "cookies" são aquelas que dividimos na van entre um show e outro.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-oswald font-bold text-white uppercase tracking-tight mb-4">3. Transparência Revolucionária</h2>
            <p>
              Qualquer informação que você nos confia é protegida contra as garras do imperialismo digital. Se o sistema cair, cairemos juntos, mas seus dados não serão entregues sem resistência.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-oswald font-bold text-white uppercase tracking-tight mb-4">4. O Direito ao Esquecimento</h2>
            <p>
              Se você decidir se retirar da nossa base de dados, faremos isso com a mesma velocidade que um riff de 200 BPM. Ninguém é obrigado a permanecer sob o olhar da organização se assim não desejar.
            </p>
          </section>

          <div className="pt-12 border-t border-zinc-800">
            <p className="italic text-amber-500 font-bold">
              "Trabalhadores de todo o mundo, uni-vos! (E protejam seus dados)."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
