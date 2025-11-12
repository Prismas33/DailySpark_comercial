# AI Image Generation Guide - DALL-E 3

## 🎨 Complete Flow

### Step 1: AI Content Improvement
1. Write your post content
2. Click **"✨ Improve with AI"**
3. AI improves text and adds `Visual sugerido:` line
4. Approve the content → Text goes to content field, visual suggestion extracted

### Step 2: Image Generation
1. Visual suggestion appears in purple box below content
2. Click **"🎨 Generate Image"** button
3. DALL-E 3 modal opens
4. Click **"Generate Image"** → Wait 10-30 seconds
5. Preview the generated image
6. Options:
   - **Use This Image** → Auto-attaches to post
   - **Regenerate** → Create new variation
   - **Upload Different** → Close modal, use manual upload

---

## 🔧 Setup Required

### 1. Get OpenAI API Key

1. Go to: https://platform.openai.com/api-keys
2. Sign up / Login
3. Click **"Create new secret key"**
4. Name it: `DailySpark DALL-E 3`
5. Copy the key: `sk-proj-...`

### 2. Add to `.env.local`

```env
# Already have this for GPT-4 mini (text generation)
OPENAI_API_KEY=sk-proj-your-key-here
```

### 3. Add Credits to OpenAI Account

- Go to: https://platform.openai.com/settings/organization/billing
- Add payment method
- Add **minimum $5** (recommended $10-20 for testing)
- DALL-E 3 costs: **~$0.04 per image** (1024x1024 standard quality)

---

## 💰 Pricing

### DALL-E 3 (Standard Quality)
- **1024×1024**: $0.040 per image
- **1024×1792**: $0.080 per image
- **1792×1024**: $0.080 per image

### DALL-E 3 (HD Quality) - Better but costs more
- **1024×1024**: $0.080 per image
- **1024×1792**: $0.120 per image
- **1792×1024**: $0.120 per image

**Current implementation:** Standard quality 1024x1024 = **$0.04/image**

---

## 📊 Cost Examples

| Images Generated | Cost (Standard) | Cost (HD) |
|-----------------|-----------------|-----------|
| 10 images       | $0.40           | $0.80     |
| 50 images       | $2.00           | $4.00     |
| 100 images      | $4.00           | $8.00     |
| 250 images      | $10.00          | $20.00    |

---

## 🎯 Best Practices for Prompts

### ✅ Good Visual Suggestions (from AI)

```
Visual sugerido: Professional office setting with a leader supporting their team, 
warm lighting, modern workspace, diverse group collaborating, photorealistic style
```

```
Visual sugerido: Minimalist graphic showing a hand reaching out to help another, 
neutral background, clean lines, symbolic illustration, professional business aesthetic
```

### ❌ Bad Prompts (Too Vague)

```
Visual sugerido: Leadership
```

```
Visual sugerido: An image about teamwork
```

---

## 🚀 Features

### Modal Features
- ✅ Real-time generation (10-30 seconds)
- ✅ Preview before accepting
- ✅ Regenerate unlimited times
- ✅ See DALL-E 3's "revised prompt" (how it interpreted your description)
- ✅ Auto-download and attach to post
- ✅ Alternative: Upload your own image instead

### Error Handling
- ✅ Rate limit detection (429 errors)
- ✅ Content policy violation alerts
- ✅ Billing/credit issues flagged
- ✅ Network error recovery

---

## 🐛 Troubleshooting

### ❌ Error: "OpenAI API key not configured"
**Fix:** Add `OPENAI_API_KEY` to `.env.local`

### ❌ Error: "Rate limit reached or insufficient credits"
**Fix:** 
1. Check billing: https://platform.openai.com/settings/organization/billing
2. Add credits ($5-20 recommended)
3. Wait if rate limited (DALL-E 3 has generous limits)

### ❌ Error: "Content policy violation"
**Fix:**
- Your prompt was flagged by OpenAI's safety filters
- Common issues: Violence, explicit content, copyrighted characters
- Solution: Rephrase to be more general and professional
- Example: Instead of "bloody battlefield" → "intense business competition scene"

