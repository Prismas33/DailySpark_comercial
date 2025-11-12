import { User, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { UserProfile, UserSettings } from '@/types/user';

/**
 * Get Firebase ID token for API authentication
 */
async function getAuthToken(user: User): Promise<string> {
  return await user.getIdToken();
}

/**
 * Upload user profile photo to Firebase Storage
 */
export async function uploadProfilePhoto(user: User, file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File size must be less than 5MB');
  }

  // 🎭 DEMO MODE: Return mock photo URL
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
  if (isDemoMode || !storage) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'User')}&size=200&background=10b981&color=fff`;
  }

  const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
  await uploadBytes(storageRef, file);
  const photoURL = await getDownloadURL(storageRef);
  
  return photoURL;
}

/**
 * Update user display name via API route (uses Admin SDK)
 */
export async function updateUserProfile(
  user: User,
  updates: { displayName?: string; photoURL?: string }
): Promise<void> {
  // Update Firebase Auth profile (client-side)
  await updateProfile(user, updates);

  // Update via API route (uses Admin SDK)
  const token = await getAuthToken(user);
  const response = await fetch('/api/user/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      action: 'updateProfile',
      displayName: updates.displayName,
      photoURL: updates.photoURL,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update profile');
  }
}

/**
 * Get user profile from Firestore via API route
 */
export async function getUserProfile(uid: string, user: User): Promise<UserProfile | null> {
  const token = await getAuthToken(user);
  const response = await fetch('/api/user/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  const data = await response.json();
  return data.profile || null;
}

/**
 * Save user settings to Firestore via API route
 */
export async function saveUserSettings(uid: string, user: User, settings: UserSettings): Promise<void> {
  const token = await getAuthToken(user);
  const response = await fetch('/api/user/settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ settings }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to save settings');
  }
}

/**
 * Get user settings from Firestore via API route
 */
export async function getUserSettings(uid: string, user: User): Promise<UserSettings | null> {
  const token = await getAuthToken(user);
  const response = await fetch('/api/user/settings', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch settings');
  }

  const data = await response.json();
  return data.settings || null;
}
