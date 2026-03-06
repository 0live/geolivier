import App from "@/App";
import { AboutView } from "@/features/about";
import { WipView } from "@/features/wip";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <WipView />,
      },
      {
        path: "about",
        element: <AboutView />,
      }
    ]
  }
]);
