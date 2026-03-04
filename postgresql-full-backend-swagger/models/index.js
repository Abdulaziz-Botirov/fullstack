import sequelize from '../config/db.js';
import User from './User.js';
import Product from './Product.js';
import Cart from './Cart.js';
import Comment from './Comment.js';
import Like from './Like.js';

User.hasMany(Cart);
Cart.belongsTo(User);
Product.hasMany(Cart);
Cart.belongsTo(Product);
User.hasMany(Comment);
Comment.belongsTo(User);
Product.hasMany(Comment);
Comment.belongsTo(Product);
User.hasMany(Like);
Like.belongsTo(User);
Product.hasMany(Like);
Like.belongsTo(Product);

export { sequelize, User, Product, Cart, Comment, Like };