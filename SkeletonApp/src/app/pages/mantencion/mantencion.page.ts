import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface Reporte {
  titulo: string;
  tipo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  gravedad: string;
}

type Estado = 'abiertos' | 'enProgreso' | 'completados';

@Component({
  selector: 'app-mantencion',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './mantencion.page.html',
  styleUrls: ['./mantencion.page.scss'],
})
export class MantencionPage {
  selectedSegment: Estado = 'abiertos';

  mantenimientos: Record<Estado, Reporte[]> = {
    abiertos: [
      {
        titulo: 'Fuga de agua en Depto 203',
        tipo: 'Plomería',
        descripcion: 'Se detecta fuga leve en baño principal.',
        fecha: '07-11-2025',
        hora: '10:15',
        gravedad: 'Alta',
      },
      {
        titulo: 'Luz parpadea en pasillo 2° piso',
        tipo: 'Electricidad',
        descripcion: 'Lámpara con falla en conexión.',
        fecha: '06-11-2025',
        hora: '14:30',
        gravedad: 'Media',
      },
      {
        titulo: 'Ventana rota en Depto 105',
        tipo: 'Carpintería',
        descripcion: 'Cristal roto por golpe de viento.',
        fecha: '05-11-2025',
        hora: '09:00',
        gravedad: 'Alta',
      },
    ],
    enProgreso: [
      {
        titulo: 'Calefactor no enciende en Depto 304',
        tipo: 'Gasfitería',
        descripcion: 'Se revisa posible falla en válvula.',
        fecha: '06-11-2025',
        hora: '11:20',
        gravedad: 'Media',
      },
      {
        titulo: 'Puerta principal desalineada',
        tipo: 'Carpintería',
        descripcion: 'Ajuste de bisagras en curso.',
        fecha: '07-11-2025',
        hora: '13:45',
        gravedad: 'Baja',
      },
      {
        titulo: 'Humedad en muro del pasillo 1° piso',
        tipo: 'Mampostería',
        descripcion: 'Se realiza revisión de filtraciones.',
        fecha: '06-11-2025',
        hora: '17:00',
        gravedad: 'Alta',
      },
    ],
    completados: [
      {
        titulo: 'Fuga en cañería Depto 402',
        tipo: 'Plomería',
        descripcion: 'Reparación finalizada, sin filtraciones.',
        fecha: '04-11-2025',
        hora: '16:40',
        gravedad: 'Alta',
      },
      {
        titulo: 'Cambio de ampolleta en hall',
        tipo: 'Electricidad',
        descripcion: 'Ampolleta reemplazada correctamente.',
        fecha: '05-11-2025',
        hora: '09:30',
        gravedad: 'Baja',
      },
      {
        titulo: 'Revisión de alarma de incendios',
        tipo: 'Seguridad',
        descripcion: 'Sistema funcional tras prueba técnica.',
        fecha: '03-11-2025',
        hora: '12:00',
        gravedad: 'Media',
      },
    ],
  };

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value as Estado;
  }
}
