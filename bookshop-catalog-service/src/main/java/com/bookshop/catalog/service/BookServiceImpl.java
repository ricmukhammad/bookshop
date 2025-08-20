package com.bookshop.catalog.service;

import com.bookshop.catalog.dto.CreateBookParam;
import com.bookshop.catalog.dto.CreateReviewParam;
import com.bookshop.catalog.dto.GetBookParam;
import com.bookshop.catalog.dto.PublicBookResult;
import com.bookshop.catalog.mapper.BookMapper;
import com.bookshop.catalog.model.AudioBook;
import com.bookshop.catalog.model.Book;
import com.bookshop.catalog.model.EBook;
import com.bookshop.catalog.model.ProductType;
import com.bookshop.catalog.model.Review;
import com.bookshop.catalog.model.VideoBook;
import com.bookshop.catalog.repository.BookRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    @Override
    public Page<PublicBookResult> getAll(GetBookParam param, Pageable pageable) {
        return bookRepository.getAllByGetBookParam(param, pageable)
                             .map(bookMapper::bookToPublicBookResult);
    }

    @Override
    public PublicBookResult findBookById(String id) {
        var book = bookRepository.findBookById(id).orElseThrow(
                () -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Book could not be found"));

        return bookMapper.bookToPublicBookResult(book);
    }

    @Override
    public PublicBookResult findBookByIsbn(String isbn) {
        var book = bookRepository.findBookByIsbn(isbn).orElseThrow(
                () -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Book could not be found"));

        return bookMapper.bookToPublicBookResult(book);
    }

    @Override
    public List<PublicBookResult> searchBooks(String text) {
        return bookRepository.searchBooks(text)
                             .stream()
                             .map(bookMapper::bookToPublicBookResult).toList();
    }

    @Override
    public Book saveBook(CreateBookParam param) {
        Book book;

        switch (param.getProductType()) {
            case PAPER -> {
                book = Book.builder()
                           .isbn(param.getIsbn())
                           .title(param.getTitle())
                           .authors(param.getAuthors())
                           .categories(param.getCategories())
                           .price(param.getPrice())
                           .cost(param.getCost())
                           .edition(param.getEdition())
                           .rating(param.getRating())
                           .reviews(param.getReviews())
                           .productType(ProductType.PAPER)
                           .numberOfPages(param.getNumberOfPages())
                           .build();
            }

            case AUDIOBOOK -> {
                book = AudioBook.builder()
                                .isbn(param.getIsbn())
                                .title(param.getTitle())
                                .authors(param.getAuthors())
                                .categories(param.getCategories())
                                .price(param.getPrice())
                                .cost(param.getCost())
                                .edition(param.getEdition())
                                .rating(param.getRating())
                                .reviews(param.getReviews())
                                .productType(ProductType.AUDIOBOOK)
                                .lengthInMinutes(Optional.ofNullable(param.getLengthInMinutes()).orElse(0))
                                .narrator(param.getNarrator())
                                .downloadLink(param.getDownloadLink())
                                .build();
            }
            case EBOOK -> {
                book = EBook.builder()
                            .isbn(param.getIsbn())
                            .title(param.getTitle())
                            .authors(param.getAuthors())
                            .categories(param.getCategories())
                            .price(param.getPrice())
                            .cost(param.getCost())
                            .edition(param.getEdition())
                            .rating(param.getRating())
                            .reviews(param.getReviews())
                            .productType(ProductType.EBOOK)
                            .downloadLink(param.getDownloadLink())
                            .build();
            }

            case VIDEOBOOK -> {
                book = VideoBook.builder()
                                .isbn(param.getIsbn())
                                .title(param.getTitle())
                                .authors(param.getAuthors())
                                .categories(param.getCategories())
                                .price(param.getPrice())
                                .cost(param.getCost())
                                .edition(param.getEdition())
                                .rating(param.getRating())
                                .reviews(param.getReviews())
                                .productType(ProductType.VIDEOBOOK)
                                .resolution(param.getResolution())
                                .format(param.getFormat())
                                .downloadLink(param.getDownloadLink())
                                .build();
            }
            default -> throw new HttpClientErrorException(HttpStatus.BAD_REQUEST,
                                                          "Unsupported product type: " + param.getProductType());
        }
        return bookRepository.save(book);
    }

    @Override
    public Review addReview(String bookId, CreateReviewParam param) {
        Book book = bookRepository.findBookById(bookId).orElseThrow(
                ()-> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Book not found"));
        var review = Review.builder()
                           .userEmail(param.getEmail())
                           .comment(param.getComment())
                           .build();

        if (book.getReviews() == null) {
            book.setReviews(new ArrayList<>());
        }
        book.getReviews().add(review);
        bookRepository.save(book);
        return review;
    }
}
