# AI Custom Prompt Testing Guide

## 🎯 What We Fixed

The custom AI prompt from Settings is now **guaranteed** to be used when you click "✨ Improve with AI":

1. ✅ **Cache is loaded fresh** every time the AI modal opens
2. ✅ **Console logs** show exactly what prompt is being sent
3. ✅ **Visual indicator** in the modal shows if using custom or default prompt
4. ✅ **Complete flow** from Settings → Cache → AI Generation

---

## 🧪 How to Test (Step-by-Step)

### **Step 1: Configure Your Custom Prompt**

1. Go to **Dashboard** → Click your profile → **Settings**
2. Open the **AI Configuration** tab
3. In the textarea, write your custom instructions. Examples:

   **Portuguese Style:**
   ```
   Você é um especialista em marketing digital português. Melhore o conteúdo mantendo um tom profissional mas amigável, usando linguagem de Portugal (não Brasil). Inclua emojis relevantes e hashtags quando apropriado.
   ```

   **Tech Professional:**
   ```
   You are a senior software engineer writing for LinkedIn. Keep content technical but accessible, highlight insights, and maintain a thought-leadership tone. Use clear paragraphs and avoid fluff.
   ```

   **Casual/Funny:**
   ```
   You're a friendly social media manager with a great sense of humor. Make content fun, engaging, and slightly playful while staying professional. Use emojis, but don't overdo it.
   ```

4. Click **💾 Save Settings**
5. ✅ You should see: "Settings saved successfully"

---

### **Step 2: Test AI Generation**

1. Go back to **Dashboard**
2. Click **"Post Now"** or **"Schedule"** tab
3. Write some basic content in the textarea:

   ```
   New product launch next week. Very excited about this.
   ```

4. Click **"✨ Improve with AI"** button
5. **Check the modal header:**
   - 🟢 Green badge = "Using your custom AI prompt from Settings" ✅
   - 🔵 Gray badge = "Using default prompt" ⚠️

---

### **Step 3: Verify in Console (Developer Mode)**

Open the browser console (F12) and look for these logs:

```
✅ AI Prompt loaded from cache: Você é um especialista em marketing...
🚀 Sending to AI API: { contentLength: 45, hasCustomPrompt: true, promptPreview: "Você é..." }
📩 AI API Request: { uid: "xyz123", hasCustomPrompt: true, customPromptPreview: "Você é..." }
🤖 Using system prompt: Você é um especialista em marketing digital português...
✅ AI content generated successfully
```

**What to look for:**
- ✅ `hasCustomPrompt: true` means your prompt is being sent
- ✅ `customPromptPreview` should match your Settings textarea
- ❌ If you see `hasCustomPrompt: false`, the cache didn't load

---

### **Step 4: Compare Results**

**Without Custom Prompt (default):**
- Generic, professional tone
- Standard English phrasing
- Minimal personality

**With Portuguese Custom Prompt:**
- Portuguese language (Portugal style)
- Professional but friendly tone
- Emojis and hashtags included

**With Funny Custom Prompt:**
- More playful language
- Casual tone with personality
- Engaging and conversational

---

## 🐛 Troubleshooting

### ❌ Modal shows "Using default prompt"

**Cause:** Cache expired or not set  
**Fix:**
1. Go to Settings → AI Configuration
2. Re-save your prompt (even without changes)
3. Wait 2-3 seconds
4. Try AI generation again

---

### ❌ Console shows `hasCustomPrompt: false`

**Cause:** Prompt not in localStorage  
**Fix:**
1. Open Console (F12)
2. Run:
   ```javascript
   localStorage.getItem('dailyspark_cache_ai_prompt')
   ```
3. If `null`, re-save in Settings
4. If exists, check expiry: cache lasts **15 minutes** (900s)

---

### ❌ Generated content ignores my style

**Cause:** AI model temperature or prompt clarity  
**Fix:**
1. Make your custom prompt **more specific**:
   ```
   BAD:  "Write professionally"
   GOOD: "Write as a senior developer sharing insights on LinkedIn. Use technical terms but explain them clearly. Include 1-2 relevant emojis."
   ```
2. Try **Regenerate** button for variations
3. Check if Groq model is responding correctly

---

## 📊 Cache System Details

### Cache Key
```typescript
CACHE_KEYS.AI_PROMPT = 'ai_prompt'
// Stored as: dailyspark_cache_ai_prompt
```

