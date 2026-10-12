/* ============================================================
   LILYX — Estados de carregamento e nota de simulação
   EsqueletoCarregando: placeholder animado enquanto "os dados chegam".
   NotaSimulacao: aviso visual de que os resultados são demonstrativos
   (exigência da fase inicial: nunca afirmar que análises reais rodaram).
   ============================================================ */

import { IconeInfo } from './icons.jsx';

export function EsqueletoCarregando({ cartoes = 4, linhas = 3 }) {
  return (
    <div aria-busy="true" aria-label="Carregando dados" style={{ paddingTop: 22 }}>
      <div className="grade grade--kpis" style={{ marginTop: 0 }}>
        {Array.from({ length: cartoes }).map((_, i) => (
          <div key={i} className="esqueleto esqueleto--cartao" />
        ))}
      </div>
      <div className="cartao" style={{ marginTop: 18 }}>
        {Array.from({ length: linhas }).map((_, i) => (
          <div key={i} className="esqueleto esqueleto--linha" style={{ width: `${88 - i * 14}%` }} />
        ))}
      </div>
    </div>
  );
}

export function NotaSimulacao({ texto }) {
  return (
    <p className="nota-simulacao" role="note">
      <IconeInfo tamanho={16} />
      <span>
        <strong>Dados demonstrativos.</strong>{' '}
        {texto ||
          'Nenhum pipeline real foi conectado nesta fase: os resultados exibidos são simulados localmente para fins de apresentação.'}
      </span>
    </p>
  );
}