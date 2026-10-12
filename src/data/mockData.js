/* ============================================================
   LILYX — Dados FICTÍCIOS DE DEMONSTRAÇÃO
   ------------------------------------------------------------
   ATENÇÃO: todos os valores deste arquivo são simulados localmente.
   Eles servem para demonstrar a interface na fase inicial do projeto.
   Nenhuma análise real de segurança foi executada sobre esses dados.
   Na fase intermediária, eles serão substituídos por dados reais
   vindos das integrações (SonarQube, OWASP Dependency-Check, Trivy)
   e/ou pelo backend Node.js.
   ============================================================ */

export const SEVERIDADES = ['Crítica', 'Alta', 'Média', 'Baixa'];

export const SITUACOES = ['Aberto', 'Em análise', 'Corrigido', 'Risco aceito'];

export const CATEGORIAS = [
  'Injeção SQL',
  'XSS',
  'Dependência vulnerável',
  'Segredo em código',
  'Configuração insegura',
  'Falha de lógica',
  'Permissão excessiva'
];

export const PROJETOS = [
  { id: 'portal', nome: 'Portal do Cliente', stack: 'React + Node.js' },
  { id: 'api-pedidos', nome: 'API de Pedidos', stack: 'Node.js + PostgreSQL' },
  { id: 'checkout', nome: 'Serviço de Checkout', stack: 'Java + Spring Boot' },
  { id: 'app-movel', nome: 'App Móvel', stack: 'Kotlin' }
];

/* Situação das verificações por projeto (última execução simulada).
   gate: "aprovado" | "reprovado" — representa o resultado final do pipeline. */
export const VERIFICACOES_POR_PROJETO = [
  {
    projetoId: 'portal',
    ferramentas: { SonarQube: 'ok', 'OWASP Dependency-Check': '2 alertas', Trivy: 'ok' },
    gate: 'aprovado',
    ultimaExecucao: '2026-10-09T14:32:00Z'
  },
  {
    projetoId: 'api-pedidos',
    ferramentas: { SonarQube: '3 alertas', 'OWASP Dependency-Check': '1 alerta', Trivy: '2 alertas' },
    gate: 'reprovado',
    ultimaExecucao: '2026-10-10T09:15:00Z'
  },
  {
    projetoId: 'checkout',
    ferramentas: { SonarQube: '1 alerta', 'OWASP Dependency-Check': 'ok', Trivy: 'ok' },
    gate: 'aprovado',
    ultimaExecucao: '2026-10-08T18:47:00Z'
  },
  {
    projetoId: 'app-movel',
    ferramentas: { SonarQube: 'ok', 'OWASP Dependency-Check': 'ok', Trivy: 'não aplicado' },
    gate: 'aprovado',
    ultimaExecucao: '2026-10-07T11:03:00Z'
  }
];

/* Achados de segurança (Security Findings).
   Campos: id, projetoId, categoria, severidade, descricao, ferramenta,
   data (ISO), situacao. */
