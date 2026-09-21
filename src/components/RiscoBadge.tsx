import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NivelRisco } from "../types/ocorrencia";

const CONFIG: Record<NivelRisco, { label: string; bg: string; fg: string }> = {
  baixo: { label: "Risco baixo", bg: "#E3F5E9", fg: "#1E8A4C" },
  medio: { label: "Risco médio", bg: "#FFF4DB", fg: "#B8790A" },
  alto: { label: "Risco alto", bg: "#FDE4E4", fg: "#C62828" },
};

type Props = {
  risco: NivelRisco;
};

export default function RiscoBadge({ risco }: Props) {
  const cfg = CONFIG[risco];
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <View style={[styles.ponto, { backgroundColor: cfg.fg }]} />
      <Text style={[styles.texto, { color: cfg.fg }]}>{cfg.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ponto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  texto: {
    fontSize: 12,
    fontWeight: "600",
  },
});
