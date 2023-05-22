import { Component, OnInit, Output } from '@angular/core';
import { Image, OnePlaylist, Track } from '../interfaces/one-playlist';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { TrackOne } from '../interfaces/track-one';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
  playlistId: string = '';
  tracks: TrackOne[] = [] 
  infoTrack:Track[] = []
  images:Image = {
    height : 0,
    url: '',
    width: 0
  }

  enviarDato(id: string) {
    this.spotifyService.enviarDato(id);
  }
  nombrePl:string = ''
  descripcion:string = ''
  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    //obtengo el id de la playlist que se paso como parametro
    this.playlistId = this.route.snapshot.params['id'];
// mando a llamar el meotodo para obtener la playlis
    this.spotifyService.getPlaylist(this.playlistId)
      .subscribe((response:OnePlaylist) => {
        //este regresa mucha info asi que voy
        // quitando los datos que no ocupo con la funcion map y con response.tracks.items
        this.images = response.images[0]
        this.nombrePl = response.name;
        this.descripcion = response.description
        this.tracks = response.tracks.items;
        this.tracks = this.tracks.filter(p=>p.track.preview_url!=null)
        
        this.infoTrack = this.tracks.map((playlist: TrackOne) => playlist.track);

        console.log(this.infoTrack)
        // Realiza las operaciones necesarias con los datos de la lista de reproducción
      });

  }

}
