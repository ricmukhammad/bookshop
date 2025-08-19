package com.bookshop.catalog.service;

import com.bookshop.catalog.dto.CreateBookParam;
import com.bookshop.catalog.dto.GetBookParam;
import com.bookshop.catalog.dto.PublicBookResult;
import com.bookshop.catalog.model.Book;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookService {
    Page<PublicBookResult> getAll(GetBookParam param, Pageable pageable);
    PublicBookResult findBookById(String id);
    List<PublicBookResult> searchBooks(String text);
    PublicBookResult findBookByIsbn(String isbn);
    Book saveBook(CreateBookParam book);
}
