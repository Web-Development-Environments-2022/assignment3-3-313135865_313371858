import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavoriteRecipes"),
  },
  {
    path: "/personal",
    name: "personal",
    component: () => import("./pages/PersonalRecipes"),
  },
  {
    path: "/dbrecipes",
    name: "dbrecipes",
    component: () => import("./pages/DatabaseRecipes"),
  },
  {
    path: "/family",
    name: "family",
    component: () => import("./pages/FamilyRecipes"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/About"),
  },
  {
    path: "/modal",
    name: "modal",
    component: () => import("./components/Modal"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
