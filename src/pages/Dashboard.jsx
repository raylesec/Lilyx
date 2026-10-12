import {
  FINDINGS,
  PROJETOS,
  VERIFICACOES_POR_PROJETO,
  ANALISES_HISTORICO,
  QUALIDADE_CODIGO,
  SEVERIDADES
} from '../data/mockData.js';
import { contarPorSeveridade, nomeProjeto, formatarDataHora } from '../utils/format.js';
import useSimulacaoCarregamento from '../hooks/useSimulacaoCarregamento.js';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import StatCard from '../components/StatCard.jsx';
import Badge from '../components/Badge.jsx';
import { EsqueletoCarregando } from '../components/Estados.jsx';
import BarChart from '../components/charts/BarChart.jsx';
import TrendChart from '../components/charts/TrendChart.jsx';
import { IconeEscudo, IconeAlerta, IconeCheck, IconePainel } from '../components/icons.jsx';

/* ============================================================
   LILYX — Security Dashboard
   Visão geral: KPIs, distribuição por severidade, situação das
   verificações por projeto, últimas análises e tendência.
   Todos os números são DERIVADOS dos dados fictícios em
   src/data/mockData.js (assim a UI e os dados nunca divergem).
   ============================================================ */

/** Situações que ainda representam trabalho pendente. */
const SITUACOES_ABERTAS = ['Aberto', 'Em análise'];

/** Calcula a variação entre duas entradas do histórico (para as setas de tendência). */
function calcularTendencia(anoAtual, anoAnterior, menorEMelhor = true) {
  if (anoAtual === anoAnterior) return { tipo: 'estavel', texto: '＝ 0' };
  const diferenca = anoAtual - anoAnterior;
  const melhorou = menorEMelhor ? diferenca < 0 : diferenca > 0;
  return {
    tipo: melhorou ? 'melhor' : 'pior',
    texto: `${diferenca > 0 ? '↑ +' : '↓ '}${diferenca}`
  };
}

