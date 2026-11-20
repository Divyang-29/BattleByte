import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [billingData, setBillingData] = useState({
    first_name: "",
    last_name: "",
    country: "United Arab Emirates",
    company_name: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    email: "",
    phone: "",
    order_notes: "",
  });

  // Fetch cart
  useEffect(() => {
    axios
      .get("http://localhost:8080/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setBillingData({
      ...billingData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/orders",
        {
          billingData,
          payment_method: paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully!");

      // redirect to admin or order details page
      navigate("/"); // change if you have order tracking page

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Order failed");
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = 30;
  const tax = 0;
  const discount = 0;
  const total = subtotal + shipping + tax - discount;

  return (
    <section className="checkout-page">
      <div className="checkout-container">

        {/* LEFT SIDE */}
        <div className="checkout-left">
          <h2>Billing Details</h2>

          <form className="billing-form">

            <input name="first_name" placeholder="First Name" onChange={handleChange} />
            <input name="last_name" placeholder="Last Name" onChange={handleChange} />

            <select name="country" onChange={handleChange}>
              <option>United Arab Emirates</option>
            </select>

            <input name="company_name" placeholder="Company Name" onChange={handleChange} />
            <input name="address" placeholder="Address" onChange={handleChange} />
            <input name="city" placeholder="Town / City" onChange={handleChange} />
            <input name="state" placeholder="State / County" onChange={handleChange} />
            <input name="postcode" placeholder="Postcode / Zip" onChange={handleChange} />
            <input name="email" placeholder="Email Address" onChange={handleChange} />
            <input name="phone" placeholder="Phone" onChange={handleChange} />

            <textarea name="order_notes" placeholder="Order Notes" onChange={handleChange}></textarea>

          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right">
          <h3>Your Order</h3>

          <div className="summary-line">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-line">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <div className="summary-line">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="summary-line">
            <span>Discount</span>
            <span>${discount.toFixed(2)}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <h4 className="payment-title">Payment Method</h4>

          <div className="payment-option">
            <label>
              <input
                type="radio"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
              />
              Direct Bank Transfer
            </label>
          </div>

          <div className="payment-option">
            <label>
              <input
                type="radio"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
              />
              PayPal
            </label>
          </div>

          <div className="payment-option">
            <label>
              <input
                type="radio"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery
            </label>
          </div>

          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>

        </div>

      </div>
    </section>
  );
}