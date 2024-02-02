const express = require("express");
const router = express.Router();

const { HandleGetAllUsers, HandleGetUsersByID, HandleUpdateUsersByID, HandleDeleteUsersByID, HandleCreatedUser } = require("../controllers/user");

const { LoginUser } = require("../controllers/login");

router.route("/").get(HandleGetAllUsers).post(HandleCreatedUser)

router
    .route("/:id")
    .get(HandleGetUsersByID)
    .patch(HandleUpdateUsersByID)
    .delete(HandleDeleteUsersByID)



router.route("/login").post(LoginUser)


module.exports = router; 
