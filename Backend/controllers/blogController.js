const {
  createFullBlog,
  getAllBlogs,
  getBlogById,
  getPopularBlogs,
  getBlogSidebarData,
} = require("../models/blogModel");

const addBlog = async (req, res) => {
  try {
    const {
      short_description,
      publish_date,
      section_title,
      section_description,
      quote,
      text_content,
      category_ids,
      tag_ids,
    } = req.body;

    if (!req.files?.primary_image || !req.files?.image1 || !req.files?.image2) {
      return res.status(400).json({ message: "All images required" });
    }

    const blogData = {
      primary_image: req.files.primary_image[0].filename,
      image1: req.files.image1[0].filename,
      image2: req.files.image2[0].filename,
      short_description,
      publish_date,
      section_title,
      section_description,
      quote,
      text_content,
      category_ids: JSON.parse(category_ids),
      tag_ids: JSON.parse(tag_ids),
    };

    const blog = await createFullBlog(blogData);

    res.status(201).json({
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchBlogs = async (req, res) => {
  const blogs = await getAllBlogs();
  res.json(blogs);
};

const fetchBlogById = async (req, res) => {
  const blog = await getBlogById(req.params.id);
  res.json(blog);
};
const fetchPopularBlogs = async (req, res) => {
  const blogs = await getPopularBlogs();
  res.json(blogs);
};

const getSidebar = async (req, res) => {
  try {
    const data = await getBlogSidebarData(); // ✅ no blogModel
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addBlog,
  fetchBlogs,
  fetchBlogById,
  fetchPopularBlogs,
  getSidebar
};
