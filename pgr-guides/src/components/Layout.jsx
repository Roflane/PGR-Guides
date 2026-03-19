import React, {useEffect, useState} from 'react';
import { Outlet, Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import ProfileDropdown from "./profile/ProfileDropdown.jsx";
import ProfileApi from "../api/ProfileApi.js";
import RippleGrid from "./background/RippleGrid.jsx";
import {selectImagePath} from "../store/selectors/authSelectors.js";

const Layout = () => {
    const { isAuth, user } = useSelector(state => state.auth || {});
    const [imagePath, setImagePath] = useState(null);
    const imagePathFromStore = useSelector(selectImagePath);

    const role = user?.role || "NONE";
    const isAdmin = role === "ADMIN";
    const isModerator = role === "MODERATOR";
    const isUser = role === "USER";

    useEffect(() => {
        async function fetchImagePath() {
            if (user) {
                const res = await ProfileApi.getImageProfile(user.id);
                setImagePath(res);
            }
        }
        if (user) {
            fetchImagePath();
        }
    }, [user, imagePathFromStore])

    return (
        <div className="h-screen bg-gray-700 text-white flex flex-col relative ">
            <div className="absolute inset-0 z-0">
                <RippleGrid
                    enableRainbow={false}
                    gridColor="#FF0000"
                    rippleIntensity={0.05}
                    gridSize={15}
                    gridThickness={15}
                    mouseInteraction={true}
                    mouseInteractionRadius={1.2}
                    opacity={0.43}
                />
            </div>

            <header className="bg-gray-800 p-4 border-b border-red-500 relative flex-shrink-0">
                <div className="container mx-auto flex justify-between items-center">
                    <nav className="flex gap-5 flex-wrap">
                        <Link to="/" className="px-4 py-2 bg-red-800 rounded hover:bg-red-900 transition">Home</Link>
                        <Link to="/guides" className="px-4 py-2 bg-red-800 rounded hover:bg-red-900 transition">Guides</Link>

                        {isAuth && <Link to="/my-guides" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">My Guides</Link>}
                        {isUser && <Link to="/submit-guide" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">Submit Guide</Link>}
                        {(isModerator || isAdmin) && (
                            <Link to="/moderation" className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700 transition">Moderation</Link>
                        )}
                        {/*{isAdmin && <Link to="/admin" className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition">Admin Panel</Link>}*/}
                    </nav>

                    <div className="flex gap-3 items-center flex-shrink-0">
                        {!isAuth && (
                            <>
                                <Link to="/login" className="px-4 py-2 text-black bg-white rounded hover:bg-red-100 transition">Login</Link>
                                <Link to="/register" className="px-4 py-2 text-black bg-white rounded hover:bg-red-100 transition">Register</Link>
                            </>
                        )}

                        {isAuth && user && (
                            <ProfileDropdown imagePath={imagePath}/>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto p-6 relative z-10 w-full max-w-full">
                <div className="w-full">
                    <Outlet />
                </div>
            </main>

            <footer className="bg-gray-800 p-4 border-t border-red-500 text-center text-gray-400 text-sm relative z-10 flex-shrink-0">
                PGR Guides © 2026
            </footer>
        </div>
    );
}

export default Layout;