import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor( private usuarioService: UsuarioService,
              private router: Router){}
  
  canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): any | import("@angular/router").UrlTree | import("rxjs").Observable<any | import("@angular/router").UrlTree> | Promise<any | import("@angular/router").UrlTree>  {
    return this.usuarioService.validarToken().
            pipe(
              tap( estaAutenticado => {
                  if(!estaAutenticado){
                    this.router.navigateByUrl('/login');
                  }
              })
            );
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    return this.usuarioService.validarToken().
            pipe(
              tap( estaAutenticado => {
                  if(!estaAutenticado){
                    this.router.navigateByUrl('/login');
                  }
              })
            );
  }
  
}
