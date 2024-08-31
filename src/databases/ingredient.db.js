//a adapter

import execQuery from "./init.db.js"


const selectAll = async() => {
    const sql = `
        SELECT  id_ingredient,name,unit
        FROM ingredients
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


const insertOne = async(unit, name) => {
    const sql = `
     insert into ingredients (unit,name) values(?,?)
    `;

    let error = null;
    let result = null;

    try {

        result = await execQuery(sql, [unit, name]);
    }
    catch (e) {
        error = e.message;
    }
    finally {
        return { error, result };
    }
};

const updateOne = async(unit, name, id_ingredient) => {


    const sql = `update ingredients
    set unit = ?, name = ?
    WHERE id_ingredient= ?`
    const result = null;
    const error = null;

    try {

        result = await execQuery(sql, [unit, name, id_ingredient])
        if (result.affectedRows !== 1) throw new Error("nothing updated")
    }
    catch (e) {
        error = e.message
    }
    finally {
        return { error, result }
    }

}
const deleteOne = async(name) => {
    console.log(name)

    const request = `
    
        DELETE FROM ingredients WHERE name = ? `

    const result = null;
    const error = null;

    try {
        result = await execQuery(request, [name])
        console.log("result", result)
    }
    catch (e) {
        console.log("error")
        error = e.message
    }
    finally {
        return { error, result }
    }

}
export const IngredientDB = { selectAll, deleteOne, updateOne, insertOne };
