# 🤖 AI Setup Guide - DailySpark

## Choose Your AI Provider (Pick ONE)

### ⚡ Option 1: Groq (RECOMMENDED - FREE & FAST)

**Why Groq?**
- ✅ **100% Free** (14,400 requests/day)
- ✅ **Ultra Fast** (faster than OpenAI)
- ✅ **Easy Setup** (2 minutes)
- ✅ **Great Models** (Llama 3.1, Mixtral)

**Setup:**
1. Go to https://console.groq.com/keys
2. Sign up with Google/GitHub (free)
3. Click "Create API Key"
4. Copy the key (starts with `gsk_`)
5. Add to `.env.local`:
   ```bash
   GROQ_API_KEY=gsk_your_key_here
   ```

**Models Available:**
- `llama-3.3-70b-versatile` (default, latest, best quality)
- `llama-3.1-8b-instant` (faster, lighter)
- `mixtral-8x7b-32768` (good for long content)
- `gemma2-9b-it` (alternative, balanced)

---

### 🟢 Option 2: Google Gemini (FREE)

**Why Gemini?**
- ✅ **100% Free** (60 requests/min)
- ✅ **Google Quality**
- ✅ **No Credit Card**

**Setup:**
1. Go to https://aistudio.google.com/apikey
2. Sign in with Google
3. Click "Get API Key"
4. Create new key
5. Add to `.env.local`:
   ```bash
   GEMINI_API_KEY=your_key_here
   ```

**Models Available:**
- `gemini-1.5-flash` (default, fast)
- `gemini-1.5-pro` (higher quality)

---

### 💰 Option 3: OpenAI (PAID)

**Why OpenAI?**
- ✅ **Best Quality** (GPT-4)
- ❌ **Costs Money** (~$0.15 per 1M tokens)

**Setup:**
1. Go to https://platform.openai.com/api-keys
2. Sign up (requires credit card)
3. Add payment method
4. Create API key
5. Add to `.env.local`:
   ```bash
   OPENAI_API_KEY=sk-proj-your_key_here
   ```

**Models Available:**
- `gpt-4o-mini` (default, cheap)
- `gpt-4o` (best quality, expensive)
- `gpt-3.5-turbo` (cheapest)

---

## 🚀 Quick Start (Groq - 2 minutes)

```bash
# 1. Get Groq API Key
# Go to: https://console.groq.com/keys
# Click: Create API Key
# Copy the key

# 2. Add to .env.local
echo "GROQ_API_KEY=gsk_your_key_here" >> .env.local

# 3. Restart dev server
npm run dev

# 4. Test it!
# - Go to Post Now or Schedule
# - Write some content
# - Click "✨ Improve with AI"
# - See the magic! 🎉
```

---

## 📋 Full .env.local Setup

```bash
# Copy .env.local.example to .env.local
cp .env.local.example .env.local

# Edit .env.local and add your keys
# You only need ONE of these AI keys:

# Option 1 (Recommended):
GROQ_API_KEY=gsk_xxxxxxxxxxxxx

# Option 2:
# GEMINI_API_KEY=xxxxxxxxxxxxx

# Option 3:
# OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
```

---

## 🔄 API Priority

If multiple keys are configured, the system uses this order:
1. **Groq** (if `GROQ_API_KEY` exists)
2. **OpenAI** (if `OPENAI_API_KEY` exists)
3. **Gemini** (if `GEMINI_API_KEY` exists)

---

## 🧪 Testing

1. Start server: `npm run dev`
2. Go to **Post Now** tab
3. Write content: "AI is amazing"
4. Click **✨ Improve with AI**
5. Wait 2-3 seconds
6. See improved version!
7. Click **Regenerate** for different version
8. Click **Use AI Version** to accept

---

## 🆓 Cost Comparison

| Provider | Free Tier | Speed | Quality | Best For |
|----------|-----------|-------|---------|----------|
| **Groq** | 14,400 req/day | ⚡⚡⚡ | ★★★★☆ | **Development** |
| **Gemini** | 60 req/min | ⚡⚡ | ★★★★☆ | **Production** |
| **OpenAI** | $5 credit | ⚡⚡ | ★★★★★ | **Premium** |

**Recommendation:** Start with **Groq** (free + fast)!

---

## 🐛 Troubleshooting

### "No AI API key configured"
- ✅ Add one of: `GROQ_API_KEY`, `OPENAI_API_KEY`, or `GEMINI_API_KEY`
- ✅ Restart dev server: `Ctrl+C` then `npm run dev`

### "Failed to generate content"
- ✅ Check API key is correct
- ✅ Check internet connection
- ✅ Check API rate limits (Gemini: 60/min, Groq: 14400/day)
- ✅ Check browser console for errors

### "Daily limit reached (14,400 requests/day)"
**Groq Rate Limit:**
- ✅ Wait until midnight UTC (resets daily)
- ✅ Create another Groq account (different email)
- ✅ Switch to Gemini (60/min = ~86,400/day)
- ✅ Monitor usage in Settings (coming soon)

### "Gemini rate limit reached (60 requests/minute)"
**Gemini Rate Limit:**
- ✅ Wait 1 minute
- ✅ Use Groq instead (14,400/day limit)
- ✅ Reduce request frequency

### "OpenAI rate limit reached or insufficient credits"
**OpenAI Billing:**
- ✅ Add payment method: https://platform.openai.com/account/billing
- ✅ Check usage: https://platform.openai.com/usage
- ✅ Switch to free alternatives (Groq/Gemini)

### Rate Limit Visual Indicators
When you hit a rate limit, you'll see:
- ⏱️ **Orange warning box** with specific message
- 📊 **What to do** section with alternatives
- 🔄 **Retry suggestions** based on provider

---

## 📚 API Documentation

- **Groq**: https://console.groq.com/docs
- **Gemini**: https://ai.google.dev/docs
- **OpenAI**: https://platform.openai.com/docs

---

## 🎯 Next Steps

1. ✅ Get free Groq API key (2 min)
2. ✅ Add to `.env.local`
3. ✅ Restart server
4. ✅ Test AI generation
5. ✅ Configure custom AI prompt in Settings
6. ✅ Enjoy AI-powered content! 🚀
