import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
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
  constructor(private router:Router) {}



  ngOnInit(): void {
      
  }
  cerrarSesion(){
    localStorage.removeItem('sesion')
    this.router.navigate(['/inicio-sesion']);
  }
}
