export const projects = [
  {
    id: "dashboard",
    title: "Dashboard Interativa",
    description:
      "Dashboard moderna com visualização de dados em tempo real, filtros avançados e interface responsiva para todos os dispositivos.",
    longDescription:
      "Um dashboard completo e interativo desenvolvido com React e TypeScript, oferecendo análises em tempo real, gráficos dinâmicos e uma interface adaptável a qualquer dispositivo. Permite filtrar dados por diferentes métricas, exportar relatórios e acompanhar KPIs essenciais para o negócio.",
    category: "web",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Chart.js",
      "Redux",
      "Axios",
    ],
    featuredIndex: 0,
    imageUrl: "/images/projects/dashboard-preview.jpg",
    demoUrl: "https://seu-dashboard.vercel.app",
    githubUrl: "https://github.com/LuisCarlos01/Dashboard-interativa",
    date: "Janeiro 2023",
    client: "Projeto Pessoal",
    type: "Aplicação Web",
    challenges:
      "A principal dificuldade foi otimizar a renderização de múltiplos gráficos e tabelas com grande volume de dados sem comprometer a performance.",
    solution:
      "Implementei técnicas de lazy loading, virtualização para tabelas grandes e memo/useCallback para otimizar renderizações.",
  },
  {
    id: "ecommerce",
    title: "E-commerce Responsivo",
    description:
      "Aplicação web completa com carrinho de compras, filtros dinâmicos e integração com API. Desenvolvido com React, Sass para estilização modular e Redux para gerenciamento de estado.",
    longDescription:
      "Plataforma completa de e-commerce construída com React, apresentando funcionalidades como autenticação de usuários, carrinho de compras persistente, sistema de pagamento integrado, filtros de produtos em tempo real e design totalmente responsivo. Utiliza Redux para gerenciamento global de estado e Sass para estilização modular e manutenível.",
    category: "web",
    technologies: [
      "React",
      "Sass",
      "Redux",
      "Node.js",
      "Express",
      "MongoDB",
      "Stripe",
    ],
    featuredIndex: 1,
    imageUrl: "/images/projects/ecommerce-preview.jpg",
    demoUrl: "https://seu-ecommerce.vercel.app",
    githubUrl: "https://github.com/LuisCarlos01/ecommerce-responsivo",
    date: "Março 2023",
    client: "Projeto Pessoal",
    type: "E-commerce",
    challenges:
      "Implementar um sistema de carrinho persistente e garantir um checkout seguro foram os principais desafios.",
    solution:
      "Utilizei o local storage para persistência do carrinho e integrei a API do Stripe para processar pagamentos de forma segura.",
  },
  {
    id: "landing",
    title: "Landing Page Moderna",
    description:
      "Página institucional com animações suaves e design responsivo. Construída com HTML5, CSS3 e JavaScript vanilla, utilizando técnicas modernas de layout como Grid e Flexbox.",
    longDescription:
      "Landing page de alto impacto visual desenvolvida com HTML5, CSS3 e JavaScript puro. Apresenta animações suaves ao scroll, design responsivo otimizado para todos os dispositivos, formulário de contato com validação em tempo real e carregamento optimizado de imagens para melhor performance.",
    category: "web",
    technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "Webpack"],
    featuredIndex: 2,
    imageUrl: "/images/projects/landing-preview.jpg",
    demoUrl: "https://sua-landing.vercel.app",
    githubUrl: "https://github.com/LuisCarlos01/landing-moderna",
    date: "Fevereiro 2023",
    client: "Cliente Corporativo",
    type: "Landing Page",
    challenges:
      "O desafio foi criar animações suaves que funcionassem bem em todos os dispositivos sem sacrificar a performance.",
    solution:
      "Utilizei a biblioteca GSAP para animações e implementei carregamento lazy e otimização de imagens para melhorar o desempenho.",
  },
  {
    id: "mobile-app",
    title: "Aplicativo de Fitness",
    description:
      "Aplicativo móvel para acompanhamento de treinos e dietas, desenvolvido com React Native. Inclui funcionalidades como cronômetro, monitoramento de progresso e planos personalizados.",
    longDescription:
      "Aplicativo de fitness completo construído com React Native, permitindo que usuários criem e acompanhem seus treinos, monitorem sua dieta e progresso físico. Inclui cronômetro para exercícios, gráficos de evolução, banco de exercícios com demonstrações em vídeo e suporte a notificações para lembretes de treino.",
    category: "app",
    technologies: ["React Native", "Expo", "Firebase", "Redux", "TypeScript"],
    featuredIndex: 3,
    imageUrl: "/images/projects/fitness-app-preview.jpg",
    demoUrl:
      "https://play.google.com/store/apps/details?id=com.luiscarlos.fitnessapp",
    githubUrl: "https://github.com/LuisCarlos01/fitness-app",
    date: "Abril 2023",
    client: "Startup de Fitness",
    type: "Aplicativo Móvel",
    challenges:
      "A sincronização de dados offline e criação de um cronômetro preciso foram os principais desafios técnicos.",
    solution:
      "Implementei persistência local com AsyncStorage e sincronização quando o dispositivo está online, além de um sistema robusto de cronometragem para os exercícios.",
  },
  {
    id: "portfolio",
    title: "Portfólio Minimalista",
    description:
      "Site de portfólio pessoal com design minimalista e elegante, desenvolvido com foco em performance e acessibilidade. Apresenta projetos anteriores em uma galeria interativa.",
    longDescription:
      "Este portfólio minimalista foi desenvolvido com React e Sass, focando em um design elegante e ao mesmo tempo tecnicamente avançado. Inclui navegação suave entre seções, carregamento otimizado de recursos, modo escuro/claro, e uma galeria de projetos interativa com filtros por categoria.",
    category: "web",
    technologies: ["React", "Sass", "JavaScript", "GSAP", "Netlify"],
    featuredIndex: 4,
    imageUrl: "/images/projects/portfolio-preview.jpg",
    demoUrl: "https://luiscarlos-portfolio.netlify.app",
    githubUrl: "https://github.com/LuisCarlos01/portfolio-minimalista",
    date: "Maio 2023",
    client: "Projeto Pessoal",
    type: "Site Pessoal",
    challenges:
      "Criar um design minimalista que ainda assim fosse visualmente impactante e demonstrasse minhas habilidades técnicas.",
    solution:
      "Foquei em micro-interações, animações sutis e tipografia cuidadosamente selecionada para criar uma experiência elegante mantendo o minimalismo.",
  },
  {
    id: "task-manager",
    title: "Gerenciador de Tarefas",
    description:
      "Aplicativo web de gerenciamento de tarefas com funcionalidades de arrastar e soltar, categorização por cores e notificações de prazos.",
    longDescription:
      "Um sistema completo de gerenciamento de tarefas inspirado no Trello e Notion, permitindo criar listas personalizadas, organizar tarefas com drag-and-drop, definir prazos, adicionar etiquetas coloridas e compartilhar boards com outros usuários. Inclui sincronização em tempo real e modo offline.",
    category: "web",
    technologies: [
      "Vue.js",
      "Vuex",
      "Firebase",
      "Tailwind CSS",
      "DragDropTouch",
    ],
    featuredIndex: 5,
    imageUrl: "/images/projects/task-manager-preview.jpg",
    demoUrl: "https://taskly-manager.netlify.app",
    githubUrl: "https://github.com/LuisCarlos01/taskly-manager",
    date: "Junho 2023",
    client: "Startup de Produtividade",
    type: "Aplicação Web",
    challenges:
      "Implementar funcionalidade de arrastar e soltar que funcionasse bem em dispositivos móveis e desktop.",
    solution:
      "Utilizei a biblioteca DragDropTouch para compatibilidade com dispositivos móveis e otimizei a experiência para diferentes tamanhos de tela.",
  },
  {
    id: "design-system",
    title: "Sistema de Design",
    description:
      "Biblioteca de componentes React com Storybook, que implementa um sistema de design consistente e acessível para aplicações web.",
    longDescription:
      "Um sistema de design robusto com mais de 30 componentes React reutilizáveis, documentados com Storybook. Inclui temas claro/escuro, suporte a RTL, testes automatizados e foco em acessibilidade. Cada componente segue as diretrizes WCAG 2.1 para garantir que possam ser utilizados por todos os usuários.",
    category: "design",
    technologies: [
      "React",
      "TypeScript",
      "Storybook",
      "Styled Components",
      "Jest",
      "Figma",
    ],
    featuredIndex: 6,
    imageUrl: "/images/projects/design-system-preview.jpg",
    demoUrl: "https://design-system-luiscarlos.vercel.app",
    githubUrl: "https://github.com/LuisCarlos01/design-system",
    date: "Julho 2023",
    client: "Uso Interno",
    type: "Biblioteca de Componentes",
    challenges:
      "Garantir consistência visual e de comportamento entre diferentes navegadores e dispositivos.",
    solution:
      "Criei uma arquitetura de tokens de design e utilizei testes de regressão visual com Chromatic para garantir consistência em todos os ambientes.",
  },
  {
    id: "finance-dashboard",
    title: "Dashboard Financeiro",
    description:
      "Dashboard para acompanhamento de finanças pessoais com gráficos interativos, categorização de gastos e previsões baseadas em histórico.",
    longDescription:
      "Um dashboard financeiro completo que permite aos usuários acompanhar suas receitas e despesas, categorizar transações, analisar gastos por períodos e categorias, estabelecer orçamentos mensais e receber insights personalizados sobre seus hábitos financeiros. Inclui também funcionalidades de exportação de relatórios e previsões de gastos baseadas em histórico.",
    category: "web",
    technologies: [
      "Angular",
      "TypeScript",
      "NgRx",
      "D3.js",
      "Node.js",
      "MongoDB",
    ],
    featuredIndex: 7,
    imageUrl: "/images/projects/finance-dashboard-preview.jpg",
    demoUrl: "https://finance-tracker-demo.vercel.app",
    githubUrl: "https://github.com/LuisCarlos01/finance-tracker",
    date: "Agosto 2023",
    client: "Fintech StartUp",
    type: "Aplicação Web",
    challenges:
      "Lidar com cálculos financeiros complexos e visualizações de dados que fossem tanto precisas quanto compreensíveis para usuários não técnicos.",
    solution:
      "Implementei a biblioteca D3.js para visualizações personalizadas e criei algoritmos de análise financeira para gerar insights relevantes.",
  },
];
