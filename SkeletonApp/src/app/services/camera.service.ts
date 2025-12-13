import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  CameraOptions,
} from '@capacitor/camera';

@Injectable({ providedIn: 'root' })
export class CameraService {

  async takeProfilePhotoBase64(): Promise<string> {
    const options: CameraOptions = {
      quality: 70,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      width: 512,
      height: 512,
    };

    const photo = await Camera.getPhoto(options);

    if (!photo.base64String) {
      throw new Error('No se pudo obtener la imagen');
    }

    return `data:image/${photo.format};base64,${photo.base64String}`;
  }
}
