import Card from './Card.jsx';

/* ============================================================
   LILYX — Cartão de indicador (KPI)
   Exibe um número principal com título, detalhe e tendência
   opcional ("melhor" | "pior" | "estavel").
   ============================================================ */

export default function StatCard({ icone: Icone, valor, titulo, detalhe, tendencia }) {
  const classeTendencia = tendencia ? `tendencia tendencia--${tendencia.tipo}` : '';
  const rotuloTendencia =
    tendencia?.tipo === 'melhor' ? 'em relação à última análise' :
    tendencia?.tipo === 'pior' ? 'em relação à última análise' : '';

  return (
    <Card className="kpi">
      <div className="kpi__linha-destaque" aria-hidden="true" />
      {Icone && (
        <div className="kpi__icone">
          <Icone tamanho={19} />
        </div>
      )}
      <p className="kpi__valor">{valor}</p>
      <p className="kpi__titulo">{titulo}</p>
      {(detalhe || tendencia) && (
        <p className="kpi__detalhe">
          {detalhe}
          {tendencia && (
            <span className={classeTendencia} title={rotuloTendencia}>
              {tendencia.texto}
            </span>
          )}
        </p>
      )}
    </Card>
  );
}