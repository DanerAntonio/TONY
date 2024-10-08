const compraSchema = new mongoose.Schema({
  proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true },
  fecha: { type: Date, default: Date.now },
  detalles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DetalleCompra' }],
  subtotal: { type: Number, required: true },
  iva: { type: Number, required: true },
  total: { type: Number, required: true },
  estado: { type: String, enum: ['Pendiente', 'Completada', 'Anulada'], default: 'Pendiente' }
});