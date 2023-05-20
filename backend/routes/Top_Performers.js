const express = require('express');
const TopPerformers = require('../models/Top_Performers');
const Points = require('../models/points')
//const employees = require('../models/employees')

const router = express.Router();

//Get Performers from Points
router.get('/TopPerformers',(req,res) =>{
    Points.find().sort({points: -1}).limit(3).exec((err, existingPoints) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPoints:existingPoints
        });
    });
});
/*
//Get Employee names matching the Emp IDs
router.get('/TopPerformers',(req,res) =>{
    employees.find({_id: {$in: empno}}).exec((err, existingNames) =>{
    if(err){
        return res.status(400).json({
            error:err
        });
    }
    return res.status(200).json({
        success:true,
        existingNames: existingNames
    });    
    });
});
*/
//save Top Performers
router.post("/TopPerformers/save", (req, res) => {

    let newpoints = req.body;
   
     TopPerformers.create(newpoints, (err) => {
   
       if (err) {
   
         return res.status(400).json({
   
           error: err,
   
         });
   
       }
   
       return res.status(200).json({
   
         success: "points saved succesfully",
   
       });
   
     });
   
   });
/*
router.post('TopPerformers/save', (req,res)=>{

    let newTopPerformer = new TopPerformers(req.body);

    newTopPerformer.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Saved Successfully"
        });
    });
});
*/
//Get Top Performers

router.get('/TopPerformersTable', (req,res)=>{
    TopPerformers.find().exec((err, existingTopPerformers) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingTopPerformers:existingTopPerformers
        });
    });
});

//Get specific TopPerformers
router.get("TopPerformers/:id", (req,res) =>{
    let top_empid1 = req.params.id;

    TopPerformers.findById(top_empid1, (err, existingTopPerformers) =>{
        if(err){
            return res.status(400).json({
                success: false,
                err,
            });
        }
        return res.status(200).json({
            success: true,
            existingTopPerformers
        });
    });
});


//Delete Top Performers
router.delete('/TopPerformers/delete/:id', (req,res) =>{
    TopPerformers.findByIdAndRemove(req.params.id).exec((err, deletedTopPerformers) =>{

        if(err) return res.status(400).json({
            message:"Delete Unseccessful", err
        });

        return res.json({
            message:"Delete Successful", deletedTopPerformers
        });
    });
});

module.exports = router;