import { createClient } from '@supabase/supabase-js';
import { config } from './index';

// Client for server-side operations with service role key
export const supabaseAdmin = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Client for user operations with anon key
export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey
);
