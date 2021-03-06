import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';



import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';


import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {

    this.googleInit();

  }
  get token():string{
    return localStorage.getItem('token') || '';
  }
  get uid():string {
    return this.usuario.uid || '';
  }
  get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.role;
  }
  
  get headers (){
   return {
      headers: {
        'x-token': this.token
      }
    }
  }

  googleInit(){

    return new Promise<void> ( resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '768352130522-cvghs2nl4lqf04kt36qvr6hnvmctbto8.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })

   
  }

  guardarLocalStorage( token: string, menu: any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout(){
    localStorage.removeItem('token');

    localStorage.removeItem('menu');
    
    this.auth2.signOut().then(  () => {
      this.ngZone.run(() => {

        this.router.navigateByUrl('/login');
      })
    });
  }

  validarToken(): Observable< boolean >{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
        map( (resp: any) => {
          console.log(resp);
          const {role, google,nombre,email, img='', uid} = resp.usuario;
          this.usuario = new Usuario(nombre, email, '', img, role, google, uid);
          this.guardarLocalStorage(resp.token, resp.menu);
          return true;
        }),
        catchError( error => {
          console.log(error);
          return of(false)
      })
    );
  }

  crearUsuario( formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios`, formData)
          .pipe(
            tap( (resp: any) => {
              localStorage.setItem('token', resp.token);
              localStorage.setItem('menu', resp.menu);
            })
          );
    
  }
  actualizarPerfil( data: {email:string, nombre:string, role:string}){
    
    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data,this.headers);
  }
  login( formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
            .pipe(
              tap( (resp: any) => {
                this.guardarLocalStorage(resp.token, resp.menu);
              })
            );
    
  }
  loginGoogle(token){
    return this.http.post(`${base_url}/login/google`, { token })
            .pipe(
              tap( (resp: any) => {
                this.guardarLocalStorage(resp.token, resp.menu);
              })
            );
    
  }

  cargarUsuarios( desde: number = 0 ){

    const url =  `${ base_url }/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url,this.headers)
          .pipe(
            delay(50),
            map( resp => {
              const usuarios = resp.usuarios.map ( user => new Usuario(user.nombre, user.email, '', user.img, user.role ,user.google, user.uid))
              return {
                total: resp.total,
                usuarios
              };
            })
          )

  }
  eliminarUsuario( usuario: Usuario ){
    // usuarios/5f5a9bb8bdee5342e426255b
    const url =  `${ base_url }/usuarios/${ usuario.uid }`;
    return this.http.delete<CargarUsuario>(url,this.headers);
  }
  guardarUsuario( usuario: Usuario){
    
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario,this.headers);
  }
}
