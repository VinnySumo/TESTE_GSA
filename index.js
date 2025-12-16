const express = require('express');
const cors = require('cors');
// Importa as rotas da pasta routes
const router = require('./routes/routes');

const app = express();

app.use(cors());
app.use(express.json());

// Usa as rotas importadas
app.use(router);

const porta = 3333;

app.listen(porta, () => {
    console.log(`Servidor iniciado na porta ${porta}`);
});

// Rota de verificação de status (Health Check)
app.get('/health', (req, res) => {
    res.status(200).send('API funcionando corretamente!');
});

app.get('/', (request, response) => {
    response.send('Teste GSA');
});