import express from "express";
import recipeFile from "../middlewares/recipe.mdlwr.js";
import jwt from "../middlewares/jwt.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import { recipeController } from "../controllers/recipe.controller.js";
//rajouter les middelwares
const initrecipeRoutes = (app) => {


    const router = express.Router();

    router.get("/", recipeController.recipeAll);

    router.post("/create", jwt, checkAdmin, recipeController.recipeCreate);

    router.delete("/:recipeId", recipeController.deleteOne);
    router.put("/update", jwt, checkAdmin, recipeController.updateRecipe);
    router.put("/updateStep", jwt, checkAdmin, recipeController.updateSteps);
    router.put("/updateIngredient", jwt, checkAdmin, recipeController.updateingredients);


    // router.post("/create", jwt, checkAdmin, categoryController.categoryCreate);
    //router.patch("/Id", jwt, checkAdmin, categoryController.categoryUpdate);
    //router.delete("/:categoryId", jwt, checkAdmin, categoryController.categoryDelete);


    app.use("/recipe", router);
};

export default initrecipeRoutes;
