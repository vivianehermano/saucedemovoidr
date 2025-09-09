# Automação de Testes - Sauce Demo

Testes automatizados para o site Sauce Demo usando Playwright e JavaScript.

## Configuração

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm

### Instalação

# Clonar o repositório
git clone https://github.com/seu-usuario/sauce-demo-automation.git

# Instalar dependências
npm install

# Instalar browsers do Playwright
npx playwright install

# Executar todos os testes
npx playwright test

# Executar com interface visual
npx playwright test --headed

# Executar teste específico
npx playwright test login.spec.js

# Executar em modo debug
npx playwright test --debug

# Ver relatório
npx playwright show-report

## Tecnologias

- **Playwright** - Framework de automação
- **JavaScript** - Linguagem de programação
- **Page Object Model** - Padrão de organização
- **GitHub Actions** - CI/CD

## Padrões Utilizados

- Page Object Model para organização do código
- Dados de teste centralizados
- Métodos reutilizáveis na classe base
- Nomenclatura clara e descritiva
- Estrutura de pastas organizada
