import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseServer';

export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    
    if (!adminAuth || !adminDb) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    const body = await req.json();
    const { content, action } = body;

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // ALWAYS read AI prompt directly from Firestore (source of truth)
    console.log('📖 Reading AI prompt from Firestore for user:', uid);
    const userDoc = await adminDb.collection('users').doc(uid).get();
    const userData = userDoc.exists ? userDoc.data() : null;
    const aiPrompt = userData?.settings?.aiPrompt || null;

    console.log('📩 AI API Request:', {
      uid,
      contentLength: content.length,
      hasAiPrompt: !!aiPrompt,
      promptLength: aiPrompt?.length || 0,
      promptPreview: aiPrompt ? aiPrompt.substring(0, 100) + '...' : 'NOT FOUND IN FIRESTORE',
      action
    });

    if (!aiPrompt) {
      return NextResponse.json({ 
        error: 'No AI prompt configured. Please add your custom instructions in Settings > AI Configuration.' 
      }, { status: 400 });
    }

    console.log('✅ Using AI prompt directly from Firestore');

    // User has FULL control via their Firestore prompt
    const userMessage = `${aiPrompt}\n\n${content}`;

    // Choose AI provider based on environment variables
    const useGroq = process.env.GROQ_API_KEY;
    const useOpenAI = process.env.OPENAI_API_KEY;
    const useGemini = process.env.GEMINI_API_KEY;

    let generatedContent: string | undefined;

    if (useGroq) {
      // Groq API (FREE, FAST, RECOMMENDED)
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', // Updated model (Nov 2024)
          messages: [
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!groqResponse.ok) {
        const errorData = await groqResponse.json();
        console.error('Groq API error:', errorData);
        
        // Handle rate limit errors
        if (groqResponse.status === 429) {
          return NextResponse.json({ 
            error: 'Daily limit reached (14,400 requests/day). Try again tomorrow or use a different API key.',
            rateLimit: true
          }, { status: 429 });
        }
        
        return NextResponse.json({ 
          error: 'Failed to generate content with Groq',
          details: errorData 
        }, { status: 500 });
      }

      const groqData = await groqResponse.json();
      generatedContent = groqData.choices[0]?.message?.content?.trim();

    } else if (useOpenAI) {
      // OpenAI API (PAID)
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json();
        console.error('OpenAI API error:', errorData);
        
        // Handle rate limit or insufficient credits
        if (openaiResponse.status === 429) {
          return NextResponse.json({ 
            error: 'OpenAI rate limit reached or insufficient credits. Check your billing at platform.openai.com',
            rateLimit: true
          }, { status: 429 });
        }
        
        return NextResponse.json({ 
          error: 'Failed to generate content with OpenAI',
          details: errorData 
        }, { status: 500 });
      }

      const openaiData = await openaiResponse.json();
      generatedContent = openaiData.choices[0]?.message?.content?.trim();

    } else if (useGemini) {
      // Google Gemini API (FREE)
      const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: userMessage
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        }),
      });

      if (!geminiResponse.ok) {
        const errorData = await geminiResponse.json();
        console.error('Gemini API error:', errorData);
        
        // Handle rate limit (60 requests/minute)
        if (geminiResponse.status === 429) {
          return NextResponse.json({ 
            error: 'Gemini rate limit reached (60 requests/minute). Wait 1 minute and try again.',
            rateLimit: true
          }, { status: 429 });
        }
        
        return NextResponse.json({ 
          error: 'Failed to generate content with Gemini',
          details: errorData 
        }, { status: 500 });
      }

      const geminiData = await geminiResponse.json();
      generatedContent = geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    } else {
      return NextResponse.json({ 
        error: 'No AI API key configured. Please add GROQ_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY to .env.local' 
      }, { status: 500 });
    }

    if (!generatedContent) {
      return NextResponse.json({ error: 'No content generated' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      generatedContent,
      originalLength: content.length,
      newLength: generatedContent.length,
    });

  } catch (error: any) {
    console.error('AI generation error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to generate content' 
    }, { status: 500 });
  }
}
