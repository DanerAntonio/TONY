// routes/detalleCompraRoutes.js
const express = require('express');
const router = express.Router();
const detalleCompraController = require('../controllers/detalleCompraController');

router.put('/:id', detalleCompraController.actualizarDetalleCompra);
router.delete('/:id', detalleCompraController.eliminarDetalleCompra);

module.exports = router;