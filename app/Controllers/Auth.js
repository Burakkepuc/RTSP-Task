import AuthService from '../Services/Auth.js'
import AuthValidation from '../Validations/Auth.js';
class AuthController {
  static async register(req, res) {
    try {
      const validateRegister = await AuthValidation.validateRegister(req);
			
			if (!validateRegister.type){
	 			return res.json({type: false, message: validateRegister.message});
			}
      const result = await AuthService.register(req);
      res.json(result);
    } catch (error) {
      res.json({type: false, message: error.message});
    }
  }

  static async login(req, res) {
    try {
         const validateLogin = await AuthValidation.validateLogin(req);
			
			if (!validateLogin.type){
	 			return res.json({type: false, message: validateLogin.message});
			}
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
