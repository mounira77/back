import execQuery from "./init.db.js"


//selectionner one
const selectOne = async(url_image) => {
    const sql = ` SELECT id_image, url_image, size_image,alt, id_recipe, reference FROM  images where 
    url_image = ?`;

    let error = null;
    let result = null;

    try {
        result = await execQuery(sql, url_image);


    }
    catch (e) {
        error = e.message;
    }
    finally {
        return { error, result };
    }
};
//selectionner plusieurs
const selectAll = async() => {
    const sql = `
         SELECT images.url_image as path ,images.alt as alt ,images.id_recipe as recipeId,recipes.title as titre FROM images join recipes on images.id_recipe=recipes.id_recipe
         order by titre
         LIMIT 10
        
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



const insertOne = async(url_image, size_image, type_image, id_recipe, reference, alt) => {
    const sql = `
     INSERT INTO images  (url_image, size_image, type_image, id_recipe, reference,alt) values(?,?,?,?,?,?)
    `;

    let error = null;
    let result = null;

    try {
        result = await execQuery(sql, [url_image, size_image, type_image, id_recipe, reference, alt]);
    }
    catch (e) {
        error = e.message;
    }
    finally {
        return { error, result };
    }
};

const updateOne = async(url_image, size_image, type_image, reference, alt) => {

    const sql = `update images
    set  url_image=?, size_image=?,type_image=?, reference=?,alt=?
    WHERE id_image= ?`
    const result = null;
    const error = null;

    try {

        result = await execQuery(sql, [url_image, size_image, type_image, reference, alt])
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
const deleteOne = async(id_recipe) => {
    const result = null;
    const error = null;
    const request = ` 
       DELETE FROM images WHERE id_recipe = ? 
        `


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
export const ImageDb = { selectOne, selectAll, deleteOne, updateOne, insertOne };
