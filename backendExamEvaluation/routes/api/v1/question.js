var express = require("express");
var router = express.Router();

router.get('/',(req,res)=>{
    res.send("Get Questions API");
});
router.get('/:id',(req,res)=>{
    res.send("Get Question API");
});
router.post("/", (req,res)=>{
    res.send("Post Question APi");
});
router.patch('/:id',(req,res)=>{
    res.send('Patch question edit');
});
module.exports = router;