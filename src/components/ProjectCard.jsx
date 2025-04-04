import React, { useState } from "react";

const ProjectCard = ({ project, onClick }) => {
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
  React.useEffect(() => {
    preloadImage();
  }, []);

  // Manipuladores de eventos
  const handleImageClick = () => {
    onClick(project);
  };

  const handleButtonClick = (e, url) => {
    e.stopPropagation(); // Evitar que o evento de clique suba para o card
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`project-card ${imageLoaded ? "loaded" : "loading"}`}
      onClick={handleImageClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image-container">
        {!imageLoaded ? (
          <div className="image-skeleton"></div>
        ) : (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="card-image"
          />
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
            <p className="card-description">{project.description.substring(0, 100)}...</p>
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
    </div>
  );
};

export default ProjectCard;
