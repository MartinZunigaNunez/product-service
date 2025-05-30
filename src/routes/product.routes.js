import { Router } from 'express';
import { handleBulkProductRequest, handleCreateProduct, handleGetProductById, handleListProducts } from '../controllers/product.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/product.auth.js';

const router = Router();

router.get('/:id', handleGetProductById)
router.get('/', handleListProducts)
router.post('/bulk', handleBulkProductRequest);

router.post('/', authenticateToken, requireAdmin, handleCreateProduct);

export default router;