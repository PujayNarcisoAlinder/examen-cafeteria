package com.examen.backend.Controller;

import com.examen.backend.entity.Pedido;
import com.examen.backend.service.PedidoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "https://examen-cafeteria.vercel.app")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public Pedido registrarPedido(@RequestBody Pedido pedido) {
        return pedidoService.registrarPedido(pedido);
    }
}