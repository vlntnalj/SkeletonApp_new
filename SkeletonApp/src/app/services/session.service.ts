// src/app/services/session.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _storage: Storage | null = null;
  private readonly KEY_USER = 'current_user';

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    this._storage = await this.storage.create();
  }

  async setCurrentUser(user: any) {
    await this._storage?.set(this.KEY_USER, user);
  }

  async getCurrentUser() {
    return this._storage?.get(this.KEY_USER);
  }

  async clearSession() {
    await this._storage?.remove(this.KEY_USER);
  }

  async isLoggedIn(): Promise<boolean> {
    const u = await this.getCurrentUser();
    return !!u;
  }
}
