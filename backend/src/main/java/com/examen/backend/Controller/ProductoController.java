package com.examen.backend.Controller;

import com.examen.backend.entity.Producto;
import com.examen.backend.service.ProductoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "https://examen-cafeteria.vercel.app")
public class ProductoController {
    private final ProductoService productoService;
    
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }
    
    @GetMapping
    public List<Producto> obtenerProductos() {
        return productoService.obtenerTodos();
    }
    
    @GetMapping("/{id}")
    public Producto obtenerProducto(@PathVariable Long id) {
        return productoService.obtenerPorId(id);
    }
}