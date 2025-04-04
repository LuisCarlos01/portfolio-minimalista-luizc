import React, { useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import gsap from "gsap";

const ContactInfo = () => {
  const infoRef = useRef(null);
  const itemsRef = useRef([]);
  const socialsRef = useRef([]);

  useEffect(() => {
    if (infoRef.current) {
      // Animação de entrada do container
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      // Animação de entrada dos itens de contato
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.3,
        }
      );

      // Animação de entrada dos ícones sociais
      if (socialsRef.current.length > 0) {
        gsap.fromTo(
          socialsRef.current,
          { opacity: 0, y: 20, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: 0.5,
          }
        );
      }
    }
  }, []);

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const addToSocialRefs = (el) => {
    if (el && !socialsRef.current.includes(el)) {
      socialsRef.current.push(el);
    }
  };

  return (
    <div className="contact-info" ref={infoRef}>
      <h3>Meus Contatos</h3>

      <div className="contact-info-grid">
        <div className="contact-info-item" ref={addToRefs}>
          <div className="contact-icon">
            <FaEnvelope />
          </div>
          <div className="contact-text">
            <h4>Email</h4>
            <a
              href="mailto:luizcarlosvitorianoneto@gmail.com"
              className="contact-link"
            >
              luizcarlosvitorianoneto@gmail.com
            </a>
          </div>
        </div>

        <div className="contact-info-item" ref={addToRefs}>
          <div className="contact-icon">
            <FaPhoneAlt />
          </div>
          <div className="contact-text">
            <h4>Telefone</h4>
            <a href="tel:+5535997080310" className="contact-link">
              +55 (35) 99708-0310
            </a>
          </div>
        </div>

        <div className="contact-info-item" ref={addToRefs}>
          <div className="contact-icon">
            <FaLinkedin />
          </div>
          <div className="contact-text">
            <h4>LinkedIn</h4>
            <a
              href="https://www.linkedin.com/in/luiz-carlos-vitoriano-neto-56a58321b/?trk=opento_sprofile_topcard"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              linkedin.com/in/luiz-carlos
            </a>
          </div>
        </div>

        <div className="contact-info-item" ref={addToRefs}>
          <div className="contact-icon">
            <FaGithub />
          </div>
          <div className="contact-text">
            <h4>GitHub</h4>
            <a
              href="https://github.com/LuisCarlos01"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              github.com/LuisCarlos01
            </a>
          </div>
        </div>
      </div>

      <div className="social-connect">
        <h4>Conecte-se Comigo</h4>
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/luiz-carlos-vitoriano-neto-56a58321b/?trk=opento_sprofile_topcard"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="LinkedIn"
            ref={addToSocialRefs}
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/LuisCarlos01"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="GitHub"
            ref={addToSocialRefs}
          >
            <FaGithub />
          </a>
          <a
            href="mailto:luizcarlosvitorianoneto@gmail.com"
            className="social-icon"
            aria-label="Email"
            ref={addToSocialRefs}
          >
            <FaEnvelope />
          </a>
          <a
            href="tel:+5535997080310"
            className="social-icon"
            aria-label="Telefone"
            ref={addToSocialRefs}
          >
            <FaPhoneAlt />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
