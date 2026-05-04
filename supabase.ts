import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isValidUrl = supabaseUrl && supabaseUrl.startsWith('http');

// Create a mock client that doesn't throw errors but returns nothing
const mockSupabase = {
  from: () => mockSupabase,
  select: () => mockSupabase,
  order: () => mockSupabase,
  insert: () => mockSupabase,
  eq: () => mockSupabase,
  delete: () => mockSupabase,
  update: () => mockSupabase,
  single: () => mockSupabase,
  then: (cb: any) => cb({ data: null, error: null }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: (cb: any) => {
      if (cb) cb('SIGNED_OUT', null);
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Supabase not configured' } }),
    signOut: () => Promise.resolve({ error: null }),
  }
} as any;

export const supabase = isValidUrl 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : mockSupabase;

export const hasSupabaseConfig = isValidUrl && Boolean(supabaseAnonKey);
