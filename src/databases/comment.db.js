import execQuery from "./init.db.js"

const commentCreate = async(comment, userId, recipeId) => {
    const sql = `
        INSERT INTO comments ( comment, id_user, id_recipe)
        VALUES (?, ?, ?)
    `;

    let error = null;
    let result = null;

    try {
        result = await execQuery(sql, [comment, userId, recipeId]);
    }
    catch (e) {
        error = e.message;
    }
    finally {
        return { error, result };
    }
};


const commentSelectAll = async(recipeId) => {
    const sql = `
       select  users.pseudo,users.id_user, comments.id_recipe,comments.comment,comments.date_comment from users join comments on comments.id_user= users.id_user    where  id_recipe =?
    `;

    let error = null;
    let result = null;

    try {
        result = await execQuery(sql, [recipeId]);
    }
    catch (e) {
        error = e.message;
    }
    finally {
        return { error, result };
    }
};



const updateOne = async(comment, userId, recipeId) => {

    /* const sql = `update comments
     set comment = ? where id_user= ? and id_recipe=? and date_comment=?
     `*/
    const sql = `update comments
    set comment = ? where id_user= ? and id_recipe=? 
    `
    const result = null;
    const error = null;

    try {

        result = await execQuery(sql, [comment, userId, recipeId])
        if (result.affectedRows !== 1) throw new Error("nothing updated")
    }
    catch (e) {
        error = e.message
    }
    finally {
        console.log(result)
        return { error, result }
    }

}
const deleteOne = async(recipeId) => {
    const result = null;
    const error = null;
    const request = `
        DELETE FROM comments WHERE id_recipe= ?  `
    try {
        result = await execQuery(request, [recipeId])
        console.log(result)
    }
    catch (e) {
        error = e.message
    }
    finally {
        return { error, result }
    }

}
export const CommentDb = { commentSelectAll, deleteOne, updateOne, commentCreate };
