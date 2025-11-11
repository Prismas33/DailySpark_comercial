'use client';

import React, { useState } from 'react';
import { User, updatePassword, EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification } from 'firebase/auth';
import { Lock, Shield, Mail } from 'lucide-react';

interface SecuritySectionProps {
  user: User;
}

export default function SecuritySection({ user }: SecuritySectionProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [sendingVerification, setSendingVerification] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const getPasswordStrength = (password: string): { strength: string; color: string } => {
    if (password.length === 0) return { strength: '', color: '' };
    if (password.length < 6) return { strength: 'Weak', color: 'text-red-400' };
    if (password.length < 10) return { strength: 'Medium', color: 'text-orange-400' };
    return { strength: 'Strong', color: 'text-emerald-400' };
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill all fields' });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    setUpdating(true);
    setMessage(null);

    try {
      // Reauthenticate user
      if (!user.email) throw new Error('User email not found');
      
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      setMessage({ type: 'success', text: '✅ Password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        setMessage({ type: 'error', text: 'Current password is incorrect' });
      } else if (error.code === 'auth/weak-password') {
        setMessage({ type: 'error', text: 'New password is too weak' });
      } else {
        setMessage({ type: 'error', text: error.message || 'Failed to update password' });
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleSendVerificationEmail = async () => {
    setSendingVerification(true);
    setMessage(null);

    try {
      await sendEmailVerification(user);
      setMessage({ type: 'success', text: '✅ Verification email sent! Check your inbox.' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to send verification email' });
    } finally {
      setSendingVerification(false);
    }
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 p-4">
      <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
        <Shield className="w-4 h-4 text-emerald-400" />
        Security
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

      {/* Email Verification */}
      {!user.emailVerified && (
        <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
          <div className="flex items-start gap-2 mb-2">
            <Mail className="w-4 h-4 text-orange-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-orange-400 font-medium">Email Not Verified</p>
              <p className="text-xs text-gray-400 mt-1">
                Please verify your email to unlock all features
              </p>
            </div>
          </div>
          <button
            onClick={handleSendVerificationEmail}
            disabled={sendingVerification}
            className="w-full px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50"
          >
            {sendingVerification ? 'Sending...' : 'Send Verification Email'}
          </button>
        </div>
      )}

      {/* Change Password */}
      <div className="space-y-3">
        <p className="text-sm text-gray-400">Update your password to keep your account secure</p>

        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
            placeholder="Enter current password"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
            placeholder="Enter new password (min 6 chars)"
          />
          {newPassword && (
            <p className={`text-xs mt-1 ${passwordStrength.color}`}>
              Password strength: {passwordStrength.strength}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
            placeholder="Confirm new password"
          />
        </div>

        {/* Update Button */}
        <button
          onClick={handlePasswordUpdate}
          disabled={updating || !currentPassword || !newPassword || !confirmPassword}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {updating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Updating...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Update Password
            </>
          )}
        </button>
      </div>
    </div>
  );
}
