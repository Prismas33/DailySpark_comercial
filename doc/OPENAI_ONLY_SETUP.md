# 🎯 DailySpark - Apenas OpenAI (Simplificado)

## ✅ O que Mudou?

**Antes:** Sistema suportava 3 providers (Groq, OpenAI, Gemini)
**Agora:** **APENAS OpenAI** - Simples e direto!

---

## 🔧 Configuração Necessária

### `.env.local` - Uma Única Chave

```env
# OBRIGATÓRIA - Única chave necessária
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx

# ❌ Removidas (não são mais usadas):
# GROQ_API_KEY=...
# GEMINI_API_KEY=...
```

**Como obter:**
1. Acesse: https://platform.openai.com/api-keys
2. Clique em **"Create new secret key"**
3. Copie e cole no `.env.local`

---

## 💰 Custos (em Euros)

### Por Post Completo:

| O que você usa | Custo |
|----------------|-------|
| Texto (GPT-4o-mini, 4 tentativas) | ~€0.001 |
| Texto (GPT-4o, 4 tentativas) | ~€0.017 |
| Imagem (DALL-E 3, 3 tentativas) | ~€0.111 |

### Custo Mensal (30 posts/dia):

```
Cenário 1: 100% GPT-4o-mini
─────────────────────────────────
Texto:   30 × €0.001 = €0.03
Imagens: 30 × €0.037 = €1.11
─────────────────────────────────
TOTAL:   €1.14/mês × 3 tentativas
       = €3.36/mês

Cenário 2: 100% GPT-4o
─────────────────────────────────
Texto:   30 × €0.019 = €0.57
Imagens: 30 × €0.037 = €1.11
─────────────────────────────────
TOTAL:   €1.68/mês × 3 tentativas
       = €3.85/mês

Cenário 3: 80% Mini + 20% GPT-4o
─────────────────────────────────
Texto Mini:  24 × €0.001 = €0.024
Texto GPT-4o: 6 × €0.019 = €0.114
Imagens:     30 × €0.037 = €1.11
─────────────────────────────────
TOTAL:   €1.25/mês × 3 tentativas
       = €3.46/mês (RECOMENDADO)
```

**97% do custo vem das imagens!**
O texto é praticamente gratuito.

---

## 🎯 Modelos Disponíveis

### 1. GPT-4o-mini ⚡ (Default)
- **Velocidade:** Muito rápida
- **Qualidade:** Excelente (9/10)
- **Uso:** Posts diários, ideias rápidas
- **Custo:** ~€0.0004/post
- **Quando usar:** 80-90% dos seus posts

### 2. GPT-4o 🧠 (Premium)
- **Velocidade:** Rápida
- **Qualidade:** Máxima (10/10)
- **Uso:** Storytelling, análises profundas
- **Custo:** ~€0.019/post (47x mais caro)
- **Quando usar:** Posts especiais e importantes

### 3. DALL-E 3 🎨 (Imagens)
- **Qualidade:** Alta (Standard) ou Máxima (HD)
- **Tamanho:** 1024x1024 (implementado)
- **Custo:** €0.037/imagem (Standard)
- **Quando usar:** Sempre (única opção)

---

## 🚀 Como Usar o Switch de Modelo

### No AI Content Generator:

1. Abra o modal para gerar conteúdo
2. Veja o switch no topo:
   ```
   ┌──────────────────────────────┐
   │ ⚡ Mini │ 🧠 GPT-4o           │
   │ (fast) │ (advanced)          │
   └──────────────────────────────┘
   ```
3. Clique no modelo desejado
4. Veja o custo atualizar em tempo real
5. Clique "Generate AI Suggestion"

### Indicadores Visuais:

- 🔵 **Azul** = GPT-4o-mini selecionado
- 🟣 **Roxo** = GPT-4o selecionado
- Descrição mostra o custo estimado

---

## 💳 Adicionar Créditos

### Passo a Passo:

1. **Acesse:** https://platform.openai.com/account/billing
2. **Clique:** "Add payment method"
3. **Adicione:** Cartão de crédito
4. **Compre créditos:**
   - Mínimo: $5 (€4.62)
   - Recomendado: **$10 (€9.25)** ✨
   - Para uso intenso: $20 (€18.50)

### Os Créditos Nunca Expiram! 🎉

Você pode adicionar €10 hoje e usar pelos próximos 2-3 meses tranquilamente.

---

## 📊 Quanto Tempo Duram os Créditos?

### Com $10 (€9.25):

| Uso | Posts Completos | Duração |
|-----|----------------|---------|
| **1 post/dia** | ~83 posts | ~2.8 meses |
| **2 posts/dia** | ~83 posts | ~1.4 meses |
| **5 posts/dia** | ~83 posts | ~17 dias |

### Só Imagens (sem texto):

| Créditos | Imagens DALL-E 3 |
|----------|------------------|
| $5 | ~125 imagens |
| $10 | ~250 imagens |
| $20 | ~500 imagens |

---

## ⚠️ Mensagens de Erro Comuns

