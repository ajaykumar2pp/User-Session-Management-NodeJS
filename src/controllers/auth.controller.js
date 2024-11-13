const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const moment = require('moment');

//  Register Page GET METHOD
exports.registerPage = (req, res) => {
    res.render('auth/register')
}

// Login Page GET METHOD
exports.loginPage = (req, res) => {
    res.render('auth/login')
}

// Dashboard Page GET METHOD
exports.dashboardPage = (req, res) => {
    res.render('pages/dashboard')
}


// Register POST METHOD
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    if (!username || !email || !password) {
        req.flash('error', 'All fields are required');
        req.flash('username', username);
        req.flash('email', email);
        return res.redirect('/');
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash('error', 'Email already taken');
            req.flash('username', username);
            req.flash('email', email);
            return res.redirect('/');
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
            date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        });

        // Remove the password field before sending the response
        const user= newUser.toObject();
        delete user.password;

        // res.status(201).json({ data: { user: userWithoutPassword } });
        console.log(user);
        res.redirect("/login");
        
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'Please try again');
        return res.redirect('/');
    }
};

// Login POST METHOD
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
        req.flash('error', 'All fields are required');
        req.flash('email', email);
        return res.redirect('/login');
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            req.flash('error', 'No account found with this email');
            return res.redirect('/login');
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error', 'Incorrect password');
            return res.redirect('/login');
        }

        // Store user session details
        req.session.userId = user._id;
   
        // Redirect to the dashboard 
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error logging in:', error);
        req.flash('error', 'Please try again');
        return res.redirect('/login');
    }
};