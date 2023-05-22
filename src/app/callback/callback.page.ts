import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.page.html',
  styleUrls: ['./callback.page.scss'],
})
export class CallbackPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
     private spoService: SpotifyService
  ) { }

  ngOnInit(): void {
    console.log('hola')
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const state = params['state'];
       this.spoService.callback(code, state);
    });
  }
}
