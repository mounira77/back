import { CommentDb } from "../databases/comment.db.js";



const commentAll = async(req, res) => {
    const recipeId = req.params.id_recipe;


    const { error, result } = await CommentDb.commentSelectAll(recipeId);



    if (error) {
        return res.status(404).json({ message: "Request empty", error: error });

    }
    return res.status(200).json({ message: `request ok`, comment: result });

};


//create comment

const commentCreate = async(req, res) => {

    const { comment, userId, recipeId } = req.body;
    console.log("body", req.body)

    const response = await CommentDb.commentCreate(comment, userId, recipeId);


    if (!response) { return res.status(404).json({ message: " request empty" }); }

    if (response.error) {

        return res.status(404).json({ message: "error request", error: response.error });

    }

    return res.status(200).json({ message: " request ok", commentId: response.insertId });
}

//update
const commentUpdate = async(req, res) => {

    const { comment, id_user, id_recipe } = req.body;

    console.log(req.body)



    const response = await CommentDb.updateOne(comment, id_user, id_recipe);

    console.log(response)
    if (response.error) {

        return res.status(500).json({ message: response.error });
    }

    return res.status(200).json({ message: `comment number 
        ${id_recipe } and ${ id_user }  has been edited` });
};



const commentDelete = async(req, res) => {

    const id_comment = req.params.commentId;

    const response = await CommentDb.deleteOne(id_comment);

    console.log(response);

    let error = response.error;

    if (error) {

        return res.status(500).json({ message: error });

    }
    else {

        return res.status(200).json({ message: "comment deleted" });

    }

};

export const CommentController = {

    commentAll,
    commentCreate,
    commentUpdate,
    commentDelete
};
