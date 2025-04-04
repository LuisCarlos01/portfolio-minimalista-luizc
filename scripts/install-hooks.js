/**
 * Script para instalar hooks Git no projeto
 * Executado via: npm run install-hooks
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Caminho para o diretório .git/hooks
const getGitHooksPath = () => {
  try {
    // Obter o caminho para o diretório .git
    const gitDir = execSync("git rev-parse --git-dir").toString().trim();
    return path.resolve(gitDir, "hooks");
  } catch (error) {
    console.error("Erro ao determinar o diretório Git:", error.message);
    process.exit(1);
  }
};

// Conteúdo para o hook pre-commit
const preCommitHook = `#!/bin/sh

# Hook de pre-commit para verificar conflitos e duplicações no código
echo "🔍 Executando revisão de código antes do commit..."

# Executar verificação de conflitos entre CSS/SASS e React
echo "✓ Verificando conflitos entre CSS/SASS e React..."
npm run check-styles

# Verificar o resultado da verificação de estilos
if [ $? -ne 0 ]; then
  echo "❌ Foram encontrados conflitos de estilo que precisam ser corrigidos antes do commit."
  echo "   Execute 'npm run check-styles' para mais detalhes."
  echo "   Para ignorar esta verificação, use 'git commit --no-verify'"
  exit 1
fi

# Executar verificação de código
echo "✓ Verificando problemas no código..."
npm run check-code

# Verificar o resultado da verificação de código
if [ $? -ne 0 ]; then
  echo "❌ Foram encontrados problemas no código que precisam ser corrigidos antes do commit."
  echo "   Execute 'npm run check-code' para mais detalhes."
  echo "   Para ignorar esta verificação, use 'git commit --no-verify'"
  exit 1
fi

# Executar a revisão de mudanças completa
echo "✓ Realizando revisão completa das mudanças..."
npm run review-changes

# Verificar o resultado da revisão
if [ $? -ne 0 ]; then
  echo "❌ A revisão de código encontrou problemas que precisam ser corrigidos antes do commit."
  echo "   Para ignorar esta verificação, use 'git commit --no-verify'"
  exit 1
fi

echo "✅ Revisão de código concluída com sucesso!"
exit 0
`;

// Conteúdo para o hook post-merge (executado após pull/merge)
const postMergeHook = `#!/bin/sh

# Hook de post-merge para verificar conflitos após merge/pull
echo "🔍 Verificando conflitos após merge/pull..."

# Executar verificação diária
npm run daily-check

# Mesmo se houver erros, permitir que o merge continue
echo "✅ Verificação pós-merge concluída. Relatório de conflitos disponível em './reports/'"
exit 0
`;

// Instalar hooks
const installHooks = () => {
  try {
    console.log("Instalando hooks Git...");

    // Obter o caminho dos hooks Git
    const hooksPath = getGitHooksPath();

    // Verificar se o diretório de hooks existe
    if (!fs.existsSync(hooksPath)) {
      console.log(`Criando diretório de hooks: ${hooksPath}`);
      fs.mkdirSync(hooksPath, { recursive: true });
    }

    // Caminho para o hook pre-commit
    const preCommitPath = path.join(hooksPath, "pre-commit");

    // Escrever o hook pre-commit
    fs.writeFileSync(preCommitPath, preCommitHook);

    // Tornar o hook executável (chmod +x)
    try {
      execSync(`chmod +x "${preCommitPath}"`);
    } catch (err) {
      console.log(
        "Nota: Não foi possível tornar o hook executável. Se estiver no Windows, isso é esperado."
      );
    }

    // Caminho para o hook post-merge
    const postMergePath = path.join(hooksPath, "post-merge");

    // Escrever o hook post-merge
    fs.writeFileSync(postMergePath, postMergeHook);

    // Tornar o hook executável (chmod +x)
    try {
      execSync(`chmod +x "${postMergePath}"`);
    } catch (err) {
      console.log(
        "Nota: Não foi possível tornar o hook executável. Se estiver no Windows, isso é esperado."
      );
    }

    console.log("✅ Hooks Git instalados com sucesso!");
    console.log(
      "   O hook pre-commit agora verificará conflitos e duplicações no código antes de cada commit."
    );
    console.log(
      "   O hook post-merge executará verificações após pull/merge para identificar conflitos."
    );
  } catch (error) {
    console.error("Erro ao instalar hooks Git:", error.message);
    process.exit(1);
  }
};

// Executar instalação
installHooks();
