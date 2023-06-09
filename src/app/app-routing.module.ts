import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'callback',
    loadChildren: () => import('./callback/callback.module').then( m => m.CallbackPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'libreria',
    loadChildren: () => import('./libreria/libreria.module').then( m => m.LibreriaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'buscador',
    loadChildren: () => import('./buscador/buscador.module').then( m => m.BuscadorPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'playlist/:id',
    loadChildren: () => import('./playlist/playlist.module').then( m => m.PlaylistPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'cancion/:id',
    loadChildren: () => import('./cancion/cancion.module').then( m => m.CancionPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule),
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
