import { CORES_SEVERIDADE } from '../../utils/format.js';

/* ============================================================
   LILYX — Gráfico de barras horizontais (CSS puro)
   Mostra a distribuição por severidade sem dependências externas.
   itens: [{ rotulo, valor, cor }]
   ============================================================ */

export default function BarChart({ itens }) {
  const maximo = Math.max(1, ...itens.map((item) => item.valor));

  return (
    <div className="barras">
      {itens.map((item) => {
        const percentual = Math.round((item.valor / maximo) * 100);
        const cor = item.cor || CORES_SEVERIDADE[item.rotulo];
        return (
          <div className="barras__linha" key={item.rotulo}>
            <span>{item.rotulo}</span>
            <div
              className="barras__rastro"
              role="img"
              aria-label={`${item.rotulo}: ${item.valor} ocorrência(s)`}
            >
              <div
                className="barras__preenchimento"
                style={{ width: `${percentual}%`, background: cor }}
              />
            </div>
            <span className="barras__valor">{item.valor}</span>
          </div>
        );
      })}
    </div>
  );
}