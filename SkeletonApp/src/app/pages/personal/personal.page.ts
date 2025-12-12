import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol,
  IonChip, IonList, IonItem, IonLabel, IonBadge, IonAvatar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, IonChip, IonList,
    IonItem, IonLabel, IonBadge, IonAvatar
  ]
})
export class PersonalPage {

  trabajadoresActivos = 8;
  trabajadoresLicencia = 2;
  trabajadoresInactivos = 1;

  trabajadores = [
    {
      nombre: 'Juan López',
      cargo: 'Conserje',
      telefono: '+56 9 8745 3221',
      horario: '08:00 - 16:00',
      estado: 'Activo',
      estadoColor: 'success',
      foto: 'https://cdn-icons-png.flaticon.com/512/1995/1995574.png'
    },
    {
      nombre: 'María Pérez',
      cargo: 'Administradora',
      telefono: '+56 9 6578 1234',
      horario: '09:00 - 18:00',
      estado: 'Activo',
      estadoColor: 'success',
      foto: 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png'
    },
    {
      nombre: 'Carlos Soto',
      cargo: 'Técnico de Mantenimiento',
      telefono: '+56 9 5678 9012',
      horario: '10:00 - 19:00',
      estado: 'En licencia',
      estadoColor: 'warning',
      foto: 'https://cdn-icons-png.flaticon.com/512/1995/1995625.png'
    },
    {
      nombre: 'Andrea Gutiérrez',
      cargo: 'Aseo y Limpieza',
      telefono: '+56 9 9234 8765',
      horario: '07:00 - 15:00',
      estado: 'Activo',
      estadoColor: 'success',
      foto: 'https://cdn-icons-png.flaticon.com/512/2922/2922561.png'
    },
    {
      nombre: 'Roberto Díaz',
      cargo: 'Conserje Nocturno',
      telefono: '+56 9 9123 4567',
      horario: '22:00 - 06:00',
      estado: 'Inactivo',
      estadoColor: 'medium',
      foto: 'https://cdn-icons-png.flaticon.com/512/2922/2922656.png'
    }
  ];
}
