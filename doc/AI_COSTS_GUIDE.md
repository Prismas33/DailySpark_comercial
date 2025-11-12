# 💰 Guia de Custos das APIs de IA

## ✅ Sim, é a mesma conta OpenAI!

A mesma chave de API (`OPENAI_API_KEY`) serve para:
- ✅ GPT (geração de texto)
- ✅ DALL-E 3 (geração de imagens)
- ✅ Outros modelos OpenAI

Você adiciona créditos em **platform.openai.com/account/billing** e usa para tudo.

---

## 📊 Preços Atualizados (Novembro 2025)

### 🎨 DALL-E 3 (Imagens)
| Qualidade | Tamanho | Preço por Imagem |
|-----------|---------|------------------|
| Standard | 1024x1024 | **$0.040** (~€0.037) |
| Standard | 1024x1792 | $0.080 (~€0.074) |
| HD | 1024x1024 | $0.080 (~€0.074) |
| HD | 1024x1792 | $0.120 (~€0.111) |

**Atualmente usando:** Standard 1024x1024 = **$0.040/imagem**

### 💬 GPT-4o-mini (Texto - Rápido e Barato)
| Operação | Preço (Standard) |
|----------|-------|
| **Input** (prompt) | $0.150 por 1M tokens (~$0.00015 por 1K tokens) |
| **Output** (resposta) | $0.600 por 1M tokens (~$0.0006 por 1K tokens) |

### 🧠 GPT-4o (Texto - Avançado)
| Operação | Preço (Standard) |
|----------|-------|
| **Input** (prompt) | $2.50 por 1M tokens (~$0.0025 por 1K tokens) |
| **Output** (resposta) | $10.00 por 1M tokens (~$0.010 por 1K tokens) |

**✅ Preços verificados em:** OpenAI Official Pricing (Novembro 2025)

**Comparação GPT-4o vs GPT-4o-mini:**
- GPT-4o é **~50x mais caro** que GPT-4o-mini
- GPT-4o é **muito melhor** para storytelling, criatividade e análise profunda
- GPT-4o-mini é **perfeito** para posts rápidos e conteúdo genérico

**Referência de tokens:**
- 1 token ≈ 4 caracteres
- 100 palavras ≈ 75 tokens
- 1000 palavras ≈ 750 tokens

---

## 🧮 Cálculo: 1 Post por Dia com 3-4 Tentativas

### Cenário 1: GPT-4o-mini (Conteúdo Rápido/Genérico)

**Geração de TEXTO (GPT-4o-mini):**
- Prompt do usuário: ~200 palavras = 150 tokens
- Prompt personalizado (settings): ~300 palavras = 225 tokens
- **Total INPUT por tentativa:** ~375 tokens
- **OUTPUT gerado:** ~500 palavras = 375 tokens

**Por tentativa:**
- Input: 375 tokens × $0.00015 = **$0.00005625**
- Output: 375 tokens × $0.0006 = **$0.000225**
- **Total por tentativa:** ~**$0.00028**

**4 tentativas de texto GPT-4o-mini:**
- 4 × $0.00028 = **$0.00112** (~€0.0010)

**Geração de IMAGEM (DALL-E 3):**
- 3 tentativas × $0.040 = **$0.120** (~€0.111)

### 💵 CUSTO TOTAL POR POST (GPT-4o-mini)
```
Texto GPT-4o-mini (4×): $0.00112  (~€0.0010)
Imagem DALL-E 3 (3×):   $0.12000  (~€0.111)
───────────────────────────────────────
TOTAL por post:         $0.12112  (~€0.112)
```

### 📅 CUSTO MENSAL (30 posts com GPT-4o-mini)
```
30 dias × $0.12112 = $3.63/mês (~€3.36/mês)
```

**💡 Nota:** O texto GPT-4o-mini é praticamente gratuito comparado às imagens!

---

### Cenário 2: GPT-4o (Storytelling/Conteúdo Avançado)

**Geração de TEXTO (GPT-4o):**
- Mesmos tokens que GPT-4o-mini: 375 input + 375 output

**Por tentativa:**
- Input: 375 tokens × $0.0025 = **$0.0009375**
- Output: 375 tokens × $0.010 = **$0.00375**
- **Total por tentativa:** ~**$0.0047**

**4 tentativas de texto GPT-4o:**
- 4 × $0.0047 = **$0.0188** (~€0.017)

**⚠️ GPT-4o é 16.8x mais caro que GPT-4o-mini para texto!**

**Geração de IMAGEM (DALL-E 3):**
- 3 tentativas × $0.040 = **$0.120** (~€0.111)

### 💵 CUSTO TOTAL POR POST (GPT-4o)
```
Texto GPT-4o (4×):      $0.01880  (~€0.017)
Imagem DALL-E 3 (3×):   $0.12000  (~€0.111)
─────────────────────────────────────
TOTAL por post:         $0.13880  (~€0.128)
```

### 📅 CUSTO MENSAL (30 posts com GPT-4o)
```
30 dias × $0.13880 = $4.16/mês (~€3.85/mês)
```

---

### 🎯 Cenário Híbrido (RECOMENDADO!)

**Use GPT-4o-mini para 80% dos posts** (posts rápidos, ideias aleatórias)
**Use GPT-4o para 20% dos posts** (storytelling pessoal, análises profundas)

**Por mês (30 posts):**
- 24 posts com GPT-4o-mini: 24 × $0.12112 = $2.91
- 6 posts com GPT-4o: 6 × $0.13880 = $0.83
- **TOTAL: $3.74/mês (~€3.46/mês)**

