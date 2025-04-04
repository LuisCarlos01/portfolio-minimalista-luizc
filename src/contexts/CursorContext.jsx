import React, { createContext, useState, useContext, useEffect } from "react";
import { isMobile } from "../utils/device";

// Criar o contexto
const CursorContext = createContext();

// Hook personalizado para acessar o contexto
export const useCursor = () => useContext(CursorContext);

// Provedor do contexto
export const CursorProvider = ({ children }) => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  // Detecção inicial de dispositivo móvel
  useEffect(() => {
    // Em dispositivos móveis, não mostramos o cursor personalizado
    if (!isMobile()) {
      setShowCursor(true);
      
      // Adicionar listeners para eventos de mouse
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", handleMouseUp);
      
      // Configurar listeners para detectar quando o cursor está sobre elementos interativos
      setupHoverListeners();
    }
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Atualizar a posição do cursor
  const handleMouseMove = (e) => {
    setCursorPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Adicionar classe quando o mouse está pressionado
  const handleMouseDown = () => {
    document.documentElement.classList.add("cursor-down");
  };

  // Remover classe quando o mouse é solto
  const handleMouseUp = () => {
    document.documentElement.classList.remove("cursor-down");
  };

  // Configurar listeners para detectar elementos interativos
  const setupHoverListeners = () => {
    // Lista de seletores para elementos interativos
    const interactiveElements = [
      "a", 
      "button", 
      ".btn", 
      "input", 
      "textarea", 
      "select",
      ".clickable", 
      ".interactive",
      ".portfolio-filter",
      ".togglebtn",
      ".logo",
      ".skill-item",
      ".task-checkbox",
      ".task-actions button"
    ];
    
    // Seletor composto para todos os elementos interativos
    const selector = interactiveElements.join(", ");
    
    // Função para lidar com o evento mouseenter em elementos interativos
    const handleMouseEnter = () => {
      setIsHovering(true);
      document.documentElement.classList.add("interactive-hover");
    };
    
    // Função para lidar com o evento mouseleave em elementos interativos
    const handleMouseLeave = () => {
      setIsHovering(false);
      document.documentElement.classList.remove("interactive-hover");
    };
    
    // Usar MutationObserver para detectar novos elementos adicionados ao DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Verificar se o elemento corresponde ao seletor
              if (node.matches && node.matches(selector)) {
                node.addEventListener("mouseenter", handleMouseEnter);
                node.addEventListener("mouseleave", handleMouseLeave);
              }
              
              // Verificar elementos filhos
              const childElements = node.querySelectorAll(selector);
              childElements.forEach((el) => {
                el.addEventListener("mouseenter", handleMouseEnter);
                el.addEventListener("mouseleave", handleMouseLeave);
              });
            }
          });
        }
      });
    });
    
    // Observar mudanças no DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    
    // Adicionar listeners para elementos existentes
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });
  };

  return (
    <CursorContext.Provider
      value={{
        cursorPos,
        isHovering,
        showCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export default CursorProvider; 