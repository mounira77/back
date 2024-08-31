import express from "express";
import jwt from "../middlewares/jwt.mdlwr.js";

import { FavorisController } from "../controllers/favoris.controller.js";

const initfavorisRoutes = (app) => {


    const router = express.Router();

    router.get("/", FavorisController.favorisAll);
    router.post("/create", jwt, FavorisController.favorisCreate);
    router.delete("/delete", jwt, FavorisController.favorisDelete);




    app.use("/favorite", router);
};

export default initfavorisRoutes;
