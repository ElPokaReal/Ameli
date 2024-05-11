// beneficiarios.routes.js
const {Router} = require('express');
const beneficiariosController = require('../controllers/beneficiarios.controller');
const beneficiariosMiddleware = require('../middlewares/beneficiarios.middleware');

const beneficiarios = Router(); 

beneficiarios.get('/beneficiarios', beneficiariosController.getBeneficiarios);

beneficiarios.post('/beneficiarios', beneficiariosMiddleware.validateBeneficiario, beneficiariosController.createBeneficiario);

beneficiarios.put('/beneficiarios/:id', beneficiariosMiddleware.validateBeneficiario, beneficiariosController.editBeneficiario);

beneficiarios.delete('/beneficiarios/:id', beneficiariosController.deleteBeneficiario);

module.exports=beneficiarios;