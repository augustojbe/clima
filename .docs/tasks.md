# Tasks de Implementação - Projeto Clima

Este documento contém o plano de execução passo a passo para o desenvolvimento do projeto Clima, baseado integralmente nas especificações definidas no [prd.md](./prd.md).
Como este projeto será desenvolvido progressivamente por agentes de IA, as tarefas foram estruturadas em ordem cronológica de dependência para garantir uma evolução contínua e testável.

---

## Fase 1: Setup e Infraestrutura

- [x] **Task 1: Setup do Projeto Base**
  - **Descrição:** Inicializar um novo projeto usando Vite com template Vanilla e TypeScript na raiz do diretório `clima`. Limpar os arquivos boilerplate (CSS base, logo e contador do Vite).
  - **Referência:** PRD - Seção 3.1
  - **Critério de Aprovação:** Executar `npm install` e `npm run dev` inicia o projeto exibindo apenas uma página em branco, sem erros no console ou terminal, e sem arquivos desnecessários do Vite.

- [x] **Task 2: Criação da Camada de Serviços (OpenMeteo)**
  - **Descrição:** Criar os arquivos de serviços (`src/api.ts` ou similar) contendo as funções que chamam os endpoints de Geocoding e Weather API. Implementar validações (se faltar parâmetro, abortar/retornar erro silenciosamente) e definir as interfaces de tipagem dos retornos. 
  - **Referência:** PRD - Seção 3.2
  - **Critério de Aprovação:** Arquivos criados com tipagem correta, endpoints formatados exatamente conforme o PRD e tratamento de ausência de parâmetros implementado, validado por ausência de erros estáticos no TypeScript.

- [x] **Task 3: Dicionário de Códigos de Clima**
  - **Descrição:** Criar utilitário (`src/utils.ts` ou similar) com um objeto/função de mapeamento para interpretar o `weather_code`, convertendo para textos em Português conforme a tabela.
  - **Referência:** PRD - Seção 5
  - **Critério de Aprovação:** A função/objeto recebe um código numérico de 0 a 99 e retorna a string descritiva equivalente, suportando fallback para um valor padrão caso receba um número não mapeado.

---

## Fase 2: Estrutura Visual e Componentes HTML/CSS

- [x] **Task 4: Estrutura Base e Variáveis Globais (Layout Global)**
  - **Descrição:** Construir a marcação HTML (`index.html`) inicial contendo um container no topo para o input de busca e um container no meio para o conteúdo. No CSS (`style.css`), definir fonte moderna, background geral "cinza escuro" e remover margens padrão do navegador.
  - **Referência:** PRD - Seção 4.1
  - **Critério de Aprovação:** A página exibe o campo de pesquisa flutuando transparentemente na parte superior de um fundo cinza escuro, com estilos base aplicados.

- [x] **Task 5: Estrutura Estática do Card Principal (Desktop)**
  - **Descrição:** Construir no HTML e CSS a estrutura estática do "Card de Clima" (fundo branco, max 800px, bordas arredondadas) e dividi-lo com display flex/grid contendo a Sidebar à esquerda e a Área Principal à direita com dados "mockados" (fictícios) no HTML para validação visual.
  - **Referência:** PRD - Seção 4.2
  - **Critério de Aprovação:** Renderização visual exata do Card de Clima descrita no PRD, com alinhamento, preenchimentos e hierarquia visual coerentes em resoluções de desktop (largura > 800px).

- [x] **Task 6: Design do Empty State**
  - **Descrição:** Construir o markup e os estilos de um "Empty State" centralizado para ser exibido quando não houver cidade pesquisada ou quando houver erro.
  - **Referência:** PRD - Seção 4.3
  - **Critério de Aprovação:** O HTML contendo a mensagem do Empty State deve estar legível, alinhado ao centro e harmonioso com o fundo geral da aplicação.

- [x] **Task 7: Responsividade**
  - **Descrição:** Adicionar `media queries` no CSS para reorganizar o Card Principal e o layout em telas menores, alternando a disposição da Sidebar e Área principal para empilhamento vertical, ajustando margens e paddings.
  - **Referência:** PRD - Seção 4.4
  - **Critério de Aprovação:** Ao diminuir a largura da tela do navegador para tamanho mobile (ex: < 600px), o layout automaticamente empilha a Sidebar em cima e a Área Principal abaixo, ocupando a largura adequada da tela sem estourar barras de rolagem horizontais.

---

## Fase 3: Lógica de Interface e Integração Final

- [x] **Task 8: Implementação do Fluxo de Busca e Estado de Carregamento**
  - **Descrição:** No `main.ts`, escutar o formulário de busca. Quando disparado, acionar visualmente um *loading indicator* (seja trocando o ícone/texto do botão ou no próprio container central) e coordenar o consumo encadeado das APIs (Geocoding -> Weather).
  - **Referência:** PRD - Seção 2.1 e 3.2
  - **Critério de Aprovação:** Ao disparar a pesquisa, o usuário vê instantaneamente um indicativo de carregamento. O terminal/console do navegador evidencia as requisições sendo disparadas em sequência correta.

- [x] **Task 9: Manipulação da DOM (Renderização Condicional e Dados Reais)**
  - **Descrição:** Com os dados das APIs, substituir as informações mockadas no HTML pelos dados reais e processados (traduzindo o weather_code, lidando com formatação de data para "Dia atual", etc). Alternar visualmente entre o "Card de Clima" (sucesso) e o "Empty State" (erro/não encontrado) baseado nos retornos da API.
  - **Referência:** PRD - Seção 2.1 e 4.2
  - **Critério de Aprovação:** Fluxo final totalmente funcional. Pesquisar por "São Paulo" esconde o Empty State e preenche o Card com clima real. Pesquisar por cidade inválida "xzzxxzx" esconde o Card e exibe o Empty State perfeitamente. O comportamento de loading funciona entre transições.
