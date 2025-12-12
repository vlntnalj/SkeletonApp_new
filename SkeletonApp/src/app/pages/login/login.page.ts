import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPage {
  username = '';
  password = '';

  constructor(private router: Router) {}

  ingresar() {
    this.router.navigateByUrl('/tabs/inicio', { replaceUrl: true });
  }

  crearCuenta() {
    this.router.navigateByUrl('/registro');
  }
}
