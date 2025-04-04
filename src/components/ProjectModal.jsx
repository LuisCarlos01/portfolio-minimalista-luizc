import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

const ProjectModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const containerRef = useRef(null);

  // Fechar o modal ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Animar abertura e fechamento do modal
  useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen) {
      // Abrir modal com animação
      document.body.style.overflow = "hidden"; // Evitar rolagem do corpo da página
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(containerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
        delay: 0.1,
      });
    } else {
      // Fechar modal com animação
      document.body.style.overflow = ""; // Restaurar rolagem
    }

    return () => {
      document.body.style.overflow = ""; // Garantir que a rolagem seja restaurada ao desmontar
    };
  }, [isOpen]);

  // Manipuladores de eventos
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleDemoClick = () => {
    if (project?.demoUrl) {
      window.open(project.demoUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleGithubClick = () => {
    if (project?.githubUrl) {
      window.open(project.githubUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!project) return null;

  // Extrair informações do projeto para exibição
  const {
    title,
    imageUrl,
    longDescription,
    description,
    technologies = [],
    category,
    date,
    client,
    type,
    challenges = [],
    solution = [],
  } = project;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`project-modal ${isOpen ? "open" : ""}`}
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="modal-overlay"
            ref={overlayRef}
            onClick={handleOverlayClick}
          >
            <motion.div
              className={`modal-container ${isOpen ? "open" : ""}`}
              ref={containerRef}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="modal-header">
                <img
                  src={imageUrl || "/images/project-placeholder.jpg"}
                  alt={title}
                  onError={(e) => {
                    e.target.src = "/images/project-placeholder.jpg";
                  }}
                />
                <div className="header-overlay">
                  <h2 className="project-title">{title}</h2>
                </div>
                <button
                  className="close-button"
                  onClick={onClose}
                  aria-label="Fechar modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="modal-content">
                <div className="project-info-grid">
                  {category && (
                    <div className="info-item">
                      <span className="info-label">Categoria</span>
                      <span className="info-value">{category}</span>
                    </div>
                  )}
                  {date && (
                    <div className="info-item">
                      <span className="info-label">Data</span>
                      <span className="info-value">{date}</span>
                    </div>
                  )}
                  {client && (
                    <div className="info-item">
                      <span className="info-label">Cliente</span>
                      <span className="info-value">{client}</span>
                    </div>
                  )}
                  {type && (
                    <div className="info-item">
                      <span className="info-label">Tipo</span>
                      <span className="info-value">{type}</span>
                    </div>
                  )}
                </div>

                <div className="project-description">
                  <h3>Descrição</h3>
                  <p>{longDescription || description}</p>
                </div>

                <div className="project-sections">
                  {challenges && challenges.length > 0 && (
                    <div className="section">
                      <h4>Desafios</h4>
                      <ul>
                        {challenges.map((challenge, index) => (
                          <li key={index}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {solution && solution.length > 0 && (
                    <div className="section">
                      <h4>Solução</h4>
                      <ul>
                        {solution.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="tech-stack">
                  <h4>Tecnologias Utilizadas</h4>
                  <div className="tech-tags">
                    {technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-actions">
                  {project.demoUrl && (
                    <motion.button
                      className="action-button primary"
                      onClick={handleDemoClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Ver Demo</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </motion.button>
                  )}

                  {project.githubUrl && (
                    <motion.button
                      className="action-button secondary"
                      onClick={handleGithubClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Ver Código</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
