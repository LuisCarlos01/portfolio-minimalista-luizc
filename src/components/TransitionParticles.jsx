import React, { useEffect, useRef } from 'react';
import { useSection } from '../contexts/SectionContext';
import { gsap } from 'gsap';

const TransitionParticles = () => {
  const particlesRef = useRef(null);
  const rippleRef = useRef(null);
  const { activeSection, isTransitioning, previousSection } = useSection();
  
  // Número de partículas
  const particleCount = 30;
  const starCount = 10;
  
  // Criar partículas quando o componente montar
  useEffect(() => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;
    
    // Limpar partículas existentes
    particlesContainer.innerHTML = '';
    
    // Criar novas partículas circulares
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particlesContainer.appendChild(particle);
    }
    
    // Criar partículas estrelas
    for (let i = 0; i < starCount; i++) {
      const particleStar = document.createElement('div');
      particleStar.className = 'particle-star';
      particlesContainer.appendChild(particleStar);
    }
    
    // Criar elemento de efeito ripple
    if (!rippleRef.current) {
      const ripple = document.createElement('div');
      ripple.className = 'ripple-transition';
      document.body.appendChild(ripple);
      rippleRef.current = ripple;
    }
    
    // Limpeza ao desmontar
    return () => {
      if (rippleRef.current) {
        document.body.removeChild(rippleRef.current);
        rippleRef.current = null;
      }
    };
  }, []);
  
  // Animar partículas quando ocorrer uma transição
  useEffect(() => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;
    
    const particles = particlesContainer.querySelectorAll('.particle');
    const stars = particlesContainer.querySelectorAll('.particle-star');
    
    // Se estiver em transição, animar as partículas
    if (isTransitioning) {
      gsap.killTweensOf([particles, stars]);
      
      // Definir cores com base na seção alvo
      const colors = getParticleColors(activeSection);
      
      // Mostrar o container de partículas
      gsap.to(particlesContainer, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.in"
      });
      
      // Animar cada partícula circular
      particles.forEach((particle, index) => {
        const color = colors[index % colors.length];
        
        // Aplicar cor
        gsap.set(particle, { 
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
          scale: 0.3,
          opacity: 0,
        });
        
        // Animar movimento
        gsap.fromTo(
          particle,
          { 
            x: gsap.utils.random(-100, window.innerWidth + 100),
            y: gsap.utils.random(-100, window.innerHeight + 100),
            opacity: 0,
            scale: 0.3,
          },
          { 
            x: gsap.utils.random(-100, window.innerWidth + 100),
            y: gsap.utils.random(-100, window.innerHeight + 100),
            opacity: () => gsap.utils.random(0.3, 0.8),
            scale: () => gsap.utils.random(0.5, 1.8),
            duration: () => gsap.utils.random(1.5, 3),
            delay: index * 0.03,
            ease: "power2.inOut",
            onComplete: () => {
              // Fade out ao completar
              gsap.to(particle, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
              });
            }
          }
        );
      });
      
      // Animar partículas estrela
      stars.forEach((star, index) => {
        const color = colors[index % colors.length];
        
        // Configurar cores das estrelas
        gsap.set(star, {
          borderBottomColor: color,
          opacity: 0,
        });
        gsap.set(star.querySelector(':after'), {
          borderTopColor: color,
        });
        
        // Animação das estrelas
        gsap.fromTo(
          star,
          {
            x: gsap.utils.random(0, window.innerWidth),
            y: gsap.utils.random(0, window.innerHeight),
            rotation: 0,
            opacity: 0,
            scale: 0.2,
          },
          {
            rotation: 360,
            opacity: () => gsap.utils.random(0.5, 1),
            scale: () => gsap.utils.random(0.7, 1.2),
            duration: () => gsap.utils.random(3, 5),
            delay: index * 0.15,
            ease: "power1.inOut",
            onComplete: () => {
              gsap.to(star, {
                opacity: 0, 
                y: '-=100',
                duration: 1,
                ease: "power2.in"
              });
            }
          }
        );
      });
      
      // Criar efeito de ripple
      if (rippleRef.current && previousSection) {
        // Determinar posição do ripple com base na navegação
        const positions = determineRipplePosition(previousSection, activeSection);
        rippleRef.current.style.left = positions.x + 'px';
        rippleRef.current.style.top = positions.y + 'px';
        
        // Definir cor baseada na seção de destino
        const primaryColor = getMainSectionColor(activeSection);
        rippleRef.current.style.background = `radial-gradient(circle, ${primaryColor}, transparent)`;
        
        // Animar o ripple
        gsap.fromTo(
          rippleRef.current,
          { opacity: 1, scale: 0 },
          { 
            opacity: 0,
            scale: 3, 
            duration: 1.2,
            ease: "power2.out",
            onStart: () => {
              rippleRef.current.classList.add('active');
            },
            onComplete: () => {
              rippleRef.current.classList.remove('active');
            }
          }
        );
      }
    } else {
      // Se não estiver em transição, fazer fade out das partículas
      gsap.to(particlesContainer, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      });
      
      gsap.to([particles, stars], {
        opacity: 0,
        duration: 0.5,
        stagger: 0.02,
        ease: "power2.in"
      });
    }
  }, [isTransitioning, activeSection, previousSection]);
  
  // Determinar a posição do efeito ripple
  const determineRipplePosition = (prevSection, currentSection) => {
    const sectionOrder = ['home', 'about', 'skills', 'portfolio', 'todo', 'resume', 'contact'];
    const prevIndex = sectionOrder.indexOf(prevSection);
    const currentIndex = sectionOrder.indexOf(currentSection);
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let x, y;
    
    // Navegando para frente ou para trás na ordem das seções
    if (prevIndex < currentIndex) {
      // Navegando para frente - inicia o ripple da direita
      x = windowWidth - 50;
      y = windowHeight / 2;
    } else if (prevIndex > currentIndex) {
      // Navegando para trás - inicia o ripple da esquerda
      x = 50;
      y = windowHeight / 2;
    } else {
      // Caso especial ou fallback
      x = windowWidth / 2;
      y = windowHeight / 2;
    }
    
    // Ajustes específicos para seções especiais
    if (currentSection === 'home') {
      // Transição para home - centro
      x = windowWidth / 2;
      y = windowHeight / 2;
    } else if (currentSection === 'contact') {
      // Transição para contato - de baixo
      x = windowWidth / 2;
      y = windowHeight - 50;
    }
    
    return { x, y };
  };
  
  // Obter cores com base na seção ativa
  const getParticleColors = (section) => {
    const colorSets = {
      home: ['rgba(155, 89, 182, 0.8)', 'rgba(142, 68, 173, 0.8)', 'rgba(52, 152, 219, 0.8)', 'rgba(41, 128, 185, 0.8)'],
      about: ['rgba(155, 89, 182, 0.8)', 'rgba(142, 68, 173, 0.8)', 'rgba(109, 64, 150, 0.8)', 'rgba(74, 40, 104, 0.8)'],
      skills: ['rgba(46, 204, 113, 0.8)', 'rgba(39, 174, 96, 0.8)', 'rgba(155, 89, 182, 0.8)', 'rgba(142, 68, 173, 0.8)'],
      portfolio: ['rgba(52, 152, 219, 0.8)', 'rgba(41, 128, 185, 0.8)', 'rgba(155, 89, 182, 0.8)', 'rgba(142, 68, 173, 0.8)'],
      todo: ['rgba(155, 89, 182, 0.8)', 'rgba(142, 68, 173, 0.8)', 'rgba(243, 156, 18, 0.8)', 'rgba(230, 126, 34, 0.8)'],
      contact: ['rgba(231, 76, 60, 0.8)', 'rgba(192, 57, 43, 0.8)', 'rgba(155, 89, 182, 0.8)', 'rgba(142, 68, 173, 0.8)'],
      resume: ['rgba(26, 188, 156, 0.8)', 'rgba(22, 160, 133, 0.8)', 'rgba(155, 89, 182, 0.8)', 'rgba(142, 68, 173, 0.8)'],
      default: ['rgba(155, 89, 182, 0.8)', 'rgba(142, 68, 173, 0.8)', 'rgba(52, 152, 219, 0.8)', 'rgba(41, 128, 185, 0.8)']
    };
    
    return colorSets[section] || colorSets.default;
  };
  
  // Obter cor principal da seção para o efeito ripple
  const getMainSectionColor = (section) => {
    const colors = {
      home: 'rgba(155, 89, 182, 0.4)',
      about: 'rgba(155, 89, 182, 0.4)',
      skills: 'rgba(46, 204, 113, 0.4)',
      portfolio: 'rgba(52, 152, 219, 0.4)',
      todo: 'rgba(243, 156, 18, 0.4)',
      contact: 'rgba(231, 76, 60, 0.4)',
      resume: 'rgba(26, 188, 156, 0.4)',
      default: 'rgba(155, 89, 182, 0.4)'
    };
    
    return colors[section] || colors.default;
  };
  
  return (
    <div className="transition-particles" ref={particlesRef}></div>
  );
};

export default TransitionParticles; 