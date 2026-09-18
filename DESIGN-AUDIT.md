# Auditoria de Design System — Escombro HC (site-escombro)

> Relatório gerado por auditoria estática do código-fonte em `2026-07-29`.
> Nenhum arquivo do repositório foi alterado. Onde não há evidência direta no código, está escrito **"não definido"**.

---

## 1. STACK

### Framework e ferramentas
| Item | Valor exato (de `package.json` / `node_modules`) |
|---|---|
| Framework | React `19.2.4` |
| Roteamento | react-router-dom `7.13.1` (`BrowserRouter`) |
| Bundler / dev server | Vite `6.4.1` (`package.json` pede `^6.2.0`) — plugin `@vitejs/plugin-react` `5.1.4` |
| Linguagem | TypeScript `5.8.3` (`tsc --noEmit` usado como "lint") |
| Gerenciador de pacotes | npm (existe `package-lock.json`; não há `yarn.lock` nem `pnpm-lock.yaml`) |
| CSS | **Tailwind CSS via CDN** (`<script src="https://cdn.tailwindcss.com"></script>` em `index.html:8` e `dist/index.html`) — **sem `tailwind.config.js`** no repo e **sem versão fixada** na URL do script. Não há build-step de PurgeCSS/PostCSS local: as classes Tailwind são compiladas em tempo de execução, no navegador, a partir do tema padrão da versão que a CDN estiver servindo naquele momento. |
| Backend/dados | Firebase `12.9.0` (Firestore para conteúdo dinâmico, Auth para login do admin, Analytics) — config em [firebase.ts](firebase.ts) lida via variáveis `VITE_FIREBASE_*` em `.env.local` (arquivo ignorado pelo git) |
| Notificações UI | `react-hot-toast` `2.6.0` |
| Ícones | `lucide-react` `0.563.0` |
| Dependência não utilizada | `@google/genai` `1.42.0` está em `package.json` e o tipo `ChatMessage` existe em [types.ts](types.ts), mas **não há nenhum import/uso real** de `genai`, `GEMINI` ou `ChatMessage` em nenhum componente — resíduo do scaffold original do Google AI Studio (ver `README.md` e `metadata.json`, que também pede permissão de microfone não utilizada na UI atual). |

### Estrutura de pastas relevante
```
/
├── App.tsx                  # componente raiz + todas as seções da home (Home) + <Routes>
├── index.tsx                 # entrypoint (ReactDOM.createRoot)
├── index.html                 # <head>: Tailwind CDN, Google Fonts, CSS global inline, favicon
├── constants.tsx              # dados iniciais (álbuns, tour dates, notícias, hero) + helpers de data
├── types.ts                   # interfaces TS (Album, TourDate, NewsItem, ChatMessage)
├── firebase.ts                 # init do Firebase (app, db, auth, analytics)
├── components/
│   ├── SectionHeading.tsx      # título de seção reutilizável
│   ├── Admin.tsx                # painel CMS (login + CRUD de hero/álbuns/tour/notícias)
│   ├── Contact.tsx              # página /contato
│   ├── Press.tsx                 # página /imprensa (press kit)
│   └── PrivacyPolicy.tsx          # página /politica
├── assets/
│   └── fav.png                    # único arquivo de imagem versionado no repo (favicon)
├── dist/                           # build de produção (gerado pelo Vite, gitignored)
└── vercel.json                      # regra de rewrite SPA
```
**Não há** pasta `styles/`, `css/`, `theme/` ou arquivo `.css`/`.scss` no projeto — todo o estilo vem de classes utilitárias Tailwind inline no JSX, mais um bloco `<style>` global dentro de [index.html](index.html) (linhas 13–42). Não há biblioteca de componentes de UI (nenhum shadcn/MUI/Chakra etc.).

