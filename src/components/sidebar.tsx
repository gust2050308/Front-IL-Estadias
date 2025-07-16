// components/sidebar.tsx
"use client"

import { useState } from "react"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Home, Settings, Menu, ChevronRight, ChevronLeft } from "lucide-react"
import clsx from "clsx"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { NavLink } from "react-router-dom";

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(true)

    const menuItems = [
        { icon: <Home className="w-5 h-5" />, label: "Inicio" },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M18.14 16.7c-.91 1.51-2.06 1.03-3.14.39s-2.1-1.41-2.75-.5c-.71.78-.16 2.03.12 3.13c.28 1.11.3 2.07-1.47 2.28c-1.4-.19-1.32-1.35-1.09-2.58s.59-2.53-.31-2.99c-.72-.48-1.22.35-1.85 1.17c-.65.81-1.39 1.6-2.61 1.02c-1.1-.91-.68-1.44-.1-2.12s1.33-1.59.9-3.19c-.18-.65-1.08-.5-1.97-.52c-.87-.02-1.75-.2-1.84-1.5c-.07-.79.52-1.11 1.13-1.36c.62-.25 1.25-.43 1.26-1.06c.03-.61-.38-1.04-.64-1.49s-.37-.92.25-1.62c1.05-.86 1.89-.13 2.73.66s1.67 1.62 2.7.97c.82-.54.07-1.49-.51-2.42s-.99-1.82.51-2.23c1.3-.36 1.8.53 2.25 1.56c.46 1.03.86 2.2 1.96 2.41c1.57.29 2.71-1.55 3.8-3.01s2.16-2.55 3.53-.75c1.5 1.89.07 2.77-1.6 3.55c-1.67.73-3.59 1.37-3.13 2.78c.27.82 1.15.37 2.08.06c.92-.31 1.91-.48 2.39.93c.51 1.49-.7 1.83-2.06 1.97s-2.88.08-2.98.76c-.11.71.8 1 1.59 1.42c.79.43 1.46 1 .85 2.28M20.5 19c-.95 0-1.44-.74-1.44-1.5s.48-1.5 1.44-1.5c1 0 1.5.74 1.5 1.5s-.5 1.5-1.5 1.5"></path></svg>, label: "Tinta" },
    ]

    return (
        <>
            {/* Mobile Sheet */}
            <div className="lg:hidden p-2">
                <Sheet>
                    <SheetTrigger>
                        <Menu />
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0">
                        <SidebarContent collapsed={false} />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <aside
                className={clsx(
                    "hidden lg:flex flex-col transition-all duration-300 bg-gradient-to-b from-blue-900 to-blue-600 text-white",
                    collapsed ? "w-16" : "w-64"
                )}
            >
                <div className="flex items-center justify-between px-4 py-4 border-b border-blue-700">
                    {!collapsed && <span className="font-bold">Ir a...</span>}
                    <button onClick={() => setCollapsed(!collapsed)}>
                        <ChevronLeft
                            className={clsx(
                                "transition-transform",
                                collapsed ? "-rotate-180" : "rotate-0"
                            )}
                        />
                    </button>
                </div>

                <SidebarContent collapsed={collapsed} />
            </aside>
        </>
    )
}

