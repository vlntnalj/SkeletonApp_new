// src/app/pages/register/register.page.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonDatetime,
  ToastController,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonDatetime,
  ],
})
export class RegisterPage {
  registerForm: FormGroup;
  maxFecha: string = new Date().toISOString();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.registerForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        usuario: [
          '',
          [Validators.required, Validators.minLength(3), Validators.maxLength(12)],
        ],
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9,12}$')]],
        fechaNacimiento: ['', Validators.required],
        direccion: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsCoinciden }
    );
  }

  passwordsCoinciden(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { noCoincide: true };
  }

  async registrar() {
    if (!this.registerForm.valid) {
      const t = await this.toastCtrl.create({
        message: 'Por favor completa todos los campos correctamente.',
        duration: 2000,
        color: 'danger',
      });
      await t.present();
      return;
    }

    const v = this.registerForm.value;

    try {
      await this.authService.register({
        nombre: v.nombre,
        usuario: v.usuario,
        email: v.email,
        telefono: v.telefono,
        fechaNacimiento: v.fechaNacimiento,
        direccion: v.direccion,
        password: v.password,
      });

      const t = await this.toastCtrl.create({
        message: 'Registro exitoso. Ahora inicia sesión.',
        duration: 2000,
        color: 'success',
      });
      await t.present();

      this.router.navigate(['/login']);
    } catch (e) {
      console.error('REGISTER ERROR', e);
      const t = await this.toastCtrl.create({
        message: 'Error al registrar (¿usuario ya existe?).',
        duration: 2000,
        color: 'danger',
      });
      await t.present();
    }
    
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
