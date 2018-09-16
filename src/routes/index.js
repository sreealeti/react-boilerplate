import Login from './../components/Login';
import Test from './../components/Test';
import Recipes from './../components/recipes/Recipes';
import RecipeEdit from './../components/recipes/RecipeEdit';
import RecipeShow from './../components/recipes/RecipeShow';
import RecipeNew from './../components/recipes/RecipeNew';

var indexRoutes = [
  { path: "/login", name: "Login", component: Login },
  { path: "/test", name: "Test", component: Test },

  { path: "/recipes/new", name: "RecipeNew", component: RecipeNew },
  { path: "/recipes/:id/edit", name: "RecipeEdit", component: RecipeEdit },
  { path: "/recipes/:id", name: "RecipeShow", component: RecipeShow },
  { path: "/recipes/", name: "Recipes", component: Recipes }
];

export default indexRoutes;
