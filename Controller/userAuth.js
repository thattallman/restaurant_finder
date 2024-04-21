const USER = require("../Models/user");

// for handling user registartion 
const handleRegister =  async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      await USER.create({
        first_name,
        last_name,
        email,
        password,
      });
      res.status(200).json({ Status: "User Updated Successfully " });
    } catch (error) {
      res.status(400).json({ success: false, msg: error.message });
    }
  }

  // for handling user login 
  const handleLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = await USER.matchPasswordAndGenerateToken(email, password);
      res
        .status(200)
        .json({ status: "User successfully  authenticated", token: token });
    } catch (error) {
      res.status(400).json({ success: false, msg: error.message });
    }
  }

  module.exports = {handleRegister, handleLogin}