### Build e deploy
- **Build**: `npm run build` → `vite build`, gera `dist/` (confirmado: `dist/index.html` e `dist/assets/index-BZkfdGd7.js` + `dist/assets/fav-B1yrjNOj.png` presentes no disco).
- **Dev**: `npm run dev` → Vite dev server na porta `3000`, `host: 0.0.0.0` ([vite.config.ts](vite.config.ts)).
- **Deploy**: [vercel.json](vercel.json) contém rewrite de SPA (`/(.*)` → `/index.html`), e o histórico de commits inclui `"chore: trigger vercel rebuild"` → deploy no **Vercel**. Remote git: `git@github.com:igorsfugiwara/site-escombro.git`.
- Alias de import `@` → raiz do projeto, configurado tanto em `vite.config.ts` quanto em `tsconfig.json`.

---

## 2. TOKENS DE COR

### Cores literais definidas no código (hardcoded, fora do Tailwind)
Estas são as únicas cores com valor exato **escrito diretamente** no repositório, todas dentro do `<style>` global de [index.html](index.html):

| Valor | Onde | Uso |
|---|---|---|
| `#0a0a0a` | `body { background-color: ... }` (index.html:16) | fundo base do `<body>` (por trás do `bg-gritty` e do conteúdo) |
| `#ffffff` | `body { color: ... }` (index.html:17) | cor de texto base do `<body>` |
| `#000` | `::-webkit-scrollbar-track { background: ... }` (index.html:33) | trilho da scrollbar (Webkit) |
| `#d97706` | `::-webkit-scrollbar-thumb { background: ... }` (index.html:36) e em `rgba(217, 119, 6, 0.8)` na classe `.text-glow-amber` (index.html:27) | polegar da scrollbar; sombra de texto (classe definida mas **não usada** em nenhum componente) |
| `#b45309` | `::-webkit-scrollbar-thumb:hover { background: ... }` (index.html:40) | hover do polegar da scrollbar |

Não há arquivo `tailwind.config.js`, nem constantes JS de cor (nenhum objeto `colors`/`theme` em `.ts`/`.tsx`), nem SCSS no repositório.

### Cores via classes utilitárias Tailwind (paleta padrão, não customizada)
Como não existe `tailwind.config.js`, toda cor de UI vem da **paleta default do Tailwind CSS**, referenciada por nome de classe. Os valores hex abaixo são os valores oficiais e estáveis da paleta padrão do Tailwind (linha v3.x, que é o que `cdn.tailwindcss.com` serve por padrão); como a URL do script não fixa versão, o valor exato pode variar se a CDN atualizar sua major version — isso é uma característica do setup atual, não uma suposição sobre o conteúdo do repo.

| Classe usada no código | Hex padrão Tailwind | Papel visual observado |
|---|---|---|
| `bg-black` / `text-black` | `#000000` | background principal das seções (`Home`, `Contact`, `Press`, `PrivacyPolicy`), texto sobre botões claros |
| `bg-white` / `text-white` | `#ffffff` | texto primário sobre fundo escuro, fundo de botões-contorno no hover |
| `bg-zinc-900` | `#18181b` | fundo de seções alternadas ("Tour 2026", "Últimas Notícias"), cards |
| `bg-zinc-950` | `#09090b` | fundo do rodapé (`<footer>`) e das telas de login/CMS do Admin |
| `bg-zinc-800` | `#27272a` | fundo de inputs/botões secundários, badges de rede social |
| `border-zinc-800` / `border-zinc-900` | `#27272a` / `#18181b` | bordas divisórias entre seções, bordas de cards |
| `border-zinc-700` | `#3f3f46` | borda de inputs do formulário Admin/login |
| `text-zinc-400` | `#a1a1aa` | texto secundário (subtítulos do hero, parágrafos de corpo) |
| `text-zinc-500` | `#71717a` | texto terciário (venue das datas, labels) |
| `text-zinc-600` | `#52525b` | texto de apoio de menor ênfase (copyright do rodapé, ícone de download) |
| `text-amber-500` / `border-amber-500` | `#f59e0b` | **cor de destaque (accent) primária da marca** — usada no "HC" do logotipo, títulos de seção, links ativos, hover de itens, ícones |
| `bg-amber-500` | `#f59e0b` | seleção de texto (`selection:bg-amber-500`), fundo de estados ativos (hover das linhas de tour) |
| `bg-amber-600` / `hover:bg-amber-700` | `#d97706` / `#b45309` | botões primários sólidos ("OUÇA AGORA", "Entrar", "ACESSAR GOOGLE DRIVE") |
| `text-red-500` / `bg-red-500` / `text-red-400` | `#ef4444` / `#ef4444` / `#f87171` | mensagens de erro de login e botão "REMOVER" no CMS |

