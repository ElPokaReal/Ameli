const Beneficiarios = require('../models/Beneficiarios');

exports.validateBeneficiario = async  (req, res, next) => {
    const { nombre, apellido, cedula, email } = req.body;

    // Verificar que los campos no estén vacíos
    if (!nombre || !apellido || !cedula || !email) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    // Verificar que el correo electrónico tenga un formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Correo electrónico inválido' });
    }

    // Verificar que el nombre y apellido no contengan caracteres especiales o números
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(nombre) || !nameRegex.test(apellido)) {
        return res.status(400).json({ message: 'Nombre y apellido deben contener solo letras y espacios' });
    }

    const exists = await Beneficiarios.beneficiarioExists(nombre, apellido, cedula);
    if (exists) {
        return res.status(400).json({ message: 'Ya existe un beneficiario con el mismo nombre, apellido y cédula' });
    }

    next();
};