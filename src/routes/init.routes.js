import initUserRoutes from "./user.routes.js";
import initCategoryRoutes from "./category.routes.js";
import initrecipeRoutes from "./recipe.routes.js";
import initIngredientRoutes from "./ingredient.routes.js";
import initRecipeRoutes from "./comment.routes.js";
import initimageRoutes from "./image.routes.js";
import initContactRoutes from "./contact.routes.js";
import initCommentRoutes from "./comment.routes.js";
import initfavorisRoutes from "./favorite.routes.js";


const initRoutes = (app) => {
  initUserRoutes(app);
  initCategoryRoutes(app)
  initrecipeRoutes(app)
  initCommentRoutes(app);
  initIngredientRoutes(app);
  initRecipeRoutes(app);
  initimageRoutes(app);
  initContactRoutes(app);
  initfavorisRoutes(app)
};

export default initRoutes;
