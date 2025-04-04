import React, { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import SkillsSection from "./components/SkillsSection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import FloatingAboutButton from "./components/FloatingAboutButton";
import { SectionProvider } from "./contexts/SectionContext";
import ResumeSection from "./components/ResumeSection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactPage from "./pages/contact";
import Header from "./components/Header";
import HomeSection from "./components/HomeSection";
import ProjectModal from "./components/ProjectModal";
import SkillPreviewModal from "./components/SkillPreviewModal";
import PageTransition from "./components/PageTransition";
import CursorProvider from "./contexts/CursorContext";
import { isMobile } from "./utils/device";
import AboutSection from "./components/AboutSection";
import Todo from "./components/Todo";
import TransitionParticles from "./components/TransitionParticles";

function App() {
  // Efeito para aplicar estilos iniciais às seções
  useEffect(() => {
    // Verificar se há algum hash na URL
    const hash = window.location.hash.replace("#", "");
    
    // Lista de seções válidas
    const validSections = ["home", "skills", "portfolio", "contact", "resume", "todo", "about"];
    const initialSection = validSections.includes(hash) ? hash : "home";
    
    // Configurar a exibição inicial de seções
    document.querySelectorAll(".section-container").forEach((section) => {
      if (section.id === initialSection) {
        // Mostrar a seção inicial
        section.style.display = "block";
        section.style.opacity = "1";
        section.style.zIndex = "1"; // Garantir que a seção está visível na pilha z-index
      } else {
        // Ocultar outras seções
        section.style.display = "none";
        section.style.opacity = "0";
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/*"
          element={
            <SectionProvider>
              <div className="app-container">
                <PageTransition />
                <TransitionParticles />
                <Preloader />
                <Header />
                <div className="content" id="content">
                  <div id="home" className="section-container">
                    <HomeSection />
                  </div>
                  <div id="about" className="section-container">
                    <AboutSection />
                  </div>
                  <div id="skills" className="section-container">
                    <SkillsSection />
                  </div>
                  <div id="portfolio" className="section-container">
                    <PortfolioSection />
                  </div>
                  <div id="todo" className="section-container">
                    <Todo />
                  </div>
                  <div id="contact" className="section-container">
                    <ContactSection />
                  </div>
                  <div id="resume" className="section-container">
                    <ResumeSection />
                  </div>
                </div>
                <FloatingAboutButton />
                <Footer />
              </div>
            </SectionProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
