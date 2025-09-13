import { BookOpenIcon } from '@heroicons/react/24/outline';
import {addToCart, getTotalPriceOfBooks, isBookExist} from "../utils/cartService.js";
import {useShoppingCart} from "../hooks/ShoppingCartContext.jsx";
import React, {useState} from "react";
import BookAddedNotification from "./BookAddedNotification.jsx";

const OtherBooksByAuthor = ({otherBooksByAuthors}) => {
    const {setTotalPrice} = useShoppingCart()
    const [toastBook, setToastBook] = useState(false);


    const scrollContainer = (direction) => {
        const container = document.getElementById('book-carousel-container');
        if (container) {
            const scrollAmount = container.clientWidth / 2.5; // Scroll half the width of the container
            if (direction === 'left') {
                container.scrollBy({left: -scrollAmount, behavior: 'smooth'});
            } else {
                container.scrollBy({left: scrollAmount, behavior: 'smooth'});
            }
        }
    };

    const handleAddToCart = (book) => {
        addToCart(book);
        setTotalPrice(getTotalPriceOfBooks)
        setToastBook(book)
    };

    return (
        <div className="min-h-screen bg-white p-4 sm:p-8 font-sans antialiased">
            {toastBook && (
                <BookAddedNotification
                    book={toastBook}
                    onClose={() => setToastBook(null)}
                />
            )}
            <div className="container mx-auto bg-white p-6 lg:p-10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Other books by author</h2>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => scrollContainer('left')}
                            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200 shadow-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                                 stroke="currentColor" className="w-5 h-5 text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
                            </svg>
                        </button>
                        <button
                            onClick={() => scrollContainer('right')}
                            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200 shadow-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                                 stroke="currentColor" className="w-5 h-5 text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    id="book-carousel-container"
                    className="flex overflow-x-scroll scroll-container pb-4 -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10"
                >
                    {otherBooksByAuthors.map((book) => (
                        <div key={book.id}
                             className="flex-none w-40 md:w-40 lg:w-40 mr-6 last:mr-0"> {/* Adjust width and margin as needed */}
                            <div
                                className="bg-white transition-shadow duration-200 h-full flex flex-col pr-2 py-4">
                                <div className="relative mb-4 mx-4 flex-shrink-0">
                                    <img src={book.imageUrl} alt={book.title}
                                         className="w-full h-auto object-cover rounded-md mx-auto"/>
                                    {book.action && (
                                        <div
                                            className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center shadow-md">
                                            <span className="mr-1">+</span> on sale
                                        </div>
                                    )}
                                </div>
                                <div className="flex-grow flex flex-col justify-between">
                                    <div className="flex flex-col h-full">
                                        <h3 className="text-base font-semibold text-gray-800 mb-1 leading-tight">{book.title}</h3>
                                        {book.authors.map((author, index) => (
                                            <p key={index}
                                               className="text-xs text-gray-600 mb-2">{author.firstName} {author.lastName}</p>
                                        ))}
                                        <div className="flex items-center text-blue-600 text-sm mb-3 mt-auto">
                                            <BookOpenIcon className="h-4 w-4 mr-1"/>
                                            <span>Book</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900 mt-auto">{book.onlinePrice}</p>
                                    </div>
                                    {isBookExist(book) ? (
                                        <button
                                            disabled
                                            className="w-full bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-lg shadow-inner text-sm mt-4 cursor-not-allowed"
                                        >
                                            Already in Cart
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleAddToCart(book)}
                                            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm text-sm mt-4"
                                        >
                                            Add to Cart
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OtherBooksByAuthor;