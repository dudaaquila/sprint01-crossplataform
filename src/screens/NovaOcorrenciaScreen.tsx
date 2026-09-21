import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NivelRisco, NovaOcorrenciaInput } from "../types/ocorrencia";

type Props = {
  onSalvar: (dados: NovaOcorrenciaInput) => void;
  onVoltar: () => void;
};

const NIVEIS: { valor: NivelRisco; label: string }[] = [
  { valor: "baixo", label: "Baixo" },
  { valor: "medio", label: "Médio" },
  { valor: "alto", label: "Alto" },
];

export default function NovaOcorrenciaScreen({ onSalvar, onVoltar }: Props) {
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [operador, setOperador] = useState("");
  const [risco, setRisco] = useState<NivelRisco>("medio");

  function handleSalvar() {
    if (!descricao.trim() || !local.trim()) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha o trecho da rodovia e a descrição antes de salvar."
      );
      return;
    }

    onSalvar({
      descricao: descricao.trim(),
      local: local.trim(),
      operador: operador.trim() || undefined,
      risco,
      status: "aberta",
    });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
        <TouchableOpacity onPress={onVoltar} style={styles.voltar}>
          <Text style={styles.voltarTexto}>{"< Voltar"}</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Nova ocorrência</Text>

        <Text style={styles.rotulo}>Trecho da rodovia</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Rodovia Anchieta, km 45"
          value={local}
          onChangeText={setLocal}
        />

        <Text style={styles.rotulo}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.inputMultilinha]}
          placeholder="Descreva a vegetação encontrada e o risco observado"
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.rotulo}>Operador (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={operador}
          onChangeText={setOperador}
        />

        <Text style={styles.rotulo}>Nível de risco</Text>
        <View style={styles.opcoesRisco}>
          {NIVEIS.map((nivel) => (
            <TouchableOpacity
              key={nivel.valor}
              style={[
                styles.opcaoRisco,
                risco === nivel.valor && styles.opcaoRiscoSelecionada,
              ]}
              onPress={() => setRisco(nivel.valor)}
            >
              <Text
                style={[
                  styles.opcaoRiscoTexto,
                  risco === nivel.valor && styles.opcaoRiscoTextoSelecionado,
                ]}
              >
                {nivel.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
          <Text style={styles.botaoSalvarTexto}>Salvar ocorrência</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  titulo: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 20,
  },
  rotulo: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555555",
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E2E4E8",
  },
  inputMultilinha: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  opcoesRisco: {
    flexDirection: "row",
    gap: 10,
  },
  opcaoRisco: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E4E8",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  opcaoRiscoSelecionada: {
    backgroundColor: "#1E8A4C",
    borderColor: "#1E8A4C",
  },
  opcaoRiscoTexto: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555555",
  },
  opcaoRiscoTextoSelecionado: {
    color: "#FFFFFF",
  },
  botaoSalvar: {
    backgroundColor: "#1E8A4C",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 28,
  },
  botaoSalvarTexto: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
});
