import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root' })
export class SQLiteService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;

  private assertNativePlatform() {
    const p = Capacitor.getPlatform();
    if (p === 'web') {
      throw new Error('SQLite nativo no disponible en web. Ejecuta en Android/iOS.');
    }
  }

  async initDB() {
    this.assertNativePlatform();
    if (this.db) return;

    this.db = await this.sqlite.createConnection(
      'app',
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        email TEXT NOT NULL,
        telefono TEXT,
        fecha_nacimiento TEXT,
        direccion TEXT,
        password TEXT NOT NULL,
        photo_base64 TEXT
      );
    `);

    // Si tu tabla ya existía sin photo_base64, intenta agregarla sin romper:
    await this.ensurePhotoColumn();
  }

  private async ensurePhotoColumn() {
    if (!this.db) return;

    // Intento simple (si ya existe, falla y lo ignoramos)
    await this.db
      .execute(`ALTER TABLE users ADD COLUMN photo_base64 TEXT;`)
      .catch(() => {});
  }

  async registerUser(user: {
    nombre: string;
    username: string;
    email: string;
    telefono: string;
    fechaNacimiento: string;
    direccion: string;
    password: string;
    photoBase64?: string | null;
  }) {
    if (!this.db) await this.initDB();

    const query = `
      INSERT INTO users
      (nombre, username, email, telefono, fecha_nacimiento, direccion, password, photo_base64)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await this.db!.run(query, [
      user.nombre,
      user.username,
      user.email,
      user.telefono,
      user.fechaNacimiento,
      user.direccion,
      user.password,
      user.photoBase64 ?? null,
    ]);
  }

  async getUserByUsername(username: string) {
    if (!this.db) await this.initDB();

    const res = await this.db!.query(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );

    return res.values?.length ? res.values[0] : null;
  }

  async updateUserPhoto(username: string, photoBase64: string) {
    if (!this.db) await this.initDB();

    await this.db!.run(
      `UPDATE users SET photo_base64 = ? WHERE username = ?`,
      [photoBase64, username]
    );
  }
}
