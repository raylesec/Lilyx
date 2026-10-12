import { useState } from 'react';
import { FINDINGS, PROJETOS, DEPENDENCIAS_VULNERAVEIS, IMAGENS_VERIFICADAS } from '../data/mockData.js';
import { nomeProjeto, formatarDataHora } from '../utils/format.js';
import useSimulacaoCarregamento from '../hooks/useSimulacaoCarregamento.js';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import Badge from '../components/Badge.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { EsqueletoCarregando, NotaSimulacao } from '../components/Estados.jsx';

/* ============================================================
   LILYX — Code Security
   Resultados das verificações de código e dependências.
   Aba por ferramenta (SonarQube, OWASP Dependency-Check, Trivy).

   IMPORTANTE: as integrações reais ainda NÃO existem nesta fase.
   Os blocos exibem dados locais que imitam o formato de saída de
   cada ferramenta, sempre com um aviso explícito de simulação.
   ============================================================ */

const ABAS = [
  { id: 'sonarqube', rotulo: 'SonarQube', descricao: 'Análise estática do código-fonte' },
  { id: 'dependency-check', rotulo: 'OWASP Dependency-Check', descricao: 'Vulnerabilidades em dependências (CVEs)' },
  { id: 'trivy', rotulo: 'Trivy', descricao: 'Segurança de imagens e recursos de contêiner' }
];

export default function CodeSecurity() {
  const carregando = useSimulacaoCarregamento();
  const [abaAtiva, setAbaAtiva] = useState('sonarqube');

  if (carregando) {
    return <EsqueletoCarregando />;
  }

  const abaAtual = ABAS.find((aba) => aba.id === abaAtiva);
  const resultadosSonarqube = FINDINGS.filter((f) => f.ferramenta === 'SonarQube');

  return (
    <>
      <PageHeader
        titulo="Code Security"
        descricao="Resultados organizados por ferramenta: análise estática, dependências vulneráveis e verificações de contêiner."
      />

      <NotaSimulacao />

      {/* Abas por ferramenta */}
      <div className="abas" role="tablist" aria-label="Ferramentas de verificação">
        {ABAS.map((aba) => (
          <button
            key={aba.id}
            type="button"
            role="tab"
            aria-selected={abaAtiva === aba.id}
            className={`aba${abaAtiva === aba.id ? ' aba--ativa' : ''}`}
            onClick={() => setAbaAtiva(aba.id)}
          >
            {aba.rotulo}
          </button>
        ))}
      </div>

      <p className="pagina-subtitulo" style={{ marginTop: -8, marginBottom: 4 }}>{abaAtual.descricao}</p>

      {/* ------------------------- SonarQube ------------------------- */}
      {abaAtiva === 'sonarqube' && (
        <Card
          titulo="Problemas identificados na análise estática"
          subtitulo={`${resultadosSonarqube.length} ocorrências registradas (simuladas)`}
        >
          {resultadosSonarqube.length === 0 ? (
            <EmptyState
              titulo="Nenhum problema identificado"
              descricao="Quando uma análise real for conectada, os problemas do SonarQube aparecerão aqui."
            />
          ) : (
            <div className="tabela-scroll">
              <table className="tabela">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Projeto</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Severidade</th>
                    <th scope="col">Situação</th>
                  </tr>
                </thead>
                <tbody>
                  {resultadosSonarqube.map((finding) => (
                    <tr key={finding.id}>
                      <td className="celda-id">{finding.id}</td>
                      <td>{nomeProjeto(PROJETOS, finding.projetoId)}</td>
                      <td className="celda-auxiliar">{finding.categoria}</td>
                      <td className="celda-descricao">{finding.descricao}</td>
                      <td><Badge tipo="severidade" valor={finding.severidade} /></td>
                      <td><Badge tipo="situacao" valor={finding.situacao} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* ------------------- OWASP Dependency-Check ------------------ */}
      {abaAtiva === 'dependency-check' && (
        <Card
          titulo="Dependências com vulnerabilidade conhecida"
          subtitulo="Comparação das versões em uso com o banco de CVEs (simulado)"
        >
          {DEPENDENCIAS_VULNERAVEIS.length === 0 ? (
            <EmptyState
              titulo="Nenhuma dependência vulnerável"
              descricao="Todos os pacotes verificados estão sem CVEs conhecidas."
            />
          ) : (
            <div className="tabela-scroll">
              <table className="tabela">
                <thead>
                  <tr>
                    <th scope="col">Pacote</th>
                    <th scope="col">Versão em uso</th>
                    <th scope="col">CVE</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">CVSS</th>
                    <th scope="col">Severidade</th>
                    <th scope="col">Versão sugerida</th>
                    <th scope="col">Projeto</th>
                  </tr>
                </thead>
                <tbody>
                  {DEPENDENCIAS_VULNERAVEIS.map((dep) => (
                    <tr key={`${dep.pacote}-${dep.cve}`}>
                      <td className="celda-id">{dep.pacote}</td>
                      <td className="celda-auxiliar">{dep.versao}</td>
                      <td className="celda-id">{dep.cve}</td>
                      <td className="celda-descricao">{dep.titulo}</td>
                      <td className="celda-auxiliar">{dep.cvss.toFixed(1)}</td>
                      <td><Badge tipo="severidade" valor={dep.severidade} /></td>
                      <td className="celda-auxiliar">{dep.versaoSugerida}</td>
                      <td>{nomeProjeto(PROJETOS, dep.projetoId)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* ---------------------------- Trivy --------------------------- */}
      {abaAtiva === 'trivy' && (
        <Card
          titulo="Imagens de contêiner verificadas"
          subtitulo="CVEs encontradas nas imagens construídas pelo pipeline (simulado)"
        >
          {IMAGENS_VERIFICADAS.length === 0 ? (
            <EmptyState
              titulo="Nenhuma imagem verificada"
              descricao="Construa e publique uma imagem no pipeline para vê-la analisada aqui."
            />
          ) : (
            <div className="tabela-scroll">
              <table className="tabela">
                <thead>
                  <tr>
                    <th scope="col">Imagem</th>
                    <th scope="col">Base</th>
                    <th scope="col">Críticas</th>
                    <th scope="col">Altas</th>
                    <th scope="col">Médias</th>
                    <th scope="col">Baixas</th>
                    <th scope="col">Verificado em</th>
                  </tr>
                </thead>
                <tbody>
                  {IMAGENS_VERIFICADAS.map((imagem) => (
                    <tr key={imagem.imagem}>
                      <td className="celda-id">{imagem.imagem}</td>
                      <td className="celda-auxiliar">{imagem.base}</td>
                      <td>{imagem.criticas}</td>
                      <td>{imagem.altas}</td>
                      <td>{imagem.medias}</td>
                      <td>{imagem.baixas}</td>
                      <td className="celda-auxiliar">{formatarDataHora(imagem.verificadoEm)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </>
  );
}