### Papéis de cor (mapeamento semântico observado)
- **Background (base)**: `#0a0a0a` (body) e `bg-black` `#000000` — praticamente idênticos, usados de forma intercambiável.
- **Superfície (cards/seções elevadas)**: `zinc-900` `#18181b` (seções, cards com opacidade `/50` ou `/30`), `zinc-950` `#09090b` (rodapé, Admin).
- **Texto primário**: branco `#ffffff`.
- **Texto secundário**: `zinc-400` `#a1a1aa` (corpo de parágrafos) e `zinc-500` `#71717a` (metadados/labels).
- **Cor de destaque (accent)**: âmbar — `amber-500` `#f59e0b` para texto/ícones/estado ativo, `amber-600`/`amber-700` para botões sólidos e hover.
- **Bordas**: `zinc-800` `#27272a` (padrão), `zinc-700` `#3f3f46` (inputs), `zinc-900` `#18181b` (rodapé).
- **Erro/perigo**: `red-500` `#ef4444`.

---

## 3. TIPOGRAFIA

### Famílias de fonte
Carregadas via Google Fonts, `<link>` em [index.html:12](index.html):
```html
https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Inter:wght@400;700;900&display=swap
```
Não há nenhum arquivo de fonte local (`.woff`/`.woff2`/`.ttf`) no repositório.

| Fonte | Pesos carregados | Uso | Regra CSS |
|---|---|---|---|
| **Inter** | 400, 700, 900 | Corpo de texto (default do `<body>`) | `body { font-family: 'Inter', sans-serif; }` (index.html:15) |
| **Oswald** | 400, 700 | Títulos e todo elemento com classe `.font-oswald` | `h1, h2, h3, .font-oswald { font-family: 'Oswald', sans-serif; text-transform: uppercase; }` (index.html:19–22) |

- **Título vs. corpo**: Oswald é usada para **todo `h1`, `h2`, `h3`** automaticamente (regra global) e também aplicada explicitamente via classe `.font-oswald` em `h4` e outros elementos que não são heading semântico (ex.: nav, botões, spans de rótulo). Inter é a fonte padrão para parágrafos, labels de formulário e qualquer texto sem `.font-oswald`.
- **Observação de peso**: a folha do Google Fonts só carrega Oswald 400/700, mas o código usa a classe Tailwind `font-black` (peso 900) sobre elementos Oswald extensivamente (ex.: `text-9xl font-oswald font-black` no hero). Como o peso 900 de Oswald não foi importado, o navegador faz *fallback* para o peso mais próximo disponível (700) — **não definido/gerenciado explicitamente no código**, é um efeito colateral do `@font-face` incompleto.
- System stack: **não definido** (não há `font-family` com pilha de fontes de sistema; o `sans-serif` genérico é o único fallback).

