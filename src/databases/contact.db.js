import execQuery from "./init.db.js"
const insertOne = async(message, id_user) => {
    const sql = `
     insert into contacts (message,id_user) values(?,?)
    `;

    let error = null;
    let result = null;

    try {
        result = await execQuery(sql, [message, id_user]);
    }
    catch (e) {
        error = e.message;
    }
    finally {
        return { error, result };
    }
};

//getAll
const getAll = async(message, id_user) => {
    const sql = `
  select users.email,users.pseudo,contacts.message,contacts.id_message,contacts.date_create from users join contacts on users.id_user=contacts.id_user order by date_create
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
export const ContactsDB = { insertOne, getAll };
