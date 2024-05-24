const pool = require("../db");

const Proveedores = {
  async obtenerProveedores() {
    const query = "SELECT * FROM proveedores";
    const result = await pool.query(query);
    return result.rows;
  },

  async obtenerProveedor(idpro) {
    const query = "SELECT * FROM proveedores WHERE idpro = $1";
    const value = [idpro];
    const result = await pool.query(query, value);
    return result.rows[0];
  },

  async createProveedores(proveedores) {
    const query =
      "INSERT INTO proveedores (nombre, apellido, cedula, email) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [
      proveedores.nombre,
      proveedores.apellido,
      proveedores.cedula,
      proveedores.email,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async editProveedores(proveedores) {
    const query =
      "UPDATE proveedores SET nombre = $1, apellido = $2, cedula = $3, email = $4 WHERE idpro = $5 RETURNING *";
    const values = [
      proveedores.nombre,
      proveedores.apellido,
      proveedores.cedula,
      proveedores.email,
      proveedores.idpro,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async delete(idpro) {
    const query = "DELETE FROM proveedores WHERE idpro = $1";
    const values = [idpro];
    const result = await pool.query(query, values);
    return result.rowCount;
  },

  async ProveedoresExists(nombre, apellido, cedula) {
    const query =
      "SELECT * FROM proveedores WHERE nombre = $1 AND apellido = $2 AND cedula = $3";
    const values = [nombre, apellido, cedula];
    const result = await pool.query(query, values);
    return result.rowCount > 0;
  },
};

module.exports = Proveedores;
