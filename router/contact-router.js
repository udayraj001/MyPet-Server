const express=require("express");
const router=express.Router();
const contactForm=require("../controllers/contact-controller");

router.post("/contact",contactForm);
// router.route("/contact").post(contactForm);

module.exports=router;