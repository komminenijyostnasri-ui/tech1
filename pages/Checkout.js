import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pin: '',
    country: '',
    phone: '',
    paymentMethod: 'COD'
  });

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + 50;
  const navigate = useNavigate();

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const place = async () => {
    const order = {
      items: cart.map(i => ({
        productId: i._id,
        name: i.name,
        price: i.price,
        qty: i.qty
      })),
      total,
      address: form,
      paymentMethod: form.paymentMethod
    };

    await api.post('/api/orders', order);
    localStorage.removeItem('cart');
    alert('Order placed successfully!');
    navigate('/orders');
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '40px',
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '20px'
      }}
    >
      {/* LEFT SIDE - FORM */}
      <div style={{ width: '100%' }}>
        <h2 style={{ marginBottom: '20px' }}>Delivery Information</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px'
          }}
        >
          <input
            name="firstName"
            placeholder="First name"
            onChange={handle}
            style={inputStyle}
          />
          <input
            name="lastName"
            placeholder="Last name"
            onChange={handle}
            style={inputStyle}
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handle}
            style={inputStyle}
          />
          <input
            name="street"
            placeholder="Street"
            onChange={handle}
            style={inputStyle}
          />
          <input
            name="city"
            placeholder="City"
            onChange={handle}
            style={inputStyle}
          />
          <input
            name="state"
            placeholder="State"
            onChange={handle}
            style={inputStyle}
          />
          <input
            name="pin"
            placeholder="Pin code"
            onChange={handle}
            style={inputStyle}
          />
          <input
            name="country"
            placeholder="Country"
            onChange={handle}
            style={inputStyle}
          />
          <input
            name="phone"
            placeholder="Phone"
            onChange={handle}
            style={inputStyle}
          />
        </div>
      </div>

      {/* RIGHT SIDE - SUMMARY */}
      <div
        style={{
          width: '100%',
          maxWidth: '360px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          background: '#fafafa',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          height: 'fit-content'
        }}
      >
        <h3>Cart Totals</h3>
        <p>Subtotal ₹{subtotal}</p>
        <p>Delivery Fee ₹50</p>
        <h4>Total ₹{total}</h4>

        <h4 style={{ marginTop: '20px' }}>Payment Method</h4>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          <input
            type="radio"
            name="paymentMethod"
            value="COD"
            checked={form.paymentMethod === 'COD'}
            onChange={handle}
          />
          &nbsp;Cash on Delivery
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          <input
            type="radio"
            name="paymentMethod"
            value="Card"
            checked={form.paymentMethod === 'Card'}
            onChange={handle}
          />
          &nbsp;Card Payment
        </label>

        <button
          onClick={place}
          style={{
            marginTop: '16px',
            padding: '12px 20px',
            background: '#ff6b35',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

// ✅ inputStyle (outside component for reusability)
const inputStyle = {
  padding: '10px',
  fontSize: '15px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  width: '100%'
};
