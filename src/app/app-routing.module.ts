import { NgModule } from '@angular/core';
//Modulos
import {RouterModule, Router, Routes} from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';



import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes:Routes= [

  //path: '/dashboard' PagesRouting
  //path: '/auth' AuthRouting
  //path: '/compras' ComprasRouting

  //ruta por defecto
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  //pagina no encontrada
  {path: '**', component: NopagefoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    //rutas hija
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
