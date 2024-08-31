import { mkdir } from "node:fs/promises";
import formidable from "formidable";

const recipeFile = async(req, res, next) => {
    // await mkdir("./src/assets");
    const form = formidable({
        uploadDir: "./src/assets",
        keepExtensions: true,
        createDirsFromUploads: true,
        filter: (opts) => {
            const { name, mimetype, originalFilename } = opts;
            if (mimetype !== "image/png") return false;
            return true;
        },
    });

    let files = null;
    let fields = null;

    try {
        [fields, files] = await form.parse(req);
        console.log("fields", fields);
        console.log("files", files);

    }
    catch (e) {
        console.log("err =>", err.message);
    }

    console.log("fields", fields);
    console.log("files", files);

    if (!files.recipeImageImg) return res.json({ message: "Files not ok" });
    ///***********************$


    const {
        title,
        designation,
        tags,
        nbr_pieces,
        id_category,
        id_user,
        url_recip,
        reference,
        ingredients,
        steps
    } = fields;

    const recipe = {
        title: title[0],
        designation: designation[0],
        tags: tags[0],
        nbr_pieces: nbr_pieces[0],
        id_category: id_category[0],
        id_user: id_user[0],
        url_recipe: url_recip[0],
        url_reference: reference[0],
        ingredients: ingredients[0],
        steps: steps[0]
    };

    req.body.userId = recipe;

    next();
    return res.json({ message: recipe });
}
export default recipeFile;
