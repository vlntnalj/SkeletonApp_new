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
  }) {
    await this.sqliteService.registerUser({
      nombre: datosRegistro.nombre,
      username: datosRegistro.usuario,
      email: datosRegistro.email,
      telefono: datosRegistro.telefono,
      fechaNacimiento: datosRegistro.fechaNacimiento,
      direccion: datosRegistro.direccion,
      password: datosRegistro.password,
    });
  }

  async login(username: string, password: string): Promise<boolean> {
    const user = await this.sqliteService.getUserByUsername(username);
    if (!user) return false;
    if (user.password !== password) return false; // en real: comparar hash

    await this.sessionService.setCurrentUser({
      id: user.id,
      username: user.username,
      nombre: user.nombre,
      email: user.email,
    });

    return true;
  }

  async logout() {
    await this.sessionService.clearSession();
  }

  async isLoggedIn() {
    return this.sessionService.isLoggedIn();
  }
}
