const express = require('express');
const router = express.Router();
const authentication = require("../../middleware/authentication.js");
const experienceController=require("../experience/controller.js")
router.post("/addExperience",authentication,experienceController.addExperience);
router.get("/get",authentication,experienceController.getExperience);
router.delete("/delete/:id",authentication,experienceController.deleteExperience);
router.put("/update/:id",authentication,experienceController.updateExperience)
module.exports = router;