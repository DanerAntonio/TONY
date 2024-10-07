// routes/compraRoutes.js
const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

router.post('/', compraController.crearCompra);
router.get('/', compraController.obtenerCompras);
router.get('/buscar', compraController.buscarCompras);
router.get('/:id', compraController.obtenerCompra);
router.put('/:id/anular', compraController.anularCompra);

module.exports = router;