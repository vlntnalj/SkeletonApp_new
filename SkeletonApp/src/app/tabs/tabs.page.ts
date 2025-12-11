import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-tabs',
  imports: [IonicModule, RouterLink, RouterLinkActive],
  templateUrl: './tabs.page.html',
})
export class TabsPage {}
