import { useMemo, useState } from 'react';
import { FINDINGS, PROJETOS, SEVERIDADES, CATEGORIAS, SITUACOES } from '../data/mockData.js';
import { nomeProjeto, formatarData } from '../utils/format.js';
import useSimulacaoCarregamento from '../hooks/useSimulacaoCarregamento.js';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import Badge from '../components/Badge.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { EsqueletoCarregando } from '../components/Estados.jsx';

/* ============================================================
   LILYX — Security Findings
   Consulta e acompanhamento dos problemas identificados.
   Filtros combináveis: projeto, severidade, categoria e situação.
   A filtragem usa `useMemo` para só recalcular quando um filtro muda.
   ============================================================ */

const FILTRO_TUDO = 'todos';

export default function Findings() {
  const carregando = useSimulacaoCarregamento();

  // Estado local de cada filtro (independente, o que permite combiná-los)
  const [filtroProjeto, setFiltroProjeto] = useState(FILTRO_TUDO);
  const [filtroSeveridade, setFiltroSeveridade] = useState(FILTRO_TUDO);
  const [filtroCategoria, setFiltroCategoria] = useState(FILTRO_TUDO);
  const [filtroSituacao, setFiltroSituacao] = useState(FILTRO_TUDO);

  /** Aplica todos os filtros ativos à lista completa de findings. */
  const findingsFiltrados = useMemo(
    () =>
      FINDINGS.filter(
        (finding) =>
          (filtroProjeto === FILTRO_TUDO || finding.projetoId === filtroProjeto) &&
          (filtroSeveridade === FILTRO_TUDO || finding.severidade === filtroSeveridade) &&
          (filtroCategoria === FILTRO_TUDO || finding.categoria === filtroCategoria) &&
          (filtroSituacao === FILTRO_TUDO || finding.situacao === filtroSituacao)
      ),
    [filtroProjeto, filtroSeveridade, filtroCategoria, filtroSituacao]
  );

  const temFiltroAtivo =
    filtroProjeto !== FILTRO_TUDO ||
    filtroSeveridade !== FILTRO_TUDO ||
    filtroCategoria !== FILTRO_TUDO ||
    filtroSituacao !== FILTRO_TUDO;

  /** Limpa todos os filtros de uma vez. */
  function limparFiltros() {
    setFiltroProjeto(FILTRO_TUDO);
    setFiltroSeveridade(FILTRO_TUDO);
    setFiltroCategoria(FILTRO_TUDO);
    setFiltroSituacao(FILTRO_TUDO);
  }

  if (carregando) {
    return <EsqueletoCarregando cartoes={4} linhas={5} />;
  }

  return (
    <>
      <PageHeader
        titulo="Security Findings"
        descricao="Todos os problemas identificados pelas ferramentas, com acompanhamento de situação."
      />

      {/* -------- Painel de filtros -------- */}
      <Card className="filtros" aria-label="Filtros de consulta">
        <div className="campo">
          <label className="campo--rotulo" htmlFor="filtro-projeto">Projeto</label>
          <select id="filtro-projeto" value={filtroProjeto} onChange={(e) => setFiltroProjeto(e.target.value)}>
            <option value={FILTRO_TUDO}>Todos os projetos</option>
            {PROJETOS.map((projeto) => (
              <option key={projeto.id} value={projeto.id}>{projeto.nome}</option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label className="campo--rotulo" htmlFor="filtro-severidade">Severidade</label>
          <select id="filtro-severidade" value={filtroSeveridade} onChange={(e) => setFiltroSeveridade(e.target.value)}>
            <option value={FILTRO_TUDO}>Todas</option>
            {SEVERIDADES.map((severidade) => (
              <option key={severidade} value={severidade}>{severidade}</option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label className="campo--rotulo" htmlFor="filtro-categoria">Categoria</label>
          <select id="filtro-categoria" value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
            <option value={FILTRO_TUDO}>Todas</option>
            {CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>{categoria}</option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label className="campo--rotulo" htmlFor="filtro-situacao">Situação</label>
          <select id="filtro-situacao" value={filtroSituacao} onChange={(e) => setFiltroSituacao(e.target.value)}>
            <option value={FILTRO_TUDO}>Todas</option>
            {SITUACOES.map((situacao) => (
              <option key={situacao} value={situacao}>{situacao}</option>
            ))}
          </select>
        </div>

        <button type="button" className="botao-fantasma" onClick={limparFiltros} disabled={!temFiltroAtivo}>
          Limpar filtros
        </button>
      </Card>

      {/* -------- Resultados -------- */}
      <Card
        titulo="Resultados"
        subtitulo={`${findingsFiltrados.length} de ${FINDINGS.length} ocorrências exibidas`}
      >
        {findingsFiltrados.length === 0 ? (
          <EmptyState
            titulo="Nenhum finding corresponde aos filtros"
            descricao="Nenhuma ocorrência atende à combinação de critérios selecionada. Tente ampliar a busca."
            acao={
              <button type="button" className="botao-fantasma" onClick={limparFiltros}>
                Limpar filtros
              </button>
            }
          />
        ) : (
          <div className="tabela-scroll">
            <table className="tabela">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Projeto</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Severidade</th>
                  <th scope="col">Descrição</th>
                  <th scope="col">Ferramenta</th>
                  <th scope="col">Data da análise</th>
                  <th scope="col">Situação</th>
                </tr>
              </thead>
              <tbody>
                {findingsFiltrados.map((finding) => (
                  <tr key={finding.id}>
                    <td className="celda-id">{finding.id}</td>
                    <td>{nomeProjeto(PROJETOS, finding.projetoId)}</td>
                    <td className="celda-auxiliar">{finding.categoria}</td>
                    <td><Badge tipo="severidade" valor={finding.severidade} /></td>
                    <td className="celda-descricao">{finding.descricao}</td>
                    <td className="celda-auxiliar">{finding.ferramenta}</td>
                    <td className="celda-auxiliar">{formatarData(finding.data)}</td>
                    <td><Badge tipo="situacao" valor={finding.situacao} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}