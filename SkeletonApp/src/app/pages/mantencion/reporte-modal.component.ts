import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonItem, IonLabel, IonInput, IonTextarea,
  IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';

export type Estado = 'abiertos' | 'enProgreso' | 'completados';

export type ReporteDraft = {
  titulo: string;
  tipo: string;
  descripcion: string;
  gravedad: 'Baja' | 'Media' | 'Alta';
  estado: Estado;
};

@Component({
  standalone: true,
  selector: 'app-reporte-modal',
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonItem, IonLabel, IonInput, IonTextarea,
    IonSelect, IonSelectOption
  ],
  template: `
  <ion-header>
    <ion-toolbar color="mytheme">
      <ion-title>Nuevo reporte</ion-title>
      <ion-buttons slot="end">
        <ion-button fill="clear" (click)="close(false)">Cerrar</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding" color="mytheme-2">

    <ion-item class="field" lines="full">
      <ion-label position="floating">Título</ion-label>
      <ion-input [(ngModel)]="model.titulo"></ion-input>
    </ion-item>

    <ion-item class="field" lines="full">
      <ion-label position="floating">Tipo</ion-label>
      <ion-input [(ngModel)]="model.tipo" placeholder="Plomería, Electricidad..."></ion-input>
    </ion-item>

    <ion-item class="field" lines="full">
      <ion-label position="floating">Descripción</ion-label>
      <ion-textarea autoGrow="true" [(ngModel)]="model.descripcion"></ion-textarea>
    </ion-item>

    <ion-item class="field" lines="full">
      <ion-label>Gravedad</ion-label>
      <ion-select interface="popover" [(ngModel)]="model.gravedad">
        <ion-select-option value="Baja">Baja</ion-select-option>
        <ion-select-option value="Media">Media</ion-select-option>
        <ion-select-option value="Alta">Alta</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-item class="field" lines="full">
      <ion-label>Estado</ion-label>
      <ion-select interface="popover" [(ngModel)]="model.estado">
        <ion-select-option value="abiertos">Abiertos</ion-select-option>
        <ion-select-option value="enProgreso">En progreso</ion-select-option>
        <ion-select-option value="completados">Completados</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-button
      expand="block"
      class="btn-primary ion-margin-top"
      [disabled]="!isValid()"
      (click)="save()">
      Guardar reporte
    </ion-button>

  </ion-content>
  `,
  styles: [`
    .field {
      --background: var(--ion-color-mytheme-2);
      --border-color: rgba(240,240,240,0.10);
      --color: var(--ion-color-mytheme-contrast);
      border-radius: 14px;
      margin-bottom: 10px;
    }
  `]
})
export class ReporteModalComponent {
  @Input() defaultEstado: Estado = 'abiertos';

  model: ReporteDraft = {
    titulo: '',
    tipo: '',
    descripcion: '',
    gravedad: 'Media',
    estado: 'abiertos',
  };

  constructor(private modalCtrl: ModalController) {}

  ionViewWillEnter() {
    this.model.estado = this.defaultEstado ?? 'abiertos';
  }

  isValid() {
    return !!this.model.titulo?.trim() && !!this.model.tipo?.trim() && !!this.model.descripcion?.trim();
  }

  close(roleOk: boolean) {
    this.modalCtrl.dismiss(null, roleOk ? 'ok' : 'cancel');
  }

  save() {
    this.modalCtrl.dismiss(this.model, 'ok');
  }
}
