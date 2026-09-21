import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ocorrencia } from "../types/ocorrencia";

// Único arquivo do projeto que conversa diretamente com o AsyncStorage.
// As telas nunca importam AsyncStorage — elas usam ocorrenciaService.ts,
// que por sua vez usa este arquivo.
const STORAGE_KEY = "@velora:ocorrencias";

export async function lerOcorrenciasSalvas(): Promise<Ocorrencia[] | null> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json === null) {
      return null; // nada foi salvo ainda (primeira vez que o app roda)
    }
    return JSON.parse(json) as Ocorrencia[];
  } catch (erro) {
    console.error("Erro ao ler ocorrências do AsyncStorage:", erro);
    return null;
  }
}

export async function gravarOcorrencias(ocorrencias: Ocorrencia[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ocorrencias));
  } catch (erro) {
    console.error("Erro ao gravar ocorrências no AsyncStorage:", erro);
  }
}

export async function limparOcorrencias(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (erro) {
    console.error("Erro ao limpar ocorrências do AsyncStorage:", erro);
  }
}