### Escala de tamanhos (classes Tailwind usadas no código, valores da escala padrão)
| Classe | Font-size | Line-height padrão | Onde aparece |
|---|---|---|---|
| `text-[3.5rem]` | 3.5rem (56px, valor arbitrário) | não definido (herda) | H1 do hero em mobile |
| `text-9xl` | 8rem (128px) | 1 | H1 do hero em `md:` |
| `text-8xl` | 6rem (96px) | 1 | H1 de Contact e Press (`md:`) |
| `text-7xl` | 4.5rem (72px) | 1 | H2 de `SectionHeading` (`md:`), H1 de PrivacyPolicy (`md:`) |
| `text-6xl` | 3.75rem (60px) | 1 | H1 de Contact/Press (mobile), H2 do rodapé |
| `text-5xl` | 3rem (48px) | 1 | H2 de `SectionHeading` (mobile), H1 de PrivacyPolicy (mobile) |
| `text-4xl` | 2.25rem (36px) | 2.5rem | H1 do Admin (CMS, `md:`), H2 do rodapé |
| `text-3xl` | 1.875rem (30px) | 2.25rem | Logo do navbar, H3 de datas de tour, H3 de notícias, H1 login |
| `text-2xl` | 1.5rem (24px) | 2rem | H3 de cidade (tour), H3 de álbum, H2 do CMS |
| `text-xl` | 1.25rem (20px) | 1.75rem | subtítulo do hero (`md:`), H4 do rodapé, botões da hero |
| `text-lg` | 1.125rem (18px) | 1.75rem | links de nav, parágrafos de corpo (Contact/Press/notícias) |
| `text-base` | 1rem (16px) | 1.5rem | subtítulo do hero (mobile) |
| `text-sm` | 0.875rem (14px) | 1.25rem | labels de metadado ("ano", data de notícia), botões do CMS |
| `text-xs` | 0.75rem (12px) | 1rem | labels de formulário do Admin |

*(Valores acima são a escala padrão do Tailwind; não há customização de `fontSize` no repo.)*

### Line-height e letter-spacing (classes utilitárias usadas)
- `leading-none` (line-height: 1) — usada em todos os headings grandes (hero, SectionHeading, títulos de álbum/notícia).
- `leading-relaxed` (line-height: 1.625) — usada em parágrafos de corpo (footer, Contact, Press, PrivacyPolicy, excerpt de notícia).
- `tracking-tighter` (-0.05em) — logotipo e headings grandes.
- `tracking-tight` (-0.025em) — nomes de cidade, subtítulos de card.
- `tracking-wide` (0.025em) — subtítulo do hero.
- `tracking-widest` (0.1em) — a mais usada (12x): links de nav, botões, labels "uppercase", rótulos do CMS.

Não há configuração de `letter-spacing`/`line-height` fora dessas classes utilitárias padrão do Tailwind.

---

## 4. ESPAÇAMENTO E LAYOUT

Não há `tailwind.config.js`, então a escala de espaçamento/radius/breakpoints é **a escala padrão do Tailwind** (0.25rem por unidade). Abaixo, os valores efetivamente usados no código (não a escala inteira):

### Espaçamento (padding/margin/gap observados)
`gap-2`(0.5rem) `gap-3`(0.75rem) `gap-4`(1rem) `gap-6`(1.5rem) `gap-8`(2rem) `gap-10`(2.5rem) `gap-12`(3rem) · `p-2` `p-3` `p-4` `p-6` `p-8` `p-10` `p-12` `p-24` · `px-3` `px-4` `px-6` `px-8` `px-10` · `py-2` `py-3` `py-4` `py-6` `py-24` · margens `mb-1/2/4/6/8/10/12/16/20`, `mt-2/4/12`, `pt-10/12/20`, `pb-1/3/4/10`.
- Padding vertical de seção padrão: **`py-24`** (6rem / 96px) — usado nas 3 seções principais da home (Tour, Discografia, Notícias).
- Padding do container de página (Admin/Contact/Press/PrivacyPolicy): `p-8 md:p-24`.

