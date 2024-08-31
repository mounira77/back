import { RecipeDB } from "../databases/recipe.db.js"
import { mkdir } from "node:fs/promises";
import formidable from "formidable";
import path from "path"




const recipeCreate = async(req, res) => {
    const userId = req.body.userId;
    console.log("la valeur de",
        userId)
    // console.log(req.body, ".body")
    /*if (!title || !designation || !tags || !nbr_pieces || !id_category || !id_user || ! referenceImg
    || !reference ||
        !ingredients || !steps) {
        return res.status(403).json({ message: "invalid informations" });

    }*/

    // await mkdir("./src/assets");
    //await mkdir("./uploads");

    const form = formidable({
        uploadDir: "./uploads",
        keepExtensions: true,
        createDirsFromUploads: true,

        //tester le type de fichier envoyé
        filter: (opts) => {
            const { name, mimetype, originalFilename } = opts;
            if ((mimetype !== "image/png") && (mimetype !== "image/jpeg") && (mimetype !== "image/jpg")) return false;
            return true;
        },
    });

    let files = null;
    let fields = null;

    try {
        [fields, files] = await form.parse(req);
        // console.dir("fields", fields);
        //console.log("files", files);

    }
    catch (e) {
        // console.log("err =>", e.message);
    }

    // console.log("fields", fields);
    //console.log("files", files);

    if (!files.recipeImg) return res.json({ message: "Files not ok" });
    ///***********************$


    const {
        title,
        designation,
        tags,
        nbr_pieces,
        id_category,
        // id_user,
        referenceImg,
        reference,
        ingredients,
        steps,
        alt,

    } = fields;
    //console.log(ingredients, "ingredients")
    const recipe = {
        title: title[0],
        designation: designation[0],
        tags: tags[0],
        nbr_pieces: nbr_pieces[0],

        id_category: id_category[0],
        //: id_user[0],
        referenceImg: referenceImg[0],
        reference: reference[0],
        ingredients: JSON.parse(ingredients[0]),

        steps: JSON.parse(steps[0]),
        alt: alt[0],
    };

    const nameFile = ((files.recipeImg[0].filepath).slice(files.recipeImg[0].filepath.indexOf("uplaods")))


    const fileRecipeImage = {
        filePath: files.recipeImg[0].newFilename,
        // filePath: (files.recipeImg[0].filepath).slice(files.recipeImg[0].filepath.indexOf("uplaods")),
        //avoir avec filePath
        //const s = filePath.join(assets,'/')


        mimeType: files.recipeImg[0].mimetype,
        size: files.recipeImg[0].size,


        originalName: files.recipeImg[0].originalFilename,

    }

    //***********


    const response = await RecipeDB.create(recipe.title, recipe.designation, recipe.tags, recipe.nbr_pieces, recipe.id_category,
        userId, recipe.reference, recipe.ingredients, recipe.steps, fileRecipeImage.filePath, fileRecipeImage.size, fileRecipeImage.mimeType, recipe.referenceImg, recipe.alt);

    if (!response) {
        return res.status(404).json({ message: " request empty" });

    }

    if (response.error) {
        return res.status(404).json({ message: "error request", error: response.error });

    }
    return res.status(200).json({
        message: " request ok",
        recipe: recipe,
        file: fileRecipeImage
    });

}



// selectionnet toutes les recettes
//****************************************************************************
const recipeAll = async(req, res) => {

    const { error, result } = await RecipeDB.readAll();



    if (error) {
        return res.status(404).json({ message: "Request empty", error: error });

    }
    return res.status(200).json({ message: `request ok`, recipe: result });

}; // fin de la fonction  recipeAll 



// supprimer une recette dans la table recipe 

const deleteOne = async(req, res) => {
    const recipeId = req.params.recipeId;



    const response = await RecipeDB.deleteRecipe(recipeId);

    const error = response.error; // soit string soit null

    if (error) {
        return res.status(500).json({ message: error });
    }
    else {
        return res.status(200).json({ message: "recipe deleted" });
    }
};

/*update recipe*/

const updateRecipe = async(req, res) => {

    const { title, designation, tags, nbr_pieces, reference, recipeId } = req.body
    console.log("le contenu de req .body", req.body)



    const response = await RecipeDB.updateRecipe(title, designation, tags, nbr_pieces, reference, recipeId);

    console.log(response)

    if (response.error) {
        return res.status(500).json({ message: response.error });
    }

    return res
        .status(200)

        .json({
            message: `Recipe number ${recipeId} has been edited`

        });
};

//***********************$update steps recipe
const updateSteps = async(req, res) => {

    const { designation, time, id_step, id_recipe } = req.body
    console.log("le contenu de req .body", req.body)



    const response = await RecipeDB.updateRecipeSteps(designation, time, id_step, id_recipe);

    console.log(response)

    if (response.error) {
        return res.status(500).json({ message: response.error });
    }

    return res
        .status(200)

        .json({
            message: `Recipe number ${id_recipe} has been edited`

        });
};
///*****************************updat eingrdient recipe

const updateingredients = async(req, res) => {

    const { quantite, id_ingredient, id_recipe } = req.body
    console.log("le contenu de req .body", req.body)



    const response = await RecipeDB.updateRecipeIngredients(parseInt(quantite), id_recipe, id_ingredient);

    console.log("ingredient", response)

    if (response.error) {
        return res.status(500).json({ message: response.error });
    }

    return res
        .status(200)

        .json({
            message: `Recipe number ${id_recipe} has been edited`

        });
};
const recipeCreate___ = async(req, res) => {
    console.log("reeeeeddddddddddddd", req.body)

    const { title, designation, tags, nbr_pieces, id_category, id_user, referenceImg, reference, ingredients, steps } = req.body;
    // console.log(req.body, ".body")
    if (!title || !designation || !tags || !nbr_pieces || !id_category || !id_user || !referenceImg ||
        !reference ||
        !ingredients || !steps) {
        return res.status(403).json({ message: "invalid informations" });

    }

    /*Remplir la table intermediaire ingredients_recipes*/


    const response = await RecipeDB.create(title, designation, tags, nbr_pieces, id_category,
        id_user, reference, ingredients, steps);



    if (!response) {
        return res.status(404).json({ message: " request empty" });

    }

    if (response.error) {
        return res.status(404).json({ message: "error request", error: response.error });

    }

    return res.status(200).json({ message: " request ok", });

} //fin de recipeCreate
export const recipeController = {
    recipeAll,
    recipeCreate,
    deleteOne,
    updateRecipe,
    updateSteps,
    updateingredients
}
