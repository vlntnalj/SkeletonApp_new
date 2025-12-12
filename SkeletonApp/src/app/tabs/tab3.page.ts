import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-tab3',
  imports: [IonicModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Mantención</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen="true" class="ion-padding">
      <ion-text>
        <h2>Contenido de Tab 3</h2>
      </ion-text>

      <div style="height:1500px; background:lightyellow">
        Contenido largo para probar scroll
      </div>
    </ion-content>
  `,
})
export class Tab3Page {}
