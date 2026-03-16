import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const validateForm = () => {
        if (!formData.login || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        const loginRegex = /^[a-zA-Z0-9_]+$/;
        if (!loginRegex.test(formData.login)) {
            setError('Login can only contain letters, numbers and underscore');
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
            const response = await axios.post('http://localhost:5177/api/auth/register', {
                login: formData.login,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            });

            console.log('Registration successful:', response.data);
            setSuccess(true);

            if (response.data.data?.accessToken) {
                localStorage.setItem('accessToken', response.data.data.accessToken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);
            }

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            console.error('Registration error:', err);

            if (err.response) {
                if (err.response.status === 400) {
                    setError(err.response.data?.message || 'Invalid registration data');
                } else if (err.response.status === 409) {
                    setError('User with this email or login already exists');
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
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                        Create Account
                    </h2>
                    <p className="text-sm text-gray-600">
                        Join our community today
                    </p>
                </div>

                {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">
                                    Registration successful! Redirecting to login...
                                </p>
                            </div>
                        </div>
                    </div>
                )}

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

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-1">
                                Login
                            </label>
                            <input
                                id="login"
                                name="login"
                                type="text"
                                autoComplete="username"
                                required
                                value={formData.login}
                                onChange={handleChange}
                                disabled={loading || success}
                                className={`appearance-none relative block w-full px-3 py-2 border ${
                                    error && !formData.login ? 'border-red-300' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200`}
                                placeholder="Enter your login"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading || success}
                                className={`appearance-none relative block w-full px-3 py-2 border ${
                                    error && !formData.email ? 'border-red-300' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200`}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading || success}
                                className={`appearance-none relative block w-full px-3 py-2 border ${
                                    error && !formData.password ? 'border-red-300' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200`}
                                placeholder="Enter password (min. 6 characters)"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={loading || success}
                                className={`appearance-none relative block w-full px-3 py-2 border ${
                                    error && !formData.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200`}
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading || success}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                                loading || success
                                    ? 'bg-indigo-400 cursor-not-allowed'
                                    : 'bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            } transition-colors duration-200`}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Registering...
                                </span>
                            ) : (
                                'Register'
                            )}
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-red-400 hover:text-red-600 transition-colors duration-200"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </form>

                {/*<div className="mt-4 text-center">*/}
                {/*    <p className="text-xs text-gray-500">*/}
                {/*        By registering, you agree to our{' '}*/}
                {/*        <a href="#" className="text-indigo-600 hover:text-indigo-500">*/}
                {/*            Terms of Service*/}
                {/*        </a>{' '}*/}
                {/*        and{' '}*/}
                {/*        <a href="#" className="text-indigo-600 hover:text-indigo-500">*/}
                {/*            Privacy Policy*/}
                {/*        </a>*/}
                {/*    </p>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default RegisterPage;