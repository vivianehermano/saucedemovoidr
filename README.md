# Automação de Testes - Sauce Demo

Projeto completo de testes automatizados E2E usando Playwright, JavaScript e GitHub Actions.

## Estrutura do Projeto

```
├── .github/workflows/ci.yml    # CI/CD Pipeline
├── .husky/pre-commit          # Git hooks
├── config/environments.js     # Configurações de ambiente
├── data/dataTest.js          # Dados para testes
├── pages/                    # Page Objects
├── tests/                    # Testes automatizados
├── utils/Logger.js           # Sistema de logs
└── playwright.config.js      # Configuração do Playwright
```

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Git

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/vivianehermano/saucedemovoidr.git
cd saucedemovoidr

# Instalar dependências
npm install

# Instalar browsers do Playwright
npx playwright install

# Configurar Husky (hooks do Git)
npm run prepare
```

## Comandos Disponíveis

### Executar Testes

```bash
# Todos os testes
npm test

# Testes com interface visual
npm run test:headed

# Testes críticos (login)
npm run test:critical

# Testes por browser
npm run test:chrome
npm run test:firefox

# Modo debug
npm run test:debug

# Interface do Playwright
npm run test:ui
```

### Qualidade de Código

```bash
# Executar ESLint
npm run lint

# Corrigir problemas do ESLint
npm run lint:fix

# Formatar código com Prettier
npm run format

# Verificar formatação
npm run format:check
```

### Relatórios

```bash
# Visualizar relatório HTML
npm run relatorio
```

## Configuração GitHub Actions

### 1. Configurar Permissões

No repositório GitHub:

1. **Settings** → **Actions** → **General**
2. Em **Workflow permissions**:
   - ✅ "Read and write permissions"
   - ✅ "Allow GitHub Actions to create and approve pull requests"

### 2. Configurar GitHub Pages

1. **Settings** → **Pages**
2. **Source**: "GitHub Actions"

### 3. Executar Workflow

O pipeline executa automaticamente nos pushes para `main` ou `develop`.

Para executar manualmente:

1. Vá na aba **Actions**
2. Selecione "CI/CD Pipeline - Testes E2E"
3. Clique em **"Run workflow"**

## Pipeline CI/CD

O workflow inclui:

1. **Testes Críticos**: Executa testes de login primeiro
2. **Testes Completos**: Se críticos passarem, executa todos os testes
3. **Relatórios**: Gera relatórios HTML e JSON
4. **Deploy**: Publica relatórios no GitHub Pages

### Acessar Relatórios Online

Após execução bem-sucedida: `https://vivianehermano.github.io/saucedemovoidr`

## Estrutura dos Testes

### Page Objects

- `BasePage.js`: Classe base com métodos comuns
- `LoginPage.js`: Página de login
- `ProdutosPage.js`: Página de produtos
- `CarrinhoPage.js`: Página do carrinho
- `CheckoutPage.js`: Página de checkout

### Casos de Teste

- **Login**: Credenciais válidas/inválidas, usuário bloqueado
- **Produtos**: Visualização, ordenação, adicionar/remover do carrinho
- **Carrinho**: Verificar itens, remover produtos
- **Checkout**: Processo completo, validações, cálculos
- **Logout**: Sair do sistema, segurança de acesso
- **Segurança**: Acesso direto, caracteres especiais

## Dados de Teste

Configurados em `data/dataTest.js`:

- Usuários válidos/inválidos
- Produtos disponíveis
- Dados para checkout
- Mensagens de erro esperadas

## Configurações de Ambiente

Em `config/environments.js`:

- **dev**: Desenvolvimento
- **staging**: Homologação
- **prod**: Produção

## Logs e Debugging

Sistema de logs personalizado em `utils/Logger.js`:

- Timestamps automáticos
- Diferentes níveis (info, error, warn, debug)
- Logs estruturados em JSON
- Medição de tempo de execução

## Solução de Problemas

### Erro de ESLint

```bash
npm run lint:fix
```

### Problema com Husky

Recriar hooks:

```bash
npm run prepare
```

### Falha nos Testes

Verificar configuração:

```bash
npx playwright test --debug
```

### GitHub Actions Falhando

1. Verificar permissões no GitHub
2. Confirmar configuração do Pages
3. Verificar logs na aba Actions

## Contribuição

1. Faça fork do projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request
