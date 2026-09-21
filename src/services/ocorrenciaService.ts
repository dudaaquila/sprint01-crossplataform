import { Ocorrencia, NovaOcorrenciaInput } from "../types/ocorrencia";
import { ocorrenciasMock } from "../data/ocorrencias";
import { lerOcorrenciasSalvas, gravarOcorrencias } from "./storage";

// Regra de carregamento:
// - Se já existe algo no AsyncStorage, usa isso (é o que faz os dados
//   sobreviverem a fechar/reabrir o app).
// - Se é a primeira vez que o app roda (storage vazio), usa o mock como
//   carga inicial e já grava esse mock no storage, para que da próxima vez
//   em diante a leitura venha sempre do storage, nunca mais do mock.
export async function carregarOcorrencias(): Promise<Ocorrencia[]> {
  const salvas = await lerOcorrenciasSalvas();
  if (salvas !== null) {
    return salvas;
  }
  await gravarOcorrencias(ocorrenciasMock);
  return ocorrenciasMock;
}

// Cria uma nova ocorrência, adiciona à lista atual e persiste a lista
// inteira no AsyncStorage. Retorna a lista já atualizada para a tela usar
// no setState.
export async function adicionarOcorrencia(
  ocorrenciasAtuais: Ocorrencia[],
  dados: NovaOcorrenciaInput
): Promise<Ocorrencia[]> {
  const novaOcorrencia: Ocorrencia = {
    ...dados,
    id: Date.now(),
    data: new Date().toISOString(),
  };

  const atualizadas = [novaOcorrencia, ...ocorrenciasAtuais];
  await gravarOcorrencias(atualizadas);
  return atualizadas;
}
