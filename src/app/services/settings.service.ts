import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme.setAttribute('href', url);
  }
  changeTheme(theme: string)
  {
    const url = `./assets/css/colors/${theme}.css`;
    //poner atributo al url de theme
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }
  // IMPLEMENTAR MARCADOR DE MANERA DINAMICA
  checkCurrentTheme()
  {
    const links=  document.querySelectorAll('.selector');

    //conseguir valores de manera individual mediante la clase selector
    links.forEach(element => {
        //barrer la clase working
        element.classList.remove('working');
        //implementar la clase working mediante el data-theme (atributo)
        const btnTheme = element.getAttribute('data-theme');
        const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
        const currentTheme = this.linkTheme.getAttribute('href');

        if(btnThemeUrl === currentTheme)
        {
          element.classList.add('working');
        }

    });
  }
}
