import React, {useState} from "react";

const BookDescription = ({description}) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };
    return (
        <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Book Description</h2>
            <p className="text-gray-700 leading-relaxed text-base">
                {showFullDescription ? description : `${description.substring(0, 200)}...`}
            </p>
            <button onClick={toggleDescription} className="text-blue-600 text-sm font-medium mt-2 hover:underline">
                {showFullDescription ? 'Show less' : '+ Show more'}
            </button>
        </div>
    )
}

export default BookDescription;