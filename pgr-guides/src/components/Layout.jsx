import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown.jsx";

const Layout = () => {
    const { isAuth, user } = useSelector(state => state.auth || {});
    const role = user?.role || "NONE";
    const isAdmin = role === "ADMIN";
    const isModerator = role === "MODERATOR";
    const isUser = role === "USER";

    return (
        <div className="h-screen bg-gray-700 text-white flex flex-col">
            <header className="bg-gray-800 p-4 border-b border-red-500">
                <div className="container mx-auto flex justify-between items-center">
                    <nav className="flex gap-5">
                        <Link to="/" className="px-4 py-2 bg-red-800 rounded hover:bg-red-900 transition">Home</Link>
                        <Link to="/guides" className="px-4 py-2 bg-red-800 rounded hover:bg-red-900 transition">Guides</Link>

                        {isAuth && <Link to="/my-guides" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">My Guides</Link>}
                        {isUser && <Link to="/submit-guide" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">Submit Guide</Link>}
                        {(isModerator || isAdmin) && (
                            <Link to="/moderation" className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700 transition">Moderation</Link>
                        )}
                        {isAdmin && <Link to="/admin" className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition">Admin Panel</Link>}
                    </nav>

                    <div className="flex gap-3 items-center">
                        {!isAuth && (
                            <>
                                <Link to="/login" className="px-4 py-2 text-black bg-white rounded hover:bg-red-100 transition">Login</Link>
                                <Link to="/register" className="px-4 py-2 text-black bg-white rounded hover:bg-red-100 transition">Register</Link>
                            </>
                        )}

                        {isAuth && (
                            <span className="text-sm text-green-400 font-semibold">
                                {user.login} ({role})
                            </span>
                            //<ProfileDropdown profile={profile} />
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto p-6 overflow-auto">
                <Outlet />
            </main>

            <footer className="bg-gray-800 p-4 border-t border-red-500 text-center text-gray-400 text-sm">
                PGR Guides © 2026
            </footer>
        </div>
    );
}

export default Layout;