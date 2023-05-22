import { Injectable } from '@angular/core';
import { DataToken } from './interfaces/data-token';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Playlists } from './interfaces/playlists';
@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  // datos de Token
  private clientId = environment.spotify.CLIENT_ID;
  private clientSecret = environment.spotify.CLIENT_SECRET;
  private token: string = '';
  
  // Rutas de redireccion
  private redirectUri = 'http://localhost:8100/callback';
  private redirectLog = 'http://localhost:8100/inicio';

  // Rutas de peticion
  // playlist
  private spotifyPlaylistsUrl = 'https://api.spotify.com/v1/me/playlists';
  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    console.log('hola')
    const state = this.generateRandomString(16);
    const scope = 'user-read-private user-read-email';

    window.location.href =
      'https://accounts.spotify.com/authorize?' +
      new URLSearchParams({
        response_type: 'code',
        client_id: this.clientId,
        scope: scope,
        redirect_uri: this.redirectUri,
        state: state,
      }).toString();
  }

  private generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }

  // en esta parte optenemos de pasada el token de acceso para poder realizar
  // todas las peticiones
  callback(code: string, state: string) {
    if (state === null) {
      const errorParams = new URLSearchParams({ error: 'state_mismatch' });
      window.location.href = '/#' + errorParams.toString();
    } else {
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        body: new HttpParams()
          .set('code', code)
          .set('redirect_uri', this.redirectUri)
          .set('grant_type', 'authorization_code'),
        headers: new HttpHeaders({
          Authorization:
            'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      };

      // Realiza la llamada a la API para obtener el token de acceso
      this.http
        .post<DataToken>(authOptions.url, authOptions.body.toString(), {
          headers: authOptions.headers,
        })
        .subscribe(
          (response: DataToken) => {
            // Procesa la respuesta de la API
            console.log(response.access_token);
            this.token = response.access_token;
            this.router.navigate(['/inicio']);
          },
          (error) => {
            // Maneja el error de la API
            console.error(error);
          }
        );
    }
  }

  getPlaylists():Observable<Playlists> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.get<Playlists>(this.spotifyPlaylistsUrl, { headers });
  }
}
