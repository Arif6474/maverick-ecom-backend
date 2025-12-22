import { Router } from "express";
import { loginUser } from "#controllers/userControllers/userController.js";

const publicRoutes = Router();

// Re-using user login for now as employee login was removed
publicRoutes.post('/login', loginUser);

export default publicRoutes;
