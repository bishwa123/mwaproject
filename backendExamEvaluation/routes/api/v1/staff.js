var express = require("express");
var router = express.Router();

router.get('/',(req,res)=>{
    res.send("Get staffs API");
});
router.get('/:id',(req,res)=>{
    res.send("Get staff API");
});
router.post("/", (req,res)=>{
    res.send("Post staff APi");
});
router.patch('/:id',(req,res)=>{
    res.send('Patch staff Api');
});

module.exports = router;