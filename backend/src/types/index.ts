import { Request } from 'express';
import { User } from '@supabase/supabase-js';

// Extend Express Request to include user
export interface AuthenticatedRequest extends Request {
  user?: User;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// User profile type (extend as needed)
export interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  // Add more profile fields as needed
}

// Database table types (extend as needed)
export interface DatabaseUser {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}
