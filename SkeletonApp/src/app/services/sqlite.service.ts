import { Capacitor } from '@capacitor/core';
import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root' })
export class SQLiteService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;

  async initDB() {
    if (Capacitor.getPlatform() === 'web') {
      console.warn('SQLite nativo no disponible en web');
      return;
    }
    if (this.db) return;

    this.db = await this.sqlite.createConnection('app', false, 'no-encryption', 1, false);
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
        password TEXT NOT NULL
      );
    `);
  }

  async registerUser(user: {
    nombre: string;
    username: string;
    email: string;
    telefono: string;
    fechaNacimiento: string;
    direccion: string;
    password: string;
  }) {
    if (!this.db) await this.initDB();

    const query = `
      INSERT INTO users
      (nombre, username, email, telefono, fecha_nacimiento, direccion, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await this.db!.run(query, [
      user.nombre,
      user.username,
      user.email,
      user.telefono,
      user.fechaNacimiento,
      user.direccion,
      user.password,
    ]);
  }

  async getUserByUsername(username: string) {
    if (!this.db) await this.initDB();

    const res = await this.db!.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    return res.values && res.values.length ? res.values[0] : null;
  }
}
