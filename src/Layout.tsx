import type { ReactNode } from "react";
import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/Footer";


interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen min-w-screen p-0 m-0 flex flex-col">
      <Navbar />

      <main className="flex-grow p-4 md:p-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}