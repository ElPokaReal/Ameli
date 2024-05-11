// beneficiarios.routes.js
const {Router} = require('express');
const OrdenPagoController = require('../controllers/ordenespago.controller');

const ordenes_pago = Router(); 

ordenes_pago.post('/ordenes_pago', OrdenPagoController.crearOrden);

ordenes_pago.get('/ordenes_pago', OrdenPagoController.obtenerTodasLasOrdenes);

ordenes_pago.get('/ordenes_pago/:id', OrdenPagoController.obtenerOrdenPorId);

ordenes_pago.get('/generar_orden/:id', OrdenPagoController.generarPDF);

module.exports=ordenes_pago;