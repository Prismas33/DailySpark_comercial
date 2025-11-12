'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// 🎭 DEMO MODE: Original Firebase import commented, using mock instead
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import { mockCreateUserWithEmailAndPassword, isDemoMode } from '@/lib/mockAuth';
export const dynamic = 'force-dynamic';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [demoMode] = useState(isDemoMode());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      if (demoMode) {
        // 🎭 DEMO MODE: Use mock authentication
        await mockCreateUserWithEmailAndPassword(email, password);
        setSuccess('Account created! Redirecting to sign in...');
        setTimeout(() => router.push('/auth/signin'), 1500);
      } else {
        // Original Firebase code (commented for demo)
        // const { auth } = await import('@/lib/firebase');
        // await createUserWithEmailAndPassword(auth, email, password);
        // setSuccess('Account created! Redirecting to sign in...');
        // setTimeout(() => router.push('/auth/signin'), 1500);
        setError('Demo mode only. Real authentication disabled.');
      }
    } catch (err: any) {
      const code = err?.message || err?.code || '';
      if (code.includes('email-already-in-use')) setError('Email already in use');
      else if (code.includes('invalid-email')) setError('Invalid email');
      else if (code.includes('weak-password')) setError('Password must be at least 6 characters');
      else setError('Failed to create account. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 🎭 DEMO MODE BANNER */}
        {demoMode && (
          <div className="mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-xl p-4 text-center animate-pulse">
            <div className="flex items-center justify-center space-x-2 text-white font-semibold">
              <span className="text-2xl">🎭</span>
              <span>DEMO MODE</span>
              <span className="text-2xl">🎭</span>
            </div>
            <p className="text-white text-xs mt-1 opacity-90">
              Create account with any email and password
            </p>
          </div>
        )}

        <div className="bg-gray-900/60 border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white">Create Account</h1>
            <p className="text-gray-400 text-sm">
              {demoMode ? 'Try the demo - no real signup required!' : 'Sign up to get started'}
            </p>
          </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

          <div className="text-center mt-4 text-sm text-gray-400">
            Already have an account?{' '}
            <a href="/auth/signin" className="text-emerald-400 hover:underline">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
}
