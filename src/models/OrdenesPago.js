const pool = require("../db");

const OrdenPago = {
  async crearOrden(datos) {
    const query = `
            INSERT INTO ordenes_pago (
                financiamiento, razon_social, rif_ci, direccion, concepto, tipo_op,
                seguro_social_obligatorio, seguro_para_forzoso, fondo_jubilacion, faov,
                retencion_iva, retencion_timbre_fiscal, total_retenciones, monto_neto_pagar,
                monto_bs_letras, cargo_banco, total
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            RETURNING *;
        `;
    const valores = [
      datos.financiamiento,
      datos.razon_social,
      datos.rif_ci,
      datos.direccion,
      datos.concepto,
      datos.tipo_op,
      datos.seguro_social_obligatorio,
      datos.seguro_para_forzoso,
      datos.fondo_jubilacion,
      datos.faov,
      datos.retencion_iva,
      datos.retencion_timbre_fiscal,
      datos.total_retenciones,
      datos.monto_neto_pagar,
      datos.monto_bs_letras,
      datos.cargo_banco,
      datos.total,
    ];
    const { rows } = await pool.query(query, valores);
    return rows[0];
  },

  async obtenerTodasLasOrdenes() {
    const query = 'SELECT * FROM ordenes_pago;';
    const { rows } = await pool.query(query);
    return rows;
},

async obtenerOrdenPorId(id) {
    const query = 'SELECT * FROM ordenes_pago WHERE id = $1;';
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
        throw new Error('Orden de pago no encontrada');
    }
    return rows[0];
},

};

module.exports = OrdenPago;
