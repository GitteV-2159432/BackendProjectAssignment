import express from 'express';
import exerciseRoutes from './exerciseRoutes.js';
import planRoutes from './planRoutes.js';
import sessionRoutes from './sessionRoutes.js';

const router = express.Router();

router.use('/exercises', exerciseRoutes);
router.use('/plans', planRoutes);
router.use('/sessions', sessionRoutes);

export default router;
