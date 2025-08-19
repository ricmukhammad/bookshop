package com.bookshop.catalog.controller;

import com.bookshop.catalog.dto.CreateBookParam;
import com.bookshop.catalog.mapper.BookMapper;
import com.bookshop.catalog.model.Book;
import com.bookshop.catalog.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/books")
@Tag(name = "Books", description = "Books Resource")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;
    private final BookMapper bookMapper;

    @Operation(summary = "Endpoint that allows to create book")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public Book create(
            @Parameter(description = "Details of the new product") @Valid @RequestBody final CreateBookParam createBookParam) {
        return bookService.saveBook(createBookParam);
    }
}
