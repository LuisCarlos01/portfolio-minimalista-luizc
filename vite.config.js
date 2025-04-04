import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    open: true, // Abre o navegador automaticamente ao iniciar o servidor
    port: 3000, // Usa a porta 3000 como no CRA
  },
  build: {
    outDir: "build", // Diretório de saída como no CRA
  },
  // Configuração para lidar com arquivos estáticos na pasta public
  publicDir: "public",
  // Define variáveis de ambiente para compatibilidade com CRA
  define: {
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  },
});
