# Velöra — Gestão de Vegetação Rodoviária (Motiva)

App mobile feito em **React Native + Expo + TypeScript** para registrar, consultar e classificar por risco ocorrências de vegetação ao longo das rodovias da **Motiva**.

---

## Integrantes

| _Daniel Castro Sanches_ | _RM563333_ |
| _Gabriel Rodrigues Barbosa_ | _RM566475_ |
| _Guilherme Martins dos Santos_ | _RM566570_ |
| _Maria Eduarda de Áquila Amaral_ | _RM563783_ |
| _Matheus Cordeiro Alves_ | _RM563107_ |
| _Matheus Vilela Silveira_ | _RM564989_ |  

## Links

- **Repositório:** https://github.com/dudaaquila/sprint01-crossplataform
- **Vídeo de demonstração (YouTube, não listado):** _link_

---

## O problema

Vegetação alta perto da pista reduz a visibilidade da sinalização e é um risco de segurança viária. Hoje, esse tipo de ocorrência costuma ser repassado por relatos informais ou planilhas, sem padrão e sem priorização.

- **Usuário:** operador de campo da Motiva.
- **Ação principal:** registrar, pelo celular e no momento em que encontra, uma ocorrência de vegetação (trecho da rodovia, descrição e nível de risco) e consultá-la depois na lista.
- **Resultado:** as ocorrências ficam padronizadas, classificadas em **baixo, médio ou alto risco** e continuam salvas no aparelho mesmo depois de fechar o app.

---

## Stack

- React Native
- Expo (SDK 51)
- TypeScript
- `@react-native-async-storage/async-storage` (persistência local)

---

## Como rodar

Pré-requisito: **Node.js 20 ou superior** instalado.

```bash
git clone https://github.com/dudaaquila/sprint01-crossplataform.git
cd sprint01-crossplataform
npm install
npx expo start
```

Com o servidor Expo rodando, escolha uma forma de abrir o app:

- **Navegador (mais simples):** pressione `w` no terminal.
- **Emulador Android / Simulador iOS:** pressione `a` ou `i` no terminal.
- **Celular com Expo Go:** escaneie o QR code. O Expo Go precisa ser compatível com o SDK 51; se o aplicativo avisar de incompatibilidade, use o navegador ou um emulador.

Se algo não carregar direito, limpe o cache com `npx expo start -c`.

---

## Comportamento esperado

1. **Abrir o app:** aparece a lista de ocorrências. Na primeira execução, a lista vem com 3 ocorrências de exemplo (uma de cada nível de risco).
2. **Criar ocorrência:** toque em **+ Nova**, preencha o **trecho da rodovia** e a **descrição**, escolha o **risco** (baixo, médio ou alto), opcionalmente informe o operador, e toque em **Salvar ocorrência**. Os campos de trecho e descrição são obrigatórios.
3. **Ver na lista:** o app volta para a lista e a nova ocorrência já aparece no topo, sem precisar reiniciar.
4. **Abrir o detalhe:** toque em qualquer card para ver descrição, data/hora do registro, operador, status e risco.
5. **Fechar e reabrir:** feche o app por completo e abra de novo (no navegador, recarregue a página). As ocorrências cadastradas continuam na lista.

### Classificação de risco

O nível de risco aparece como um selo colorido (`RiscoBadge`) em dois lugares: no **card da lista** e no **topo da tela de detalhe**.

| Risco | Cor | Significado |
|---|---|---|
| Baixo | Verde | Vegetação sob controle, manutenção de rotina |
| Médio | Amarelo | Vegetação próxima à pista, sem obstrução direta |
| Alto | Vermelho | Vegetação invadindo acostamento/sinalização, atendimento prioritário |

---

## Estrutura de pastas

```
App.tsx                              # estado global, carga inicial e navegação entre telas
src/
  screens/
    OcorrenciaListScreen.tsx         # lista (carregando / vazia / com cards)
    NovaOcorrenciaScreen.tsx         # formulário de cadastro
    DetalheOcorrenciaScreen.tsx      # detalhe de uma ocorrência
  components/
    OcorrenciaCard.tsx               # card da lista
    RiscoBadge.tsx                   # selo colorido de risco
  types/
    ocorrencia.ts                    # tipo Ocorrencia e tipos auxiliares
  data/
    ocorrencias.ts                   # mock usado só na primeira execução
  services/
    storage.ts                       # único arquivo que acessa o AsyncStorage
    ocorrenciaService.ts             # carregar e adicionar ocorrências
```

A navegação é feita com `useState` em `App.tsx` (telas `lista`, `cadastro` e `detalhe`), sem biblioteca de navegação.

---

## Tipo `Ocorrencia`

Definido em `src/types/ocorrencia.ts`:

```ts
export type NivelRisco = "baixo" | "medio" | "alto";
export type StatusOcorrencia = "aberta" | "em_andamento" | "resolvida";

export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string;        // trecho da rodovia
  risco: NivelRisco;
  data: string;         // ISO string, gerada ao salvar
  operador?: string;
  foto?: string;
  status?: StatusOcorrencia;
};
```

Onde é usado:

- `App.tsx`: `useState<Ocorrencia[]>` guarda a lista em memória.
- `services/ocorrenciaService.ts` e `services/storage.ts`: leem e gravam `Ocorrencia[]`.
- `data/ocorrencias.ts`: o mock inicial é tipado como `Ocorrencia[]`.
- `components/OcorrenciaCard.tsx`: recebe uma `Ocorrencia` por props.
- `screens/DetalheOcorrenciaScreen.tsx`: recebe a `Ocorrencia` selecionada.
- `screens/NovaOcorrenciaScreen.tsx`: monta os dados do formulário (`NovaOcorrenciaInput`, que é `Ocorrencia` sem `id` e `data`).

---

## Como os dados são persistidos

Os dados são salvos no aparelho com **AsyncStorage**, como um JSON da lista inteira, sob a chave `@velora:ocorrencias`. Só `services/storage.ts` acessa o AsyncStorage; as telas chamam `ocorrenciaService`.

- **Ao abrir o app:** `App.tsx` chama `carregarOcorrencias()` em um `useEffect`. Se já existe algo salvo, usa isso. Se é a primeira execução (nada salvo), usa o mock de `data/ocorrencias.ts` e já o grava no storage. Depois disso, o mock não é mais lido.
- **Ao salvar uma ocorrência:** `adicionarOcorrencia()` gera o `id` (`Date.now()`) e a `data` (`new Date().toISOString()`), coloca a nova ocorrência no topo da lista e grava a lista atualizada no AsyncStorage. O estado da tela é atualizado em seguida.
- **Ao reabrir o app:** o mesmo carregamento inicial lê o AsyncStorage, que já contém a ocorrência criada.

Para voltar ao estado inicial (3 ocorrências de exemplo), limpe os dados do app no aparelho ou, no navegador, os dados do site (Local Storage).
