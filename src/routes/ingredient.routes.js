import express from "express";
import jwt from "../middlewares/jwt.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import { ingredientController } from "../controllers/ingredient.controller.js";
//rajouter les middelwares
const initIngredientRoutes = (app) => {


    const router = express.Router();

    router.get("/", ingredientController.ingredientAll);
    router.post("/create", jwt, checkAdmin, ingredientController.ingredientCreate);
    router.post("/insert", jwt, checkAdmin, ingredientController.ingredientOne);

    // router.put("/:Id", jwt, checkAdmin, ingredientController.ingredientUpdate);
    router.put("/update", jwt, checkAdmin, ingredientController.ingredientUpdate);
    router.delete("/delete/:name", jwt, checkAdmin, ingredientController.ingredientDelete);


    app.use("/ingredient", router);
};

export default initIngredientRoutes;