### "OpenAI API key not configured"
**Causa:** Não tem `OPENAI_API_KEY` no `.env.local`

**Solução:**
1. Obtenha chave em: https://platform.openai.com/api-keys
2. Adicione no `.env.local`
3. Reinicie o servidor: `npm run dev`

### "Saldo insuficiente na conta OpenAI"
**Causa:** Sem créditos na conta

**Solução:**
1. Adicione créditos em: https://platform.openai.com/account/billing
2. Mínimo $5, recomendado $10

### "Rate limit exceeded"
**Causa:** Muitas requisições em pouco tempo

**Solução:**
- Aguarde 10-20 segundos
- Tente novamente
- Se persistir, você pode ter atingido o limite mensal

---

## 🎓 Exemplo de Uso Real

### Workflow Semanal:

**Segunda a Sexta (5 posts):**
- Texto: ⚡ GPT-4o-mini (rápido)
- Imagens: DALL-E 3
- Custo: 5 × €0.112 = €0.56

**Sábado (1 post especial):**
- Texto: 🧠 GPT-4o (premium)
- Imagens: DALL-E 3
- Custo: 1 × €0.128 = €0.128

**Domingo (descanso):**
- Sem posts

**Total Semanal:**
```
Segunda-Sexta: €0.56
Sábado:        €0.13
───────────────────
TOTAL:         €0.69/semana
             = €2.76/mês (4 semanas)
```

**Com €10 você tem ~3.6 meses!**

---

## 🔒 Segurança da API Key

### ✅ Boas Práticas:

1. **Nunca** commite `.env.local` no Git
2. **Nunca** compartilhe sua chave API
3. Configure **rate limits** no dashboard OpenAI
4. Configure **alertas** de uso

### No Dashboard OpenAI:

1. Acesse: https://platform.openai.com/account/limits
2. Configure limites mensais (ex: $20/mês)
3. Receba email quando atingir 80% do limite

---

## 📈 Monitorar Uso

### Via OpenAI Dashboard:

1. **Usage:** https://platform.openai.com/usage
2. Filtre por:
   - Modelo (GPT-4o-mini, GPT-4o, DALL-E 3)
   - Data (hoje, esta semana, este mês)
   - Tipo (texto, imagem)

### O que observar:

- **Requests:** Número de chamadas
- **Tokens:** Quantidade de texto processado
- **Cost:** Custo em USD
- **Trend:** Gráfico de uso ao longo do tempo

---

## 🎯 Dicas Para Economizar

### 1. Use GPT-4o-mini por padrão
- 97% dos posts não precisam de GPT-4o
- Qualidade ainda é excelente

### 2. Gere menos tentativas
- Ao invés de 3-4 tentativas, faça 2
- Economiza ~33-50% no custo

### 3. Reutilize imagens
- Nem todo post precisa de imagem nova
- Pode usar imagens de banco de dados

### 4. Configure alertas
- Saiba quando está gastando demais
- Ajuste comportamento antes de acabar o saldo

---

## ✨ Vantagens da Simplificação

### Antes (3 providers):
- ❌ Configurar 3 chaves diferentes
- ❌ Lógica complexa de fallback
- ❌ Qualidade inconsistente
- ❌ Debugging difícil
- ❌ Limites diários confusos

### Agora (só OpenAI):
- ✅ Uma única chave
- ✅ Código simples e direto
- ✅ Qualidade consistente
- ✅ Debugging fácil
- ✅ Sem limites artificiais
- ✅ Suporte oficial
- ✅ **Custo previsível**

---

## 🤔 FAQ

### Por que remover Groq (grátis)?
- Complexidade desnecessária
- Limites diários (14,400 requests)
- Qualidade inferior ao GPT-4o-mini
- Uma única chave é mais simples

### OpenAI não é caro?
- Para texto: praticamente gratuito (~€0.03/mês)
- Para imagens: €3.33/mês (1 post/dia)
- **Menos que um café!** ☕
- Sem surpresas ou limites diários

### E se eu quiser economizar?
- Use GPT-4o-mini 90% do tempo
- Gere menos tentativas (2 ao invés de 4)
- Reutilize imagens quando possível
- €10 dura ~3 meses facilmente

### Posso usar conta gratuita OpenAI?
- Não existe conta "gratuita"
- Precisa adicionar créditos (mínimo $5)
- Mas créditos nunca expiram!

---

## 🎉 Resumo

✅ **Uma chave:** `OPENAI_API_KEY`  
✅ **Três modelos:** GPT-4o-mini, GPT-4o, DALL-E 3  
✅ **Custo mensal:** ~€3.36 (1 post/dia)  
✅ **Qualidade:** Máxima e consistente  
✅ **Simples:** Sem configurações complexas  

**Com €10 você está pronto por ~3 meses!** 🚀

---

**Setup Final:**
```env
# .env.local
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
```

**Reinicie o servidor:**
```bash
npm run dev
```

**Adicione créditos:**
https://platform.openai.com/account/billing

**Pronto para usar!** 🎉
