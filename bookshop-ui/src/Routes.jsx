import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from "./components/Footer.jsx";
import Navbar from "./components/NavBar.jsx";
import BookDetailPage from "./pages/BookDetailsPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";

export const RoutesController = () => {
    return (
        <Router>
            <Navbar/>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/books/:id" element={<BookDetailPage/>}/>
                </Routes>
            <Footer/>
        </Router>
    );
}