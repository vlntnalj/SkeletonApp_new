import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-tab3',
  imports: [IonicModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-text>Contenido de Tab 3</ion-text>
    </ion-content>
  `,
})
export class Tab3Page {}
