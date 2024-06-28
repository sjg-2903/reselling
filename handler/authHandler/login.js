const User = require("../../models/user");

async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;

    // Check if user with provided email already exists
    const existingUser = await User.findOne({ email, password });
    console.log("existingUser", existingUser);
    if (existingUser) {
      return res
        .status(200)
        .json({
          message: "Login Sucessfully",
          status: true,
          userData: existingUser,
        });
    } else {
      res.status(200).json({ message: "Invalid Credential", status: false });
    }
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = loginHandler;
