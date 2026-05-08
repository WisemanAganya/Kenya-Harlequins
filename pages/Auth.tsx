import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { ShieldCheck, User, Mail, Lock, ArrowRight, Loader2, Phone } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate(from, { replace: true });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: phone,
            }
          }
        });
        if (error) throw error;
        setSuccess('Registration successful! Please check your email for verification.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-quins-magenta opacity-10 blur-[120px] rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-quins-blue opacity-10 blur-[120px] rounded-full -ml-48 -mb-48"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/10 shadow-2xl">
            <ShieldCheck size={40} className="text-quins-magenta" />
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">
            {isLogin ? 'Member Login' : 'Join the Legacy'}
          </h1>
          <p className="text-slate-400 font-medium">
            {isLogin ? 'Access your Quins member dashboard' : 'Register for an official membership account'}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold flex items-center gap-3 animate-shake">
              <span className="shrink-0 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px]">!</span>
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 text-sm font-bold animate-in zoom-in duration-300">
              {success}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-500 tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-slate-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-quins-magenta outline-none transition font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-500 tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0712345678"
                      className="w-full bg-slate-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-quins-magenta outline-none transition font-bold"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-500 tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-quins-magenta outline-none transition font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Password</label>
                {isLogin && (
                  <button type="button" className="text-[10px] font-black uppercase text-quins-blue hover:text-white transition tracking-widest">Forgot?</button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-quins-magenta outline-none transition font-bold"
                />
              </div>
            </div>

            <div className="mt-4 p-4 bg-slate-900/50 rounded-2xl border border-white/5">
              <p className="text-[10px] text-slate-500 text-center leading-relaxed font-medium">
                By signing up, you agree to our <Link to="/terms" className="text-quins-blue hover:underline">Terms</Link> and acknowledge our <Link to="/privacy" className="text-quins-blue hover:underline">Privacy Policy</Link> in accordance with the <strong>Kenya Data Protection Act 2019</strong>.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-quins-magenta text-white py-5 rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-xl shadow-quins-magenta/20 hover:bg-pink-700 transition flex items-center justify-center gap-3 disabled:opacity-50 mt-4 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-400 text-sm font-medium">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-white font-black uppercase text-xs tracking-widest hover:text-quins-magenta transition border-b border-white/20 pb-0.5"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
           <Link to="/" className="text-slate-600 hover:text-slate-400 transition font-black uppercase text-[10px] tracking-[0.3em]">
             ← Back to Public Site
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
