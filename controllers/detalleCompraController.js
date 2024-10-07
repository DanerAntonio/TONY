// controllers/detalleCompraController.js
const DetalleCompra = require('../models/DetalleCompra');
const Producto = require('../models/Producto');

exports.actualizarDetalleCompra = async (req, res) => {
  try {
    const { cantidad, precioUnitario } = req.body;
    const detalle = await DetalleCompra.findById(req.params.id);
    if (!detalle) return res.status(404).json({ message: 'Detalle de compra no encontrado' });

    const diferenciaStock = cantidad - detalle.cantidad;

    detalle.cantidad = cantidad;
    detalle.precioUnitario = precioUnitario;
    detalle.total = cantidad * precioUnitario;
    await detalle.save();

    // Actualizar el stock del producto
    await Producto.findByIdAndUpdate(detalle.producto, {
      $inc: { stock: diferenciaStock }
    });

    res.json(detalle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.eliminarDetalleCompra = async (req, res) => {
  try {
    const detalle = await DetalleCompra.findById(req.params.id);
    if (!detalle) return res.status(404).json({ message: 'Detalle de compra no encontrado' });

    // Revertir el stock del producto
    await Producto.findByIdAndUpdate(detalle.producto, {
      $inc: { stock: -detalle.cantidad }
    });

    await DetalleCompra.findByIdAndDelete(req.params.id);
    res.json({ message: 'Detalle de compra eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};