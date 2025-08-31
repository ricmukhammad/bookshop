const Pagination = ({currentPage, setCurrentPage, totalPages}) => {
    return (
        <div className="flex justify-center mt-8 space-x-2">
            <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-3 py-1 border rounded ${
                        currentPage === i
                            ? "bg-yellow-700 text-white"
                            : "hover:bg-gray-100"
                    }`}
                >
                    {i + 1}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages - 1}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    )
}

export default Pagination;