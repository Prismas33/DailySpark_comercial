export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: string | null;
  lastUpdated?: string;
}

export interface UserSettings {
  aiPrompt?: string;
  notifications?: {
    postPublished: boolean;
    postFailed: boolean;
    dailySummary: boolean;
  };
  theme?: 'dark' | 'light';
}

export interface UserData {
  profile: UserProfile;
  settings: UserSettings;
}
