import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ocorrencia, StatusOcorrencia } from "../types/ocorrencia";
import RiscoBadge from "../components/RiscoBadge";

type Props = {
  ocorrencia: Ocorrencia;
  onVoltar: () => void;
};

function formatarStatus(status: StatusOcorrencia): string {
  switch (status) {
    case "aberta":
      return "Aberta";
    case "em_andamento":
      return "Em andamento";
    case "resolvida":
      return "Resolvida";
    default:
      return status;
  }
}

export default function DetalheOcorrenciaScreen({ ocorrencia, onVoltar }: Props) {
  const dataFormatada = new Date(ocorrencia.data).toLocaleString("pt-BR");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <TouchableOpacity onPress={onVoltar} style={styles.voltar}>
        <Text style={styles.voltarTexto}>{"< Voltar"}</Text>
      </TouchableOpacity>

      <View style={styles.cabecalho}>
        <Text style={styles.local}>{ocorrencia.local}</Text>
        <RiscoBadge risco={ocorrencia.risco} />
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Descrição</Text>
        <Text style={styles.texto}>{ocorrencia.descricao}</Text>
      </View>

      <View style={styles.linha}>
        <View style={styles.campo}>
          <Text style={styles.secaoTitulo}>Registrado em</Text>
          <Text style={styles.texto}>{dataFormatada}</Text>
        </View>
        {ocorrencia.operador ? (
          <View style={styles.campo}>
            <Text style={styles.secaoTitulo}>Operador</Text>
            <Text style={styles.texto}>{ocorrencia.operador}</Text>
          </View>
        ) : null}
      </View>

      {ocorrencia.status ? (
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Status</Text>
          <Text style={styles.texto}>{formatarStatus(ocorrencia.status)}</Text>
        </View>
      ) : null}

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>ID interno</Text>
        <Text style={styles.textoDiscreto}>#{ocorrencia.id}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  conteudo: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  voltar: {
    marginBottom: 16,
  },
  voltarTexto: {
    color: "#1E8A4C",
    fontWeight: "600",
  },
  cabecalho: {
    marginBottom: 20,
  },
  local: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 10,
  },
  secao: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  secaoTitulo: {
    fontSize: 12,
    fontWeight: "700",
    color: "#999999",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  texto: {
    fontSize: 15,
    color: "#333333",
    lineHeight: 21,
  },
  textoDiscreto: {
    fontSize: 13,
    color: "#AAAAAA",
  },
  linha: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 14,
  },
  campo: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
  },
});
