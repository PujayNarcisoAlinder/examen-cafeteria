package com.examen.backend.config;

import com.examen.backend.entity.Producto;
import com.examen.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final ProductoRepository productoRepository;

    public DataLoader(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (productoRepository.count() == 0) {
            productoRepository.save(new Producto(null, "Café Americano", "Bebidas", 2.50, 10));
            productoRepository.save(new Producto(null, "Latte", "Bebidas", 3.50, 5));
            productoRepository.save(new Producto(null, "Sándwich de pollo", "Comidas", 5.00, 0));
            productoRepository.save(new Producto(null, "Croissant", "Panadería", 2.00, 8));
            productoRepository.save(new Producto(null, "Jugo Natural", "Bebidas", 3.00, 3));
            System.out.println("✅ Productos de prueba insertados");
        }
    }
}