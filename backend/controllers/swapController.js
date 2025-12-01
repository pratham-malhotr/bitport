const axios = require('axios');
const pool = require('../config/database');

// Get live crypto prices
const getLivePrice = async (fromCurrency, toCurrency) => {
  try {
    // Using CoinGecko API (free, no authentication needed)
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency.toLowerCase()}&vs_currencies=${toCurrency.toLowerCase()}`
    );
    
    const price = response.data[fromCurrency.toLowerCase()]?.[toCurrency.toLowerCase()];
    return price || null;
  } catch (error) {
    console.error('Error fetching price:', error);
    return null;
  }
};

// Create swap
exports.createSwap = async (req, res) => {
  try {
    const { fromCurrency, toCurrency, amount } = req.body;

    if (!fromCurrency || !toCurrency || !amount) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (amount <= 0) {
      return res.status(400).json({ success: false, message: 'Amount must be greater than 0' });
    }

    // Get live price
    const price = await getLivePrice(fromCurrency, toCurrency);

    if (!price) {
      return res.status(400).json({ success: false, message: 'Could not fetch price for this currency pair' });
    }

    const resultAmount = (amount * price).toFixed(8);

    const connection = await pool.getConnection();

    // Insert transaction
    await connection.query(
      'INSERT INTO transactions (user_id, from_currency, to_currency, amount, result_amount, price, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.userId, fromCurrency, toCurrency, amount, resultAmount, price, 'completed']
    );

    connection.release();

    return res.status(201).json({
      success: true,
      message: 'Swap completed successfully',
      data: {
        fromCurrency,
        toCurrency,
        amount,
        price,
        resultAmount
      }
    });
  } catch (error) {
    console.error('Swap error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all transactions for user
exports.getHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'created_at', order = 'DESC', status } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let query = 'SELECT * FROM transactions WHERE user_id = ?';
    let countQuery = 'SELECT COUNT(*) as count FROM transactions WHERE user_id = ?';
    const params = [req.userId];

    if (status) {
      query += ' AND status = ?';
      countQuery += ' AND status = ?';
      params.push(status);
    }

    // Sanitize sort column to prevent SQL injection
    const allowedSortColumns = ['created_at', 'amount', 'result_amount', 'price', 'from_currency'];
    const sortColumn = allowedSortColumns.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    query += ` ORDER BY ${sortColumn} ${sortOrder} LIMIT ? OFFSET ?`;

    const connection = await pool.getConnection();

    const [transactions] = await connection.query(query, [...params, parseInt(limit), offset]);
    const [countResult] = await connection.query(countQuery, params);

    connection.release();

    const total = countResult[0].count;
    const totalPages = Math.ceil(total / parseInt(limit));

    return res.json({
      success: true,
      data: transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error('Get history error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get single transaction
exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    const [transactions] = await connection.query(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    connection.release();

    if (transactions.length === 0) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    return res.json({ success: true, data: transactions[0] });
  } catch (error) {
    console.error('Get transaction error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update transaction (for notes or other fields)
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const connection = await pool.getConnection();

    // Verify transaction belongs to user
    const [transactions] = await connection.query(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (transactions.length === 0) {
      connection.release();
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    await connection.query(
      'UPDATE transactions SET status = ? WHERE id = ?',
      [status, id]
    );

    connection.release();

    return res.json({ success: true, message: 'Transaction updated successfully' });
  } catch (error) {
    console.error('Update transaction error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    // Verify transaction belongs to user
    const [transactions] = await connection.query(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (transactions.length === 0) {
      connection.release();
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    await connection.query('DELETE FROM transactions WHERE id = ?', [id]);

    connection.release();

    return res.json({ success: true, message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Search transactions
exports.searchTransactions = async (req, res) => {
  try {
    const { currency, page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let query = 'SELECT * FROM transactions WHERE user_id = ? AND (from_currency = ? OR to_currency = ?)';
    let countQuery = 'SELECT COUNT(*) as count FROM transactions WHERE user_id = ? AND (from_currency = ? OR to_currency = ?)';

    const params = [req.userId, currency, currency];

    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;

    const connection = await pool.getConnection();

    const [transactions] = await connection.query(query, [...params, parseInt(limit), offset]);
    const [countResult] = await connection.query(countQuery, params);

    connection.release();

    const total = countResult[0].count;
    const totalPages = Math.ceil(total / parseInt(limit));

    return res.json({
      success: true,
      data: transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
