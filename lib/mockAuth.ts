// 🎭 MOCK AUTHENTICATION SERVICE
// This simulates Firebase Auth for the commercial demo version
// Accepts any email/password combination and creates fake user sessions

export interface MockUser {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

// In-memory store for demo users
const mockUsers: Map<string, MockUser> = new Map();
let currentUser: MockUser | null = null;

// Generate a fake UID
function generateUID(email: string): string {
  return `mock_${btoa(email).substring(0, 20)}`;
}

// Create mock user from email
function createMockUser(email: string, displayName?: string): MockUser {
  return {
    uid: generateUID(email),
    email,
    displayName: displayName || email.split('@')[0],
    photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName || email.split('@')[0])}&background=random`,
    emailVerified: true,
  };
}

// Mock sign in - accepts any credentials
export async function mockSignInWithEmailAndPassword(email: string, password: string): Promise<MockUser> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Accept any non-empty credentials
  if (!email || !password) {
    throw new Error('auth/invalid-credentials');
  }

  // Get or create user
  let user = mockUsers.get(email);
  if (!user) {
    user = createMockUser(email);
    mockUsers.set(email, user);
  }

  currentUser = user;
  
  // Store in localStorage for persistence
  if (typeof window !== 'undefined') {
    localStorage.setItem('mockUser', JSON.stringify(user));
  }

  return user;
}

// Mock sign up - creates new user
export async function mockCreateUserWithEmailAndPassword(email: string, password: string): Promise<MockUser> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!email || !password) {
    throw new Error('auth/invalid-credentials');
  }

  if (password.length < 6) {
    throw new Error('auth/weak-password');
  }

  // Check if user already exists
  if (mockUsers.has(email)) {
    throw new Error('auth/email-already-in-use');
  }

  const user = createMockUser(email);
  mockUsers.set(email, user);
  currentUser = user;

  // Store in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('mockUser', JSON.stringify(user));
  }

  return user;
}

// Mock sign out
export async function mockSignOut(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300));
  currentUser = null;
  
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mockUser');
  }
}

// Get current mock user
export function getMockCurrentUser(): MockUser | null {
  if (currentUser) return currentUser;

  // Try to restore from localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('mockUser');
    if (stored) {
      try {
        currentUser = JSON.parse(stored);
        return currentUser;
      } catch {
        localStorage.removeItem('mockUser');
      }
    }
  }

  return null;
}

// Mock auth state observer
export function mockOnAuthStateChanged(callback: (user: MockUser | null) => void): () => void {
  // Immediately call with current user
  const user = getMockCurrentUser();
  setTimeout(() => callback(user), 0);

  // Listen to storage changes (for multi-tab support)
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'mockUser') {
      if (e.newValue) {
        try {
          currentUser = JSON.parse(e.newValue);
          callback(currentUser);
        } catch {
          callback(null);
        }
      } else {
        currentUser = null;
        callback(null);
      }
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorageChange);
  }

  // Return unsubscribe function
  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorageChange);
    }
  };
}

// Mock get ID token
export async function mockGetIdToken(user: MockUser): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return `mock_token_${user.uid}_${Date.now()}`;
}

// Check if we're in demo mode
export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || 
         process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'DEMO_MODE_NO_REAL_API_KEY' ||
         !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
}
