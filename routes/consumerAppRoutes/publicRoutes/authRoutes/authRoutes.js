import { loginUser, registerUser, forgotPassword, resetPassword ,getEmailFromToken, loginWithGoogle} from '#controllers/userControllers/userController.js';
import { Router } from 'express'

const authRoutes = Router()

authRoutes.post('/login', loginUser);
authRoutes.post('/register', registerUser);
authRoutes.post('/forgotPassword', forgotPassword);
authRoutes.patch('/resetPassword', resetPassword);
authRoutes.get('/getEmailFromToken/:token', getEmailFromToken)
authRoutes.post('/loginWithGoogle', loginWithGoogle); 

export default authRoutes