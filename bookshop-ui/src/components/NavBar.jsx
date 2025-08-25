import { FaSearch, FaShoppingBag } from "react-icons/fa";

export default function Navbar() {
    return (
        <header className="w-full border-b border-gray-200">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <div className="text-3xl font-bold">
                    <span className="text-yellow-700">Book</span>Nook
                </div>

                {/* Search */}
                <div className="flex flex-1 mx-6 max-w-2xl">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-1 border border-gray-300 px-4 py-2 focus:outline-none bg-gray-50"
                    />
                    <button className="px-4 bg-yellow-700 text-white hover:bg-yellow-800">
                        <FaSearch />
                    </button>
                </div>

                {/* User + Cart */}
                <div className="flex items-center space-x-6">
                    <a href="#" className="text-sm text-gray-700 hover:underline">
                        Login
                    </a>
                    <a href="#" className="text-sm text-gray-700 hover:underline">
                        Register
                    </a>
                    <div className="relative flex items-center space-x-2">
                        <FaShoppingBag className="text-2xl text-gray-700" />
                        <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1.5">
              1
            </span>
                        <span className="text-sm font-semibold">6,165 Ft</span>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <nav className="container mx-auto flex space-x-6 py-3 px-6 text-sm font-semibold text-gray-800">
                <a href="#" className="hover:text-yellow-700">Books</a>
                <a href="#" className="hover:text-yellow-700">E-books</a>
                <a href="#" className="hover:text-yellow-700">Audiobooks</a>
                <a href="#" className="hover:text-yellow-700">Antiquarian</a>
                <a href="#" className="hover:text-yellow-700">Promotions</a>
                <a href="#" className="hover:text-yellow-700">Bestsellers</a>
                <a href="#" className="hover:text-yellow-700">New Releases</a>
                <a href="#" className="hover:text-yellow-700">Information</a>
            </nav>
        </header>
    );
}