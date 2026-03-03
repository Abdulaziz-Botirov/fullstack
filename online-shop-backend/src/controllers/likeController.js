const { Like, Product } = require('../models');

const getLikedProducts = async (req, res) => {
  try {
    const likes = await Like.findAll({
      where: { userId: req.userId },
      include: [Product]
    });
    
    const products = likes.map(like => like.Product);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const toggleLike = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const existingLike = await Like.findOne({
      where: {
        userId: req.userId,
        productId
      }
    });

    if (existingLike) {
      await existingLike.destroy();
      return res.json({ liked: false });
    }

    await Like.create({
      userId: req.userId,
      productId
    });

    res.json({ liked: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkLike = async (req, res) => {
  try {
    const { productId } = req.params;

    const like = await Like.findOne({
      where: {
        userId: req.userId,
        productId
      }
    });

    res.json({ liked: !!like });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getLikedProducts,
  toggleLike,
  checkLike
};