import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/style.scss"; // Importação direta do SCSS principal
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import performance from "./utils/performance";
import logger from "./utils/logger";

// Silenciar avisos do React Router v6 sobre futuras mudanças no v7
// Isso é temporário e deve ser resolvido adequadamente em uma atualização
const originalConsoleWarn = console.warn;
console.warn = function(msg, ...args) {
  if (msg && typeof msg === 'string' && msg.includes('React Router Future Flag Warning')) {
    return; // Silenciar avisos específicos do React Router
  }
  originalConsoleWarn.apply(console, [msg, ...args]);
};

// Configurar handler global para erros não capturados
window.addEventListener("error", (event) => {
  logger.error("Erro global não capturado", {
    message: event.message,
    source: event.filename,
    lineNo: event.lineno,
    colNo: event.colno,
    error: event.error,
  });

  // Não previne o comportamento padrão do navegador
  return false;
});

// Configurar handler para rejeições de promessas não tratadas
window.addEventListener("unhandledrejection", (event) => {
  logger.error("Promessa rejeitada não tratada", {
    reason: event.reason,
  });

  // Não previne o comportamento padrão do navegador
  return false;
});

// Marcar o início do carregamento da aplicação
performance.mark("app-mount-start");

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Marcar o fim do carregamento e medir o tempo total
performance.mark("app-mount-end");
performance.measureMarks("app-mount-total", "app-mount-start", "app-mount-end");

// Registrar as métricas de web vitals
reportWebVitals(performance.logWebVitals);
