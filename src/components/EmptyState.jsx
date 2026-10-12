import { IconeBuscaVazia } from './icons.jsx';

/* ============================================================
   LILYX — Estado vazio
   Aparece quando uma lista não tem resultados (ex.: filtros sem
   correspondência). Mensagem clara + ação sugerida.
   ============================================================ */

export default function EmptyState({
  titulo = 'Nenhum resultado encontrado',
  descricao = 'Ajuste os filtros e tente novamente.',
  acao
}) {
  return (
    <div className="estado-vazio">
      <div className="estado-vazio__icone">
        <IconeBuscaVazia tamanho={22} />
      </div>
      <h3 className="estado-vazio__titulo">{titulo}</h3>
      <p className="estado-vazio__descricao">{descricao}</p>
      {acao}
    </div>
  );
}