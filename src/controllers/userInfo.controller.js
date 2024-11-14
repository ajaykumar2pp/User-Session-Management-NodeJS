const UserInfo = require('../models/user-info.model')
const User = require('../models/user.model')

// Dashboard Page GET METHOD
exports.dashboardPage = (req, res) => {
    res.render('pages/dashboard')
}

// User Account Info
exports.userInfo = async(req,res)=>{
    try {
        //  session information
        const sessions = await UserInfo.find({ userId: req.session.userId }).sort({ lastActiveOn: -1 });
        
        //  session userId
        const user = await User.findOne({ _id: req.session.userId });
        
        res.render('pages/userInfo', {
          sessions,
          username: user ? user.username : 'Guest'  
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
}
