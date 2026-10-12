import { ANALISES_HISTORICO } from '../data/mockData.js';
import { formatarData } from '../utils/format.js';
import useSimulacaoCarregamento from '../hooks/useSimulacaoCarregamento.js';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import Badge from '../components/Badge.jsx';
import { EsqueletoCarregando } from '../components/Estados.jsx';
import TrendChart from '../components/charts/TrendChart.jsx';

/* ============================================================
   LILYX — Histórico de análises
   Mostra a evolução das verificações ao longo do tempo e o delta
   de cada análise em relação à anterior, para identificar mudanças
   na quantidade e severidade dos problemas encontrados.
   ============================================================ */

/** Soma das vulnerabilidades de um registro do histórico. */
function totalVulnerabilidades(registro) {
  return registro.critica + registro.alta + registro.media + registro.baixa;
}

/** Gera um texto objetivo comparando duas análises consecutivas. */
function resumoEvolucao(anterior, atual) {
  const observacoes = [];

  const diffCritica = atual.critica - anterior.critica;
  if (diffCritica < 0) observacoes.push(`críticas caíram de ${anterior.critica} para ${atual.critica}`);
  else if (diffCritica > 0) observacoes.push(`críticas subiram de ${anterior.critica} para ${atual.critica}`);
  else observacoes.push(`críticas mantidas em ${atual.critica}`);

  const diffQualidade = atual.qualidade - anterior.qualidade;
  if (diffQualidade > 0) observacoes.push(`score de qualidade subiu ${diffQualidade} ponto(s)`);
  else if (diffQualidade < 0) observacoes.push(`score de qualidade caiu ${Math.abs(diffQualidade)} ponto(s)`);

  return observacoes.join(', ');
}

/** Monta uma célula de variação (ex.: "↓ 1" verde ou "↑ 2" vermelho). */
function Delta({ valor, menorEMelhor = true }) {
  if (valor === 0) return <span className="tendencia tendencia--estavel">＝ 0</span>;
  const melhorou = menorEMelhor ? valor < 0 : valor > 0;
  return (
    <span className={`tendencia ${melhorou ? 'tendencia--melhor' : 'tendencia--pior'}`}>
      {valor < 0 ? '↓ ' : '↑ +'}{Math.abs(valor)}
    </span>
  );
}

export default function History() {
  const carregando = useSimulacaoCarregamento();

  if (carregando) {
    return <EsqueletoCarregando cartoes={2} linhas={6} />;
  }

  const ultima = ANALISES_HISTORICO[ANALISES_HISTORICO.length - 1];
  const anterior = ANALISES_HISTORICO[ANALISES_HISTORICO.length - 2];

  // Tabelinha invertida? Não: exibe cronológico (antigo → recente) para leitura natural.
  const registros = ANALISES_HISTORICO.map((registro, indice) => ({
    ...registro,
    indice,
    delta: indice > 0 ? totalVulnerabilidades(registro) - totalVulnerabilidades(ANALISES_HISTORICO[indice - 1]) : null
  }));

  return (
    <>
      <PageHeader
        titulo="Histórico de análises"
        descricao="Resultados anteriores para acompanhar a evolução das verificações de segurança ao longo do tempo."
      />

      {/* -------- Tendência geral -------- */}
      <div className="grade grade--2col">
        <Card
          titulo="Evolução por severidade"
          subtitulo={`Semanas de ${formatarData(ANALISES_HISTORICO[0].data)} a ${formatarData(ultima.data)}`}
        >
          <TrendChart
            rotulos={ANALISES_HISTORICO.map((registro) => formatarData(registro.data).slice(0, 5))}
            series={[
              { nome: 'Críticas', cor: '#ff2d95', valores: ANALISES_HISTORICO.map((r) => r.critica) },
              { nome: 'Altas', cor: '#ff7a45', valores: ANALISES_HISTORICO.map((r) => r.alta) },
              { nome: 'Médias', cor: '#ffc53d', valores: ANALISES_HISTORICO.map((r) => r.media) },
              { nome: 'Baixas', cor: '#4ade80', valores: ANALISES_HISTORICO.map((r) => r.baixa) }
            ]}
          />
        </Card>

        <Card titulo="Leitura rápida" subtitulo="Comparação entre as duas últimas análises">
          <p className="pagina-subtitulo" style={{ marginTop: 0 }}>
            Desde {formatarData(anterior.data)}, as {resumoEvolucao(anterior, ultima)}.
          </p>
          <div className="lista-status" style={{ marginTop: 14 }}>
            <div className="lista-status__item">
              <span>Total de vulnerabilidades abertas</span>
              <Delta valor={totalVulnerabilidades(ultima) - totalVulnerabilidades(anterior)} />
            </div>
            <div className="lista-status__item">
              <span>Críticas</span>
              <Delta valor={ultima.critica - anterior.critica} />
            </div>
            <div className="lista-status__item">
              <span>Altas</span>
              <Delta valor={ultima.alta - anterior.alta} />
            </div>
            <div className="lista-status__item">
              <span>Score de qualidade (maior é melhor)</span>
              <Delta valor={ultima.qualidade - anterior.qualidade} menorEMelhor={false} />
            </div>
          </div>
        </Card>
      </div>

      {/* -------- Tabela completa de análises anteriores -------- */}
      <Card
        titulo="Análises anteriores"
        subtitulo="Agregados por data da análise, com variação em relação à análise imediatamente anterior"
      >
        <div className="tabela-scroll">
          <table className="tabela">
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col">Críticas</th>
                <th scope="col">Altas</th>
                <th scope="col">Médias</th>
                <th scope="col">Baixas</th>
                <th scope="col">Total</th>
                <th scope="col">Variação do total</th>
                <th scope="col">Qualidade</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro) => (
                <tr key={registro.data}>
                  <td>{formatarData(registro.data)}</td>
                  <td>{registro.critica}</td>
                  <td>{registro.alta}</td>
                  <td>{registro.media}</td>
                  <td>{registro.baixa}</td>
                  <td style={{ fontWeight: 600 }}>{totalVulnerabilidades(registro)}</td>
                  <td>
                    {registro.delta === null ? (
                      <span className="celda-auxiliar">—</span>
                    ) : (
                      <Delta valor={registro.delta} />
                    )}
                  </td>
                  <td className="celda-auxiliar">{registro.qualidade}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* -------- Síntese do período -------- */}
      <Card titulo="Síntese do período monitorado" subtitulo={`Do primeiro registro (${formatarData(ANALISES_HISTORICO[0].data)}) até hoje`}>
        <p className="pagina-subtitulo" style={{ marginTop: 0 }}>
          Ao longo do período, as vulnerabilidades críticas caíram de{' '}
          {ANALISES_HISTORICO[0].critica} para {ultima.critica} e o total aberto passou de{' '}
          {totalVulnerabilidades(ANALISES_HISTORICO[0])} para {totalVulnerabilidades(ultima)}, enquanto o
          score de qualidade evoluiu de {ANALISES_HISTORICO[0].qualidade} para {ultima.qualidade} pontos.
          Os números demonstram a direção esperada do processo: menos problemas graves e mais qualidade a cada ciclo.
        </p>
      </Card>
    </>
  );
}