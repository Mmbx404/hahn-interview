package org.hahn.commerce.demo.rest;

import org.hahn.commerce.demo.entities.Product;
import org.hahn.commerce.demo.service.abstraction.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAll() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product, Authentication auth) {
        return ResponseEntity.ok(productService.save(product));
    }

    @PatchMapping()
    public ResponseEntity<Product> update(@RequestBody Product updated, Authentication auth) {
        return ResponseEntity.ok(productService.update(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Long id, Authentication auth) {
        return ResponseEntity.ok(productService.deleteById(id));
    }
}
