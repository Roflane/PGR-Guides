import React, { useState } from 'react';
import axios from 'axios';
import {API_BASE} from "../../configs/ApiConfig.js";
import { useNavigate, Link } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {loginSuccess} from "../../store/authSlice.jsx";


const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [rememberMeChecked, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const validateForm = () => {
        if (!formData.login || !formData.password) {
            setError('All fields are required');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const isEmail = formData.login.includes('@');
            const response = await axios.post(`${API_BASE}/api/auth/login`, {
                [isEmail ? 'email' : 'login']: formData.login,
                password: formData.password
            });


          //  console.log('Login successful: ', response.data);

            if (response.data.data?.accessToken) {
                localStorage.setItem('accessToken', response.data.data.accessToken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);

                localStorage.setItem('user', JSON.stringify({
                    login: response.data.data.login,
                    roles: response.data.data.roles
                }));
            }

            const userData = {
                id: response.data.data.id,
                login: response.data.data.login,
                imagePath: API_BASE + response.data.data.staticImagePath,
                registerDate: response.data.data.createdAt,
                roles: response.data.data.roles,
            };

            dispatch(loginSuccess(userData, rememberMeChecked));
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);

            if (err.response) {
                if (err.response.status === 401) {
                    setError('Invalid login or password');
                } else if (err.response.status === 400) {
                    setError(err.response.data?.message || 'Invalid login data');
                } else if (err.response.status === 404) {
                    setError('User not found');
                } else {
                    setError(`Server error: ${err.response.status}`);
                }
            } else if (err.request) {
                setError('No response from server. Check if backend is running.');
            } else {
                setError('Error sending request');
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className=" from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-8 max-h-full overflow-y-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-gray-600">
                        Sign in to your account
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-1">
                                Login
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    id="login"
                                    name="login"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={formData.login}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className={`appearance-none relative block w-full px-3 py-2 border ${
                                        error && !formData.login ? 'border-red-300' : 'border-gray-300'
                                    } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200`}
                                    placeholder="Enter your login"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className={`appearance-none relative block w-full px-3 py-2 border ${
                                        error && !formData.password ? 'border-red-300' : 'border-gray-300'
                                    } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                onClick={() => setRememberMe(!rememberMeChecked)}
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>

                        {/*<div className="text-sm">*/}
                        {/*    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">*/}
                        {/*        Forgot your password?*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                                loading
                                    ? 'bg-red-500 cursor-not-allowed'
                                    : 'bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            } transition-colors duration-200`}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"  fill="none" viewBox="0 0 24 24">
                                        <circle className="accent-red-500 opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="font-medium text-red-400 hover:text-red-600 transition-colors duration-200"
                            >
                                Register here
                            </Link>
                        </p>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default LoginPage;