import App from "@/App";
import { AboutView } from "@/features/about";
import { HomeView } from "@/features/home";
import { WipView } from "@/features/wip";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "projects",
        element: <WipView />,
      },
      {
        path: "blog",
        element: <WipView />,
      },
      {
        path: "about",
        element: <AboutView />,
      }
    ]
  }
]);