### ❌ Image generates but looks wrong
**Fix:**
- Click **"Regenerate"** for variation
- Check the "revised prompt" - DALL-E 3 may have changed your prompt
- Improve your visual suggestion in AI Settings prompt:
  ```
  Sempre inclui uma descrição visual detalhada com:
  - Estilo (fotorealista, ilustração, minimalista)
  - Iluminação (quente, fria, natural)
  - Composição (close-up, wide shot, centered)
  - Cores dominantes (neutro, vibrante, profissional)
  ```

### ❌ Generation takes too long (>60 seconds)
**Cause:** OpenAI API slowness or complex prompt  
**Fix:**
- Wait up to 90 seconds
- If timeout, close modal and try again
- Simplify your visual prompt

---

## 📝 Example AI Prompt (for Settings)

Add this to your **AI Configuration** in Settings to get better visual suggestions:

```
Você é um especialista em marketing digital português.

Melhora o conteúdo mantendo a estrutura original (parágrafos, hashtags).

SEMPRE inclui no final uma linha:
Visual sugerido: [descrição detalhada para DALL-E 3]

A descrição visual deve ter:
- Estilo artístico claro (fotorealista / ilustração / minimalista)
- Iluminação e atmosfera
- Elementos principais da cena
- Paleta de cores
- Perspectiva/composição

Exemplo:
Visual sugerido: Fotografia profissional de um ambiente de escritório moderno, 
iluminação natural suave, líder apoiando a equipa em redor de uma mesa, 
diversidade étnica, cores neutras com acentos em verde-esmeralda, 
enquadramento wide shot, estilo corporativo mas acolhedor
```

---

## 🔄 Complete Workflow Example

### Input (User writes):
```
Leadership is about empowering others.
```

### AI Improves (with custom prompt):
```
Leadership is not about power—it's about empowerment.

True leaders don't seek the spotlight; they shine it on their team.

Key insight: The best leaders multiply strength, they don't centralize it.

Takeaway: Empowerment > Control.

Hashtags: #Leadership #Empowerment #TeamSuccess

Visual sugerido: Minimalist illustration showing a leader lifting up team members, 
warm gradient background from gold to emerald, clean lines, symbolic representation, 
professional business aesthetic, centered composition
```

### User Approves:
- **Content field:** Everything except "Visual sugerido:" line
- **Visual suggestion box:** Appears with the DALL-E prompt
- **Button:** "🎨 Generate Image" is active

### User Clicks Generate:
- Modal opens
- Shows the visual prompt
- Generates image in 10-30 sec
- Preview appears
- User clicks "Use This Image"
- Image auto-attaches to post ✅

### Final Post:
- ✅ Improved content
- ✅ AI-generated professional image
- ✅ Ready to publish to LinkedIn/X/etc

---

## 💡 Pro Tips

1. **Test prompts first:** Use 1-2 generations to see if style matches before bulk use
2. **Refine your AI prompt:** Iterate on your Settings AI prompt to get better visual suggestions
3. **Budget wisely:** $10 = ~250 images at standard quality
4. **Use regenerate sparingly:** Each regeneration costs another $0.04
5. **Save good images:** Download favorites for reuse across posts
6. **HD only when needed:** Use standard quality for social media (saves 50%)
7. **Monitor usage:** Check OpenAI dashboard regularly to track spending

---

## 🔐 Security

- ✅ Requires Firebase authentication (verified by admin SDK)
- ✅ All requests logged with user UID
- ✅ OpenAI key never exposed to client
- ✅ Rate limiting by OpenAI prevents abuse
- ✅ Images expire after ~1 hour on OpenAI servers (download immediately)

---

## 📚 Related Docs

- [AI_SETUP_GUIDE.md](./AI_SETUP_GUIDE.md) - Groq/Gemini/OpenAI text generation setup
- [AI_PROMPT_TESTING_GUIDE.md](./AI_PROMPT_TESTING_GUIDE.md) - Custom AI prompt configuration
- [SOCIAL_MEDIA_MANAGER_ARCHITECTURE.md](./SOCIAL_MEDIA_MANAGER_ARCHITECTURE.md) - System overview

---

**Last Updated:** January 2025  
**API Docs:** https://platform.openai.com/docs/guides/images/generations  
**Pricing:** https://openai.com/api/pricing/
