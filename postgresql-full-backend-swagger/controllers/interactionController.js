import { Like, Comment } from '../models/index.js';

export const toggleLike = async (req, res) => {
    const productId = req.params.id;
    try {
        const existing = await Like.findOne({ where: { userId: req.user.id, productId } });
        if (existing) {
            await existing.destroy();
            return res.json({ message: "Like olib tashlandi" });
        }
        await Like.create({ userId: req.user.id, productId });
        res.json({ message: "Like bosildi" });
    } catch (e) { res.status(400).json({ error: e.message }); }
};

export const addComment = async (req, res) => {
    try {
        const comment = await Comment.create({ userId: req.user.id, productId: req.params.id, text: req.body.text });
        res.json(comment);
    } catch (e) { res.status(400).json({ error: e.message }); }
};