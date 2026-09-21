// Tipagem central da Ocorrencia. Mantém o formato pedido pelo enunciado
// (id, descricao, local, risco, data) e acrescenta campos opcionais do
// domínio da Motiva (operador, foto, status), sem quebrar o tipo base.

export type NivelRisco = "baixo" | "medio" | "alto";

export type StatusOcorrencia = "aberta" | "em_andamento" | "resolvida";

export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string; // trecho da rodovia onde a ocorrência foi registrada
  risco: NivelRisco;
  data: string; // data/hora de registro, em formato ISO (new Date().toISOString())
  operador?: string;
  foto?: string;
  status?: StatusOcorrencia;
};

// Dados enviados pelo formulário de cadastro. O id e a data são gerados
// pelo service no momento em que a ocorrência é persistida.
export type NovaOcorrenciaInput = Omit<Ocorrencia, "id" | "data">;
