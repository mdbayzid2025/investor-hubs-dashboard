import React, { useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { useResetPasswordMutation } from '../../redux/features/auth/authApi';
import { Button } from '../ui/button';

export default function NewPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      const res = await resetPassword(formData).unwrap();

      if (res?.success) {
        toast.success(res.message);
        setIsSuccess(true);

        Cookies.remove('verify-email');
        Cookies.remove('resetToken');
        Cookies.remove('otpExpiry');

        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Reset failed');
      setError('The reset link may be invalid or expired.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-black px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
            <img src="/logo.png" alt="" className="w-36 mx-auto" />
          <h1 className="text-xl font-serif text-white mb-2">
            Create New Password
          </h1>
          <p className="text-gray-400">
            Choose a strong password for your account
          </p>
        </div>

        <div className="bg-[#111111] p-8 rounded-xl border border-primary/20">
          {isSuccess ? (
            /* SUCCESS ALERT */
            <div className="text-center space-y-4 animate-in fade-in zoom-in">
              <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
              <h2 className="text-xl font-semibold text-white">
                Password Reset Successful
              </h2>
              <p className="text-sm text-gray-400">
                You will be redirected to the login page shortly.
              </p>

              <Button
                className="w-full bg-primary text-black hover:bg-primary/90"
                onClick={() => navigate('/login')}
              >
                Go to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NEW PASSWORD */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    className="w-full bg-[#1A1A1A] border border-primary/20 rounded-lg pl-12 pr-12 py-3 text-white focus:border-primary outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3 top-1/2 bg-transparent! border-none! border-0! -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute  left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    className="w-full bg-[#1A1A1A] bg-transparent! border border-primary/20 rounded-lg pl-12 pr-12 py-3 text-white focus:border-primary outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(p => !p)}
                    className="absolute bg-transparent! border-none! border-0! right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* REQUIREMENTS */}
              <div className="bg-[#1A1A1A] border border-primary/10 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">
                  Password requirements:
                </p>
                <ul className="text-xs space-y-1">
                  <li
                    className={
                      formData.newPassword.length >= 8
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >
                    • At least 8 characters
                  </li>
                  <li
                    className={
                      formData.newPassword &&
                      formData.newPassword === formData.confirmPassword
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >
                    • Passwords match
                  </li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary  hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </Button>

              {error && (
                <div className="text-sm text-red-500 text-center">
                  {error}
                </div>
              )}
            </form>
          )}

          {!isSuccess && (
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-gray-400 hover:text-primary"
              >
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}