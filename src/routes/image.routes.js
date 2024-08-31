import express from "express";
import jwt from "../middlewares/jwt.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import { imageController } from "../controllers/image.controller.js";
//rajouter les middelwares
const initimageRoutes = (app) => {


    const router = express.Router();

    router.get("/", imageController.imageAll);
    router.get("/:url_image", imageController.imageOne);
    router.post("/create", imageController.imageCreate);
    router.patch("/Id", jwt, checkAdmin, imageController.imageUpdate);
    router.delete("/:imageId", jwt, checkAdmin, imageController.imageDelete);


    app.use("/uploads", router);
};

export default initimageRoutes;
