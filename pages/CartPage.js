import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);

  if (cart.length === 0) {
    return (
      <div>
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>

      <div>
        {cart.map(item => (
          <div key={item._id} className="cart-row">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={item.image} alt={item.name} />
              <div style={{ marginLeft: 12 }}>
                <div style={{ fontWeight: 700 }}>{item.name}</div>
                <div>₹{item.price} x {item.qty}</div>
              </div>
            </div>
            <div>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <h3>Total: ₹{total}</h3>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
}
