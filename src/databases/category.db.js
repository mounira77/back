import execQuery from "./init.db.js"
const selectAll = async() => {
    const sql = `
        SELECT  id_category,name,designation
        FROM categories
        ORDER BY name
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
const insertOne = async(designation, name) => {
    const sql = `
     insert into categories (designation,name) values(?,?)
    `;

    let error = null;
    let result = null;

    try {
        result = await execQuery(sql, [designation, name]);
    }
    catch (e) {
        error = e.message;
    }
    finally {
        return { error, result };
    }
};

const updateOne = async(designation, name, id_category) => {

    const sql = `update categories
    set designation = ?, name = ?
    WHERE id_category= ?`
    const result = null;
    const error = null;

    try {

        result = await execQuery(sql, [designation, name, id_category])
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
const deleteOne = async(id_category) => {
    const result = null;
    const error = null;
    const request = `
        DELETE FROM categories WHERE id_category = ? `
    try {
        result = await execQuery(request, [id_category])
        console.log(result)
    }
    catch (e) {
        error = e.message
    }
    finally {
        return { error, result }
    }

}
export const CategoryDB = { selectAll, deleteOne, updateOne, insertOne };
