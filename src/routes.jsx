import { HomeIcon } from "@heroicons/react/24/solid";

import { Home } from "./pages/inicio";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "inicio",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "inicio",
        path: "/",
        element: <Home />,
      },
    ],
  },
];

export default routes;
