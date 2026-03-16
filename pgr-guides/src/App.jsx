import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

import Layout from "./components/Layout.jsx";
import HomePage from "./components/home/HomePage.jsx";
import GuidesPage from "./components/guide/GuidesPage.jsx";
import LoginPage from "./components/auth/LoginPage.jsx";
import RegisterPage from "./components/auth/RegisterPage.jsx";
import ProfilePage from "./components/profile/ProfilePage.jsx";
import MyGuidesPage from "./components/guide/MyGuidesPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/guides" element={<GuidesPage />} />
                    <Route path="/my-guides" element={<MyGuidesPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App