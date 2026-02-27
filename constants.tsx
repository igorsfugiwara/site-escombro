
import { Album, TourDate, NewsItem } from './types';

export const INITIAL_ALBUMS: Album[] = [
  {
    id: '1',
    title: 'Vida Vazia',
    year: '2025',
    cover: 'https://i.scdn.co/image/ab67616d00001e02f9b53d8bc2ad336d1ee8bcbb',
    link: 'https://open.spotify.com/album/1UbKosw4jvq0ZOrxfSPINS'
  },
  {
    id: '2',
    title: 'Recomeço',
    year: '2023',
    cover: 'https://i.scdn.co/image/ab67616d00001e02ab5667130a68dfd30e7dfa04',
    link: 'https://open.spotify.com/album/6uATvfKnGzCdRfCSGyr4EP'
  },
  {
    id: '3',
    title: 'Cicatrizes (Ao vivo na Jai Club)',
    year: '2021',
    cover: 'https://i.scdn.co/image/ab67616d00001e026906a4d931d446e8859c12ad',
    link: 'https://open.spotify.com/album/3VnDl1xxV5bxYjWsnz2Tyo'
  },
  {
    id: '4',
    title: 'Cicatrizes',
    year: '2020',
    cover: 'https://i.scdn.co/image/ab67616d00001e02569d7e682f89c1e6323e028c',
    link: 'https://open.spotify.com/album/2m1eQOhpeGLWKoI1VgDVOA'
  },
  {
    id: '5',
    title: 'O Peso de Sobreviver',
    year: '2019',
    cover: 'https://i.scdn.co/image/ab67616d00001e0254f2c81ab967b93781af89a0',
    link: 'https://open.spotify.com/album/54CLTselSnRIOv2F3fOOfe'
  },
  {
    id: '6',
    title: 'Eutanásia Social',
    year: '2018',
    cover: 'https://i.scdn.co/image/ab67616d00001e0222f9fae872c6b472576977a1',
    link: 'https://open.spotify.com/album/1vhuUQwbD6EQ6gEYfivTNW'
  },
  {
    id: '7',
    title: 'Escombro',
    year: '2017',
    cover: 'https://i.scdn.co/image/ab67616d00001e0248c890ae0dc3519007b39c78',
    link: 'https://open.spotify.com/album/2p2ipq2JTvT3sCV79Ddgwt'
  },
  {
    id: '8',
    title: 'Split SP Caos',
    year: '2015',
    cover: 'https://i.scdn.co/image/ab67616d00001e023dc636074d1154ab2b1ff3ca',
    link: 'https://open.spotify.com/album/4Pykmihg1RDKIL74WrYKzV'
  }
];

