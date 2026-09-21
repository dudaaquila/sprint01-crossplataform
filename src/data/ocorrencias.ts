import { Ocorrencia } from "../types/ocorrencia";

// Carga inicial usada apenas na PRIMEIRA execução do app, quando ainda não
// existe nada gravado no AsyncStorage. A partir do primeiro cadastro (ou do
// primeiro carregamento), quem manda é o storage — este mock nunca é lido
// de novo depois disso (ver src/services/ocorrenciaService.ts).
export const ocorrenciasMock: Ocorrencia[] = [
  {
    id: 1,
    descricao:
      "Vegetação alta invadindo o acostamento e reduzindo a visibilidade da sinalização.",
    local: "Rodovia Anchieta, km 45",
    risco: "alto",
    data: "2026-08-10T09:30:00.000Z",
    operador: "Carlos Silva",
    status: "aberta",
  },
  {
    id: 2,
    descricao:
      "Mato crescido próximo à faixa de rolamento, ainda sem obstrução direta da pista.",
    local: "Rodovia Imigrantes, km 12",
    risco: "medio",
    data: "2026-08-08T14:00:00.000Z",
    operador: "Fernanda Souza",
    status: "em_andamento",
  },
  {
    id: 3,
    descricao: "Vegetação sob controle, apenas necessitando de manutenção de rotina.",
    local: "Rodovia dos Bandeirantes, km 78",
    risco: "baixo",
    data: "2026-08-01T11:15:00.000Z",
    operador: "João Pereira",
    status: "resolvida",
  },
];
