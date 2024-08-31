import express from "express";
import jwt from "../middlewares/jwt.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import { categoryController } from "../controllers/category.controller.js";
//rajouter les middelwares
const initCategoryRoutes = (app) => {


    const router = express.Router();

    router.get("/", categoryController.categoryAll);
    router.post("/create", jwt, checkAdmin, categoryController.categoryCreate);
    router.patch("/Id", jwt, checkAdmin, categoryController.categoryUpdate);
    router.delete("/:categoryId", jwt, checkAdmin, categoryController.categoryDelete);


    app.use("/category", router);
};

export default initCategoryRoutes;
