import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

import Layout from "./components/Layout.jsx";
import HomePage from "./components/HomePage.jsx";
import GuidesPage from "./components/GuidesPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import RippleGrid from './components/RippleGrid.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/guides" element={<GuidesPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App