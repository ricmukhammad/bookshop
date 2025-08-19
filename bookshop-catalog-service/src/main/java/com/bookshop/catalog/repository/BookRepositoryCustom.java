package com.bookshop.catalog.repository;

import com.bookshop.catalog.dto.GetBookParam;
import com.bookshop.catalog.model.Book;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookRepositoryCustom {
    Page<Book> getAllByGetBookParam(GetBookParam param, Pageable pageable);
    List<Book> searchBooks(String text);
}
