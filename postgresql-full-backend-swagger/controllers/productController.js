import { Product, Comment, Like } from '../models/index.js';

export const getAllProducts = async (req, res) => {
    const products = await Product.findAll({ include: [Comment, Like] });
    res.json(products);
};

export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (e) { res.status(400).json({ error: e.message }); }
};