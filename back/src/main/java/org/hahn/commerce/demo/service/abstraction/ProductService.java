package org.hahn.commerce.demo.service.abstraction;

import org.hahn.commerce.demo.entities.Product;

import java.util.List;

public interface ProductService {

    Product findById(long id);

    Product save(Product product);

    Product update(Product product);

    Boolean deleteById(long id);

    List<Product> findAll();
}
