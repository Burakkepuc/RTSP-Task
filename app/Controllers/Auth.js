import AuthService from '../Services/AuthService.js';

class AuthController {
  static async register(req, res) {
    try {
      const result = await AuthService.register(req);
      res.json(result);
    } catch (error) {
      res.json({type: false, message: error.message});
    }
  }

  static async login(req, res) {
    try {
      const result = await AuthService.login(req);
      res.json(result);
    } catch (error) {
      res.json({type: false, message: error.message});
    }
  }

  static async logout(req, res) {
    try {
      const result = await AuthService.logout(req);
      res.json(result);
    } catch (error) {
      res.json({type: false, message: error.message});
    }
  }
}

export default AuthController;
