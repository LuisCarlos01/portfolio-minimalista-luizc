import React, { useEffect } from "react";
import useGsapAnimations from "../hooks/useGsapAnimations";
import { FaSpinner } from "react-icons/fa";

const Preloader = () => {
  const { animatePreloader } = useGsapAnimations();

  useEffect(() => {
    // Reduzir o atraso para iniciar a animação mais rapidamente
    const timer = setTimeout(() => {
      animatePreloader();
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [animatePreloader]);

  return (
    <div className="preloader" id="preloader">
      <div className="preloader-content">
        <h1>•olá</h1>
        <div className="preloader-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
