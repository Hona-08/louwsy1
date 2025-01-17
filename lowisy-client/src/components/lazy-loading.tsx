import { lazy, Suspense } from "react";
import { ProductDetailsCarousel } from "src/sections/@dashboard/e-commerce/product-details";
import LoadingScreen from "./LoadingScreen";





const Loadable = (Component: any) => (props: any) => (
    <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
    </Suspense>
);


export const HomeHero = Loadable(lazy(() => import('./../../src/sections/home/HomeHero')));
export const HomeHugePackElements = Loadable(lazy(() => import('./../../src/sections/home/HomeHugePackElements')));
export const MainFooter = Loadable(lazy(() => import('./../../src/layouts/main/MainFooter')));
export const MainHeader = Loadable(lazy(() => import('./../../src/layouts/main/MainHeader')));
export const MainLayout = Loadable(lazy(() => import('./../../src/layouts/main/index')));
export const DashboardLayout = Loadable(lazy(() => import('./../../src/layouts/dashboard/index')));
export const DashboardHeader = Loadable(lazy(() => import('./../../src/layouts/dashboard/header')));
export const NavbarVertical = Loadable(lazy(() => import('./../../src/layouts/dashboard/navbar/NavbarVertical')));
export const LogoOnlyLayout = Loadable(lazy(() => import('./../../src/layouts/LogoOnlyLayout')));
export const Logo = Loadable(lazy(() => import('./../../src/components/Logo')));
export const AuthGuard = Loadable(lazy(() => import('./../../src/guards/AuthGuard')));

export const Image = Loadable(lazy(() => import('./../../src/components/Image')));