### Border-radius
| Classe | Valor padrão Tailwind | Uso |
|---|---|---|
| `rounded` (sem sufixo) | 0.25rem (4px) | botões/badges do CMS, botão "INGRESSOS" |
| `rounded-xl` | 0.75rem (12px) | cards de rede social em Contact, botão "ACESSAR GOOGLE DRIVE" |
| `rounded-2xl` | 1rem (16px) | cards de contato/press-kit, painel de login do Admin |
| `rounded-3xl` | 1.5rem (24px) | bloco de CTA final em Press |
| `rounded-full` | 9999px | botões de play/link circulares sobre capas de álbum, ícones sociais do rodapé |
- **Observação de inconsistência**: a home pública (hero, navbar, tour, discografia) não usa nenhum `rounded-*` — cantos totalmente retos (estética "brutalista"/hardcore). Cantos arredondados só aparecem nas páginas internas (Admin, Contact, Press) e em elementos circulares específicos (botões de play, avatares de rede social).

### Larguras máximas de container
`max-w-7xl` (80rem/1280px) — container principal do navbar e das 3 seções da home + rodapé.
`max-w-6xl` (72rem/1152px) — container do Admin.
`max-w-5xl` (64rem/1024px) — container de Press.
`max-w-4xl` (56rem/896px) — container de Contact e PrivacyPolicy.
`max-w-2xl` (42rem/672px) — subtítulo do hero, descrição do rodapé.
`max-w-md` (28rem/448px) — card de login do Admin.
`max-w-xl` (36rem/576px) — parágrafo de intro em Press.
`max-w-none` — usado para anular o limite padrão da classe `prose` em PrivacyPolicy.

### Breakpoints responsivos
Padrão do Tailwind (sem customização): `sm`=640px, `md`=768px, `lg`=1024px, `xl`=1280px, `2xl`=1536px.
No código só são usados **`md:`** (dominante, ~50 ocorrências — breakpoint principal do projeto), **`sm:`** (2 ocorrências, grid de álbuns) e **`lg:`** (2 ocorrências, grid de álbuns/pastas do press-kit). `xl:` e `2xl:` **não são usados**.

---

## 5. COMPONENTES E EFEITOS

### Componentes reutilizáveis
Só existe **um** componente de UI verdadeiramente reutilizável fora das páginas/rotas:

```tsx
// components/SectionHeading.tsx
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}
const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle }) => { ... }
```
Usado 3x em `App.tsx` (Tour, Discografia, Notícias) com borda esquerda `border-l-8 border-amber-500`.

Os demais "componentes" são páginas/rotas completas, sem props (todas `React.FC` sem parâmetros): `Admin`, `Contact`, `Press`, `PrivacyPolicy`, e a função interna `Home` dentro de `App.tsx`. **Não há** biblioteca própria de Button/Card/Input/Modal — cada botão e card é montado inline com classes Tailwind repetidas (nenhuma abstração compartilhada).

### Estilos de botão (padrões observados, sem componente formal)
1. **Botão primário sólido** (âmbar): `bg-amber-600 hover:bg-amber-700 text-white font-black py-4 px-10 ... transition-all transform hover:scale-105 active:scale-95` — ex.: "OUÇA AGORA", "Entrar", "ACESSAR GOOGLE DRIVE".
2. **Botão contorno**: `border-2 border-white hover:bg-white hover:text-black ... transition-all transform hover:scale-105 active:scale-95` — ex.: "VER TOUR".
3. **Botão neutro/secundário** (cinza-zinco): `bg-zinc-800 hover:bg-zinc-700 text-white font-bold ... rounded transition-all` — ex.: botões do CMS ("SAIR", ingressos).
4. **Botão circular sobre imagem**: `bg-white text-black p-2 rounded-full hover:bg-amber-500 hover:text-white transition-colors`.
5. **Botão perigo/remover**: `text-red-500 hover:text-red-400 bg-red-500/10 rounded`.

Estados: `hover:` sempre muda cor de fundo/texto; `active:scale-95` só nos botões da hero; `disabled:opacity-50` nos botões de salvar/restaurar do Admin quando `saving=true`. **Não há estado `:focus` visível customizado em botões** (só em inputs, ver abaixo) — `focus` de botão depende do outline default do navegador.

