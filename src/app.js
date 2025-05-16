import dotenv from 'dotenv'
import express from 'express'
import productRoutes from './routes/product.routes.js'

dotenv.config();

const app = express();

app.use(express.json());


// (si vas a usar authRoutes en este servicio)
// app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'API Funcionando' })
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
  });
  
  // Manejo de errores del servidor
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
  });

  export default app;

