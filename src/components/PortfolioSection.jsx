import React, { useState, useEffect, useRef } from "react";
import { projects } from "../data/projectsData";
import ProjectCard from "./ProjectCard";
import { useSection } from "../contexts/SectionContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(ScrollTrigger);

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [displayCount, setDisplayCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const filtersRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef(null);
  const loadMoreRef = useRef(null);
  const modalRef = useRef(null);

  const { activeSection, isFirstLoad, showSection } = useSection();

  // Filtrar projetos por categoria
  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "all" || project.category === selectedCategory
  );

  // Animação inicial
  useEffect(() => {
    if (sectionRef.current) {
      const section = sectionRef.current;

      // Animações para o primeiro carregamento da página
      if (isFirstLoad) {
        gsap.set(section, { opacity: 0 });
      }

      // Configura as animações para scroll
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "center center",
          toggleActions: "play none none none",
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
          projectsRef.current.children,
          {
            opacity: 0,
            y: 30,
            stagger: 0.15,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );

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

      // Efeito parallax nos elementos de fundo
      const bgElements = document.querySelectorAll(".bg-element");
      bgElements.forEach((el) => {
        gsap.to(el, {
          y: () => ScrollTrigger.maxScroll(window) * Math.random() * 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [isFirstLoad, filteredProjects.length, displayCount]);

  // Efetos de hover para os cards
  useEffect(() => {
    const projectCards = document.querySelectorAll(".project-card");

    const onMouseEnter = (e) => {
      const card = e.currentTarget;
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseLeave = (e) => {
      const card = e.currentTarget;
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });
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

  // Carregar mais projetos
  const loadMoreProjects = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount((prevCount) => prevCount + 3);
      setIsLoading(false);
    }, 800);
  };

  // Abrir modal com detalhes do projeto
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Fechar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "auto";
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

            {/* Filtros de categoria */}
            <div className="category-filters mb-5" ref={filtersRef}>
              <button
                className={`category-btn ${
                  selectedCategory === "all" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                Todos
              </button>
              <button
                className={`category-btn ${
                  selectedCategory === "web" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("web")}
              >
                Web
              </button>
              <button
                className={`category-btn ${
                  selectedCategory === "app" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("app")}
              >
                Mobile
              </button>
              <button
                className={`category-btn ${
                  selectedCategory === "design" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("design")}
              >
                Design
              </button>
            </div>

            {/* Grade de projetos */}
            <div className="projects-grid" ref={projectsRef}>
              {filteredProjects.slice(0, displayCount).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => openProjectModal(project)}
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
                  {isLoading ? "Carregando..." : "Carregar Mais"}
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
            <p>
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
          <div className="modal-overlay" onClick={closeModal}></div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
