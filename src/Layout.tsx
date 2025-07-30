import type { ReactNode } from "react";
import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/sidebar"
import LoginForm from './LoginForm'

interface LayoutProps {
  children?: ReactNode; // Hacer children opcional
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className=" w-full flex flex-col bg-gradient-to-r from-[#f5f5f5] to-gray-200">
      <Toaster richColors />
      <Navbar/>

      <SidebarProvider className='fixed top-16 bg-gray-100 w-screen' defaultOpen={false} style={{
        // @ts-expect-error: Allow custom CSS variables
        "--sidebar-width": "30rem",
        "--sidebar-width-mobile": "30rem",
      }}>

        <Sidebar />

        <main className='pt-3 h-full w-full bg-gray-100'>
          <Outlet/>
        </main>
      </SidebarProvider>

    </div>
  );
}