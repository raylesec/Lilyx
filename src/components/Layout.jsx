import Logo from './Logo.jsx';
import { IconePainel, IconeEscudo, IconeAchados, IconePipeline, IconeHistorico } from './icons.jsx';

/* ============================================================
   LILYX — Layout principal
   Estrutura: barra lateral de navegação + área de conteúdo.
   A navegação é controlada pelo estado em App.jsx.
   ============================================================ */

const ITENS_NAVIGACAO = [
  { id: 'dashboard', rotulo: 'Dashboard', icone: IconePainel },
  { id: 'codeSecurity', rotulo: 'Code Security', icone: IconeEscudo },
  { id: 'findings', rotulo: 'Security Findings', icone: IconeAchados },
  { id: 'pipelines', rotulo: 'Pipeline Monitor', icone: IconePipeline },
  { id: 'historico', rotulo: 'Histórico', icone: IconeHistorico }
];

export default function Layout({ paginaAtiva, aoNavegar, children }) {
  return (
    <div className="app">
      <aside className="sidebar" aria-label="Navegação principal">
        <div className="sidebar__marca">
          <Logo tamanho={44} comNome subtitulo="Plataforma de segurança de software" />
        </div>

        <nav className="sidebar__navegacao" aria-label="Seções da plataforma">
          {ITENS_NAVIGACAO.map(({ id, rotulo, icone: Icone }) => (
            <button
              key={id}
              type="button"
              className={`nav-item${paginaAtiva === id ? ' nav-item--ativo' : ''}`}
              aria-current={paginaAtiva === id ? 'page' : undefined}
              onClick={() => aoNavegar(id)}
            >
              <span className="nav-item__icone">
                <Icone tamanho={18} />
              </span>
              {rotulo}
            </button>
          ))}
        </nav>

        <div className="sidebar__rodape">
          <strong>Fase inicial — dados demonstrativos.</strong>
          <br />
          Os resultados exibidos são simulados localmente e não representam
          análises reais executadas.
        </div>
      </aside>

      <main className="app__conteudo">{children}</main>
    </div>
  );
}