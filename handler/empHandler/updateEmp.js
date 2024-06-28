const Emp = require("../../models/user");

async function UpdateEmpHandler(req, res) {
  try {
    // const taskId = req.params.id; // Assuming the emp ID is passed in the request parameters
    const {empid, name, email, password, role } = req.body;
// console.log("taskId",req.params)
    // Find the emp by ID
    const emp = await Emp.findById(empid);
    if (!emp) {
      return res.status(404).json({ message: "Employee not found", status: false });
    }

    // Update emp properties if provided
    if (name) emp.name = name;
    if (email) emp.email = email;
    if (password) emp.password = password;
    if (role) emp.role = role;
  
    // Save the updated emp
    await emp.save();

    res.status(200).json({ message: "Employee updated successfully", status: true });
  } catch (error) {
    console.error("Error updating emp:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = UpdateEmpHandler;
