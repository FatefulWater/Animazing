const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
router.post("/register", async (req, res) => {
  try{
  //getting data
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;
    // encrypting password
    const passwordHash = await bcrypt.hash(password, 10);
    // create new User
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash 
  });
    // saving new User
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try{
    // getting email and password
    const { email, password } = req.body;
    // looking for user email, if not found return error
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User doesn't exist." });
    // looking if password matches, otherwise return error
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    // create token and after that delete password so to not send it to frontend
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin, }, process.env.JWT_SEC, { expiresIn: "3d"});
    delete user.password;
    res.status(200).json({ token, user }); 
  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;