export const FINDINGS = [
  { id: 'LSX-0114', projetoId: 'api-pedidos', categoria: 'Segredo em código', severidade: 'Crítica', descricao: 'Token de banco de dados encontrado em arquivo de configuração versionado.', ferramenta: 'SonarQube', data: '2026-10-10T09:15:00Z', situacao: 'Em análise' },
  { id: 'LSX-0113', projetoId: 'api-pedidos', categoria: 'Dependência vulnerável', severidade: 'Alta', descricao: 'Pacote axios@0.21.1 com CVE-2021-3749 (expressão regular ineficiente na lib follow-redirects).', ferramenta: 'OWASP Dependency-Check', data: '2026-10-10T09:16:00Z', situacao: 'Aberto' },
  { id: 'LSX-0112', projetoId: 'api-pedidos', categoria: 'Configuração insegura', severidade: 'Alta', descricao: 'Imagem node:20-alpine expõe serviço em rede não isolada no perfil de produção.', ferramenta: 'Trivy', data: '2026-10-10T09:18:00Z', situacao: 'Aberto' },
  { id: 'LSX-0111', projetoId: 'portal', categoria: 'Injeção SQL', severidade: 'Crítica', descricao: 'Consulta SQL montada com concatenação de entrada do usuário em relatório de pedidos.', ferramenta: 'SonarQube', data: '2026-10-09T14:32:00Z', situacao: 'Em análise' },
  { id: 'LSX-0110', projetoId: 'portal', categoria: 'Dependência vulnerável', severidade: 'Média', descricao: 'Pacote lodash@4.17.20 com CVE-2021-23337 (ReDoS). Corrigir para 4.17.21 ou superior.', ferramenta: 'OWASP Dependency-Check', data: '2026-10-09T14:33:00Z', situacao: 'Aberto' },
  { id: 'LSX-0109', projetoId: 'portal', categoria: 'Dependência vulnerável', severidade: 'Média', descricao: 'minimist@1.2.5 com CVE-2021-44906 (poluição de protótipo).', ferramenta: 'OWASP Dependency-Check', data: '2026-10-09T14:33:00Z', situacao: 'Risco aceito' },
  { id: 'LSX-0108', projetoId: 'portal', categoria: 'XSS', severidade: 'Baixa', descricao: 'Uso de dangerouslySetInnerHTML sem sanitização em banner promocional.', ferramenta: 'SonarQube', data: '2026-10-09T14:34:00Z', situacao: 'Corrigido' },
  { id: 'LSX-0107', projetoId: 'checkout', categoria: 'Falha de lógica', severidade: 'Alta', descricao: 'Cupom de desconto aplicado antes da validação do valor mínimo da compra.', ferramenta: 'SonarQube', data: '2026-10-08T18:47:00Z', situacao: 'Aberto' },
  { id: 'LSX-0106', projetoId: 'checkout', categoria: 'Configuração insegura', severidade: 'Média', descricao: 'Endpoint de healthcheck expõe lista de dependências sem controle de acesso.', ferramenta: 'SonarQube', data: '2026-10-08T18:48:00Z', situacao: 'Corrigido' },
  { id: 'LSX-0105', projetoId: 'app-movel', categoria: 'Permissão excessiva', severidade: 'Baixa', descricao: 'Permissão de localização solicitada no escopo sempre, quando bastaria o escopo em uso.', ferramenta: 'SonarQube', data: '2026-10-07T11:03:00Z', situacao: 'Risco aceito' },
  { id: 'LSX-0104', projetoId: 'app-movel', categoria: 'Segredo em código', severidade: 'Média', descricao: 'Chave de API de analytics embutida como string literal no código-fonte.', ferramenta: 'SonarQube', data: '2026-10-07T11:04:00Z', situacao: 'Corrigido' },
  { id: 'LSX-0103', projetoId: 'api-pedidos', categoria: 'Injeção SQL', severidade: 'Alta', descricao: 'Ordem de classificação (ORDER BY) montada por parâmetro da query string.', ferramenta: 'SonarQube', data: '2026-10-05T16:22:00Z', situacao: 'Corrigido' },
  { id: 'LSX-0102', projetoId: 'checkout', categoria: 'XSS', severidade: 'Média', descricao: 'Nome do cartão ecoado no recibo sem escape adequado.', ferramenta: 'SonarQube', data: '2026-10-03T10:11:00Z', situacao: 'Corrigido' },
  { id: 'LSX-0101', projetoId: 'portal', categoria: 'Configuração insegura', severidade: 'Baixa', descricao: 'Header X-Content-Type-Options ausente na resposta do servidor.', ferramenta: 'Trivy', data: '2026-09-29T08:40:00Z', situacao: 'Corrigido' }
];

/* Dependências com vulnerabilidade conhecida (simulação do output do
   OWASP Dependency-Check). */
export const DEPENDENCIAS_VULNERAVEIS = [
  { pacote: 'axios', versao: '0.21.1', cve: 'CVE-2021-3749', titulo: 'ReDoS na lib follow-redirects', cvss: 7.5, severidade: 'Alta', versaoSugerida: '>= 1.12.1', projetoId: 'api-pedidos' },
  { pacote: 'lodash', versao: '4.17.20', cve: 'CVE-2021-23337', titulo: 'ReDoS em toNumber/stripTags', cvss: 5.3, severidade: 'Média', versaoSugerida: '>= 4.17.21', projetoId: 'portal' },
  { pacote: 'minimist', versao: '1.2.5', cve: 'CVE-2021-44906', titulo: 'Poluição de protótipo', cvss: 6.1, severidade: 'Média', versaoSugerida: '>= 1.2.6', projetoId: 'portal' }
];

