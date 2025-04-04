import React from "react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

// Importar os ícones e cores para cada habilidade do SkillsSection
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
    color: "url(#canva-gradient-modal)", // Gradiente - oficial Canva
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

// Definindo os ícones SVG alternativos (caso os devicons falhem)
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
      <linearGradient id="canva-gradient-modal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#00C4CC" />
        <stop offset="50%" style="stop-color:#8B57E9" />
        <stop offset="100%" style="stop-color:#FF5879" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="12" fill="url(#canva-gradient-modal)" />
    <path d="M8.52 11.98c0-.25.1-.46.29-.65.2-.19.43-.28.7-.28.25 0 .46.09.65.28.2.19.3.4.3.65 0 .25-.1.45-.3.64-.19.19-.4.28-.65.28-.27 0-.5-.09-.7-.28a.88.88 0 01-.29-.64zm1.17-2.92c0-.29-.1-.53-.3-.72a.97.97 0 00-.72-.28c-.29 0-.53.09-.72.28-.2.2-.3.43-.3.72 0 .27.1.5.3.7.2.2.43.3.72.3.28 0 .52-.1.72-.3.2-.2.3-.43.3-.7zm2.57 1.66c.11-.27.16-.56.16-.87 0-.38-.07-.73-.22-1.06a2.4 2.4 0 00-.6-.83 2.92 2.92 0 00-.93-.54 3.2 3.2 0 00-1.16-.2c-.42 0-.8.07-1.15.2-.35.14-.66.34-.92.54-.26.23-.47.5-.62.83a2.7 2.7 0 00-.22 1.06c0 .31.05.6.16.87.11.27.26.5.45.7.2.2.43.35.7.47a2.8 2.8 0 001.6.2c.38 0 .74-.07 1.07-.2.27-.12.5-.28.7-.47.2-.2.35-.43.46-.7zm2.77 0c.11-.27.16-.56.16-.87 0-.38-.07-.73-.22-1.06a2.4 2.4 0 00-.6-.83 2.92 2.92 0 00-.93-.54a3.2 3.2 0 00-1.16-.2c-.42 0-.8.07-1.15.2-.35.14-.66.34-.92.54-.26.23-.47.5-.62.83a2.7 2.7 0 00-.22 1.06c0 .31.05.6.16.87.11.27.26.5.45.7.2.2.43.35.7.47a2.8 2.8 0 001.6.2c.38 0 .74-.07 1.07-.2.27-.12.5-.28.7-.47.2-.2.35-.43.46-.7z" fill="white" />
  </svg>`,
  Framer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" fill="#05F"><path d="M4 2h16v7h-8v7h-8V2z M4 16h8l-8 6v-6z"/></svg>`,
  Tailwind: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" fill="#06B6D4"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>`,
  Docker: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" fill="#1D63ED">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.6.036-.185.107-.507.107H4.053c-.236 0-.415.17-.332.442C4.16 13.845 5.495 17.85 9.4 19.94c3.073 1.67 5.804 1.59 7.803 1.315.36-.046.72-.103 1.05-.178 2.42-.62 4.57-1.96 5.977-4.518l.149-.28c.725-1.78.92-4.01.57-5.954-.184-.865-.378-1.258-.386-1.274-.179-.318-.355-.64-.694-.742z"/>
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

