package com.bookshop.catalog.dto;

import com.bookshop.catalog.model.Author;
import com.bookshop.catalog.model.Category;
import com.bookshop.catalog.model.ProductType;
import com.bookshop.catalog.model.Review;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PublicBookResult {
    private String id;
    private String isbn;
    private String title;
    private Set<Author> authors;
    private Set<Category> categories;
    private Double price;
    private int edition;
    private ProductType productType;
    private int rating;
    private List<Review> reviews;
}
