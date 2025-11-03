import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Add to Cart function
  const addToCart = async (productId) => {
    try {
      const res = await axios.post("http://localhost:5000/api/cart", {
        productId,
        quantity: 1,
      });
      alert("✅ " + res.data.message);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add item to cart");
    }
  };

  return (
    <div className="home-container">
      <h2 className="title">Featured Products</h2>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <img src={p.image} alt={p.name} className="product-img" />
            <h3>{p.name}</h3>
            <p className="price">₹{p.price}</p>
            <div className="buttons">
              {/* ✅ Updated button */}
              <button
                className="add-btn"
                onClick={() => addToCart(p._id)}
              >
                Add to Cart
              </button>
              <a href={`/product/${p._id}`} className="view-link">
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
