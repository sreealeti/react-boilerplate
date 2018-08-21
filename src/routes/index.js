import Home from './../components/Home';
import Login from './../components/Login';
import NavBar from './../components/NavBar';

var indexRoutes = [
  { path: "/login", name: "Login", component: Login },
  { path: "/navbar", name: "Navbar", component: NavBar },
  { path: "/", name: "Home", component: Home }
];

export default indexRoutes;
