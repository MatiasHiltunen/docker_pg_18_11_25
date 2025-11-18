import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/account", "routes/account.tsx"),
    route("/todos", "routes/todos.tsx")
] satisfies RouteConfig;
