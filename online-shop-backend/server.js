const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const sequelize = require('./src/config/database');
const { User } = require('./src/models');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Routelar
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const likeRoutes = require('./src/routes/likeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/likes', likeRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Online Shop API is running',
    documentation: '/api-docs'
  });
});

// Admin user yaratish funksiyasi
const createAdminUser = async () => {
  try {
    const adminEmail = 'abdulazizbotirov527@gmail.com';
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Abu1122@', 10);
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Admin user created successfully');
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  }
};

// Bazaga ulanish va serverni ishga tushirish
sequelize.sync({ alter: true }).then(async () => {
  console.log('✅ Bazaga muvaffaqiyatli ulandi');
  await createAdminUser();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server: http://localhost:${PORT}`);
    console.log(`📚 Swagger: http://localhost:${PORT}/api-docs`);
    console.log(`👤 Admin email: abdulazizbotirov527@gmail.com`);
    console.log(`🔑 Admin password: Abu1122@`);
  });
}).catch(err => {
  console.error('❌ Baza xatosi:', err.message);
  process.exit(1);
});