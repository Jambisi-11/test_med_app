

// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const { body, validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const UserSchema = require('../models/User');
// const Profile = require('../models/Profile'); // Import the Profile model
// const dotenv = require('dotenv');

// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET || 'thisiscodeformediclapplicationwhichisbuiltinreactappproject';

// // Route 1: Register a new user - POST: http://localhost:8181/api/auth/register
// router.post('/register', [
//     body('email', "Please enter a valid email").isEmail(),
//     body('name', "Username should be at least 4 characters").isLength({ min: 4 }),
//     body('password', "Password should be at least 8 characters").isLength({ min: 8 }),
//     body('phone', "Phone number should be 10 digits").isLength({ min: 10 }),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         // Check if user already exists
//         const existingUser = await UserSchema.findOne({ email: req.body.email });
//         if (existingUser) {
//             return res.status(400).json({ error: "A user with this email already exists" });
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);

//         // Create new user
//         const newUser = await UserSchema.create({
//             email: req.body.email,
//             name: req.body.name,
//             password: hashedPassword,
//             phone: req.body.phone,
//             createdAt: Date(),
//         });

//         console.log('New user created:', newUser); // Debugging log

//         // Check if profile already exists
//         const existingProfile = await Profile.findOne({ email: req.body.email });
//         if (existingProfile) {
//             return res.status(400).json({ error: "A profile with this email already exists" });
//         }

//         // Create a profile record for the new user
//         const newProfile = await Profile.create({
//             userId: newUser._id, // Link profile to the user
//             name: newUser.name,
//             email: newUser.email,
//             phone: newUser.phone,
//         });

//         console.log('New profile created:', newProfile); // Debugging log

//         // Generate JWT token
//         const payload = {
//             user: {
//                 id: newUser.id,
//             },
//         };
//         const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
//         res.json({ authtoken });

//     } catch (error) {
//         console.error('Error during registration:', error.message); // Debugging log
//         res.status(500).json({ error: "Failed to create profile. Please update your profile later.", details: error.message });
//     }
// });

// // Route 2: User login - POST: http://localhost:8181/api/auth/login
// router.post('/login', [
//     body('email', "Please enter a valid email").isEmail(),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const { email, password } = req.body;

//         // Find user by email
//         const user = await UserSchema.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ error: "Invalid credentials" });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: "Invalid credentials" });
//         }

//         // Generate JWT token
//         const payload = {
//             user: {
//                 id: user.id,
//             },
//         };
//         const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

//         // Return token AND user name
//         res.json({
//             authtoken,
//             name: user.name,
//         });

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: "Internal Server Error", details: error.message });
//     }
// });

// // Route 3: Update user details - PUT: http://localhost:8181/api/auth/update
// router.put('/update', [
//     body('name', "Username should be at least 4 characters").isLength({ min: 4 }),
//     body('phone', "Phone number should be 10 digits").isLength({ min: 10 }),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const { name, phone } = req.body;
//         const email = req.headers.email;

//         if (!email) {
//             return res.status(400).json({ error: "Email not found in the request headers" });
//         }

//         // Find and update user
//         const user = await UserSchema.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         user.name = name;
//         user.phone = phone;
//         user.updatedAt = Date();
//         await user.save();

//         // Find and update profile
//         const profile = await Profile.findOne({ email });
//         if (profile) {
//             profile.name = name;
//             profile.phone = phone;
//             profile.updatedAt = Date();
//             await profile.save();
//         }

//         // Generate JWT token
//         const payload = {
//             user: {
//                 id: user.id,
//             },
//         };
//         const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
//         res.json({ authtoken });

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: "Internal Server Error", details: error.message });
//     }
// });

// // Route 4: Fetch user data - GET: http://localhost:8181/api/auth/user
// router.get('/user', async (req, res) => {
//     try {
//         const email = req.headers.email;

//         if (!email) {
//             return res.status(400).json({ error: "Email not found in the request headers" });
//         }

//         const user = await UserSchema.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // Fetch profile data
//         const profile = await Profile.findOne({ email: user.email });

//         // Combine user and profile data
//         const userDetails = {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             role: user.role,
//             createdAt: user.createdAt,
//             updatedAt: user.updatedAt,
//             profile: profile || null, // Include profile data (or null if not found)
//         };

//         res.json(userDetails);

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: "Internal Server Error", details: error.message });
//     }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/User');
const Profile = require('../models/Profile'); // Import Profile model
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'thisiscodeformediclapplicationwhichisbuiltinreactappproject';

// Helper function to validate request and return errors
const validateRequest = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};

// Route 1: Register a new user - POST: /api/auth/register
router.post('/register', [
    body('email', "Please enter a valid email").isEmail(),
    body('name', "Username should be at least 4 characters").isLength({ min: 4 }),
    body('password', "Password should be at least 8 characters").isLength({ min: 8 }),
    body('phone', "Phone number should be 10 digits").isLength({ min: 10 }),
    body('role', "Role is required").notEmpty(),
], async (req, res) => {
    validateRequest(req, res); // Validate request

    try {
        const { email, name, password, phone, role } = req.body;

        // Check if user already exists
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "A user with this email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await UserSchema.create({
            email,
            name,
            password: hashedPassword,
            phone,
            role,
        });

        console.log('New user created:', newUser);

        // Create Profile for the user
        const newProfile = await Profile.create({
            userId: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
        });

        console.log('New profile created:', newProfile);

        // Generate JWT token
        const payload = { user: { id: newUser.id } };
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ authtoken, user: newUser });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// Route 2: User login - POST: /api/auth/login
router.post('/login', [
    body('email', "Please enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    validateRequest(req, res); // Validate request

    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const payload = { user: { id: user.id } };
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ authtoken, name: user.name, role: user.role });

    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// Route 3: Update user details - PUT: /api/auth/update
router.put('/update', [
    body('name', "Username should be at least 4 characters").isLength({ min: 4 }),
    body('phone', "Phone number should be 10 digits").isLength({ min: 10 }),
], async (req, res) => {
    validateRequest(req, res); // Validate request

    try {
        const { name, phone, role } = req.body; // ✅ Get role from request
        const email = req.headers.email;

        if (!email) {
            return res.status(400).json({ error: "Email not found in the request headers" });
        }

        // Find and update user
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.name = name;
        user.phone = phone;
        user.role = role || user.role; // ✅ Ensure role is always present
        await user.save();

        // Find and update profile (if exists)
        const profile = await Profile.findOne({ email });
        if (profile) {
            profile.name = name;
            profile.phone = phone;
            await profile.save();
        }

        // Generate new JWT token
        const payload = { user: { id: user.id, role: user.role } }; // ✅ Include role in JWT
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ authtoken, name: user.name, phone: user.phone, role: user.role }); // ✅ Return updated user details

    } catch (error) {
        console.error('Update error:', error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});


// Route 4: Fetch user data - GET: /api/auth/user
router.get('/user', async (req, res) => {
    try {
        const email = req.headers.email;

        if (!email) {
            return res.status(400).json({ error: "Email not found in the request headers" });
        }

        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Fetch profile data
        const profile = await Profile.findOne({ email: user.email });

        const userDetails = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            profile: profile || null,
        };

        res.json(userDetails);

    } catch (error) {
        console.error('Fetch user error:', error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

module.exports = router;