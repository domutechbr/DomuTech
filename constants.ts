import { Project, FAQItem } from "./types";

export const NAV_LINKS = [
  { name: "Home", href: "/#home" },
  { name: "Cases", href: "/cases" },
  { name: "Sobre", href: "/sobre" },
  { name: "Login", href: "/login" },
];

export const FOOTER_INSTITUCIONAL = [
  { name: "Home", href: "/" },
  { name: "Cases", href: "/cases" },
  { name: "Sobre Nós", href: "/sobre" },
  { name: "Criar conta", href: "/login" },
  { name: "Loja de Layouts", href: "/layouts" },
  { name: "Aviso de Cookies", href: "#" },
];

export const FOOTER_SERVICOS = [
  { name: "Criar conta", href: "/login" },
  { name: "Layouts", href: "/layouts" },
  { name: "Cases", href: "/cases" },
  { name: "Sobre a Domu", href: "/sobre" },
  { name: "Login", href: "/login" },
];

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    tag: "Criação de Sites",
    title: "Rede Centro-Norte Brasil - UNICAMP",
    description:
      "Desenvolvimento de portal acadêmico e científico para a Rede Centro-Norte Brasil da UNICAMP, com quiz interativo e um jogo educativo escondido.",
    image: "/projeto/img-redeterritorios.png",
    link: "https://www.ige.unicamp.br/rede-centro-norte-brasil/",
    isFeatured: true,
  },
  {
    tag: "Criação de Sites",
    title: "AGB Campinas - Site Institucional",
    description:
      "Desenvolvimento de site moderno para a AGB Campinas, com foco em performance, acessibilidade e design profissional.",
    image: "/projeto/img-agbcampinas.png",
    link: "https://agbcampinas.com.br/",
    isFeatured: true,
  },
  {
    tag: "Criação de Sites",
    title: "Projeto Rio Silveira - UNICAMP",
    description:
      "Desenvolvimento de portal acadêmico e de divulgação científica para o Projeto Rio Silveira (UNICAMP), com foco em educação ambiental e preservação de recursos hídricos.",
    image: "/projeto/img-projetoriosilveira.png",
    link: "https://www.ige.unicamp.br/projetoriosilveira/",
    isFeatured: true,
  },
  {
    tag: "Criação de Sites",
    title: "La Dolce Vita Viaggi",
    description:
      "Criação de site institucional completo e interativo para a agência de viagens La Dolce Vita Viaggi, com roteiros exclusivos, galeria de destinos e integração direta para orçamentos via WhatsApp.",
    image: "/projeto/img-ladolcevita.png",
    link: "https://www.ladolcevitaviaggi.com.br/",
    isFeatured: true,
  },
  {
    tag: "Criação de Sites",
    title: "Dara ADV - Advocacia Especializada",
    description:
      "Website institucional moderno e responsivo para o escritório de advocacia Dara ADV, estruturado para transmitir credibilidade, apresentar áreas de atuação jurídica e simplificar o contato com novos clientes.",
    image: "/projeto/img-daraadv.png",
    link: "https://daraadv.vercel.app/",
    isFeatured: true,
  },
  {
    tag: "Criação de Sites",
    title: "AlanX - Site Institucional",
    description:
      "Site institucional moderno para a AlanX, com foco em apresentação clara de serviços, performance e conversão de visitantes.",
    image: "/projeto/img-AlanX.png",
    link: "https://alanx.netlify.app/",
  },
  {
    tag: "Criação de Sites",
    title: "Portfolio Alan Felipe",
    description:
      "Criação de portfólio profissional sob medida, com foco em destacar projetos, habilidades e facilitar o contato.",
    image: "/projeto/img-portfolioalan.png",
    link: "https://portfolio-alan-felipe.netlify.app/",
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "A Domu ainda é uma agência?",
    answer:
      "A Domu está virando plataforma. Em vez de pedir orçamento por WhatsApp, você cria uma conta, escolhe o serviço e gerencia tudo pelo painel.",
  },
  {
    question: "Como eu começo?",
    answer:
      "Clique em Criar conta, faça o login e entre no painel. De lá você escolhe o que precisa (site, layout, automação) e personaliza o que estiver disponível.",
  },
  {
    question: "Preciso falar com alguém antes de contratar?",
    answer:
      "Não é obrigatório. O fluxo principal é self-service pela conta. Se precisar de algo sob medida fora do catálogo, o suporte entra depois, já com você logado.",
  },
  {
    question: "Consigo gerenciar o conteúdo sozinho?",
    answer:
      "Sim. A ideia da plataforma é autonomia: você edita o que o template e o plano permitem, sem depender de um orçamento novo a cada mudança.",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "O modelo previsto é setup (quando houver desenvolvimento) + manutenção recorrente para manter o serviço ativo na plataforma. Valores finais entram conforme cada plano.",
  },
  {
    question: "E se eu já tiver um site feito pela Domu?",
    answer:
      "A migração para o painel multi-tenant é o caminho natural. Enquanto isso, sua conta já é a porta de entrada para novos serviços e layouts.",
  },
  {
    question: "Os sites são responsivos e otimizados?",
    answer:
      "Sim. Performance, SEO e adaptação mobile continuam como padrão das soluções publicadas pela plataforma.",
  },
  {
    question: "Posso cancelar e sair da plataforma?",
    answer:
      "Sim. Quem não quiser manter a mensalidade pode exportar/sair do modelo hospedado. Os detalhes de exportação entram conforme cada produto for liberado no painel.",
  },
  {
    question: "O login já está funcionando de verdade?",
    answer:
      "A tela de login já existe no fluxo do site. A autenticação completa (Supabase Auth) fica para uma etapa seguinte; por enquanto o caminho de entrada já está no ar.",
  },
  {
    question: "Onde ficam os serviços que estavam no menu?",
    answer:
      "Saíram do menu de marketing. Eles passam a viver dentro da conta, como produtos da plataforma, e não como páginas de orçamento da agência.",
  },
];
