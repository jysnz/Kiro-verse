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
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9ff] p-4">
      <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Panel */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#004287] to-[#1e5aa8] text-white flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-bold mb-4">DermAI</h1>
          <p className="text-lg text-center text-white/90 mb-6">
            AI-powered dermatology assistant for accurate skin condition analysis and personalized treatment recommendations.
          </p>
          <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
            <span className="material-symbols-outlined text-green-300">verified_user</span>
            <span className="text-sm text-white/80">HIPAA Compliant & Secure</span>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 sm:p-10">
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-6">
            <h1 className="text-3xl font-bold text-[#004287]">DermAI</h1>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-6">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                mail
              </span>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#c2c6d3] rounded-lg py-3 pl-10 pr-4 outline-none focus:border-[#004287] focus:ring-1 focus:ring-[#004287] transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                lock
              </span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#c2c6d3] rounded-lg py-3 pl-10 pr-4 outline-none focus:border-[#004287] focus:ring-1 focus:ring-[#004287] transition"
              />
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-gray-300 text-[#004287] focus:ring-[#004287]"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-[#004287] hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-[#004287] text-white rounded-full py-3 font-medium hover:bg-[#1e5aa8] transition"
            >
              Sign in
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-3 text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Sign In */}
          <button className="w-full flex items-center justify-center gap-3 border border-[#c2c6d3] rounded-full py-3 hover:bg-gray-50 transition">
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
            <span className="text-gray-600 font-medium">Sign in with Google</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{' '}
            <a href="#" className="text-[#004287] font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
