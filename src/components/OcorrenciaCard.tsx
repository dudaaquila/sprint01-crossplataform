import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ocorrencia } from "../types/ocorrencia";
import RiscoBadge from "./RiscoBadge";

type Props = {
  ocorrencia: Ocorrencia;
  onPress: () => void;
};

export default function OcorrenciaCard({ ocorrencia, onPress }: Props) {
  const dataFormatada = new Date(ocorrencia.data).toLocaleDateString("pt-BR");

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cabecalho}>
        <Text style={styles.local} numberOfLines={1}>
          {ocorrencia.local}
        </Text>
        <RiscoBadge risco={ocorrencia.risco} />
      </View>

      <Text style={styles.descricao} numberOfLines={2}>
        {ocorrencia.descricao}
      </Text>

      <View style={styles.rodape}>
        <Text style={styles.meta}>{dataFormatada}</Text>
        {ocorrencia.operador ? (
          <Text style={styles.meta}>{ocorrencia.operador}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  local: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    flex: 1,
    marginRight: 8,
  },
  descricao: {
    fontSize: 14,
    color: "#555555",
    lineHeight: 20,
    marginBottom: 10,
  },
  rodape: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meta: {
    fontSize: 12,
    color: "#999999",
  },
});
