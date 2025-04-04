import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/components/_pageTransition.scss";

const PageTransition = () => {
  const transitionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const transition = transitionRef.current;

    // Animação inicial de entrada da página
    tl.fromTo(
      transition,
      { scaleY: 1 },
      {
        scaleY: 0,
        duration: 1.2,
        ease: "power4.inOut",
        transformOrigin: "top",
      }
    );

    // Animação quando a página é fechada - usado antes de navegar para outra página
    const handlePageExit = () => {
      const exitTl = gsap.timeline();
      exitTl.fromTo(
        transition,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          ease: "power3.inOut",
          transformOrigin: "bottom",
        }
      );
    };

    // Evento para simular a saída da página ao clicar em links externos
    const handleExternalLinks = (e) => {
      const target = e.target.closest("a");
      if (
        target &&
        target.getAttribute("href") &&
        target.getAttribute("href").startsWith("http") &&
        !target.getAttribute("href").includes(window.location.hostname)
      ) {
        e.preventDefault();
        handlePageExit();
        setTimeout(() => {
          window.location.href = target.getAttribute("href");
        }, 800);
      }
    };

    document.addEventListener("click", handleExternalLinks);
    window.addEventListener("beforeunload", handlePageExit);

    return () => {
      document.removeEventListener("click", handleExternalLinks);
      window.removeEventListener("beforeunload", handlePageExit);
    };
  }, []);

  return (
    <div className="page-transition" ref={transitionRef}>
      <div className="transition-overlay"></div>
    </div>
  );
};

export default PageTransition; 