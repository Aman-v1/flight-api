const User = require('../Models/userModel');
const HttpError = require('../utils/httpError');

exports.isAdmin = async (req, res, next) => {
  //find the login user
  const user = await User.findById(req.userAuthId);
  //check if admin
  if (user?.role === 'admin') {
    next();
  } else {
    const error = new HttpError(403, 'Access denied, admin only');
    next(error);
  }
};
