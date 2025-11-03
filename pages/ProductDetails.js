import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, cart } = useCart();

  // ✅ Load product details from backend
  useEffect(() => {
    api
      .get(`/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log("✅ Loaded product:", res.data);
      })
      .catch((err) => console.error("❌ Failed to load product", err));
  }, [id]);

  // ✅ Log cart whenever it changes (for debugging)
  useEffect(() => {
    console.log("🛒 Cart updated:", cart);
  }, [cart]);

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen text-orange-700 text-lg">
        Loading product details...
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-10 p-10 bg-orange-50 min-h-screen">
      <img
        src={product.image}
        alt={product.name}
        className="w-80 h-80 object-cover rounded-2xl shadow-lg border border-orange-300"
      />

      <div className="max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-orange-200">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">
          {product.name}
        </h1>
        <p className="text-gray-600 text-lg mb-3">{product.description}</p>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          ₹{product.price}
        </h3>

        <button
          onClick={() => {
            console.log("🟠 Adding to cart:", product);
            addToCart(product);
          }}
          className="bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-orange-700 transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
