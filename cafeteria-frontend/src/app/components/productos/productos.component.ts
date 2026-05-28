import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CafeteriaService } from '../../services/cafeteria.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, AfterViewInit {
  productos: Producto[] = [];

  constructor(
    private cafeteriaService: CafeteriaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  ngAfterViewInit(): void {
    // Forzar actualización después de que la vista esté lista
    this.cdr.detectChanges();
  }

  cargarProductos(): void {
    this.cafeteriaService.getProductos().subscribe({
      next: (data) => {
        this.productos = [...data]; // Crear nueva referencia
        console.log('✅ Productos cargados:', this.productos.length);
        this.cdr.detectChanges(); // Forzar detección de cambios
      },
      error: (err) => {
        console.error('❌ Error:', err);
      }
    });
  }
}