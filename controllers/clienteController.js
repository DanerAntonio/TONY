// controllers/clienteController.js
const Cliente = require('../models/Cliente');

exports.crearCliente = async (req, res) => {
  try {
    const clienteExistente = await Cliente.findOne({ cedula: req.body.cedula });
    if (clienteExistente) {
      return res.status(400).json({ message: 'Ya existe un cliente con esta cédula' });
    }

    const nuevoCliente = new Cliente(req.body);
    await nuevoCliente.save();
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.actualizarCliente = async (req, res) => {
  try {
    if (req.body.cedula) {
      const clienteExistente = await Cliente.findOne({ cedula: req.body.cedula, _id: { $ne: req.params.id } });
      if (clienteExistente) {
        return res.status(400).json({ message: 'Ya existe otro cliente con esta cédula' });
      }
    }

    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.eliminarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};