const express = require('express');
const router = express.Router();
const ProjectController = require("../projet/controller")
const authentication = require("../../middleware/authentication.js");

router.post("/addprojet",authentication,ProjectController.addProject);
router.get("/getProject",authentication,ProjectController.getProject);
router.delete("/delete/:id",authentication,ProjectController.deleteProject);
router.put("/update/:id",authentication,ProjectController.updateProject)
module.exports = router;