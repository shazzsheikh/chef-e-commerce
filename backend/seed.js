const admin = require("./models/adminmodel.js");
const bcrypt = require("bcrypt");
async function seedAdmin() {
  const existingAdmin = await admin.findOne({ email: "admin@example.com" });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);
  const Admin = new admin({
    name: "MAMTA",
    email: "admin@example.com",
    password: hashedPassword, // Use hashed password
    phonenumber: "8750934211",
  });

  await Admin.save();
  console.log("Admin user created");
}

module.exports = seedAdmin;
