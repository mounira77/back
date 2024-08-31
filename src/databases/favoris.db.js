import execQuery from "./init.db.js"
const selectAll = async() => {
    const sql = `   
   select recipes.title,recipes.id_recipe,favorites.id_user from recipes join favorites on recipes.id_recipe=favorites.id_recipe
    `;

    let error = null;
    let result = null;

    try {
        result = await execQuery(sql);
    }
    catch (e) {
        error = e.message;
    }
    finally {
        return { error, result };
    }
};


//select one
//une autre fonction pour boucler et extraire les designation et name
const insertOne = async(id_recipe, id_user) => {
    const sql = `
     insert into favorites (id_recipe,id_user) values(?,?)
    `;

    let error = null;
    let result = null;

    try {
        result = await execQuery(sql, [id_recipe, id_user]);
    }
    catch (e) {
        error = e.message;
    }
    finally {
        return { error, result };
    }
};
//delete when you delete recipe
const deleteOneRecipe = async(id_recipe) => {
    const result = null;
    const error = null;
    const request = `
        DELETE FROM favorites WHERE id_recipe= ? `
    try {
        result = await execQuery(request, [id_recipe])
        console.log(result)
    }
    catch (e) {
        error = e.message
    }
    finally {
        return { error, result }
    }

}
///

const deleteOne = async(id_user) => {
    const result = null;
    const error = null;
    const request = `
        DELETE FROM favorites WHERE id_user= ? `
    try {
        result = await execQuery(request, [id_user])
        console.log(result)
    }
    catch (e) {
        error = e.message
    }
    finally {
        return { error, result }
    }

}


export const FavorisDB = { deleteOne, insertOne, selectAll, deleteOneRecipe };
