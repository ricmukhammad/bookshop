package com.bookshop.catalog.repository;

import com.bookshop.catalog.model.Book;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookRepository extends MongoRepository<Book, String>, BookRepositoryCustom {
    Optional<Book> findBookById(String id);
    Optional<Book> findBookByIsbn(String isbn);
}
