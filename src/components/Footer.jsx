import React, { useEffect, useRef } from "react";
import { useSection } from "../contexts/SectionContext";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { showSection } = useSection();
  const footerRef = useRef(null);
  const yearRef = useRef(new Date().getFullYear());

  const goToHome = () => {
    showSection("home");
    window.history.pushState(null, null, "#home");
  };

  useEffect(() => {
    if (!footerRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none none",
      },
    });

    const elements = footerRef.current.querySelectorAll(
      ".footer-logo, .footer-social a"
    );

    timeline.fromTo(
      elements,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "power2.out" }
    );
  }, []);

  return (
    <footer ref={footerRef}>
      <div className="footer-container">
        <div className="footer-logo" onClick={goToHome}>
          <span className="footer-copyright">
            &copy; <span className="year-number">{yearRef.current}</span> Luís
            Carlos
          </span>
        </div>

        <div className="footer-social">
          <a
            href="https://www.linkedin.com/in/luis-carlos-vitoriano-neto-56a58321b/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="social-icon"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/LuisCarlos01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="social-icon"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:luizcarlosvitorianoneto@gmail.com"
            aria-label="Email"
            className="social-icon"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
