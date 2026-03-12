import App from "@/app/App";
import i18n from "@/app/config/i18n";
import { AboutView } from "@/features/about";
import { BlogIndex, BlogPost, BlogPostsService } from "@/features/blog";
import { HomeView } from "@/features/home";
import { ProjectPost, ProjectsIndex, ProjectsService } from "@/features/projects";
import { ErrorView } from "@/shared/components/layout/ErrorView";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "projects",
        children: [
          { index: true, element: <ProjectsIndex />, loader: () => ProjectsService.fetchAll(i18n.language || "en") },
          { 
            path: ":slug", 
            element: <ProjectPost />,
            loader: ({ params }) => ProjectsService.getComponent(params.slug!, i18n.language || "en") 
          },
        ],
      },
      {
        path: "blog",
        children: [
          { index: true, element: <BlogIndex />, loader: () => BlogPostsService.fetchAll(i18n.language || "en") },
          { 
            path: ":slug", 
            element: <BlogPost />,
            loader: ({ params }) => BlogPostsService.getComponent(params.slug!, i18n.language || "en") 
          },
        ],
      },
      {
        path: "about",
        element: <AboutView />,
      },
    ],
  },
]);
