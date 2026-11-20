import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, qty) => {
    if (qty < 1) return;

    await axios.put(
      `${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/cart/${id}`,
      { quantity: qty },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    fetchCart();
  };

  const removeItem = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/cart/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchCart();
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.cart_quantity,
    0,
  );
  return (
    <section className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title">Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-table">
              {cart.map((item) => (
                <div className="cart-row" key={item.id}>
                  <div className="cart-product">
                    <img
                      src={`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/uploads/${item.primary_image}`}
                      alt=""
                    />
                    <div>
                      <h4>{item.title}</h4>
                      <p>₹{item.price}</p>
                    </div>
                  </div>

                  <div className="cart-quantity">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.cart_quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.cart_quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.cart_quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-total">
                    ₹{(item.price * item.cart_quantity).toFixed(2)}
                  </div>

                  <div className="cart-remove">
                    <button onClick={() => removeItem(item.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Subtotal: ₹{subtotal.toFixed(2)}</h3>
              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
