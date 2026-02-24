import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

import Layout from "./components/Layout.jsx";
import HomePage from "./components/HomePage.jsx";
import GuidesPage from "./components/GuidesPage.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/guides" element={<GuidesPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App