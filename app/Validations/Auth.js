import Joi from 'joi';

class AuthValidation{

  static async validateRegister(req){
		const {body} = req;
		try {
			const registerSchema = Joi.object({
				name: Joi.string().min(3).required(),
				surname: Joi.string().min(3).required(),
				email: Joi.string().email().required(),
				password: Joi.string().min(6).required(),
			});

			const {error} = registerSchema.validate(body);
			if (error){
				return {type: false, message: error.details[0].message};
			}
			else {
				return {type: true};
			}
		}
		catch (error){
			return {type: false, message: error.message};
		}
	}

	static async validateLogin(req){
		const {body} = req;
		try {
			const loginSchema = Joi.object({
				email: Joi.string().email().required(),
				password: Joi.string().min(6).required()
			});

			const {error} = loginSchema.validate(body);
			if (error){
				return {type: false, message: error.details[0].message};
			}
			else {
				return {type: true};
			}
		}
		catch (error) {
			return {type: false, message: error.message};
		}
  
	}

}

export default AuthValidation;