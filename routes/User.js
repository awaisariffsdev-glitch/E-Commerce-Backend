const express = require("express");
const { userSignUp, userLogIn, userUpdate } = require("../controller/user.controller");
const upload = require("../middleware/image.middleware");
const router = express.Router();

router.post("/register", upload.single("image"), userSignUp);
router.post("/logIn", userLogIn);
router.put("/update/:id", upload.single("image"), userUpdate);

module.exports = router;