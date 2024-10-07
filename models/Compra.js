// models/Compra.js
const mongoose = require('mongoose');
const Producto = require('./Producto');

const compraSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true },
  total: { type: Number, required: true },
  estado: { type: String, enum: ['Activa', 'Anulada'], default: 'Activa' }
});

module.exports = mongoose.model('Compra', compraSchema);