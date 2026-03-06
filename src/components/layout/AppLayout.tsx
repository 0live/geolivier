import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background selection:bg-primary/10">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
