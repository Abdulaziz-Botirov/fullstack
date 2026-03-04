import express from 'express';
import { toggleLike, addComment } from '../controllers/interactionController.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

/**
 * @swagger
 * /api/interactions/like/{id}:
 *   post:
 *     summary: Mahsulotga like bosish yoki qaytarib olish
 *     tags: [Interaction]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
router.post('/like/:id', verifyToken, toggleLike);

/**
 * @swagger
 * /api/interactions/comment/{id}:
 *   post:
 *     summary: Mahsulotga izoh qoldirish
 *     tags: [Interaction]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text: { type: string }
 */
router.post('/comment/:id', verifyToken, addComment);

export default router;