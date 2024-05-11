const Beneficiarios = require('../models/Beneficiarios');

exports.getBeneficiarios = async (req, res) => {
    try {
        const beneficiarios = await Beneficiarios.obtenerBeneficiarios();
        res.status(200).json(beneficiarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los beneficiarios' });
    }
};

exports.createBeneficiario = async (req, res) => {
    try {
        const beneficiario = await Beneficiarios.createBeneficiario(req.body);
        res.status(201).json(beneficiario);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el beneficiario' });
    }
};

exports.editBeneficiario = async (req, res) => {
    try {
        req.body.id = req.params.id;
        const beneficiario = await Beneficiarios.editBeneficiario(req.body);
        res.status(200).json(beneficiario);
    } catch (error) {
        res.status(500).json({ message: 'Error al editar el beneficiario' });
    }
};

exports.deleteBeneficiario = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Beneficiarios.delete(id);
        if (result > 0) {
            res.status(200).json({ message: 'Beneficiario eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'Beneficiario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el beneficiario' });
    }
};