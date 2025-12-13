import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';

import { MantencionService, Reporte } from '../../services/mantencion.service';
import { Estado, ReporteModalComponent, ReporteDraft } from './reporte-modal.component';

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
    abiertos: [],
    enProgreso: [],
    completados: [],
  };

  constructor(
    private modalCtrl: ModalController,
    private mantSvc: MantencionService
  ) {}

  async ionViewDidEnter() {
    await this.reload();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value as Estado;
  }

  async openNewReporteModal() {
    const modal = await this.modalCtrl.create({
      component: ReporteModalComponent,
      componentProps: { defaultEstado: this.selectedSegment },
      backdropDismiss: false,
    });

    await modal.present();
    const { data, role } = await modal.onWillDismiss<ReporteDraft>();

    if (role !== 'ok' || !data) return;

    await this.mantSvc.add({
      titulo: data.titulo,
      tipo: data.tipo,
      descripcion: data.descripcion,
      gravedad: data.gravedad,
      estado: data.estado,
    });

    await this.reload();
  }

  private async reload() {
    this.mantenimientos = await this.mantSvc.getAll();
  }
}
