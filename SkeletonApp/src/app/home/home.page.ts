import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { WeatherService } from '../services/weather.service';
import { GeolocationService, GeoPosition } from '../services/geolocation.service';

type WeatherNow = {
  tempC: number;
  precipMm: number;
  label: string;
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  private weather = inject(WeatherService);
  private geo = inject(GeolocationService);

  forecast: any;
  weatherNow: WeatherNow | null = null;

  gpsLoading = false;
  gpsError: string | null = null;

  // fallback Santiago
  coords: GeoPosition = { lat: -33.45, lon: -70.66, accuracy: null };

  ionViewDidEnter() {
    this.cargarClimaConGPS();
  }

  async cargarClimaConGPS() {
    this.gpsLoading = true;
    this.gpsError = null;

    try {
      const perm = await this.geo.requestPermissions();
      if (this.geo.isDenied(perm)) {
        this.gpsError = 'Permiso GPS denegado. Usando Santiago (fallback).';
        this.cargarClima(this.coords.lat, this.coords.lon);
        return;
      }

      this.coords = await this.geo.getCurrentPosition();
      this.cargarClima(this.coords.lat, this.coords.lon);
    } catch (e: any) {
      this.gpsError = (e?.message ?? 'No se pudo obtener GPS.') + ' Usando Santiago (fallback).';
      this.cargarClima(this.coords.lat, this.coords.lon);
    } finally {
      this.gpsLoading = false;
    }
  }

  refrescarGPS() {
    return this.cargarClimaConGPS();
  }

  private cargarClima(lat: number, lon: number) {
    this.weather.getForecast(lat, lon).subscribe((data) => {
      this.forecast = data;

      const hourly = data?.hourly;
      const times: string[] = hourly?.time ?? [];
      const temps: number[] = hourly?.temperature_2m ?? [];
      const precs: number[] = hourly?.precipitation ?? [];

      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours()).padStart(2, '0');
      const key = `${yyyy}-${mm}-${dd}T${hh}:00`;

      const idx = times.indexOf(key);

      const tempC = idx >= 0 ? Math.round(temps[idx]) : null;
      const precipMm = idx >= 0 ? Number(precs[idx]?.toFixed?.(1) ?? precs[idx]) : null;

      this.weatherNow = {
        tempC: tempC ?? 0,
        precipMm: precipMm ?? 0,
        label: idx >= 0 ? `Actualizado: ${key.replace('T', ' ')}` : 'No disponible',
      };
    });
  }
}
