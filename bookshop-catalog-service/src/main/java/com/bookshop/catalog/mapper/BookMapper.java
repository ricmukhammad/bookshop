package com.bookshop.catalog.mapper;

import com.bookshop.catalog.dto.CreateBookParam;
import com.bookshop.catalog.dto.PublicBookResult;
import com.bookshop.catalog.model.Book;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookMapper {
    PublicBookResult bookToPublicBookResult(Book book);
    Book createBookParamToBook(CreateBookParam createBookParam);
}