/* Imagens de contêiner verificadas (simulação do output do Trivy). */
export const IMAGENS_VERIFICADAS = [
  { imagem: 'lilyx/api-pedidos:build-214', base: 'node:20-alpine', criticas: 0, altas: 2, medias: 3, baixas: 0, verificadoEm: '2026-10-10T09:18:00Z' },
  { imagem: 'lilyx/portal-web:build-88', base: 'nginx:1.27-alpine', criticas: 0, altas: 0, medias: 1, baixas: 0, verificadoEm: '2026-10-09T14:35:00Z' },
  { imagem: 'lilyx/checkout-service:dev', base: 'eclipse-temurin:17-jre', criticas: 1, altas: 0, medias: 2, baixas: 1, verificadoEm: '2026-10-08T18:50:00Z' }
];

/* Execuções de pipeline (simulação de um CI/CD com etapas de segurança). */
export const ETAPAS_PIPELINE = [
  'Alterações recebidas',
  'Build da aplicação',
  'Execução de testes',
  'Análise de qualidade',
  'Verificações de segurança',
  'Resultado final'
];

export const PIPELINES = [
  {
    id: 49,
    ref: 'feature/pagamentos-recorrentes',
    gatilho: 'Pull request #128',
    inicio: '2026-10-11T07:42:00Z',
    etapas: [
      { status: 'sucesso', duracao: '4s', mensagem: null },
      { status: 'sucesso', duracao: '1m 12s', mensagem: null },
      { status: 'sucesso', duracao: '2m 05s', mensagem: null },
      { status: 'sucesso', duracao: '48s', mensagem: null },
      { status: 'executando', duracao: '…', mensagem: null },
      { status: 'pendente', duracao: '—', mensagem: null }
    ]
  },
  {
    id: 48,
    ref: 'main',
    gatilho: 'Push em 10/10',
    inicio: '2026-10-10T09:10:00Z',
    etapas: [
      { status: 'sucesso', duracao: '3s', mensagem: null },
      { status: 'sucesso', duracao: '1m 02s', mensagem: null },
      { status: 'sucesso', duracao: '1m 58s', mensagem: null },
      { status: 'sucesso', duracao: '45s', mensagem: null },
      { status: 'sucesso', duracao: '1m 31s', mensagem: null },
      { status: 'sucesso', duracao: '2s', mensagem: null }
    ]
  },
  {
    id: 47,
    ref: 'hotfix/login-duas-etapas',
    gatilho: 'Push em 08/10',
    inicio: '2026-10-08T18:41:00Z',
    etapas: [
      { status: 'sucesso', duracao: '5s', mensagem: null },
      { status: 'sucesso', duracao: '1m 40s', mensagem: null },
      { status: 'sucesso', duracao: '2m 12s', mensagem: null },
      { status: 'sucesso', duracao: '52s', mensagem: null },
      { status: 'falha', duracao: '1m 09s', mensagem: 'Gate reprovado: 1 vulnerabilidade crítica aberta (LSX-0111).' },
      { status: 'pendente', duracao: '—', mensagem: null }
    ]
  }
];

/* Histórico semanal de análises (agregados simulados, mais recente por último).
   Usado no Dashboard e no módulo Histórico para mostrar a evolução. */
export const ANALISES_HISTORICO = [
  { data: '2026-08-31', critica: 4, alta: 6, media: 9, baixa: 5, qualidade: 61 },
  { data: '2026-09-07', critica: 3, alta: 5, media: 8, baixa: 5, qualidade: 64 },
  { data: '2026-09-14', critica: 3, alta: 5, media: 7, baixa: 4, qualidade: 67 },
  { data: '2026-09-21', critica: 2, alta: 6, media: 7, baixa: 4, qualidade: 70 },
  { data: '2026-09-28', critica: 2, alta: 5, media: 6, baixa: 3, qualidade: 73 },
  { data: '2026-10-05', critica: 2, alta: 5, media: 5, baixa: 3, qualidade: 76 },
  { data: '2026-10-09', critica: 1, alta: 4, media: 4, baixa: 2, qualidade: 79 },
  { data: '2026-10-10', critica: 1, alta: 4, media: 4, baixa: 2, qualidade: 81 }
];

/* Indicadores de qualidade do código (média dos últimos relatórios, simulada). */
export const QUALIDADE_CODIGO = {
  score: 81,               // nota de qualidade geral (0–100)
  coberturaTestes: 74,     // % de cobertura de testes
  debitoTecnico: '3h 40m', // esforço estimado para corrigir o restante
  duplicacao: 3.2          // % de código duplicado
};