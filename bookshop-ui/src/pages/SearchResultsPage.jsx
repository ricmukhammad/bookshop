import { useEffect, useState } from "react";
import {Link, useSearchParams} from "react-router-dom";
import {useShoppingCart} from "../hooks/ShoppingCartContext.jsx";
import {addToCart, getTotalPriceOfBooks, isBookExist} from "../utils/cartService.js";
import {searchBooks} from "../api/BooksClient.js";

export default function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {setTotalPrice} = useShoppingCart()

    const handleAddToCart = (book) =>  {
        addToCart(book);
        setTotalPrice(getTotalPriceOfBooks())
    }

    useEffect(() => {
        if (!query) return;

        setLoading(true);
        setError(null);

        searchBooks(query)
            .then((response) => setBooks(response))
            .catch(() => setError("Failed to fetch search results."))
            .finally(() => setLoading(false));
    }, [query]);

    return (
        <div className="container mx-auto px-6 py-10">
            <h2 className="text-2xl font-bold mb-6">
                Search results for: <span className="text-yellow-700">{query}</span>
            </h2>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && books.length === 0 && (
                <p>No books found matching "{query}".</p>
            )}

            <div className="space-y-6">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="flex border-b pb-4 mb-4 items-start space-x-6"
                    >
                        <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="w-32 h-40 object-cover rounded"
                        />

                        <div className="flex-1">
                            <Link to={`/books/${book.id}`} className="text-lg font-semibold">{book.title}</Link>
                            <p className="text-sm text-gray-600">
                                {book.authors.map((a) => `${a.firstName} ${a.lastName}`).join(", ")}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                {book.yearOfPublication} | {book.language}
                            </p>
                            <p className="text-gray-700 mt-2">{book.description?.slice(0, 120)}...</p>
                        </div>

                        <div className="text-right">
                            {book.discountPrice ? (
                                <>
                                    <p className="line-through text-gray-500 text-sm">
                                        {book.price} $
                                    </p>
                                    <p className="text-lg font-bold text-yellow-700">
                                        {book.discountPrice} $
                                    </p>
                                </>
                            ) : (
                                <p className="text-lg font-bold text-yellow-700">
                                    {book.price} $
                                </p>
                            )}
                            {isBookExist(book) ? (
                                <button
                                    disabled
                                    className="mt-3 bg-gray-300 text-gray-600 py-1.5 px-4 rounded-lg text-sm font-medium cursor-not-allowed"
                                >
                                    Already in Cart
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleAddToCart(book)}
                                    className="mt-3 bg-yellow-700 hover:bg-yellow-800 text-white py-1.5 px-4 rounded-lg text-sm font-medium"
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}