### Cards
Padrão recorrente: `bg-zinc-900/50 p-8..10 rounded-2xl border border-zinc-800 hover:border-amber-500/50 transition-all` (Contact, Press). Cards de álbum (Discografia) não seguem esse padrão — são `group relative overflow-hidden aspect-square` com imagem full-bleed e overlay de gradiente.

### Links
- Links de texto simples: `hover:text-white transition-colors` (rodapé) ou `hover:text-amber-500 transition-colors` (nav, breadcrumbs "Voltar para o Início").
- Link com sublinhado no hover: `hover:underline` ("VER TODAS AS DATAS", "Falar com a Produção").
- **Focus de inputs**: `focus:border-amber-500 outline-none` — padrão consistente em **todos** os campos de formulário do Admin (substitui o outline nativo por uma borda âmbar).

### Sombras, gradientes, texturas, filtros, animações
- **Box-shadow**: **não definido** — nenhuma classe `shadow-*` é usada em nenhum componente do repositório.
- **Text-shadow**: classe `.text-glow-amber` definida em `index.html:26-28` (`text-shadow: 0 0 10px rgba(217, 119, 6, 0.8)`) mas **não referenciada em nenhum lugar do JSX** — código morto.
- **Textura de fundo**: classe `.bg-gritty` (`index.html:23-25`) aplica `background-image: url('https://www.transparenttextures.com/patterns/asfalt-dark.png')` — usada **apenas** no `<body class="bg-gritty antialiased">` (index.html:44), portanto visível como textura global atrás de todo o conteúdo (não é referenciada dentro dos componentes React).
- **Gradientes**: `bg-gradient-to-t from-black via-black/40 to-transparent` (overlay escurecendo a base da imagem do hero) e `bg-gradient-to-t from-black via-transparent to-transparent opacity-90` (overlay sobre capas de álbum no hover).
- **Blur/backdrop-filter**: **não definido** — não há classes `blur-*` nem `backdrop-*`.
- **Transições/duração**: `transition-all`, `transition-colors`, `transition-transform`, `transition-opacity`; durações explícitas usadas: `duration-300` (navbar, tour item, album overlay), `duration-500` (imagem de notícia no hover), `duration-700` (imagem de álbum no hover); `delay-100` (ícones de play/link do álbum). Easing: **não definido** (nenhuma classe `ease-*` usada, fica no default do Tailwind).
- **Transforms**: `hover:scale-105` / `active:scale-95` (botões), `group-hover:scale-110` (imagens), `hover:-translate-y-1` (ícones sociais em Contact), `translate-y-4 → group-hover:translate-y-0` (conteúdo do card de álbum sobe no hover).
- **Animação custom**: classe `animate-tighten` é usada no H1 do hero (`App.tsx:113`) mas **não há nenhuma definição de `@keyframes tighten` nem entrada de tema correspondente em nenhum arquivo do repositório, nem em `index.html`, nem em config alguma** — é uma classe sem efeito (não existe nativamente no Tailwind e não foi definida localmente). Tratar como **não definido / classe morta**.
- **Scrollbar custom**: estilizada via pseudo-elementos `::-webkit-scrollbar*` (só Webkit/Chromium) em `index.html:29-41`, cores listadas na seção 2.
- **Seleção de texto**: `selection:bg-amber-500 selection:text-black` aplicado no container raiz de todas as páginas.

---

## 6. ASSETS DE MARCA

| Asset | Caminho | Formato/dimensões |
|---|---|---|
| Favicon | [assets/fav.png](assets/fav.png) (referenciado como `./assets/fav.png` em `index.html:11`; no build vira `dist/assets/fav-B1yrjNOj.png`) | PNG, **579×546px**, RGBA 8-bit, não-entrelaçado |
| Logotipo | **não definido como arquivo de imagem** — a marca é renderizada como texto: `ESCOMBRO` + `HC` (em `text-amber-500`), usando a fonte Oswald em `font-black`, presente no navbar (`App.tsx:57-59`) e no rodapé (`App.tsx:271-273`) |
| Imagem Open Graph (`og:image`) | **não definido** — não há nenhuma tag `<meta property="og:*">` em `index.html` |
| Imagem de textura/padrão de fundo | URL externa `https://www.transparenttextures.com/patterns/asfalt-dark.png` (não é um arquivo local do repo), referenciada em `.bg-gritty` (`index.html:24`) |

