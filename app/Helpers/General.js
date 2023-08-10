import express from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

class General {
  static generateToken(user) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role_id: user.role_id,
      },
      'TokenSecretKey',
      {
        expiresIn: '180d',
      }
    );
    return token;
  }

  static async verifyToken(req, res, next) {
    try {
      const token = req.session.token;
      if (!token) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }

      const decoded = jwt.verify(token, 'TokenSecretKey');
      req.session.userData = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: error.message,
      });
    }
  }
}

export default General;
