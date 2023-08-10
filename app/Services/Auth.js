import db from '../../src/models/index';
import md5 from 'md5';
import General from '../Helpers/General';


class AuthService {
  static async register(req) {
    try {
      const {email, name, surname, password} = req.body;
      const person = await db.Users.findOne({where: {email: email}});
      if (person) {
        return {type: false, message: 'User already exists'};
      }
      const saltKey = 'burasienvyegomulcek';
      const encryptedPassword = md5(md5(password) + saltKey);

      const user = await db.Users.create({
        name,
        surname,
        email,
        role: 'user',
        password: encryptedPassword,
      });

      return {type: true, message: 'User created successfully', data: user};
    } catch (error) {
      return {type: false, message: error.message};
    }
  }

  static async login(req) {
    try {
      const {email, password} = req.body;

      const saltKey = 'burasienvyegomulcek';
      const encryptedPassword = md5(md5(password) + saltKey);

      const user = await db.Users.findOne({
        where: {email: email, password: encryptedPassword},
      });
      if (!user) return {type: false, message: 'User not found'};

      const token = General.generateToken({
        id: user.id,
        email: user.email,
      });
      req.session.user_id = user.id;
      req.session.token = token;

      await db.UserLogs.create({
        user_id: user.id,
        date: new Date(),
        is_userloggedin:true,
      });


      return {type: true, message: 'Login successful'};
    } catch (error) {
      return {type: false, message: error.message};
    }
  }

  static async logout(req) {
    try {
      req.session.destroy();
      return {type: true, message: 'Logout successful'};
    } catch (error) {
      return {type: false, message: error.message};
    }
  }
}

export default AuthService;
