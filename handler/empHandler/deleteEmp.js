const Emp = require("../../models/user");

async function deleteEmpHandler(req, res) {
  try {
    // Extract the Employee ID from the request parameters
    const empId = req.query.empid;
    console.log("empId", empId);
    // Check if the Employee exists
    const existingEmp = await Emp.findById(empId);
    if (!existingEmp) {
      return res.status(404).json({ message: "Employee not found", status: false });
    }

    // If the Employee exists, delete it
    await Emp.findByIdAndDelete(empId);
    res
      .status(200)
      .json({ message: "Employee deleted successfully", status: true });
  } catch (error) {
    console.error("Error deleting Employee:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = deleteEmpHandler;
