import AuthWrapper from "./views/layouts/AuthWrapper";
import Home from "./views/pages/Home";
import Login from "./views/pages/Login";

const allRoutesMapper = [
  {
    path: "/",
    component: (
      <AuthWrapper roles={["admin"]}>
        <Home />
      </AuthWrapper>
    ),
  },
  {
    path: "/login",
    component: <Login />,
  },

  //   {
  //     path: '*',
  //     component: <NotFound />,
  //   },
];

export default allRoutesMapper;
