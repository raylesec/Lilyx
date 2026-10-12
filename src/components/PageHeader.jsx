/* ============================================================
   LILYX — Cabeçalho padrão das páginas
   Título + descrição + selo de dados demonstrativos.
   ============================================================ */

export default function PageHeader({ titulo, descricao }) {
  return (
    <header className="pagina-cabecalho">
      <div>
        <h1 className="pagina-titulo">{titulo}</h1>
        {descricao && <p className="pagina-subtitulo">{descricao}</p>}
      </div>
      <span className="selo-demo">Dados demonstrativos</span>
    </header>
  );
}