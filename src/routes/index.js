import Login from './../components/Login';
import Test from './../components/Test';
import Recipes from './../components/Recipes';

var indexRoutes = [
  { path: "/login", name: "Login", component: Login },
  { path: "/test", name: "Test", component: Test },
  { path: "/recipes", name: "Recipes", component: Recipes }
];

export default indexRoutes;
