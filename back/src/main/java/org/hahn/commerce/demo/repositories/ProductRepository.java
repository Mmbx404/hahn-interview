package org.hahn.commerce.demo.repositories;

import org.hahn.commerce.demo.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
