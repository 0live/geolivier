import App from "@/App";
import { AboutView } from "@/features/about";
import { BlogIndex, BlogPost, BlogPostsService } from "@/features/blog";
import { HomeView } from "@/features/home";
import { ProjectPost, ProjectsIndex, ProjectsService } from "@/features/projects";
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
        children: [
          { index: true, element: <ProjectsIndex />, loader: () => ProjectsService.fetchAll() },
          { 
            path: ":slug", 
            element: <ProjectPost />,
            loader: ({ params }) => ProjectsService.getComponent(params.slug!) 
          },
        ],
      },
      {
        path: "blog",
        children: [
          { index: true, element: <BlogIndex />, loader: () => BlogPostsService.fetchAll() },
          { 
            path: ":slug", 
            element: <BlogPost />,
            loader: ({ params }) => BlogPostsService.getComponent(params.slug!) 
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
