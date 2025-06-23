import type { ReactNode } from "react";
import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import LoginForm from './LoginForm' 


interface LayoutProps {
  children?: ReactNode; // Hacer children opcional
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-r from-[#f5f5f5] to-gray-200">
      <Toaster richColors />
      <Navbar />
      <main className='pt-3 h-full w-full'>
        <Outlet />
      </main>
      <Footer />

    </div>
  );
}