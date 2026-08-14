'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to dashboard on sign in
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff] p-4 relative overflow-hidden">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#d6e3ff] via-transparent to-transparent" />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#d4e3ff] via-transparent to-transparent" />

      <main className="w-full max-w-5xl relative z-10 flex flex-col md:flex-row min-h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-white border border-[#c2c6d3]/30">
        {/* Left Side: Branding */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#004287] to-[#1e5aa8] p-12 text-white relative overflow-hidden">
          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]" />

          <div className="relative z-10">
            <h1 className="text-[40px] leading-[48px] font-bold tracking-tight mb-4">
              DermAI
            </h1>
            <p className="text-lg leading-7 opacity-90 max-w-md">
              Precision dermatological screening and clinical diagnostic support, powered by advanced machine learning.
            </p>
          </div>

          <div className="relative z-10 mt-12">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-[#d6e3ff]">
                  verified_user
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider text-[#d6e3ff]">
                  Secure & Compliant
                </span>
              </div>
              <p className="text-base opacity-80">
                HIPAA compliant data processing ensures your patient records remain strictly confidential.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center mb-8">
            <h1 className="text-[28px] leading-9 font-semibold text-[#004287] tracking-tight">
              DermAI
            </h1>
          </div>

          <div className="max-w-sm w-full mx-auto">
            <div className="text-center md:text-left mb-8">
              <h2 className="text-[32px] leading-10 font-semibold text-[#0b1c30] mb-2">
                {isSignUp ? 'Create account' : 'Welcome back'}
              </h2>
              <p className="text-base text-[#424751]">
                {isSignUp
                  ? 'Sign up to access clinical diagnostic tools.'
                  : 'Sign in to access your clinical dashboard.'}
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form action={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label
                    className="block text-sm font-semibold text-[#0b1c30] mb-1"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-[#737782]">
                        mail
                      </span>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="doctor@clinic.com"
                      className="block w-full pl-10 pr-3 py-3 border border-[#c2c6d3] rounded-lg text-[#0b1c30] bg-[#f8f9ff] focus:outline-none focus:border-[#004287] focus:ring-1 focus:ring-[#004287] transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    className="block text-sm font-semibold text-[#0b1c30] mb-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-[#737782]">
                        lock
                      </span>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete={isSignUp ? 'new-password' : 'current-password'}
                      required
                      placeholder="••••••••"
                      className="block w-full pl-10 pr-3 py-3 border border-[#c2c6d3] rounded-lg text-[#0b1c30] bg-[#f8f9ff] focus:outline-none focus:border-[#004287] focus:ring-1 focus:ring-[#004287] transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Remember me & Forgot password (only for sign in) */}
              {!isSignUp && (
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#004287] focus:ring-[#004287] border-[#c2c6d3] rounded cursor-pointer"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-base text-[#424751] cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-semibold text-[#004287] hover:text-[#00458d] transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-semibold text-white bg-[#004287] hover:bg-[#00458d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004287] transition-all duration-200 hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? 'Please wait...'
                  : isSignUp
                    ? 'Create Account'
                    : 'Sign in to Dashboard'}
              </button>
            </form>

            {/* OR Divider */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#c2c6d3]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-[#424751] text-xs font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Sign In */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-[#c2c6d3] rounded-full shadow-sm text-sm font-semibold text-[#0b1c30] bg-white hover:bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004287] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>

            {/* Toggle Sign Up / Sign In */}
            <p className="mt-8 text-center text-base text-[#424751]">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
                className="text-sm font-semibold text-[#004287] hover:text-[#00458d] transition-colors underline"
              >
                {isSignUp ? 'Sign in' : 'Request Clinical Access'}
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
