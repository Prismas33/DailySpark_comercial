# 🎭 DailySpark - Commercial Demo Version

This is a **commercial demo version** of DailySpark with all real API keys and services removed.

## Demo Mode Features

✨ **Fully Functional Demo** - Experience all features without real API connections
- Mock authentication (accepts any email/password)
- Simulated social media data
- Fake post scheduling and publishing
- Mock analytics and engagement metrics

## How to Use

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Login with any credentials:**
   - Email: `demo@dailyspark.com` (or any email)
   - Password: `demo123` (or any password)

3. **Explore the features:**
   - Create posts
   - Schedule content
   - View analytics
   - Manage social accounts (all mocked)

## What's Been Mocked

### Authentication
- ✅ Firebase Auth replaced with local mock
- ✅ Accepts any email/password combination
- ✅ Maintains session in localStorage

### Data Services
- ✅ Social media posts (scheduled & published)
- ✅ Content templates
- ✅ Social account connections
- ✅ Analytics and engagement metrics
- ✅ AI content generation
- ✅ Image uploads

### APIs Removed
- 🔒 Firebase (Admin & Client)
- 🔒 OpenAI API
- 🔒 Groq API
- 🔒 LinkedIn OAuth
- 🔒 Twitter/X API
- 🔒 Facebook API

## Files Modified for Demo Mode

### Core Services
- `lib/mockAuth.ts` - Mock authentication service
- `lib/mockData.ts` - Mock data generator
- `lib/firebase.ts` - Modified to support demo mode
- `.env.local` - All credentials removed

### UI Components
- `app/auth/signin/page.tsx` - Demo-enabled login
- `app/auth/signup/page.tsx` - Demo-enabled signup
- `app/dashboard/DashboardClient.tsx` - Mock user support
- `components/SocialMediaManager/SocialMediaManager.tsx` - Demo banner added
- `components/UserDropdown.tsx` - Mock user support
- `components/WelcomeBanner.tsx` - Mock user support

## Converting Back to Production

To restore real API functionality:

1. Add real Firebase credentials to `.env.local`
2. Set `NEXT_PUBLIC_DEMO_MODE=false`
3. Uncomment original Firebase code (marked with 🎭 DEMO MODE comments)
4. Remove mock imports and restore Firebase imports

## Demo Credentials

The demo accepts **any** credentials, but here are some examples:
- `demo@dailyspark.com` / `demo123`
- `test@example.com` / `password`
- `user@company.com` / `123456`

## Visual Indicators

- 🎭 **Purple banner** on login/signup pages
- 🎭 **Top banner** in dashboard indicating demo mode
- 🎭 **Code comments** marking all demo-related changes

---

**Note:** This is a demonstration version only. No real data is saved, and no actual social media posting occurs.
