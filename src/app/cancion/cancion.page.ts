import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { ActivatedRoute } from '@angular/router';
import { OneTrack } from '../interfaces/one-track';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.page.html',
  styleUrls: ['./cancion.page.scss'],
})
export class CancionPage implements OnInit{
  trackId = '11dFghVXANMlKmJXsNCbNl'; // ID de la pista deseada
  audioAnalysisData: any;
  public n:string = 'holña'
  public track:OneTrack[] = [];
  urlTrack:string = ''
  imagenTrack:string = ''
  nombre:string = ''
  artista:string = ''
  constructor(private spotifyService: SpotifyService,private route: ActivatedRoute,private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.trackId = this.route.snapshot.params['id'];
    this.getAudioAnalysisData(this.trackId);
  }

  getAudioAnalysisData(id:string): void {

    this.spotifyService.getTrack(id)
      .subscribe(
        (response:OneTrack) => {
          this.track.push(response)
          this.urlTrack = this.track[0].preview_url
          this.imagenTrack = this.track[0].album.images[0].url
          this.nombre = this.track[0].name
          this.artista = this.track[0].artists[0].name
          console.log(this.urlTrack)
          // Realiza las operaciones necesarias con los datos del análisis de audio
        },
        (error) => {
          console.log('Error al obtener el análisis de audio:', error);
        }
      );
  }

  onAudioLoaded(event: Event) {
    const audioPlayer = event.target as HTMLAudioElement;
    audioPlayer.play();
  }

}
