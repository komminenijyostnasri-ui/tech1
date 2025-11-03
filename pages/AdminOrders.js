import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/api/orders')
      .then(res => setOrders(res.data))
      .catch(() => {});
  }, []);

  const update = async (id, status) => {
    await api.put(`/api/orders/${id}`, { status });
    setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
  };

  return (
    <div>
      <h2>Admin Orders</h2>
      {orders.map(o => (
        <div key={o._id} className="order-card">
          <div>
            <div style={{ fontWeight: 700 }}>Order #{o._id}</div>
            <div>Items: {o.items.length}</div>
            <div>Total: ₹{o.total}</div>
          </div>
          <div>
            <select value={o.status} onChange={(e) => update(o._id, e.target.value)}>
              <option>Processing</option>
              <option>Dispatched</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
