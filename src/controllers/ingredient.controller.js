import { IngredientDB } from "../databases/ingredient.db.js"

const ingredientAll = async(req, res) => {

    const { error, result } = await IngredientDB.selectAll();





    if (error) {
        return res.status(404).json({ message: "Request empty", error: error });

    }
    return res.status(200).json({ message: `request ok`, ingredient: result });

};
//insert one
const ingredientOne = async(req, res) => {
    const { unit, name } = req.body;
    console.log("cc", req.body)

    const { error, result } = await IngredientDB.insertOne(unit, name, );





    if (error) {
        return res.status(404).json({ message: "Request empty", error: error });

    }
    return res.status(200).json({ message: `request ok`, ingredient: result });

};


//create ingredient apartir d'un tableau 

const ingredientCreate = async(req, res) => {

    const { ingredient } = req.body;



    /* if (!name || !designation) {
        return res.status(403).json({ message: "invalid informations" });

    }
*/

    const response = []

    for (const ingredientLigne of ingredient) {

        const ingredientL = await IngredientDB.insertOne(ingredientLigne.unit, ingredientLigne.name);
        console.log(ingredientL)
        response.push(ingredientL)
    }


    if (!response) { return res.status(404).json({ message: " request empty" }); }

    if (response.error) {

        return res.status(404).json({ message: "error request", error: response.error });

    }

    return res.status(200).json({ message: " request ok", ingredientId: response.insertId });
}


const ingredientUpdate = async(req, res) => {

    const { unit, name, id_ingredient } = req.body;


    const response = await IngredientDB.updateOne(unit, name, id_ingredient);


    if (response.error) {

        return res.status(500).json({ message: response.error });
    }

    return res.status(200).json({ message: `Ingredient number ${id_ingredient} has been edited` });
};


//supprimer un ingredient
const ingredientDelete = async(req, res) => {

    const name = req.params;
    console.log("name", name)

    const response = await IngredientDB.deleteOne(name.name);

    console.log(response);

    let error = response.error;

    if (error) {

        return res.status(500).json({ message: error });

    }
    else {

        return res.status(200).json({ message: "Ingredient deleted" });

    }

};

export const ingredientController = {

    ingredientAll,
    ingredientCreate,
    ingredientUpdate,
    ingredientDelete,
    ingredientOne,
};
