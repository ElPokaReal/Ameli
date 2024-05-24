
const {Router} = require('express');
const proveedoresController = require('../controllers/proveedores.controller');
const proveedoresMiddleware = require('../middlewares/proveedores.middleware');

const proveedores = Router(); 

proveedores.get('/proveedores', proveedoresController.getProveedores);

proveedores.get('/proveedores/:idpro', proveedoresController.obtenerProveedor);

proveedores.post('/proveedores', proveedoresMiddleware.validateProveedor,proveedoresController.createProveedores);

proveedores.put('/proveedores/:idpro', proveedoresController.editProveedores);

proveedores.delete('/proveedores/:idpro', proveedoresController.deleteProveedores);

module.exports= proveedores;