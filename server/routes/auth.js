import express from "express";
import { login , updateProfilePicture } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);

router.put(":userId/profile-picture" , updateProfilePicture )

export default router;

//register doesnt have a route because it is not a route it is an entry point once u r in yiu can then log in after that open your profile all these other things need routes