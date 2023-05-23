import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if(this.authService.isLoged){
      //   return true;
      // }
      // else{
      //   console.log("Acceso denegado!");
      //   this.router.navigate(['/inicio-sesion']);
      //   return false;
      // }
      if (localStorage.getItem('sesion')=== 'true') {
        console.log(localStorage.getItem('isLoggedIn')  )
        return true;
      } else {
        console.log(localStorage.getItem('isLoggedIn'))
        console.log('Acceso denegado');
        this.router.navigate(['/inicio-sesion']);
        return false;
      }
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }
  
}
