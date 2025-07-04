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
                        <svg className='mx-3' width="40" height="40" viewBox="0 0 4996 4994" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M237.293 2649.69C313.451 3791.16 1234.96 4701.26 2381.27 4759.43V4993.17C1105.99 4934.54 80.1193 3920.15 3.34473 2649.69H237.293ZM4992.65 2649.69C4915.88 3920.15 3890.01 4934.54 2614.74 4993.17V4759.43C3761.04 4701.26 4682.55 3791.16 4758.71 2649.69H4992.65ZM2614.74 0C3914.26 59.7494 4954.8 1111.94 4996 2416.22H4762.4C4721.42 1240.9 3785.28 293.153 2614.74 233.748V0ZM2381.27 233.748C1210.72 293.153 274.578 1240.9 233.602 2416.22H0C41.2033 1111.94 1081.74 59.749 2381.27 0V233.748Z" fill="white" />
                            <path d="M1842.1 1364.69C1907.65 1330.91 1958.84 1319.72 1998.71 1322.59C2038.56 1325.46 2067.14 1342.38 2087.46 1364.94C2107.79 1387.51 2119.88 1415.74 2126.7 1441.2C2130.42 1455.1 2132.58 1468.17 2133.65 1479.02L2112.77 1757.91L2109.66 1851.54L2043.19 2709.9L2697.37 2592.45L2784.36 2575.93L2826.49 2568.26L2850.28 2564.13L2850.96 2564.01L2850.93 2564.2L2860.67 2562.43C2868.59 2560.82 2876.81 2560.57 2884.85 2561.68C2892.89 2562.79 2900.58 2565.25 2907.48 2568.91C2914.37 2572.57 2920.33 2577.36 2924.99 2582.99C2929.66 2588.63 2932.94 2594.99 2934.65 2601.71C2936.36 2608.44 2936.44 2615.38 2934.92 2622.13C2933.4 2628.88 2930.29 2635.31 2925.78 2641.03C2921.27 2646.76 2915.44 2651.66 2908.65 2655.45C2904.27 2657.9 2899.54 2659.85 2894.59 2661.27C2894.66 2661.19 2894.72 2661.11 2894.78 2661.03C2899.29 2655.31 2902.4 2648.88 2903.92 2642.13C2905.44 2635.38 2905.36 2628.44 2903.65 2621.71C2901.94 2614.99 2898.66 2608.63 2893.99 2602.99C2889.33 2597.36 2883.37 2592.57 2876.48 2588.91C2869.58 2585.25 2861.89 2582.79 2853.85 2581.68C2845.81 2580.57 2837.59 2580.82 2829.67 2582.43L2819.93 2584.2L2819.96 2584.01L2819.28 2584.13L2795.49 2588.26L2753.36 2595.93L2666.37 2612.45L993.984 2912.71L993.499 2912.79L993.507 2912.83L985.206 2914.32C970.487 2916.98 957.462 2924.1 948.637 2934.33C939.811 2944.55 935.808 2957.15 937.398 2969.7C938.989 2982.24 946.059 2993.85 957.25 3002.3C968.441 3010.74 982.963 3015.42 998.021 3015.43C1002.35 3015.43 1006.67 3015.04 1010.91 3014.28L1020.69 3012.52L1020.8 3012.91L1020.9 3013.3L1021.36 3013.22L1059.04 3006.45V3526.74H998.021C981.837 3526.74 966.316 3532.12 954.872 3541.71C943.429 3551.3 937 3564.31 937 3577.87C937 3591.43 943.429 3604.44 954.872 3614.03C966.316 3623.61 981.837 3629 998.021 3629H1968.06L1964.37 3705.72V3705.78L1968.84 3769.38L1968.85 3769.48L1968.89 3769.57L2009.13 3850.29L2009.16 3850.35L2009.2 3850.4L2056.15 3901.77L2056.2 3901.84L2056.28 3901.88L2150.17 3950.8L2150.21 3950.82L2150.26 3950.84L2217.31 3970.41L2217.38 3970.43H2275.61L2275.64 3970.42L2376.23 3955.74L2376.3 3955.73L2376.36 3955.7L2822.84 3754.61L2821.85 3754.32L2823.09 3753.76L3516.53 3440.52C3686.21 3370.18 3800.2 3352.38 3872.1 3364.49C3914.43 3371.62 3942.13 3389.1 3958.06 3412.29C3973.99 3435.49 3978.19 3464.47 3973.37 3494.67V3494.68L3933.37 3800.18L3902.85 4023.47C3533.27 4364.01 3039.68 4572 2497.5 4572C1351.79 4572 423 3643.21 423 2497.5C423 2301.93 450.064 2112.68 500.648 1933.29L1842.06 1364.7L1842.08 1364.7L1842.1 1364.69ZM2497.5 423C3643.21 423 4572 1351.79 4572 2497.5C4572 3003.33 4390.96 3466.87 4090.15 3826.87L4168 2922L4214 2568V2484.5L4206.5 2445.5L4183.5 2415.95L4143.45 2396.94L4085.71 2389.91H4033.07L3990.74 2396.93L3946.52 2415.95L3694.76 2536.04L3377.4 2682.79L3279.15 2704.78H3196.59L3129.71 2682.82L3073.96 2631.58L3044.98 2580.35L3033.83 2524.21L3031.59 2460.65V2397.12L3045 2328.67V2328.66L3074.06 2162.32L3229.73 1219.69C3231.44 1209.97 3233.06 1200.79 3234.57 1192.1C3241.72 1151.05 3246.58 1120.62 3248.05 1094.15C3250.42 1051.56 3244 1019.25 3224.25 969.528L3212.63 929.249L3212.61 929.171L3212.56 929.104L3192.33 899.978C3157.67 839.882 3103.44 794.441 3026.99 775.571C2938.47 753.723 2820.22 767.513 2668.17 835.287L555.261 1767.03C850.756 981.721 1608.88 423 2497.5 423ZM2676.56 3482.71V3506.74H2737.58C2753.76 3506.74 2769.28 3512.12 2780.72 3521.71C2792.16 3531.3 2798.59 3544.31 2798.59 3557.87C2798.59 3571.43 2792.16 3584.44 2780.72 3594.03C2774.08 3599.59 2766.06 3603.74 2757.34 3606.24C2763.98 3597.9 2767.59 3588.04 2767.59 3577.87C2767.59 3564.31 2761.17 3551.3 2749.72 3541.71C2738.28 3532.12 2722.76 3526.74 2706.58 3526.74H2645.56V3502.71L2725.12 2707.18L2754.65 2701.88L2676.56 3482.71ZM1983.03 3424.48L1976.1 3506.74H2279.44V3526.74H1425.16V3424.48H1983.03ZM2000.26 3219.95L1993.33 3302.21H2279.44V3322.21H1425.16V3219.95H2000.26Z" fill="white" />
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
                            <li>
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
                            </li>
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