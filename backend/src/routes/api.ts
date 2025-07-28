import { Router, Response } from 'express';
import { AuthenticatedRequest, ApiResponse } from '../types';
import { authenticateUser, optionalAuth } from '../middleware/auth';

const router = Router();

// Public route example
router.get('/public', (req, res: Response<ApiResponse>) => {
  res.json({
    success: true,
    data: {
      message: 'This is a public endpoint',
      timestamp: new Date().toISOString()
    }
  });
});

// Protected route example
router.get('/protected', authenticateUser, (req: AuthenticatedRequest, res: Response<ApiResponse>) => {
  res.json({
    success: true,
    data: {
      message: 'This is a protected endpoint',
      user: {
        id: req.user?.id,
        email: req.user?.email
      },
      timestamp: new Date().toISOString()
    }
  });
});

// Optional auth route example
router.get('/optional-auth', optionalAuth, (req: AuthenticatedRequest, res: Response<ApiResponse>) => {
  const isAuthenticated = !!req.user;
  
  res.json({
    success: true,
    data: {
      message: 'This endpoint works with or without authentication',
      authenticated: isAuthenticated,
      user: isAuthenticated ? {
        id: req.user?.id,
        email: req.user?.email
      } : null,
      timestamp: new Date().toISOString()
    }
  });
});

// Example CRUD operations for a protected resource
router.get('/items', authenticateUser, async (req: AuthenticatedRequest, res: Response<ApiResponse>): Promise<void> => {
  try {
    // Example: Fetch user-specific items from database
    // const { data, error } = await supabase
    //   .from('items')
    //   .select('*')
    //   .eq('user_id', req.user?.id);
    
    // For now, return mock data
    res.json({
      success: true,
      data: {
        items: [
          { id: 1, name: 'Item 1', user_id: req.user?.id },
          { id: 2, name: 'Item 2', user_id: req.user?.id }
        ]
      }
    });
  } catch (error) {
    console.error('Items fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch items'
    });
  }
});

router.post('/items', authenticateUser, async (req: AuthenticatedRequest, res: Response<ApiResponse>): Promise<void> => {
  try {
    const { name } = req.body;
    
    if (!name) {
      res.status(400).json({
        success: false,
        error: 'Item name is required'
      });
      return;
    }
    
    // Example: Create item in database
    // const { data, error } = await supabase
    //   .from('items')
    //   .insert({
    //     name,
    //     user_id: req.user?.id
    //   })
    //   .select()
    //   .single();
    
    // For now, return mock response
    res.status(201).json({
      success: true,
      data: {
        item: {
          id: Date.now(),
          name,
          user_id: req.user?.id,
          created_at: new Date().toISOString()
        }
      },
      message: 'Item created successfully'
    });
  } catch (error) {
    console.error('Item creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create item'
    });
  }
});

export default router;
