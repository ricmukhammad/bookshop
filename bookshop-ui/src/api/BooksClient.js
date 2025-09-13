import axios from "axios";

const CATALOG_URL = "http://localhost:8081";

const getBooks = async (currentPage, limitPerPage) => {
    const response = await axios.post(
        `${CATALOG_URL}/v1/public/books/filter?page=${currentPage}&size=${limitPerPage}`,
        {}
    )

    return response.data
}

const getBookById = async (bookId) => {
    const response = await axios.get(`${CATALOG_URL}/v1/public/books/${bookId}`);
    return response.data
}

const getBooksByAuthors = async (authors) => {
    const response = await axios.post(
        `${CATALOG_URL}/v1/public/books/filter?page=0&size=10`,
        { authors }
    );
    return response.data;
};

const searchBooks = async (query) => {
    const response = await axios.get(`${CATALOG_URL}/v1/public/books/search?q=${query}`)
    return response.data
}

export {getBooks, getBookById, getBooksByAuthors, searchBooks};