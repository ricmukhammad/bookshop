package com.bookshop.catalog.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.bookshop.catalog.dto.GetBookParam;
import com.bookshop.catalog.dto.PublicBookResult;
import com.bookshop.catalog.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/public/books")
@RequiredArgsConstructor
public class PublicBookController {

    private final BookService bookService;

    @Operation(
            summary = "Endpoint that allows to get public book by id",
            description = "No authorization is required. Returned data has limited, publicly allowed information on the book"
    )
    @GetMapping(value = "/{book_id}", produces = {APPLICATION_JSON_VALUE})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public PublicBookResult getById(@Parameter(description = "Book id")
                          @PathVariable("book_id") String bookId) {
        return bookService.findBookById(bookId);
    }

    @Operation(
            summary = "Endpoint that allows to get public books filtered by params",
            description = "No authorization is required. Returned data has limited, publicly allowed information on the products"
    )
    @PostMapping("/books/filter")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public Page<PublicBookResult> getAllByParams(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Public product filter parameters")
            @RequestBody GetBookParam productParam,
            @ParameterObject Pageable pageable) {
        return bookService.getAll(productParam, pageable);
    }

    @GetMapping("/search")
    public List<PublicBookResult> searchBooks(@RequestParam("q") String query) {
        return bookService.searchBooks(query);
    }


//    @Operation(
//            summary = "Endpoint that allows to get public book by isbn",
//            description = "No authorization is required. Returned data has limited, publicly allowed information on the book"
//    )
//    @GetMapping(value = "/{isbn}", produces = {APPLICATION_JSON_VALUE})
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Ok"),
//            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
//            @ApiResponse(responseCode = "404", description = "Not found", content = @Content),
//            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
//    })
//    public PublicBookResult getByIsbn(@Parameter(description = "Book isbn")
//                                    @PathVariable("isbn") String isbn) {
//        return bookService.findBookById(isbn);
//    }
}
