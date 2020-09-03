import { NgModule } from '@angular/core';
// Modelos
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { AppRoutingModule } from '../app-routing.module';
import { ComponentsModule } from '../components/components.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  imports: [
    // *===== Modulos de terceros ==========*
    CommonModule,
    FormsModule,

    // *===== Modulos propios ==========*
    SharedModule,
    ComponentsModule,

    //funcionar el routeoutlet
    AppRoutingModule
  ]
})
export class PagesModule { }
