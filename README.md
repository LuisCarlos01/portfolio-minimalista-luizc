# Portfolio Minimalista

Projeto de portfolio desenvolvido com React e Vite com foco em design minimalista e alta performance.

## 🚀 Tecnologias Utilizadas

- React.js
- Vite para build e desenvolvimento
- GSAP para animações
- SCSS para estilização
- TypeScript para tipagem estática

## 📋 Características

- Design responsivo
- Animações fluidas e elegantes
- Navegação em SPA (Single Page Application)
- Performance otimizada
- Estratégias para carregamento rápido
- Sistema de automação para monitoramento de conflitos
- Sistema de lista de tarefas com persistência de dados
- Transições de página com GSAP

## 🎯 Gerenciador de Tarefas

O projeto inclui um gerenciador de tarefas completo com as seguintes funcionalidades:

- **Gerenciamento Completo**: Adicionar, editar, marcar como concluída e excluir tarefas
- **Filtros de Visualização**: Todas, ativas ou concluídas
- **Persistência de Dados**: Armazenamento local via localStorage
- **Design Responsivo**: Adaptável a qualquer dispositivo
- **Animações Suaves**: Feedback visual para todas as interações
- **Compatibilidade com Tema**: Interface integrada ao design do site
- **Atalhos de Teclado**: Suporte para Enter (salvar) e Escape (cancelar)

Para acessar o gerenciador de tarefas, navegue até a seção "Tarefas" no menu principal.

## 🔧 Instalação e Configuração

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/portfolio-minimalista.git
cd portfolio-minimalista
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto em desenvolvimento:

```bash
npm run dev
```

4. Para gerar a versão de produção:

```bash
npm run build
```

## 📦 Estrutura do Projeto

```
portfolio-minimalista/
├── public/
│   ├── images/
│   └── index.html
├── src/
│   ├── components/
│   ├── contexts/
│   ├── data/
│   ├── hooks/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── index.jsx
├── scripts/
│   ├── check-styles.js
│   ├── check-code.js
│   ├── review-changes.js
│   ├── install-hooks.js
│   └── monitor-changes.js
├── reports/
│   └── conflict-report-YYYY-MM-DD.json
├── index.html
└── vite.config.js
```

## 🔄 Modificações Realizadas

### Migração para Vite

O projeto foi migrado de Create React App para Vite, oferecendo:

- Inicialização mais rápida do servidor de desenvolvimento
- Hot Module Replacement (HMR) otimizado
- Build mais eficiente
- Melhor experiência de desenvolvimento

Para iniciar o servidor Vite:

```bash
npm run dev
```

### Sistema de Animações Avançadas

Utilizamos GSAP (GreenSock Animation Platform) para criar animações sofisticadas em todo o site:

- **Animações Contextuais**: Cada seção possui animações específicas
- **Transições Suaves**: Elementos surgem com suavidade ao rolar ou mudar de seção
- **Efeitos Parallax**: Camadas de elementos se movem em velocidades diferentes durante a rolagem
- **Sequências Animadas**: Elementos são animados em sequência para criar uma narrativa visual
- **Animações Responsivas**: Adaptadas para diferentes tamanhos de tela

### Sistema de Automação

Foi implementado um sistema de automação completo que inclui:

1. **Monitoramento de Arquivos**: Verifica alterações no código em tempo real
2. **Organização Automática**: Move arquivos para diretórios apropriados
3. **Verificação de Conflitos**: Detecta conflitos entre CSS/SASS e React
4. **Geração de Relatórios**: Cria relatórios detalhados de problemas encontrados

### Integração com Git

O projeto agora conta com hooks Git para garantir a qualidade do código:

- **Pre-commit**: Verifica conflitos antes de cada commit
- **Post-merge**: Executa verificações após pull/merge

Para instalar os hooks (necessário inicializar Git primeiro):

```bash
git init  # Se o repositório ainda não for um repositório Git
npm run install-hooks
```

### Hierarquia de Arquivos

Implementamos uma organização automática de arquivos que:

- Identifica o tipo de arquivo pela extensão
- Move para o diretório apropriado
- Mantém a estrutura do projeto organizada

## 🎨 Sistema de Estilos

### Organização de Estilos

Os estilos do projeto são centralizados através do arquivo `src/styles/index.js`, que importa todos os arquivos CSS e SCSS necessários. Isso garante que não haja duplicações e conflitos de estilos.

- **`src/styles/style.css`**: Contém estilos globais e reset CSS
- **`src/styles/components/`**: Contém arquivos SCSS específicos para cada componente
- **`src/styles/variables.css`**: Define variáveis CSS globais
- **`src/styles/custom.css`**: Para customizações específicas (último a ser importado)

### Verificação de Conflitos de Estilos

O projeto inclui um sistema de verificação de conflitos de estilos. Para executar a verificação:

```bash
npm run check-styles
```

Este comando irá:

1. Detectar seletores CSS duplicados em diferentes arquivos
2. Identificar importações CSS duplicadas em componentes
3. Verificar possíveis conflitos entre estilos inline e globais

### Boas Práticas de Estilização

1. **Não importe arquivos CSS/SCSS diretamente nos componentes**

   - Use o sistema centralizado de importação em `src/styles/index.js`

2. **Use nomes de classes específicos para componentes**

   - Prefixe classes com o nome do componente: `.hero-title` em vez de apenas `.title`

3. **Evite estilos inline quando possível**

   - Quando necessário, verifique se há conflitos com estilos globais

