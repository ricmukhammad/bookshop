package com.bookshop.catalog.dto;

import com.bookshop.catalog.model.Author;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Details of book for filtering purposes")
public class GetBookParam {
    private String productType;
    private Set<String> categories;
    private Author author;
}
