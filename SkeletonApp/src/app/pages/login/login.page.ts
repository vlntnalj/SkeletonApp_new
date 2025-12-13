import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // ajusta ruta según tu estructura

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController,
  ) {}

  async ingresar() {
    if (!this.username || !this.password) {
      const t = await this.toastCtrl.create({
        message: 'Ingresa usuario y contraseña.',
        duration: 2000,
        color: 'warning',
      });
      await t.present();
      return;
    }

    const ok = await this.authService.login(this.username, this.password);

    if (!ok) {
      const t = await this.toastCtrl.create({
        message: 'Usuario o contraseña incorrectos.',
        duration: 2000,
        color: 'danger',
      });
      await t.present();
      return;
    }

    // Login correcto: redirige al tab de inicio
    // Usa la ruta real de tu app: '/tabs/home' o '/tabs/inicio'
    this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
    // si tu ruta es /tabs/inicio, usa:
    // this.router.navigateByUrl('/tabs/inicio', { replaceUrl: true });
  }

  crearCuenta() {
    // Mantengo tu ruta original
    this.router.navigateByUrl('/register');
  }
}