export const INITIAL_TOUR_DATES: TourDate[] = [
  {
    id: 't1',
    date: '06 MAR',
    city: 'São Paulo - SP',
    venue: 'Fabrique Club (w/ Madball)',
    ticketLink: 'https://fastix.com.br/events/pre-show-ndp-fest-madball-em-sao-paulo'
  },
  {
    id: 't2',
    date: '10 ABR',
    city: 'Curitiba - PR',
    venue: 'Belvedere (w/ Muralha)',
    ticketLink: '#'
  },
  {
    id: 't3',
    date: '12 ABR',
    city: 'São Paulo - SP',
    venue: 'La Iglesia (w/ OTR & Institution)',
    ticketLink: '#'
  },
  {
    id: 't4',
    date: '25 ABR',
    city: 'São Paulo - SP',
    venue: 'CasaLab (w/ Bebê Feio, Cariça de Bode & DOR)',
    ticketLink: '#'
  },
  {
    id: 't5',
    date: '20 JUN',
    city: 'Americana - SP',
    venue: 'HUP (w/ Hannya, Divera & Agnose)',
    ticketLink: '#'
  },
  {
    id: 't6',
    date: '12 JUL',
    city: 'São Carlos - SP',
    venue: 'Pirata (w/ Póstuma & Hannya)',
    ticketLink: '#'
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Rolling Stone',
    date: '12/06/2019',
    excerpt: 'Polícia interrompe show de hardcore e leva vocalista para a delegacia',
    imageUrl: 'https://rollingstone.com.br/wp-content/uploads/banda_escombro_divulgacao.jpg',
    link: 'https://rollingstone.com.br/noticia/policia-interrompe-show-de-hardcore-e-leva-vocalista-para-delegacia/'
  },
  {
    id: 'n2',
    title: 'Cultura em Peso',
    date: '04/06/2025',
    excerpt: 'Escombro lança EP "Vida Vazia" em pocket show gratuito em São Paulo',
    imageUrl: 'https://culturaempeso.com/wp-content/uploads/2025/06/Escombro-e1698057075117.webp',
    link: 'https://culturaempeso.com/escombro-lanca-ep-vida-vazia-em-pocket-show-gratuito-em-sao-paulo/'
  },
  {
    id: 'n3',
    title: 'UOL',
    date: '10/06/2019',
    excerpt: 'Show de hardcore acaba no DP após música contra a PM; vocalista relata ameaças.',
    imageUrl: 'https://rollingstone.com.br/wp-content/uploads/banda_escombro_divulgacao.jpg',
    link: 'https://entretenimento.uol.com.br/noticias/redacao/2019/06/10/show-de-hardcore-acaba-no-dp-apos-musica-contra-a-pm-vocalista-relata-ameacas.htm'
  },
  {
    id: 'n4',
    title: 'Cultura em Peso',
    date: '06/06/2025',
    excerpt: 'Review Single e Vídeoclipe – Banda Escombro – Vida Vazia',
    imageUrl: 'https://culturaempeso.com/wp-content/uploads/2025/06/Imagem-do-WhatsApp-de-2025-06-06-as-15.20.48_30e3317e-1068x1068.jpg',
    link: 'https://culturaempeso.com/review-single-e-videoclipe-banda-escombro-vida-vazia/'
  },
  {
    id: 'n5',
    title: 'UOL',
    date: '01/07/2019',
    excerpt: 'Sons da resistência: Escombro, Surra, Subalternos, Dead Fish.',
    imageUrl: 'https://rollingstone.com.br/wp-content/uploads/banda_escombro_divulgacao.jpg',
    link: 'https://combaterock.blogosfera.uol.com.br/2019/07/10/sons-da-resistencia-escombro-surra-subalternos-dead-fish/'
  },
  {
    id: 'n6',
    title: 'hedflow',
    date: '03/08/2020',
    excerpt: 'Entrevista com a banda Escombro: sem engajamento, não há arte!',
    imageUrl: 'https://hedflow.com/wp-content/uploads/2020/07/unnamed-1.jpg',
    link: 'https://hedflow.com/2020/08/03/entrevista-com-a-banda-escombro-sem-engajamento-nao-ha-arte/'
  },
  {
    id: 'n7',
    title: 'hedflow',
    date: '26/06/2019',
    excerpt: 'Escombro lança música em resposta à tentativa de censura',
    imageUrl: 'https://hedflow.com/wp-content/uploads/2019/06/escombrohc-2.jpg',
    link: 'https://hedflow.com/2019/06/26/escombro-lanca-musica-em-resposta-a-tentativa-de-censura/'
  },
  {
    id: 'n8',
    title: 'hedflow',
    date: '18/06/2019',
    excerpt: 'Abusos de autoridades atingem banda de hardcore em Brasília e organizadores de festival no Pará',
    imageUrl: 'https://hedflow.com/wp-content/uploads/2019/06/IMG_20190618_141018.png',
    link: 'https://hedflow.com/2019/06/18/abusos-de-autoridades-atingem-banda-de-hardcore-em-brasilia-e-organizadores-de-festival-no-para/'
  },
  {
    id: 'n9',
    title: 'Roadie Crew',
    date: '04/07/2020',
    excerpt: 'Em nova fase, ESCOMBRO traz peso e fúria ao hardcore com "Mundo Cão"',
    imageUrl: 'https://roadiecrew.com/wp-content/uploads/e8a3c9e7-dddf-49c0-9a50-4b1d37846b91-1024x1024.jpg',
    link: 'https://roadiecrew.com/em-nova-fase-escombro-traz-peso-e-furia-ao-hardcore-com-mundo-cao/'
  }
];

export const INITIAL_HERO = {
  title: 'HARDCORE POR UM | MUNDO MAIS DIGNO',
  subtitle: 'Das ruas de São Paulo — pesado, direto e sem concessões contra a hipocrisia e o preconceito.',
  imageUrl: 'https://scontent-gru1-2.xx.fbcdn.net/v/t39.30808-6/500025109_1241273908003373_6958710255068696444_n.png?_nc_cat=108&ccb=1-7&_nc_sid=2a1932&_nc_ohc=ETgGMmotKqkQ7kNvwGhT-vi&_nc_oc=Adm9eZX-wFvcxFA7Fcb26PK4ASj2tgp-IEJJLYCmg-HIzkxif9iEQSguvJdzrw0WPLg&_nc_zt=23&_nc_ht=scontent-gru1-2.xx&_nc_gid=tdZLTw4g6zI5RseWl6MoIA&oh=00_AfuaEOBkuuCTzdDRnNkOM2yp7nyniKrb_SLvHhbRFbljBw&oe=69A772E8'
};

export const parseDate = (dateStr: string) => {
  const parts = dateStr.split('/');
  if (parts.length !== 3) return 0;
  const [day, month, year] = parts.map(Number);
  return new Date(year, month - 1, day).getTime();
};

export const sortNews = (newsItems: NewsItem[]) => {
  return [...newsItems].sort((a, b) => parseDate(b.date) - parseDate(a.date));
};
