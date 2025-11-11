'use client';

import React from 'react';
import { Network } from 'lucide-react';

type SocialPlatform = 'linkedin' | 'x' | 'facebook' | 'instagram';

interface ConnectedAccount {
  platform: SocialPlatform;
  connected: boolean;
  username?: string;
}

const platformConfigs = {
  linkedin: {
    name: 'LinkedIn',
    icon: '💼',
    description: 'Share professional content and updates',
    enabled: true
  },
  x: {
    name: 'X (Twitter)',
    icon: '𝕏',
    description: 'Post quick updates and engage',
    enabled: true
  },
  facebook: {
    name: 'Facebook',
    icon: '📘',
    description: 'Share posts to your page',
    enabled: false
  },
  instagram: {
    name: 'Instagram',
    icon: '📸',
    description: 'Share visual content',
    enabled: false
  }
};

export default function PlatformsSection() {
  const connectedAccounts: ConnectedAccount[] = [
    { platform: 'linkedin', connected: true, username: 'André Ventura' },
    { platform: 'x', connected: true, username: 'Your X Account' },
    { platform: 'facebook', connected: false },
    { platform: 'instagram', connected: false }
  ];

  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 p-4">
      <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
        <Network className="w-4 h-4 text-emerald-400" />
        Connected Platforms
      </h4>

      <p className="text-sm text-gray-400 mb-3">
        Your social media accounts are configured via environment variables.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.entries(platformConfigs).map(([platform, config]) => {
          const account = connectedAccounts.find(acc => acc.platform === platform);
          const isConnected = account?.connected || false;

          return (
            <div
              key={platform}
              className="bg-gray-900/50 rounded-lg border border-gray-700/50 p-3 hover:border-gray-600 transition-all"
            >
              <div className="flex items-start gap-2 mb-2">
                <div className="text-xl">{config.icon}</div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-white text-sm">{config.name}</h5>
                  <p className="text-xs text-gray-400 mt-0.5">{config.description}</p>
                </div>
              </div>

              <div
                className={`px-2 py-1.5 rounded text-xs font-medium ${
                  isConnected
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                    : 'bg-gray-700/30 border border-gray-600/30 text-gray-400'
                }`}
              >
                {isConnected ? '✅ Connected' : '❌ Not Connected'}
                {isConnected && account?.username && (
                  <div className="text-gray-500 mt-0.5">{account.username}</div>
                )}
              </div>

              {!config.enabled && (
                <p className="text-xs text-orange-400 mt-1.5 flex items-center gap-1">
                  ⏳ API em desenvolvimento
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Configuration Notes */}
      <div className="mt-3 p-2 bg-teal-500/10 border border-teal-500/30 rounded-lg">
        <p className="text-xs text-teal-300 font-medium mb-1">💡 Configuration Notes</p>
        <ul className="text-xs text-gray-400 space-y-0.5">
          <li>• Credentials configured in .env.local file</li>
          <li>• LinkedIn limit: ~1300 | X limit: ~280 characters</li>
          <li>• All data encrypted and stored securely</li>
        </ul>
      </div>
    </div>
  );
}
