const User = require('../models/User');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT authentication
const MESSAGE=require('../constant');
const constant = require('../constant');

// User signup
exports.signup = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    // Check if a user with the same mobile number already exists
    const existingUser = await User.findOne({ where: { mobileNumber } });

    if (existingUser) {
      return res.status(400).json({ error: constant.MESSAGE.DUPLICATE_MOBILENUMBER });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    const newUser = await User.create({ mobileNumber, password: hashedPassword,createdAt:new Date(),lastLoginAt:new Date() });

    res.status(201).json({ message: constant.MESSAGE.REGISTER_SUCCESS, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: constant.MESSAGE.INTERNAL_SERVER_ERROR });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;


    // Find the user by mobile number 
    const user = await User.findOne({ where: { mobileNumber} });

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user?.password);

    // unauthorize 
    if (!user || !isPasswordValid) {
      return res.status(401).json({ error: constant.MESSAGE.UNAUTHORIZE });
    }

    // Create a JWT token for authentication
    const token = jwt.sign({ userId: user.id, role: user.role },process.env.JWT_SECRET_KEY, {
      expiresIn: '1h', // Token expiration time
    });
    user.lastLoginAt = new Date();
    await user.save();
    
    res.status(200).json({ message: constant.MESSAGE.LOGIN_SUCCESS, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: constant.MESSAGE.INTERNAL_SERVER_ERROR });
  }
};

