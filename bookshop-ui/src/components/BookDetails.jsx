import {BookOpenIcon, CalculatorIcon, GlobeAltIcon} from "@heroicons/react/24/outline/index.js";
import React from "react";

const BookDetails = ({book}) => {
    return (
        <div className="border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Product Details</h2>
            <ul className="text-gray-700 space-y-2 text-base">
                <li className="flex items-center">
                    <CalculatorIcon className="h-5 w-5 mr-2 text-gray-500"/>
                    <span className="font-medium mr-2">Year of publication:</span> {book.yearOfPublication}
                </li>
                <li className="flex items-center">
                    <GlobeAltIcon className="h-5 w-5 mr-2 text-gray-500"/>
                    <span className="font-medium mr-2">Language:</span> {book.language}
                </li>
                <li className="flex items-center">
                    <BookOpenIcon className="h-5 w-5 mr-2 text-gray-500"/>
                    <span className="font-medium mr-2">Number of pages:</span> {book.numberOfPages}
                </li>
                <li className="flex items-center">
                    <CalculatorIcon className="h-5 w-5 mr-2 text-gray-500"/>
                    <span className="font-medium mr-2">Weight:</span> {book.weight}
                </li>
            </ul>
        </div>
    )
}

export default BookDetails;