const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

async function initializeDatabase() {
  console.log("🔄 Initializing BattleByte PostgreSQL Database Schema...");

  try {
    const schemaPath = path.join(__dirname, "../schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");

    // Execute schema
    await pool.query(schemaSql);

    console.log("✅ All tables and schemas created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to initialize database:", error);
    process.exit(1);
  }
}

initializeDatabase();
