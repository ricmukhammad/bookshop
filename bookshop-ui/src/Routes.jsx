import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from "./components/Footer.jsx";
import Navbar from "./components/NavBar.jsx";
import BookDetailPage from "./pages/BookDetailsPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import SearchResultsPage from "./pages/SearchResultsPage.jsx";

export const RoutesController = () => {
    return (
        <Router>
            <Navbar/>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/books/:id" element={<BookDetailPage/>}/>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/register"} element={<RegisterPage/>}/>
                    <Route path={"/search"} element={<SearchResultsPage/>}/>
                </Routes>
            <Footer/>
        </Router>
    );
}