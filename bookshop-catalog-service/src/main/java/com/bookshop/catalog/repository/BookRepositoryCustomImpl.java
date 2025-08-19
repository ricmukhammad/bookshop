package com.bookshop.catalog.repository;

import static com.bookshop.catalog.utils.Constants.AUTHORS_FIRST_NAME;
import static com.bookshop.catalog.utils.Constants.AUTHORS_LAST_NAME;
import static com.bookshop.catalog.utils.Constants.CATEGORIES;
import static com.bookshop.catalog.utils.Constants.PRODUCT_TYPE;

import com.bookshop.catalog.dto.GetBookParam;
import com.bookshop.catalog.model.Book;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.core.query.TextQuery;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.util.CollectionUtils;

@RequiredArgsConstructor
public class BookRepositoryCustomImpl implements BookRepositoryCustom {
    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Book> getAllByGetBookParam(GetBookParam param, Pageable pageable) {
        var criteriaList = createCriteria(param);
        var query = new Query();
        criteriaList.forEach(query::addCriteria);
        return PageableExecutionUtils.getPage(
                mongoTemplate.find(query.with(pageable), Book.class),
                pageable,
                () -> mongoTemplate.count(query.limit(-1).skip(-1), Book.class));
    }

    @Override
    public List<Book> searchBooks(String text) {
        TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(text);
        Query query = TextQuery.queryText(criteria).sortByScore();
        return mongoTemplate.find(query, Book.class);
    }

    private ArrayList<Criteria> createCriteria(GetBookParam param) {
        var criteriaList = new ArrayList<Criteria>();

        if (!CollectionUtils.isEmpty(param.getCategories())) {
            criteriaList.add(Criteria.where(CATEGORIES).all(param.getCategories()));
        }
        if (Objects.nonNull(param.getProductType())) {
            criteriaList.add(Criteria.where(PRODUCT_TYPE).is(param.getProductType().toUpperCase()));
        }
        if (Objects.nonNull(param.getAuthor().getFirstName())) {
            criteriaList.add(Criteria.where(AUTHORS_FIRST_NAME).is(param.getAuthor().getFirstName()));
        }
        if (Objects.nonNull(param.getAuthor().getLastName())) {
            criteriaList.add(Criteria.where(AUTHORS_LAST_NAME).is(param.getAuthor().getLastName()));
        }
        return criteriaList;
    }
}
