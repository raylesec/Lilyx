import { useId } from 'react';

/* ============================================================
   LILYX — Logotipo (emblema escudo neon)
   ------------------------------------------------------------
   Escudo "crest" em traço rosa-neon com efeito de brilho, contendo
   uma X estilizada no padrão de circuito (linhas com nós terminais)
   e faíscas de energia escapando pela lateral direita.
   Também funciona isolado como ícone da aplicação (favicon.svg).
   ============================================================ */

export default function Logo({ tamanho = 40, comNome = false, subtitulo }) {
  // useId evita conflito de id do gradiente/filtro quando vários logos existem na página.
  const id = useId();
  const nomeGrad = `lsx-grad-${id}`;
  const nomeGlow = `lsx-glow-${id}`;

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <svg
        width={tamanho}
        height={tamanho}
        viewBox="0 0 48 48"
        fill="none"
        role="img"
        aria-label="Logotipo LILYX"
      >
        <defs>
          <linearGradient id={nomeGrad} x1="12" y1="6" x2="38" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF8FC7" />
            <stop offset="0.5" stopColor="#FF2D95" />
            <stop offset="1" stopColor="#FF2D95" />
          </linearGradient>
          {/* Brilho neon: cópia desfocada por trás do traço nítido */}
          <filter id={nomeGlow} x="-45%" y="-45%" width="190%" height="190%">
            <feGaussianBlur stdDeviation="1.15" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Emblema com halo: escudo + X de circuito + nós terminais */}
        <g
          filter={`url(#${nomeGlow})`}
          stroke={`url(#${nomeGrad})`}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Escudo (crest) */}
          <path
            d="M24 4 L10 9 Q8 9.8 8 12 L8 24 Q8 34 15 40.5 Q19.5 44 24 45 Q28.5 44 33 40.5 Q40 34 40 24 L40 12 Q40 9.8 38 9 Z"
            strokeWidth="2.2"
          />
          {/* X no padrão de circuito (duas linhas cruzadas) */}
          <path d="M17.5 16.5 L30.5 30" strokeWidth="3.2" />
          <path d="M30.5 16.5 L17.5 30" strokeWidth="3.2" />
          {/* Nós terminais (pontos de circuito) */}
          <g fill="#FF8FC7" stroke="none">
            <circle cx="17.5" cy="16.5" r="1.9" />
            <circle cx="30.5" cy="16.5" r="1.9" />
            <circle cx="17.5" cy="30" r="1.9" />
            <circle cx="30.5" cy="30" r="1.9" />
          </g>
        </g>

        {/* Faíscas de energia escapando pela lateral direita */}
        <g stroke={`url(#${nomeGrad})`} strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
          <path d="M42 19h4" />
          <path d="M42 23.5h4.6" />
          <path d="M42 28h3.4" />
        </g>
      </svg>

      {comNome && (
        <span
          style={{ display: 'inline-flex', flexDirection: 'column', gap: 2, lineHeight: 1 }}
        >
          <span className="sidebar__nome" style={{ fontSize: Math.max(15, tamanho * 0.34) }}>
            LI<span>LYX</span>
          </span>
          {subtitulo && <span className="sidebar__versao">{subtitulo}</span>}
        </span>
      )}
    </span>
  );
}