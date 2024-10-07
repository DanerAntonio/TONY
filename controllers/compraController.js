// controllers/compraController.js
const Compra = require('../models/Compra');
const DetalleCompra = require('../models/DetalleCompra');
const Producto = require('../models/Producto');

exports.crearCompra = async (req, res) => {
  try {
    const { proveedor, detalles } = req.body;
    let total = 0;

    // Calcular el total de la compra
    for (let detalle of detalles) {
      total += detalle.cantidad * detalle.precioUnitario;
    }

    const nuevaCompra = new Compra({ proveedor, total });
    await nuevaCompra.save();

    // Crear los detalles de la compra y actualizar el stock de los productos
    for (let detalle of detalles) {
      const nuevoDetalle = new DetalleCompra({
        compra: nuevaCompra._id,
        producto: detalle.producto,
        cantidad: detalle.cantidad,
        precioUnitario: detalle.precioUnitario,
        total: detalle.cantidad * detalle.precioUnitario
      });
      await nuevoDetalle.save();

      // Actualizar el stock del producto
      await Producto.findByIdAndUpdate(detalle.producto, {
        $inc: { stock: detalle.cantidad }
      });
    }

    res.status(201).json(nuevaCompra);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.obtenerCompras = async (req, res) => {
  try {
    const compras = await Compra.find().populate('proveedor');
    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerCompra = async (req, res) => {
  try {
    const compra = await Compra.findById(req.params.id).populate('proveedor');
    if (!compra) return res.status(404).json({ message: 'Compra no encontrada' });
    
    const detalles = await DetalleCompra.find({ compra: compra._id }).populate('producto');
    
    res.json({ compra, detalles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.anularCompra = async (req, res) => {
  try {
    const compra = await Compra.findById(req.params.id);
    if (!compra) return res.status(404).json({ message: 'Compra no encontrada' });

    if (compra.estado === 'Anulada') {
      return res.status(400).json({ message: 'La compra ya está anulada' });
    }

    compra.estado = 'Anulada';
    await compra.save();

    // Revertir el stock de los productos
    const detalles = await DetalleCompra.find({ compra: compra._id });
    for (let detalle of detalles) {
      await Producto.findByIdAndUpdate(detalle.producto, {
        $inc: { stock: -detalle.cantidad }
      });
    }

    res.json({ message: 'Compra anulada exitosamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.buscarCompras = async (req, res) => {
  try {
    const { query } = req.query;
    const compras = await Compra.find({
      $or: [
        { _id: query },
        { 'proveedor.nombre': { $regex: query, $options: 'i' } }
      ]
    }).populate('proveedor');
    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};