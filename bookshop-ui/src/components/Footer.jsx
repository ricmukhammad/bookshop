// src/components/Footer.jsx
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#f5f3ef] text-gray-700 pt-12 border-t border-gray-200">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Top section */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                    {/* Brand + Newsletter */}
                    <div className="md:col-span-2">
                        <h1 className="text-3xl font-bold">
                            <span className="text-yellow-700">Book</span>Nook
                        </h1>
                        <p className="mt-4 font-medium">
                            Legyen mindig képben az irodalommal!
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                            Iratkozzon fel legfrissebb híreinkért!
                        </p>

                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Email cím"
                                className="w-full p-2 border border-gray-400 focus:outline-none"
                            />
                            <button className="px-4 py-2 bg-black text-white font-semibold hover:bg-gray-800">
                                Feliratkozás
                            </button>
                        </form>

                        {/* Social Icons */}
                        <div className="flex space-x-4 mt-6 text-2xl text-gray-600">
                            <FaFacebookF className="hover:text-black cursor-pointer" />
                            <FaYoutube className="hover:text-black cursor-pointer" />
                            <FaInstagram className="hover:text-black cursor-pointer" />
                            <FaLinkedinIn className="hover:text-black cursor-pointer" />
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-bold mb-3">Libri</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">Rólunk</a></li>
                            <li><a href="#" className="hover:underline">Karrier</a></li>
                            <li><a href="#" className="hover:underline">Impresszum</a></li>
                            <li><a href="#" className="hover:underline">Társadalmi felelősségvállalás</a></li>
                            <li><a href="#" className="hover:underline">Adományozás</a></li>
                            <li><a href="#" className="hover:underline">Fenntarthatóság</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-3">Törzsvásárlói Program</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">Programunkról</a></li>
                            <li><a href="#" className="hover:underline">Kártya egyenlege</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-3">Szolgáltatás</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">Boltkereső</a></li>
                            <li><a href="#" className="hover:underline">Fizetés és szállítás</a></li>
                            <li><a href="#" className="hover:underline">Ajándékkártya</a></li>
                            <li><a href="#" className="hover:underline">Könyvkereső</a></li>
                            <li><a href="#" className="hover:underline">Ügyfélszolgálat</a></li>
                            <li><a href="#" className="hover:underline">Libri applikáció</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-6 border-t border-gray-300 text-sm text-gray-500 flex flex-col md:flex-row justify-between">
                    <div className="space-x-4">
                        <a href="#" className="hover:underline">ÁSZF</a>
                        <a href="#" className="hover:underline">Adatvédelem</a>
                        <a href="#" className="hover:underline">Oldaltérkép</a>
                        <a href="#" className="hover:underline">Süti beállítások</a>
                    </div>
                    <p className="mt-4 md:mt-0">© 2025 Könyvesbolt. Minden jog fenntartva!</p>
                </div>
            </div>
        </footer>
    );
}