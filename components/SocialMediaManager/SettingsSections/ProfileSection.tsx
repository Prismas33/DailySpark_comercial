'use client';

import React, { useState, useRef } from 'react';
import { User } from 'firebase/auth';
import { Upload, User as UserIcon, Check, X } from 'lucide-react';
import { uploadProfilePhoto, updateUserProfile } from '@/lib/userProfile';
import { CacheService, CACHE_KEYS } from '@/lib/cacheService';

interface ProfileSectionProps {
  user: User;
  onProfileUpdate?: () => void;
}

export default function ProfileSection({ user, onProfileUpdate }: ProfileSectionProps) {
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [photoURL, setPhotoURL] = useState(user.photoURL || '');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    try {
      const newPhotoURL = await uploadProfilePhoto(user, file);
      await updateUserProfile(user, { photoURL: newPhotoURL });
      setPhotoURL(newPhotoURL);
      
      // Clear profile cache to force refresh
      CacheService.remove(CACHE_KEYS.USER_PROFILE);
      
      setMessage({ type: 'success', text: '✅ Photo updated successfully!' });
      onProfileUpdate?.();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to upload photo' });
    } finally {
      setUploading(false);
    }
  };

  const handleNameUpdate = async () => {
    if (!displayName.trim()) {
      setMessage({ type: 'error', text: 'Name cannot be empty' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      await updateUserProfile(user, { displayName: displayName.trim() });
      
      // Clear profile cache to force refresh
      CacheService.remove(CACHE_KEYS.USER_PROFILE);
      
      setMessage({ type: 'success', text: '✅ Name updated successfully!' });
      setIsEditingName(false);
      onProfileUpdate?.();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update name' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 p-4">
      <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
        <UserIcon className="w-4 h-4 text-emerald-400" />
        Profile
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

      {/* Profile Photo */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Profile Photo</label>
        <div className="flex items-center gap-4">
          {/* Avatar Preview */}
          <div className="relative">
            {photoURL ? (
              <img
                src={photoURL}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
                {(user.email || 'U').charAt(0).toUpperCase()}
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {uploading ? 'Uploading...' : 'Change Photo'}
            </button>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG • Max 5MB</p>
          </div>
        </div>
      </div>

      {/* Display Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
        {isEditingName ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              placeholder="Your name"
            />
            <button
              onClick={handleNameUpdate}
              disabled={saving}
              className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50 flex items-center gap-1"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setDisplayName(user.displayName || '');
                setIsEditingName(false);
              }}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg">
            <span className="text-white text-sm">{displayName || 'Not set'}</span>
            <button
              onClick={() => setIsEditingName(true)}
              className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Email (Read-only) */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
        <div className="flex items-center justify-between px-3 py-2 bg-gray-900/30 border border-gray-700/50 rounded-lg">
          <span className="text-gray-400 text-sm">{user.email}</span>
          {user.emailVerified ? (
            <span className="text-xs text-emerald-400 font-medium">✓ Verified</span>
          ) : (
            <span className="text-xs text-orange-400 font-medium">⚠ Not verified</span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">Email cannot be changed here</p>
      </div>
    </div>
  );
}
