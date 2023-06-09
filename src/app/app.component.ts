import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  datoRecibido: string = '';
  url: string ='';
  show:boolean = false;
  constructor(private spo: SpotifyService) {
  }


  ngOnInit(): void {
    if(localStorage.getItem('sesion') === 'true'){
      this.show = true
    }
    this.spo.datoEnviado$.subscribe((dato: string) => {
      this.datoRecibido = dato;
      this.spo.getTrack(dato).subscribe((data)=>{
        this.url = data.preview_url
      })
      console.log(this.datoRecibido)
    });
  }

  onAudioLoaded(event: Event) {
    const audioPlayer = event.target as HTMLAudioElement;
    audioPlayer.play();
  }

}
