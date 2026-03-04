import { Cart, Product } from '../models/index.js';

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let item = await Cart.findOne({ where: { userId: req.user.id, productId } });
        if (item) {
            item.quantity += (quantity || 1);
            await item.save();
        } else {
            item = await Cart.create({ userId: req.user.id, productId, quantity: quantity || 1 });
        }
        res.json(item);
    } catch (e) { res.status(400).json({ error: e.message }); }
};

export const getCart = async (req, res) => {
    const cart = await Cart.findAll({ where: { userId: req.user.id }, include: [Product] });
    res.json(cart);
};