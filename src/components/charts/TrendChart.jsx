/* ============================================================
   LILYX — Gráfico de linhas (SVG puro)
   Mostra a evolução de uma ou mais séries ao longo do tempo
   (ex.: número de vulnerabilidades por semana no Histórico).
   Sem bibliotecas: apenas polilinhas calculadas a partir dos dados.

   props:
   - rotulos: rótulos do eixo X (datas curtas)
   - series: [{ nome, cor, valores }]
   ============================================================ */

const LARGURA = 660;
const ALTURA = 230;
const MARGEM = { esquerda: 34, direita: 14, topo: 16, base: 30 };

export default function TrendChart({ rotulos, series }) {
  const larguraGrafico = LARGURA - MARGEM.esquerda - MARGEM.direita;
  const alturaGrafico = ALTURA - MARGEM.topo - MARGEM.base;

  // Maior valor entre todas as séries (mínimo 1 para evitar divisão por zero)
  const todosOsValores = series.flatMap((serie) => serie.valores);
  const maximo = Math.max(1, ...todosOsValores);
  const pontos = Math.max(2, rotulos.length);

  /** Converte índice/valor em coordenadas (x, y) do gráfico. */
  const posicao = (indice, valor) => ({
    x: MARGEM.esquerda + (indice / (pontos - 1)) * larguraGrafico,
    y: MARGEM.topo + (1 - valor / maximo) * alturaGrafico
  });

  // Linhas de grade horizontais (5 divisões)
  const divisoes = 4;
  const linhasGrade = Array.from({ length: divisoes + 1 }, (_, i) => {
    const valor = Math.round((maximo / divisoes) * i);
    const { y } = posicao(0, valor);
    return { valor, y };
  });

  return (
    <figure>
      <svg
        className="tendencia-svg"
        viewBox={`0 0 ${LARGURA} ${ALTURA}`}
        role="img"
        aria-label={`Evolução de: ${series.map((s) => s.nome).join(', ')}`}
      >
        {/* Grade horizontal + etiquetas do eixo Y */}
        {linhasGrade.map((linha) => (
          <g key={linha.y}>
            <line
              x1={MARGEM.esquerda}
              x2={LARGURA - MARGEM.direita}
              y1={linha.y}
              y2={linha.y}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
            />
            <text
              x={MARGEM.esquerda - 8}
              y={linha.y + 3.5}
              textAnchor="end"
              fontSize="10"
              fill="#a1a1aa"
            >
              {linha.valor}
            </text>
          </g>
        ))}

        {/* Rótulos do eixo X (rotacionados para não sobrepor) */}
        {rotulos.map((rotulo, i) => {
          const { x } = posicao(i, 0);
          return (
            <text
              key={`${rotulo}-${i}`}
              x={x}
              y={ALTURA - 8}
              textAnchor="middle"
              fontSize="10"
              fill="#a1a1aa"
            >
              {rotulo}
            </text>
          );
        })}

        {/* Polilinhas + marcadores das séries */}
        {series.map((serie) => {
          const coordenadas = serie.valores.map((valor, i) => posicao(i, valor));
          const caminho = coordenadas.map((p) => `${p.x},${p.y}`).join(' ');
          const ultimo = coordenadas[coordenadas.length - 1];
          return (
            <g key={serie.nome}>
              <polyline
                points={caminho}
                fill="none"
                stroke={serie.cor}
                strokeWidth="2.4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {coordenadas.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="3" fill="#0b0b0f" stroke={serie.cor} strokeWidth="2" />
              ))}
              <circle cx={ultimo.x} cy={ultimo.y} r="4.5" fill={serie.cor} />
            </g>
          );
        })}
      </svg>

      <div className="legendas">
        {series.map((serie) => (
          <span className="legendas__item" key={serie.nome}>
            <span className="legendas__traco" style={{ background: serie.cor }} aria-hidden="true" />
            {serie.nome}
          </span>
        ))}
      </div>
    </figure>
  );
}