import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { Image, Playlists } from '../interfaces/playlists';
import { PlaylistMap } from '../interfaces/playlist-map';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit{
  playlists: PlaylistMap[] = [];
  imagenesPlaylist:Image[] = []
  img1:PlaylistMap ={
    description : '',
    id : '',
    images: [],
    name: ''
  }
  img2:PlaylistMap ={
    description : '',
    id : '',
    images: [],
    name: ''
  }
  constructor(private spoService: SpotifyService) { }

  ngOnInit() {
    this.spoService.getPlaylists().subscribe(
      (response:Playlists) => {
        // // Procesa la respuesta de la API
        // let resp2 = response.items.filter(p => p.images.length!=0).slice(2,4)

        response.items = response.items.filter(p => p.images && p.images.length > 0);
        this.playlists = response.items.map(res => {
          return {
            id: res.id,
            name: res.name,
            description: res.description,
            images: res.images
          };
        });
        this.playlists.filter(p => p.images.length!= 0)
        this.img1 = this.playlists[0]
        this.img2 = this.playlists[1]
        console.log(this.playlists)
      },
      (error) => {
        // Maneja el error de la API
        console.error(error);
      }



    );
  }


}
