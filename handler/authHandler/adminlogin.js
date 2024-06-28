const Admin = require("../../models/admin");

async function adminLoginHandler(req, res) {
  try {
    const { email, password } = req.body;

    // Check if Admin with provided email already exists
    const existingAdmin = await Admin.findOne({ email, password });
    console.log("existingAdmin", existingAdmin);
    if (existingAdmin) {
      return res
        .status(200)
        .json({
          message: "Admin Login Sucessfully",
          status: true,
          adminData: existingAdmin,
        });
    } else {
      res.status(200).json({ message: "Invalid Credential", status: false });
    }
  } catch (error) {
    console.error("Error adding Admin:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = adminLoginHandler;
