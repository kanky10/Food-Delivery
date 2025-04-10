import React, { useState, useEffect } from 'react';
import './OrderHistory.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please login to view your orders");
      navigate('/');
      return;
    }

    // For now, we'll use mock data
    const mockOrders = [
      {
        id: '1',
        date: '2024-04-06',
        total: 45.99,
        status: 'Delivered',
        items: [
          { name: 'Greek Salad', quantity: 2, price: 12.99 },
          { name: 'Pasta', quantity: 1, price: 20.01 }
        ]
      },
      {
        id: '2',
        date: '2024-04-05',
        total: 32.50,
        status: 'Processing',
        items: [
          { name: 'Veg Roll', quantity: 3, price: 32.50 }
        ]
      }
    ];

    setOrders(mockOrders);
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="order-history-container">
        <div className="loading">Loading your orders...</div>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="order-status">
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                    <span className="item-price">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <div className="order-total">
                  <span>Total:</span>
                  <span className="total-amount">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 