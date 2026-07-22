import { Outlet } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { PageTransition } from "../components/layout/PageTransition";

export function MainLayout() {
  return (
    <>
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