**Economia comparado com 100% GPT-4o:** ~$0.42/mês (~€0.39/mês | ~10%)

---

## 🤔 Quando Usar Cada Modelo?

### ⚡ GPT-4o-mini (Recomendado para):
- ✅ Posts rápidos e objetivos
- ✅ Ideias aleatórias e brainstorming
- ✅ Conteúdo genérico e informativo
- ✅ Ajustes de tom e formatação
- ✅ Legendas simples para redes sociais
- ✅ Quando você faz muitos posts por dia

**Qualidade:** Muito boa (8/10)  
**Velocidade:** Rápida  
**Custo:** Muito baixo (~$0.0003/post)

### 🧠 GPT-4o (Recomendado para):
- ✅ Storytelling pessoal complexo
- ✅ Análises profundas e artigos longos
- ✅ Conteúdo criativo e emocional
- ✅ Persuasão e copywriting avançado
- ✅ Quando a qualidade é crítica
- ✅ Posts importantes que definem sua marca

**Qualidade:** Excelente (10/10)  
**Velocidade:** Um pouco mais lenta  
**Custo:** 50x mais caro (~$0.015/post)

### 💡 Dica Prática:
Use o **switch no modal** para alternar entre os modelos:
- Começando um post → **GPT-4o-mini** (teste rápido)
- Gostou da direção? → **GPT-4o** (refinar e aprofundar)
- Post final → Escolha o melhor resultado!

---

## 💡 Por que Apenas OpenAI?

### ✅ Vantagens da Solução Unificada:

- **Uma única conta** para tudo (texto + imagens)
- **Uma única chave API** no `.env.local`
- **Qualidade superior** e consistente
- **Sem limites diários artificiais**
- **Melhor integração** entre modelos
- **Suporte oficial** e documentação completa

### 💰 Custo Real:

**Para 30 posts/mês (1 por dia):**
- Texto: ~€0.03 (praticamente nada)
- Imagens: ~€3.33 (97% do custo)
- **TOTAL: ~€3.36/mês**

**Menos que um café por dia!** ☕

### 🎯 Modelos Disponíveis:

| Modelo | Uso | Custo/Post |
|--------|-----|-----------|
| **GPT-4o-mini** | Posts rápidos e diários | ~€0.0004 |
| **GPT-4o** | Storytelling e conteúdo premium | ~€0.019 |
| **DALL-E 3** | Imagens de alta qualidade | ~€0.037 |

---

## 🎯 Recomendação de Créditos

### Para Começar (Teste)
→ **$5 (€4.62)**
- ~41 posts completos (texto + imagem)
- Suficiente para ~1.5 meses

### Para Uso Regular (Recomendado)
→ **$10 (€9.25)**
- ~83 posts completos
- Suficiente para ~2.5 meses
- Melhor custo-benefício

### Para Uso Intenso
→ **$20 (€18.50)**
- ~166 posts completos
- Suficiente para ~5.5 meses
- Sem preocupações de saldo

---

## 📝 Configuração Atual do DailySpark

### ⚠️ APENAS OpenAI (Sem Alternativas Gratuitas)

**Texto (AI Content Generator):**
- **GPT-4o-mini** → ~€0.0004/post (rápido e barato)
- **GPT-4o** → ~€0.019/post (avançado e criativo)

**Imagens (AI Image Generator):**
- **DALL-E 3** → ~€0.037/imagem (Standard 1024x1024)

**Configuração necessária:**
```env
OPENAI_API_KEY=sk-proj-xxxxx  # OBRIGATÓRIA
```

---

## 🛠️ Como Adicionar Créditos na OpenAI

1. Acesse: **https://platform.openai.com/account/billing**
2. Clique em **"Add payment method"**
3. Adicione cartão de crédito
4. Compre créditos:
   - Mínimo: $5
   - Recomendado para testes: $10
   - Para uso regular: $20+

**Os créditos nunca expiram!** 🎉

---

## 📊 Monitoramento de Uso

### Via OpenAI Dashboard
- **Usage:** https://platform.openai.com/usage
- Ver uso diário/mensal
- Filtrar por modelo (GPT, DALL-E, etc)

### Via DailySpark
- O componente `AIUsageMonitor.tsx` existe mas precisa ser configurado
- Pode implementar tracking local no Firestore

---

## 🚀 Melhorias Futuras

### Planejado:
1. ⚠️ Adicionar opção de qualidade HD no DALL-E (€0.074/imagem)
2. ⚠️ Permitir escolher tamanho (1024x1792, 1792x1024)
3. ⚠️ Contador de custos em tempo real no dashboard
4. ⚠️ Alertas quando saldo está baixo
5. ⚠️ Histórico de gastos por mês
6. ⚠️ Cache de prompts similares para economizar

---

## 🔑 Resumo Prático

**Para começar com $10 na OpenAI:**
- ~250 imagens DALL-E 3
- ~33.000 posts de texto (GPT-4o-mini)
- **OU ~82 posts completos** (texto + 3 tentativas de imagem)

**Duração estimada:**
- 1 post/dia = ~2.5 meses
- 3 posts/dia = ~1 mês
- 5 posts/dia = ~2 semanas

---

## 📞 Suporte

- **OpenAI Status:** https://status.openai.com/
- **Pricing:** https://openai.com/api/pricing/
- **Docs:** https://platform.openai.com/docs/

---

**Última atualização:** Novembro 2025  
**Preços em USD (1 USD ≈ €0.925)**  
**Taxa de câmbio aproximada - verificar em xe.com**
