const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const JWT_SECRET = "Bishalgodboy$";

// Validation middleware
const loginUserValidator = [
    body("username", "Enter a valid username").exists(),
    body("password", "Must enter the password").exists(),
];

async function LoginUser(req, res) {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { username, password } = req.body;
    console.log(username, password);

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ success: false, error: "User not found" });
        }


        if (password !== user.password) {
            return res.status(400).json({ success: false, error: "Password incorrect" });
        }


        const data = {
            user: {
                id: user._id,
            },
        };

        const authtoken = jwt.sign(data, JWT_SECRET);


        return res.status(200).json({ success: true, authtoken, msg: "Login successful", username: user.username });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}

module.exports = {LoginUser, };
