const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { upload, handleUpload } = require('../config/handleUpload');
const Buffer = require('buffer');
// Login function
async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' ,success:false});
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' ,success:false});
        }

        // If credentials are valid, create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

        // Set cookies with JWT token
        const options={
            maxAge: 3 * 24 * 60 * 60 * 1000, // Expires in 3 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag based on environment
            sameSite: 'strict' // Set SameSite attribute
        }

       return  res.cookie('token', token,options).status(200).json({ msg: 'Login successful' ,success:true,token,user:user})




    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Register function
async function register(req, res) {
    // console.log("registerController",req.body);
    const { username, password, name, age, gender, interestedIn, email, phone } = req.body;
    const userId = Date.now();

    try {
        // console.log("Request mai file:",req.file);
        if (!req.file) {
            profilePhoto="";
          }
      else{
          const b64 = req.file.buffer.toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        // Upload the image to Cloudinary
        const cldRes = await handleUpload(dataURI);
        profilePhoto=cldRes.url;
      }
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).send({ success: false, message: "User Already Exist" });
        }



        // Create new user instance
        user = new User({
            userId,
            username,
            password,
            name,
            age,
            gender,
            profilePhoto,
            interestedIn,
            email,
            phone
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to the database
        await user.save();

        // If registration is successful, also log in the user
        const token = jwt.sign({ id: user._id , password: user.password }, process.env.JWT_SECRET, { expiresIn: '3d' });
        res.cookie('authToken', token, {
            maxAge: 3 * 24 * 60 * 60 * 1000, // Expires in 3 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag based on environment
            sameSite: 'strict' // Set SameSite attribute
        });

        res.send({ success: true, message: "User Registered" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const logout = async (req, res) => {
    res.clearCookie('authToken');
    res.json({ success: true, data: {} });
}

module.exports = {
    login,
    register,
    logout
};
