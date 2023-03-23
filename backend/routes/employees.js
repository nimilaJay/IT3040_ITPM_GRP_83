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







//Get a count of employees based on status [Senior/Trainee] for employee report
router.get("/employees/division", (req, res) => {  
  employees.find({status : { $eq: "Senior" }}).count().exec((err, senior) => { employees.find({status : { $eq: "Trainee" }}).count().exec((err, trainee) => { 
    if (err) {
      return res.status(400).json({ success: false, err });
    }
      return res.status(200).json({
        success: true,
        seniorcount: senior,
        traineecount: trainee,
     })     
    });
  });
});


//Get a list of employeees in each province for employee report
router.get("/employees/province", (req, res) => {  
  employees.aggregate([
    { "$facet": {
       "W": [
      { "$match": { "province": "Western" }},
      { "$count": "W" }
      ],
      "C": [
      { "$match": { "province": "Central" }},
      { "$count": "C" }
      ],
      "S": [
      { "$match": { "province": "Southern" }},
      { "$count": "S" }
      ],
      "U": [
      { "$match": { "province": "Uva" }},
      { "$count": "U" }
      ],
      "Sa": [
      { "$match": { "province": "Sabaragamuwa" }},
      { "$count": "Sa" }
      ],
      "NW": [
      { "$match": { "province": "North Western" }},
      { "$count": "NW" }
      ],
      "NC": [
      { "$match": { "province": "North Central" }},
      { "$count": "NC" }
      ],
      "N": [
      { "$match": { "province": "Northern" }},
      { "$count": "N" }
      ],
      "E": [
      { "$match": { "province": "Eastern" }},
      { "$count": "E" }
      ]
    }},
      { "$project": {
      "W": { "$arrayElemAt": ["$W.W", 0] },
      "C": { "$arrayElemAt": ["$C.C", 0] },
      "S": { "$arrayElemAt": ["$S.S", 0] },
      "U": { "$arrayElemAt": ["$U.U", 0] },
      "Sa": { "$arrayElemAt": ["$Sa.Sa", 0] },
      "NW": { "$arrayElemAt": ["$NW.NW", 0] },
      "NC": { "$arrayElemAt": ["$NC.NC", 0] },
      "N": { "$arrayElemAt": ["$N.N", 0] },
      "E": { "$arrayElemAt": ["$E.E", 0] }
    }}
    ]).exec((err, province) => { 
    if (err) {
      return res.status(400).json({ success: false, err });
    }
      return res.status(200).json({
        success: true,
        province: province,
     })     
    });
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



//=======================Get Specific Routes====================================
//Get the details of a specific employee for employee profile
router.get("/employees/:id", (req, res) => {
  let postid = req.params.id;
  employees.findById(postid, (err, employee) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      employee,
    });
  });
});

//Get the total allocations a specific employee had for the employee profile 
router.get("/employees/alocation/:id1", (req, res) => {
  let postid = req.params.id1;
  assignment_assignedtostaff.find({emp_no :postid}).count().exec((err, allocationcount) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      allocationcount,
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