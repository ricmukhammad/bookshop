import React, {useEffect, useState} from 'react';
import {
    BookOpenIcon,
    ClockIcon,
    LinkIcon,
    ShareIcon,
    ShoppingCartIcon,
    StarIcon,
    TruckIcon
} from '@heroicons/react/24/outline';
import BookDetails from "../components/BookDetails.jsx";
import BookDescription from "../components/BookDescription.jsx";
import OtherBooksByAuthor from "../components/OtherBooksByAuthor.jsx";
import {getBookById, getBooksByAuthors} from "../api/BooksClient.js";
import {useShoppingCart} from "../hooks/ShoppingCartContext.jsx";
import {useParams} from "react-router-dom";
import {addToCart, getTotalPriceOfBooks, isBookExist} from "../utils/cartService.js";
import BookAddedNotification from "../components/BookAddedNotification.jsx";

const BookDetailsPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [book, setBook] = useState();
    const [toastBook, setToastBook] = useState(false);
    const [otherBooksByAuthors, setOtherBooksByAuthors] = useState([]);
    const {setTotalPrice} = useShoppingCart()
    const {id} = useParams()


    useEffect(() => {
        setLoading(true);
        setError(null);

        getBookById(id)
            .then((response) => {
                console.log("Book:", response);
                setBook(response);
                if (response.authors && response.authors.length > 0) {
                    return getBooksByAuthors(response.authors);
                }
            })
            .then((relatedBooks) => {
                if (relatedBooks) {
                    console.log("Other books by authors:", relatedBooks.content);
                    setOtherBooksByAuthors(relatedBooks.content);
                }
            })
            .catch((err) => {
                console.error("Error occurred:", err);
                setError("Failed to load books. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        addToCart(book);
        setTotalPrice(getTotalPriceOfBooks)
        setToastBook(book)
    };

    // Helper to render star rating
    const renderStarRating = (rating) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <StarIcon
                        key={i}
                        className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                    />
                ))}
            </div>
        );
    };

    return (

        <div className="min-h-screen bg-whitep-4 sm:p-8 font-sans antialiased">
            {toastBook && (
                <BookAddedNotification
                    book={toastBook}
                    onClose={() => setToastBook(null)}
                />
            )}
            {loading && (
                <div className="text-center py-20 text-gray-600">Loading books...</div>
            )}

            {error && !loading && (
                <div className="text-center py-20 text-red-600 font-medium">
                    {error}
                </div>
            )}

            {book &&
                <div className="container mx-auto bg-white  p-6 lg:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Book Cover and Actions */}
                        <div className="lg:col-span-1 flex flex-col items-center">
                            <div className="relative mb-6 rounded-lg overflow-hidden shadow-md">
                                <img src={book.imageUrl} alt={book.title}
                                     className="w-48 h-auto object-cover rounded-lg"/>
                                {book.discountPrice &&
                                    <div
                                        className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center shadow-md">
                                        <span className="mr-1">+</span> on sale
                                    </div>
                                }
                            </div>

                            <div className="flex mt-6 space-x-3 w-full max-w-xs justify-center">
                                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                    <ShareIcon className="h-5 w-5 text-gray-600"/>
                                </button>
                                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                    <LinkIcon className="h-5 w-5 text-gray-600"/>
                                </button>
                                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                    <BookOpenIcon className="h-5 w-5 text-gray-600"/>
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            {book.authors.map((author, index) => (
                                <p key={index}
                                   className="text-sm text-gray-500 mb-1">{author.firstName} {author.lastName}</p>
                            ))}
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>

                            <div className="flex items-center mb-6">
                                {renderStarRating(book.rating)}
                                <span className="ml-2 text-sm text-gray-600">({book.reviews.length} reviews)</span>
                            </div>

                            <BookDescription description={book.description}/>

                            <BookDetails book={book}/>
                        </div>

                        {/* Right Column: Pricing and Add to Cart */}
                        <div className="lg:col-span-1">
                            <div className="text-lg mb-4">
                                {book.discountPrice ? (
                                    <p className="line-through text-gray-500 flex items-center">
                                        Original price: {book.price}
                                    </p>
                                ) : (
                                    <p className="text-gray-900 flex items-center">
                                        Price: {book.price}
                                    </p>
                                )}
                                <p className="text-green-700 flex items-center">
                                    Free shipping over 15,000 HUF
                                </p>
                                {book.discountPrice &&
                                    <p className="text-2xl font-bold text-gray-900 mt-2">
                                        Discount price: {book.discountPrice}
                                    </p>}
                            </div>

                            {isBookExist(book) ? (
                                <button
                                    disabled
                                    className="w-full bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg shadow-inner flex items-center justify-center text-lg cursor-not-allowed"
                                >
                                    <ShoppingCartIcon className="h-6 w-6 mr-3 text-gray-500" />
                                    Already in Cart
                                </button>
                            ) : (
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md flex items-center justify-center text-lg"
                                >
                                    <ShoppingCartIcon className="h-6 w-6 mr-3" />
                                    Add to Cart
                                </button>
                            )}

                            <div className="mt-8 p-6 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
                                <h3 className="font-semibold text-gray-800 mb-2">By purchasing this product:</h3>
                                <p className="text-gray-700 mb-4">
                                    You can score: <span
                                    className="font-bold text-green-700">{book.loyaltyPointsToEarn} points</span>
                                </p>
                                <div className="flex items-center bg-gray-100 p-3 rounded-lg text-sm">
                                    <img src="https://placehold.co/30x30/e2e8f0/000000?text=👤" alt="Loyal Customer"
                                         className="rounded-full mr-3"/>
                                    <p className="text-gray-700">
                                        Become our Loyal Customer and get up to <span
                                        className="font-bold">10% back</span> on your card.
                                    </p>
                                </div>
                            </div>

                            {/* Store information section */}
                            <div
                                className="mt-8 p-6 bg-gray-50 rounded-xl shadow-inner border border-gray-200 space-y-4 text-gray-700">
                                <div className="flex items-center">
                                    <ClockIcon
                                        className="h-5 w-5 mr-3 text-gray-500"/> {/* Using ClockIcon for delivery time */}
                                    <span>Personal collection 2-5 days (free)</span>
                                </div>
                                <div className="flex items-center">
                                    <TruckIcon
                                        className="h-6 w-6 mr-3 text-gray-500"/> {/* Using ClockIcon for delivery time */}
                                    <span>Home delivery 2-5 days (Free over 10,000 HUF)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <OtherBooksByAuthor otherBooksByAuthors={otherBooksByAuthors}/>
        </div>
    );
};

export default BookDetailsPage;