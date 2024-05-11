const {Router} = require('express');
const { RegistrarUsuario, LoginUsuario } = require('../controllers/usuarios.controllers');
const pool = require('../db');


const usuarios = Router(); 

usuarios.post('/registrar', RegistrarUsuario)

usuarios.post('/login', LoginUsuario)

usuarios.get('/logout')

usuarios.get('/check', (req, res) => {
    pool.query('SELECT 1')
      .then(() => res.send('Conexión exitosa a la base de datos'))
      .catch(() => res.status(500).send('Error al conectar a la base de datos'));
  });

module.exports=usuarios;

