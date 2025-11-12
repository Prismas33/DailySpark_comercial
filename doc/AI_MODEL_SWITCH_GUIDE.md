# 🔄 Como Funciona o Switch de Modelos AI

## ✅ Problema Corrigido

**Antes:** O sistema sempre usava Groq (grátis) se a chave existisse, ignorando o switch.

**Agora:** Quando você escolhe GPT-4o ou GPT-4o-mini no switch, o sistema **força o uso da OpenAI**, mesmo que você tenha Groq configurado.

---

## 🎯 Lógica de Seleção de Modelo

### Quando o switch FORÇA OpenAI:
```typescript
if (model === 'gpt-4o' || model === 'gpt-4o-mini') {
  // Usa OpenAI OBRIGATORIAMENTE
  // Ignora Groq mesmo que esteja configurado
}
```

### Quando NÃO há modelo selecionado (fallback):
```typescript
1. Tenta Groq (grátis) ✅
2. Se não tiver Groq → Tenta OpenAI
3. Se não tiver OpenAI → Tenta Gemini
4. Se nenhum → Erro
```

---

## 🖼️ Geração de Imagens

**Importante:** Só existe DALL-E 3 (OpenAI) implementado!

### Para gerar imagens você PRECISA:
1. ✅ Ter `OPENAI_API_KEY` configurada no `.env.local`
2. ✅ Ter créditos na conta OpenAI
3. ✅ Adicionar créditos em: https://platform.openai.com/account/billing

### Alternativas (não implementadas):
- ⚠️ Stability AI (grátis com limites)
- ⚠️ Midjourney (pago)
- ⚠️ Leonardo.ai (freemium)

---

## 💰 Custos em Euros (€)

### Por Post Completo (texto + imagem):

| Cenário | Texto (4 tentativas) | Imagens (3 tentativas) | TOTAL |
|---------|---------------------|----------------------|-------|
| **GPT-4o-mini** | ~€0.001 | ~€0.111 | **~€0.112** |
| **GPT-4o** | ~€0.017 | ~€0.111 | **~€0.128** |
| **Groq + DALL-E 3** | GRÁTIS | ~€0.111 | **~€0.111** |

### Por Mês (30 posts):

| Cenário | Custo Mensal |
|---------|--------------|
| **100% GPT-4o-mini** | ~€3.36/mês |
| **100% GPT-4o** | ~€3.85/mês |
| **80% Mini + 20% GPT-4o** | ~€3.46/mês (recomendado) |
| **Groq + DALL-E 3** | ~€3.33/mês (mais econômico) |

---

## 🚀 Estratégia Recomendada

### Configuração Ideal:
```env
# .env.local
GROQ_API_KEY=gsk_xxxx        # Para texto (GRÁTIS)
OPENAI_API_KEY=sk-proj-xxxx  # Para imagens + GPT quando precisar
```

### Fluxo de Trabalho:
1. **Posts do dia-a-dia:** Deixe em Groq (automático, grátis)
2. **Posts especiais:** Mude para GPT-4o no switch
3. **Imagens:** Sempre DALL-E 3 (única opção)

### Custos Mensais Esperados:
```
Texto (Groq):        €0.00     (grátis)
Imagens (30×):       €3.33     (DALL-E 3)
────────────────────────────────────
TOTAL:               ~€3.33/mês
```

**Com $10 (€9.25) você faz:**
- ~83 posts completos (texto + imagem)
- ~250 imagens DALL-E 3
- Texto ilimitado no Groq (grátis)

---

## 🔑 Como Usar o Switch Corretamente

### No AI Content Generator:

1. **Abra o modal** para gerar conteúdo
2. **Veja o switch** no topo direito
3. **Opções disponíveis:**
   - ⚡ **Mini (fast)** → GPT-4o-mini (~€0.0004/post)
   - 🧠 **GPT-4o (advanced)** → GPT-4o (~€0.019/post)

### O que acontece:

| Você clica em | Sistema usa | Custo |
|---------------|-------------|-------|
| **Nenhum** (default) | Groq (se disponível) | GRÁTIS |
| **⚡ Mini** | GPT-4o-mini (forçado) | ~€0.0004 |
| **🧠 GPT-4o** | GPT-4o (forçado) | ~€0.019 |

