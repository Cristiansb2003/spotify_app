import { Injectable } from "@angular/core";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import { Platform } from "@ionic/angular";
import { Capacitor } from "@capacitor/core";
import { UserPhoto } from "./interfaces/user-photo";
@Injectable({
  providedIn: "root",
})
export class FotoService {
  constructor(private platform: Platform) {}
  public fotos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = "photos";

  public async addNewToGallery():Promise<UserPhoto> {
    await this.platform.ready();
    // Toma Foto
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    return await this.savePicture(capturedPhoto);
    // console.log(savedImageFile)
    // this.fotos.unshift(savedImageFile);
  }

  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = new Date().getTime() + ".jpeg";
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (this.platform.is("hybrid")) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  }

  private async readAsBase64(photo: Photo) {
    if (this.platform.is("hybrid")) {
      //Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path || "",
      });
      return file.data;
    }
    // Busca foto, lee como blob y cambia a base64
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return (await this.convertBlobToBase64(blob)) as string;
  }

  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}
