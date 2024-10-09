// models/DetalleCompra.js
const mongoose = require('mongoose');

const detalleCompraSchema = new mongoose.Schema({
  compra: { type: mongoose.Schema.Types.ObjectId, ref: 'Compra', required: true },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true },
  subtotal: { type: Number, required: true }
});

module.exports = mongoose.model('DetalleCompra', detalleCompraSchema);