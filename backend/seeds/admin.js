const User = require ('../model/User');
const bcrypt = require("bcryptjs");

async function removePrevious() {
    await User.deleteOne({ email: "name@gmail.com" });
}


const hashedpassword =  bcrypt.hashSync("1234567", 10);

const admin = {
    username: 'myname',
    email:'name@gmail.com',
    password: hashedpassword,
    admin:true,
}
 removePrevious();
const newUser = new User(admin);
newUser.save();