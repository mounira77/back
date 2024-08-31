import express from "express";
import jwt from "../middlewares/jwt.mdlwr.js";
import { CommentController } from "../controllers/comment.controller.js";
//rajouter les middelwares
export const initCommentRoutes = (app) => {


    const router = express.Router();

    router.get("/:id_recipe", CommentController.commentAll);
    router.post("/create", jwt, CommentController.commentCreate);
    router.put("/update", jwt, CommentController.commentUpdate);
    router.delete("/delete/:id", jwt, CommentController.commentDelete);



    app.use("/comment", router);
};

export default initCommentRoutes;
