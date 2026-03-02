import {
    Eye,
    EyeOff,
    Image as ImageIcon,
    Lock,
    Save,
    Upload,
    User,
    X
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../../ui/button';


export default function Settings() {
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@investorshub.com',
    phone: '+1 (555) 123-4567',
    profileImage: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [imagePreview, setImagePreview] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setProfileData({ ...profileData, profileImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    // TODO: API call to save profile
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    
    setIsSaving(true);
    // TODO: API call to change password
    setTimeout(() => {
      setIsSaving(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      alert('Password changed successfully!');
    }, 1000);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-serif text-white mb-1">Account Settings</h1>
        <p className="text-sm text-gray-400">Manage your profile and security settings</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Profile Image */}
        <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="text-lg font-serif text-white">Profile Image</h2>
              <p className="text-sm text-gray-400">Update your profile picture</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Current/Preview Image */}
            <div className="relative">
              {imagePreview || profileData.profileImage ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37]/20">
                  <img 
                    src={imagePreview || profileData.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#1A1A1A] border-2 border-[#D4AF37]/20 flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-500" />
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="flex-1">
              <label className="inline-block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg text-white hover:bg-[#2A2A2A] transition-colors">
                  <Upload className="w-4 h-4" />
                  Upload New Image
                </div>
              </label>
              {(imagePreview || profileData.profileImage) && (
                <button
                  onClick={() => {
                    setImagePreview('');
                    setProfileData({ ...profileData, profileImage: '' });
                  }}
                  className="ml-2 inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Remove
                </button>
              )}
              <p className="text-xs text-gray-500 mt-2">JPG, PNG or WEBP. Max size 2MB.</p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-400/10 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-serif text-white">Profile Information</h2>
              <p className="text-sm text-gray-400">Update your personal details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={profileData.email}
                disabled
                className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
                placeholder="Enter your email"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed for security reasons</p>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleSaveProfile}
                disabled={isSaving}
                size="sm"
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Profile'}
              </Button>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-400/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-serif text-white">Change Password</h2>
              <p className="text-sm text-gray-400">Update your password to keep your account secure</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleChangePassword}
                disabled={isSaving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                size="sm"
                className="flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                {isSaving ? 'Updating...' : 'Change Password'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}