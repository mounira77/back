import execQuery from "./init.db.js"

const userAll = async() => {
    const sql = `
        SELECT  id_user,email,pseudo,role
        FROM users
        ORDER BY pseudo
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


//getone
const selectOne = async(id_user) => {
    const sql = `
        SELECT  email,pseudo
        FROM users
        where id_user=?
    `;

    let error = null;
    let result = null;

    try {
        result = await execQuery(sql, [id_user]);
    }
    catch (e) {
        error = e.message;
    }
    finally {
        return { error, result };
    }
};



const create = async(email, password, pseudo, role = "user") => {
    const sql = `INSERT INTO users (email, password, pseudo,role)
    VALUES (?, ?, ?,?)`;

    let error = null;
    let result = null;

    try {
        // le resultat sera un objet avec diverses infos
        // car ici nous avons un INSERT
        result = await execQuery(sql, [email, password, pseudo, role]);
    }
    catch (e) {
        error = e.message;
    }
    finally {
        return { error, result };
    }
};
const signin = async(email) => {
    // faire une recherche par mail=identificateur
    // selectionner le id pour le token
    const request = `select 
    id_user,
    email,
    password
    from 
    users
    where email=?`
    let result = null;
    let error = null;
    try {
        result = await execQuery(request, [email])
    }
    catch (e) {
        error = e.message
    }
    finally

    {
        return { result, error }
    }



}

const readOne = async(userId) => {

    const request =
        `SELECT *

        FROM
    users
    where
    id_user = ?`
    let result = null;
    let error = null;
    try {
        result = await execQuery(request, [userId])
    }
    catch (e) {
        error = e.message
    }
    finally

    {
        return { result, error }
    }



}



export const UserDB = { create, signin, readOne, userAll };
