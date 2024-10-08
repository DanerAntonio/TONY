// models/Compra.js
const mongoose = require('mongoose');

const detalleCompraSchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true }
});

const compraSchema = new mongoose.Schema({
  idCompra: { type: Number, unique: true },
  fecha: { type: Date, default: Date.now },
  proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true },
  detalles: [detalleCompraSchema],
  total: { type: Number, required: true },
  estado: { type: String, enum: ['Activa', 'Anulada'], default: 'Activa' }
});

// Middleware para auto-incrementar idCompra
compraSchema.pre('save', async function(next) {
  if (!this.idCompra) {
    const lastCompra = await this.constructor.findOne({}, {}, { sort: { 'idCompra': -1 } });
    this.idCompra = lastCompra && lastCompra.idCompra ? lastCompra.idCompra + 1 : 1;
  }
  next();
});

module.exports = mongoose.model('Compra', compraSchema);