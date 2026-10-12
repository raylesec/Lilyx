import { useEffect, useState } from 'react';

/* ============================================================
   LILYX — Hook: simulação de carregamento
   Na fase inicial os dados vêm de um módulo local (instantâneo).
   Para demonstrar o tratamento do estado "carregando" na UI,
   este hook devolve `true` por alguns milissegundos ao montar a página.
   Quando houver um backend real, basta trocar por um fetch + estado.
   ============================================================ */

export default function useSimulacaoCarregamento(duracaoMs = 450) {
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const temporizador = setTimeout(() => setCarregando(false), duracaoMs);
    return () => clearTimeout(temporizador);
  }, [duracaoMs]);

  return carregando;
}