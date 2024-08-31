import query from "../databases/init.db.js";

const checkAdmin = async(req, res, next) => {
  const userId = req.body.userId;
  console.log(userId)

  const userSql = `
    SELECT id_user, role
    FROM users
    WHERE id_user = ?
  `;

  const userRes = await query(userSql, [userId]);
  console.log("jwtmid", userRes)
  const user = userRes[0];
  const role = user.role;

  if (role !== "admin") {
    return res
      .status(401)
      .json({ message: `t'es pas l'admin` });
  }

  next();
};

export default checkAdmin;
