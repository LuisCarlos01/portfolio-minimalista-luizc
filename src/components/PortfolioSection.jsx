import React, { useState, useEffect, useRef, useMemo } from "react";
import { projects } from "../data/projectsData";
import ProjectCard from "./ProjectCard";
import { useSection } from "../contexts/SectionContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Componente SectionTitle inline para resolver problema de importação
const SectionTitle = ({ title, subtitle, alignment }) => {
  const align = alignment || "center";

  return (
    <div className={`section-title text-${align} mb-4`}>
      <h2>{title}</h2>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  );
};

// Registrando plugins GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [displayCount, setDisplayCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [animatedIn, setAnimatedIn] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const filtersRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef(null);
  const loadMoreRef = useRef(null);
  const modalRef = useRef(null);
  const featuredProjectRef = useRef(null);
  const projectCounterRef = useRef(null);

  const { activeSection } = useSection();

  // Filtrar projetos por categoria
  const filteredProjects = useMemo(() => {
    return projects.filter(
      (project) =>
        selectedCategory === "all" || project.category === selectedCategory
    );
  }, [selectedCategory, projects]);

  // Obter contagem por categoria
  const categoryCounts = useMemo(() => {
    const counts = {
      all: projects.length,
      web: projects.filter(project => project.category === "web").length,
      app: projects.filter(project => project.category === "app").length,
      design: projects.filter(project => project.category === "design").length
    };
    return counts;
  }, [projects]);

  // Ordenar projetos para destacar os que têm featuredIndex menor
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      // Se apenas um deles tem featuredIndex, ele vem primeiro
      if (a.featuredIndex !== undefined && b.featuredIndex === undefined) return -1;
      if (a.featuredIndex === undefined && b.featuredIndex !== undefined) return 1;
      // Se ambos têm featuredIndex, ordena pelo valor
      if (a.featuredIndex !== undefined && b.featuredIndex !== undefined) {
        return a.featuredIndex - b.featuredIndex;
      }
      // Se nenhum tem featuredIndex, mantém a ordem original
      return 0;
    });
  }, [filteredProjects]);

  // Animação para atualizar o contador de projetos
  useEffect(() => {
    if (projectCounterRef.current) {
      const counterEl = projectCounterRef.current;
      const targetCount = filteredProjects.length;
      
      // Animação do contador
      gsap.to(counterEl, {
        innerHTML: targetCount,
        duration: 1,
        snap: { innerHTML: 1 }, // Arredonda para inteiros
        ease: "power2.out"
      });
    }
  }, [filteredProjects.length]);

  // Animação inicial e de scroll
  useEffect(() => {
    if (sectionRef.current && !animatedIn) {
      const section = sectionRef.current;

      // Animações para o primeiro carregamento da página
      if (isInitialLoad) {
        gsap.set(section, { opacity: 0 });
        setIsInitialLoad(false);
      }

      // Configurar elementos de paralaxe
      const setupParallaxElements = () => {
        const bgElements = section.querySelectorAll(".bg-element");
        bgElements.forEach((el, index) => {
          gsap.to(el, {
            y: () => ScrollTrigger.maxScroll(window) * (index % 2 ? 0.1 : -0.1),
            x: () => ScrollTrigger.maxScroll(window) * (index % 2 ? -0.05 : 0.05),
            rotation: index % 2 ? 10 : -10,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      };

      // Animar entrada da seção
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "center center",
          toggleActions: "play none none none",
          onEnter: () => setAnimatedIn(true),
        },
      });

      timeline
        .fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        )
        .fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .fromTo(
          filtersRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .fromTo(
          projectCounterRef.current,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );

      // Animar cards de projeto com efeito escalonado
      if (projectsRef.current) {
        const projectCards = projectsRef.current.children;
        const cardsArray = Array.from(projectCards);
        
        // Destacar o primeiro projeto (considerado destaque)
        if (cardsArray.length > 0 && featuredProjectRef.current) {
          timeline.fromTo(
            featuredProjectRef.current,
            {
              opacity: 0,
              scale: 0.9,
              y: 30,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.2,
              ease: "elastic.out(1, 0.75)",
            },
            "-=0.4"
          );
          
          // Animar os demais projetos
          timeline.fromTo(
            cardsArray.slice(1),
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.9"
          );
        } else {
          // Se não há projeto destaque, anima todos igualmente
          timeline.fromTo(
            cardsArray,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.4"
          );
        }
      }

      // Animar botão Carregar Mais, se existir
      if (loadMoreRef.current && filteredProjects.length > displayCount) {
        timeline.fromTo(
          loadMoreRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.2"
        );
      }

      // Configurar elementos de paralaxe
      setupParallaxElements();

      return () => {
        // Limpar ScrollTriggers ao desmontar o componente
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [isInitialLoad, filteredProjects.length, displayCount, animatedIn]);

  // Efeitos de hover para os cards
  useEffect(() => {
    const projectCards = document.querySelectorAll(".project-card");

    const onMouseEnter = (e) => {
      const card = e.currentTarget;
      gsap.to(card, {
        y: -12,
        scale: 1.03,
        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.18)",
        duration: 0.4,
        ease: "power2.out",
      });

      // Animar elementos internos do card
      const overlay = card.querySelector(".card-overlay");
      if (overlay) {
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const onMouseLeave = (e) => {
      const card = e.currentTarget;
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        duration: 0.4,
        ease: "power2.out",
      });

      // Animar elementos internos do card
      const overlay = card.querySelector(".card-overlay");
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      projectCards.forEach((card) => {
        card.removeEventListener("mouseenter", onMouseEnter);
        card.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, [filteredProjects, displayCount]);

  // Animação para mudança de categoria
  useEffect(() => {
    if (projectsRef.current && animatedIn) {
      const projectCards = projectsRef.current.children;
      
      // Animação de saída
      const tl = gsap.timeline();
      
      tl.to(projectCards, {
        opacity: 0,
        y: 20,
        stagger: 0.03,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Animação de entrada após a mudança de filtro
          gsap.fromTo(
            projectCards,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.6,
              ease: "power3.out",
            }
          );
        }
      });
      
      // Atualizar contador de projetos
      if (projectCounterRef.current) {
        gsap.to(projectCounterRef.current, {
          innerHTML: filteredProjects.length,
          duration: 0.5,
          snap: { innerHTML: 1 },
          ease: "power2.out"
        });
      }
    }
  }, [selectedCategory, animatedIn]);

  // Carregar mais projetos com animação
  const loadMoreProjects = () => {
    setIsLoading(true);
    
    // Animar botão
    if (loadMoreRef.current) {
      gsap.to(loadMoreRef.current.querySelector('button'), {
        scale: 0.95,
        duration: 0.2,
      });
    }
    
    setTimeout(() => {
      const newDisplayCount = displayCount + 3;
      
      // Animar novos cards que serão exibidos
      const newCards = sortedProjects.slice(displayCount, newDisplayCount);
      setDisplayCount(newDisplayCount);
      
      // Reset da animação do botão
      if (loadMoreRef.current) {
        gsap.to(loadMoreRef.current.querySelector('button'), {
          scale: 1,
          duration: 0.3,
          ease: "back.out(2)",
        });
      }
      
      // Animar entrada dos novos cards
      setTimeout(() => {
        const projectCards = projectsRef.current.children;
        const newCardsElements = Array.from(projectCards).slice(-newCards.length);
        
        gsap.fromTo(
          newCardsElements,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.1, 
            duration: 0.6,
            ease: "power3.out"
          }
        );
        
        setIsLoading(false);
      }, 100);
    }, 800);
  };

  // Abrir modal com detalhes do projeto
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
    
    // Animar abertura do modal
    if (modalRef.current) {
      const modalContent = modalRef.current.querySelector(".modal-content");
      const modalOverlay = modalRef.current.querySelector(".modal-overlay");
      
      gsap.fromTo(
        modalOverlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      
      gsap.fromTo(
        modalContent,
        { 
          opacity: 0,
          y: 50,
          scale: 0.95
        },
        { 
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.5)",
          delay: 0.1
        }
      );
    }
  };

  // Fechar modal com animação
  const closeModal = () => {
    if (modalRef.current) {
      const modalContent = modalRef.current.querySelector(".modal-content");
      const modalOverlay = modalRef.current.querySelector(".modal-overlay");
      
      // Animar fechamento do modal
      gsap.to(modalContent, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
      });
      
      gsap.to(modalOverlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setIsModalOpen(false);
          setSelectedProject(null);
          document.body.style.overflow = "auto";
        }
      });
    } else {
      setIsModalOpen(false);
      setSelectedProject(null);
      document.body.style.overflow = "auto";
    }
  };

  // Manipular tecla ESC para fechar modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="section portfolio-section"
    >
      <div className="bg-element bg-shape-1"></div>
      <div className="bg-element bg-shape-2"></div>
      <div className="bg-element bg-shape-3"></div>
      <div className="bg-element bg-shape-4"></div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div ref={titleRef}>
              <SectionTitle
                title="Portfólio"
                subtitle="Projetos Recentes"
                alignment="center"
              />
            </div>

            <p
              className="section-description text-center mb-5"
              ref={descriptionRef}
            >
              Confira alguns dos meus projetos mais recentes, desde aplicações
              web até design de interfaces e apps mobile.
            </p>

            {/* Filtros de categoria com contador */}
            <div className="portfolio-filter-wrapper mb-5" ref={filtersRef}>
              <div className="category-filters">
                <button
                  className={`category-btn ${
                    selectedCategory === "all" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory("all")}
                >
                  Todos
                  <span className="category-count">{categoryCounts.all}</span>
                </button>
                <button
                  className={`category-btn ${
                    selectedCategory === "web" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory("web")}
                >
                  Web
                  <span className="category-count">{categoryCounts.web}</span>
                </button>
                <button
                  className={`category-btn ${
                    selectedCategory === "app" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory("app")}
                >
                  Mobile
                  <span className="category-count">{categoryCounts.app}</span>
                </button>
                <button
                  className={`category-btn ${
                    selectedCategory === "design" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory("design")}
                >
                  Design
                  <span className="category-count">{categoryCounts.design}</span>
                </button>
              </div>
              
              {/* Contador de projetos */}
              <div className="projects-counter">
                <span>Mostrando </span>
                <span ref={projectCounterRef} className="counter">0</span>
                <span> projeto{filteredProjects.length !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Grade de projetos */}
            <div className="projects-grid" ref={projectsRef}>
              {sortedProjects.slice(0, displayCount).map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => openProjectModal(project)}
                  ref={index === 0 ? featuredProjectRef : null}
                  isFeatured={index === 0 && project.featuredIndex !== undefined}
                />
              ))}
            </div>

            {/* Botão de carregar mais */}
            {filteredProjects.length > displayCount && (
              <div className="text-center mt-5" ref={loadMoreRef}>
                <button
                  className={`load-more-btn ${isLoading ? "loading" : ""}`}
                  onClick={loadMoreProjects}
                  disabled={isLoading}
                >
                  {isLoading ? "Carregando..." : `Carregar Mais (${filteredProjects.length - displayCount})`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de detalhes do projeto */}
      {isModalOpen && selectedProject && (
        <div className="project-modal" ref={modalRef}>
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>
              &times;
            </button>
            <h2>{selectedProject.title}</h2>
            <img
              src={selectedProject.imageUrl}
              alt={selectedProject.title}
              className="modal-image"
            />
            <div className="modal-body">
              <p className="project-description">
                {selectedProject.longDescription || selectedProject.description}
              </p>
              <div className="technologies">
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index} className="technology-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-details">
                {selectedProject.date && (
                  <div className="detail-item">
                    <strong>Data:</strong> {selectedProject.date}
                  </div>
                )}
                {selectedProject.client && (
                  <div className="detail-item">
                    <strong>Cliente:</strong> {selectedProject.client}
                  </div>
                )}
                {selectedProject.type && (
                  <div className="detail-item">
                    <strong>Tipo:</strong> {selectedProject.type}
                  </div>
                )}
              </div>
              {(selectedProject.challenges || selectedProject.solution) && (
                <div className="project-challenges-solution">
                  {selectedProject.challenges && (
                    <div className="challenge">
                      <h4>Desafios</h4>
                      <p>{selectedProject.challenges}</p>
                    </div>
                  )}
                  {selectedProject.solution && (
                    <div className="solution">
                      <h4>Solução</h4>
                      <p>{selectedProject.solution}</p>
                    </div>
                  )}
                </div>
              )}
              <div className="modal-actions">
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn primary-btn"
                  >
                    Ver Demo
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn secondary-btn"
                  >
                    Ver Código
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="modal-overlay" onClick={closeModal}></div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
