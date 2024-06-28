const Emp = require("../../models/user");

async function GetAllEmpHandler(req, res) {
  try {
    // Query the database to retrieve all Emp
    const emps = await Emp.find();

    // Send the emp as a response
    res.status(200).json({ emps });
  } catch (error) {
    console.error("Error fetching Emp:", error);
    res.status(500).json({ message: "Something went wrong", status: false });
  }
}

module.exports = GetAllEmpHandler;
