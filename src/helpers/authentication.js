import jwt from 'jsonwebtoken';

const validateUser = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;

  if (token) {
    token = token.slice(7, token.length);

    jwt.verify(token, req.app.get('secretKey'), (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          message: 'Token is not valid',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Auth token is not supplied',
    });
  }
};

export default validateUser;
