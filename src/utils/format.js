/* ============================================================
   LILYX — Funções utilitárias
   Formatação de datas/números e mapeamentos usados na interface.
   Separadas dos componentes para facilitar leitura e testes.
   ============================================================ */

/** Converte uma data ISO ("2026-10-09") ou completa para o formato "09/10/2026". */
export function formatarData(iso) {
  if (!iso) return '—';
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return '—';
  return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/** Converte uma data ISO completa para "09/10 14:32" (data curta + hora). */
export function formatarDataHora(iso) {
  if (!iso) return '—';
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return '—';
  return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) +
    ' ' +
    data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

/** Mapeia a severidade para a classe CSS correspondente (ex.: "Crítica" -> "critica"). */
export function classeSeveridade(severidade) {
  return String(severidade || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/** Mapeia a situação do acompanhamento para a classe CSS (ex.: "Em análise" -> "em-analise"). */
export function classeSituacao(situacao) {
  return String(situacao || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-');
}

/** Cores fixas das severidades, alinhadas aos tokens de CSS. */
export const CORES_SEVERIDADE = {
  'Crítica': '#ff2d95',
  Alta: '#ff7a45',
  Média: '#ffc53d',
  Baixa: '#4ade80'
};

/** Retorna { [severidade]: quantidade } a partir de uma lista de findings. */
export function contarPorSeveridade(findings, apenasAbertos = true) {
  const contagem = { Crítica: 0, Alta: 0, Média: 0, Baixa: 0 };
  for (const finding of findings) {
    if (apenasAbertos && (finding.situacao === 'Corrigido' || finding.situacao === 'Risco aceito')) {
      continue;
    }
    if (finding.severidade in contagem) {
      contagem[finding.severidade] += 1;
    }
  }
  return contagem;
}

/** Nome legível do projeto a partir do id (com fallback seguro). */
export function nomeProjeto(listaProjetos, projetoId) {
  const projeto = listaProjetos.find((p) => p.id === projetoId);
  return projeto ? projeto.nome : projetoId;
}