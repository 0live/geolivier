import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header/Header";

export function AppLayout() {
  return (
    <div className="relative flex min-h-screen w-full flex-col selection:bg-primary/10">
      <div className="fixed inset-0 -z-10 bg-app-image bg-cover bg-center bg-no-repeat opacity-20 transition-colors duration-300" />
      <Header />
      <main className="flex flex-1 flex-col items-center p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
