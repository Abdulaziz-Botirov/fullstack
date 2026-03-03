const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * /api/likes:
 *   get:
 *     summary: Get liked products
 *     description: Retrieve all products liked by the authenticated user
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of liked products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Authentication required
 */
router.get('/', likeController.getLikedProducts);

/**
 * @swagger
 * /api/likes/{productId}/toggle:
 *   post:
 *     summary: Toggle like
 *     description: Like or unlike a product
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Like toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liked:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Product not found
 *       401:
 *         description: Authentication required
 */
router.post('/:productId/toggle', likeController.toggleLike);

/**
 * @swagger
 * /api/likes/{productId}/check:
 *   get:
 *     summary: Check like status
 *     description: Check if user liked a specific product
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Like status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liked:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Authentication required
 */
router.get('/:productId/check', likeController.checkLike);

module.exports = router;