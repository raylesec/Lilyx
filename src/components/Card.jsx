/* ============================================================
   LILYX — Cartão reutilizável
   Enquadra um bloco de conteúdo com título opcional e ação
   (ex.: botão) no canto superior direito.
   ============================================================ */

export default function Card({ titulo, subtitulo, acao, children, className = '' }) {
  return (
    <section className={`cartao ${className}`} aria-label={titulo || undefined}>
      {(titulo || acao) && (
        <header className="cartao__cabecalho">
          <div>
            {titulo && <h2 className="cartao__titulo">{titulo}</h2>}
            {subtitulo && <p className="cartao__subtitulo">{subtitulo}</p>}
          </div>
          {acao}
        </header>
      )}
      {children}
    </section>
  );
}