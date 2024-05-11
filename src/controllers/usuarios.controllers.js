const User = require('../models/User')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60;
const newToken = (usuario) => {
  return jwt.sign({ id: usuario.id, email: usuario.email }, process.env.proyecto_token, {
    expiresIn: maxAge
  });

 };

 const RegistrarUsuario = async (req, res) => {
    try {
        // Imprime la contraseña para depuración
        console.log(req.body.contrasena);
        const usuario = await User.register(req.body);
        const token = newToken(usuario);
        res.status(200).json({ usuario: usuario, token: token });
    } catch (error) {
        res.status(400).json({ Mensaje: 'Error al registrar usuario', error });
        throw error;
    }
};

const LoginUsuario = async (req, res) => {
    try {
        const { cedula, password } = req.body;
        const usuario = await User.login({ cedula, password });
        const token = newToken(usuario);
        res.status(200).json({ usuario: usuario, token: token, mensaje:'Has iniciado sesión exitosamente' });
    } catch (error) {
        res.status(400).json({ Mensaje: 'Error al iniciar sesión', error });
    }
};

module.exports = {
    RegistrarUsuario,
    LoginUsuario
};