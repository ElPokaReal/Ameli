const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const usuarios = require('./routes/usuarios.routes');
const beneficiarios = require('./routes/beneficiarios.routes');
const ordenes_pago = require('./routes/ordenespago.routes');
const proveedores = require('./routes/proveedores.routes');
require('dotenv').config();

const app = express();

//* Middlewares

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.json({Mensaje:'API'})
})

app.use(proveedores)
app.use(usuarios)
app.use(ordenes_pago)
app.use(beneficiarios)

app.listen(3000)
console.log('Server on port 3000')