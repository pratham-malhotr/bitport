const express = require('express');
const swapController = require('../controllers/swapController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Protected routes - require authentication
router.post('/swap', authMiddleware, swapController.createSwap);
router.get('/history', authMiddleware, swapController.getHistory);
router.get('/search', authMiddleware, swapController.searchTransactions);
router.get('/:id', authMiddleware, swapController.getTransactionById);
router.put('/:id', authMiddleware, swapController.updateTransaction);
router.delete('/:id', authMiddleware, swapController.deleteTransaction);

module.exports = router;
