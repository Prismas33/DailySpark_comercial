'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SocialMediaManager from '@/components/SocialMediaManager/SocialMediaManager';
import UserDropdown from '@/components/UserDropdown';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';

export default function DashboardClient() {
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    (async () => {
      const { auth: firebaseAuth } = await import('@/lib/firebase');
      setAuth(firebaseAuth);
      unsub = onAuthStateChanged(firebaseAuth, (user) => {
        setFirebaseUser(user);
        setLoading(false);
        if (!user) {
          router.push('/auth/signin');
        }
      });
    })();
    return () => { if (unsub) unsub(); };
  }, [router]);

  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
        router.push('/auth/signin');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!firebaseUser) {
    return null; // Will redirect
  }

  return <SocialMediaManager user={firebaseUser} onLogout={handleLogout} />;
}
