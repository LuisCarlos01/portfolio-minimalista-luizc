import React, { useRef, useEffect } from "react";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import {
  FaClock,
  FaCheckCircle,
  FaQuestionCircle,
  FaHeadset,
} from "react-icons/fa";
import gsap from "gsap";

// Avatar placeholder SVG para depoimentos
const AVATAR_PLACEHOLDER = "/images/testimonial-avatar.svg";

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const faqRef = useRef(null);
  const benefitsRef = useRef(null);
  const testimonialRef = useRef(null);
  const ctaCardRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current && headingRef.current) {
      const timeline = gsap.timeline({ delay: 0.2 });

      // Animar o título da seção
      timeline.fromTo(
        headingRef.current.querySelectorAll(".animate-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Animar os benefícios
      if (benefitsRef.current) {
        timeline.fromTo(
          benefitsRef.current.querySelectorAll(".benefit-item"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      // Animar o FAQ
      if (faqRef.current) {
        timeline.fromTo(
          faqRef.current.querySelectorAll(".faq-item"),
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(1.2)",
          },
          "-=0.3"
        );
      }

      // Animar o testimonial
      if (testimonialRef.current) {
        timeline.fromTo(
          testimonialRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }

      // Animar o CTA card
      if (ctaCardRef.current) {
        timeline.fromTo(
          ctaCardRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }
    }
  }, []);

  const toggleFaq = (e) => {
    const item = e.currentTarget;
    const content = item.querySelector(".faq-content");
    const isOpen = item.classList.contains("open");

    if (isOpen) {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => item.classList.remove("open"),
      });
    } else {
      item.classList.add("open");
      gsap.to(content, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Função para lidar com erro de carregamento de imagem
  const handleImageError = (e) => {
    console.log("Erro ao carregar imagem de avatar");
    e.target.src = AVATAR_PLACEHOLDER;
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="section-heading" ref={headingRef}>
        <h2 className="section-title animate-item">Entre em Contato</h2>
        <div className="section-divider animate-item"></div>
        <p className="section-subtitle animate-item">
          Vamos conversar sobre o seu projeto ou oportunidade de trabalho. Estou
          sempre aberto a novas parcerias e desafios.
        </p>
      </div>

      <div className="contact-benefits" ref={benefitsRef}>
        <div className="benefit-item">
          <div className="benefit-icon">
            <FaClock />
          </div>
          <div className="benefit-content">
            <h4>Resposta Rápida</h4>
            <p>Retorno em até 24 horas para todas as mensagens</p>
          </div>
        </div>
        <div className="benefit-item">
          <div className="benefit-icon">
            <FaCheckCircle />
          </div>
          <div className="benefit-content">
            <h4>Consultoria Inicial Gratuita</h4>
            <p>15 minutos de conversa para entender seu projeto</p>
          </div>
        </div>
        <div className="benefit-item">
          <div className="benefit-icon">
            <FaHeadset />
          </div>
          <div className="benefit-content">
            <h4>Suporte Contínuo</h4>
            <p>Acompanhamento e orientação durante todo o projeto</p>
          </div>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info-column">
          <ContactInfo />

          <div className="faq-container" ref={faqRef}>
            <h3>Perguntas Frequentes</h3>

            <div className="faq-item" onClick={toggleFaq}>
              <div className="faq-header">
                <h4>Qual prazo médio para desenvolvimento de um website?</h4>
                <FaQuestionCircle />
              </div>
              <div className="faq-content">
                <p>
                  O prazo varia conforme a complexidade do projeto. Sites
                  simples podem levar de 1 a 3 semanas, enquanto projetos mais
                  complexos podem levar de 1 a 3 meses. Sempre fornecemos um
                  cronograma detalhado antes de iniciar.
                </p>
              </div>
            </div>

            <div className="faq-item" onClick={toggleFaq}>
              <div className="faq-header">
                <h4>Quais tecnologias você utiliza nos projetos?</h4>
                <FaQuestionCircle />
              </div>
              <div className="faq-content">
                <p>
                  Trabalho com as tecnologias mais modernas do mercado como
                  React, TypeScript, Node.js e diversas outras ferramentas,
                  sempre buscando a melhor solução para cada caso específico.
                </p>
              </div>
            </div>

            <div className="faq-item" onClick={toggleFaq}>
              <div className="faq-header">
                <h4>Como funciona o processo de pagamento?</h4>
                <FaQuestionCircle />
              </div>
              <div className="faq-content">
                <p>
                  Geralmente trabalho com um modelo de 40% de entrada, 30% na
                  entrega do primeiro protótipo funcional e 30% na conclusão do
                  projeto. Formas de pagamento e parcelamentos podem ser
                  discutidos conforme a necessidade.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-column">
          <ContactForm />

          <div className="testimonial" ref={testimonialRef}>
            <div className="testimonial-content">
              <p>
                "Luiz Carlos entregou um projeto excepcional, com código limpo e
                organizado. A comunicação foi sempre clara e objetiva durante
                todo o processo de desenvolvimento."
              </p>
            </div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">
                <img
                  src={AVATAR_PLACEHOLDER}
                  alt="Cliente"
                  onError={handleImageError}
                />
              </div>
              <div className="testimonial-info">
                <h4>Ricardo Oliveira</h4>
                <p>CEO, TechSolutions</p>
              </div>
            </div>
          </div>

          <div className="cta-card" ref={ctaCardRef}>
            <h3>Pronto para transformar sua ideia em realidade?</h3>
            <p>
              Preencha o formulário acima ou entre em contato diretamente pelo
              WhatsApp para conversarmos sobre seu projeto.
            </p>
            <a
              href="https://wa.me/5535997080310"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chame no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