### Dica Visual:
- 🔵 **Azul** = GPT-4o-mini selecionado
- 🟣 **Roxo** = GPT-4o selecionado
- ⚪ **Cinza** = Nenhum (usa Groq se disponível)

---

## ⚠️ Mensagens de Erro Comuns

### "Saldo insuficiente na conta OpenAI"
**Causa:** Você escolheu GPT-4o/mini mas não tem créditos.

**Solução:**
1. Adicione créditos em: https://platform.openai.com/account/billing
2. **OU** não selecione nenhum modelo (deixa usar Groq grátis)

### "Failed to generate image with DALL-E 3"
**Causa:** Sem créditos OpenAI para imagens.

**Solução:**
- Adicione pelo menos $5 (€4.62) de créditos
- Recomendado: $10 (€9.25) para ~83 posts

### "No AI API key configured"
**Causa:** Não tem NENHUMA chave configurada.

**Solução:**
- Configure pelo menos GROQ_API_KEY (grátis) no `.env.local`
- OU configure OPENAI_API_KEY (pago mas melhor)

---

## 📊 Comparação: Quando Usar Cada Um?

### Use Groq (default/grátis):
- ✅ Posts do dia-a-dia
- ✅ Ideias rápidas
- ✅ Quando o budget é apertado
- ✅ Qualidade é boa (8/10)

### Use GPT-4o-mini (barato):
- ✅ Quando Groq atingiu o limite diário
- ✅ Conteúdo um pouco mais refinado
- ✅ Integração com outros serviços OpenAI
- ✅ Qualidade excelente (9/10)

### Use GPT-4o (premium):
- ✅ Storytelling pessoal importante
- ✅ Análises profundas
- ✅ Posts que definem sua marca
- ✅ Quando cada palavra importa
- ✅ Qualidade máxima (10/10)

---

## 🎓 Exemplo Prático

### Cenário: Você quer fazer 1 post por dia

**Setup:**
```env
GROQ_API_KEY=gsk_...     # Para texto
OPENAI_API_KEY=sk-...    # Para imagens
```

**Workflow Diário:**

1. **Texto (Segunda a Sexta):**
   - Não seleciona modelo → Usa Groq (grátis)
   - Custo: €0.00

2. **Texto (Sábado - post especial):**
   - Seleciona 🧠 GPT-4o → Força OpenAI
   - Custo: ~€0.019

3. **Imagens (todo dia):**
   - Usa DALL-E 3 sempre (única opção)
   - 30 imagens × €0.037 = €1.11/mês

**Total Mensal:**
```
Texto Groq (29 dias):    €0.00
Texto GPT-4o (1 dia):    €0.019
Imagens (30 dias):       €1.11
──────────────────────────────
TOTAL:                   €1.13/mês
```

**Com €10 você tem créditos para ~9 meses!** 🎉

---

## 🔧 Verificar Setup Atual

### Ver qual modelo está sendo usado:

1. Abra o **DevTools** (F12)
2. Vá para **Console**
3. Gere um conteúdo
4. Procure por:
   ```
   🎯 Using OpenAI gpt-4o (user selected)
   OU
   📩 AI API Request: { selectedModel: "gpt-4o-mini" }
   ```

### Ver saldo OpenAI:

1. Acesse: https://platform.openai.com/usage
2. Veja uso atual
3. Configure alertas de limite

---

## 🆘 Troubleshooting

### Switch não funciona?
- ✅ CORRIGIDO! Agora força OpenAI quando você seleciona um modelo
- Certifique-se que tem `OPENAI_API_KEY` no `.env.local`
- Reinicie o servidor: `npm run dev`

### Imagens não geram?
- Precisa de `OPENAI_API_KEY` configurada
- Precisa ter créditos na conta
- Adicione em: https://platform.openai.com/account/billing

### Custo muito alto?
- Use Groq para texto (grátis)
- Use GPT-4o só para posts especiais
- Imagens são o custo principal (~97% do total)

---

**Resumo Final:**
- ✅ Switch agora funciona corretamente
- ✅ Custos em Euros (€)
- ✅ DALL-E 3 é a única opção para imagens (precisa OpenAI)
- ✅ Groq + OpenAI = Setup mais econômico (~€3.33/mês)

**Última atualização:** 11 Novembro 2025
