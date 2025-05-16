import app from './app.js';
import { initDatabase } from './config/db.js';

const PORT = process.env.PORT || 4000;

async function startServer(){
    await initDatabase();
    app.listen(PORT, () => {
        console.log(`Servicio de productos escuchando en el puerto ${PORT}`);
    })
}

startServer();
