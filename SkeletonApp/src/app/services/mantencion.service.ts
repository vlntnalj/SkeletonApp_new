import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Estado } from '../pages/mantencion/reporte-modal.component';

export type Reporte = {
  id: string;
  titulo: string;
  tipo: string;
  descripcion: string;
  fecha: string; // YYYY-MM-DD
  hora: string;  // HH:mm
  gravedad: 'Baja' | 'Media' | 'Alta';
  estado: Estado;
};

type StoreShape = Record<Estado, Reporte[]>;

@Injectable({ providedIn: 'root' })
export class MantencionService {
  private ready = false;
  private KEY = 'mantencion_store';

  constructor(private storage: Storage) {}

  private async init() {
    if (this.ready) return;
    await this.storage.create();
    this.ready = true;

    const existing = await this.storage.get(this.KEY);
    if (!existing) {
      const empty: StoreShape = { abiertos: [], enProgreso: [], completados: [] };
      await this.storage.set(this.KEY, empty);
    }
  }

  private nowFechaHora() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    return { fecha: `${yyyy}-${mm}-${dd}`, hora: `${hh}:${mi}` };
  }

  async getAll(): Promise<StoreShape> {
    await this.init();
    return (await this.storage.get(this.KEY)) as StoreShape;
  }

  async add(draft: Omit<Reporte, 'id' | 'fecha' | 'hora'>): Promise<void> {
    await this.init();
    const store = (await this.storage.get(this.KEY)) as StoreShape;
    const { fecha, hora } = this.nowFechaHora();

    const nuevo: Reporte = {
      id: crypto?.randomUUID?.() ?? String(Date.now()),
      fecha,
      hora,
      ...draft,
    };

    store[draft.estado] = [nuevo, ...(store[draft.estado] ?? [])];
    await this.storage.set(this.KEY, store);
  }

  async moveReporte(id: string, to: Estado): Promise<void> {
    await this.init();
    const store = (await this.storage.get(this.KEY)) as StoreShape;

    let found: Reporte | undefined;

    for (const estado of Object.keys(store) as Estado[]) {
      const idx = store[estado].findIndex((r) => r.id === id);
      if (idx >= 0) {
        found = store[estado][idx];
        store[estado].splice(idx, 1);
        break;
      }
    }

    if (!found) return;

    const moved: Reporte = { ...found, estado: to };
    store[to] = [moved, ...(store[to] ?? [])];
    await this.storage.set(this.KEY, store);
  }
}
