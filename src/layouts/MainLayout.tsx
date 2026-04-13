import { Outlet } from "react-router-dom";
import Navbar from "../features/navbar/Navbar";
import Footer from "../shared/components/Footer";
import { useLocation } from "react-router-dom";
import ProfileCompletionWizard from "../features/profile/components/ProfileCompletionWizard";
import { useAppSelector } from "../shared/hooks/redux";

const MainLayout = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
    const { user } = useAppSelector(state => state.user);
    
    // Admins shouldn't see the public Navbar/Footer when checking public routes (like courses)
    const isAdmin = user?.role === "admin";
    
    const showComponents = !isAuthPage && !isAdmin;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {showComponents && <Navbar />}
            {showComponents && <ProfileCompletionWizard />}

            <main className={`flex-1 flex flex-col w-full ${showComponents ? "pt-20" : "pt-4"}`}>
                <Outlet />
            </main>

            {showComponents && <Footer />}
        </div>
    );
};

export default MainLayout;
