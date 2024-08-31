import { ContactsDB } from "../databases/contact.db.js";

const contactCreate = async(req, res) => {

    const { message, userId } = req.body;

    console.log(req.body)


    const response = await ContactsDB.insertOne(message, userId);




    if (!response) { return res.status(404).json({ message: " request empty" }); }

    if (response.error) {

        return res.status(404).json({ message: "error request", error: response.error });

    }

    return res.status(200).json({ message: " request ok", imageId: response.insertId });
}



//get all
const messageAll = async(req, res) => {

    const { error, result } = await ContactsDB.getAll();


    if (error) {
        return res.status(404).json({ message: "Request empty", error: error });

    }
    return res.status(200).json({ message: `request ok`, messages: result });

};
export const contactController = {


    contactCreate,
    messageAll,

};
