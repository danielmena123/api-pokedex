const express = require('express');
const logger = require('morgan');
const helment = require('helmet');
var cors = require('cors');

const conectarDB = require('./config/db');
const usuarioRoutes = require('./routes/usuarios.routes');

const app = express();

conectarDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(logger('dev'));
app.use(cors());
app.use(helment());

app.use('/api', usuarioRoutes);

const port = process.env.PORT || 9000;
const host = process.env.HOST || '0.0.0.0';

//routes
app.get('/', (req, res) => {
    res.send('Hello World, Welcome to the API REST')    
});


app.listen(port, host, () => console.log('server listening on port: ', port));