# ☁️ Projeto Clima

Bem-vindo ao **Projeto Clima**! Uma aplicação web elegante e totalmente responsiva, desenvolvida para consultar e exibir as condições meteorológicas atuais de qualquer cidade do mundo.

🚀 **Acesse o Projeto Online:** [https://augustojbe.github.io/clima/](https://augustojbe.github.io/clima/)

---

## 🎯 Sobre o Projeto

O Projeto Clima consome dados reais através da integração com a API do [OpenMeteo](https://open-meteo.com/). A arquitetura é construída para abstrair as buscas da camada visual, encadeando a busca de geolocalização e as previsões do tempo numa experiência unificada e rápida. 

Ele conta com tratamento completo de erros para buscas não-sucedidas (Empty State) e um design moderno com background dinâmico dependendo se é dia ou noite.

## ✨ Funcionalidades

- **Busca Global:** Digite o nome de qualquer cidade para ver a previsão atual.
- **Dados Detalhados:** 
  - Temperatura exata e código descritivo do clima
  - Umidade relativa do ar
  - Sensação térmica (Apparent Temperature)
  - Probabilidade de chuva (Precipitação)
  - Velocidade e direção do vento
- **Indicador Dia/Noite:** Identificação automática no layout baseada no horário da cidade.
- **Responsividade:** Layout *Mobile-First*, projetado em formato Grid/Flexbox, que se empilha de modo perfeito em telas de smartphones, tablets ou desktops.
- **Empty State & Loaders:** Feedback visual caso o usuário procure uma cidade inválida, aliado a spinners de carregamento durante a execução das APIs.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes ferramentas:

- **HTML5 & CSS3 Vanilla** (Variáveis CSS, CSS Flexbox e Grid, Design Totalmente Responsivo)
- **TypeScript** (Garantia de tipagem e integridade entre requisições da API)
- **Vite** (Build tool hiper rápida para processar os recursos de compilação do TypeScript)
- **GitHub Actions & Pages** (Pipeline de CI/CD automatizado para publicação de novas versões de forma autônoma e gratuita)

---

## ⚙️ Como executar o projeto localmente

Siga o passo a passo abaixo para rodar o sistema no seu computador.

### Pré-requisitos
Ter instalado em sua máquina:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (Versão 18+ recomendada)

### Passos

1. Faça o clone deste repositório:
```bash
git clone https://github.com/augustojbe/clima.git
```

2. Acesse a pasta do projeto:
```bash
cd clima
```

3. Instale as dependências usando NPM:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O aplicativo será executado e um link local (geralmente `http://localhost:5173`) aparecerá no seu terminal. Acesse-o pelo navegador.

---

## 📝 Documentação do Desenvolvimento

A elaboração deste projeto foi acompanhada por documentos guias, que ajudaram a quebrar os objetivos em tarefas estruturadas, os quais você pode conferir (caso tenha interesse na concepção) dentro do diretório `.docs/`:

- [PRD (Product Requirements Document)](./.docs/prd.md)
- [Checklist de Tarefas (Implementação)](./.docs/tasks.md)

---
*Desenvolvido com 🩵 por [Augusto](https://github.com/augustojbe)*
