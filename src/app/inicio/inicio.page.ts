import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { Image, Playlists } from '../interfaces/playlists';
import { PlaylistMap } from '../interfaces/playlist-map';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  playlists: PlaylistMap[] = [];
  imagenesPlaylist:Image[] = []

  constructor(private spoService: SpotifyService) { }

  ngOnInit() {
    this.spoService.getPlaylists().subscribe(
      (response:Playlists) => {
        // Procesa la respuesta de la API
        let resp2 = response.items.filter(p => p.images.length!=0)
        this.playlists = resp2.map(res => {
          return {
            id: res.id,
            name: res.name,
            description: res.description,
            images: res.images.map(image => image.url)
          };
        });
        this.playlists.filter(p => p.images.length!= 0)
        console.log(this.playlists)
      },
      (error) => {
        // Maneja el error de la API
        console.error(error);
      }



    );
  }

}
