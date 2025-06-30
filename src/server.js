import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import alumnoRoutes from './routes/alumnoRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/alumnos', alumnoRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
