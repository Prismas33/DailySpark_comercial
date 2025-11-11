'use client';

import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Sparkles, Save } from 'lucide-react';
import { saveUserSettings, getUserSettings } from '@/lib/userProfile';
import { CacheService, CACHE_KEYS, CACHE_TTL } from '@/lib/cacheService';

interface AIConfigSectionProps {
  user: User;
}

export default function AIConfigSection({ user }: AIConfigSectionProps) {
  const [aiPrompt, setAiPrompt] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const MAX_CHARS = 2000;

  useEffect(() => {
    loadSettings();
  }, [user.uid]);

  const loadSettings = async () => {
    try {
      // Try to get from cache first
      const cachedSettings = CacheService.get<{ aiPrompt: string }>(CACHE_KEYS.AI_PROMPT);
      if (cachedSettings?.aiPrompt) {
        setAiPrompt(cachedSettings.aiPrompt);
        setLoading(false);
        return;
      }

      // If not in cache, fetch from API
      const settings = await getUserSettings(user.uid, user);
      if (settings?.aiPrompt) {
        setAiPrompt(settings.aiPrompt);
        // Cache for 15 minutes
        CacheService.set(CACHE_KEYS.AI_PROMPT, { aiPrompt: settings.aiPrompt }, CACHE_TTL.LONG);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (aiPrompt.length > MAX_CHARS) {
      setMessage({ type: 'error', text: `Prompt must be less than ${MAX_CHARS} characters` });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      await saveUserSettings(user.uid, user, {
        aiPrompt: aiPrompt.trim(),
      });
      
      // Update cache after successful save
      CacheService.set(CACHE_KEYS.AI_PROMPT, { aiPrompt: aiPrompt.trim() }, CACHE_TTL.LONG);
      
      setMessage({ type: 'success', text: '✅ AI prompt saved successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to save prompt' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 p-4">
        <div className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 p-4">
      <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-emerald-400" />
        AI Configuration
      </h4>

      {/* Message */}
      {message && (
        <div
          className={`mb-3 p-2 rounded-lg text-sm ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Info */}
      <div className="mb-3 p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-xs text-blue-400">
          💡 <strong>Tip:</strong> This prompt will be used by AI to generate posts in your style and tone. Be specific about your preferences, topics, and writing style.
        </p>
      </div>

      {/* Prompt Textarea */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Custom AI Prompt
        </label>
        <textarea
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          className="w-full h-40 px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none resize-none"
          placeholder="Example: Write professional posts about technology and software development. Use a friendly but authoritative tone. Include occasional emojis. Focus on practical tips and real-world examples..."
        />
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-400">
            {aiPrompt.length} / {MAX_CHARS} characters
          </span>
          {aiPrompt.length > MAX_CHARS && (
            <span className="text-xs text-red-400">Character limit exceeded!</span>
          )}
        </div>
      </div>

      {/* Examples */}
      <div className="mb-3 p-2 bg-gray-900/50 border border-gray-700/50 rounded-lg">
        <p className="text-xs font-medium text-gray-300 mb-1">Example prompts:</p>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• "Write posts about AI and machine learning for beginners, use simple language"</li>
          <li>• "Professional business consultant tone, focus on leadership and productivity"</li>
          <li>• "Creative designer sharing tips, use visual metaphors and emoji"</li>
        </ul>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving || aiPrompt.length > MAX_CHARS}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Save AI Prompt
          </>
        )}
      </button>
    </div>
  );
}
