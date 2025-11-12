'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Send, Image, X, Sparkles } from 'lucide-react';
import AIContentGenerator from '@/components/AIContentGenerator';
import { CacheService, CACHE_KEYS } from '@/lib/cacheService';

type Platform = 'linkedin' | 'x' | 'facebook' | 'instagram';

interface SchedulePostProps {
  onSuccess?: () => void;
}

const SchedulePost: React.FC<SchedulePostProps> = ({ onSuccess }) => {
  const [content, setContent] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('09:00'); // Default to 9 AM UTC
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['linkedin', 'x']);
  const [mediaUrl, setMediaUrl] = useState('');
  const [postType, setPostType] = useState<'post' | 'reel'>('post');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState<string>('');

  // Load AI prompt from cache/settings
  useEffect(() => {
    const cachedSettings = CacheService.get<{ aiPrompt: string }>(CACHE_KEYS.AI_PROMPT);
    if (cachedSettings?.aiPrompt) {
      setAiPrompt(cachedSettings.aiPrompt);
    }
  }, []);

  const platforms = [
    { id: 'linkedin' as Platform, name: 'LinkedIn', icon: '💼', enabled: true },
    { id: 'x' as Platform, name: 'X (Twitter)', icon: '𝕏', enabled: true },
    { id: 'facebook' as Platform, name: 'Facebook', icon: '📘', enabled: true },
    { id: 'instagram' as Platform, name: 'Instagram', icon: '📸', enabled: true }
  ];

  // Horários em que as funções executam (UTC)
  const scheduledTimes = [
    { value: '09:00', label: '09:00 UTC (9h da manhã)' },
    { value: '12:00', label: '12:00 UTC (Meio-dia)' },
    { value: '18:00', label: '18:00 UTC (6h da tarde)' }
  ];

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const schedulePost = async () => {
    if (!content.trim()) {
      setMessage({ type: 'error', text: 'Please enter post content' });
      return;
    }

    if (!scheduledDate || !scheduledTime) {
      setMessage({ type: 'error', text: 'Please select date and time' });
      return;
    }

    if (selectedPlatforms.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one platform' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // 🎭 DEMO MODE: Check if in demo mode
      const { isDemoMode } = await import('@/lib/mockAuth');
      
      if (isDemoMode()) {
        // 🎭 DEMO MODE: Simulate scheduling
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setMessage({ type: 'success', text: '🎭 Demo: Post scheduled successfully!' });
        // Reset form
        setContent('');
        setScheduledDate('');
        setScheduledTime('');
        setMediaUrl('');
        setPostType('post');
        onSuccess?.();
        setLoading(false);
        return;
      }

      // Original code for production
      // Combinar data e hora em ISO
      const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();

      const response = await fetch('/api/social-media-queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          scheduledAt: scheduledDateTime,
          platforms: selectedPlatforms,
          mediaUrl: mediaUrl || undefined,
          postType: postType
        })
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: '✅ Post scheduled successfully!' });
        // Reset form
        setContent('');
        setScheduledDate('');
        setScheduledTime('');
        setMediaUrl('');
        setPostType('post');
        onSuccess?.();
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to schedule post' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error scheduling post. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl border border-gray-800 p-4 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-bold text-white">Schedule Post</h3>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
          message.type === 'success' 
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
            : 'bg-red-500/10 border border-red-500/30 text-red-400'
        }`}>
          {message.type === 'success' ? '✓' : '✕'}
          <span className="text-sm">{message.text}</span>
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-300">Content</label>
          {content.trim() && (
            <button
              onClick={() => setShowAI(true)}
              className="text-xs px-2 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/30 text-emerald-300 rounded-md flex items-center gap-1 transition-all"
            >
              <Sparkles className="w-3 h-3" />
              Improve with AI
            </button>
          )}
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full h-40 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none resize-none transition-all"
        />
        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
          <span>{content.length} characters</span>
          <span>LinkedIn: ~1300 | X: ~280</span>
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            <Calendar className="w-4 h-4 inline mr-2" />
            Date
          </label>
          <input
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            <Clock className="w-4 h-4 inline mr-2" />
            Time (UTC)
          </label>
          <select
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
          >
            {scheduledTimes.map(time => (
              <option key={time.value} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-2">
            Posts são processados automaticamente nestes horários
          </p>
        </div>
      </div>

      {/* Media URL (Optional) */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          <Image className="w-4 h-4 inline mr-2" />
          Image or Video URL (Optional)
        </label>
        <input
          type="url"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          placeholder="https://example.com/image.jpg or video.mp4"
          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
        />
      </div>

      {/* Platform Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-3">Platforms</label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => platform.enabled && togglePlatform(platform.id)}
              disabled={!platform.enabled}
              className={`px-3 py-2 rounded-lg border-2 transition-all flex items-center gap-2 ${
                platform.enabled ? '' : 'opacity-50 cursor-not-allowed'
              } ${
                selectedPlatforms.includes(platform.id) && platform.enabled
                  ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300 shadow-lg shadow-emerald-500/20'
                  : 'border-gray-700 bg-gray-900/30 text-gray-400 hover:border-gray-600'
              }`}
            >
              <div className="text-2xl flex-shrink-0">{platform.icon}</div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-sm font-medium truncate">{platform.name}</div>
                {!platform.enabled && (
                  <div className="text-[10px] text-orange-400">Em breve</div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Post Type (for Facebook/Instagram) */}
      {(selectedPlatforms.includes('facebook') || selectedPlatforms.includes('instagram')) && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-3">Post Type</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPostType('post')}
              className={`p-3 rounded-xl border-2 transition-all ${
                postType === 'post'
                  ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300'
                  : 'border-gray-700 bg-gray-900/30 text-gray-400 hover:border-gray-600'
              }`}
            >
              <div className="text-xl mb-1">📄</div>
              <div className="text-sm font-medium">Normal Post</div>
            </button>
            <button
              onClick={() => setPostType('reel')}
              className={`p-3 rounded-xl border-2 transition-all ${
                postType === 'reel'
                  ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300'
                  : 'border-gray-700 bg-gray-900/30 text-gray-400 hover:border-gray-600'
              }`}
            >
              <div className="text-xl mb-1">🎬</div>
              <div className="text-sm font-medium">Reel (Video 9:16)</div>
            </button>
          </div>
        </div>
      )}

      {/* Schedule Button */}
      <button
        onClick={schedulePost}
        disabled={loading || !content.trim() || !scheduledDate || !scheduledTime || selectedPlatforms.length === 0}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent mr-3"></div>
            Scheduling...
          </>
        ) : (
          <>
            <Clock className="w-5 h-5 mr-3" />
            Schedule Post
          </>
        )}
      </button>

      {/* AI Content Generator Modal */}
      {showAI && (
        <AIContentGenerator
          originalContent={content}
          userPrompt={aiPrompt}
          onAcceptSuggestion={(newContent) => setContent(newContent)}
          onClose={() => setShowAI(false)}
        />
      )}
    </div>
  );
};

export default SchedulePost;
