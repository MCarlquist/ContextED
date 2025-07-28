import { Router, Response } from 'express';
import { supabase } from '../config/supabase';
import { AuthenticatedRequest, ApiResponse } from '../types';
import { authenticateUser } from '../middleware/auth';

const router = Router();

// Get current user profile
router.get('/profile', authenticateUser, async (req: AuthenticatedRequest, res: Response<ApiResponse>) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    return res.json({
      success: true,
      data: {
        id: req.user.id,
        email: req.user.email,
        created_at: req.user.created_at,
        updated_at: req.user.updated_at,
        // Add other user fields as needed
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch user profile'
    });
  }
});

// Update user profile
router.put('/profile', authenticateUser, async (req: AuthenticatedRequest, res: Response<ApiResponse>) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    // You can add profile update logic here
    // For example, updating user metadata or custom profile fields
    
    return res.json({
      success: true,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update user profile'
    });
  }
});

// Refresh token endpoint
router.post('/refresh', async (req, res: Response<ApiResponse>) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        error: 'Refresh token is required'
      });
    }

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token
    });

    if (error) {
      return res.status(401).json({
        success: false,
        error: 'Invalid refresh token'
      });
    }

    return res.json({
      success: true,
      data: {
        access_token: data.session?.access_token,
        refresh_token: data.session?.refresh_token,
        user: data.user
      }
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to refresh token'
    });
  }
});

// Logout endpoint
router.post('/logout', authenticateUser, async (req: AuthenticatedRequest, res: Response<ApiResponse>) => {
  try {
    // Supabase handles logout on the client side
    // This endpoint can be used for server-side cleanup if needed
    
    return res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to logout'
    });
  }
});

export default router;
