import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.page.html',
  styleUrls: ['./departamentos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DepartamentosPage {
  searchTerm: string = '';

  departamentos = [
    { numero: '101', nombre: 'Carlos Pérez', telefono: '+56 9 3456 1234', correo: 'carlos@mail.com', estadoPago: 'Al día' },
    { numero: '102', nombre: 'María López', telefono: '+56 9 8123 4567', correo: 'maria@mail.com', estadoPago: 'Pendiente' },
    { numero: '103', nombre: 'Vacante', telefono: '-', correo: '-', estadoPago: 'Vacío' },
    { numero: '201', nombre: 'Pedro Díaz', telefono: '+56 9 9123 7890', correo: 'pedro@mail.com', estadoPago: 'Moroso' },
    { numero: '202', nombre: 'Ana Soto', telefono: '+56 9 6789 2345', correo: 'ana@mail.com', estadoPago: 'Al día' }
  ];

  departamentosFiltrados = [...this.departamentos];

  get totalOcupados() {
    return this.departamentos.filter(d => d.estadoPago !== 'Vacío').length;
  }

  get totalVacios() {
    return this.departamentos.filter(d => d.estadoPago === 'Vacío').length;
  }

  get totalMorosos() {
    return this.departamentos.filter(d => d.estadoPago === 'Moroso').length;
  }

  filtrarDepartamentos() {
    const term = this.searchTerm.toLowerCase();
    this.departamentosFiltrados = this.departamentos.filter(d =>
      d.numero.toLowerCase().includes(term) || d.nombre.toLowerCase().includes(term)
    );
  }
}
