import { useEffect } from "react";
import { Tab, initTWE } from "tw-elements";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    useEffect(() => {
        initTWE({ Tab });
    }, []);

    return (
        <nav className="w-full bg-gradient-to-r from-blue-900 to-blue-500">
            <div className="mx-auto max-w-5/6 px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between w-full">

                    <div className='flex flex-row w-1/2'>
                        <svg width="45" height="45" className='mx-6' viewBox="0 0 4504 4502" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M213.923 2388.74C282.581 3417.81 1113.34 4238.28 2146.76 4290.73V4501.45C997.068 4448.59 72.2259 3534.1 3.01465 2388.74H213.923ZM4500.99 2388.74C4431.77 3534.1 3506.93 4448.59 2357.24 4501.45V4290.73C3390.66 4238.28 4221.42 3417.81 4290.08 2388.74H4500.99ZM2357.24 0C3528.79 53.8645 4466.85 1002.43 4504 2178.27H4293.4C4256.46 1118.69 3412.51 264.279 2357.24 210.724V0ZM2146.76 210.724C1091.49 264.279 247.537 1118.69 210.596 2178.27H0C37.1487 1002.43 975.215 53.8654 2146.76 0V210.724Z" fill="white" />
                            <path d="M1004.68 1159L1060.43 1173.11L1116.24 1220.18L1176.77 1297.96L1207.02 1349.78L1218.64 1385.05L1223.29 1479.31L1218.63 1609.02L1148.72 2444.07L1074.15 3262.62V3262.63L1074.15 3262.64L1067.16 3397.1L1067.16 3397.13L1067.16 3397.16L1071.82 3458.5L1071.83 3458.6L1071.88 3458.7L1113.83 3536.54L1113.86 3536.6L1113.91 3536.65L1162.85 3586.19L1162.91 3586.25L1162.99 3586.29L1260.86 3633.47L1260.9 3633.49L1260.95 3633.5L1330.86 3652.37L1330.92 3652.39H1391.61L1391.65 3652.39L1496.51 3638.23L1496.58 3638.22L1496.64 3638.2L3025.34 3001.29L3097.58 2972.98L3097.58 2972.98L3197.79 2932.88L3256.03 2911.66L3328.18 2885.74H3430.6L3500.36 2897.51L3560.81 2937.52L3616.64 2998.75L3663.19 3095.34L3677.15 3175.43V3281.49L3663.18 3359.27L3646.89 3411.11L3616.61 3486.56L3584 3559.64L3557.69 3596.27C3222.92 3936.53 2761.87 4146.75 2252.86 4146.75C1230.02 4146.75 400.833 3297.87 400.833 2250.73C400.833 1932.81 477.263 1633.17 612.337 1370.01L622.953 1354.61L667.192 1307.47L727.751 1250.88L788.266 1206.12L858.108 1177.84L916.267 1159H1004.68ZM2252.86 354.703C3275.71 354.703 4104.89 1203.58 4104.89 2250.73C4104.89 2258.42 4104.85 2266.11 4104.76 2273.79L4099.94 2234.11L4099.94 2234.1L4099.94 2234.08L4083.62 2144.45L4083.62 2144.43L4083.62 2144.42L4069.64 2087.8L4069.63 2087.78L4069.62 2087.76L4039.33 2000.48L4039.32 2000.45L4039.31 2000.43L4011.34 1941.45L4011.31 1941.38L4011.25 1941.32L3966.97 1896.5L3966.92 1896.44L3966.85 1896.41L3908.59 1865.74L3908.52 1865.7L3908.44 1865.69L3850.18 1856.25L3850.1 1856.24L3850.01 1856.25L3780.1 1868.05L3780.04 1868.06L3779.99 1868.08L2871.15 2269.1L2540.29 2410.61L2437.85 2431.83H2351.76L2282.02 2410.65L2223.9 2361.23L2193.69 2311.83L2182.07 2257.7L2179.74 2196.41V2135.15L2193.71 2069.15L2193.71 2069.14L2224 1908.74L2223.51 1908.64L2224.01 1908.74V1908.73L2398.78 929.776L2398.79 929.732V847.077L2398.78 847.029L2382.47 764.467L2382.46 764.44L2382.46 764.415L2368.47 719.596L2368.45 719.513L2368.4 719.444L2324.12 660.471L2324.04 660.359L2323.91 660.308L2288.95 646.154L2288.94 646.15L2251.66 631.996L2251.57 631.964H2162.88L2162.83 631.974L2090.59 646.127L2090.57 646.131L1971.72 674.438L1838.89 705.104L1838.88 705.106L1664.11 749.926L1664.1 749.929L1664.08 749.932L1524.28 792.387L1407.77 820.692L1407.77 820.694L1288.93 851.357L1146.79 884.38L1013.96 912.688L1013.93 912.692L1013.91 912.7L907.984 947.164C1245.53 582.299 1723.24 354.703 2252.86 354.703Z" fill="white" />
                        </svg>


                        <div className="w-3/4 flex items-baseline space-x-2">

                            <NavLink to="/" className="text-3xl font-bold text-white flex flex-row">
                                International Label
                            </NavLink>
                            <h1 className="text-white text-md">Warehouse Management</h1>
                        </div>
                    </div>
                    {/* Tabs de navegación - Desktop */}
                    <div className="hidden md:block">
                        <ul className="mb-0 flex list-none flex-row flex-wrap border-b-0 ps-0">
                            {
                                /*<li>
                                <NavLink
                                    to="/HomeShopping"
                                    className={({ isActive }) =>
                                        `my-2 block border-b-2 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight
                     ${isActive
                                            ? 'border-[#DBE6FF] text-white'
                                            : 'border-transparent text-[#FFFFFF] hover:bg-white hover:text-stone-800'
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
                                            ? 'border-[#DBE6FF] text-white'
                                            : 'border-transparent text-[#FFFFFF] hover:bg-white hover:text-black'
                                        }`
                                    }
                                >
                                    Almacén
                                </NavLink>
                            </li>*/
                            }
                        </ul>
                    </div>

                    {/* Botón móvil (hamburguesa) */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="text-white hover:bg-white inline-flex items-center justify-center p-2 rounded-md"
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
                    <NavLink
                        to="/HomeShopping"
                        className="text-white hover:bg-[#56282D] block px-3 py-2 rounded-md"
                    >
                        Compras
                    </NavLink>
                    <NavLink
                        to="/AlmacenHome"
                        className="text-white hover:bg-[#56282D] block px-3 py-2 rounded-md"
                    >
                        Almacén
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}