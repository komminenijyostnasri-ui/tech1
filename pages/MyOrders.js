import React, { useEffect, useState } from 'react';
import api from '../api';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get('/orders');
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#d84315' }}>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '12px',
                padding: '20px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              }}
            >
              <h3 style={{ color: '#ff6b35', marginBottom: '10px' }}>
                Order #{order._id}
              </h3>
              <p><strong>Items:</strong> {order.items.length}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p style={{ fontSize: '13px', color: '#555' }}>
                <strong>Placed:</strong> {new Date(order.createdAt).toLocaleString()}
              </p>

              {order.items.length > 0 && (
                <div style={{ marginTop: '12px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                  <h4 style={{ marginBottom: '8px' }}>Items:</h4>
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '6px 0',
                        borderBottom: '1px dashed #eee',
                        fontSize: '14px'
                      }}
                    >
                      <span>{item.name}</span>
                      <span>₹{item.price} × {item.qty}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
