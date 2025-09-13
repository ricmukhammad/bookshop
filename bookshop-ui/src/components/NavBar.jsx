import {useState} from "react";
import {FaBars, FaSearch, FaShoppingBag, FaTimes} from "react-icons/fa";
import {useShoppingCart} from "../hooks/ShoppingCartContext.jsx";
import {useAuth} from "../hooks/AuthContext.jsx";
import ProfileDropdown from "./ProfileDropdown.jsx";
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar.jsx";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const {setShowShoppingCart, totalPrice} = useShoppingCart()
    const {user, logout} = useAuth();

    const navLinks = [
        "Books",
        "E-books",
        "Audiobooks",
        "Antiquarian",
        "Promotions",
        "Bestsellers",
        "New Releases",
        "Information",
    ];

    return (
        <header className="w-full border-b border-gray-200">
            {/* Top Row */}
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <div className="text-3xl font-bold">
                    <span className="text-yellow-700">Nook</span>Book
                </div>

                {/* Search (hidden on mobile) */}
                {/*<div className="hidden md:flex flex-1 mx-6 max-w-2xl">*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        placeholder="Search..."*/}
                {/*        className="flex-1 border border-gray-300 px-4 py-2 focus:outline-none bg-gray-50"*/}
                {/*    />*/}
                {/*    <button className="px-4 bg-yellow-700 text-white hover:bg-yellow-800">*/}
                {/*        <FaSearch/>*/}
                {/*    </button>*/}
                {/*</div>*/}
                <SearchBar/>

                <div className="flex items-center space-x-6">
                    {user ? (
                        <ProfileDropdown/>
                    ) : (
                        <div>
                            <Link to="/login" className="hidden md:inline text-sm text-gray-700 hover:underline">
                                Login
                            </Link>
                            <span className="hidden md:inline text-sm text-gray-700">/</span>
                            <Link to="/register" className="hidden md:inline text-sm text-gray-700 hover:underline">
                                Register
                            </Link>
                        </div>
                    )}
                    <div
                        className="relative flex items-center space-x-2 cursor-pointer"
                        onClick={() => setShowShoppingCart(true)}
                    >
                        <FaShoppingBag className="text-2xl text-gray-700"/>
                        <span className="hidden md:inline text-sm font-semibold">{totalPrice} $</span>
                    </div>

                    {/* Hamburger (mobile only) */}
                    <button
                        className="md:hidden text-2xl text-gray-700"
                        onClick={() => setMobileOpen(true)}
                    >
                        <FaBars/>
                    </button>
                </div>
            </div>

            {/* Bottom Nav (desktop only) */}
            <nav className="hidden md:flex container mx-auto space-x-6 py-3 px-6 text-sm font-semibold text-gray-800">
                {navLinks.map((link) => (
                    <a key={link} href="#" className="hover:text-yellow-700">
                        {link}
                    </a>
                ))}
            </nav>

            {/* Mobile Menu Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-opacity-50 z-50 flex">
                    <div className="bg-white w-64 h-full shadow-lg p-6 flex flex-col">
                        {/* Close button */}
                        <button
                            className="self-end mb-6 text-2xl text-gray-600"
                            onClick={() => setMobileOpen(false)}
                        >
                            <FaTimes/>
                        </button>

                        {/* Search on mobile */}
                        <div className="flex mb-6">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="flex-1 border border-gray-300 px-2 py-2 focus:outline-none bg-gray-50"
                            />
                            <button className="px-2 bg-yellow-700 text-white hover:bg-yellow-800">
                                <FaSearch/>
                            </button>
                        </div>

                        {/* Links */}
                        <nav className="flex flex-col space-y-4 text-gray-800 font-medium">
                            {navLinks.map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="hover:text-yellow-700"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link}
                                </a>
                            ))}
                        </nav>

                        {!user &&
                            <div className="mt-8 border-t pt-4 space-y-2">
                                <a href="#" className="block text-gray-700 hover:underline">
                                    Login
                                </a>
                                <a href="#" className="block text-gray-700 hover:underline">
                                    Register
                                </a>
                            </div>
                        }
                    </div>

                    {/* Clicking outside closes drawer */}
                    <div className="flex-1" onClick={() => setMobileOpen(false)}/>
                </div>
            )}
        </header>
    );
}