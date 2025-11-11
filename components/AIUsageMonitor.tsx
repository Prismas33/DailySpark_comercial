'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface AIUsageMonitorProps {
  className?: string;
}

export default function AIUsageMonitor({ className = '' }: AIUsageMonitorProps) {
  const [usage, setUsage] = useState<{
    provider: string;
    requestsToday: number;
    limit: number;
    lastError?: string;
  } | null>(null);

  useEffect(() => {
    // Load usage from localStorage
    const savedUsage = localStorage.getItem('ai_usage');
    if (savedUsage) {
      try {
        setUsage(JSON.parse(savedUsage));
      } catch (e) {
        console.warn('Failed to parse AI usage data');
      }
    }
  }, []);

  const getProviderInfo = () => {
    if (typeof window === 'undefined') return null;
    
    // Check which provider is configured (client-side only check)
    const hasGroq = document.cookie.includes('groq_configured');
    const hasOpenAI = document.cookie.includes('openai_configured');
    const hasGemini = document.cookie.includes('gemini_configured');

    if (hasGroq) return { name: 'Groq', limit: 14400, color: 'emerald' };
    if (hasOpenAI) return { name: 'OpenAI', limit: 'unlimited', color: 'blue' };
    if (hasGemini) return { name: 'Gemini', limit: 86400, color: 'yellow' };
    
    return null;
  };

  const provider = getProviderInfo();
  if (!provider || !usage) return null;

  const percentage = typeof provider.limit === 'number' 
    ? (usage.requestsToday / provider.limit) * 100 
    : 0;

  const isWarning = percentage > 80;
  const isError = percentage >= 100;

  return (
    <div className={`bg-gray-800/30 border border-gray-700/50 rounded-lg p-3 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isError ? (
            <AlertCircle className="w-4 h-4 text-red-400" />
          ) : isWarning ? (
            <Clock className="w-4 h-4 text-orange-400" />
          ) : (
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          )}
          <span className="text-sm font-medium text-gray-300">AI Usage</span>
        </div>
        <span className="text-xs text-gray-500">{provider.name}</span>
      </div>

      {typeof provider.limit === 'number' && (
        <>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{usage.requestsToday.toLocaleString()} requests</span>
            <span>{provider.limit.toLocaleString()} daily limit</span>
          </div>
          
          <div className="w-full bg-gray-900/50 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isError 
                  ? 'bg-red-500' 
                  : isWarning 
                  ? 'bg-orange-500' 
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>

          {isError && (
            <p className="text-xs text-red-400 mt-2">
              Daily limit reached. Resets at midnight UTC.
            </p>
          )}
          {isWarning && !isError && (
            <p className="text-xs text-orange-400 mt-2">
              Warning: {(100 - percentage).toFixed(0)}% remaining
            </p>
          )}
        </>
      )}

      {provider.limit === 'unlimited' && (
        <p className="text-xs text-gray-400">
          Unlimited usage (paid plan)
        </p>
      )}
    </div>
  );
}
