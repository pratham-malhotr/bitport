import React, { useState } from 'react';
import { swapAPI } from '../utils/api';
import '../styles/pages.css';

const Swap = () => {
  const [formData, setFormData] = useState({
    fromCurrency: 'bitcoin',
    toCurrency: 'ethereum',
    amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [result, setResult] = useState(null);

  const cryptocurrencies = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' },
    { id: 'ripple', name: 'XRP', symbol: 'XRP' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' },
    { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
    { id: 'avalanche-2', name: 'Avalanche', symbol: 'AVAX' },
    { id: 'chainlink', name: 'Chainlink', symbol: 'LINK' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwapCurrencies = () => {
    setFormData(prev => ({
      ...prev,
      fromCurrency: prev.toCurrency,
      toCurrency: prev.fromCurrency
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await swapAPI.swap({
        fromCurrency: formData.fromCurrency,
        toCurrency: formData.toCurrency,
        amount: parseFloat(formData.amount)
      });

      if (response.data.success) {
        setResult(response.data.data);
        setSuccess('Swap completed successfully!');
        setFormData(prev => ({ ...prev, amount: '' }));
      } else {
        setError(response.data.message || 'Swap failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fromCurrency = cryptocurrencies.find(c => c.id === formData.fromCurrency);
  const toCurrency = cryptocurrencies.find(c => c.id === formData.toCurrency);

  return (
    <div className="page-container">
      <div className="swap-container">
        <h1>Crypto Swap</h1>
        <p className="subtitle">Exchange cryptocurrencies at real-time prices</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="swap-card">
          <form onSubmit={handleSubmit}>
            <div className="swap-section">
              <div className="swap-column">
                <label>You Send</label>
                <div className="currency-select">
                  <select 
                    name="fromCurrency" 
                    value={formData.fromCurrency}
                    onChange={handleChange}
                  >
                    {cryptocurrencies.map(crypto => (
                      <option key={crypto.id} value={crypto.id}>
                        {crypto.name} ({crypto.symbol})
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  placeholder="Enter amount"
                  step="0.00000001"
                  min="0"
                />
              </div>

              <button 
                type="button" 
                className="swap-button"
                onClick={handleSwapCurrencies}
              >
                ⇄
              </button>

              <div className="swap-column">
                <label>You Receive</label>
                <div className="currency-select">
                  <select 
                    name="toCurrency" 
                    value={formData.toCurrency}
                    onChange={handleChange}
                  >
                    {cryptocurrencies.map(crypto => (
                      <option key={crypto.id} value={crypto.id}>
                        {crypto.name} ({crypto.symbol})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="amount-display">
                  {result && formData.fromCurrency === result.fromCurrency && 
                   formData.toCurrency === result.toCurrency ? 
                    result.resultAmount : 
                    '0'}
                </div>
              </div>
            </div>

            {result && formData.fromCurrency === result.fromCurrency && 
             formData.toCurrency === result.toCurrency && (
              <div className="swap-details">
                <div className="detail-row">
                  <span>Exchange Rate</span>
                  <span>1 {fromCurrency?.symbol} = {result.price} {toCurrency?.symbol}</span>
                </div>
                <div className="detail-row">
                  <span>You Send</span>
                  <span>{result.amount} {fromCurrency?.symbol}</span>
                </div>
                <div className="detail-row">
                  <span>You Receive</span>
                  <span>{result.resultAmount} {toCurrency?.symbol}</span>
                </div>
              </div>
            )}

            <button type="submit" disabled={loading || !formData.amount} className="swap-submit">
              {loading ? 'Processing...' : 'Swap Now'}
            </button>
          </form>
        </div>

        <div className="swap-info">
          <h3>How it works?</h3>
          <ol>
            <li>Select the cryptocurrency you want to send</li>
            <li>Enter the amount you want to exchange</li>
            <li>Select the cryptocurrency you want to receive</li>
            <li>Review the exchange rate and click Swap Now</li>
            <li>Transaction will be recorded in your history</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Swap;
