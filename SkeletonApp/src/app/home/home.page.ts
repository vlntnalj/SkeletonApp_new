import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { WeatherService } from '../services/weather.service';

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
  imports: [IonicModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  private weather = inject(WeatherService);

  forecast: any;
  weatherNow: WeatherNow | null = null;

  ionViewDidEnter() {
    this.weather.getForecast(-33.45, -70.66).subscribe((data) => {
      this.forecast = data;

      const hourly = data?.hourly;
      const times: string[] = hourly?.time ?? [];
      const temps: number[] = hourly?.temperature_2m ?? [];
      const precs: number[] = hourly?.precipitation ?? [];

      // Hora actual redondeada a la hora (en timezone America/Santiago, porque lo pide la API)
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
