# Custo de IA — Scoring dos políticos

Estimativa de custo para rodar o **scoring por IA** (análise de afinidade por eixo)
de **todos os políticos** da base, usando **Claude Sonnet**.

> Base real (servidor `192.168.0.172:5432`, db `politicando`): **2.224 políticos /
> 2.225 candidaturas**. O scoring faz **1 chamada de LLM por candidatura**.

## Distribuição da base

| Cargo | Candidaturas |
|---|---|
| Deputado Estadual | 1.035 |
| Deputado Federal | 1.027 |
| Senador | 108 |
| Governador | 27 |
| Deputado Distrital | 24 |
| Presidente | 4 |
| **Total** | **2.225** |

Origem dos dados: 1.627 TSE histórico (2022) + 595 mandatários (Câmara/Senado) + 3 pré-candidatos.

## Premissas de custo

| Item | Valor |
|---|---|
| Modelo | Claude **Sonnet** |
| Preço input | US$ 3,00 / milhão de tokens |
| Preço output | US$ 15,00 / milhão de tokens |
| Input por candidatura | ~3.500 tokens (system prompt + dados + atuação legislativa + eixos) |
| Output por candidatura | ~750 tokens (JSON com 8 eixos) |
| Retries (~8% de parse refeito) | ×1,1 |
| **Custo por candidatura** | **~US$ 0,024** |
| Câmbio de referência | ~R$ 5,50 / US$ |

## Custo por nº de rodadas (2.225 candidaturas)

| Rodadas | Total (USD) | Total (BRL) |
|---|---|---|
| 1× | ~US$ 53 | ~R$ 294 |
| 2× | ~US$ 107 | ~R$ 588 |
| 3× | ~US$ 160 | ~R$ 881 |
| **4×** | **~US$ 214** | **~R$ 1.175** |

### Rodadas de validação geral (agregadas)

Além do scoring por político, há **rodadas de análise geral para validação**
(consistência dos scores por partido + amostra de auditoria). São **agregadas**,
não um re-passe completo, então custam pouco: **~R$ 15–40 por rodada**.

## Orçamento de planejamento

| Cenário | Estimativa central | Teto de planejamento |
|---|---|---|
| **4 rodadas de scoring + validações** | **~R$ 1.175 + ~R$ 60** | **R$ 2.000** |

> O **teto de R$ 2.000** absorve com folga: variação de câmbio, eventual taxa
> (~5%) se via OpenRouter em vez da Anthropic direta, retries acima do esperado e
> reprocessamento de casos pontuais. A estimativa central fica em **~R$ 1.250**.

**Conclusão:** rodar o scoring completo dos ~2.225 políticos em **até 4 rodadas**
cabe no orçamento de **R$ 2.000**, com margem.

## Alavancas para baixar o custo

- **Prompt caching** do system prompt (~600 tokens, idêntico para todos): reduz
  ~10–15% do input em lote. Hoje o `OpenRouterClient` não usa cache.
- **Output domina** o preço (custa 5× o input): encurtar `justificativa`/`síntese`
  no prompt corta direto.
- **Atuação legislativa** é o maior bloco de input; reduzir `MaxExemplosPorEixo`
  (hoje 4) diminui proporcionalmente.
- Apontar o `BaseUrl` direto para a **Anthropic** evita a taxa do gateway.

> Valores são estimativa. Para cravar, medir os tokens reais de 1 candidatura
> (montar o prompt de um caso real e contar) antes de comprar crédito.
