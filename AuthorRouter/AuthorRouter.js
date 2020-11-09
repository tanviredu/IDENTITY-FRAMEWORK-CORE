const router = require("express").Router();


router.get("/",(req,res)=>{
    res.send("Inside Author");
})



module.exports = router;