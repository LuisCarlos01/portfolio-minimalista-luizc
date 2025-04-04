import React, { useEffect, useRef, useState } from 'react';
import { FaCode, FaDatabase, FaMobileAlt, FaDesktop, FaServer, FaCloud } from 'react-icons/fa';
import { useSection } from '../contexts/SectionContext';
import './AboutSection.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const { activeSection } = useSection();
  const [imageError, setImageError] = useState(false);
  
  // Refs para elementos a serem animados
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const skillsRef = useRef(null);
  const skillCardsRef = useRef([]);
  const imageRef = useRef(null);
  const statItemsRef = useRef([]);
  
  // Efeito para animar a entrada da seção quando ela se torna ativa
  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;
    const skills = skillsRef.current;
    const skillCards = skillCardsRef.current;
    const image = imageRef.current;
    const statItems = statItemsRef.current;
    
    if (activeSection === 'about' && section) {
      // Configurar a linha do tempo principal
      const mainTimeline = gsap.timeline({
        defaults: { 
          ease: 'power3.out',
          duration: 0.8
        }
      });
      
      // Resetar a opacidade e posição dos elementos
      gsap.set([header, content, stats, skills, image], { 
        opacity: 0, 
        y: 30
      });
      
      gsap.set(skillCards, { 
        opacity: 0, 
        y: 50, 
        scale: 0.9 
      });
      
      gsap.set(statItems, { 
        opacity: 0, 
        scale: 0.9 
      });
      
      // Animação da seção principal
      mainTimeline
        .to(section, { 
          opacity: 1, 
          duration: 0.6, 
          ease: 'power2.out', 
          className: 'about-section active' 
        })
        // Animar o cabeçalho com destaque no título
        .from('.about-title span', {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          ease: 'back.out(1.7)'
        }, '-=0.4')
        // Fazer a decoração do título aparecer e crescer
        .from('.title-decoration', {
          width: 0,
          opacity: 0,
          duration: 0.6
        }, '-=0.2')
        // Animar a entrada dos decoradores do título
        .from('.title-decoration::before, .title-decoration::after', {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'back.out(2)'
        }, '-=0.3')
        // Animar a entrada do conteúdo e da imagem simultaneamente
        .to([content, image], {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.7
        }, '-=0.3')
        // Adicionar efeito flutuante à imagem
        .to(image, {
          y: -10,
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: 'sine.inOut'
        }, '-=0.5')
        // Animar a entrada das estatísticas
        .to(stats, { 
          opacity: 1, 
          y: 0, 
          duration: 0.6 
        }, '-=0.4')
        // Animar a entrada de cada item de estatística com efeito de escala
        .to(statItems, {
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.5,
          ease: 'back.out(1.5)'
        }, '-=0.3')
        // Animação de contador para os valores estatísticos
        .add(() => {
          statItems.forEach(item => {
            const valueEl = item.querySelector('.stat-value');
            const targetValue = parseInt(valueEl.getAttribute('data-value'));
            
            gsap.from(valueEl, {
              innerText: 0,
              duration: 2,
              snap: { innerText: 1 },
              onUpdate: function() {
                valueEl.innerHTML = Math.floor(this.targets()[0].innerText);
              }
            });
          });
        }, '-=0.5')
        // Animar a entrada do título de habilidades
        .to('.skills-title', { 
          opacity: 1, 
          y: 0, 
          duration: 0.6 
        }, '-=1.8')
        // Animar a entrada dos cards de habilidades com efeito stagger
        .to(skillCards, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: 'back.out(1.4)'
        }, '-=0.4');
      
      // Adicionar ScrollTrigger para efeitos de parallax
      if (section) {
        // Efeito parallax no fundo
        gsap.to(section, {
          backgroundPosition: '50% 100%',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
        
        // Efeito parallax nos cards de habilidades
        skillCards.forEach((card, index) => {
          gsap.to(card, {
            y: (index % 2 === 0) ? 40 : -40,
            scrollTrigger: {
              trigger: skills,
              start: 'top center',
              end: 'bottom top',
              scrub: true
            }
          });
          
          // Adicionar animação de hover nos cards
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              scale: 1.05,
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
              duration: 0.3
            });
            
            // Animar o ícone
            const icon = card.querySelector('.icon-container');
            gsap.to(icon, {
              rotation: 5,
              scale: 1.1,
              duration: 0.4,
              ease: 'back.out(1.7)'
            });
          });
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              duration: 0.3
            });
            
            // Restaurar o ícone
            const icon = card.querySelector('.icon-container');
            gsap.to(icon, {
              rotation: 0,
              scale: 1,
              duration: 0.3
            });
          });
        });
        
        // Adicionar efeitos de brilho nos elementos
        const addGlowEffect = () => {
          const glowTimeline = gsap.timeline({
            repeat: -1,
            repeatDelay: 5
          });
          
          glowTimeline
            .to('.title-decoration', {
              boxShadow: '0 0 10px #9b59b6, 0 0 20px rgba(155, 89, 182, 0.5)',
              duration: 1.5,
              ease: 'sine.inOut'
            })
            .to('.title-decoration', {
              boxShadow: '0 0 0px transparent',
              duration: 1.5,
              ease: 'sine.inOut'
            });
        };
        
        addGlowEffect();
      }
    }
  }, [activeSection]);
  
  // Manipulador para erros de carregamento de imagem
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Adicionar itens de habilidades aos refs
  const addToSkillCardsRef = (el) => {
    if (el && !skillCardsRef.current.includes(el)) {
      skillCardsRef.current.push(el);
    }
  };
  
  // Adicionar itens de estatísticas aos refs
  const addToStatItemsRef = (el) => {
    if (el && !statItemsRef.current.includes(el)) {
      statItemsRef.current.push(el);
    }
  };

  return (
    <div className={`about-section ${activeSection === 'about' ? 'active' : ''}`} ref={sectionRef}>
      <div className="about-container">
        <div className="about-header" ref={headerRef}>
          <h2 className="about-title">Sobre <span>Mim</span></h2>
          <div className="title-decoration"></div>
        </div>
        
        <div className="about-content">
          <div className="about-text" ref={contentRef}>
            <p className="about-intro">
              Olá! Sou um <strong>desenvolvedor web</strong> apaixonado por criar 
              experiências digitais modernas, intuitivas e de alto desempenho.
            </p>
            <p>
              Com mais de 5 anos de experiência em desenvolvimento front-end e back-end, 
              trabalho para entregar soluções que combinam código limpo e design 
              elegante. Minha abordagem foca em performance, acessibilidade e experiências de usuário agradáveis.
            </p>
            <p>
              Estou sempre em busca de novos desafios e constantemente aprendendo novas 
              tecnologias e metodologias para melhorar minhas habilidades e entregar os 
              melhores resultados possíveis.
            </p>
            
            <div className="stats-container" ref={statsRef}>
              <div className="stat-item" ref={addToStatItemsRef}>
                <div className="stat-value" data-value="84">0</div>
                <div className="stat-label">Projetos Concluídos</div>
              </div>
              <div className="stat-item" ref={addToStatItemsRef}>
                <div className="stat-value" data-value="56">0</div>
                <div className="stat-label">Clientes Satisfeitos</div>
              </div>
              <div className="stat-item" ref={addToStatItemsRef}>
                <div className="stat-value" data-value="5">0</div>
                <div className="stat-label">Anos de Experiência</div>
              </div>
              <div className="stat-item" ref={addToStatItemsRef}>
                <div className="stat-value" data-value="12">0</div>
                <div className="stat-label">Prêmios Recebidos</div>
              </div>
            </div>
          </div>
          
          <div className="about-image" ref={imageRef}>
            {!imageError ? (
              <img 
                src="/images/profile.jpg" 
                alt="Foto de perfil"
                onError={handleImageError}
              />
            ) : (
              <div className="about-image-fallback">
                <div className="fallback-icon">LC</div>
                <div className="fallback-text">Luís Carlos</div>
              </div>
            )}
          </div>
        </div>
        
        <div className="skills-container" ref={skillsRef}>
          <h3 className="skills-title">Minhas Habilidades</h3>
          
          <div className="skill-cards">
            <div className="skill-card" ref={addToSkillCardsRef}>
              <div className="icon-container">
                <FaCode />
              </div>
              <h4>Desenvolvimento Front-end</h4>
              <p>
                Criação de interfaces modernas e responsivas com HTML5, CSS3, 
                JavaScript, React, Vue e outras tecnologias front-end.
              </p>
            </div>
            
            <div className="skill-card" ref={addToSkillCardsRef}>
              <div className="icon-container">
                <FaServer />
              </div>
              <h4>Desenvolvimento Back-end</h4>
              <p>
                Desenvolvimento de APIs e serviços robustos com Node.js, Express, 
                PHP, Python e integração com bancos de dados.
              </p>
            </div>
            
            <div className="skill-card" ref={addToSkillCardsRef}>
              <div className="icon-container">
                <FaDatabase />
              </div>
              <h4>Banco de Dados</h4>
              <p>
                Modelagem e otimização de bancos de dados relacionais (MySQL, PostgreSQL) 
                e não-relacionais (MongoDB, Firebase).
              </p>
            </div>
            
            <div className="skill-card" ref={addToSkillCardsRef}>
              <div className="icon-container">
                <FaMobileAlt />
              </div>
              <h4>Desenvolvimento Mobile</h4>
              <p>
                Criação de aplicativos móveis com React Native, proporcionando 
                experiências nativas para iOS e Android.
              </p>
            </div>
            
            <div className="skill-card" ref={addToSkillCardsRef}>
              <div className="icon-container">
                <FaDesktop />
              </div>
              <h4>UI/UX Design</h4>
              <p>
                Design de interfaces intuitivas e experiências de usuário agradáveis, 
                com foco em usabilidade e acessibilidade.
              </p>
            </div>
            
            <div className="skill-card" ref={addToSkillCardsRef}>
              <div className="icon-container">
                <FaCloud />
              </div>
              <h4>Cloud & DevOps</h4>
              <p>
                Implantação e manutenção de aplicações em ambientes de nuvem 
                (AWS, Google Cloud, Azure) e CI/CD.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

 