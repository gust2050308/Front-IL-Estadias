import { useEffect } from "react";
import { Tab, initTWE } from "tw-elements";
import { NavLink } from "react-router-dom";
import logoInternational from '../../assets/internationalLogo.png';

export default function Navbar() {
    useEffect(() => {
        initTWE({ Tab });
    }, []);

    return (
        <nav className="w-full bg-blue-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo y Brand */}
                    <div className="flex items-center">
                        <img src={logoInternational} className="w-20" alt="Logo" />
                        <NavLink to="/" className="ml-2 text-xl font-bold text-white">
                            International Label
                        </NavLink>
                    </div>

                    {/* Tabs de navegación - Desktop */}
                    <div className="hidden md:block">
                        <ul className="mb-0 flex list-none flex-row flex-wrap border-b-0 ps-0">
                            <li>
                                <NavLink
                                    to="/HomeShopping"
                                    className={({ isActive }) =>
                                        `my-2 block border-b-2 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight
        ${isActive
                                            ? 'border-blue-500 text-white'
                                            : 'border-transparent text-neutral-300 hover:bg-blue-900'
                                        }`
                                    }
                                >
                                    Compras
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/AlmacenHome"
                                    className={({ isActive }) =>
                                        `my-2 block border-b-2 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight
                                         ${isActive
                                            ? 'border-blue-500 text-white'
                                            : 'border-transparent text-neutral-300 hover:bg-blue-900'
                                        }`
                                    }
                                >
                                    Almacén
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Botón móvil (hamburguesa) */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="text-white hover:bg-blue-700 inline-flex items-center justify-center p-2 rounded-md"
                            data-twe-collapse-init
                            data-twe-target="#mobile-menu"
                        >
                            <span className="sr-only">Abrir menú</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú móvil (collapse) */}
            <div className="md:hidden" id="mobile-menu" data-twe-collapse-item>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavLink to="/HomeShopping" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md">
                        Compras
                    </NavLink>
                    <NavLink to="/AlmacenHome" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md">
                        Almacén
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}