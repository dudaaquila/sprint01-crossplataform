import React, { useState } from "react";
import { Ocorrencia } from "./src/types/ocorrencia";
import { ocorrenciasMock } from "./src/data/ocorrencias";
import OcorrenciaListScreen from "./src/screens/OcorrenciaListScreen";
import NovaOcorrenciaScreen from "./src/screens/NovaOcorrenciaScreen";
import DetalheOcorrenciaScreen from "./src/screens/DetalheOcorrenciaScreen";

type Tela = "lista" | "cadastro" | "detalhe";

export default function App() {
  const [tela, setTela] = useState<Tela>("lista");
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>(ocorrenciasMock);
  const [selecionada, setSelecionada] = useState<Ocorrencia | null>(null);

  function handleSalvar(dados: Omit<Ocorrencia, "id">) {
    const nova: Ocorrencia = {
      ...dados,
      id: String(Date.now()),
    };
    setOcorrencias((prev) => [nova, ...prev]);
    setTela("lista");
  }

  if (tela === "cadastro") {
    return (
      <NovaOcorrenciaScreen
        onSalvar={handleSalvar}
        onVoltar={() => setTela("lista")}
      />
    );
  }

  if (tela === "detalhe" && selecionada) {
    return (
      <DetalheOcorrenciaScreen
        ocorrencia={selecionada}
        onVoltar={() => setTela("lista")}
      />
    );
  }

  return (
    <OcorrenciaListScreen
      ocorrencias={ocorrencias}
      onVerDetalhe={(o) => { setSelecionada(o); setTela("detalhe"); }}
      onNova={() => setTela("cadastro")}
    />
  );
}