function SidebarContent({ collapsed }: { collapsed: boolean }) {
    return (
        <nav className="flex flex-col gap-1 px-2 py-4">
            {/* Ítem simple */}
            <button
                className={clsx(
                    "flex items-center w-full gap-4 px-4 py-2 hover:bg-blue-700 rounded-md text-sm",
                    collapsed ? "justify-center" : "justify-start"
                )}
            >
                <Home className="w-5 h-5" />
                {!collapsed && <span>Inicio</span>}
            </button>

            {/* Collapsible */}
            <Collapsible>
                <CollapsibleTrigger asChild>
                    <button
                        className={clsx(
                            "flex items-center w-full gap-4 px-4 py-2 hover:bg-blue-700 rounded-md text-sm",
                            collapsed ? "justify-center" : "justify-between"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M18.14 16.7c-.91 1.51-2.06 1.03-3.14.39s-2.1-1.41-2.75-.5c-.71.78-.16 2.03.12 3.13c.28 1.11.3 2.07-1.47 2.28c-1.4-.19-1.32-1.35-1.09-2.58s.59-2.53-.31-2.99c-.72-.48-1.22.35-1.85 1.17c-.65.81-1.39 1.6-2.61 1.02c-1.1-.91-.68-1.44-.1-2.12s1.33-1.59.9-3.19c-.18-.65-1.08-.5-1.97-.52c-.87-.02-1.75-.2-1.84-1.5c-.07-.79.52-1.11 1.13-1.36c.62-.25 1.25-.43 1.26-1.06c.03-.61-.38-1.04-.64-1.49s-.37-.92.25-1.62c1.05-.86 1.89-.13 2.73.66s1.67 1.62 2.7.97c.82-.54.07-1.49-.51-2.42s-.99-1.82.51-2.23c1.3-.36 1.8.53 2.25 1.56c.46 1.03.86 2.2 1.96 2.41c1.57.29 2.71-1.55 3.8-3.01s2.16-2.55 3.53-.75c1.5 1.89.07 2.77-1.6 3.55c-1.67.73-3.59 1.37-3.13 2.78c.27.82 1.15.37 2.08.06c.92-.31 1.91-.48 2.39.93c.51 1.49-.7 1.83-2.06 1.97s-2.88.08-2.98.76c-.11.71.8 1 1.59 1.42c.79.43 1.46 1 .85 2.28M20.5 19c-.95 0-1.44-.74-1.44-1.5s.48-1.5 1.44-1.5c1 0 1.5.74 1.5 1.5s-.5 1.5-1.5 1.5"></path></svg>
                            {!collapsed && <span>Tinta</span>}
                        </div>

                        {!collapsed && <ChevronDown className="w-4 h-4 ml-auto" />}
                    </button>
                </CollapsibleTrigger>


                {!collapsed && (
                    <CollapsibleContent className="pl-10 mt-1">
                        <button className="text-sm text-white hover:underline block py-1">
                            <NavLink to="/StockContextProvider">Existencia</NavLink>
                        </button>
                        <button className="text-sm text-white hover:underline block py-1">
                            <NavLink to="/Outputs">Requeridas</NavLink>
                        </button>
                        <button className="text-sm text-white hover:underline block py-1">
                            <NavLink to="/InputsFromOrders">Agregar</NavLink>
                        </button>
                         <button className="text-sm text-white hover:underline block py-1">
                            <NavLink to="/EntriesInk">Entradas</NavLink>
                        </button>
                    </CollapsibleContent>
                )}

            </Collapsible>

            <Collapsible>
                <CollapsibleTrigger asChild>
                    <button
                        className={clsx(
                            "flex items-center w-full gap-4 px-4 py-2 hover:bg-blue-700 rounded-md text-sm",
                            collapsed ? "justify-center" : "justify-between"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M18 3c1.454 0 2.452 1.235 3.03 2.485c.571 1.24.918 2.858.965 4.609L22 10.5V20a1 1 0 0 1-1.04 1l-.124-.014L18 20.514l-2.836.472a1 1 0 0 1-.362-.006l-.118-.031L12 20.054l-2.684.895a1 1 0 0 1-1.309-.83L8 20v-2.927c-.531.55-1.196.927-2 .927c-1.454 0-2.452-1.235-3.03-2.485C2.356 14.18 2 12.406 2 10.5s.355-3.68.97-5.015c.551-1.194 1.486-2.373 2.835-2.477L6 3zM6 5c-.203 0-.705.22-1.213 1.323C4.317 7.34 4 8.816 4 10.5s.317 3.16.787 4.177C5.295 15.78 5.797 16 6 16s.705-.22 1.213-1.323C7.683 13.66 8 12.184 8 10.5s-.317-3.16-.787-4.177C6.705 5.22 6.203 5 6 5m0 3.5c.552 0 1 .895 1 2s-.448 2-1 2s-1-.895-1-2s.448-2 1-2"></path></g></svg>
                            {!collapsed && <span>Papel</span>}
                        </div>
                        {!collapsed && <ChevronDown className="w-4 h-4 ml-auto" />}
                    </button>
                </CollapsibleTrigger>


                {!collapsed && (
                    <CollapsibleContent className="pl-10 mt-1">
                        <button className="text-sm text-white hover:underline block py-1">
                            Subitem 1
                        </button>
                        <button className="text-sm text-white hover:underline block py-1">
                            Subitem 2
                        </button>
                    </CollapsibleContent>
                )}

            </Collapsible>

            <Collapsible>
                <CollapsibleTrigger asChild>
                    <button
                        className={clsx(
                            "flex items-center w-full gap-4 px-4 py-2 hover:bg-blue-700 rounded-md text-sm",
                            collapsed ? "justify-center" : "justify-between"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="m22.903 11.728l-4.528-1.697V4.945a1.69 1.69 0 0 0-1.097-1.58l-4.687-1.757a1.67 1.67 0 0 0-1.186 0L6.717 3.366a1.69 1.69 0 0 0-1.097 1.58v5.085l-4.528 1.697A1.69 1.69 0 0 0 0 13.308v5.16c0 .638.36 1.224.933 1.51l4.687 2.344a1.68 1.68 0 0 0 1.51 0L12 19.884l4.87 2.438a1.68 1.68 0 0 0 1.51 0l4.687-2.344a1.69 1.69 0 0 0 .933-1.51v-5.16c0-.703-.436-1.331-1.097-1.58m-6.122-1.66l-3.984 1.496V8.367l3.984-1.734zM7.22 4.88L12 3.09l4.781 1.79v.028L12 6.848l-4.781-1.94Zm3.937 13.645l-3.984 1.992V16.81l3.984-1.818zm0-5.25l-4.781 1.94l-4.781-1.94v-.028l4.781-1.79l4.781 1.79zm11.25 5.25l-3.984 1.992V16.81l3.984-1.818zm0-5.25l-4.781 1.94l-4.781-1.94v-.028l4.781-1.79l4.781 1.79z"></path></svg>
                                                    {!collapsed && <span>Auxiliares</span>}

                        </div>
                        {!collapsed && <ChevronDown className="w-4 h-4 ml-auto" />}
                    </button>
                </CollapsibleTrigger>


                {!collapsed && (
                    <CollapsibleContent className="pl-10 mt-1">
                        <button className="text-sm text-white hover:underline block py-1">
                            Subitem 1
                        </button>
                        <button className="text-sm text-white hover:underline block py-1">
                            Subitem 2
                        </button>
                    </CollapsibleContent>
                )}

            </Collapsible>
        </nav>
    )
}
