import React from "react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillPreviewModal from "./SkillPreviewModal";

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  // Estados para gerenciar a categoria ativa, skill hover e skill selecionada
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Referências para elementos DOM
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const categoriesRef = useRef(null);
  const skillsGridRef = useRef(null);

  // Definindo as categorias e ícones
  const categories = [
    { id: "all", name: "Todos", icon: "fas fa-globe" },
    { id: "front-end", name: "Front-end", icon: "fas fa-laptop-code" },
    { id: "back-end", name: "Back-end", icon: "fas fa-server" },
    { id: "tools", name: "Ferramentas", icon: "fas fa-tools" },
    { id: "design", name: "Design", icon: "fas fa-paint-brush" },
  ];

  // Ícones para cada categoria (para uso nos cards)
const categoryIcons = {
    "Front-end": "#4aa3df",
    "Back-end": "#3498db",
    Ferramentas: "#9b59b6",
    Design: "#e74c3c",
  };

  // Definindo os ícones das habilidades
const skillIcons = {
  HTML5: {
    icon: "fab fa-html5",
      color: "#E34F26", // Laranja - oficial HTML
  },
  CSS3: {
    icon: "fab fa-css3-alt",
      color: "#1572B6", // Azul - oficial CSS
  },
  Sass: {
    icon: "fab fa-sass",
      color: "#CD6699", // Rosa - oficial Sass
  },
  JavaScript: {
    icon: "fab fa-js",
      color: "#F7DF1E", // Amarelo - oficial JavaScript
  },
  TypeScript: {
      icon: "devicon-typescript-plain",
      color: "#3178C6", // Azul - oficial TypeScript
  },
  React: {
    icon: "fab fa-react",
      color: "#61DAFB", // Azul claro - oficial React
  },
  "Node.js": {
    icon: "fab fa-node-js",
      color: "#339933", // Verde - oficial Node.js
  },
  SQL: {
    icon: "fas fa-database",
      color: "#4479A1", // Azul - comum para SQL
  },
  Git: {
    icon: "fab fa-git-alt",
      color: "#F05032", // Laranja - oficial Git
  },
  Figma: {
    icon: "fab fa-figma",
      color: "#F24E1E", // Laranja-avermelhado - oficial Figma
    },
    Vite: {
      icon: "devicon-vitejs-plain",
      color: "#646CFF", // Roxo-azulado - oficial Vite
    },
    Tailwind: {
      icon: "devicon-tailwindcss-plain",
      color: "#06B6D4", // Azul ciano - oficial Tailwind
    },
    "C#": {
      icon: "devicon-csharp-plain",
      color: "#512BD4", // Roxo - oficial .NET/C#
    },
    Canva: {
      icon: "devicon-canva-original",
      color: "url(#canva-gradient)", // Gradiente - oficial Canva
    },
    Framer: {
      icon: "devicon-framermotion-original",
      color: "#05F", // Azul - oficial Framer
    },
    Docker: {
      icon: "fab fa-docker",
      color: "#1D63ED", // Moby Blue - oficial Docker
    },
  };

  // Definindo os ícones das habilidades alternativos com SVGs inline (caso os devicons falhem)
  const svgIcons = {
    TypeScript: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%" fill="#3178C6">
      <path fill="#3178C6" d="M0 200V0h400v400H0" />
      <path fill="#fff" d="M87.7 200.7V217h52v148h36.9V217h52v-16c0-9 0-16.3-.4-16.5 0-.3-31.7-.4-70.2-.4l-70 .3v16.4l-.3-.1zM321.4 184c10.2 2.4 18 7 25 14.3 3.7 4 9.2 11 9.6 12.8 0 .6-17.3 12.3-27.8 18.8-.4.3-2-1.4-3.6-4-5.2-7.4-10.5-10.6-18.8-11.2-12-.8-20 5.5-20 16 0 3.2.6 5 1.8 7.6 2.7 5.5 7.7 8.8 23.2 15.6 28.6 12.3 41 20.4 48.5 32 8.5 13 10.4 33.4 4.7 48.7-6.4 16.7-22 28-44.3 31.7-7 1.2-23 1-30.5-.3-16-3-31.3-11-40.7-21.3-3.7-4-10.8-14.7-10.4-15.4l3.8-2.4 15-8.7 11.3-6.6 2.6 3.5c3.3 5.2 10.7 12.2 15 14.6 13 6.7 30.4 5.8 39-2 3.7-3.4 5.3-7 5.3-12 0-4.6-.7-6.7-3-10.2-3.2-4.4-9.6-8-27.6-16-20.7-8.8-29.5-14.4-37.7-23-4.7-5.2-9-13.3-11-20-1.5-5.8-2-20-.6-25.7 4.3-20 19.4-34 41-38 7-1.4 23.5-.8 30.4 1l-.2.2z" />
    </svg>`,
    "C#": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
      <path fill="#9B4F96" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"/>
      <path fill="#68217A" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"/>
      <path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6zM97 66.2l.9-4.3h-4.2v-4.7h5.1l1.2-6.2h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.4v-4.7H97zm4.8 0h3.8l.9-4.3h-3.8l-.9 4.3z"/>
    </svg>`,
    Canva: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
      <defs>
        <linearGradient id="canva-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#00C4CC" />
          <stop offset="50%" style="stop-color:#8B57E9" />
          <stop offset="100%" style="stop-color:#FF5879" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="12" fill="url(#canva-gradient)" />
      <path d="M8.52 11.98c0-.25.1-.46.29-.65.2-.19.43-.28.7-.28.25 0 .46.09.65.28.2.19.3.4.3.65 0 .25-.1.45-.3.64-.19.19-.4.28-.65.28-.27 0-.5-.09-.7-.28a.88.88 0 01-.29-.64zm1.17-2.92c0-.29-.1-.53-.3-.72a.97.97 0 00-.72-.28c-.29 0-.53.09-.72.28-.2.2-.3.43-.3.72 0 .27.1.5.3.7.2.2.43.3.72.3.28 0 .52-.1.72-.3.2-.2.3-.43.3-.7zm2.57 1.66c.11-.27.16-.56.16-.87 0-.38-.07-.73-.22-1.06a2.4 2.4 0 00-.6-.83 2.92 2.92 0 00-.93-.54 3.2 3.2 0 00-1.16-.2c-.42 0-.8.07-1.15.2-.35.14-.66.34-.92.54-.26.23-.47.5-.62.83a2.7 2.7 0 00-.22 1.06c0 .31.05.6.16.87.11.27.26.5.45.7.2.2.43.35.7.47a2.8 2.8 0 001.6.2c.38 0 .74-.07 1.07-.2.27-.12.5-.28.7-.47.2-.2.35-.43.46-.7zm2.77 0c.11-.27.16-.56.16-.87 0-.38-.07-.73-.22-1.06a2.4 2.4 0 00-.6-.83 2.92 2.92 0 00-.93-.54 3.2 3.2 0 00-1.16-.2c-.42 0-.8.07-1.15.2-.35.14-.66.34-.92.54-.26.23-.47.5-.62.83a2.7 2.7 0 00-.22 1.06c0 .31.05.6.16.87.11.27.26.5.45.7.2.2.43.35.7.47a2.8 2.8 0 001.6.2c.38 0 .74-.07 1.07-.2.27-.12.5-.28.7-.47.2-.2.35-.43.46-.7z" fill="white" />
    </svg>`,
    Framer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" fill="#05F"><path d="M4 2h16v7h-8v7h-8V2z M4 16h8l-8 6v-6z"/></svg>`,
    Docker: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" fill="#1D63ED">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.6.036-.185.107-.507.107H4.053c-.236 0-.415.17-.332.442C4.16 13.845 5.495 17.85 9.4 19.94c3.073 1.67 5.804 1.59 7.803 1.315.36-.046.72-.103 1.05-.178 2.42-.62 4.57-1.96 5.977-4.518l.149-.28c.725-1.78.92-4.01.57-5.954-.184-.865-.378-1.258-.386-1.274-.179-.318-.355-.64-.694-.742z"/>
    </svg>`,
  };

  // Função para renderizar o ícone com fallback para SVG
  const renderIcon = (skillName) => {
    if (!skillIcons[skillName]) {
      return <i className="fas fa-code"></i>;
    }

    // Se tiver um ícone SVG como fallback e estiver usando Devicon (que pode não estar carregado)
    if (
      skillIcons[skillName].icon.startsWith("devicon-") &&
      svgIcons[skillName]
    ) {
      return (
        <span
          className="svg-icon"
          dangerouslySetInnerHTML={{ __html: svgIcons[skillName] }}
        ></span>
      );
    }

    return <i className={skillIcons[skillName].icon}></i>;
  };

  // Definindo a lista de habilidades
  const skills = [
    {
      id: 1,
      name: "HTML5",
      level: 90,
      category: "Front-end",
      description:
        "Desenvolvimento de estruturas semânticas para web, com foco em acessibilidade e SEO.",
      useCases: ["Interfaces de usuário", "Landing pages", "Formulários"],
    },
    {
      id: 2,
      name: "CSS3",
      level: 85,
      category: "Front-end",
      description:
        "Estilização avançada com CSS Grid, Flexbox e animações para interfaces modernas.",
      useCases: ["Layouts responsivos", "Animações", "Design systems"],
    },
    {
      id: 3,
      name: "JavaScript",
      level: 80,
      category: "Front-end",
      description:
        "Desenvolvimento de funcionalidades interativas, manipulação do DOM e APIs.",
      useCases: ["Interatividade", "Validações", "Consumo de APIs"],
    },
    {
      id: 4,
      name: "React",
      level: 75,
      category: "Front-end",
      description:
        "Criação de interfaces dinâmicas com componentes reutilizáveis e gerenciamento de estado.",
      useCases: ["SPAs", "Dashboards", "Portais corporativos"],
    },
    {
      id: 5,
      name: "Sass",
      level: 70,
      category: "Front-end",
      description:
        "Pré-processador CSS para desenvolvimento mais rápido e organizado de estilos.",
      useCases: ["Temas dinâmicos", "Arquitetura CSS", "Design systems"],
    },
    {
      id: 6,
      name: "TypeScript",
      level: 65,
      category: "Front-end",
      description:
        "Desenvolvimento com tipagem estática para código mais seguro e escalável.",
      useCases: ["Aplicações empresariais", "Projetos de grande escala"],
    },
    {
      id: 7,
      name: "Node.js",
      level: 60,
      category: "Back-end",
      description:
        "Construção de APIs RESTful, microsserviços e aplicações server-side.",
      useCases: ["APIs", "Microsserviços", "Aplicações backend"],
    },
    {
      id: 8,
      name: "SQL",
      level: 55,
      category: "Back-end",
      description:
        "Modelagem, consulta e manipulação de dados em bancos relacionais.",
      useCases: ["Banco de dados", "Relatórios", "Análise de dados"],
    },
    {
      id: 9,
      name: "Git",
      level: 70,
      category: "Ferramentas",
      description:
        "Controle de versão para gerenciamento de código e colaboração em equipe.",
      useCases: ["Versionamento", "Trabalho em equipe", "CI/CD"],
    },
    {
      id: 10,
      name: "Figma",
      level: 20,
      category: "Design",
      description:
        "Prototipagem e design de interfaces com foco em colaboração e componentes.",
      useCases: ["UI/UX", "Prototipagem", "Design systems"],
    },
    {
      id: 11,
      name: "Vite",
      level: 65,
      category: "Ferramentas",
      description:
        "Ferramenta de build ultra-rápida para desenvolvimento moderno com hot module replacement.",
      useCases: [
        "Desenvolvimento rápido",
        "Projetos JavaScript/TypeScript",
        "Configuração simplificada",
      ],
    },
    {
      id: 12,
      name: "Tailwind",
      level: 70,
      category: "Front-end",
      description:
        "Framework CSS utilitário para desenvolvimento rápido e consistente de interfaces.",
      useCases: [
        "Design systems",
        "Interfaces responsivas",
        "Prototipagem rápida",
      ],
    },
    {
      id: 13,
      name: "C#",
      level: 45,
      category: "Back-end",
      description:
        "Linguagem de programação versátil para desenvolvimento de aplicações corporativas e jogos.",
      useCases: [
        "Aplicações .NET",
        "Desenvolvimento para Windows",
        "APIs corporativas",
      ],
    },
    {
      id: 14,
      name: "Canva",
      level: 25,
      category: "Design",
      description:
        "Plataforma de design gráfico online para criação de conteúdo visual e marketing.",
      useCases: [
        "Marketing digital",
        "Redes sociais",
        "Materiais promocionais",
      ],
    },
    {
      id: 15,
      name: "Framer",
      level: 25,
      category: "Design",
      description:
        "Ferramenta para prototipagem de alta fidelidade com capacidades avançadas de animação e interatividade.",
      useCases: [
        "Protótipos interativos",
        "Animações complexas",
        "Apresentações",
      ],
    },
    {
      id: 16,
      name: "Docker",
      level: 60,
      category: "Ferramentas",
      description:
        "Plataforma de containerização que automatiza a implantação, escalabilidade e gestão de aplicações.",
      useCases: [
        "Desenvolvimento consistente",
        "Implantação simplificada",
        "Microserviços",
      ],
    },
  ];

  // Filtrar habilidades baseado na categoria ativa
  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => {
          // Mapear IDs de categorias para suas correspondentes em português
          const categoryMap = {
            "front-end": "Front-end",
            "back-end": "Back-end",
            tools: "Ferramentas",
            design: "Design",
          };

          return skill.category === categoryMap[activeCategory];
        });

  // Gerenciar a abertura do modal de detalhes
  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  // Gerenciar o hover em habilidades
  const handleSkillHover = (id, isHovering) => {
    setHoveredSkill(isHovering ? id : null);
  };

  // Gerenciar a mudança de categoria
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);

    // Animar os cards quando a categoria muda
    gsap.fromTo(
      ".skill-card",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.1,
      }
    );
  };

  // Aplicar efeito de paralaxe no fundo quando o mouse se move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isVisible) return;

      const sectionElement = sectionRef.current;
      if (!sectionElement) return;

      const { left, top, width, height } =
        sectionElement.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const mouseY = e.clientY - top;

      const moveX = (mouseX - width / 2) / 50;
      const moveY = (mouseY - height / 2) / 50;

      gsap.to(sectionElement, {
        backgroundPosition: `${moveX}px ${moveY}px`,
        duration: 1,
        ease: "power1.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isVisible]);

  // Configurar animações quando o componente montar
  useEffect(() => {
    // Configurar o ScrollTrigger
    const section = sectionRef.current;
    const title = titleRef.current;
    const categories = categoriesRef.current;
    const skillsGrid = skillsGridRef.current;

    if (!section || !title || !categories || !skillsGrid) return;

    // Animação inicial da seção quando ela se torna visível
    const sectionTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        setIsVisible(true);

        // Animar o título
        gsap.fromTo(
          title.querySelector("h2"),
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
        );

        gsap.fromTo(
          title.querySelector("p"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power2.out" }
        );

        // Animar as categorias
        gsap.fromTo(
          categories.querySelectorAll(".category-btn"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.4,
            ease: "power2.out",
          }
        );

        // Animar os cards de habilidades
        gsap.fromTo(
          skillsGrid.querySelectorAll(".skill-card"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
            stagger: 0.08,
            delay: 0.6,
            ease: "power2.out",
          }
        );
      },
      onLeaveBack: () => {
        setIsVisible(false);
      },
    });

    // Efeito parallax em rolagem
    const paralaxItems = gsap.utils.toArray(".skill-card");
    paralaxItems.forEach((item, i) => {
      const depth = i % 2 === 0 ? -0.05 : 0.05;
      gsap.to(item, {
        y: `${(i % 3) * 10}`,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
          });
        });

      return () => {
      // Limpar ScrollTriggers quando o componente desmontar
      sectionTrigger.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      };
  }, []);

  // Efeito para animar as barras de progresso quando a seção se torna visível
  useEffect(() => {
    if (isVisible) {
      gsap.utils.toArray(".skill-progress-bar").forEach((bar, i) => {
        const skill = filteredSkills[i];
        if (!skill) return;

        const width = skill.level + "%";
        gsap.to(bar, {
          width: width,
          duration: 1.5,
          delay: 0.8 + i * 0.1,
          ease: "power2.out",
        });
      });
    }
  }, [isVisible, filteredSkills]);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-container">
        <div className="skills-title" ref={titleRef}>
          <h2 data-text="Habilidades">Habilidades</h2>
          <p>
            Um conjunto de <strong>tecnologias e ferramentas</strong> que
            utilizo para construir experiências digitais modernas e eficientes.
        </p>
      </div>

        <div className="skills-categories" ref={categoriesRef}>
          {categories.map((category) => (
        <button
              key={category.id}
          className={`category-btn ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              <i className={category.icon}></i>
              {category.name}
          </button>
        ))}
      </div>

        <div className="skills-grid" ref={skillsGridRef}>
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
              className="skill-card"
              onMouseEnter={() => handleSkillHover(skill.id, true)}
              onMouseLeave={() => handleSkillHover(skill.id, false)}
              data-category={skill.category}
              data-level={skill.level}
            >
              <div
                className="skill-icon"
            style={{
                  color:
                    hoveredSkill === skill.id
                      ? skillIcons[skill.name]?.color || "var(--purple-soft)"
                      : undefined,
                }}
              >
                {renderIcon(skill.name)}
              </div>

              <div className="skill-content">
                <h3 className="skill-name">{skill.name}</h3>
                <span className="skill-level">{skill.level}%</span>
                <div className="skill-progress">
                  <div
                    className="skill-progress-bar"
                    style={{ "--progress-width": `${skill.level}%` }}
                ></div>
              </div>
                <p className="skill-description">{skill.description}</p>
              <div className="skill-category-tag">
                  <span>{skill.category}</span>
                </div>
                <button
                  className="skill-button"
                  onClick={() => handleSkillClick(skill)}
                >
                  Ver detalhes <i className="fas fa-arrow-right"></i>
                </button>
            </div>
          </div>
        ))}
      </div>
      </div>

      {selectedSkill && (
        <SkillPreviewModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </section>
  );
};

export default SkillsSection;
