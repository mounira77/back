import isEmail from "validator/lib/isEmail.js";
import isStrongPassword from "validator/lib/isEmail.js";
import { UserDB } from "../databases/user.db.js";
import { jwtSign, jwtVerify } from "../middlewares/jwt.mdlwr.js";
import { stringIsFilled } from "../utils/string.utils.js";
import { hashPass, compareHash } from "../utils/crypto.utils.js";
const jwtOptions = { expiresIn: `28800000` }; // 8h

// si la valeur booleenne de process.env.JWT_SECRET est false alors
// secret vaudra "T0P_S3CRet" sinon secret vaudra la valeur du fichier .env

const secret = process.env.JWT_SECRET || "T0P_S3CRet"

// selection de tous le s utilisateurs
const userAll = async(req, res) => {

    const { error, result } = await UserDB.userAll();


    if (error) {
        return res.status(404).json({ message: "Request empty", error: error });

    }
    return res.status(200).json({ message: `request ok`, user: result });

};


//Crée un utilisateur
const create_user = async(req, res) => {

    const { email, password, pseudo, role } = req.body;

    //console.log(email)
    // tester si l'email est bien un mail ....@gg.fr et non vide

    if (!email || !isEmail(email)) {

        return res.status(403).json({ message: `Invalid email !` });
    }


    // appeller la foction de hashage situe  dans /utils en lui affectant le mot de passe recuperer depuis selevt
    const hashResult = await hashPass(password);

    // recuperer si il ya une erreur 
    // en ashe le mot de passe avant de l'enregistrer
    const hashError = hashResult.error;
    if (hashError) {
        return res.status(500).json({ message: hashError });
    }

    // appler la fonction d'insertion pour creer le compte utilisateur
    const response = await UserDB.create(email, hashResult.hashed, pseudo, role);
    console.log(response, "gsfhgsfghsdgdh")
    const responseError = response.error;



    //tester s'il ya une erreur
    if (responseError) {
        return res.status(500).json({ message: responseError });
    }


    const userId = response.result.insertId;

    return res.status(200).json({ message: "User created", user: { email, pseudo, role: "user", userId } });
};

/////////////////////////$*******************************************
//**********authentification
////////////////////////$*******************************************
const signIn = async(req, res) => {
    const { email, password } = req.body;
    console.log("email", email)

    if (!email || !isEmail(email)) {
        return res.status(403).json({ message: `Invalid email` });
    }

    if (!stringIsFilled(password)) {
        return res.status(403).json({ message: `Invalid password` });
    }

    const response = await UserDB.signin(email);

    const responseErr = response.error;
    if (responseErr) {
        return res.status(500).json({ message: responseErr });
    }

    const result = response.result; // []console.log(result, "jujukikl")
    //console.log(result)

    //on recupere l'id vue que les resultat [id,pseudo,mail]
    const user = result[0];


    if (!user) {
        return res.status(401).json({ message: `Authentication failed` });
    }

    const userId = user.id_user;
    console.log(userId)
    const dbPassword = user.password;
    //comparer le passe word avec sel envoyer par l'utilisateur
    const passAreSame = await compareHash(password, dbPassword);
    if (!passAreSame) {
        return res.status(401).json({ message: `Authentication failed` });
    }
    //pour obtenir le token il faut passer userId comme parametre a la fonction jwtsign()
    const token = jwtSign(userId, secret, jwtOptions);

    return res
        .status(200)
        .json({ message: `sign_in_ok`, user: { userId, email, token } });
};


//checkToken*** Refresh
const checkToken = async(req, res) => {

    const token = req.headers.authorization;


    const userId = jwtVerify(token);

    console.log(userId)

    if (!userId) return res.status(401).json({ message: "Invalid Token" });


    return res
        .status(200)
        .json({ message: `token`, user: { userId } });

};


export const UserController = {
    create_user,
    signIn,

    checkToken,
    userAll,
};
