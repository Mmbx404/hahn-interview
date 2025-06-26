package org.hahn.commerce.demo.service.implementation;

import jakarta.persistence.EntityNotFoundException;
import org.hahn.commerce.demo.entities.Product;
import org.hahn.commerce.demo.repositories.ProductRepository;
import org.hahn.commerce.demo.service.abstraction.ProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product findById(long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Product save(Product product) {
        product.setCreatedAt(Instant.now());
        product.setUpdatedAt(Instant.now());
        return productRepository.save(product);
    }

    @Override
    public Product update(Product product) {
        Product originalProduct = productRepository.findById(product.getId()).orElseThrow(() -> new EntityNotFoundException("Product Does not exist"));
        BeanUtils.copyProperties(product, originalProduct, "id", "createdAt", "updatedAt");
        originalProduct.setUpdatedAt(Instant.now());
        return save(originalProduct);
    }

    @Override
    public Boolean deleteById(long id) {
        if (!productRepository.existsById(id)) {
            return false;
        }
        productRepository.deleteById(id);
        return true;
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }
}
