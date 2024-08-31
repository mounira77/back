import { CategoryDB } from "../databases/category.db.js"
const categoryAll = async(req, res) => {

    const { error, result } = await CategoryDB.selectAll();


    if (error) {
        return res.status(404).json({ message: "Request empty", error: error });

    }
    return res.status(200).json({ message: `request ok`, category: result });

};


//create category

const categoryCreate = async(req, res) => {

    const { category } = req.body;

    console.log(category, 'aaaaaa')

    /* if (!name || !designation) {
        return res.status(403).json({ message: "invalid informations" });

    }
*/

    const response = []

    for (const categoryLigne of category) {

        const categoryL = await CategoryDB.insertOne(categoryLigne.designation, categoryLigne.name);

        response.push(categoryL)
    }


    if (!response) { return res.status(404).json({ message: " request empty" }); }

    if (response.error) {

        return res.status(404).json({ message: "error request", error: response.error });

    }

    return res.status(200).json({ message: " request ok", categoryId: response.insertId });
}


const categoryUpdate = async(req, res) => {

    const { designation, name, id_category } = req.body;

    const response = await CategoryDB.updateOne(designation, name, id_category);


    if (response.error) {

        return res.status(500).json({ message: response.error });
    }

    return res.status(200).json({ message: `Category number ${id_category} has been edited` });
};



const categoryDelete = async(req, res) => {

    const id_category = req.params.categoryId;

    const response = await CategoryDB.deleteOne(id_category);

    console.log(response);

    let error = response.error;

    if (error) {

        return res.status(500).json({ message: error });

    }
    else {

        return res.status(200).json({ message: "category deleted" });

    }

};

export const categoryController = {

    categoryAll,
    categoryCreate,
    categoryUpdate,
    categoryDelete
};