### Cache Structure
```json
{
  "value": {
    "aiPrompt": "Your custom prompt text here..."
  },
  "expiry": 1735689234567
}
```

### Cache TTL (Time To Live)
- **Default:** 15 minutes (900 seconds)
- **Location:** `AIConfigSection.tsx` → `CACHE_TTL.LONG`
- **Cleared on:** Logout, Settings update

---

## 🔄 Complete Data Flow

```
Settings Page
    ↓
[User types custom prompt]
    ↓
Click "Save Settings"
    ↓
1. API: POST /api/user/settings (Firestore update)
2. Cache: localStorage.setItem('dailyspark_cache_ai_prompt', ...)
    ↓
[Cache valid for 15 min]
    ↓
ManualPost/SchedulePost Page
    ↓
useEffect(() => {
  const cached = CacheService.get(CACHE_KEYS.AI_PROMPT)
  setAiPrompt(cached.aiPrompt)
})
    ↓
Click "✨ Improve with AI"
    ↓
AIContentGenerator Modal Opens
    ↓
useEffect(() => {
  const cached = CacheService.get(CACHE_KEYS.AI_PROMPT)
  setCurrentPrompt(cached.aiPrompt)  // FRESH LOAD
})
    ↓
Click "Generate AI Suggestion"
    ↓
fetch('/api/ai/generate-content', {
  body: JSON.stringify({
    content: originalContent,
    userPrompt: currentPrompt,  // YOUR CUSTOM PROMPT
    action: 'improve'
  })
})
    ↓
API Route (route.ts)
    ↓
const systemPrompt = userPrompt || 'default...'
    ↓
Groq API Call
    ↓
Generated content matches YOUR style!
```

---

## ✅ Success Checklist

- [ ] Custom prompt saved in Settings (✅ success message shown)
- [ ] Modal shows green badge "Using your custom AI prompt"
- [ ] Console logs show `hasCustomPrompt: true`
- [ ] Console logs show `customPromptPreview` matching your text
- [ ] Generated content matches your specified style/language
- [ ] Regenerate button creates variations in same style
- [ ] After 15 minutes, cache auto-refreshes from Settings

---

## 🎉 Expected Behavior

When everything works correctly:

1. **Save custom prompt** in Settings → Cache updated instantly
2. **Open AI modal** → Badge shows "Using your custom prompt"
3. **Click Generate** → Console logs show your prompt being sent
4. **AI responds** → Content matches your style/language/tone
5. **Click Regenerate** → New variation, same style
6. **Close and reopen modal** → Prompt still loaded (within 15 min)
7. **After logout** → Cache cleared, next login re-loads from Firestore

---

## 💡 Pro Tips

1. **Be specific:** The more detailed your prompt, the better the AI output
2. **Test variations:** Try different prompts for different content types
3. **Use examples:** Include example phrases in your prompt for better results
4. **Check console:** Always verify logs if output seems wrong
5. **Re-save if needed:** If cache expires, just re-save in Settings

---

## 📝 Example Prompts

### Professional LinkedIn
```
You are a C-level executive writing thought leadership content for LinkedIn. Maintain an authoritative yet approachable tone. Focus on business insights, strategic thinking, and industry trends. Use clear paragraphs, avoid jargon unless necessary, and include 1-2 professional emojis.
```

### Instagram Casual
```
You're creating content for Instagram. Keep it short, punchy, and visual. Use line breaks for readability, include relevant emojis throughout, and end with 3-5 targeted hashtags. Tone should be friendly and conversational.
```

### Tech Twitter/X
```
You're a developer sharing quick tech insights on Twitter/X. Keep posts under 280 characters when possible. Use technical terms accurately but stay accessible. Include relevant hashtags like #devops #webdev. Tone: informative but concise.
```

### Portuguese Business
```
Escreve como um gestor de marketing português. Tom profissional mas acessível, usando linguagem de Portugal. Inclui insights práticos e exemplos concretos. Usa 1-2 emojis relevantes e termina com hashtags apropriadas ao mercado português.
```

---

**Last Updated:** January 2025  
**Related Docs:**
- [AI_SETUP_GUIDE.md](./AI_SETUP_GUIDE.md) - API keys setup
- [SOCIAL_MEDIA_MANAGER_ARCHITECTURE.md](./SOCIAL_MEDIA_MANAGER_ARCHITECTURE.md) - System overview
