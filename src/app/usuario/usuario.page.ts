import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FotoService } from '../foto.service';
import { PhotoData } from '../interfaces/photo-data';
import { UserPhoto } from '../interfaces/user-photo';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  fotoUser: string = ''
  datos: UserPhoto ={
    filepath : '',
    webviewPath: './../../assets/user.jpeg'
  }
  constructor(private foto: FotoService, private router:Router) {}
  fotoS = this.foto.fotos
  takePhoto() {
    this.foto.addNewToGallery().then((data)=>{
      this.datos = data
    })
  }

  ngOnInit(): void {
      
  }
  cerrarSesion(){
    localStorage.removeItem('idUser')
    this.router.navigate(['/inicio-sesion']);
  }
}