4. **Prefira variáveis CSS para valores reutilizados**

   - Use as variáveis definidas em `variables.css`

5. **Mantenha a especificidade de seletores baixa**
   - Evite aninhamento profundo que dificulta sobrescrita

## 🔍 Sistema de Revisão de Código

O projeto inclui um sistema de revisão automática de código para evitar conflitos e duplicações.

### Verificação Completa do Código

Para realizar uma verificação completa do código do projeto:

```bash
npm run check-code
```

Esta verificação analisará:

- Diretórios com nomes duplicados ou similares
- Arquivos com nomes duplicados em diferentes locais
- Arquivos com conteúdo similar ou duplicado
- Conflitos entre diferentes linguagens e frameworks

### Monitoramento Contínuo

Para iniciar o monitoramento contínuo de mudanças:

```bash
npm run monitor
```

Este comando irá:

1. Monitorar mudanças em arquivos fonte (JS, JSX, CSS, SCSS, etc.)
2. Executar verificações automáticas quando detectar alterações
3. Gerar relatórios de conflitos em formato JSON
4. Organizar arquivos automaticamente em diretórios apropriados

### Verificação Diária

Para executar uma verificação completa e gerar um relatório (sem monitoramento):

```bash
npm run daily-check
```

Esta verificação é executada automaticamente após pull/merge do Git para detectar conflitos.

### Revisão de Alterações

Para verificar apenas os arquivos modificados antes de um commit:

```bash
npm run review-changes
```

Este comando é executado automaticamente antes de cada commit Git, garantindo que novos arquivos ou modificações:

1. Não dupliquem estruturas existentes
2. Não causem conflitos com outras partes do código
3. Sigam os padrões estabelecidos no projeto

### Integração com Git

O sistema está integrado com o Git através de hooks que são instalados automaticamente:

```bash
npm run install-hooks
```

Os hooks implementados são:

- **pre-commit**: Executa verificações antes de cada commit
- **post-merge**: Executa verificações após pull/merge

Se você precisar ignorar a verificação ao fazer um commit, use a flag `--no-verify`:

```bash
git commit -m "Mensagem do commit" --no-verify
```

### Relatórios de Conflitos

Os relatórios de conflitos são gerados em formato JSON na pasta `reports/` e incluem:

- Timestamp da verificação
- Status da verificação
- Lista de conflitos encontrados
- Detalhes sobre cada conflito

Para gerar um relatório manualmente:

```bash
node scripts/monitor-changes.js --report-only
```

### Organização Automática de Arquivos

O sistema de monitoramento também reorganiza arquivos em diretórios apropriados:

- Arquivos `.js` são movidos para `src/utils/`
- Arquivos `.jsx` e `.tsx` são movidos para `src/components/`
- Arquivos `.css`, `.scss` e `.sass` são movidos para `src/styles/`
- Arquivos de imagens são movidos para `public/images/`

## 🛠️ Configuração do Vite

O projeto utiliza Vite configurado para:

- Suporte completo a React e TypeScript
- Resolução de alias de importação (`@` aponta para `src/`)
- Compatibilidade com o sistema de monitoramento
- Hot Module Replacement otimizado

Para mais detalhes, consulte o arquivo `vite.config.js` na raiz do projeto.

## 👨‍💻 Autor

- **Luís Carlos** - [GitHub](https://github.com/LuisCarlos01)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## 🔄 Atualizações Recentes

### Refatoração do Sistema de Estilos SASS

O sistema de estilos SASS foi completamente reorganizado e otimizado para seguir as melhores práticas:

#### Estrutura Modularizada

- **Pasta Base**: Contém arquivos básicos de estilo como variáveis, mixins, reset, tipografia e utilitários
- **Pasta Components**: Contém estilos específicos para cada componente
- **Pasta Layout**: Contém sistemas de grid e utilitários responsivos 
- **Pasta Pages**: Contém estilos específicos para cada página
- **Pasta Themes**: Contém temas claro e escuro para customização

#### Principais Correções

- **Migração de @import para @use**: Substituição da sintaxe antiga de importação para a recomendada pelo Sass
- **Correção de Variáveis**: Adição de variáveis ausentes como `$accent-color`, `$accent-hover` e `$danger-color`
- **Criação de Arquivos Ausentes**: Criação dos arquivos de estilos inexistentes que causavam erros de compilação
- **Sistema de Grid Responsivo**: Implementação de um sistema de grid flexível com classes para diferentes breakpoints
- **Sistema de Temas**: Implementação de temas claro e escuro com variáveis CSS
- **Correção de Funções Matemáticas**: Atualização para usar a nova sintaxe do Sass para operações matemáticas
- **Tratamento de Warnings de Depreciação**: Correção de funções depreciadas como `darken()` e `lighten()`

#### Benefícios da Nova Estrutura

- **Melhor Organização**: Arquivos separados por responsabilidade
- **Facilidade de Manutenção**: Componentes isolados facilitam atualizações
- **Reutilização de Código**: Mixins e variáveis compartilhados
- **Performance Aprimorada**: Compilação mais eficiente
- **Compatibilidade Futura**: Preparação para Sass 2.0/3.0

#### Próximos Passos para o Sistema de Estilos

- Migração completa de funções color para namespace `color.adjust`
- Substituição de divisões com `/` para usar `math.div` ou `calc()`
- Implementação de modo escuro/claro com alternância por usuário
- Criação de mais utilitários para animações e elementos comuns
