/**
 * Script para monitorar mudanças nos arquivos do projeto
 * e executar verificações automáticas quando detectadas alterações
 *
 * Executado via: npm run monitor
 * Opções:
 *   --report-only - Apenas gera um relatório sem monitorar mudanças
 */

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const chalk = require("chalk");

// Verificar argumentos da linha de comando
const args = process.argv.slice(2);
const REPORT_ONLY_MODE = args.includes("--report-only");

// Diretórios a serem monitorados
const WATCH_DIRECTORIES = [
  path.resolve(__dirname, "../src"),
  path.resolve(__dirname, "../public"),
];

// Tipos de arquivos a serem monitorados
const FILE_EXTENSIONS = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".css",
  ".scss",
  ".sass",
  ".html",
];

// Intervalo de verificação (em ms) para debounce
const CHECK_INTERVAL = 1000;

// Variáveis para controle do debounce
let timeoutId = null;
let changedFiles = new Set();

// Funções para exibir mensagens
const log = {
  info: (message) => console.log(chalk.blue("ℹ️ INFO:"), message),
  success: (message) => console.log(chalk.green("✅ SUCESSO:"), message),
  warning: (message) => console.log(chalk.yellow("⚠️ AVISO:"), message),
  error: (message) => console.log(chalk.red("❌ ERRO:"), message),
  change: (file) => console.log(chalk.magenta("🔄 ALTERAÇÃO:"), file),
};

// Função para executar verificações
const runChecks = () => {
  log.info("Iniciando verificações...");

  // Executar scripts de verificação
  exec(
    "npm run check-styles && npm run check-code",
    (error, stdout, stderr) => {
      if (error) {
        log.error("Problemas encontrados nas verificações:");
        console.log(stdout);
        return;
      }

      if (stderr) {
        log.warning("Avisos durante a verificação:");
        console.log(stderr);
      }

      log.success("Todas as verificações foram concluídas com sucesso!");

      // Organizar arquivos apenas se não estiver no modo de apenas relatório
      if (!REPORT_ONLY_MODE) {
        organizeFiles();
      }
    }
  );
};

// Função para organizar arquivos automaticamente
const organizeFiles = () => {
  log.info("Organizando arquivos...");

  // Mapeia extensões para diretórios específicos
  const fileTypeMap = {
    ".js": "src/utils",
    ".jsx": "src/components",
    ".ts": "src/utils",
    ".tsx": "src/components",
    ".css": "src/styles",
    ".scss": "src/styles",
    ".sass": "src/styles",
    ".json": "src/data",
    ".svg": "public/images",
    ".png": "public/images",
    ".jpg": "public/images",
    ".jpeg": "public/images",
  };

  // Para cada arquivo alterado, verificar se precisa ser movido
  changedFiles.forEach((filePath) => {
    const ext = path.extname(filePath);
    const fileName = path.basename(filePath);

    // Pular arquivos em node_modules ou build
    if (filePath.includes("node_modules") || filePath.includes("build")) {
      return;
    }

    // Se a extensão estiver no mapa e o arquivo não estiver no diretório correto
    if (fileTypeMap[ext] && !filePath.includes(fileTypeMap[ext])) {
      const targetDir = path.resolve(__dirname, "..", fileTypeMap[ext]);
      const targetPath = path.join(targetDir, fileName);

      // Criar diretório de destino se não existir
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      try {
        // Verificar se o arquivo já existe no destino
        if (fs.existsSync(targetPath)) {
          log.warning(`Arquivo ${fileName} já existe em ${fileTypeMap[ext]}`);
          return;
        }

        // Mover o arquivo
        fs.copyFileSync(filePath, targetPath);
        fs.unlinkSync(filePath);
        log.success(`Movido: ${filePath} -> ${targetPath}`);
      } catch (err) {
        log.error(`Erro ao mover arquivo ${filePath}: ${err.message}`);
      }
    }
  });

  // Limpar o conjunto de arquivos alterados
  changedFiles.clear();
};

