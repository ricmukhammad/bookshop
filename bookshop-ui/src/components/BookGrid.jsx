import {useEffect, useState} from "react";
import {getBooks} from "../api/BooksClient.js";
import Pagination from "./Pagination.jsx";
import {addToCart, getTotalPriceOfBooks, isBookExist} from "../utils/cartService.js";
import BookAddedNotification from "./BookAddedNotification.jsx";
import {useShoppingCart} from "../hooks/ShoppingCartContext.jsx";
import {Link} from "react-router-dom";

export default function BookGrid() {
    const [books, setBooks] = useState([]);
    const [limitPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [toastBook, setToastBook] = useState(false);
    const {setTotalPrice} = useShoppingCart()

    useEffect(() => {
        setLoading(true);
        setError(null);

        getBooks(currentPage, limitPerPage)
            .then((response) => {
                const allBooks = response.content;
                setBooks(allBooks);
                console.log(allBooks)
                setTotalPages(Math.ceil(response.totalElements / limitPerPage));
            })
            .catch((err) => {
                console.error(`Error occurred when fetching books: ${err}`);
                setError("Failed to load books. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });

        window.scrollTo({top: 0, behavior: "smooth"});
    }, [currentPage, limitPerPage]);


    const handleAddToCart = (book) =>  {
        addToCart(book);
        setTotalPrice(getTotalPriceOfBooks())
        setToastBook(book)
    }

    return (
        <div className="container mx-auto px-6 py-10">
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
            {!loading && !error && (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex flex-col"
                            >
                                <Link to={`/books/${book.id}`}>
                                    <img
                                        src={book.imageUrl}
                                        alt={book.title}
                                        className="h-48 object-contain mb-3 cursor-pointer"
                                    />
                                </Link>

                                <h3 className="font-semibold text-sm leading-snug mb-1">
                                    <Link
                                        to={`/books/${book.id}`}
                                        className="hover:underline hover:text-yellow-700"
                                    >
                                        {book.title}
                                    </Link>
                                </h3>
                                {book.authors.map((author, index) => (
                                    <p key={index}
                                       className="text-xs text-gray-600 mb-2">{author.firstName} {author.lastName}</p>
                                ))}


                                <div className="mt-auto">
                                    <p className="text-sm font-medium text-gray-800 mb-3">
                                        Price:{" "}
                                        <span className="font-bold text-yellow-600">{book.price} $</span>
                                    </p>
                                    {isBookExist(book) ? (
                                        <button
                                            disabled
                                            className="w-full bg-gray-300 text-gray-600 py-1.5 rounded-md text-sm font-medium cursor-not-allowed"
                                        >
                                            Already in Cart
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleAddToCart(book)}
                                            className="w-full bg-yellow-700 hover:bg-yellow-800 text-white py-1.5 rounded-md text-sm font-medium"
                                        >
                                            Add to Cart
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}/>
                </>
            )}
        </div>
    );
}