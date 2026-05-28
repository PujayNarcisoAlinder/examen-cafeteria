package com.examen.backend.service;

import com.examen.backend.entity.Pedido;
import com.examen.backend.entity.Producto;
import com.examen.backend.repository.PedidoRepository;
import com.examen.backend.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;
    
    public PedidoService(PedidoRepository pedidoRepository, ProductoRepository productoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.productoRepository = productoRepository;
    }
    
    public Pedido registrarPedido(Pedido pedido) {
        Producto producto = productoRepository.findById(pedido.getProductoId())
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        // Validar stock
        if (producto.getStock() < pedido.getCantidad()) {
            throw new RuntimeException("Stock insuficiente");
        }
        
        // Actualizar stock
        producto.setStock(producto.getStock() - pedido.getCantidad());
        productoRepository.save(producto);
        
        // Completar pedido
        pedido.setNombreProducto(producto.getNombre());
        pedido.setFechaPedido(LocalDateTime.now());
        
        return pedidoRepository.save(pedido);
    }
}