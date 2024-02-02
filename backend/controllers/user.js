const User = require("../models/user");

async function HandleGetAllUsers(req, res) {
    const allUsers = await User.find({})
    return res.json(allUsers);
}

async function HandleGetUsersByID(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
}

async function HandleUpdateUsersByID(req, res) {
    const body = req.body
    console.log(body)

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        username: body.username,
        password: body.password
    }, { new: true });

    console.log(updatedUser)

    return res.json({
        message: "User updated successfully",
        user: updatedUser

    });
}

async function HandleDeleteUsersByID(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.json("User Deleted");
}

async function HandleCreatedUser(req, res) {
    const body = req.body;
    if (
        !body || !body.first_name || !body.last_name || !body.email || !body.username || !body.password
    ) {
        return res.status(404).json("All field are required...")
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        username: body.username,
        password: body.password
    });

    return res.status(201).json({ msg: "User Created Successfully", id: result._id });
}


module.exports = { HandleGetAllUsers, HandleGetUsersByID, HandleUpdateUsersByID, HandleDeleteUsersByID, HandleCreatedUser, }