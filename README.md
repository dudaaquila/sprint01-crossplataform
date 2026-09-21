# Velöra — Gestão Inteligente de Vegetação Rodoviária

App mobile desenvolvido em React Native com Expo para operadores de campo da
**Motiva** registrarem, consultarem e classificarem por risco ocorrências de
vegetação excessiva ao longo das rodovias gerenciadas pela concessionária.

Vegetação alta perto da pista reduz a visibilidade da sinalização e é um
risco real de segurança viária. O Velöra permite que o operador registre a
ocorrência em campo, pelo celular, no momento em que a encontra — sem depender
de planilhas ou relatos informais — e que a equipe priorize o atendimento
pelo nível de risco (baixo, médio, alto).

---

## Integrantes

|Daniel Castro Sanches |rm563333|
|Gabriel Rodrigues Barbosa |rm564475|
|Guilherme Martins dos Santos |rm566570|
|Maria Eduarda de Áquila Amaral |rm563783|
|Matheus Cordeiro Alves |rm563107|
|Matheus Vilela Silveira |rm563989 |

## Link do repositório

`https://github.com/dudaaquila/sprint01-crossplataform` 

---

## Como rodar o projeto

### Pré-requisitos

- Node.js 20+
- App **Expo Go** no celular (ou emulador Android/iOS), ou navegador para rodar via `--web`

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/dudaaquila/sprint01-crossplataform.git
cd sprint01-crossplataform

# 2. Instale as dependências (inclui o AsyncStorage, novo nesta sprint)
npm install

# 3. Inicie o servidor Expo
npx expo start

# 4. Pressione "w" para rodar no navegador
```

---

## O que o app resolve

O **Velöra** permite que operadores de campo da Motiva:

- **Visualizem** a lista de ocorrências registradas, com indicador visual de risco (alto, médio, baixo) em cada card;
- **Cadastrem** novas ocorrências informando trecho da rodovia, descrição, operador responsável e nível de risco;
- **Consultem o detalhe completo** de cada ocorrência, incluindo data/hora do registro e status;
- **Confiem que o registro não se perde**: os dados persistem no dispositivo mesmo depois de fechar e reabrir o app.

---

## Estrutura do projeto

```
src/
  screens/
    OcorrenciaListScreen.tsx     # Lista de ocorrências (com estado de carregando/vazio)
    NovaOcorrenciaScreen.tsx     # Formulário de cadastro
    DetalheOcorrenciaScreen.tsx  # Detalhe completo de uma ocorrência
  components/
    OcorrenciaCard.tsx           # Card reutilizável da lista
    RiscoBadge.tsx                # Badge de nível de risco (baixo/médio/alto)
  types/
    ocorrencia.ts                 # Tipagem central (Ocorrencia, NivelRisco, StatusOcorrencia)
  data/
    ocorrencias.ts                 # Mock usado só na primeira execução, para popular o storage
  services/
    storage.ts                     # Único arquivo que fala diretamente com o AsyncStorage
    ocorrenciaService.ts           # Regras de negócio: carregar e adicionar ocorrências
App.tsx                             # Raiz do app — estado, navegação por tela e carga inicial
```

As telas **nunca** importam `AsyncStorage` diretamente — elas chamam funções
de `services/ocorrenciaService.ts`, que por sua vez usa `services/storage.ts`.
Isso mantém a tela livre de lógica de persistência.

---

## Modelagem de dados

```ts
export type NivelRisco = "baixo" | "medio" | "alto";
export type StatusOcorrencia = "aberta" | "em_andamento" | "resolvida";

export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string;      // trecho da rodovia
  risco: NivelRisco;
  data: string;        // ISO string, gerada no momento do cadastro
  operador?: string;
  foto?: string;
  status?: StatusOcorrencia;
};
```

---

## Como os dados são persistidos

A partir desta sprint o app usa **AsyncStorage**
(`@react-native-async-storage/async-storage`) para gravar a lista completa de
ocorrências como um JSON, sob a chave `@velora:ocorrencias`.

Fluxo:

1. **Abrir o app** → `App.tsx` chama `carregarOcorrencias()` (em
   `ocorrenciaService.ts`) dentro de um `useEffect`.
2. **Primeira execução** (nada salvo ainda) → o service usa o array mockado
   de `data/ocorrencias.ts` como carga inicial **e já grava esse mock no
   AsyncStorage**. Dali em diante, o mock nunca mais é lido — quem manda é o
   storage.
3. **Cadastrar uma ocorrência** → `NovaOcorrenciaScreen` chama `onSalvar`,
   que aciona `adicionarOcorrencia()`: gera `id` (`Date.now()`) e `data`
   (`new Date().toISOString()`), insere a nova ocorrência no topo da lista e
   grava a lista inteira de volta no AsyncStorage.
4. **Reabrir o app** → o mesmo `useEffect` do passo 1 lê o AsyncStorage, que
   já contém a ocorrência cadastrada — os dados sobrevivem ao fechar/reabrir.

---

## Fluxo do app

1. **Lista**: tela inicial, mostra um spinner enquanto carrega do
   AsyncStorage; depois exibe os cards com trecho, descrição, data e badge de
   risco.
2. **Cadastro**: toque em "+ Nova" abre o formulário; ao salvar, a ocorrência
   é persistida e o app volta para a lista, já atualizada, sem recarregar o
   app inteiro.
3. **Detalhe**: toque em qualquer card abre a tela de detalhe completo
   (descrição, data/hora, operador, status, risco).
4. **Reabrir o app**: feche o app completamente e abra de novo — a lista
   aparece exatamente como estava, incluindo qualquer ocorrência cadastrada
   na sessão anterior.

---

## Navegação

A navegação continua feita por `useState` (tela `"lista" | "cadastro" |
"detalhe"` em `App.tsx`), sem biblioteca externa — conforme permitido pelo
enunciado da sprint.

---

## Tecnologias

- React Native + Expo SDK 51
- TypeScript
- `@react-native-async-storage/async-storage` para persistência local
- `useState` / `useEffect` para estado e carga inicial
- Navegação condicional por estado (sem biblioteca externa)
