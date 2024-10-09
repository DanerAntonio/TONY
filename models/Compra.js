// models/Compra.js
const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true },
  total: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  iva: { type: Number, required: true },
  estado: { type: String, enum: ['Activa', 'Anulada'], default: 'Activa' },
  detalles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DetalleCompra' }]
});

module.exports = mongoose.model('Compra', compraSchema);