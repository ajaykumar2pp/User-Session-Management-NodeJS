const UserInfo = require('../models/user-info.model')
const moment = require('moment');

// User Account Info
exports.userInfo = async(req,res)=>{
    const sessions = await UserInfo.find({ userId: req.session.userId });
    // console.log(sessions)
    res.render('pages/userInfo', { sessions })
}