// Função para gerar relatório de conflitos
const generateReport = () => {
  const reportDir = path.resolve(__dirname, "../reports");
  const reportPath = path.join(
    reportDir,
    `conflict-report-${new Date().toISOString().slice(0, 10)}.json`
  );

  // Criar diretório de relatórios se não existir
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  // Executar verificação de estilos e código e capturar a saída
  exec(
    "npm run check-styles && npm run check-code",
    (error, stdout, stderr) => {
      const report = {
        timestamp: new Date().toISOString(),
        success: !error,
        output: stdout,
        errors: stderr || null,
        conflicts: [],
      };

      // Analisar a saída para extrair conflitos
      const conflicts = [];

      // Seletores duplicados (parseamento simples)
      const duplicatedSelectorsMatch = stdout.match(
        /SELETORES DUPLICADOS ENCONTRADOS:[\s\S]*?(?=\n\n)/
      );
      if (duplicatedSelectorsMatch) {
        conflicts.push({
          type: "duplicated-selectors",
          details: duplicatedSelectorsMatch[0],
        });
      }

      // Importações duplicadas
      const duplicatedImportsMatch = stdout.match(
        /IMPORTAÇÕES CSS DUPLICADAS:[\s\S]*?(?=\n\n)/
      );
      if (duplicatedImportsMatch) {
        conflicts.push({
          type: "duplicated-imports",
          details: duplicatedImportsMatch[0],
        });
      }

      // Conflitos de componentes
      const componentConflictsMatch = stdout.match(
        /POSSÍVEIS CONFLITOS DE ESTILO EM COMPONENTES:[\s\S]*?(?=\n\n)/
      );
      if (componentConflictsMatch) {
        conflicts.push({
          type: "component-conflicts",
          details: componentConflictsMatch[0],
        });
      }

      report.conflicts = conflicts;

      // Salvar relatório
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

      if (conflicts.length > 0) {
        log.warning(`Relatório de conflitos gerado: ${reportPath}`);
      } else {
        log.success(`Relatório limpo gerado: ${reportPath}`);
      }

      // Se estiver em modo de apenas relatório, encerrar processo
      if (REPORT_ONLY_MODE) {
        process.exit(0);
      }
    }
  );
};

// Função para monitorar um diretório
const watchDirectory = (dir) => {
  log.info(`Monitorando diretório: ${dir}`);

  try {
    fs.watch(dir, { recursive: true }, (eventType, filename) => {
      if (!filename) return;

      const filePath = path.join(dir, filename);
      const ext = path.extname(filename);

      // Verificar se o arquivo é de um tipo que queremos monitorar
      if (FILE_EXTENSIONS.includes(ext)) {
        log.change(filePath);
        changedFiles.add(filePath);

        // Cancelar timeout anterior e definir um novo
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Definir timeout para execução da verificação (debounce)
        timeoutId = setTimeout(() => {
          timeoutId = null;
          runChecks();
          generateReport();
        }, CHECK_INTERVAL);
      }
    });
  } catch (err) {
    log.error(`Erro ao monitorar diretório ${dir}: ${err.message}`);
  }
};

// Função principal
const main = () => {
  if (REPORT_ONLY_MODE) {
    log.info("Modo de apenas relatório ativado");
    generateReport();
    return;
  }

  log.info("Iniciando monitoramento de arquivos...");

  // Monitorar diretórios
  WATCH_DIRECTORIES.forEach(watchDirectory);

  // Executar verificação inicial
  runChecks();
  generateReport();

  log.info("Monitoramento iniciado. Pressione Ctrl+C para encerrar.");
};

// Iniciar a execução
main();

/**
 * Notas sobre o sistema de monitoramento:
 *
 * 1. Organização de Diretórios:
 *    O sistema organizará automaticamente os arquivos em diretórios apropriados
 *    baseado em suas extensões. Isso garante que o projeto mantenha uma estrutura
 *    consistente e que cada tipo de arquivo esteja no local correto.
 *
 * 2. Verificação de Conflitos:
 *    O sistema verifica continuamente por conflitos entre CSS/SASS e React,
 *    duplicação de seletores e possíveis problemas de tipagem TypeScript.
 *
 * 3. Relatórios:
 *    Os relatórios são gerados em formato JSON e armazenados na pasta 'reports/'
 *    para análise posterior.
 *
 * 4. Integração com Git:
 *    O sistema está integrado com o Git através de hooks pre-commit e post-merge,
 *    garantindo verificações antes de cada commit e após operações de pull/merge.
 *
 * 5. Uso Diário:
 *    Para uso diário, execute 'npm run monitor' durante o desenvolvimento e
 *    'npm run daily-check' para verificações pontuais sem monitoramento contínuo.
 */
