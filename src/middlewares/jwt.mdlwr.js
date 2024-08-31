import { UserDB } from "../databases/user.db.js";

import jwt from "jsonwebtoken";

const jwtOptions = { expiresIn: `28800000` }; // 8h

// si la valeur booleenne de process.env.JWT_SECRET est false alors
// secret vaudra "T0P_S3CRet" sinon secret vaudra la valeur du fichier .env

const secret = process.env.JWT_SECRET || "T0P_S3CRet";

// si process.env.JWT_SECRET est null ou undefined alors
// secret vaudra "T0P_S3CRet" sinon secret vaudra la valeur du fichier .env
// const secret = process.env.JWT_SECRET ?? "T0P_S3CRet";

const jwtMdlwr = async(req, res, next) => {
  // recupere le token du header

  const token = req.headers.authorization;

  //verifier le token si  ok
  const userId = jwtVerify(token);

  //si pas le bon token le token retourne ce message d'erreur sinon

  if (!userId) return res.status(401).json({ message: "Invalid Token" });
  // if (userId) return res.status(200).json({ message: "valide Token" ,user:userId});
  //envoyer le user id pour le body de la prochaine middelwares
  const result = await UserDB.readOne(userId)
  req.body.userId = userId;
  console.log(userId, "user")
  console.log("result", result)

  next();
};

export const jwtVerify = (token) => {
  try {
    //verifier si si le bon token avec la fonction jwt.verify
    // en recuperant le token

    const decoded = jwt.verify(token, secret);

    const userId = decoded.data;
    return userId;
  }
  catch (err) {
    console.error(`jwt.mdlwr.js - jwtVerify - error => `, err.message);
    return null;
  }
};
//pour créer un jeton JWT (JSON Web Token) basé sur ces données. Le JWT est signé à l'aide d'une clé secrète et d'options supplémentaires fournies dans jwtOptions.
export const jwtSign = (data) => jwt.sign({ data }, secret, jwtOptions);
// payload = { data: userId }

export default jwtMdlwr;
