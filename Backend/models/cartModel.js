const pool = require("../config/db");

const addToCart = async (user_id, product_id, quantity) => {
  const existing = await pool.query(
    `SELECT * FROM cart_items
     WHERE user_id = $1 AND product_id = $2`,
    [user_id, product_id],
  );

  if (existing.rows.length > 0) {
    const updated = await pool.query(
      `UPDATE cart_items
       SET quantity = quantity + $1
       WHERE user_id = $2 AND product_id = $3
       RETURNING *`,
      [quantity, user_id, product_id],
    );
    return updated.rows[0];
  }

  const result = await pool.query(
    `INSERT INTO cart_items (user_id, product_id, quantity)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [user_id, product_id, quantity],
  );

  return result.rows[0];
};

const getCart = async (user_id) => {
  const result = await pool.query(
    `SELECT 
  c.id,
  c.quantity AS cart_quantity,
  p.id AS product_id,
  p.title,
  p.price,
  p.primary_image
FROM cart_items c
JOIN products p ON c.product_id = p.id
WHERE c.user_id = $1`,
    [user_id],
  );

  return result.rows;
};

const updateQuantity = async (cart_id, quantity, user_id) => {
  const result = await pool.query(
    `UPDATE cart_items
     SET quantity = $1
     WHERE id = $2 AND user_id = $3
     RETURNING *`,
    [quantity, cart_id, user_id],
  );

  return result.rows[0];
};

const removeFromCart = async (cart_id, user_id) => {
  await pool.query(
    `DELETE FROM cart_items
     WHERE id = $1 AND user_id = $2`,
    [cart_id, user_id],
  );
};

module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
};
