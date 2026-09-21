import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ocorrencia } from "../types/ocorrencia";
import OcorrenciaCard from "../components/OcorrenciaCard";

type Props = {
  ocorrencias: Ocorrencia[];
  carregando: boolean;
  onVerDetalhe: (ocorrencia: Ocorrencia) => void;
  onNova: () => void;
};

export default function OcorrenciaListScreen({
  ocorrencias,
  carregando,
  onVerDetalhe,
  onNova,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>Velöra</Text>
          <Text style={styles.subtitulo}>Ocorrências de vegetação</Text>
        </View>
        <TouchableOpacity style={styles.botaoNovo} onPress={onNova}>
          <Text style={styles.botaoNovoTexto}>+ Nova</Text>
        </TouchableOpacity>
      </View>

      {carregando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#1E8A4C" />
          <Text style={styles.carregandoTexto}>Carregando ocorrências...</Text>
        </View>
      ) : ocorrencias.length === 0 ? (
        <View style={styles.centro}>
          <Text style={styles.vazioTexto}>Nenhuma ocorrência registrada ainda.</Text>
          <Text style={styles.vazioSubtexto}>
            Toque em "+ Nova" para cadastrar a primeira.
          </Text>
        </View>
      ) : (
        <FlatList
          data={ocorrencias}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <OcorrenciaCard ocorrencia={item} onPress={() => onVerDetalhe(item)} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
    paddingTop: 56,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  subtitulo: {
    fontSize: 13,
    color: "#777777",
    marginTop: 2,
  },
  botaoNovo: {
    backgroundColor: "#1E8A4C",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  botaoNovoTexto: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  lista: {
    paddingBottom: 24,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  carregandoTexto: {
    marginTop: 12,
    color: "#777777",
  },
  vazioTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
  },
  vazioSubtexto: {
    fontSize: 13,
    color: "#999999",
    marginTop: 6,
    textAlign: "center",
  },
});
