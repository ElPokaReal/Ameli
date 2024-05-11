const pool = require('../db')
const bcrypt = require('bcryptjs')

const User = {
    async register(usuario){
        const salt = await bcrypt.genSalt()
        const encriptado = await bcrypt.hash(usuario.password,salt)
        const query = 'INSERT INTO usuario (nombre, apellido, email, cedula, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const valores = [usuario.nombre, usuario.apellido, usuario.email, usuario.cedula, encriptado];
        const resultado = await pool.query(query,valores);
        return resultado.rows[0];
    },

    async login(credenciales) {
        const query = 'SELECT * FROM usuario WHERE cedula = $1';
        const resultado = await pool.query(query, [credenciales.cedula]);
    
        if (resultado.rowCount ===  0) {
            throw new Error('No existe un usuario con esa cedula');
        }
    
        const usuario = resultado.rows[0];
        const encriptado = await bcrypt.compare(credenciales.password, usuario.password);
    
        if (!encriptado) {
            throw new Error('Contraseña incorrecta');
        }
    
        return usuario;
    }
};


module.exports=User;