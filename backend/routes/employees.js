const express = require("express");
const employees = require("../models/employees");



const router = express.Router();

//=======================Save Routes====================================


//Save new employee details
router.post("/employees/save", async (req, res) => {
  try {
    if (!req.body || !req.body.empno) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }
    let newemployees = new employees(req.body);
    await newemployees.save();
    return res.status(200).json({
      success: "employees saved successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});




//Get a all the emloyees and assignments
router.get("/employeepoints", (req, res) => {
  let empno = req.params.name;
  employees.find().sort({ "empno": -1 }).exec((err, employees) => { 
    assignment_assignedtostaff.find()
      .exec((err, check) => {
      var l2 = check.length;
      var l = employees.length;
      return res.status(200).json({
        success: true,
        check: check,
        employees: employees,
        l: l,
        l2:l2,
      });
    });
  });
});



//Get the all the assignments which are not completed to displayed in the pending assignments for a particular employee
router.get("/checkassigned/:id", (req, res) => {
  let empno = req.params.id;
  assignment_assignedtostaff
    .find({ $and: [{ emp_no: empno }, { progress: { $ne: "Completed" } }] })
    .exec((err, check) => {
        return res.status(200).json({
        success: true,
        check: check,
      });
    });
});


//=======================Update Routes====================================

//Updates employee details
router.put("/employees/update/:id", (req, res) => {
  employees.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, employee) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Uploaded Succesfully",
      });
    }
  );
});




//=======================Delete Routes====================================

//Delete a specific employee details
router.delete("/employees/delete/:id", (req, res) => {
  employees.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
    if (err)
      return res.status(400).json({
        message: "Delete Unsuccess",
        err,
      });
    return res.json({
      message: "Delete Success",
      deletedPost,
    });
  });
});
module.exports = router;
