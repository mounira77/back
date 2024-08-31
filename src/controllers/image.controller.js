import { ImageDb } from "../databases/image.db.js"
import fs from "fs"
const imageOne = async(req, res) => {
    const url_image = req.params.url_image;
    console.log(url_image)

    const { error, result } = await ImageDb.selectOne(url_image);
    /* const fileName = "/uploads" + result.url_image
     const resultImage = await fs.readFile(fileName, (err, imageData) => {
         console.log(resultImage)
         if (err) {
             return res.status(404).json({ message: "on peut pas lire le fichier " });

         }

         return res.end(resultImage.imageData);
     })*/
 /*const imageName = req.params.url_image;
    // Logic to retrieve and send the image file
    res.sendFile(__dirname, 'uploads/', imageName);*/



    if (error) {
        return res.status(404).json({ message: "Request empty", error: error });

    }
    return res.status(200).json({ message: `request ok`, image: result });

};


//
const imageAll = async(req, res) => {

    const { error, result } = await ImageDb.selectAll();


    if (error) {
        return res.status(404).json({ message: "Request empty", error: error });

    }
    return res.status(200).json({ message: `request ok`, image: result });

};


//create image

const imageCreate = async(req, res) => {

    const { url_image, size_image, type_image, id_recipe, reference } = req.body;



    /* if (!name || !designation) {
        return res.status(403).json({ message: "invalid informations" });

    }
*/





    const response = await ImageDb.insertOne(url_image, size_image, type_image, id_recipe, reference);




    if (!response) { return res.status(404).json({ message: " request empty" }); }

    if (response.error) {

        return res.status(404).json({ message: "error request", error: response.error });

    }

    return res.status(200).json({ message: " request ok", imageId: response.insertId });
}


const imageUpdate = async(req, res) => {

    const { url_image, size_image, type_image, reference, id_image } = req.body;

    const response = await ImageDb.updateOne(url_image, size_image, type_image, reference);


    if (response.error) {

        return res.status(500).json({ message: response.error });
    }

    return res.status(200).json({ message: `image number ${id_image} has been edited` });
};



const imageDelete = async(req, res) => {

    const id_image = req.params.imageId;

    const response = await ImageDb.deleteOne(id_image);

    console.log(response);

    let error = response.error;

    if (error) {

        return res.status(500).json({ message: error });

    }
    else {

        return res.status(200).json({ message: "image deleted" });

    }

};

export const imageController = {
    imageOne,
    imageAll,
    imageCreate,
    imageUpdate,
    imageDelete
};
