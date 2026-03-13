import { useState } from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/authSlice.jsx";

const ProfileDropdown = ({ imagePath, user }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none"
            >
                <img
                    className="w-16 h-16 rounded-full border-2 border-red-500 hover:border-red-400 transition cursor-pointer"
                    src={imagePath}
                    alt="Profile"
                />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-20 border border-gray-700">
                        <Link onClick={() => setIsOpen(false)} to="/profile" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition">
                            Profile
                        </Link>
                        {/*<Link to="/settings" className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition">*/}
                        {/*    Settings*/}
                        {/*</Link>*/}

                        <div className="border-t border-gray-700 my-1"></div>

                        <button
                            onClick={() => { dispatch(logout(user)) }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileDropdown;