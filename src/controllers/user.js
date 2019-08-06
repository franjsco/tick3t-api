
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '../models/user';


export const authenticate = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: 'Parameters invalid',
    });
    return;
  }

  userModel.findOne({ email }, (err, user) => {
    if (err) {
      next(err);
    }

    if (user) {
      if (bcrypt.compareSync(password, user.password || 0)) {
        const token = jwt.sign({ email }, req.app.get('secretKey'), {
          expiresIn: '1h',
        });

        res.json({
          success: true,
          message: 'Auth OK',
          data: {
            name: user.name,
            token,
          },
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Invalid email/password',
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email/password',
      });
    }
  });
};


export const changePassword = (req, res, next) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    res.status(400).json({
      success: false,
      message: 'Parameters invalid',
    });
    return;
  }

  const encryptedPassword = bcrypt.hashSync(newPassword, 10);

  const pass = {
    password: encryptedPassword,
  };

  userModel.findOneAndUpdate({}, pass, { new: true }, (err, user) => {
    if (err) {
      next(err);
    }

    res.json({
      status: 'success',
      message: 'Password updated',
    });
  });
};
