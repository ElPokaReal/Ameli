const Proveedores = require("../models/Proveedores");

exports.getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedores.obtenerProveedores();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los proveedores" });
  }
};

exports.createProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedores.createProveedores(req.body);
    res.status(201).json(proveedores);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el proveedor" });
  }
};

exports.editProveedores = async (req, res) => {
  const idpro = req.params.idpro;

  try {
    const existingProveedor = await Proveedores.obtenerProveedor(idpro);
    if (!existingProveedor) {
      res.status(404).json({ message: "El proveedor no fue encontrado" });
      return;
    }

    const proveedorData = { ...req.body, idpro };

    const updatedProveedor = await Proveedores.editProveedores(proveedorData);

    if (updatedProveedor) {
      res.status(202).json(updatedProveedor);
    } else {
      res.status(404).json({ message: "No se pudo actualizar el proveedor" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerProveedor = async (req, res) => {
  try {
    const idpro = req.params.idpro;
    const proveedores = await Proveedores.obtenerProveedor(idpro);
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos del proveedor" });
  }
};

exports.deleteProveedores = async (req, res) => {
  try {
    const idpro = req.params.idpro;
    const result = await Proveedores.delete(idpro);
    if (result > 0) {
      res.status(200).json({ message: "Proveedor eliminado con éxito" });
    } else {
      res.status(404).json({ message: "Proveedor no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el proveedor" });
  }
};