Todas as demais imagens do site (foto do hero, capas de álbum, thumbnails de notícia) são **URLs externas hardcoded** em [constants.tsx](constants.tsx) (Cloudinary, Spotify CDN `i.scdn.co`, sites de imprensa) — nenhuma é um asset local versionado no repositório.

---

## 7. VOZ E CONTEÚDO

Todo o site está em **português do Brasil**, com tom de crítica social / hardcore punk explícito (ver `metadata.json`: *"official website for the Brazilian hardcore band Escombro HC... AI-powered fan interaction portal"* — nota: o "AI-powered fan interaction portal" citado no metadata **não existe na UI atual**, é resíduo do scaffold, ver seção 1).

### Texto literal por seção (`App.tsx` / `constants.tsx`)

**Navbar**
- Logotipo: `ESCOMBRO` `HC` (span colorido)
- Links: `Início` · `Tour` · `Discografia` · `Notícias`
- Menu mobile também inclui: `Admin`

**Hero**
- Título (`INITIAL_HERO.title`): `HARDCORE POR UM | MUNDO MAIS DIGNO` (o `|` divide a linha; a 2ª parte fica em âmbar)
- Subtítulo: `Pesado, direto e sem concessões contra a hipocrisia e o preconceito.`
- Botões: `OUÇA AGORA` · `VER TOUR`

**Seção Tour** (`SectionHeading`)
- Título: `Tour 2026` — Subtítulo: `O Grito das Ruas pelo Brasil`
- Botão por show: `INGRESSOS`
- Rodapé da seção: `VER TODAS AS DATAS`
- Datas reais (`INITIAL_TOUR_DATES`): 06 MAR São Paulo-SP (Fabrique Club, w/ Madball) · 10 ABR Curitiba-PR (Belvedere, w/ Muralha) · 12 ABR São Paulo-SP (La Iglesia, w/ OTR & Institution) · 25 ABR São Paulo-SP (CasaLab, w/ Bebê Feio, Cariça de Bode & DOR) · 20 JUN Americana-SP (HUP, w/ Hannya, Divera & Agnose) · 12 JUL São Carlos-SP (Pirata, w/ Póstuma & Hannya)

**Seção Discografia**
- Título: `Discografia` — Subtítulo: `Sombras, Luta e Resistência`
- Álbuns (`INITIAL_ALBUMS`, título/ano): Vida Vazia (2025) · Recomeço (2023) · Cicatrizes (Ao vivo na Jai Club) (2021) · Cicatrizes (2020) · O Peso de Sobreviver (2019) · Eutanásia Social (2018) · Escombro (2017) · Split SP Caos (2015)

**Seção Notícias**
- Título: `Últimas` — Subtítulo: `Notícias do Front`
- Botão: `LER MAIS`
- 9 itens (`INITIAL_NEWS`) de veículos: Rolling Stone, Cultura em Peso (2x), UOL (2x), hedflow (3x), Roadie Crew — manchetes literais preservadas em `constants.tsx:129-202`.

**Rodapé**
- `ESCOMBRO` `HC`
- Descrição: `Nascido no caos urbano de São Paulo em 2016, o Escombro é uma banda de hardcore com forte crítica social, que expõe desigualdades, opressões e as lutas cotidianas da população brasileira através de letras diretas e urgentes. Através do hardcore, levamos união, consciência e respeito para quem é da luta.`
- `Links Rápidos`: Imprensa · Loja Oficial · Políticas · Contato
- `Redes Sociais`
- Copyright: `© {ano atual} ESCOMBRO HC. CRIADO PELA E PARA A CENA UNDERGROUND.`

