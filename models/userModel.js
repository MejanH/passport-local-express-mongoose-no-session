const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true }
})

// this method is for if(!user.validPassword) function from passportjs documentation.
// as I said passportjs documentation is not good enough.

// userSchema.methods.validPassword = function (password) {
//     return (this.password === password)
// }

module.exports = mongoose.model("Users", userSchema)