import express from 'express';
import router from './routes/tarefas.js';

const app = express();

// Middleware para usar JSON
app.use(express.json());
app.use('/tarefas', router);

app.listen(8080, () => {
    console.log('Servidor Rodando em http://localhost:8080')
});