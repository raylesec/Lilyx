# LILYX

**Plataforma de segurança de software no fluxo de desenvolvimento** — um painel web que centraliza a visão do estado de segurança dos projetos: dependências, vulnerabilidades por severidade, pipelines de verificação contínua (com gate) e histórico de análises para acompanhar a evolução ao longo do tempo.

> **Status: fase 1 — protótipo com dados simulados.**
> Nenhuma ferramenta real (SAST/DAST, scanner de dependências, orquestrador de pipelines) foi executada. Todos os números vêm de um único arquivo mock (`src/data/mockData.js`) e são derivados na interface, garantindo consistência total entre os módulos.

## Como rodar

Pré-requisito: Node.js v24 (instalado via winget neste ambiente). Em cada novo terminal PowerShell, antes de qualquer comando npm:

```powershell
$env:PATH = "C:\Users\rayle\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.20.0-win-x64;" + $env:PATH
```

Depois:

```bash
npm install     # instale as dependências (use npm.cmd se .ps1 for bloqueado)
npm run dev     # servidor local → http://localhost:5173
npm run build   # gera o build de produção em dist/
```

> Por que `npm.cmd`? O PowerShell do Windows tem *execution policy* que bloqueia `.ps1`; o wrapper `.cmd` do npm contorna isso sem alterar políticas do sistema.

## Os 5 módulos

| Módulo | Rota no app | O que mostra |
|---|---|---|
| **Dashboard** | `dashboard` | Visão geral: KPIs globais, vulnerabilidades por severidade (gráfico de barras CSS), dependências vulneráveis, imagens de container com CVEs e as últimas verificações com status do gate |
| **Code Security** | `codeSecurity` | 3 abas: análise SAST, dependências auditadas e imagens de container — cada uma com seu contexto de ferramenta simulada |
| **Security Findings** | `findings` | Lista detalhada de vulnerabilidades com **filtros combináveis** (severidade, status, tipo, texto livre) e estados vazios explicativos |
| **Pipeline Monitor** | `pipelines` | Pipelines com stepper de etapas; o status geral é **derivado** das etapas (uma falha + gate bloqueado reprova o pipeline) e a mensagem de falha aparece sob o stepper |
| **Histórico** | `historico` | Evolução semanal por severidade (gráfico SVG), comparação das duas últimas análises (deltas de melhor/pior) e tabela de todas as análises anteriores com variação em relação à anterior |

A navegação é feita pela barra lateral (estado React simples — sem router externo, por decisão de zero-dependências).

## Stack (intencionalmente mínima)

- **React 18 + Vite 5** — as únicas dependências de runtime/build.
- **Gráficos feitos à mão**: barras com divs/CSS e linha temporal com SVG puro (`polyline`), sem chart library.
- **Ícones**: SVG inline traçados no próprio código (`components/icons.jsx`), sem biblioteca de ícones.
- **Estilo**: CSS puro com design tokens (tema escuro + acento rosa neon), BEM-ish e sem framework CSS.
- **Dados simulados**: carregamento pseudo-aleatório (~1,3 s) via hook `useSimulacaoCarregamento`, sempre visível como "dados demonstrativos".

## Estrutura do projeto

```
Projeto Lilyx/
├── index.html                  # entry HTML (meta, favicon, fontes, raiz #root)
├── package.json                # deps mínimas: react, react-dom, vite, @vitejs/plugin-react
├── vite.config.js
├── public/
│   └── favicon.svg             # monograma L+X
└── src/
    ├── main.jsx                # bootstrap do React + CSS global
    ├── App.jsx                 # shell: barra lateral + troca de página por state
    ├── styles/
    │   ├── index.css           # tokens (cores, espaçamentos, raios), layout, sidebar, responsivo
    │   └── components.css      # cards, KPIs, selos/badges, tabelas, abas, filtros, stepper, gráficos
    ├── data/
    │   └── mockData.js         # ÚNICA fonte de dados: projetos, 14 findings LSX-01xx, deps, containers, pipelines, histórico semanal, métricas de qualidade
    ├── utils/
    │   └── format.js           # formatadores (datas, horas, rótulos de severidade/status)
    ├── hooks/
    │   └── useSimulacaoCarregamento.js   # simula latência de API para exibir skeletons
    ├── components/
    │   ├── icons.jsx           # ícones SVG inline
    │   ├── Logo.jsx            # monograma L+X com gradientes escopados por useId
    │   ├── Layout.jsx          # sidebar + área de conteúdo
    │   ├── Badge.jsx           # selos de severidade/status/rótulos (mapeia valor→classe)
    │   ├── Card.jsx / StatCard.jsx / PageHeader.jsx
    │   ├── EmptyState.jsx      # estados vazios com dica de ação
    │   ├── Estados.jsx         # EsqueletoCarregando + NotaSimulacao ("dados demonstrativos")
    │   └── charts/
    │       ├── BarChart.jsx    # barras horizontais puras em CSS
    │       └── TrendChart.jsx  # gráfico de linha SVG multi-série com legenda
    └── pages/
        ├── Dashboard.jsx
        ├── CodeSecurity.jsx
        ├── Findings.jsx
        ├── PipelineMonitor.jsx
        └── History.jsx
```

## Princípios de implementação

1. **Single source of truth**: toda métrica exibida é calculada a partir de `mockData.js` (ex.: KPI do Dashboard conta findings com status "aberto" — nunca número hardcoded na UI).
2. **Simulação explícita**: badge "Dados demonstrativos" na sidebar + `NotaSimulacao` no rodapé de cada página — nada passa impressão de ser dado real (requisito da fase 1).
3. **Zero dependências extras**: cada utilidade (chart, ícone, formatador) é implementada à mão para manter o bundle pequeno e o projeto auditável.
4. **Semântica + acessibilidade**: HTML semântico (`nav`, `main`, `table` com `scope`), ARIA nos steppers/filtros, contraste adequado no tema escuro.
5. **Português brasileiro** em toda a interface, conforme o público-alvo.

## Próximos passos (fora da fase 1)

- Substituir `mockData.js` por integrações reais (ex.: API interna, scanners).
- Detalhes de cada finding (código da vulnerabilidade, sugestão de correção).
- Persistência e autenticação quando houver backend.
