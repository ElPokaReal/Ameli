const pool = require("../db");

const Beneficiarios = {
  async obtenerBeneficiarios() {
    const query = "SELECT * FROM beneficiarios";
    const result = await pool.query(query);
    return result.rows;
  },

  async createBeneficiario(beneficiario) {
    const query =
      "INSERT INTO beneficiarios (nombre, apellido, cedula, email) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [
      beneficiario.nombre,
      beneficiario.apellido,
      beneficiario.cedula,
      beneficiario.email,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async editBeneficiario(beneficiario) {
    const query =
      "UPDATE beneficiarios SET nombre = $1, apellido = $2, cedula = $3, email = $4 WHERE idbene = $5 RETURNING *";
    const values = [
      beneficiario.nombre,
      beneficiario.apellido,
      beneficiario.cedula,
      beneficiario.email,
      beneficiario.id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async delete(id) {
    const query = "DELETE FROM beneficiarios WHERE idbene = $1";
    const values = [id];
    const result = await pool.query(query, values);
    return result.rowCount;
  },

  async beneficiarioExists(nombre, apellido, cedula) {
    const query =
      "SELECT * FROM beneficiarios WHERE nombre = $1 AND apellido = $2 AND cedula = $3";
    const values = [nombre, apellido, cedula];
    const result = await pool.query(query, values);
    return result.rowCount > 0;
  },
};

module.exports = Beneficiarios;
