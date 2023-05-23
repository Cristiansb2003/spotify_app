import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { PlaylistMap } from '../interfaces/playlist-map';
import { Image, Playlists } from '../interfaces/playlists';

@Component({
  selector: 'app-libreria',
  templateUrl: './libreria.page.html',
  styleUrls: ['./libreria.page.scss'],
})
export class LibreriaPage implements OnInit {
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
            images: res.images
          };
        });
        this.playlists.filter(p => p.images.length!= 0)
        console.log(this.playlists)
      },
      (error) => {
        // Maneja el error de la API
        console.error(error);
      })
  }

}
