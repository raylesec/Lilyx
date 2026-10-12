import { classeSeveridade, classeSituacao } from '../utils/format.js';

/* ============================================================
   LILYX — Selo (badge) reutilizável
   type: "severidade" | "situacao" | "status" | "tendencia"
   Ex.: <Badge tipo="severidade" valor="Crítica" />
   ============================================================ */

/** Formata o texto exibido conforme o tipo de selo. */
function textoDisplay(tipo, valor) {
  if (tipo === 'situacao') return valor;
  return valor; // severidades e statuses já vêm legíveis nos dados
}

export default function Badge({ tipo, valor }) {
  let classe;
  switch (tipo) {
    case 'severidade':
      classe = `selo--${classeSeveridade(valor)}`;
      break;
    case 'situacao':
      classe = `selo--${classeSituacao(valor)}`;
      break;
    case 'status':
    case 'tendencia':
      classe = `selo--${String(valor).toLowerCase()}`;
      break;
    default:
      classe = 'selo';
  }

  return (
    <span className={`selo ${classe}`}>
      <span className="selo__ponto" aria-hidden="true" />
      {textoDisplay(tipo, valor)}
    </span>
  );
}