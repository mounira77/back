import { FavorisDB } from "../databases/favoris.db.js"




const favorisAll = async(req, res) => {


    const { error, result } = await FavorisDB.selectAll();





    if (error) {
        return res.status(404).json({ message: "Request empty", error: error });

    }
    return res.status(200).json({ message: `request ok`, favorite: result });

};


const favorisCreate = async(req, res) => {
    const { id_recipe, id_user } = req.body;

    const { error, result } = await FavorisDB.insertOne(id_recipe, id_user);





    if (error) {
        return res.status(404).json({ message: "Request empty", error: error });

    }
    return res.status(200).json({ message: `request ok`, favorite: result });

};







const favorisDelete = async(req, res) => {

    const { id_user, id_recipe } = req.params;


    const response = await FavorisDB.deleteOne(id_user, id_recipe);

    console.log(response);

    let error = response.error;

    if (error) {

        return res.status(500).json({ message: error });

    }
    else {

        return res.status(200).json({ message: "Favorite deleted" });

    }

};

export const FavorisController = {

    favorisCreate,
    favorisDelete,
    favorisAll,
};
