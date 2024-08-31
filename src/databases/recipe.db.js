import execQuery from "./init.db.js"
import { ImageDb } from "./image.db.js"
import { CommentDb } from "./comment.db.js"
import { CategoryDB } from "./category.db.js"
import { FavorisDB } from "./favoris.db.js"


// select pour recupérer la table du fron users situé dans recipe.reducer.jsx 
const readAll = async() => {
  const sql = `
       SELECT DISTINCT recipes.id_recipe,recipes.designation as desRecipe, recipes.reference as reference, recipes.tags as tags, recipes.title as title,recipes.nbr_pieces as nbrPieces,recipes.id_category as category,recipes.id_user as userId,ingredients.id_ingredient as idIngr, ingredients.Name as ingrdients, ingredients.unit as unite,ingredients_recipes.quantite as quantite ,steps.id_step as idStep,steps.designation as steps, steps.ordre as ordre,steps.time as time,images.url_image as nameImage,images.alt as alt,images.reference as referenceImg  from recipes
         inner JOIN ingredients_recipes ON ingredients_recipes.id_recipe = recipes.id_recipe
         inner JOIN ingredients ON ingredients_recipes.id_ingredient = ingredients.id_ingredient
         inner  join recipes_steps on recipes_steps.id_recipe=recipes.id_recipe
         inner  join steps on recipes_steps.id_step=steps.id_step
         inner  join images on images.id_recipe=recipes.id_recipe
         ORDER BY title
         
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


// function pour inserer un ingrédient

const insertIngredient = async(ingredient) => {

  const sql = `
     insert into ingredients_recipes (id_ingredient,id_recipe,quantite ,groupe) values(?,?,?,?)
    `;

  let error = null;
  let result = null;

  try {
    //
    const response = []

    for (const ingredientLigne of ingredient) {
      console.log(ingredientLigne)

      result = await execQuery(sql, [ingredientLigne.id_ingredient, ingredientLigne.id_recipe,
        ingredientLigne.quantite, ingredientLigne.groupe
      ]);


      // console.log(result)
      // console.log("result")
      response.push(result)
    }


  }
  catch (e) {
    error = e.message;
  }
  finally {
    return { error, result };
  }
};




let arrayIdStep = [];

// function pour inserer une step
const insertStep = async(step) => {

  const sql = `
     insert into steps (time,designation,ordre) values(?,?,?)
    `;

  let error = null;
  let result = null;
  // let response = []

  try {
    //

    const responseIdStep = []
    for (const stepsLigne of step) {

      result = await execQuery(sql, [stepsLigne.time, stepsLigne.designation, stepsLigne.order]);
      responseIdStep.push(result)

    }

    arrayIdStep = responseIdStep.map((ligne) => {

      return { id_step: ligne.insertId };


    })

  }
  catch (e) {
    error = e.message;
  }
  finally {
    return { error, result };
  }
};

//fonction pour remlir la table recette
const insertrecipe = async(title, designation, tags, nbr_pieces, id_category, id_user, reference) => {

  const recipeSql = `
   INSERT INTO recipes( title, designation, tags, nbr_pieces, id_category, id_user, reference) VALUES (?,?,?,?,?,?,?)
  `;
  let error = null;
  let result = null;

  try {

    result = await execQuery(recipeSql, [title, designation, tags, nbr_pieces, id_category, id_user, reference]);




  }
  catch (e) {
    error = e.message;
  }
  finally { return { error, result }; }
};


//************************************************Create*********************/
////  fonction principal fait appel a insertIngredient,insertSteps,insertRecipe;insertImage

const create = async(title, designation, tags, nbr_pieces, id_category, id_user, reference,
  ingredients, steps, url_image, size_image, type_image, referenceImg, alt) => {


  let error = null;
  let result = null;


  try {
    const response = await insertrecipe(title, designation, tags, nbr_pieces, id_category,
      id_user, reference)


    const recipeId = response.result.insertId;

    const ingredient = ingredients.map((e) => {

      return {

        id_ingredient: e.id_ingredient,
        id_recipe: recipeId,
        quantite: e.quantite,
        groupe: e.groupe,
      }

    })



    const resultIngredient = await insertIngredient(ingredient);
    console.log("ingredient")
    console.log(resultIngredient, "ingredient")

    const step = steps.map((e) => {

      return {

        order: e.order,
        // id_recipe: recipeId,
        time: e.time,
        designation: e.designation,

      }

    })
    //c'est ici ou je dois boucler pour inserer mes lignes

    const resulstep = await insertStep(step);

    const recipeStepSql = 'insert into recipes_steps (id_recipe,id_step) values(?,?)'
    console.log(recipeStepSql, "tabe id_recip")

    for (const recipeStep of arrayIdStep) {

      console.log(recipeStep, "step")

      result = await execQuery(recipeStepSql, [recipeId, recipeStep.id_step])


    }

    ///////////
    //inserer l'image
    const imageResult = await ImageDb.insertOne(url_image, size_image, type_image, recipeId, referenceImg, alt)
    console.log("image")
    console.log(imageResult)

  }
  catch (e) {
    error = e.message;
  }
  finally {


    return { error, result };

  };
}




const deleteRecipe = async(recipeId) => {
  const sql = `
      DELETE FROM recipes
      WHERE id_recipe = ?
  `;

  const recipeSql = `
      DELETE FROM ingredients_recipes
      WHERE id_recipe= ?
  `;



  const selectSteps = 'select id_step from recipes_steps where id_recipe = ?'

  const stepRecipe = await execQuery(selectSteps, [recipeId]) //recuperer les idstep avant supression
  console.log(stepRecipe)

  const recipestepSql = 'DELETE FROM recipes_steps where id_recipe=?';

  console.log("how are you")

  const stepSql =
    `
      DELETE FROM steps
      WHERE id_step=?
                
  `;




  let error = null;
  let result = null;


  try {
    //await execQuery(commentSql, [recipeId]); //supprimer coment
    await CategoryDB.deleteOne(recipeId)
    await execQuery(recipeSql, [recipeId]); //ingredients_recipes

    await CommentDb.deleteOne(recipeId) //comment
    await FavorisDB.deleteOneRecipe(recipeId) //favoris
    await execQuery(recipestepSql, [recipeId]); //recipes_steps


    await execQuery(recipestepSql, [recipeId]); //recipes_steps
    // await execQuery(stepSql, [recipeId]);//steps
    //suprimer les id_step qui sond dans stepRecipe
    for (const value of stepRecipe) {


      console.log("mon stepe", value.id_step)

      await execQuery(stepSql, [value.id_step])

    }
    console.log("ok")
    await

    await ImageDb.deleteOne(recipeId); //image
    //

    result = await execQuery(sql, [recipeId]); //recipe
  }
  catch (e) {
    error = e.message;
  }
  finally {
    return { result, error };
  }
};

//*************************Update recipe et ingredients_recipes*******************/
//**********************************************************************************
/*const checkUserAndArticle = async (articleId, userId) => {
  const articleSql = `SELECT article_id, user_id FROM articles WHERE article_id = ?`;

  const articleResult = await query(articleSql, [articleId]);
  const articleErr = articleResult.error;
  if (articleErr) {
    throw new Error(articleErr);
  }

  console.log(articleResult);
  const article = articleResult[0];

  if (article.user_id !== userId) {
    throw new Error(
      `User with id ${userId} is not the creator of article with id ${articleId}`
    );
  }
};*/


const updateRecipe = async(title, designation, tags, nbr_pieces, reference, recipeId) => {



  const sql = `
 UPDATE recipes SET title=?,designation=?,tags=?,nbr_pieces=?,reference=?
      WHERE id_recipe= ?
  `;

  let error = null;
  let result = null;


  try {
    // await checkUserAndArticle(articleId, userId);
    result = await execQuery(sql, [title, designation, tags, nbr_pieces, reference, recipeId]);







  }
  catch (e) {
    error = e.message;
  }
  finally {
    return { error, result };
  }
};

/*update la table ingredients_recipes*/
const updateRecipeIngredients = async(quantite, id_recipe, id_ingredient) => {


  const sql = `
 UPDATE ingredients_recipes SET quantite=?
      WHERE id_recipe= ? and id_ingredient=?
   
  `;

  let error = null;
  let result = null;

  try {
    //

    result = await execQuery(sql, [quantite, id_recipe, id_ingredient]);


  }
  catch (e) {
    error = e.message;
  }
  finally {
    return { error, result };
  }
};

////////////
const updateRecipeSteps = async(designation, time, id_step, id_recipe) => {


  const sql = `

  UPDATE steps
SET designation = ?,time=?
WHERE id_step = ?
AND id_step IN (SELECT id_step FROM recipes_steps WHERE id_recipe =?);
  `;

  let error = null;
  let result = null;

  try {




    result = await execQuery(sql, [designation, time, id_step, id_recipe]);









  }
  catch (e) {
    error = e.message;
  }
  finally {
    return { error, result };
  }
};

export const RecipeDB = { readAll, create, insertIngredient, deleteRecipe, updateRecipe, insertStep, updateRecipeIngredients, updateRecipeSteps };
