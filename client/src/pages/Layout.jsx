import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/NavBar.jsx";
import TopBar from "../components/TopBar.jsx";

const Layout = () => {
    return (
        <div className="flex h-screen">
            <Navbar />
            <div className="flex flex-col flex-grow">
                <TopBar />
                <main className="flex-grow overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;