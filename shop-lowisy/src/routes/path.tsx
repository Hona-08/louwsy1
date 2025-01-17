import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Paths = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const { pathname, query } = router;
    const protectedRoutes = ['cart', 'checkout', 'payment']

    useEffect(() => {
        if (!isAuthenticated && protectedRoutes.includes(pathname)) {
            router.push('/login')
        }
    }, []);
}

export default Paths;