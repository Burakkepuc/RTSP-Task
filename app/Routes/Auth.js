import express from 'express';
import AuthController from '../Controllers/Auth';
const app = express();

app.post('/register', AuthController.register);
app.post('/login', AuthController.login);
app.get('/logout', AuthController.logout);
export default app;
