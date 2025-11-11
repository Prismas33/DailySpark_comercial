'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User } from 'firebase/auth';

interface UserDropdownProps {
  user: User;
  onLogout: () => void;
  onSettingsClick?: () => void;
}

export default function UserDropdown({ user, onLogout, onSettingsClick }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Get user's initials for avatar
  const getInitials = (): string => {
    if (user.photoURL) return ''; // Will show photo instead
    if (user.displayName) {
      const names = user.displayName.split(' ');
      if (names.length >= 2) {
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
      }
      return names[0].charAt(0).toUpperCase();
    }
    if (user.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  // Get display text (name or email)
  const getDisplayText = (): string => {
    if (user.displayName) return user.displayName;
    if (user.email) return user.email;
    return 'User';
  };

  // Truncate text for display
  const truncateText = (text: string, maxLength: number = 25): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button - Name only, no photo (photo is in banner) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg px-3 py-2 transition-all"
        aria-label="User menu"
      >
        {/* Display Name or Email */}
        <span className="text-sm text-gray-300 max-w-[150px] truncate">
          {truncateText(getDisplayText(), 20)}
        </span>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
                  {getInitials()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.displayName || 'User'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {/* Settings Option */}
            <button
              onClick={() => {
                setIsOpen(false);
                if (onSettingsClick) {
                  onSettingsClick();
                }
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700/50 flex items-center space-x-2"
            >
              <span className="text-lg">⚙️</span>
              <span>Settings</span>
            </button>

            {/* Divider */}
            <div className="border-t border-gray-700 my-1"></div>

            {/* Logout Option */}
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700/50 flex items-center space-x-2"
            >
              <span className="text-lg">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
