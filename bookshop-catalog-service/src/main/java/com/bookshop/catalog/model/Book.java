package com.bookshop.catalog.model;


import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Data
@Document
public class Book {
    @Id
    private String id;
    private String isbn;
    private String title;
    private Set<Author> authors;
    private Set<Category> categories;
    private Double price;
    private Double discountPrice;
    private Double cost;
    private int edition;
    private ProductType productType;
    private int rating;
    private List<Review> reviews;
    private int numberOfPages;
    private String language;
    private int yearOfPublication;
    private int weight;
    private String imageUrl;
    private String description;
    private int loyaltyPointsToEarn;
}


