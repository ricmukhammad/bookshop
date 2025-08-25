import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookDetailsPageInfoTable from "../components/BookDetailsPageInfoTable.jsx";

export default function BookDetailsPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        // TODO: replace with your API call
        // fetch(`/api/books/${id}`).then(res => res.json()).then(setBook);
        setBook({
            id,
            isbn: "123456789",
            title: "Önbizalom",
            authors: [{ firstName: "Roxie", lastName: "Nafousi" }],
            categories: ["SELF-HELP", "PSYCHOLOGY"],
            price: 18.99,
            edition: 1,
            productType: "PAPER",
            rating: 4,
            reviews: [],
            language: "Hungarian",
            yearOfPublication: 2024,
            numberOfPages: 220,
            imageUrl: "https://placehold.co/300x400/png",
        });
    }, [id]);

    if (!book) return <p>Loading...</p>;

    return (
        <div className="bg-brand-background min-h-screen py-12">
            <div className="container mx-auto px-6 flex flex-col md:flex-row gap-12">
                {/* Left: Book Cover */}
                <div className="flex-shrink-0">
                    <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-72 md:w-80 rounded-lg shadow-lg"
                    />
                </div>

                {/* Right: Book Info */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-brand-primary-yellow mb-2">{book.title}</h1>
                    <p className="text-lg text-brand-textMuted mb-4">
                        by {book.authors.map(a => `${a.firstName} ${a.lastName}`).join(", ")}
                    </p>

                    {/*<div className="space-y-1 mb-6 text-brand-text">*/}
                    {/*    <p><span className="font-medium">Language:</span> {book.language}</p>*/}
                    {/*    <p><span className="font-medium">Year:</span> {book.yearOfPublication}</p>*/}
                    {/*    <p><span className="font-medium">Pages:</span> {book.numberOfPages}</p>*/}
                    {/*    <p><span className="font-medium">Categories:</span> {book.categories.join(", ")}</p>*/}
                    {/*    <p><span className="font-medium">ISBN:</span> {book.isbn}</p>*/}
                    {/*</div>*/}

                    <BookDetailsPageInfoTable book={book}/>

                    {/* Price + Cart Button */}
                    <div className="flex items-center gap-4 mb-8">
                        <p className="text-3xl font-bold text-brand-secondary">
                            {book.price.toFixed(2)} €
                        </p>
                        <button className="bg-brand-primary-yellow hover:bg-brand-primary-yellowDark text-white px-6 py-3 rounded-lg font-semibold shadow-md">
                            🛒 Add to Cart
                        </button>
                    </div>

                    {/* Tabs (Description / Reviews / Details) */}
                    <div>
                        <div className="border-b border-gray-300 mb-4 flex gap-6">
                            <button className="pb-2 border-b-2 border-brand-primary-yellow font-medium">
                                Description
                            </button>
                            <button className="pb-2 text-gray-500 hover:text-brand-primary-yellow">
                                Reviews
                            </button>
                            <button className="pb-2 text-gray-500 hover:text-brand-primary-yellow">
                                Details
                            </button>
                        </div>

                        <div>
                            <p className="text-brand-text leading-relaxed">
                                {/* TODO: replace with actual description field */}
                                This book is a transformative journey into self-confidence and resilience,
                                offering readers practical tools to navigate modern challenges.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}