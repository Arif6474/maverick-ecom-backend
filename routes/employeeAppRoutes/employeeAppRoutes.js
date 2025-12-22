import { Router } from "express";
import protectedRoutes from "./protectedRoutes/protectedRoutes.js";
import publicRoutes from "./publicRoutes/publicRoutes.js";
import { protectForUser } from "#middlewares/authMiddleware.js";

const employeeAppRoutes = Router();

employeeAppRoutes.use('/public', publicRoutes);
// Using protectForUser for now as protectForEmployee was removed. 
// This allows authenticated users (likely admins) to access these routes.
employeeAppRoutes.use('/protected', protectForUser, protectedRoutes);

export default employeeAppRoutes;
