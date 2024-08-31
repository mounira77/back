import express from "express";
import { UserController } from "../controllers/user.controller.js";
import jwt from "../middlewares/jwt.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";

const initUserRoutes = (app) => {
    const router = express.Router();

    router.post("/", UserController.create_user);
    router.post("/sign-in", UserController.signIn);
    // router.put("/forgot-password", UserController.forgotPassword);
    router.get("/checkToken", UserController.checkToken);
    //router.get("/all", UserController.checkToken);
    router.get("/user", UserController.userAll);



    app.use("/users", router);
};

export default initUserRoutes;
