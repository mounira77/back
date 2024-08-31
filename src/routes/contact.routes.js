import express from "express";
import jwt from "../middlewares/jwt.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";

import { contactController } from "../controllers/contact.controller.js";
//rajouter les middelwares
export const initContactRoutes = (app) => {


    const router = express.Router();

    router.post("/", jwt, contactController.contactCreate);
    router.get("/message", jwt, checkAdmin, contactController.messageAll);



    app.use("/contact", router);
};

export default initContactRoutes;
