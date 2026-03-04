import express from 'express';
import { addToCart, getCart } from '../controllers/cartController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Savatni ko'rish
 *     tags: [Cart]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/', verifyToken, getCart);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Savatga mahsulot qo'shish
 *     tags: [Cart]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId: { type: integer }
 *               quantity: { type: integer }
 */
router.post('/', verifyToken, addToCart);

export default router;