import express from "express";
import initRoutes from "./routes/init.routes.js";
import initMiddlewares from "./middlewares/init.mdlwr.js";

const app = express();
const PORT = process.env.PORT || 9000;

initMiddlewares(app);
initRoutes(app);

app.get("/", (req, res) => res.send("ok"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/*const file = document.getElementById("gg");
const files = file.files
console.log(file)
const pp = document.getElementById("pp");
file.addEventListener("change", () => {

    const name = file.files[0].name;
    console.log(name)
    const size = file.files[0].size;
    console.log(size)

    const type = file.files[0].type;
    console.log(type)
    const date = file.files[0].lastModifiedDate;
    console.log(date)

    const info = name + " " + size + " " + type + " " + date;
    alert(file)
});*/
