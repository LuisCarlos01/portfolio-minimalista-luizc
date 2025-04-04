import React, { useState, useEffect, forwardRef } from "react";
import gsap from "gsap";

const ProjectCard = forwardRef(({ project, onClick, isFeatured = false }, ref) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Pré-carregar a imagem
  const preloadImage = () => {
    const img = new Image();
    img.src = project.imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true); // Continuar mesmo se a imagem falhar
  };

  // Iniciar pré-carregamento ao montar o componente
  useEffect(() => {
    preloadImage();
  }, []);

  // Efeito para destaques
  useEffect(() => {
    if (isFeatured && ref && ref.current) {
      // Adicionar brilho pulsante na borda para projetos em destaque
      const pulse = gsap.to(ref.current, {
        boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.6), 0 5px 15px rgba(0, 0, 0, 0.15)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        paused: true
      });
      
      // Iniciar a animação após um curto delay
      setTimeout(() => pulse.play(), 1500);
      
      return () => {
        pulse.kill();
      };
    }
  }, [isFeatured, ref]);

  // Manipuladores de eventos
  const handleImageClick = () => {
    onClick(project);
  };

  const handleButtonClick = (e, url) => {
    e.stopPropagation(); // Evitar que o evento de clique suba para o card
    
    // Adicionar animação de clique
    const button = e.currentTarget;
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      onComplete: () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: "back.out(2)",
        });
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });
  };

  return (
    <div
      className={`project-card ${imageLoaded ? "loaded" : "loading"} ${isFeatured ? "featured" : ""}`}
      onClick={handleImageClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={ref}
    >
      {isFeatured && <div className="featured-badge">Destaque</div>}
      
      <div className="card-image-container">
        {!imageLoaded ? (
          <div className="image-skeleton"></div>
        ) : (
          <>
            <img
              src={project.imageUrl}
              alt={project.title}
              className="card-image"
            />
            <div className="image-gradient-overlay"></div>
          </>
        )}
        <div className={`card-overlay ${isHovered ? "hovered" : ""}`}>
          <div className="overlay-content">
            <h4>{project.title}</h4>
            <div className="project-tags">
              {project.technologies && project.technologies.slice(0, 3).map((tech, index) => (
                <span key={index} className="project-tag">
                  {tech}
                </span>
              ))}
            </div>
            <p className="card-description">{project.description.substring(0, 100)}
              {project.description.length > 100 && "..."}
            </p>
            <div className="card-buttons">
              {project.demoUrl && (
                <button
                  className="view-demo-btn"
                  onClick={(e) => handleButtonClick(e, project.demoUrl)}
                >
                  Demo
                </button>
              )}
              {project.githubUrl && (
                <button
                  className="view-code-btn"
                  onClick={(e) => handleButtonClick(e, project.githubUrl)}
                >
                  Código
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="card-info">
        <h4 className="card-title">{project.title}</h4>
        <p className="card-category">{project.type || project.category}</p>
      </div>
    </div>
  );
});

export default ProjectCard;
