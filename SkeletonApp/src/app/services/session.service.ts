// src/app/services/session.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private storageReady: Promise<void>;
  private readonly KEY_USER = 'current_user';

  constructor(private storage: Storage) {
    // guardamos la promesa para esperar cuando sea necesario
    this.storageReady = this.init();
  }

  private async init(): Promise<void> {
    await this.storage.create();
  }

  /** Asegura que Storage esté listo */
  private async ready() {
    await this.storageReady;
  }

  /** Guarda usuario en sesión */
  async setCurrentUser(user: any): Promise<void> {
    await this.ready();
    await this.storage.set(this.KEY_USER, user);
  }

  /** Obtiene usuario actual */
  async getCurrentUser(): Promise<any | null> {
    await this.ready();
    return await this.storage.get(this.KEY_USER);
  }

  /** Limpia sesión */
  async clearSession(): Promise<void> {
    await this.ready();
    await this.storage.remove(this.KEY_USER);
  }

  /** Usado por el AuthGuard */
  async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }
}
