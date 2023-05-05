const { getTokenFromHeader } = require('../utils/getTokenFromHeader.js');
const HttpError = require('../utils/httpError.js');
const { verifyToken } = require('../utils/verifyToken.js');

exports.isLoggedIn = (req, res, next) => {
  //get token from header
  const token = getTokenFromHeader(req);
  //verify the token
  const decodedUser = verifyToken(token);

  if (!decodedUser) {
    throw new HttpError(401, 'Invalid/Expired token, please login again');
  } else {
    //save the user into req obj
    req.userAuthId = decodedUser?.id;
    next();
  }
};
