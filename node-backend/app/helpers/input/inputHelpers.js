const bcrpyt = require("bcryptjs");

const validateUserInput = (email, password) => {
    return email && password;
};

const comparePassword = (password, hashedPassword) => {
    return bcrpyt.compareSync(password, hashedPassword);
};

module.exports = {validateUserInput, comparePassword};