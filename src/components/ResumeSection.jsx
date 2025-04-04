import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSection } from "../contexts/SectionContext";
import {
  FaDownload,
  FaChevronDown,
  FaChevronUp,
  FaBriefcase,
  FaGraduationCap,
  FaCertificate,
} from "react-icons/fa";

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ResumeSection = () => {
  const { activeSection } = useSection();
  const [activeTab, setActiveTab] = useState("experience");
  const timelineRef = useRef(null);
  const sectionRef = useRef(null);
  const animationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); // Sempre visível para debugging
  const [expandedItems, setExpandedItems] = useState({});
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const tabsRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const downloadRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  // Toggle da expansão de um item
  const toggleExpand = (itemId) => {
    // Aplicar animação ao expandir/recolher
    const detailsElement = document.querySelector(
      `.resume-item.${itemId} .resume-details`
    );
    if (detailsElement) {
      gsap.to(detailsElement, {
        height: expandedItems[itemId] ? 0 : "auto",
        opacity: expandedItems[itemId] ? 0 : 1,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }

    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));

    // Animação do ícone de toggle
    const toggleButton = document.querySelector(
      `.resume-item.${itemId} .toggle-button svg`
    );
    if (toggleButton) {
      gsap.to(toggleButton, {
        rotation: expandedItems[itemId] ? 0 : 180,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  };

  // Verificar se o item está expandido
  const isExpanded = (itemId) => {
    return expandedItems[itemId] || false;
  };

  // Efeito para verificar a visibilidade da seção
  useEffect(() => {
    setIsVisible(activeSection === "resume" || true); // Sempre visível para debugging

    // Configurar o efeito de parallax para o fundo
    if (sectionRef.current) {
      const shapes = document.querySelectorAll(
        ".resume-background-shapes .shape"
      );

      gsap.fromTo(
        shapes,
        { y: 0 },
        {
          y: (i) => (i % 2 === 0 ? -50 : 50),
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    }

    // Animar elementos quando a seção estiver visível
    if (isVisible) {
      // Criar animação de entrada
      const masterTimeline = gsap.timeline();

      // Animar cabeçalho
      if (headerRef.current) {
        masterTimeline.fromTo(
          headerRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }

      // Animar tabs
      if (tabsRef.current && tabsRef.current.children.length > 0) {
        masterTimeline.fromTo(
          tabsRef.current.children,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );
      }

      // Animar botão de download
      if (downloadRef.current) {
        masterTimeline.fromTo(
          downloadRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.2"
        );

        // Efeito de flutuação contínua
        gsap.to(downloadRef.current, {
          y: "-5px",
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "sine.inOut",
          delay: 0.8,
        });
      }
    }
  }, [activeSection, isVisible]);

  // Efeito para animar a troca de tabs
  useEffect(() => {
    if (isVisible && timelineRef.current) {
      // Animar itens do currículo
      const items = timelineRef.current.querySelectorAll(".resume-item");
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "power3.out",
          }
        );
      } else {
        console.warn("Nenhum item encontrado na timeline para animar");
      }

      // Animar linhas da timeline
      const timelineLines =
        timelineRef.current.querySelectorAll(".timeline-line");
      if (timelineLines.length > 0) {
        gsap.fromTo(
          timelineLines,
          { height: 0 },
          {
            height: "100%",
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.3,
          }
        );
      }

      // Animar pontos da timeline
      const timelinePoints =
        timelineRef.current.querySelectorAll(".timeline-point");
      if (timelinePoints.length > 0) {
        gsap.fromTo(
          timelinePoints,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.3,
            ease: "back.out(1.7)",
            delay: 0.2,
          }
        );
      }
    }
  }, [activeTab, isVisible]);

  // Função para animar skill tag quando hover
  const handleSkillHover = (skillId, isEntering) => {
    setHoveredSkill(isEntering ? skillId : null);

    // Animar a skill tag
    const skillElement = document.querySelector(`.skill-${skillId}`);
    if (skillElement) {
      if (isEntering) {
        gsap.to(skillElement, {
          backgroundColor: "var(--primary-color)",
          color: "white",
          y: -5,
          scale: 1.1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      } else {
        gsap.to(skillElement, {
          backgroundColor: "rgba(var(--primary-rgb), 0.1)",
          color: "var(--text-color)",
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  };

  // Dados de experiência profissional
  const experienceData = [
    {
      id: "exp1",
      title: "Desenvolvedor Backend",
      company: "TechSolutions Brasil",
      period: "2021 - Presente",
      description:
        "Desenvolvimento de APIs RESTful, implementação de microserviços, integração com bancos de dados, otimização de desempenho e segurança de sistemas web.",
      achievements: [
        "Reduzi o tempo de resposta das APIs em 40% através de otimizações de banco de dados.",
        "Implementei autenticação JWT e autorização baseada em roles para todas as APIs.",
        "Desenvolvi uma arquitetura de microserviços escalável usando Node.js e Docker.",
      ],
      skills: ["Node.js", "Express", "MongoDB", "Docker", "REST API"],
    },
    {
      id: "exp2",
      title: "Desenvolvedor Web Freelancer",
      company: "Autônomo",
      period: "2019 - 2021",
      description:
        "Desenvolvimento de sites responsivos e aplicações web para pequenas e médias empresas, utilizando HTML5, CSS3, JavaScript e React.",
      achievements: [
        "Criei mais de 15 sites responsivos para clientes em diversos setores.",
        "Desenvolvi soluções de e-commerce personalizadas para 5 lojas virtuais.",
      ],
      skills: ["React", "JavaScript", "HTML/CSS", "UI/UX", "Wordpress"],
    },
  ];

  // Dados de educação
  const educationData = [
    {
      id: "edu1",
      title: "Bacharelado em Ciência da Computação",
      institution: "Universidade Federal de São Paulo",
      period: "2017 - 2021",
      description:
        "Formação completa em Ciência da Computação, com foco em desenvolvimento de software, algoritmos e estruturas de dados, redes de computadores e inteligência artificial.",
      achievements: [
        "TCC: 'Implementação de algoritmos de aprendizado de máquina para detecção de fraudes'",
        "Participação em projetos de iniciação científica na área de IA",
      ],
      courses: [
        "Algoritmos Avançados",
        "Desenvolvimento Web",
        "Inteligência Artificial",
        "Segurança da Informação",
      ],
    },
  ];

  // Dados de certificações
  const certificationsData = [
    {
      id: "cert1",
      title: "AWS Certified Developer - Associate",
      institution: "Amazon Web Services",
      period: "2022",
      description:
        "Certificação que valida habilidades em desenvolvimento, implantação e depuração de aplicativos baseados na nuvem AWS.",
      skills: ["Lambda", "API Gateway", "DynamoDB", "S3", "CloudFormation"],
    },
    {
      id: "cert2",
      title: "Node.js Application Developer",
      institution: "OpenJS Foundation",
      period: "2021",
      description:
        "Certificação da OpenJS Foundation que valida conhecimentos avançados em desenvolvimento de aplicações com Node.js.",
      skills: [
        "Express.js",
        "RESTful APIs",
        "Autenticação",
        "MongoDB",
        "Websockets",
      ],
    },
    {
      id: "cert3",
      title: "React Developer",
      institution: "Meta (Facebook)",
      period: "2020",
      description:
        "Certificação que valida habilidades em desenvolvimento de interfaces de usuário modernas com React.",
      skills: ["React", "Redux", "Hooks", "React Router", "Context API"],
    },
  ];

  // Renderizar a lista de itens baseado na tab ativa
  const renderItems = () => {
    let data = [];

    switch (activeTab) {
      case "experience":
        data = experienceData;
        break;
      case "education":
        data = educationData;
        break;
      case "certifications":
        data = certificationsData;
        break;
      default:
        data = experienceData;
    }

    return (
      <div className={`resume-timeline-container`} ref={timelineRef}>
        {data.map((item, index) => (
          <div
            className={`resume-item ${item.id} ${
              isExpanded(item.id) ? "expanded" : ""
            }`}
            key={item.id}
          >
            <div className="timeline-marker">
              <div className="timeline-point"></div>
              {index < data.length - 1 && <div className="timeline-line"></div>}
            </div>

            <div
              className="resume-content"
              onClick={() => toggleExpand(item.id)}
            >
              <div className="resume-header">
                <div className="resume-title">
                  <h4>{item.title}</h4>
                  <h5>{item.company || item.institution}</h5>
                </div>
                <span className="resume-date">{item.period}</span>
              </div>

              <p className="resume-description">{item.description}</p>

              <div
                className="resume-details"
                style={{
                  height: isExpanded(item.id) ? "auto" : 0,
                  opacity: isExpanded(item.id) ? 1 : 0,
                  overflow: "hidden",
                }}
              >
                {item.achievements && (
                  <div className="achievements-section">
                    <h5 className="detail-title">Conquistas</h5>
                    <ul className="resume-achievements">
                      {item.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.courses && (
                  <div className="courses-section">
                    <h5 className="detail-title">Disciplinas Principais</h5>
                    <ul className="resume-courses">
                      {item.courses.map((course, i) => (
                        <li key={i}>{course}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.skills && (
                  <div className="skills-section">
                    <h5 className="detail-title">Habilidades</h5>
                    <div className="resume-skills">
                      {item.skills.map((skill, i) => (
                        <span
                          key={i}
                          className={`skill-tag skill-${item.id}-${i}`}
                          onMouseEnter={() =>
                            handleSkillHover(`${item.id}-${i}`, true)
                          }
                          onMouseLeave={() =>
                            handleSkillHover(`${item.id}-${i}`, false)
                          }
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="toggle-details">
                <button
                  className="toggle-button"
                  aria-label={
                    isExpanded(item.id)
                      ? "Ocultar detalhes"
                      : "Mostrar detalhes"
                  }
                >
                  {isExpanded(item.id) ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="resume-section" id="resume" ref={sectionRef}>
      {/* Elementos de fundo para efeito parallax */}
      <div className="resume-background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="resume-container">
        <div ref={headerRef}>
          <h2 className="resume-header" ref={titleRef}>
            Meu Currículo
          </h2>
          <p className="section-description" ref={descriptionRef}>
            Minha trajetória profissional e acadêmica até o momento.
          </p>
        </div>

        <div className="resume-tabs" ref={tabsRef}>
          <button
            className={`tab-button ${
              activeTab === "experience" ? "active" : ""
            }`}
            onClick={() => setActiveTab("experience")}
          >
            <FaBriefcase /> Experiência
          </button>

          <button
            className={`tab-button ${
              activeTab === "education" ? "active" : ""
            }`}
            onClick={() => setActiveTab("education")}
          >
            <FaGraduationCap /> Educação
          </button>

          <button
            className={`tab-button ${
              activeTab === "certifications" ? "active" : ""
            }`}
            onClick={() => setActiveTab("certifications")}
          >
            <FaCertificate /> Certificações
          </button>
        </div>

        <div className="resume-content-wrapper" ref={contentRef}>
          <div className={`resume-content resume-content-${activeTab}`}>
            {renderItems()}
          </div>
        </div>

        <div className="resume-download" ref={downloadRef}>
          <a href="/resume.pdf" className="download-button" download>
            <FaDownload /> Baixar Currículo PDF
          </a>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
