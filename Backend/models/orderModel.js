const pool = require("../config/db");

const generateTrackingId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `HPTRK-${timestamp}-${random}`;
};

const createOrder = async (user_id, billingData, payment_method) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Get cart items + stock
    const cart = await client.query(
      `SELECT 
          c.quantity,
          p.id,
          p.price,
          p.quantity AS stock
       FROM cart_items c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [user_id],
    );

    if (cart.rows.length === 0) {
      throw new Error("Cart is empty");
    }

    let subtotal = 0;

    for (let item of cart.rows) {
      if (item.quantity > item.stock) {
        throw new Error("Insufficient stock for product ID " + item.id);
      }

      subtotal += item.price * item.quantity;
    }

    const shipping = 30;
    const tax = 0;
    const discount = 0;
    const total = subtotal + shipping + tax - discount;

    const tracking_id = generateTrackingId();

    // 2️⃣ Insert Order
    const orderResult = await client.query(
      `INSERT INTO orders
       (user_id, subtotal, shipping, tax, discount, total,
        payment_method, order_status, payment_status, tracking_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,'processing','pending',$8)
       RETURNING *`,
      [
        user_id,
        subtotal,
        shipping,
        tax,
        discount,
        total,
        payment_method,
        tracking_id,
      ],
    );

    const order = orderResult.rows[0];

    // 3️⃣ Insert Billing
    await client.query(
      `INSERT INTO billing_details
       (order_id, first_name, last_name, country, company_name,
        address, city, state, postcode, email, phone, order_notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [
        order.id,
        billingData.first_name,
        billingData.last_name,
        billingData.country,
        billingData.company_name,
        billingData.address,
        billingData.city,
        billingData.state,
        billingData.postcode,
        billingData.email,
        billingData.phone,
        billingData.order_notes,
      ],
    );

    // 4️⃣ Insert Order Items + Reduce Stock
    for (let item of cart.rows) {
      await client.query(
        `INSERT INTO order_items
         (order_id, product_id, quantity, price_at_purchase)
         VALUES ($1,$2,$3,$4)`,
        [order.id, item.id, item.quantity, item.price],
      );

      await client.query(
        `UPDATE products
         SET quantity = quantity - $1
         WHERE id = $2`,
        [item.quantity, item.id],
      );
    }

    // 5️⃣ Clear Cart
    await client.query(`DELETE FROM cart_items WHERE user_id = $1`, [user_id]);

    await client.query("COMMIT");

    return order;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// GET ALL ORDERS (Admin)
const getAllOrders = async () => {
  try {
    const result = await pool.query(`
      SELECT 
        o.id,
        o.total,
        o.order_status,
        o.payment_status,
        o.created_at,
        u.username
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);

    return result.rows;

  } catch (err) {
    console.log("🔥 ADMIN ORDER ERROR:", err.message);
    throw err;
  }
};

// UPDATE ORDER STATUS (Admin)
const updateOrderStatus = async (order_id, status) => {
  const result = await pool.query(
    `UPDATE orders
     SET order_status = $1
     WHERE id = $2
     RETURNING *`,
    [status, order_id],
  );

  return result.rows[0];
};

const countOrders = async () => {
  const result = await pool.query("SELECT COUNT(*) FROM orders");
  return parseInt(result.rows[0].count);
};

const sumRevenue = async () => {
  const result = await pool.query("SELECT COALESCE(SUM(total_amount), 0) FROM orders");
  return parseFloat(result.rows[0].coalesce);
};

module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  countOrders,
  sumRevenue
};
