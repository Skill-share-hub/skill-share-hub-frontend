import { Outlet } from "react-router-dom";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/home/components/Footer";
import { useLocation } from "react-router-dom";

const MainLayout = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {!isAuthPage && <Navbar />}

            <main className="flex-1 flex flex-col w-full pt-20">
                <Outlet />
            </main>

            {!isAuthPage && <Footer />}
        </div>
    );
};

export default MainLayout;
