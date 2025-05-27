import type { ReactNode } from "react";
import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";


interface LayoutProps {
  children?: ReactNode; // Hacer children opcional
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#E6E6FC' }}>
      <Toaster richColors />

      <Navbar />
      <main className="flex-grow p-4   md:p-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}