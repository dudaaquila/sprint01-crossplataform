# Velöra — Gestão Inteligente de Vegetação Rodoviária

App mobile desenvolvido em React Native com Expo para operadores de campo registrarem e acompanharem ocorrências de vegetação excessiva ao longo das rodovias gerenciadas pela Motiva.

---

## Como rodar o projeto

### Pré-requisitos

- Node.js 20+
- Expo CLI (`npm install -g expo-cli`)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/dudaaquila/sprint01-crossplataform.git
cd sprint01-crossplataform

# 2. Instale as dependências
npm install

# 3. Inicie o servidor Expo
npx expo start --web

# 4. Pressione W para abrir no navegador
```

---

## O que o app faz

O **Velöra** permite que operadores de campo:

- **Visualizem** a lista de ocorrências registradas, com indicadores visuais de risco (alto, médio, baixo)
- **Registrem** novas ocorrências informando descrição, trecho, operador e nível de risco
- **Consultem** o detalhe completo de cada ocorrência

---

## Estrutura do projeto

src/

screens/

OcorrenciaListScreen.tsx    # Tela principal com lista de ocorrências

NovaOcorrenciaScreen.tsx    # Formulário de nova ocorrência

DetalheOcorrenciaScreen.tsx # Detalhes de uma ocorrência selecionada

components/

OcorrenciaCard.tsx          # Card reutilizável da lista

RiscoBadge.tsx              # Badge de nível de risco

types/

ocorrencia.ts               # Tipagens TypeScript

data/

ocorrencias.ts              # Dados mockados

App.tsx                         # Raiz do app — gerencia estado e navegação

---

## Como os dados estão mockados

Os dados iniciais ficam em `src/data/ocorrencias.ts` como um array estático. Ao registrar uma nova ocorrência, ela é adicionada ao estado local com `useState` e aparece imediatamente no topo da lista. Os dados não persistem entre sessões — isso é intencional para o MVP.

---

## Tecnologias

- React Native + Expo SDK 51
- TypeScript
- useState para gerenciamento de estado
- Navegação condicional por estado (sem biblioteca externa)
