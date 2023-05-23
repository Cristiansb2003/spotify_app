import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FotoService } from '../foto.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  fotoUser: string = ''
  constructor(private foto: FotoService) {}
  fotoS = this.foto.fotos
  tomarFoto() {
    this.foto.addNewToGallery();
  }

  ngOnInit(): void {
      
  }

}