const SkillPreviewModal = ({ skill, onClose }) => {
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);
  const progressCircleRef = useRef(null);
  const modalBodyRef = useRef(null);
  const startY = useRef(0);
  const isMobile = useRef(window.innerWidth < 768);

  useEffect(() => {
    // Atualizar status de mobile ao redimensionar a tela
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (skill && modalRef.current) {
      // Definir overflow hidden no body quando o modal abrir
      document.body.style.overflow = "hidden";

      // Animar a entrada do modal
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Animar a entrada do conteúdo
      gsap.fromTo(
        modalContentRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );

      // Animar elementos internos do modal
      const modalHeader =
        modalContentRef.current.querySelector(".modal-header");
      const modalBody = modalContentRef.current.querySelector(".modal-body");
      const modalFooter =
        modalContentRef.current.querySelector(".modal-footer");

      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        modalHeader,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      )
        .fromTo(
          modalBody.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
        )
        .fromTo(
          modalFooter,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
          "-=0.2"
        );

      // Animar o círculo de progresso
      if (progressCircleRef.current) {
        setTimeout(() => {
          // Animação do círculo de progresso
          gsap.to(progressCircleRef.current, {
            duration: 1.5,
            strokeDashoffset: 100 - skill.level,
            ease: "power2.out",
          });

          // Animação do texto de porcentagem
          gsap.fromTo(
            ".skill-percentage",
            { textContent: "0%" },
            {
              textContent: `${skill.level}%`,
              duration: 1.5,
              ease: "power2.out",
              snap: { textContent: 1 },
              stagger: 0.05,
            }
          );
        }, 500);
      }

      // Fechar o modal quando pressionar ESC
      const handleEscKey = (e) => {
        if (e.key === "Escape") {
          handleClose();
        }
      };

      document.addEventListener("keydown", handleEscKey);

      // Configuração para eventos de toque em dispositivos móveis
      const handleTouchStart = (e) => {
        if (!isMobile.current) return;
        if (modalBodyRef.current && !modalBodyRef.current.contains(e.target)) {
          startY.current = e.touches[0].clientY;
        }
      };

      const handleTouchMove = (e) => {
        if (!isMobile.current) return;
        const modalHeader =
          modalContentRef.current.querySelector(".modal-header");

        // Se estiver no header e arrastar para baixo, permitir fechamento
        if (modalHeader && modalHeader.contains(e.target)) {
          const currentY = e.touches[0].clientY;
          const diff = currentY - startY.current;

          if (diff > 50) {
            handleClose();
          }
        }
      };

      modalRef.current.addEventListener("touchstart", handleTouchStart);
      modalRef.current.addEventListener("touchmove", handleTouchMove);

      return () => {
        document.removeEventListener("keydown", handleEscKey);
        if (modalRef.current) {
          modalRef.current.removeEventListener("touchstart", handleTouchStart);
          modalRef.current.removeEventListener("touchmove", handleTouchMove);
        }
        document.body.style.overflow = "auto"; // Restaurar o overflow quando o componente for desmontado
      };
    }
  }, [skill]);

  // Função para animar a saída do modal
  const handleClose = () => {
    if (modalRef.current) {
      // Animar a saída do conteúdo do modal
      gsap.to(modalContentRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
      });

      // Animar a saída do overlay
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  // Impedir que cliques no conteúdo do modal fechem o modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!skill) return null;

  // Escolher a cor de destaque com base na skill selecionada ou na categoria
  const getSkillColor = () => {
    if (skillIcons[skill.name]) {
      return skillIcons[skill.name].color;
    }

    // Fallback para cores baseadas na categoria
    switch (skill.category) {
      case "Front-end":
        return "#4aa3df";
      case "Back-end":
        return "#3498db";
      case "Ferramentas":
        return "#9b59b6";
      case "Design":
        return "#e74c3c";
      default:
        return "#2ecc71";
    }
  };

  const skillColor = getSkillColor();
  const iconClass = skillIcons[skill.name]?.icon || "fas fa-code";

  // Função para obter o nível de proficiência baseado na porcentagem
  const getSkillProficiency = (level) => {
    if (level >= 90) return "Especialista";
    if (level >= 75) return "Avançado";
    if (level >= 60) return "Intermediário";
    return "Básico";
  };

  // Gerar pontos fortes com base na categoria e nível
  const getStrengths = (skill) => {
    const strengths = [];

    if (skill.category === "Front-end") {
      strengths.push("Interfaces responsivas");
      if (skill.level >= 80) strengths.push("Otimização de performance");
      if (skill.level >= 70) strengths.push("Acessibilidade");
    } else if (skill.category === "Back-end") {
      strengths.push("Arquitetura escalável");
      if (skill.level >= 75) strengths.push("Segurança de dados");
      if (skill.level >= 70) strengths.push("APIs RESTful");
    } else if (skill.category === "Ferramentas") {
      strengths.push("Produtividade");
      if (skill.level >= 80) strengths.push("Fluxos de trabalho avançados");
      if (skill.level >= 75) strengths.push("Automação");
    } else if (skill.category === "Design") {
      strengths.push("UI/UX moderno");
      if (skill.level >= 70) strengths.push("Protótipos interativos");
      if (skill.level >= 75) strengths.push("Design systems");
    }

    return strengths.join(", ");
  };

  return (
    <div className="modal-overlay" onClick={handleClose} ref={modalRef}>
      <div
        className="modal-content"
        onClick={handleContentClick}
        ref={modalContentRef}
      >
        <div className="modal-header" style={{ backgroundColor: skillColor }}>
          <div className="modal-title">
            <h2>
              {renderIcon(skill.name)}
              {skill.name}
            </h2>
            <span className="skill-category">{skill.category}</span>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body" ref={modalBodyRef}>
          <div className="skill-level-display">
            <div className="skill-progress-circle">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="#f2f2f2"
                  strokeWidth="10"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke={skillColor}
                  strokeWidth="10"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  ref={progressCircleRef}
                  transform="rotate(-90 70 70)"
                  style={{ transition: "stroke-dashoffset 1.5s ease" }}
                />
              </svg>
              <div className="skill-progress-inner">
                <span className="skill-percentage">0%</span>
              </div>
            </div>
            <span className="skill-proficiency">
              {getSkillProficiency(skill.level)}
            </span>
          </div>

          <div className="skill-details">
            <h3>Sobre esta habilidade</h3>
            <p>{skill.description}</p>

            <div className="skill-info-section">
              <div className="skill-info-card">
                <i className="fas fa-star" style={{ color: skillColor }}></i>
                <h4>Pontos Fortes</h4>
                <p>{getStrengths(skill)}</p>
              </div>

              <div className="skill-info-card">
                <i
                  className="fas fa-lightbulb"
                  style={{ color: skillColor }}
                ></i>
                <h4>Aplicações</h4>
                <p>
                  {skill.useCases
                    ? skill.useCases.join(", ")
                    : "Desenvolvimento eficiente, integrações e soluções práticas"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-action-btn secondary" onClick={handleClose}>
            Fechar
          </button>
          <a
            href="#portfolio"
            className="modal-action-btn primary"
            style={{ backgroundColor: skillColor }}
            onClick={(e) => {
              e.preventDefault();
              handleClose();
              setTimeout(() => {
                document
                  .getElementById("portfolio")
                  .scrollIntoView({ behavior: "smooth" });
              }, 300);
            }}
          >
            Ver Projetos <i className="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SkillPreviewModal;
