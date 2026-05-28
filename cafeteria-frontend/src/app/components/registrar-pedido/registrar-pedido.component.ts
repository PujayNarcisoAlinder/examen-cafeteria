import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CafeteriaService } from '../../services/cafeteria.service';
import { Producto } from '../../models/producto.model';
import { Pedido } from '../../models/pedido.model';

@Component({
  selector: 'app-registrar-pedido',
  standalone: false,
  templateUrl: './registrar-pedido.component.html',
  styleUrls: ['./registrar-pedido.component.css']
})
export class RegistrarPedidoComponent implements OnInit {
  productos: Producto[] = [];
  pedido: Pedido = {
    nombreEstudiante: '',
    productoId: 0,
    cantidad: 1,
    observacion: ''
  };
  mensajeConfirmacion: string = '';

  constructor(
    private cafeteriaService: CafeteriaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cafeteriaService.getProductos().subscribe({
      next: (data: Producto[]) => {
        this.productos = [...data];
        this.cdr.detectChanges();
        console.log('✅ Productos cargados en formulario:', this.productos.length);
      },
      error: (error: any) => {
        console.error('Error al cargar productos:', error);
        this.mensajeConfirmacion = 'Error al cargar productos';
      }
    });
  }

  onSubmit(): void {
    // Validar que se haya seleccionado un producto
    if (this.pedido.productoId === 0) {
      this.mensajeConfirmacion = '❌ Debe seleccionar un producto';
      setTimeout(() => {
        this.mensajeConfirmacion = '';
      }, 2000);
      return;
    }

    this.cafeteriaService.registrarPedido(this.pedido).subscribe({
      next: (response: any) => {
        console.log('Pedido exitoso:', response);
        this.mensajeConfirmacion = `✅ ¡Pedido registrado exitosamente para ${this.pedido.nombreEstudiante}!`;
        
        // Limpiar formulario
        this.pedido = {
          nombreEstudiante: '',
          productoId: 0,
          cantidad: 1,
          observacion: ''
        };
        
        setTimeout(() => {
          this.mensajeConfirmacion = '';
        }, 3000);
        
        // Recargar productos para actualizar stock
        this.cargarProductos();
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('❌ Error completo:', error);
        if (error.error && error.error.message) {
          this.mensajeConfirmacion = `❌ Error: ${error.error.message}`;
        } else {
          this.mensajeConfirmacion = '❌ Error al registrar el pedido';
        }
        setTimeout(() => {
          this.mensajeConfirmacion = '';
        }, 3000);
      }
    });
  }
}