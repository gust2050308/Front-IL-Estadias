import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem
} from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { SidebarTrigger } from "@/components/ui/sidebar"


export function AppSidebar() {
    /*  const {
          state,
          open,
          setOpen,
          openMobile,
          setOpenMobile,
          isMobile,
          toggleSidebar,
      } = useSidebar()*/

    return (
        <div className='p-0 m-0'>
            <Sidebar
                variant="sidebar"
                collapsible="icon"
                className="sidebar-custom"
            >

                <div className='bg-gradient-to-b from-blue-800 to-blue-600 w-full h-full'>
                    <SidebarHeader>
                        <SidebarTrigger className='' />

                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className='px-8' >
                                            <svg xmlns="http://www.w3.org/2000/svg" className='text-white hover:text-black' width={24} height={24} viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M18.14 16.7c-.91 1.51-2.06 1.03-3.14.39s-2.1-1.41-2.75-.5c-.71.78-.16 2.03.12 3.13c.28 1.11.3 2.07-1.47 2.28c-1.4-.19-1.32-1.35-1.09-2.58s.59-2.53-.31-2.99c-.72-.48-1.22.35-1.85 1.17c-.65.81-1.39 1.6-2.61 1.02c-1.1-.91-.68-1.44-.1-2.12s1.33-1.59.9-3.19c-.18-.65-1.08-.5-1.97-.52c-.87-.02-1.75-.2-1.84-1.5c-.07-.79.52-1.11 1.13-1.36c.62-.25 1.25-.43 1.26-1.06c.03-.61-.38-1.04-.64-1.49s-.37-.92.25-1.62c1.05-.86 1.89-.13 2.73.66s1.67 1.62 2.7.97c.82-.54.07-1.49-.51-2.42s-.99-1.82.51-2.23c1.3-.36 1.8.53 2.25 1.56c.46 1.03.86 2.2 1.96 2.41c1.57.29 2.71-1.55 3.8-3.01s2.16-2.55 3.53-.75c1.5 1.89.07 2.77-1.6 3.55c-1.67.73-3.59 1.37-3.13 2.78c.27.82 1.15.37 2.08.06c.92-.31 1.91-.48 2.39.93c.51 1.49-.7 1.83-2.06 1.97s-2.88.08-2.98.76c-.11.71.8 1 1.59 1.42c.79.43 1.46 1 .85 2.28M20.5 19c-.95 0-1.44-.74-1.44-1.5s.48-1.5 1.44-1.5c1 0 1.5.74 1.5 1.5s-.5 1.5-1.5 1.5">
                                                </path>
                                            </svg>
                                            Hola
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem className='text-white'>
                                                Hola otra vez
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem className='text-white'>
                                                Adios
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>

                    </SidebarContent>
                </div>

            </Sidebar>
        </div >
    )
}