**Página /contato** ([components/Contact.tsx](components/Contact.tsx))
- `Voltar para o Início` · `CONTATO` `DIRETO` · `Para shows, parcerias, imprensa ou qualquer outro assunto, entre em contato através do nosso canal oficial.` · `E-mail Oficial` · `escombrohc@gmail.com` · `Siga a Resistência`

**Página /imprensa** ([components/Press.tsx](components/Press.tsx))
- `PRESS` `KIT` · `Material oficial para produtores, jornalistas e parceiros. Fotos em alta, artes e riders técnicos.` · `ACESSAR GOOGLE DRIVE`
- Pastas: `1. Disco` · `2. Artes` · `3. Fotos` · `4. Video clipes` · `5. Teasers` · `6. Rider e Mapa de Palco`
- `Precisa de algo específico?` · `Se não encontrou o que procurava no Drive, entre em contato direto com nossa produção.` · `Falar com a Produção`

**Página /politica** ([components/PrivacyPolicy.tsx](components/PrivacyPolicy.tsx))
- `POLÍTICA DE` `COLETIVIDADE`
- Seções: `1. Propriedade Privada é Roubo` · `2. Vigilância do Estado e do Capital` · `3. Transparência Revolucionária` · `4. O Direito ao Esquecimento` (corpo completo em `PrivacyPolicy.tsx:23-47`, tom de manifesto anticapitalista)
- Citação final: `"Trabalhadores de todo o mundo, uni-vos! (E protejam seus dados)."`

**Painel /admin** ([components/Admin.tsx](components/Admin.tsx))
- Login: `ADMIN` `ESCOMBRO` · `E-mail` · `Senha` · `Entrar` · erro: `E-mail ou senha incorretos`
- CMS: `CMS` `ESCOMBRO` · `RESTAURAR PADRÕES` · `SAIR` · `SALVAR ALTERAÇÕES` / `SALVANDO...` · abas: `Hero` `Discografia` `Tour` `Notícias` · `ADICIONAR` · `REMOVER`
- Toasts: `Dados salvos com sucesso!` · `Erro ao salvar. Verifique sua conexão.` · `Dados restaurados com sucesso!` · `Erro ao restaurar dados. Tente novamente.`

### Convenção de capitalização
- **CAIXA ALTA literal no código-fonte** (já digitada em maiúsculas no JSX, independente de CSS): todos os textos de botão de ação — `OUÇA AGORA`, `VER TOUR`, `INGRESSOS`, `VER TODAS AS DATAS`, `LER MAIS`, `ACESSAR GOOGLE DRIVE`, `RESTAURAR PADRÕES`, `SAIR`, `SALVAR ALTERAÇÕES`/`SALVANDO...`, `ADICIONAR`, `REMOVER`, o copyright do rodapé.
- **Title Case / frase normal no código-fonte, forçado a CAIXA ALTA visualmente pela regra global CSS** (`h1, h2, h3, .font-oswald { text-transform: uppercase }`): título do hero, `SectionHeading` (títulos e subtítulos de seção), nomes de cidade/venue do tour, títulos de álbum, manchetes de notícia (o nome do veículo, ex. "Rolling Stone", é digitado em Title Case mas renderiza em caixa alta por estar dentro de um `<h3>`), títulos das páginas internas, links de nav (têm classe `.font-oswald`).
- **Title Case preservado visualmente** (sem forçar uppercase — não estão em h1-h3 nem têm `.font-oswald`): itens do rodapé "Links Rápidos" (`Imprensa`, `Loja Oficial`, `Políticas`, `Contato`), corpo de parágrafos, labels de formulário do Admin (estas usam classe `uppercase` explícita separadamente, então também acabam maiúsculas — ex. `E-mail`, `Senha` viram "E-MAIL"/"SENHA" via `uppercase` na label).
- Frase de destaque em itálico: subtítulo do hero (`italic uppercase tracking-wide`) e a citação final da Política de Privacidade (`italic`).