export default function Dashboard() {
  const carregando = useSimulacaoCarregamento();

  if (carregando) {
    return <EsqueletoCarregando />;
  }

  // ---------- Indicadores derivados (lógica central do painel) ----------
  const abertos = FINDINGS.filter((f) => SITUACOES_ABERTAS.includes(f.situacao));
  const porSeveridade = contarPorSeveridade(FINDINGS);
  const criticasAltas = porSeveridade.Crítica + porSeveridade.Alta;

  const aprovados = VERIFICACOES_POR_PROJETO.filter((v) => v.gate === 'aprovado').length;
  const taxaAprovacao = Math.round((aprovados / VERIFICACOES_POR_PROJETO.length) * 100);

  const ultimaSemana = ANALISES_HISTORICO[ANALISES_HISTORICO.length - 1];
  const semanaAnterior = ANALISES_HISTORICO[ANALISES_HISTORICO.length - 2];
  const totalAbertoHistorico = ultimaSemana.critica + ultimaSemana.alta + ultimaSemana.media + ultimaSemana.baixa;
  const totalAnteriorHistorico = semanaAnterior.critica + semanaAnterior.alta + semanaAnterior.media + semanaAnterior.baixa;

  const distribuicao = SEVERIDADES.map((sev) => ({ rotulo: sev, valor: porSeveridade[sev] }));

  const ultimasAnalises = [...ANALISES_HISTORICO].reverse().slice(0, 5);
  const rotulosTendencia = ANALISES_HISTORICO.map((registro) => formatarDataHora(registro.data));

  return (
    <>
      <PageHeader
        titulo="Security Dashboard"
        descricao="Visão geral da segurança dos projetos monitorados: vulnerabilidades abertas, situação das verificações e evolução recente."
      />

      {/* -------- KPIs principais -------- */}
      <div className="grade grade--kpis">
        <StatCard
          icone={IconeEscudo}
          valor={abertos.length}
          titulo="Vulnerabilidades abertas"
          detalhe={`${porSeveridade.Baixa} baixa(s) incluída(s)`}
          tendencia={calcularTendencia(totalAbertoHistorico, totalAnteriorHistorico)}
        />
        <StatCard
          icone={IconeAlerta}
          valor={criticasAltas}
          titulo="Críticas e altas abertas"
          detalhe="priorize o tratamento"
          tendencia={calcularTendencia(
            ultimaSemana.critica + ultimaSemana.alta,
            semanaAnterior.critica + semanaAnterior.alta
          )}
        />
        <StatCard
          icone={IconeCheck}
          valor={`${taxaAprovacao}%`}
          titulo="Verificações aprovadas"
          detalhe={`${aprovados} de ${VERIFICACOES_POR_PROJETO.length} projetos no gate`}
        />
        <StatCard
          icone={IconePainel}
          valor={QUALIDADE_CODIGO.score}
          titulo="Score de qualidade do código"
          detalhe="média dos últimos relatórios"
          tendencia={calcularTendencia(ultimaSemana.qualidade, semanaAnterior.qualidade, false)}
        />
      </div>

      {/* -------- Distribuição + situação das verificações -------- */}
      <div className="grade grade--2col">
        <Card titulo="Distribuição por severidade" subtitulo="Somente vulnerabilidades com situação aberta">
          <BarChart itens={distribuicao} />
        </Card>

        <Card
          titulo="Situação das verificações"
          subtitulo="Última execução de cada projeto"
          acao={
            <button type="button" className="botao-fantasma">
              Executar novamente
            </button>
          }
        >
          <div className="lista-status">
            {VERIFICACOES_POR_PROJETO.map((verificacao) => (
              <div className="lista-status__item" key={verificacao.projetoId}>
                <div className="lista-status__info">
                  <strong>{nomeProjeto(PROJETOS, verificacao.projetoId)}</strong>
                  <span>
                    {Object.entries(verificacao.ferramentas)
                      .map(([ferramenta, situacao]) => `${ferramenta}: ${situacao}`)
                      .join(' · ')}
                  </span>
                </div>
                <Badge tipo="status" valor={verificacao.gate} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* -------- Últimas análises + tendência + qualidade -------- */}
      <div className="grade grade--2col">
        <Card titulo="Últimas análises" subtitulo="Agregados semanais das verificações executadas">
          <div className="tabela-scroll">
            <table className="tabela">
              <thead>
                <tr>
                  <th scope="col">Data</th>
                  <th scope="col">Críticas</th>
                  <th scope="col">Altas</th>
                  <th scope="col">Médias</th>
                  <th scope="col">Baixas</th>
                  <th scope="col">Qualidade</th>
                </tr>
              </thead>
              <tbody>
                {ultimasAnalises.map((analise) => (
                  <tr key={analise.data}>
                    <td>{formatarDataHora(analise.data)}</td>
                    <td>{analise.critica > 0 ? <Badge tipo="severidade" valor="Crítica" /> : '0'}</td>
                    <td>{analise.alta}</td>
                    <td>{analise.media}</td>
                    <td>{analise.baixa}</td>
                    <td className="celda-auxiliar">{analise.qualidade}/100</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card titulo="Histórico de resultados" subtitulo="Evolução semanal (últimas 8 semanas)">
            <TrendChart
              rotulos={rotulosTendencia}
              series={[
                { nome: 'Críticas', cor: '#ff2d95', valores: ANALISES_HISTORICO.map((r) => r.critica) },
                { nome: 'Altas', cor: '#ff7a45', valores: ANALISES_HISTORICO.map((r) => r.alta) },
                { nome: 'Médias + Baixas', cor: '#ffc53d', valores: ANALISES_HISTORICO.map((r) => r.media + r.baixa) }
              ]}
            />
          </Card>

          <Card titulo="Indicadores de qualidade do código" subtitulo="Média dos últimos relatórios">
            <div className="lista-status">
              {[
                { rotulo: 'Cobertura de testes', valor: `${QUALIDADE_CODIGO.coberturaTestes}%` },
                { rotulo: 'Debt técnico estimado', valor: QUALIDADE_CODIGO.debitoTecnico },
                { rotulo: 'Código duplicado', valor: `${QUALIDADE_CODIGO.duplicacao}%` }
              ].map((item) => (
                <div className="lista-status__item" key={item.rotulo}>
                  <span className="lista-status__info">{item.rotulo}</span>
                  <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{item.valor}</strong>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}