package com.bookshop.catalog.dto;

import com.bookshop.catalog.model.Author;
import com.bookshop.catalog.model.Category;
import com.bookshop.catalog.model.ProductType;
import com.bookshop.catalog.model.Review;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Details of product for creation")
public class CreateBookParam {

    @NotBlank
    private String isbn;
    @NotBlank
    private String title;
    @ArraySchema(schema = @Schema(description = "Authors of a book"))
    private Set<Author> authors;
    @ArraySchema(schema = @Schema(description = "Categories of a book"))
    private Set<Category> categories;
    private Double price;
    private int edition;
    @Builder.Default
    private int rating = 0;
    @ArraySchema(schema = @Schema(description = "Reviews of a book"))
    private List<Review> reviews;
    private Double cost;
    @NotNull
    private ProductType productType;
    private int numberOfPages;
    @NotBlank
    private String language;
    private int yearOfPublication;
    private String imageUrl;
    private String description;


    // AUDIOBOOK-specific fields
    private Integer lengthInMinutes;
    private String narrator;

    // EBOOK-specific fields
    private String downloadLink;

    // VIDEOBOOK-specific fields
    private String resolution;
    private String format;
}
