import './App.css'
import GoogleLoginButton from "./auth.jsx";
import {useState} from "react";
import HeroImageSlider from "./components/HeroImageSlider.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/NavBar.jsx";

function App() {
    // <>
    //   <GoogleLoginButton/>
    // </>
    const [books] = useState([
        {id: 1, title: "The Silent Library", author: "Jane Doe"},
        {id: 2, title: "Echoes of Knowledge", author: "John Smith"},
        {id: 3, title: "The Paperbound Dreams", author: "Emily Clark"},
        {id: 4, title: "Whispers of Time", author: "Mark Twain"},
    ]);

    const [open, setOpen] = useState(false);


    return (
        <div className="">
            <Navbar/>

            {/* Hero */}
            <div className="bg-white text-white py-20">
                <div className="container mx-auto">
                    <HeroImageSlider/>
                </div>
            </div>

            {/* Book Grid */}
            <main className="flex-1 container mx-auto px-6 py-12">
                <h3 className="text-2xl font-semibold text-brand-text mb-6">Featured Books</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <BookCard book={book}/>
                    ))}
                </div>
            </main>

            {/* Footer */}
            {/*<footer className="bg-brand-primary-yellow text-white text-center py-6 mt-12">*/}
            {/*    <p className="text-sm">&copy; {new Date().getFullYear()} My Bookshop. All rights reserved.</p>*/}
            {/*</footer>*/}
            <Footer/>
        </div>
    );
}

export default App
