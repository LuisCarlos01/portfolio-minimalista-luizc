import React, { createContext, useState, useContext, useEffect } from "react";
import { gsap } from "gsap";

// Criando o contexto
const SectionContext = createContext();

// Hook personalizado para usar o contexto
export const useSection = () => useContext(SectionContext);

// Provedor do contexto
export const SectionProvider = ({ children }) => {
  // Estado para controlar qual seção está ativa
  const [activeSection, setActiveSection] = useState("home");
  // Estado para controlar animações de transição
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousSection, setPreviousSection] = useState(null);

  // Referência para o overlay de transição
  const overlayRef = React.useRef(null);

  // Criar overlay de transição quando o componente montar
  useEffect(() => {
    // Criar overlay para transições
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(155, 89, 182, 0.2);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      display: none;
    `;
    document.body.appendChild(overlay);
    overlayRef.current = overlay;

    // Limpar ao desmontar
    return () => {
      document.body.removeChild(overlay);
    };
  }, []);

  // Função para mostrar uma seção específica
  const showSection = (sectionId) => {
    console.log(`SectionContext: Mostrando seção ${sectionId}`);
    
    // Se já estiver em transição, retornar
    if (isTransitioning) return;
    
    // Se tentar navegar para a mesma seção, retornar
    if (sectionId === activeSection) return;
    
    // Iniciar transição
    setIsTransitioning(true);
    setPreviousSection(activeSection);
    
    // Exibir overlay de transição
    const overlay = overlayRef.current;
    if (overlay) {
      overlay.style.display = 'block';
      
      // Adicionar classe específica de transição baseada na seção
      overlay.className = `page-transition-overlay to-${sectionId} active`;
      
      // Aplicar classe transitioning aos containers de seção
      document.querySelectorAll(".section-container").forEach((section) => {
        section.classList.add('section-transition-container');
        section.classList.add('transitioning');
      });
      
      // Animação do overlay com timeline
      gsap.timeline()
        .to(overlay, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            // Atualizar estado da seção ativa
            setActiveSection(sectionId);
            
            // Ocultar todas as seções, exceto a que vamos mostrar
            document.querySelectorAll(".section-container").forEach((section) => {
              if (section.id !== sectionId) {
                console.log(`SectionContext: Ocultando seção ${section.id}`);
                gsap.set(section, {
                  opacity: 0,
                  display: "none",
                  zIndex: "0"
                });
                // Remover classe de transição
                section.classList.remove('transitioning');
              }
            });
            
            // Mostrar a seção alvo
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
              console.log(`SectionContext: Encontrada seção alvo ${sectionId}`);
              
              // Garantir que a seção esteja visível antes de animar
              targetSection.style.display = "block";
              targetSection.style.zIndex = "1";
              
              // Preparar para animação de entrada
              gsap.set(targetSection, { 
                opacity: 0,
                // Adicionar força de hardware acceleration para melhorar performance
                transform: 'translateZ(0)'
              });
              
              // Rolar para a seção se não for a home
              if (sectionId !== "home") {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
              }
              
              // Remover o overlay após um breve atraso
              gsap.to(overlay, {
                opacity: 0,
                duration: 0.4,
                delay: 0.2,
                ease: "power2.inOut",
                onComplete: () => {
                  overlay.style.display = 'none';
                  overlay.className = 'page-transition-overlay';
                  
                  // Animar a entrada da seção
                  animateSectionEntrance(sectionId, targetSection);
                  
                  // Finalizar a transição após um curto delay para dar tempo às animações
                  setTimeout(() => {
                    targetSection.classList.remove('transitioning');
                    setIsTransitioning(false);
                  }, 500);
                }
              });
            } else {
              console.error(`SectionContext: Seção com ID ${sectionId} não encontrada!`);
              setIsTransitioning(false);
            }
          }
        });
    } else {
      // Fallback se o overlay não estiver disponível
      setActiveSection(sectionId);
      
      // Ocultar todas as seções, exceto a que vamos mostrar
      document.querySelectorAll(".section-container").forEach((section) => {
        if (section.id !== sectionId) {
          console.log(`SectionContext: Ocultando seção ${section.id}`);
          gsap.to(section, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: () => {
              section.style.display = "none";
              section.style.zIndex = "0";
            },
          });
        }
      });
      
      // Mostrar a seção alvo (fallback)
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.style.display = "block";
        targetSection.style.zIndex = "1";
        
        // Fallback para animação simples
        animateSectionEntrance(sectionId, targetSection);
        
        // Finalizar a transição
        setTimeout(() => {
          setIsTransitioning(false);
        }, 800);
      }
    }
  };
  
  // Função para animar a entrada de uma seção com efeitos personalizados por seção
  const animateSectionEntrance = (sectionId, targetSection) => {
    // Definir animação base de acordo com a transição
    let entranceAnimation;
    
    // Personalizar animação com base na seção anterior e atual
    const transitionType = getTransitionType(previousSection, sectionId);
    
    // Adicionar classe para revelar conteúdo com efeito de clipping
    if (targetSection.querySelector('h2')) {
      targetSection.querySelector('h2').classList.add('reveal-clip');
    }
    
    // Procurar elementos que podem receber efeito de brilho
    const glowElements = targetSection.querySelectorAll('.btn, .skill-card');
    if (glowElements.length > 0) {
      glowElements.forEach(el => el.classList.add('glow-pulse'));
      
      // Remover efeito após um tempo
      setTimeout(() => {
        glowElements.forEach(el => el.classList.remove('glow-pulse'));
      }, 3000);
    }
    
    // Escolher a animação de acordo com o tipo de transição
    switch (transitionType) {
      case 'standard':
        // Animação padrão
        entranceAnimation = gsap.fromTo(
          targetSection,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            onComplete: () => handleSectionAnimationComplete(sectionId, targetSection)
          }
        );
        break;
        
      case 'slide-left':
        // Deslizar da esquerda com efeito de perspectiva
        entranceAnimation = gsap.fromTo(
          targetSection,
          { 
            opacity: 0, 
            x: -50,
            transformOrigin: 'left center',
            rotationY: 5
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => handleSectionAnimationComplete(sectionId, targetSection)
          }
        );
        break;
        
      case 'slide-right':
        // Deslizar da direita com efeito de perspectiva
        entranceAnimation = gsap.fromTo(
          targetSection,
          { 
            opacity: 0, 
            x: 50,
            transformOrigin: 'right center',
            rotationY: -5
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => handleSectionAnimationComplete(sectionId, targetSection)
          }
        );
        break;
        
      case 'fade-scale':
        // Fade com escala e leve rotação
        entranceAnimation = gsap.fromTo(
          targetSection,
          { 
            opacity: 0, 
            scale: 0.95,
            rotation: 0.5
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => handleSectionAnimationComplete(sectionId, targetSection)
          }
        );
        break;
        
      case 'slide-up':
        // Deslizar de baixo com efeito de borrão
        entranceAnimation = gsap.fromTo(
          targetSection,
          { 
            opacity: 0, 
            y: 30,
            filter: 'blur(10px)'
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: "power3.out",
            onComplete: () => handleSectionAnimationComplete(sectionId, targetSection)
          }
        );
        break;
        
      default:
        // Animação padrão
        entranceAnimation = gsap.fromTo(
          targetSection,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            onComplete: () => handleSectionAnimationComplete(sectionId, targetSection)
          }
        );
    }
    
    return entranceAnimation;
  };
  
  // Determina o tipo de transição com base nas seções anterior e atual
  const getTransitionType = (prevSection, currentSection) => {
    // Determinar a ordem das seções para saber a direção da transição
    const sectionOrder = ['home', 'about', 'skills', 'portfolio', 'todo', 'resume', 'contact'];
    
    if (!prevSection || !currentSection) return 'standard';
    
    // Se estiver indo para a home, usar fade-scale
    if (currentSection === 'home') return 'fade-scale';
    
    // Se estiver indo do portfolio para qualquer lugar, usar slide-left
    if (prevSection === 'portfolio') return 'slide-left';
    
    // Verificar a posição das seções na ordem
    const prevIndex = sectionOrder.indexOf(prevSection);
    const currentIndex = sectionOrder.indexOf(currentSection);
    
    if (prevIndex < currentIndex) {
      // Navegando para frente na ordem
      return 'slide-left';
    } else if (prevIndex > currentIndex) {
      // Navegando para trás na ordem
      return 'slide-right';
    } else {
      // Caso especial para a seção de contato
      if (currentSection === 'contact') return 'slide-up';
      
      // Fallback
      return 'standard';
    }
  };
  
  // Manipular o callback de conclusão da animação da seção
  const handleSectionAnimationComplete = (sectionId, targetSection) => {
    console.log(`SectionContext: Animação da seção ${sectionId} concluída`);
    
    // Verificar qual seção ativar animações específicas
    switch(sectionId) {
      case "skills":
        console.log("SectionContext: Animando seção de skills");
        animateSkillsSection();
        break;
      case "portfolio":
        console.log("SectionContext: Animando seção de portfolio");
        animatePortfolioSection();
        break;
      case "contact":
        animateContactSection();
        break;
      case "resume":
        animateResumeSection();
        break;
      case "todo":
        animateTodoSection();
        break;
      case "about":
        animateAboutSection();
        break;
      default:
        break;
    }
  };

  // Função para animar a seção "Sobre mim"
  const animateAboutSection = () => {
    console.log("Animando seção about");
    // Não precisamos implementar a lógica aqui, pois já temos no componente AboutSection
  };

  // Função para animar a seção de skills
  const animateSkillsSection = () => {
    const section = document.getElementById("skills");
    if (section) {
      // Animar título
      gsap.fromTo(
        section.querySelector("h2"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      );

      // Animar cards de habilidades com efeito stagger
      gsap.fromTo(
        section.querySelectorAll(".skill-card"),
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.2)",
          onComplete: () => {
            // Animar as barras de progresso após os cards aparecerem
            const progressBars = section.querySelectorAll(".progress-bar");
            progressBars.forEach((bar, index) => {
              const skillCards = section.querySelectorAll(".skill-card");
              if (index < skillCards.length) {
                const skillLevel = skillCards[index].getAttribute("data-level");
                setTimeout(() => {
                  bar.style.width = `${skillLevel}%`;
                }, 200 + index * 100); // Escalonar a animação das barras
              }
            });
          },
        }
      );

      // Forçar a visibilidade da seção
      section.style.display = "block";
      section.style.opacity = "1";

      // Verificar se o conteúdo está visível
      console.log(
        "Dimensões da seção skills:",
        section.getBoundingClientRect()
      );
      console.log(
        "Número de skill cards:",
        section.querySelectorAll(".skill-card").length
      );
    } else {
      console.error("Seção de skills não encontrada!");
    }
  };

  // Função para animar a seção de portfolio
  const animatePortfolioSection = () => {
    console.log("Animando seção de portfólio");
    const section = document.getElementById("portfolio");
    
    if (section) {
      // Forçar display block e opacity 1 no contêiner da seção
      section.style.display = "block";
      section.style.opacity = "1";
      section.style.zIndex = "1";
      
      // Verificar se o componente PortfolioSection está presente
      const portfolioSection = section.querySelector(".portfolio-section");
      if (portfolioSection) {
        console.log("Encontrada a seção de portfólio para animar");
        
        // Assegurar que a seção de portfólio esteja visível
        portfolioSection.style.display = "block";
        portfolioSection.style.opacity = "1";
        
        // Animar o título e descrição
        const titleElements = portfolioSection.querySelectorAll("h2, .section-description");
        if (titleElements.length > 0) {
          gsap.fromTo(
            titleElements,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.2 }
          );
        }
        
        // Animar filtros de categoria
        const categoryFilters = portfolioSection.querySelector(".category-filters");
        if (categoryFilters) {
          gsap.fromTo(
            categoryFilters,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.3 }
          );
        }

        // Animar os cards
        const projectCards = portfolioSection.querySelectorAll(".project-card");
        if (projectCards.length > 0) {
          gsap.fromTo(
            projectCards,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.15,
              ease: "power2.out",
              delay: 0.4,
            }
          );
        }
        
        // Animar botão de carregar mais, se existir
        const loadMoreBtn = portfolioSection.querySelector(".load-more-btn");
        if (loadMoreBtn) {
          gsap.fromTo(
            loadMoreBtn,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.7 }
          );
        }
      } else {
        console.error("Não foi possível encontrar o componente PortfolioSection dentro da seção");
      }
    } else {
      console.error("Seção de portfólio não encontrada");
    }
  };

  // Função para animar a seção de contato
  const animateContactSection = () => {
    const section = document.getElementById("contact");
    if (section) {
      gsap.fromTo(
        section.querySelectorAll(".animate-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.7,
          ease: "power2.out",
        }
      );
    }
  };

  // Função para animar a seção de currículo
  const animateResumeSection = () => {
    console.log("Tentando animar a seção de currículo");

    // Procurar pelo ID correto, testando ambas as possibilidades
    const section =
      document.getElementById("resume") ||
      document.getElementById("resume-section");

    if (section) {
      console.log("Seção de currículo encontrada com ID:", section.id);

      // Animar cabeçalho
      const headerElements = section.querySelectorAll(
        "h2, .section-description"
      );
      if (headerElements.length > 0) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.2 }
        );
      } else {
        console.warn(
          "Elementos de cabeçalho não encontrados na seção de currículo"
        );
      }

      // Animar tabs
      const tabButtons = section.querySelectorAll(".tab-button");
      if (tabButtons.length > 0) {
        gsap.fromTo(
          tabButtons,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: "back.out(1.7)",
            delay: 0.3,
          }
        );
      }

      // Animar itens de currículo
      const resumeItems = section.querySelectorAll(".resume-item");
      if (resumeItems.length > 0) {
        console.log(
          `Encontrados ${resumeItems.length} itens de currículo para animar`
        );
        gsap.fromTo(
          resumeItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.5,
            ease: "power1.out",
            delay: 0.4,
          }
        );
      } else {
        console.warn("Itens de currículo não encontrados para animação");
      }

      // Animar botão de download
      const downloadButton = section.querySelector(".download-button");
      if (downloadButton) {
        gsap.fromTo(
          downloadButton,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.8,
          }
        );

        // Adicionar efeito flutuante ao botão
        gsap.to(downloadButton, {
          y: "-5px",
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "sine.inOut",
          delay: 1.5,
        });
      }

      // Forçar a visibilidade da seção
      section.style.display = "block";
      section.style.opacity = "1";
    } else {
      console.error("Seção de currículo não encontrada! Verifique os IDs.");
    }
  };

  // Função para animar a seção de Todo
  const animateTodoSection = () => {
    console.log("Animando seção de tarefas");
    const section = document.getElementById("todo");
    
    if (section) {
      // Forçar visibilidade da seção
      section.style.display = "block";
      section.style.opacity = "1";
      section.style.zIndex = "1";
      
      // Animar o contêiner principal
      const todoContainer = section.querySelector(".todo-container");
      if (todoContainer) {
        gsap.fromTo(
          todoContainer,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
        
        // Animar título
        const title = todoContainer.querySelector(".todo-title");
        if (title) {
          gsap.fromTo(
            title,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "back.out(1.7)" }
          );
        }
        
        // Animar formulário de adição
        const form = todoContainer.querySelector(".todo-form");
        if (form) {
          gsap.fromTo(
            form,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: "power2.out" }
          );
        }
        
        // Animar filtros
        const filters = todoContainer.querySelector(".todo-filters");
        if (filters) {
          gsap.fromTo(
            filters.querySelectorAll("button"),
            { opacity: 0, scale: 0.8 },
            { 
              opacity: 1, 
              scale: 1, 
              duration: 0.4, 
              stagger: 0.1, 
              delay: 0.4, 
              ease: "back.out(1.2)" 
            }
          );
        }
        
        // Animar status
        const status = todoContainer.querySelector(".todo-status");
        if (status) {
          gsap.fromTo(
            status,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, delay: 0.5 }
          );
        }
        
        // Animar itens da lista
        const items = todoContainer.querySelectorAll(".todo-item");
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.5, 
              stagger: 0.1, 
              delay: 0.6, 
              ease: "power2.out" 
            }
          );
        } else {
          // Animar mensagem "Nenhuma tarefa encontrada"
          const noTasks = todoContainer.querySelector(".no-tasks");
          if (noTasks) {
            gsap.fromTo(
              noTasks,
              { opacity: 0 },
              { opacity: 1, duration: 0.5, delay: 0.6 }
            );
          }
        }
      }
    } else {
      console.error("Seção de tarefas não encontrada");
    }
  };

  // Inicializar: mostrar home por padrão ou seção do hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      // Lista de seções válidas
      const validSections = [
        "home",
        "about",
        "skills",
        "portfolio",
        "todo",
        "contact",
        "resume",
      ];

      if (hash && validSections.includes(hash)) {
        showSection(hash);
      } else {
        showSection("home");
      }
    };

    // Configurar seções com a classe necessária para transições
    document.querySelectorAll(".section-container").forEach((section) => {
      section.classList.add('section-transition-container');
    });

    // Ouvir mudanças de URL
    window.addEventListener("hashchange", handleHashChange);

    // Verificar hash inicial
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Valores para o contexto
  const contextValue = {
    activeSection,
    showSection,
    isTransitioning,
    previousSection
  };

  return (
    <SectionContext.Provider value={contextValue}>
      {children}
    </SectionContext.Provider>
  );
};
