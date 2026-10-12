import { PIPELINES, ETAPAS_PIPELINE } from '../data/mockData.js';
import { formatarDataHora } from '../utils/format.js';
import useSimulacaoCarregamento from '../hooks/useSimulacaoCarregamento.js';
import PageHeader from '../components/PageHeader.jsx';
import Badge from '../components/Badge.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { EsqueletoCarregando, NotaSimulacao } from '../components/Estados.jsx';
import { IconeCheck, IconeX } from '../components/icons.jsx';

/* ============================================================
   LILYX — Pipeline Monitor
   Exibe as execuções do pipeline automatizado e o estado de cada
   etapa (commit → build → testes → qualidade → segurança → resultado).
   As execuções exibidas são simuladas; as integrações com
   GitHub Actions / Azure Pipelines entram na fase intermediária.
   ============================================================ */

/** Deriva o estado geral de uma execução a partir do estado das etapas. */
function statusGeral(execucao) {
  const etapas = execucao.etapas;
  if (etapas.some((etapa) => etapa.status === 'executando')) return 'executando';
  if (etapas.some((etapa) => etapa.status === 'falha')) return 'falha';
  if (etapas.every((etapa) => etapa.status === 'sucesso')) return 'sucesso';
  return 'pendente';
}

/** Ícone apropriado para o círculo da etapa. */
function simboloEtapa(status) {
  switch (status) {
    case 'sucesso':
      return <IconeCheck tamanho={14} />;
    case 'falha':
      return <IconeX tamanho={14} />;
    case 'executando':
      return <span aria-label="Em execução">●</span>;
    default:
      return <span aria-hidden="true">·</span>;
  }
}

function StepperPipeline({ etapas }) {
  return (
    <ol className="stepper" aria-label="Etapas do pipeline">
      {etapas.map((etapa, indice) => {
        const classeExtra =
          etapa.status === 'sucesso' ? ' stepper__etapa--concluida' : '';
        return (
          <li
            key={ETAPAS_PIPELINE[indice]}
            className={`stepper__etapa stepper__etapa--${etapa.status}${classeExtra}`}
          >
            <span className="stepper__circulo">{simboloEtapa(etapa.status)}</span>
            <p className="stepper__nome">{ETAPAS_PIPELINE[indice]}</p>
            <p className="stepper__duracao">{etapa.duracao}</p>
          </li>
        );
      })}
    </ol>
  );
}

export default function PipelineMonitor() {
  const carregando = useSimulacaoCarregamento();

  if (carregando) {
    return <EsqueletoCarregando cartoes={3} linhas={2} />;
  }

  if (PIPELINES.length === 0) {
    return (
      <>
        <PageHeader titulo="Pipeline Monitor" />
        <EmptyState titulo="Nenhuma execução registrada" descricao="Quando um pipeline for conectado, as execuções aparecerão aqui." />
      </>
    );
  }

  return (
    <>
      <PageHeader
        titulo="Pipeline Monitor"
        descricao="Execuções dos processos automatizados de desenvolvimento e segurança, com o resultado de cada etapa."
      />

      <NotaSimulacao texto="Nenhum CI/CD real foi conectado nesta fase. As execuções abaixo são simuladas localmente para demonstrar a interface (integração com GitHub Actions ou Azure Pipelines prevista para a fase intermediária)." />

      {PIPELINES.map((execucao) => {
        const geral = statusGeral(execucao);
        const etapaFalha = execucao.etapas.find((etapa) => etapa.status === 'falha');
        return (
          <article className="pipeline-item" key={execucao.id}>
            <header className="pipeline-item__cabecalho">
              <Badge tipo="status" valor={geral} />
              <span className="pipeline-item__ref">#{execucao.id} · {execucao.ref}</span>
              <span className="celda-auxiliar">{execucao.gatilho}</span>
              <span className="pipeline-item__meta">iniciado em {formatarDataHora(execucao.inicio)}</span>
            </header>

            <StepperPipeline etapas={execucao.etapas} />

            {etapaFalha && etapaFalha.mensagem && (
              <p className="stepper__mensagem" role="alert">
                <strong>{ETAPAS_PIPELINE[execucao.etapas.indexOf(etapaFalha)]}: </strong>
                {etapaFalha.mensagem}
              </p>
            )}
          </article>
        );
      })}
    </>
  );
}