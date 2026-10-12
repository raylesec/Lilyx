/* ============================================================
   LILYX — Ícones (SVG inline)
   Ícones desenhados com traço (stroke) para manter consistência
   visual. Não usamos biblioteca externa: são apenas paths simples.
   ============================================================ */

const Base = ({ children, tamanho = 18, ...props }) => (
  <svg
    width={tamanho}
    height={tamanho}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

/** Painel / grade — Dashboard */
export const IconePainel = (props) => (
  <Base {...props}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </Base>
);

/** Escudo — Code Security */
export const IconeEscudo = (props) => (
  <Base {...props}>
    <path d="M12 3l7 3v5c0 4.5-3 7.9-7 9-4-1.1-7-4.5-7-9V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </Base>
);

/** Lista com lupa — Security Findings */
export const IconeAchados = (props) => (
  <Base {...props}>
    <path d="M4 6h12M4 12h9M4 18h7" />
    <circle cx="17.5" cy="16.5" r="3.5" />
    <path d="M20 19l1.5 1.5" />
  </Base>
);

/** Ramo com nós — Pipeline Monitor */
export const IconePipeline = (props) => (
  <Base {...props}>
    <circle cx="6" cy="5" r="2.2" />
    <circle cx="6" cy="19" r="2.2" />
    <circle cx="18" cy="12" r="2.2" />
    <path d="M6 7.2v9.6M6 12h9.8" />
  </Base>
);

/** Relógio com seta — Histórico */
export const IconeHistorico = (props) => (
  <Base {...props}>
    <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6L3.5 8.5" />
    <path d="M3.5 3.5v5h5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);

export const IconeCheck = (props) => (
  <Base {...props}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Base>
);

export const IconeX = (props) => (
  <Base {...props}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
);

export const IconeAlerta = (props) => (
  <Base {...props}>
    <path d="M12 3.5L21.5 20h-19L12 3.5z" />
    <path d="M12 10v4.5M12 17.4v.1" />
  </Base>
);

export const IconeInfo = (props) => (
  <Base {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 7.6v.1" />
  </Base>
);

/** Busca vazia — estado vazio */
export const IconeBuscaVazia = (props) => (
  <Base {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5M8.5 11h5" />
  </Base>
);