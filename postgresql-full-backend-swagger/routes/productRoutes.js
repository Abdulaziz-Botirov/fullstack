import express from 'express';
import { getAllProducts, createProduct } from '../controllers/productController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';
const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Barcha mahsulotlarni olish
 *     tags: [Products]
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Yangi mahsulot qo'shish (Faqat Admin)
 *     tags: [Products]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               price: { type: number }
 *               description: { type: string }
 *               category: { type: string }
 */
router.post('/', verifyToken, isAdmin, createProduct);

export default router;