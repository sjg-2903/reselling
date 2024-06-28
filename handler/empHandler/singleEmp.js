const Emp = require("../../models/user");

async function getEmpByIdHandler(req, res) {
  try {
    const empId = req.query.empid;

    // Find emp by ID
    const emp = await Emp.findById(empId);
    if (!emp) {
      return res.status(404).json({ message: "Employee not found", status: false });
    }

    res.status(200).json({ emp, status: true });
  } catch (error) {
    console.error("Error getting emp by ID:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = getEmpByIdHandler;
