const pool = require("../config/db");

const createProduct = async (
  primary_image,
  title,
  price,
  discounted_price,
  quantity,
  category,
  tag,
  sku,
  expected_delivery,
  description,
  additional_information
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const productResult = await client.query(
      `INSERT INTO products 
      (primary_image, title, price, discounted_price, quantity, category, tag, sku, expected_delivery)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        primary_image,
        title,
        price,
        discounted_price,
        quantity,
        category,
        tag,
        sku,
        expected_delivery,
      ]
    );

    const product = productResult.rows[0];

    await client.query(
      `INSERT INTO product_descriptions (product_id, description)
       VALUES ($1,$2)`,
      [product.id, description]
    );

    await client.query(
      `INSERT INTO product_additional_info (product_id, information)
       VALUES ($1,$2)`,
      [product.id, additional_information]
    );

    await client.query("COMMIT");

    return product;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const getAllProducts = async () => {
  const result = await pool.query(
    `SELECT * FROM products ORDER BY id DESC`
  );
  return result.rows;
};

const getProductById = async (id) => {
  const product = await pool.query(
    `SELECT * FROM products WHERE id = $1`,
    [id]
  );

  const description = await pool.query(
    `SELECT description FROM product_descriptions WHERE product_id = $1`,
    [id]
  );

  const additional = await pool.query(
    `SELECT information FROM product_additional_info WHERE product_id = $1`,
    [id]
  );

  const reviews = await pool.query(
    `SELECT * FROM product_reviews WHERE product_id = $1`,
    [id]
  );

  const related = await pool.query(
    `SELECT * FROM products 
     WHERE tag = $1 AND id != $2
     LIMIT 4`,
    [product.rows[0].tag, id]
  );

  return {
    ...product.rows[0],
    description: description.rows[0],
    additional_information: additional.rows[0],
    reviews: reviews.rows,
    related_products: related.rows,
  };
};

const addReview = async (product_id, name, email, review) => {
  const result = await pool.query(
    `INSERT INTO product_reviews (product_id, name, email, review)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [product_id, name, email, review]
  );

  return result.rows[0];
};

const countProducts = async () => {
  const result = await pool.query("SELECT COUNT(*) FROM products");
  return parseInt(result.rows[0].count);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  addReview,
  countProducts
};