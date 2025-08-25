const BookCard = ({book}) => {
    const {id, title, author} = book;
    return (
        <div
            key={id}
            className="bg-brand-surface shadow-lg rounded-2xl p-4 hover:shadow-xl transition flex flex-col"
        >
            <img
                src={"https://placehold.co/600x400/png"}
                alt={title}
                className="w-full h-56 object-cover rounded-xl mb-4"
            />
            <h4 className="text-lg font-bold text-brand-primary-yellow mb-1">{title}</h4>
            <p className="text-brand-textMuted mb-4">by {author}</p>

            {/* Action Buttons */}
            <div className="mt-auto flex gap-2">
                <button
                    className="flex-1 bg-brand-primary-yellow text-white py-2 rounded-lg hover:bg-brand-primary-yellowDark transition">
                    View Details
                </button>
                <button
                    onClick={() => {
                    }}
                    className="flex-1 bg-brand-secondary text-white py-2 rounded-lg hover:bg-brand-secondaryDark transition"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
export default BookCard;