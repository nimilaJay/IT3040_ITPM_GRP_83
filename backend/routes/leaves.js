//write http requests

const express = require("express");
const Leaves = require("../models/leaves");

const router = express.Router();

//save leaves (POST)
router.post("/leave/save", (req, res) => {
    let newLeave = new Leaves(req.body);
  
    newLeave.save((err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "Your Leave request is successfully submitted!!",
      });
    });
  });


//get leaves deatails table(GET)
router.get("/leaves", (req, res) => {
  Leaves.find().exec((err, leaves) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingLeaves: leaves,
    });
  });
});

//get a specific leave details (GET)
router.get("/leave/:id", (req, res) =>{
  let leaveId = req.params.id;

  Leaves.findById(leaveId, (err, leave) =>{
    if(err){
      return res.status(400).json({
        success: false,
        err,
      });
    } 
    return res.status(200).json({
      success: true,
      leave
    }); 
  });
});


//update leave(PUT)
router.put("/leave/update/:id", (req, res) => {
  Leaves.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, leave) => {
      if (err) {
        return res.status(400).json({error: err});
      }
      return res.status(200).json({
        success: "Leave Request Successfully Updated!!",
      });
    }
  );
});


//delete post
//since we are deleting a specific post ... need to have an id
router.delete("/leave/delete/:id", (req, res) => {
  Leaves.findByIdAndRemove(req.params.id).exec((err, deletedLeave) => {
    if (err)
      return res.status(400).json({
        message: "Delete Unsuccessful!!", err
      });
    return res.json({
      message: "Leave Delete Successful!!", deletedLeave
    });
  });
});
  

module.exports = router;