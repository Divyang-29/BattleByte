const pool = require("../config/db");

const createFullBlog = async (data) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Insert Blog
    const blogResult = await client.query(
      `INSERT INTO blogs (primary_image, short_description, publish_date)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [data.primary_image, data.short_description, data.publish_date]
    );

    const blog = blogResult.rows[0];

    // 2️⃣ Insert Section
    await client.query(
      `INSERT INTO blog_sections
       (blog_id, image1, title, description, quote, image2, text_content)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        blog.id,
        data.image1,
        data.section_title,
        data.section_description,
        data.quote,
        data.image2,
        data.text_content,
      ]
    );

    // 3️⃣ Insert Categories
    for (let categoryId of data.category_ids) {
      await client.query(
        `INSERT INTO blog_categories (blog_id, category_id)
         VALUES ($1, $2)`,
        [blog.id, categoryId]
      );
    }

    // 4️⃣ Insert Tags
    for (let tagId of data.tag_ids) {
      await client.query(
        `INSERT INTO blog_tags (blog_id, tag_id)
         VALUES ($1, $2)`,
        [blog.id, tagId]
      );
    }

    await client.query("COMMIT");

    return blog;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const getAllBlogs = async () => {
  const result = await pool.query(
    `SELECT * FROM blogs ORDER BY publish_date DESC`
  );
  return result.rows;
};

const getBlogById = async (id) => {
  const blog = await pool.query(
    `SELECT * FROM blogs WHERE id = $1`,
    [id]
  );

  const sections = await pool.query(
    `SELECT * FROM blog_sections WHERE blog_id = $1`,
    [id]
  );

  const categories = await pool.query(
    `SELECT c.*
     FROM categories c
     JOIN blog_categories bc ON c.id = bc.category_id
     WHERE bc.blog_id = $1`,
    [id]
  );

  const tags = await pool.query(
    `SELECT t.*
     FROM tags t
     JOIN blog_tags bt ON t.id = bt.tag_id
     WHERE bt.blog_id = $1`,
    [id]
  );

  return {
    ...blog.rows[0],
    sections: sections.rows,
    categories: categories.rows,
    tags: tags.rows,
  };
};

const getPopularBlogs = async () => {
  const result = await pool.query(
    "SELECT id, primary_image, short_description FROM blogs ORDER BY publish_date DESC LIMIT 3"
  );
  return result.rows;
};

const getBlogSidebarData = async () => {

  const categories = await pool.query(
    "SELECT * FROM categories ORDER BY id DESC"
  );

  const popularBlogs = await pool.query(
    `SELECT id, primary_image, short_description, publish_date
     FROM blogs
     ORDER BY publish_date DESC
     LIMIT 3`
  );

  const tags = await pool.query(
    "SELECT * FROM tags ORDER BY id DESC"
  );

  const matches = await pool.query(
    "SELECT * FROM upcoming_matches ORDER BY match_date ASC"
  );

  const ads = await pool.query(
    "SELECT * FROM advertisements ORDER BY id DESC LIMIT 1"
  );

  return {
    categories: categories.rows,
    popularBlogs: popularBlogs.rows,
    tags: tags.rows,
    matches: matches.rows,
    advertisement: ads.rows[0] || null,
  };
};


module.exports = {
  createFullBlog,
  getAllBlogs,
  getBlogById,
  getPopularBlogs,
  getBlogSidebarData
};