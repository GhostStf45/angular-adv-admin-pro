import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';

//llamar a una funcion global (otro archivo) *** Declarar funcion
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(private settingsService:SettingsService) { }

  ngOnInit(): void {
      customInitFunctions();
  }

}
