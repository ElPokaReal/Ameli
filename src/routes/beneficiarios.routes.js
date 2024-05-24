// beneficiarios.routes.js
const {Router} = require('express');
const beneficiariosController = require('../controllers/beneficiarios.controller');
const beneficiariosMiddleware = require('../middlewares/beneficiarios.middleware');

const beneficiarios = Router(); 

beneficiarios.get('/beneficiarios', beneficiariosController.getBeneficiarios);

beneficiarios.get('/beneficiarios/:idbene', beneficiariosController.getBeneficiarioID);

beneficiarios.post('/beneficiarios', beneficiariosMiddleware.validateBeneficiario, beneficiariosController.createBeneficiario);

beneficiarios.put('/beneficiarios/:idbene', beneficiariosMiddleware.validateBeneficiario, beneficiariosController.editBeneficiario);

beneficiarios.delete('/beneficiarios/:idbene', beneficiariosController.deleteBeneficiario);

module.exports=beneficiarios;