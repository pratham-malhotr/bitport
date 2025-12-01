import React, { useState, useEffect } from 'react';
import { swapAPI } from '../utils/api';
import '../styles/pages.css';

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchCurrency, setSearchCurrency] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [limit, setLimit] = useState(10);

  const fetchTransactions = async (pageNum = 1, search = '') => {
    setLoading(true);
    setError('');
    try {
      let response;
      if (search) {
        response = await swapAPI.searchTransactions({
          currency: search,
          page: pageNum,
          limit
        });
      } else {
        response = await swapAPI.getHistory({
          page: pageNum,
          limit,
          sort: sortBy,
          order: sortOrder
        });
      }

      if (response.data.success) {
        setTransactions(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setPage(pageNum);
      } else {
        setError('Failed to fetch transactions');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(1, searchCurrency);
  }, [sortBy, sortOrder, limit]);

  const handleSearch = (e) => {
    setSearchCurrency(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        const response = await swapAPI.deleteTransaction(id);
        if (response.data.success) {
          setTransactions(transactions.filter(t => t.id !== id));
        }
      } catch (err) {
        alert('Failed to delete transaction');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="page-container">
      <div className="history-container">
        <h1>Transaction History</h1>
        <p className="subtitle">View and manage your crypto swap transactions</p>

        {error && <div className="error-message">{error}</div>}

        <div className="history-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by currency (e.g., bitcoin, ethereum)"
              value={searchCurrency}
              onChange={handleSearch}
            />
          </div>

          <div className="filter-controls">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="created_at">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="result_amount">Sort by Result Amount</option>
              <option value="price">Sort by Price</option>
            </select>

            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="DESC">Newest First</option>
              <option value="ASC">Oldest First</option>
            </select>

            <select value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}>
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions found</p>
            <p className="subtitle">Start by making your first swap!</p>
          </div>
        ) : (
          <>
            <div className="transactions-table">
              <div className="table-header">
                <div className="col-date">Date</div>
                <div className="col-from">From</div>
                <div className="col-to">To</div>
                <div className="col-amount">Amount</div>
                <div className="col-result">Result</div>
                <div className="col-price">Price</div>
                <div className="col-actions">Actions</div>
              </div>

              {transactions.map((transaction) => (
                <div key={transaction.id} className="table-row">
                  <div className="col-date">
                    {formatDate(transaction.created_at)}
                  </div>
                  <div className="col-from">
                    <span className="badge from">
                      {transaction.from_currency.toUpperCase()}
                    </span>
                  </div>
                  <div className="col-to">
                    <span className="badge to">
                      {transaction.to_currency.toUpperCase()}
                    </span>
                  </div>
                  <div className="col-amount">
                    {parseFloat(transaction.amount).toFixed(8)}
                  </div>
                  <div className="col-result">
                    {parseFloat(transaction.result_amount).toFixed(8)}
                  </div>
                  <div className="col-price">
                    {parseFloat(transaction.price).toFixed(8)}
                  </div>
                  <div className="col-actions">
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="delete-btn"
                      title="Delete transaction"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => fetchTransactions(page - 1, searchCurrency)}
                  disabled={page === 1}
                  className="pagination-btn"
                >
                  Previous
                </button>

                <div className="page-info">
                  Page {page} of {totalPages}
                </div>

                <button
                  onClick={() => fetchTransactions(page + 1, searchCurrency)}
                  disabled={page === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default History;
