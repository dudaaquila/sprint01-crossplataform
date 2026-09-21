import React, { useEffect, useState } from "react";
import { Ocorrencia, NovaOcorrenciaInput } from "./src/types/ocorrencia";
import { carregarOcorrencias, adicionarOcorrencia } from "./src/services/ocorrenciaService";
import OcorrenciaListScreen from "./src/screens/OcorrenciaListScreen";
import NovaOcorrenciaScreen from "./src/screens/NovaOcorrenciaScreen";
import DetalheOcorrenciaScreen from "./src/screens/DetalheOcorrenciaScreen";

type Tela = "lista" | "cadastro" | "detalhe";

export default function App() {
  const [tela, setTela] = useState<Tela>("lista");
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [selecionada, setSelecionada] = useState<Ocorrencia | null>(null);

  // Roda uma vez, ao abrir o app: busca o que está persistido no
  // AsyncStorage (via services/ocorrenciaService). É isso que faz os dados
  // sobreviverem a fechar e reabrir o app.
  useEffect(() => {
    (async () => {
      const dados = await carregarOcorrencias();
      setOcorrencias(dados);
      setCarregando(false);
    })();
  }, []);

  async function handleSalvar(dados: NovaOcorrenciaInput) {
    const atualizadas = await adicionarOcorrencia(ocorrencias, dados);
    setOcorrencias(atualizadas);
    setTela("lista");
  }

  if (tela === "cadastro") {
    return (
      <NovaOcorrenciaScreen onSalvar={handleSalvar} onVoltar={() => setTela("lista")} />
    );
  }

  if (tela === "detalhe" && selecionada) {
    return (
      <DetalheOcorrenciaScreen ocorrencia={selecionada} onVoltar={() => setTela("lista")} />
    );
  }

  return (
    <OcorrenciaListScreen
      ocorrencias={ocorrencias}
      carregando={carregando}
      onVerDetalhe={(o) => {
        setSelecionada(o);
        setTela("detalhe");
      }}
      onNova={() => setTela("cadastro")}
    />
  );
}
