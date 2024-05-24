const Beneficiarios = require('../models/Beneficiarios');

exports.getBeneficiarios = async (req, res) => {
    try {
        const beneficiarios = await Beneficiarios.obtenerBeneficiarios();
        res.status(200).json(beneficiarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los beneficiarios' });
    }
};

exports.getBeneficiarioID = async (req, res) => {
    const idbene = req.params.idbene;
    try {
        const beneficiarios = await Beneficiarios.obtenerBeneficiario(idbene);
        res.status(200).json(beneficiarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos del beneficiario' });
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
        req.body.idbene = req.params.idbene;
        const beneficiario = await Beneficiarios.editBeneficiario(req.body);
        res.status(200).json(beneficiario);
    } catch (error) {
        res.status(500).json({ message: 'Error al editar el beneficiario' });
    }
};

exports.deleteBeneficiario = async (req, res) => {
    try {
        const idbene = req.params.idbene;
        const result = await Beneficiarios.delete(idbene);
        if (result > 0) {
            res.status(200).json({ message: 'Beneficiario eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'Beneficiario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el beneficiario' });
    }
};