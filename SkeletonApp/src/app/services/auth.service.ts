// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private sqliteService: SQLiteService,
    private sessionService: SessionService
  ) {}

  async register(datosRegistro: {
    nombre: string;
    usuario: string;
    email: string;
    telefono: string;
    fechaNacimiento: string;
    direccion: string;
    password: string;
    photoBase64?: string | null;
  }) {
    await this.sqliteService.registerUser({
      nombre: datosRegistro.nombre,
      username: datosRegistro.usuario,
      email: datosRegistro.email,
      telefono: datosRegistro.telefono,
      fechaNacimiento: datosRegistro.fechaNacimiento,
      direccion: datosRegistro.direccion,
      password: datosRegistro.password,
      photoBase64: datosRegistro.photoBase64 ?? null,
    });
  }

  async login(username: string, password: string): Promise<boolean> {
    const user = await this.sqliteService.getUserByUsername(username);
    if (!user) return false;
    if (user.password !== password) return false;

    // ✅ Persistencia de sesión (clave para el AuthGuard)
    await this.sessionService.setCurrentUser({
      id: user.id,
      username: user.username,
      nombre: user.nombre,
      email: user.email,
      photoBase64: user.photo_base64 ?? null,
    });

    return true;
  }

  async logout(): Promise<void> {
    await this.sessionService.clearSession();
  }

  async isLoggedIn(): Promise<boolean> {
    return this.sessionService.isLoggedIn();
  }
}
