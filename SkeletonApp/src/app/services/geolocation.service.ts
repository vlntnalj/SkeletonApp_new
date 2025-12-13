import { Injectable } from '@angular/core';
import { Geolocation, PermissionStatus } from '@capacitor/geolocation';

export type GeoPosition = {
  lat: number;
  lon: number;
  accuracy: number | null;
};

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  async requestPermissions(): Promise<PermissionStatus> {
    return Geolocation.requestPermissions();
  }

  async getCurrentPosition(): Promise<GeoPosition> {
    const pos = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    });

    return {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
      accuracy: pos.coords.accuracy ?? null,
    };
  }

  isDenied(perm: PermissionStatus): boolean {
    return (
      (perm as any)?.location === 'denied' ||
      (perm as any)?.coarseLocation === 'denied'
    );
  }
}
