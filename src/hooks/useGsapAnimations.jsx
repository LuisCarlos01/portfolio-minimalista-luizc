import { useCallback } from "react";
import { gsap } from "gsap";

const useGsapAnimations = () => {
  const animatePreloader = useCallback(() => {
    // Verifica se o preloader existe no DOM
    const preloaderEl = document.querySelector(".preloader h1");
    const preloaderDots = document.querySelector(".preloader-dots");
    const preloaderContent = document.querySelector(".preloader-content");
    if (!preloaderEl) return;

    // Configurar timeline mestre
    const masterTl = gsap.timeline();

    // Configurar timeline de entrada do preloader
    const enterTl = gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
    });

    // Preparar o conteúdo principal para a transição suave
    const content = document.getElementById("content");
    if (content) {
      // Deixa o conteúdo pronto, mas invisível, para a transição posterior
      content.style.display = "block";
      content.style.opacity = "0";
      content.style.transform = "translateY(10px)";
      content.style.filter = "blur(5px)";

      // Desfocar o conteúdo inicialmente
      gsap.set(content, {
        opacity: 0,
        y: 10,
        filter: "blur(5px)",
      });
    }

    // Animação de entrada do preloader - mais rápida e suave
    enterTl
      .from(preloaderContent, {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
      })
      .from(
        preloaderEl,
        {
          opacity: 0,
          y: -15,
          duration: 0.5,
        },
        "-=0.3"
      )
      .from(
        preloaderDots,
        {
          opacity: 0,
          y: 10,
          duration: 0.4,
        },
        "-=0.3"
      );

    masterTl.add(enterTl);

    // Array de saudações mais conciso
    const greetings = ["•Olá", "•Hi", "•Ciao", "•Hola", "•Hello"];

    let currentGreetingIndex = 0;
    const greetingElement = document.querySelector(".preloader h1");
    if (!greetingElement) return;

    // Alternar saudações mais rapidamente
    const interval = setInterval(() => {
      currentGreetingIndex++;
      if (currentGreetingIndex < greetings.length) {
        // Efeito de fade para a troca de saudações com 3D
        gsap.to(greetingElement, {
          opacity: 0.5,
          y: -8,
          rotateX: "8deg",
          duration: 0.25,
          ease: "power1.out",
          onComplete: () => {
            greetingElement.textContent = greetings[currentGreetingIndex];
            gsap.to(greetingElement, {
              opacity: 1,
              y: 0,
              rotateX: "0deg",
              duration: 0.25,
              ease: "power1.out",
            });
          },
        });
      } else {
        clearInterval(interval);

        const preloader = document.getElementById("preloader");
        const footer = document.querySelector("footer");

        if (!preloader) return;

        // Tempo total reduzido - carrega o conteúdo mais rápido
        document.body.classList.add("transitioning");

        // Animação de saída do preloader mais rápida e fluida
        const exitTl = gsap.timeline({
          defaults: {
            ease: "power2.out",
          },
        });

        // Primeiro anima o conteúdo interno do preloader
        if (preloaderContent) {
          exitTl.to(preloaderContent, {
            opacity: 0,
            y: -15,
            scale: 0.95,
            duration: 0.4,
            ease: "power1.in",
          });
        }

        // Depois anima o fundo do preloader - transição mais rápida
        exitTl.to(preloader, {
          opacity: 0,
          duration: 0.6,
          onStart: () => {
            // Começa a mostrar o conteúdo mais cedo
            if (content) {
              gsap.to(content, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                  content.style.transform = "";
                  content.style.filter = "";
                },
              });
            }
          },
          onComplete: () => {
            if (preloader) preloader.style.display = "none";

            // Mostrar o footer com um efeito de revelar
            if (footer) {
              footer.style.display = "block";

              // Anima os elementos do footer
              const footerElements = {
                logo: footer.querySelector(".footer-logo"),
                links: footer.querySelectorAll(".footer-link"),
                social: footer.querySelectorAll(".social-icon"),
              };

              const footerTl = gsap.timeline({
                onComplete: () => {
                  setTimeout(() => {
                    document.body.classList.remove("transitioning");
                  }, 200);
                },
              });

              footerTl.fromTo(
                footer,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: "power2.out" }
              );

              if (footerElements.logo) {
                footerTl.fromTo(
                  footerElements.logo,
                  { opacity: 0, y: 10 },
                  { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                  "-=0.2"
                );
              }

              if (footerElements.links.length) {
                footerTl.fromTo(
                  footerElements.links,
                  { opacity: 0, y: 8 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    stagger: 0.03,
                    ease: "power2.out",
                  },
                  "-=0.2"
                );
              }

              if (footerElements.social.length) {
                footerTl.fromTo(
                  footerElements.social,
                  { opacity: 0, y: 8, scale: 0.9 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    stagger: 0.03,
                    ease: "back.out(1.2)",
                  },
                  "-=0.2"
                );
              }
            } else {
              setTimeout(() => {
                document.body.classList.remove("transitioning");
              }, 300);
            }
          },
        });

        masterTl.add(exitTl);
      }
    }, 300); // Intervalo reduzido para transição mais rápida

    // Cleanup function
    return () => {
      clearInterval(interval);
      masterTl.kill();
    };
  }, []);

  const animateHeroSection = useCallback(() => {
    const heroPic = document.querySelector(".hero-pic");
    const heroTexts = document.querySelectorAll(
      ".hero-text h5, .hero-text h1, .hero-text p"
    );
    const buttons = document.querySelectorAll(".btn-group a, .social a");

    if (!heroPic || heroTexts.length === 0) return;

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.8,
      },
    });

    // Animar a foto com um efeito mais suave
    tl.from(heroPic, {
      opacity: 0,
      x: -50,
      scale: 0.95,
      filter: "blur(5px)",
      duration: 1.2,
    });

    // Animar textos com efeito cascata refinado
    if (heroTexts.length > 0) {
      tl.from(
        heroTexts,
        {
          opacity: 0,
          y: 30,
          filter: "blur(3px)",
          stagger: 0.15,
          duration: 0.8,
        },
        "-=0.7"
      );
    }

    // Animar botões com efeito de escala
    if (buttons.length > 0) {
      tl.from(
        buttons,
        {
          opacity: 0,
          y: 20,
          scale: 0.9,
          stagger: 0.08,
          duration: 0.6,
          ease: "back.out(1.5)",
        },
        "-=0.5"
      );
    }

    return tl;
  }, []);

  return {
    animatePreloader,
    animateHeroSection,
  };
};

export default useGsapAnimations;
