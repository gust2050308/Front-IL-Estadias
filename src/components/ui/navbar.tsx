import { useEffect } from "react";
import { Collapse, initTWE } from "tw-elements";
import { Link } from "react-router-dom";    
import logoInternational from '../../assets/internationalLogo.png'

export default function Navbar() {
  // Inicializa TW Elements (para el collapse)
  useEffect(() => {
    initTWE({ Collapse });
  }, []);

  return (
    <nav className="w-full bg-blue-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
            <img src={logoInternational} className='w-20' alt="" />

          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <a href="#" className="text-xl font-bold text-white">
              Mi App
            </a>
          </div>

          {/* Menú para desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
                Inicio
              </a>
              <a href="#" className="text-white hover:bg-blue-950 px-3 py-2 rounded-md">
                Productos               
              </a>
              <a href="#" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
                Contacto
              </a>
            </div>
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
      <div className="md:hidden hidden" id="mobile-menu" data-twe-collapse-item>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md">
            Inicio
          </a>
          <a href="#" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md">
            Productos
          </a>
          <a href="#" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md">
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
}