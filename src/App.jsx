import { useState } from 'react';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CodeSecurity from './pages/CodeSecurity.jsx';
import Findings from './pages/Findings.jsx';
import PipelineMonitor from './pages/PipelineMonitor.jsx';
import History from './pages/History.jsx';

// Mapa de páginas. A navegação é feita por estado local (sem dependência de
// roteador), o que mantém o projeto simples e fácil de entender nesta fase.
const PAGES = {
  dashboard: Dashboard,
  codeSecurity: CodeSecurity,
  findings: Findings,
  pipelines: PipelineMonitor,
  historico: History
};

export default function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('dashboard');

  const PaginaAtual = PAGES[paginaAtiva] ?? Dashboard;

  return (
    <Layout paginaAtiva={paginaAtiva} aoNavegar={setPaginaAtiva}>
      <PaginaAtual />
    </Layout>
  );
}