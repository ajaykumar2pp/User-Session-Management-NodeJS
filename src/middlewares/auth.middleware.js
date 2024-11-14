const User = require('../models/user.model')

exports.isVerifiedUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }

    const user = await User.findById(req.session.userId);
    if (!user || !user.isVerified) {
        return res.status(403).send("Access Denied: Email verification required.");
    }

    next();
};